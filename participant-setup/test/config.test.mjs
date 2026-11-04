import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { configure, deployment, testConnection } from '../scripts/config.mjs';

test('Pi configuration selects the deployment and references a key without embedding it', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'pi-setup-'));
  try {
    await configure(directory);
    const config = JSON.parse(await readFile(join(directory, 'models.json'), 'utf8'));
    const settings = JSON.parse(await readFile(join(directory, 'settings.json'), 'utf8'));
    assert.equal(settings.defaultProvider, 'azure');
    assert.equal(settings.defaultModel, deployment);
    assert.equal(config.providers.azure.apiKey, '$AZURE_OPENAI_API_KEY');
    assert.equal(config.providers.azure.models[0].api, 'azure-openai-responses');
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('Connection check requires a completed OK response, not just HTTP 200', async () => {
  const reply = (status, body) => async () => new Response(JSON.stringify(body), { status });
  await assert.rejects(testConnection(''), /No API key/);
  await assert.rejects(testConnection('test', undefined, reply(401, {})), /Azure HTTP 401/);
  await assert.rejects(testConnection('test', undefined, reply(200, { status: 'incomplete', output: [] })), /did not complete/);
  await assert.rejects(testConnection('test', undefined, reply(200, { status: 'completed', output: [{ content: [{ type: 'output_text', text: 'No' }] }] })), /did not complete/);
  assert.match(await testConnection('test', undefined, reply(200, { status: 'completed', output: [{ content: [{ type: 'output_text', text: 'OK' }] }] })), /replied OK/);
});
