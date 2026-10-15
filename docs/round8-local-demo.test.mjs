/** OFFLINE mocked HTTP tests only. These are not measured model judgments. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { BASE_URL, answerSchema, judgeLocally, reviewPrompt, runDemo, validateAnswer } from './round8-local-demo.mjs';

const model = 'example-local:1b';
const answer = { risk: 'unclear', next_check: 'inspect_contract', rationale: 'Offline fixture, not a model result.' };
const json = value => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } });
function mock({ tags = { models: [{ name: model }] }, show = {}, chat = { done: true, message: { content: JSON.stringify(answer) } } } = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    assert.ok(url.startsWith(`${BASE_URL}/api/`));
    assert.equal(init.redirect, 'error');
    assert.ok(init.signal instanceof AbortSignal);
    return json(url.endsWith('/tags') ? tags : url.endsWith('/show') ? show : chat);
  };
  return { fetchImpl, calls };
}

test('OFFLINE mocked success: fixed host, installed tag, bounded generation and schema', async () => {
  const fixture = mock();
  assert.deepEqual(await judgeLocally({ model, ...fixture }), answer);
  assert.equal(fixture.calls.length, 3);
  const body = JSON.parse(fixture.calls[2].init.body);
  assert.deepEqual(body.options, { temperature: 0, num_ctx: 4096, num_predict: 256 });
  assert.equal(body.stream, false);
  assert.equal(body.think, false);
  assert.equal(body.keep_alive, '10m');
  assert.deepEqual(body.format, answerSchema);
  assert.deepEqual(body.messages, [{ role: 'user', content: reviewPrompt }]);
  assert.doesNotMatch(reviewPrompt, /REPRODUCED|receives tenant A data|expected answer/i);
});

test('OFFLINE absent model stops before chat and never downloads', async () => {
  const fixture = mock({ tags: { models: [] } });
  await assert.rejects(judgeLocally({ model, ...fixture }), /not installed/);
  assert.equal(fixture.calls.length, 1);
});

test('OFFLINE cloud tags rejected before network', async () => {
  for (const tag of ['example:cloud', 'remote-model:1b', 'https://example.com/model']) {
    await assert.rejects(judgeLocally({ model: tag, fetchImpl: () => assert.fail('No network allowed') }), /local model tag/);
  }
});

test('OFFLINE cloud metadata in tags or show prevents inference', async () => {
  for (const field of ['remote_host', 'remote_model']) {
    for (const where of ['tags', 'show']) {
      const fixture = mock(where === 'tags' ? { tags: { models: [{ name: model, [field]: 'remote' }] } } : { show: { [field]: 'remote' } });
      await assert.rejects(judgeLocally({ model, ...fixture }), /metadata rejected/);
      assert.ok(fixture.calls.every(call => !call.url.endsWith('/chat')));
    }
  }
});

test('OFFLINE malformed model JSON and invalid schemas are rejected', async () => {
  const invalid = [null, [], {}, { ...answer, extra: true }, { ...answer, risk: 'safe' }, { ...answer, next_check: 'approve' }, { ...answer, rationale: 1 }, { ...answer, rationale: 'a'.repeat(401) }];
  for (const value of invalid) {
    assert.throws(() => validateAnswer(value), /strict response schema/);
    await assert.rejects(judgeLocally({ model, ...mock({ chat: { done: true, message: { content: JSON.stringify(value) } } }) }), /strict response schema/);
  }
  await assert.rejects(judgeLocally({ model, ...mock({ chat: { done: true, message: { content: '{not json' } } }) }), SyntaxError);
  await assert.rejects(judgeLocally({ model, ...mock({ chat: { done: false, message: { content: JSON.stringify(answer) } } }) }), /Incomplete/);
});

test('OFFLINE HTTP errors, oversized bodies and malformed envelopes fail closed', async () => {
  await assert.rejects(judgeLocally({ model, fetchImpl: async () => new Response('', { status: 503 }) }), /HTTP 503/);
  await assert.rejects(judgeLocally({ model, fetchImpl: async () => new Response('x'.repeat(262145)) }), /size limit/);
  await assert.rejects(judgeLocally({ model, fetchImpl: async () => new Response('{') }), SyntaxError);
});

test('OFFLINE overall deadline aborts even an unresponsive mock', async () => {
  let signal;
  await assert.rejects(judgeLocally({ model, timeoutMs: 10, fetchImpl: async (_url, init) => {
    signal = init.signal;
    return new Promise(() => {});
  } }), /deadline exceeded/);
  assert.equal(signal.aborted, true);
});

test('OFFLINE probe runs unconditionally after success or failure; fallback is clearly labeled', async () => {
  for (const fixture of [mock(), mock({ tags: { models: [] } })]) {
    const output = [];
    let probes = 0;
    const code = await runDemo({ model, ...fixture, log: text => output.push(text), error: text => output.push(text), probe: () => { probes++; } });
    assert.equal(probes, 1);
    assert.match(output.at(-1), /not model output/);
    if (fixture.calls.length === 3) {
      assert.equal(code, 0);
      assert.match(output[0], /Actual local generative-model judgment.*NOT Jev/);
      assert.ok(output[0].includes(`model: ${model};`));
    } else {
      assert.equal(code, 1);
      assert.match(output[0], /LOCAL MODEL UNAVAILABLE/);
      assert.ok(output.every(line => !line.includes('Actual local generative-model judgment')));
    }
  }
});
