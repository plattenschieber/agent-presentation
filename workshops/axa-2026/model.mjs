export const baseUrl = process.env.AZURE_OPENAI_BASE_URL ||
  'https://summit-workshops-llm.services.ai.azure.com/openai/v1';
export const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-6-luna';

// Conservative workshop budgets, not a claim about the deployment's actual limits.
// Prices are unknown. Do not use this configuration to estimate spend.
export const model = {
  id: deployment, name: `${deployment} (workshop)`, provider: 'azure',
  api: 'azure-openai-responses', baseUrl, type: 'chat', reasoning: true,
  input: ['text'], contextWindow: 32000, maxTokens: 4096,
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
};
