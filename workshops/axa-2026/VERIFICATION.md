# Verification

The evidence distinguishes execution from model quality. No finite test suite proves a general-purpose agent correct.

## Repeat locally

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
npm run test:boards
```

`npm test` exercises all five labs through HTTP, persists a review, restarts the service, verifies duplicate-submission handling, and actually kills and resumes a Code Mode workflow. The baseline's failed quality checks are expected and asserted.

`test:browser` operates all five paths in Chromium, saves a review, reloads it, checks mobile overflow and records screenshots. `test:boards` restores all five scenes through the native Excalidraw library and exports SVG previews. Their outputs go into `evidence/`.

The **Workshop proof** GitHub Actions workflow repeats these checks on a fresh Ubuntu runner. The runner and its artifact are the source of truth for the separate-environment result; a configured workflow alone is not a passing result.

**Recorded result:** [run 41373130269](https://github.com/plattenschieber/agent-presentation/actions/runs/41373130269) passed on commit `77ce66bec63e8f426a055b039bd9b23b363048c7`. It completed all five browser flows, review persistence, mobile overflow checks and native restore/export of all five Excalidraw scenes. The artifact contains screenshots and JSON reports. Later changes must pass their own run.

## Live model experiment

The local experiment uses Qwen3-0.6B-Q8_0 (official Qwen GGUF revision `23749fefcc72300e3a2ad315e1317431b06b590a`) and llama.cpp b12032. No API key is involved.

```sh
LLAMA_SERVER=/path/to/llama-server \
LLAMA_MODEL=/path/to/Qwen3-0.6B-Q8_0.gguf \
npm run test:local-model
```

The test starts and stops its own model process. It checks real classifier responses and an agent tool call, then asserts the task-specific output checks. A wrong answer fails the test. The saved trace remains available for error analysis.

The initial real run successfully read the file but echoed the data instead of returning a summary. A stricter output instruction exposed an empty read (`limit: 0`). Narrowing the tool to whole-file reads fixed that issue, but the 0.6B model still returned an incorrect mean. These failures are retained in the `local-model-*-failure` / `local-model-initial` / `local-model-empty-read` evidence files; they are not relabeled as successes. The small reviewer also missed the positive holdout example. It is unsuitable for autonomous acceptance on this evidence.

## Limits

- Azure and JEV service access have not been validated with working credentials.
- Scripted outputs demonstrate infrastructure, not prompt effectiveness.
- Six hand-authored reviewer examples are not a statistical evaluation.
- The crash test verifies one precise boundary: a completed call is reused after restart. It does not prove exactly-once arbitrary external effects.
- Linux checks do not establish Windows/macOS readiness; use the preparation session for those machines.
