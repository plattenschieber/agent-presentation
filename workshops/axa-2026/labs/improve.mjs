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
    const modelAnswer = answer?.content.filter(block => block.type === 'text').map(block => block.text).join('') ?? '';
    // Preserve a structured tool artifact instead of asking the model to rewrite it.
    const artifact = trace.flatMap(entry => entry.model ?? []).findLast(message =>
      message.role === 'toolResult' && message.toolName === 'summarize_claims' && !message.isError);
    const text = artifact?.content.filter(block => block.type === 'text').map(block => block.text).join('') ?? modelAnswer;
    return { title: 'Observe → change one thing → rerun', variant,
      mode: live ? `Live ${process.env.AGENT_MODEL || 'Azure'} agent · Pi Durable · Code Mode` : 'Scripted tool selection · real Code Mode, Durable trace and checks',
      answer: text, modelAnswer, answerSource:artifact ? 'Code Mode tool artifact' : 'Model response', checks: evaluate(text), trace,
      question: 'What failed? Write an observation before naming a failure category.' };
  } finally { await agent.close(); }
}
