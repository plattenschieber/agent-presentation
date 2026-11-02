import { mkdir, writeFile } from 'node:fs/promises';
import { baseUrl, deployment, model } from './model.mjs';

await mkdir('.local/pi', { recursive: true });
await writeFile('.local/pi/models.json', JSON.stringify({ providers: {
  azure: { baseUrl, apiKey: '$AZURE_OPENAI_API_KEY', models: [model] },
}}, null, 2));
await writeFile('.local/pi/settings.json', JSON.stringify({
  defaultProvider: 'azure', defaultModel: deployment,
}, null, 2));
console.log('Workshop Pi configuration ready. Your global Pi settings are unchanged.');
if (!process.env.AZURE_OPENAI_API_KEY) {
  console.log('No key supplied; connection not tested. See SETUP.md.');
} else {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/responses`, {
    method: 'POST', signal: AbortSignal.timeout(30000),
    headers: { 'Content-Type': 'application/json', 'api-key': process.env.AZURE_OPENAI_API_KEY },
    body: JSON.stringify({ model: deployment, input: 'Reply with OK.', max_output_tokens: 128 }),
  });
  console.log(`Azure connection: HTTP ${response.status}`);
  if (!response.ok) process.exitCode = 1;
}
