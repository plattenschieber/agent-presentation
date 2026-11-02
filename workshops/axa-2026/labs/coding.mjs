import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';

const exec = promisify(execFile);
export const broken = `export function mean(values) {
  const numbers = values.filter(Boolean);
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}\n`;
const tests = `import { mean } from './mean.mjs';
import assert from 'node:assert/strict';
assert.equal(mean([0, 100, null, 200]), 100);
assert.equal(mean([0, 0]), 0);
assert.equal(mean([-10, 10]), 0);
assert.equal(mean([null]), null);
console.log('4 independent behavior checks passed');\n`;

export async function codingLab(directory) {
  const trace = [];
  const tools = {
    read: path => readFile(join(directory, path), 'utf8'),
    write: ({ path, content }) => writeFile(join(directory, path), content),
    async edit({ path, before, after }) {
      const source = await tools.read(path);
      if (!source.includes(before)) throw new Error('Edit target not found');
      await tools.write({ path, content: source.replace(before, after) });
      return 'Edit applied';
    },
    async bash() {
      // One allowlisted command for this browser demo. The CLI exercise uses real bash.
      try { const result = await exec(process.execPath, ['verify.mjs'], { cwd: directory });
        return { exitCode: 0, output: result.stdout }; }
      catch (error) { return { exitCode: error.code, output: error.stderr }; }
    },
  };
  await tools.write({ path: 'mean.mjs', content: broken });
  await tools.write({ path: 'verify.mjs', content: tests });
  // These decisions are scripted. Participants replace this sequence with Pi.
  const decisions = [
    ['read', 'mean.mjs'], ['bash', {}],
    ['edit', { path: 'mean.mjs', before: 'values.filter(Boolean)', after: "values.filter(n => typeof n === 'number')" }],
    ['edit', { path: 'mean.mjs', before: 'return numbers.reduce', after: 'if (!numbers.length) return null;\n  return numbers.reduce' }],
    ['bash', {}],
  ];
  for (const [tool, args] of decisions) {
    const result = await tools[tool](args);
    trace.push({ tool, args, result });
  }
  return { title: 'A small loop, a real repair', mode: 'Scripted agent decisions · real file edits and tests',
    before: broken, after: await tools.read('mean.mjs'), trace,
    checks: [
      { name: 'Original implementation fails behavior checks', pass: trace[1].result.exitCode !== 0 },
      { name: 'Repaired implementation passes all four checks', pass: trace.at(-1).result.exitCode === 0 },
    ] };
}
