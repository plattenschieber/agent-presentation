# 1 · Build the smallest useful agent

**Outcome:** explain the agent loop and repair a data bug with independent checks.

Start with [the common introduction](INTRO.md). Open `01-coding.excalidraw` and select path 1 in the workbench.

| Time | Facilitate |
| --- | --- |
| 20–40 | Predict the bug before running. Show the failing implementation and its trace. Point out that the offline decisions are scripted, while file operations and tests are real. |
| 40–85 | Pairs make their own copy of the function, ask Pi to inspect it, propose a plan and repair it. Reviewer watches the diff and prevents changes to the independent checks. Switch roles after 20 minutes. |
| 85–110 | Add one new edge case per pair. Run it. Compare a fluent explanation with actual test evidence. |
| 110–120 | Each pair records one useful instruction and one failure they would now catch. |

## Participant card

The original function uses `values.filter(Boolean)` before computing the mean. Your contract: retain numeric zero, omit null, and return null if no observations remain.

1. Predict the outputs for `[0,100,null,200]`, `[0,0]`, `[-10,10]` and `[null]`.
2. Run the browser exercise. Expand the full trace; locate read, failed test, edits and passing test.
3. Open `labs/coding.mjs`. Copy the small function into a new `mean.mjs` in your exercise folder.
4. Ask Pi to explain its plan, repair only that file, and run checks. Review the diff before accepting it.
5. Add a new case that was not in the original task.

**Reference outputs:** 100, 0, 0, null. The failure is a truthiness filter confusing a legitimate value with missing data.

## Facilitation notes

Ask: “Would this still pass if the agent edited the test?” Keep the acceptance checks separate from the agent's target file. Do not mistake four examples for a full numeric-data contract: strings, NaN and Infinity are a useful scope discussion.

**Stretch:** replace the scripted decision sequence with a model call. Keep the tool interface and checks stable. Then compare a single agent with a separate review pass.

**Done when:** the independent checks pass and the reviewer can explain the edit without asking the agent.
