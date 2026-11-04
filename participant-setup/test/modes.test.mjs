import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, cp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

test('workshop launcher passes isolated modes, keeps cwd, and rejects overrides', async () => {
  const root = await mkdtemp(join(tmpdir(), 'workshop-mode-'));
  const setup = join(root, 'participant-setup');
  try {
    await cp(fileURLToPath(new URL('../scripts', import.meta.url)), join(setup, 'scripts'), { recursive: true });
    await cp(fileURLToPath(new URL('../skills', import.meta.url)), join(setup, 'skills'), { recursive: true });
    const cli = join(setup, 'node_modules/@earendil-works/pi-coding-agent/dist');
    await mkdir(cli, { recursive: true });
    await writeFile(join(cli, 'cli.js'), 'console.log(JSON.stringify({args:process.argv.slice(2),cwd:process.cwd()}))');
    const run = (...args) => spawnSync(process.execPath, [join(setup, 'scripts/workshop.mjs'), ...args], {
      cwd: root, encoding: 'utf8', env: { ...process.env, AZURE_OPENAI_API_KEY: 'fixture-not-a-real-key' },
    });
    for (const mode of ['baseline', 'interview']) {
      const result = run(mode);
      assert.equal(result.status, 0, result.stderr);
      const { args, cwd } = JSON.parse(result.stdout.trim().split('\n').at(-1));
      assert.equal(cwd, setup);
      for (const flag of ['--no-skills', '--no-extensions', '--no-prompt-templates', '--no-context-files', '--no-session', '--no-mcp']) assert.ok(args.includes(flag), flag);
      assert.equal(args[args.indexOf('--tools') + 1], 'read,write,edit,bash');
      const skills = args.flatMap((x, i) => x === '--skill' ? [args[i + 1]] : []);
      assert.equal(skills.length, mode === 'interview' ? 2 : 0);
      for (const path of skills) assert.match(await readFile(path, 'utf8'), /^---\nname: (grill-me|grilling)\n/);
      assert.ok(!result.stdout.includes('fixture-not-a-real-key'));
    }
    assert.notEqual(run('baseline', '--skill', 'personal').status, 0);
    assert.notEqual(run('interview', '--continue').status, 0);
    const legacy = run('pi', '--print', 'hello');
    assert.equal(legacy.status, 0);
    assert.deepEqual(JSON.parse(legacy.stdout).args.slice(-2), ['--print', 'hello']);
  } finally { await rm(root, { recursive: true, force: true }); }
});
