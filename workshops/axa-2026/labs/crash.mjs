import { fork } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

function runWorker(directory, phase) {
  return new Promise((resolve, reject) => {
    const child = fork(new URL('./crash-worker.mjs', import.meta.url), [directory, phase], { silent: true, execArgv: [] });
    let result, stderr = '';
    const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('Crash worker timed out')); }, 15000);
    child.stderr.on('data', data => { stderr += data; });
    child.on('error', error => { clearTimeout(timer); reject(error); });
    child.on('message', message => {
      if (message.phase === 'ready-to-kill') { result = message; child.kill('SIGKILL'); }
      if (message.phase === 'done') result = message;
    });
    child.on('exit', (code, signal) => {
      clearTimeout(timer);
      if (result && (code === 0 || signal === 'SIGKILL')) resolve({ ...result, code, signal });
      else reject(new Error(`Crash worker failed: ${stderr}`));
    });
  });
}

export async function crashLab(directory) {
  const first = await runWorker(directory, 'pause');
  const resumed = await runWorker(directory, 'resume');
  const effects = (await readFile(join(directory, 'effects.txt'), 'utf8')).trim().split('\n');
  return { title: 'Kill the process. Keep the work.', mode: 'Real SQLite, Code Mode and SIGKILL · scripted model decisions',
    result: resumed.result, trace: resumed.entries,
    timeline: ['First tool completes and is checkpointed', 'Second tool starts', 'Parent sends SIGKILL', 'Fresh process reopens SQLite', 'Code Mode reuses the completed call and continues'],
    checks: [
      { name: 'First process was killed with SIGKILL', pass: first.signal === 'SIGKILL' },
      { name: 'Fresh process finishes the original submission', pass: resumed.result.status === 'done' },
      { name: 'Previously completed effect happened exactly once in this run', pass: effects.length === 1 },
    ] };
}
