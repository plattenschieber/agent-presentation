import { test } from 'node:test';
import assert from 'node:assert/strict';

test('Kev returns real yes/no probabilities through its TypeSafe-compatible API', {
  skip: process.env.TEST_KEV !== '1', timeout: 120000,
}, async () => {
  for (const [state, expected] of [
    ['I was charged twice. Please refund the duplicate payment.', true],
    ['What time does your shop open on Sundays?', false],
  ]) {
    const response = await fetch('http://127.0.0.1:8009/v1/systemone', {
      method: 'POST', signal: AbortSignal.timeout(60000),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'kev-latest', state,
        questions: { billing: { type: 'noul', instructions: 'Is this message about a billing or payment problem?' } },
      }),
    });
    assert.equal(response.status, 200);
    const data = await response.json();
    const probability = data.answers.billing.noul;
    assert.equal(typeof probability, 'number');
    assert.ok(probability >= 0 && probability <= 1);
    assert.equal(probability >= 0.5, expected, `Billing probability: ${probability}`);
  }
});
