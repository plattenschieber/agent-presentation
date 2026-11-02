// Task-specific checks. Human review still decides whether the work is useful.
export function evaluate(text) {
  let result;
  try { result = JSON.parse(text); }
  catch { return [{ name: 'Valid JSON', pass: false }]; }
  return [
    { name: 'Counts zero; excludes missing (3)', pass: result?.count === 3 },
    { name: 'Mean claim amount is 100', pass: result?.mean === 100 },
  ];
}
