import { join } from 'node:path';
import { openAgent } from '../agent.mjs';
import { evaluate } from '../evaluate.mjs';

export async function improvementLab(directory, variant, live = false) {
  const agent = await openAgent(join(directory, 'agent.sqlite'), live);
  try {
    const submission = await agent.submit(variant, 'one-task');
    const settled = await agent.wait(submission);
    if (settled.status !== 'done') throw new Error(`Agent did not answer: ${settled.status}`);
    const trace = await agent.entries();
    const answer = trace.find(entry => entry.id === settled.answer)?.model?.[0];
    const text = answer?.content.filter(block => block.type === 'text').map(block => block.text).join('') ?? '';
    return { title: 'Observe → change one thing → rerun', variant,
      mode: live ? 'Live Azure agent · Pi Durable · task-specific checks' : 'Scripted model outcomes · real file read, Durable trace and checks',
      answer: text, checks: evaluate(text), trace,
      question: 'What failed? Write an observation before naming a failure category.' };
  } finally { await agent.close(); }
}
