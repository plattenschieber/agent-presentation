import { CodemodeSandbox } from '@earendil-works/pi-codemode';
import { createModels } from '@earendil-works/pi-ai/models';
import { typesafeProvider } from '@earendil-works/pi-ai/providers/typesafe';
import { judgeWithChat } from '../judge.mjs';

// Hand-authored teaching examples, not recorded Jev outputs or a benchmark.
export const examples = [
  { id: 'a', split: 'practice', text: 'The answer counts zero and excludes missing amounts.', expected: true, probability: 0.92 },
  { id: 'b', split: 'practice', text: 'I removed all falsy values, then calculated the mean.', expected: false, probability: 0.72 },
  { id: 'c', split: 'practice', text: 'I guessed the mean without opening the data.', expected: false, probability: 0.18 },
  { id: 'd', split: 'holdout', text: 'Zero is a recorded value. Null is absent. There are three observations.', expected: true, probability: 0.81 },
  { id: 'e', split: 'holdout', text: 'I excluded the zero because there was no payment.', expected: false, probability: 0.58 },
  { id: 'f', split: 'holdout', text: 'Both zero and null were dropped as missing.', expected: false, probability: 0.43 },
];
export const rubric = 'Does this reasoning treat zero amounts as recorded observations and null amounts as missing?';

export async function reviewerLab(threshold = 0.8, live = false) {
  const alternative = live && Boolean(process.env.JUDGE_BASE_URL);
  if (live && !alternative && !process.env.TYPESAFE_API_KEY) throw new Error('Set TYPESAFE_API_KEY or configure JUDGE_BASE_URL and JUDGE_MODEL. No fallback was used.');
  const models = createModels();
  models.setProvider(typesafeProvider());
  const classifier = models.getModelOfType('classifier', 'typesafe', 'jev-latest');
  if (live && !classifier) throw new Error('Jev model is not in the pinned Pi catalog');
  const classify = async ({ id, text }) => {
    if (!live) return examples.find(example => example.id === id).probability;
    if (alternative) return judgeWithChat(text, rubric);
    const result = await models.classify(classifier, { state: { text }, questions: {
      correct: { type: 'bool', instructions: rubric,
        criteria: { true: 'Explicitly preserves zero and excludes null.', false: 'Drops zero, treats null as numeric, or gives no evidence.' } },
    }});
    if (result.stopReason !== 'stop') throw new Error(result.errorMessage || result.stopReason);
    return result.answers.correct.probability;
  };
  const script = `const rows = await tools.examples({});
return await Promise.all(rows.map(async row => ({
  id: row.id, probability: await tools.judge({id: row.id, text: row.text})
})));`;
  const sandbox = new CodemodeSandbox({ timeoutMs: Number(process.env.JUDGE_TIMEOUT_MS || 60000), tools: [
    { name: 'examples', execute: () => examples.map(({ id, text }) => ({ id, text })) },
    { name: 'judge', execute: classify },
  ] });
  try {
    const result = await sandbox.execute(script);
    if (!result.ok) throw new Error(result.error.message);
    const rows = result.value.map(answer => ({ ...examples.find(row => row.id === answer.id), ...answer,
      predicted: answer.probability >= threshold }));
    const score = split => {
      const matrix = { tp: 0, tn: 0, fp: 0, fn: 0 };
      for (const row of rows.filter(row => row.split === split))
        matrix[row.expected ? (row.predicted ? 'tp' : 'fn') : (row.predicted ? 'fp' : 'tn')]++;
      return matrix;
    };
    return { title: 'Teach the reviewer what failure means', mode: alternative ? `Live reviewer: ${process.env.JUDGE_MODEL} · real Code Mode` : live ? 'Live Jev through Pi + real Code Mode' : 'Illustrative probabilities · real Code Mode · no Jev request',
      rubric, script, threshold, rows, practice: score('practice'), holdout: score('holdout'),
      checks: [{ name: 'All six classifier results have a valid probability', pass: rows.length === 6 && rows.every(row => row.probability >= 0 && row.probability <= 1) }],
      trace: result.calls };
  } finally { await sandbox.close(); }
}
