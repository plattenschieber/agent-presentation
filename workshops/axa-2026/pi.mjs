import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

try { process.loadEnvFile('.env'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const child = spawn(process.execPath, [
  'node_modules/@earendil-works/pi-coding-agent/dist/cli.js', ...process.argv.slice(2),
], { stdio: 'inherit', env: { ...process.env, PI_CODING_AGENT_DIR: resolve('.local/pi') } });
child.on('exit', code => { process.exitCode = code ?? 1; });
