/** Synthetic teaching example. No Jev call, key, network, or measured model output. */
import assert from 'node:assert/strict';

function invoiceReader(keyFor) {
  const cache = new Map();
  return (tenantId, invoiceId) => {
    const key = keyFor(tenantId, invoiceId);
    if (!cache.has(key)) cache.set(key, { tenantId, invoiceId });
    return cache.get(key);
  };
}

// Both implementations pass the submitted same-tenant cache-hit test.
const broken = invoiceReader((_tenant, invoiceId) => invoiceId);
const correct = invoiceReader((tenant, invoiceId) => `${tenant}:${invoiceId}`);
for (const read of [broken, correct]) {
  assert.strictEqual(read('A', 42), read('A', 42));
}
console.log('PASS: the submitted cache-hit test passes on both versions.');

// The independent probe catches the seeded defect in the proposed change.
assert.equal(broken('B', 42).tenantId, 'A');
assert.equal(correct('B', 42).tenantId, 'B');
console.log('REPRODUCED: tenant B receives tenant A data with the broken cache key.');
console.log('PASS: the original tenant-scoped key preserves isolation in this probe.');

function route({ requiredCheckFailed, evidenceMissing, sensitiveBoundaryChanged }) {
  if (requiredCheckFailed) return 'revise';
  if (evidenceMissing) return 'request_verification';
  if (sensitiveBoundaryChanged) return 'owner_review';
  return 'normal_review';
}

assert.equal(route({ requiredCheckFailed: true, evidenceMissing: true }), 'revise');
assert.equal(route({ evidenceMissing: true, sensitiveBoundaryChanged: true }), 'request_verification');
assert.equal(route({ sensitiveBoundaryChanged: true }), 'owner_review');
assert.equal(route({}), 'normal_review');
// Adding a confident model answer cannot bypass a failed required check.
assert.equal(route({ requiredCheckFailed: true, modelConfidence: 1 }), 'revise');
console.log('PASS: all 5 policy assertions; no automatic approval route.');
