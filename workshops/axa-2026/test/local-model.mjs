import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';
import { once } from 'node:events';
import assert from 'node:assert/strict';
import { reviewerLab } from '../labs/reviewer.mjs';
import { improvementLab } from '../labs/improve.mjs';

if (!process.env.LLAMA_SERVER || !process.env.LLAMA_MODEL) throw new Error('Set LLAMA_SERVER and LLAMA_MODEL to local paths.');
await mkdir('evidence',{recursive:true});
await mkdir('.local',{recursive:true});
const base = 'http://127.0.0.1:4179/v1';
process.env.JUDGE_BASE_URL = base;
process.env.JUDGE_MODEL = 'workshop-local';
process.env.AGENT_BASE_URL = base;
process.env.AGENT_MODEL = 'workshop-local';
const child = spawn(process.env.LLAMA_SERVER,[
  '-m',process.env.LLAMA_MODEL,'--host','127.0.0.1','--port','4179','-c','8192','-np','1','-t','2',
  '--alias','workshop-local','--jinja','--reasoning','off',
],{env:{...process.env,LD_LIBRARY_PATH:dirname(process.env.LLAMA_SERVER),
  GGML_BACKEND_PATH:resolve(dirname(process.env.LLAMA_SERVER),process.env.LLAMA_CPU_BACKEND || 'libggml-cpu-x64.so')},stdio:['ignore','ignore','pipe']});
let logs = '';
child.stderr.on('data',chunk => { logs += chunk; });
const exited = once(child,'exit');
try {
  let ready = false;
  for (let attempt=0;attempt<120;attempt++) {
    if (child.exitCode !== null) throw new Error(`Local model exited: ${logs.slice(-2000)}`);
    try { ready = (await fetch('http://127.0.0.1:4179/health')).ok; } catch { /* loading */ }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve,500));
  }
  assert.ok(ready,'Local model becomes healthy');
  console.log('Local model ready. Running actual reviewer inference.');
  const reviewer = await reviewerLab(0.8,true);
  assert.ok(reviewer.checks.every(check => check.pass));
  console.log('Reviewer returned six valid scores:',reviewer.rows.map(row => row.probability));
  const agent = await improvementLab(await mkdtemp(resolve('.local/live-')),'candidate',true);
  const read = agent.trace.some(entry => entry.model?.some(message => message.role === 'toolResult' && !message.isError &&
    ((message.toolName === 'read' && JSON.stringify(message.content).includes('amount')) || message.toolName === 'summarize_claims')));
  assert.ok(read,'Real model invokes a tool that reads the source file');
  const evidence = {at:new Date().toISOString(),model:process.env.LOCAL_MODEL_LABEL || basename(process.env.LLAMA_MODEL),server:'llama.cpp b12032',
    reviewer,agent,interpretation:'Live local inference. Reviewer scores are not calibrated probabilities. Six teaching examples do not establish general quality.'};
  await writeFile('evidence/local-model.json',JSON.stringify(evidence,null,2));
  assert.ok(agent.checks.every(check => check.pass),'Live agent meets the task-specific checks');
  console.log('Live agent passed: real tool read and correct task result.');
} finally {
  child.kill('SIGTERM');
  const force = setTimeout(() => child.kill('SIGKILL'),3000);
  await exited;
  clearTimeout(force);
  await writeFile('.local/llama.log',logs);
}
