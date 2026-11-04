import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const endpoint = 'https://summit-workshops-llm.services.ai.azure.com/openai/v1';
export const deployment = 'gpt-6-luna';
export const agentDir = fileURLToPath(new URL('../.workshop/pi', import.meta.url));

export async function configure(directory = agentDir) {
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'models.json'), JSON.stringify({ providers: {
    azure: { baseUrl: endpoint, apiKey: '$AZURE_OPENAI_API_KEY', models: [{
      id: deployment, name: 'AXA workshop', api: 'azure-openai-responses',
      reasoning: true, input: ['text'], contextWindow: 32000, maxTokens: 4096,
      // Limits are conservative workshop budgets; prices are unknown.
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    }] },
  } }, null, 2));
  await writeFile(resolve(directory, 'settings.json'), JSON.stringify({
    defaultProvider: 'azure', defaultModel: deployment,
  }, null, 2));
}

export async function testConnection(key, base = endpoint, fetcher = fetch) {
  if (!key) throw new Error('No API key. Run pixi run setup first.');
  const response = await fetcher(`${base.replace(/\/$/, '')}/responses`, {
    method: 'POST', signal: AbortSignal.timeout(45000),
    headers: { 'Content-Type': 'application/json', 'api-key': key },
    body: JSON.stringify({ model: deployment, input: 'Reply with exactly OK.', max_output_tokens: 256 }),
  });
  if (!response.ok) {
    const advice = { 401: 'Check the key and its uppercase/lowercase characters.',
      404: 'The workshop deployment was not found.', 429: 'Shared quota reached. Wait briefly and try again.' };
    throw new Error(`Azure HTTP ${response.status}. ${advice[response.status] || 'Ask the facilitator for help.'}`);
  }
  const data = await response.json();
  const text = (data.output ?? []).flatMap(item => item.content ?? [])
    .filter(part => part.type === 'output_text').map(part => part.text).join('').trim();
  if (data.status !== 'completed' || text !== 'OK') throw new Error('Azure responded but did not complete the OK check. Try again.');
  return 'Connected: gpt-6-luna replied OK.';
}
