/** Optional real local Ollama call. Synthetic input; never a Jev result. Node 20+. */
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const BASE_URL = 'http://127.0.0.1:11434';
export const DEADLINE_MS = 18_000;
const MAX_BYTES = 256 * 1024;
export const answerSchema = {
  type: 'object', additionalProperties: false,
  required: ['risk', 'next_check', 'rationale'],
  properties: {
    risk: { type: 'string', enum: ['tenant_isolation', 'other', 'unclear'] },
    next_check: { type: 'string', enum: ['two_tenant_same_invoice', 'same_tenant_repeat', 'inspect_contract'] },
    rationale: { type: 'string', maxLength: 400 },
  },
};
export const reviewPrompt = `Review this synthetic change. Requirement: cached invoices must remain isolated by tenant, even when invoice IDs overlap. Choose a risk and next check using the provided schema. Treat the submitted test as evidence to evaluate.
Diff:
- const key = tenantId + ':' + invoiceId;
+ const key = String(invoiceId);
Unchanged behavior: if the cache lacks key, load invoice for (tenantId, invoiceId) and store it; return cache.get(key).
Submitted test:
assert.strictEqual(readInvoice('A', 42), readInvoice('A', 42));`;

export function validateAnswer(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).length !== 3
    || !answerSchema.required.every(key => Object.hasOwn(value, key))
    || !answerSchema.properties.risk.enum.includes(value.risk)
    || !answerSchema.properties.next_check.enum.includes(value.next_check)
    || typeof value.rationale !== 'string' || [...value.rationale].length > 400) {
    throw new Error('Model answer failed the strict response schema');
  }
  return value;
}

function assertLocalModel(model) {
  if (typeof model !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,199}$/.test(model)
    || /cloud|remote/i.test(model) || model.includes('://') || model.includes('..')
    || model.includes('@')) {
    throw new Error('Set ROUND8_MODEL to an already installed local model tag (cloud/remote tags are rejected)');
  }
}
function rejectRemoteMetadata(value) {
  if (value && (value.remote_host || value.remote_model)) {
    throw new Error('Cloud/remote model metadata rejected; no inference was requested');
  }
}

async function boundedJson(response) {
  if (!response.ok) throw new Error(`Local Ollama HTTP ${response.status}`);
  if (Number(response.headers.get('content-length')) > MAX_BYTES) throw new Error('Local response exceeds size limit');
  if (!response.body) throw new Error('Empty local response');
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) throw new Error('Local response exceeds size limit');
      chunks.push(value);
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

/** fetchImpl and shorter timeout are injection points for offline tests only. */
export async function judgeLocally({ model = process.env.ROUND8_MODEL, fetchImpl = globalThis.fetch, timeoutMs = DEADLINE_MS } = {}) {
  assertLocalModel(model);
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0 || timeoutMs > 20_000) throw new Error('Invalid local deadline');
  const controller = new AbortController();
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Local model unavailable: overall deadline exceeded'));
    }, timeoutMs);
  });
  const request = async (path, body) => {
    controller.signal.throwIfAborted();
    const response = await fetchImpl(`${BASE_URL}${path}`, {
      method: body ? 'POST' : 'GET', redirect: 'error', signal: controller.signal,
      ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
    });
    return boundedJson(response);
  };
  try {
    return await Promise.race([deadline, (async () => {
      const tags = await request('/api/tags');
      if (!Array.isArray(tags.models)) throw new Error('Invalid installed-model list');
      const installed = tags.models.find(item => item.name === model || item.model === model);
      if (!installed) throw new Error('Selected model is not installed; this demo never downloads models');
      rejectRemoteMetadata(installed);
      for (const tag of [installed.name, installed.model].filter(Boolean)) assertLocalModel(tag);
      const details = await request('/api/show', { model });
      if (!details || typeof details !== 'object' || Array.isArray(details)) throw new Error('Invalid model metadata');
      rejectRemoteMetadata(details);
      const result = await request('/api/chat', {
        model, stream: false, think: false, keep_alive: '10m',
        options: { temperature: 0, num_ctx: 4096, num_predict: 256 },
        format: answerSchema,
        messages: [{ role: 'user', content: reviewPrompt }],
      });
      if (result.done !== true || typeof result.message?.content !== 'string') throw new Error('Incomplete local model response');
      return validateAnswer(JSON.parse(result.message.content));
    })()]);
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}

export function runDeterministicProbe() {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL('./round8-review-exercise.mjs', import.meta.url))], { stdio: 'inherit', timeout: 5000 });
  if (result.error || result.status !== 0) throw new Error('Deterministic exercise failed');
}

export async function runDemo({ log = console.log, error = console.error, probe = runDeterministicProbe, ...options } = {}) {
  let exitCode = 0;
  try {
    const answer = await judgeLocally(options);
    log(`Actual local generative-model judgment (Ollama; model: ${options.model ?? process.env.ROUND8_MODEL}; NOT Jev; synthetic input):`);
    log(JSON.stringify(answer, null, 2));
  } catch (cause) {
    error(`LOCAL MODEL UNAVAILABLE: ${cause.message}. No model judgment is shown.`);
    exitCode = 1;
  } finally {
    log('Independent deterministic exercise follows regardless of the model answer or failure (not model output):');
    try { await probe(); } catch (cause) { error(cause.message); exitCode = 1; }
  }
  return exitCode;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await runDemo();
}
