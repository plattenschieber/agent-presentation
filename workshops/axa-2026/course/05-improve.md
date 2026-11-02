# 5 · Build your own agent workbench

**Outcome:** leave with a repeatable observe → review → change → check loop.

Start with [the common introduction](INTRO.md). Open `05-improve.excalidraw` and path 5 in the workbench. This is the recommended AXA session.

| Time | Facilitate |
| --- | --- |
| 20–45 | Use Pi to repair the small data function from path 1. Keep its independent checks visible. |
| 45–80 | Run the workbench baseline. Inspect the actual file-read result and model answer. Write an observation before adding categories. Save a human verdict. |
| 80–110 | Turn one observation into a concrete check. Change one instruction, run a fresh candidate, and compare. Add a new case before claiming improvement. |
| 110–120 | Show the short crash demo. Each pair names one reusable component and one limitation. |

## Participant card

1. Run the baseline. Before reading a score, inspect what the agent saw and did.
2. Record a failure in plain language: “Zero was dropped, so the mean is too high.”
3. Read `evaluate.mjs`. Explain the promise each check enforces.
4. Run the candidate instruction. Compare the trace and answer with the baseline.
5. Add a case with all zeros or all missing values. Extend the task contract before extending the checker.
6. Save your review and reload the page. Check that the evidence remains.

**Fixture answer:** baseline returns count 2 / mean 150; candidate returns count 3 / mean 100. This contrast is scripted to teach the interface. A live model may get the baseline right; use its actual failure, or openly switch to the teaching fixture.

## Facilitation notes

Name the layers: model access, agent execution, tools, product interface. The browser sends tasks and displays evidence; Durable owns the conversation. A good interface makes uncertainty and failures easier to inspect.

Do not let this turn into a dashboard-building contest. One useful trace, one saved observation and one check are enough. Reusable instructions should follow observed failure, not a speculative list of rules.

**Stretch:** batch checks with Code Mode, then add JEV or a small model for one subjective criterion. Validate against human labels. Subagents are a later experiment, not a requirement.

**Done when:** the pair can show a failure, explain the change, and produce independent evidence for the result.
