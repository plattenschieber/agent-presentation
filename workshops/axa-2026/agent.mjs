import { BACKGROUND_CONTEXT as ctx } from '@earendil-works/chord/context';
import { createModels, createProvider } from '@earendil-works/pi-ai/models';
import { stream, streamSimple } from '@earendil-works/pi-ai/api/openai-completions';
import { azureProvider } from '@earendil-works/pi-ai/providers/azure';
import { fauxProvider, fauxAssistantMessage, fauxToolCall } from '@earendil-works/pi-ai/providers/faux';
import { Harness, createRegistry, defineExtension } from '@earendil-works/pi-durable';
import { createReadTool } from '@earendil-works/pi-durable/tools';
import { Type } from 'typebox';
import { NodeExecutionEnv } from '@earendil-works/pi-durable/env/node';
import { openNodeSqliteStorage } from '@earendil-works/pi-durable/storage/sqlite/node';
import { resolve } from 'node:path';
import { model } from './model.mjs';

export const prompts = {
  baseline: 'Read claims.json. Return only JSON with count and mean of recorded claim amounts.',
  candidate: 'Read claims.json, then calculate the count and arithmetic mean of its recorded amounts. Include zero amounts. Exclude null amounts. Return one JSON object with exactly two numeric fields: count and mean. Do not return the input records. Do not use Markdown.',
};

export async function openAgent(path, live = false) {
  const models = createModels();
  let selected = model;
  if (live) {
    if (process.env.AGENT_BASE_URL && process.env.AGENT_MODEL) {
      const local = ['localhost','127.0.0.1','[::1]'].includes(new URL(process.env.AGENT_BASE_URL).hostname);
      if (!local && !process.env.AGENT_API_KEY) throw new Error('Set AGENT_API_KEY for the remote provider.');
      selected = { ...model, provider: 'workshop', api: 'openai-completions',
        id: process.env.AGENT_MODEL, name: process.env.AGENT_MODEL,
        baseUrl: process.env.AGENT_BASE_URL, reasoning: false,
        compat: { supportsStore: false, supportsDeveloperRole: false, maxTokensField: 'max_tokens' } };
      models.setProvider(createProvider({ id: 'workshop', models: [selected], api: { stream, streamSimple },
        auth: { apiKey: { name: 'Workshop model', resolve: async () => ({ auth: { apiKey: process.env.AGENT_API_KEY || 'local' } }) } } }));
    } else {
      if (!process.env.AZURE_OPENAI_API_KEY) throw new Error('Set Azure credentials or AGENT_BASE_URL and AGENT_MODEL.');
      models.setProvider({ ...azureProvider(), getModels: () => [model] });
    }
  } else {
    // A scripted model makes the plumbing runnable without credentials.
    // It is an illustration of two outcomes, not evidence of prompt effectiveness.
    const faux = fauxProvider();
    const respond = (context) => {
      faux.appendResponses([respond]);
      const last = context.messages.at(-1);
      if (last.role === 'user') return fauxAssistantMessage(
        fauxToolCall('read', { path: 'claims.json' }), { stopReason: 'toolUse' });
      const user = context.messages.findLast(message => message.role === 'user');
      const improved = JSON.stringify(user.content).includes('Include zero');
      return fauxAssistantMessage(JSON.stringify(improved ? { count: 3, mean: 100 } : { count: 2, mean: 150 }));
    };
    faux.setResponses([respond]);
    models.setProvider(faux.provider);
    selected = faux.getModel();
  }
  const registry = createRegistry();
  const read = createReadTool();
  // The tiny model supplied limit: 0 and received no records. This task only
  // needs whole-file reads; remove irrelevant choices from its tool contract.
  registry.install(defineExtension({ name: 'workshop-read', tools: [{ ...read,
    parameters: Type.Object({ path: Type.String() }),
    execute: (args, api, context) => read.execute({ path: args.path }, api, context),
  }] }));
  const env = new NodeExecutionEnv({ cwd: resolve('fixture') });
  const harness = await Harness.open(await openNodeSqliteStorage(path), {
    models, registry, env: () => env,
  }, ctx);
  const root = await harness.root(ctx, { agent: {
    model: { provider: selected.provider, modelId: selected.id },
    cwd: resolve('fixture'), tools: [{ name: 'read' }], instructions: 'Be concise. Inspect the file before answering. /no_think',
  }});
  harness.resume();
  return {
    async submit(variant, requestId) {
      if (!Object.hasOwn(prompts, variant)) throw new Error('Unknown variant');
      return root.submit({ type: 'input', content: prompts[variant], requestId }, ctx);
    },
    async entries() {
      const entries = [];
      let cursor;
      do {
        const page = await root.entries({ order: 'ascending' }, 100, cursor, ctx);
        entries.push(...page.items);
        cursor = page.next;
      } while (cursor);
      return entries;
    },
    async review(data) {
      await root.submit({ type: 'write', entry: { kind: 'workshop.review', data } }, ctx);
    },
    async wait(submission) {
      const timer = setTimeout(() => { root.abort(ctx).catch(() => {}); }, 90000);
      try { return await submission.wait(ctx); } finally { clearTimeout(timer); }
    },
    async close() { await harness.close(ctx); await env.cleanup(ctx); },
  };
}
