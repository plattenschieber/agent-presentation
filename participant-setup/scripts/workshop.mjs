import { spawnSync, spawn } from 'node:child_process';
import { mkdir, writeFile, chmod, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { modeArguments } from './modes.mjs';
import { configure, testConnection, agentDir, deployment } from './config.mjs';

process.chdir(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
try { process.loadEnvFile('.env'); } catch (error) { if (error.code !== 'ENOENT') throw error; }

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', ...options });
  if (result.error) throw new Error(`Could not run ${command}: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`${command} exited with code ${result.status}`);
}

async function askKey() {
  if (!process.stdin.isTTY) throw new Error('Set AZURE_OPENAI_API_KEY or run setup in an interactive terminal.');
  process.stdout.write('Paste your workshop API key, then press Enter (hidden): ');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  return new Promise((resolve, reject) => {
    let key = '';
    const finish = () => {
      process.stdin.off('data', receive);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\n');
    };
    const receive = chunk => {
      const text = chunk.toString();
      if (text.includes('\u0003')) { finish(); reject(new Error('Setup cancelled.')); return; }
      for (const char of text) {
        if (char === '\u007f' || char === '\b') key = key.slice(0, -1);
        else if (!/[\r\n]/.test(char)) key += char;
      }
      if (/[\r\n]/.test(text)) { finish(); resolve(key.replace(/\s/g, '')); }
    };
    process.stdin.on('data', receive);
  });
}

function piEnvironment() {
  return { ...process.env, PI_CODING_AGENT_DIR: agentDir, PI_SKIP_VERSION_CHECK: '1' };
}

async function setup() {
  let key = process.env.AZURE_OPENAI_API_KEY?.trim();
  if (!key) key = await askKey();
  if (!/^[A-Za-z0-9_+=\/-]+$/.test(key)) throw new Error('The key contains unexpected characters. Copy it as plain text.');
  await writeFile('.env', `AZURE_OPENAI_API_KEY=${key}\n`, { mode: 0o600 });
  if (process.platform !== 'win32') await chmod('.env', 0o600);
  process.env.AZURE_OPENAI_API_KEY = key;
  run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['ci'], { shell: process.platform === 'win32' });
  await configure();
  console.log(await testConnection(key));
  console.log('Ready. Start the clean baseline with: pixi run baseline');
}

async function startPi(extra = [], capture = false, mode = 'baseline') {
  if (!process.env.AZURE_OPENAI_API_KEY) throw new Error('Run pixi run setup first.');
  const cli = resolve('node_modules/@earendil-works/pi-coding-agent/dist/cli.js');
  try { await access(cli); } catch { throw new Error('Pi is not installed. Run pixi run setup.'); }
  await configure();
  const child = spawn(process.execPath, [cli, '--provider', 'azure', '--model', deployment, ...modeArguments(mode), ...extra], {
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit', env: piEnvironment(),
  });
  let output = '', errors = '';
  if (capture) {
    child.stdout.on('data', data => { output += data; });
    child.stderr.on('data', data => { errors += data; });
  }
  const timer = capture ? setTimeout(() => child.kill(), 90000) : null;
  try {
    await new Promise((resolve, reject) => {
      child.on('error', reject);
      child.on('close', code => code === 0 ? resolve() : reject(new Error(errors || `Pi exited with code ${code}`)));
    });
  } finally { if (timer) clearTimeout(timer); }
  return output;
}

async function testAgent() {
  await mkdir('.workshop', { recursive: true });
  await writeFile('.workshop/check.txt', 'PI_WORKSHOP_READY');
  const output = await startPi(['--mode', 'json', '--no-session', '--tools', 'read,bash',
    'Use read to open .workshop/check.txt. Then use bash to run node --version. Report the file contents and Node version.'], true);
  const events = output.split('\n').filter(line => line.startsWith('{')).map(line => JSON.parse(line));
  const calls = events.filter(event => event.type === 'tool_execution_end' && !event.isError);
  const read = calls.some(event => event.toolName === 'read' && JSON.stringify(event.result).includes('PI_WORKSHOP_READY'));
  const bash = calls.some(event => event.toolName === 'bash' && /v24\./.test(JSON.stringify(event.result)));
  if (!read || !bash) throw new Error('Pi did not complete both checks. Run pixi run doctor, then try again.');
  console.log('Agent ready: Azure model read a file and ran Node through bash.');
}

try {
  const command = process.argv[2];
  if (command === 'setup') await setup();
  else if (command === 'test-connection') console.log(await testConnection(process.env.AZURE_OPENAI_API_KEY));
  else if (command === 'pi') await startPi(process.argv.slice(3));
  else if (command === 'baseline' || command === 'interview') {
    if (process.argv.length > 3) throw new Error('Workshop modes accept no CLI overrides. Paste your prompt after Pi opens; use pixi run pi for custom options.');
    console.log(command === 'baseline' ? 'Baseline: no discovered skills or context files.' : 'Interview: only bundled grill-me and grilling skills. Start with /skill:grill-me');
    await startPi([], false, command);
  }
  else if (command === 'test-agent') await testAgent();
  else if (command === 'doctor') {
    console.log(`Node: ${process.version}`);
    run('git', ['--version']);
    const { getShellConfig } = await import('../node_modules/@earendil-works/pi-coding-agent/dist/utils/shell.js');
    run(getShellConfig().shell, ['--version']);
    console.log(`Key: ${process.env.AZURE_OPENAI_API_KEY ? 'configured' : 'missing'}`);
    console.log(`Pi configuration: ${agentDir}`);
  } else throw new Error('Use setup, test-connection, test-agent, doctor, pi, baseline or interview.');
} catch (error) {
  console.error(error.message.replaceAll(process.env.AZURE_OPENAI_API_KEY || '\u0000', '[redacted]'));
  process.exitCode = 1;
}
