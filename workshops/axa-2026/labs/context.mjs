import { CodemodeSandbox } from '@earendil-works/pi-codemode';

export const script = `const rows = await tools.claims({});
const amounts = rows.map(row => row.amount).filter(n => n !== null);
return {
  count: amounts.length,
  mean: amounts.reduce((sum, n) => sum + n, 0) / amounts.length
};`;

export async function contextLab() {
  const rows = Array.from({ length: 2000 }, (_, i) => ({ id: i, amount: [0, 100, null, 200][i % 4] }));
  const sandbox = new CodemodeSandbox({ timeoutMs: 5000, tools: [{ name: 'claims', execute: () => rows }] });
  try {
    const result = await sandbox.execute(script);
    if (!result.ok) throw new Error(result.error.message);
    const rawBytes = Buffer.byteLength(JSON.stringify(rows));
    const outputBytes = Buffer.byteLength(JSON.stringify(result.value));
    return { title: 'Keep the data out of the conversation', mode: 'Real Pi Code Mode / QuickJS · synthetic data',
      script, result: result.value, rawBytes, outputBytes,
      checks: [
        { name: 'Processes 2,000 rows; includes all 500 zero amounts', pass: result.value.count === 1500 && result.value.mean === 100 },
        { name: 'Returns less than 1% of the raw bytes', pass: outputBytes < rawBytes / 100 },
      ], trace: result.calls };
  } finally { await sandbox.close(); }
}
