# 4 · Make an agent survive a crash

**Outcome:** explain checkpoints, replay and the boundary of an external side effect.

Start with [the common introduction](INTRO.md). Open `04-crash.excalidraw` and path 4 in the workbench.

| Time | Facilitate |
| --- | --- |
| 20–40 | Predict what a process crash loses. Distinguish the browser, server process, stored conversation and external effects. |
| 40–80 | Inspect `labs/crash-worker.mjs`. Trace the model's Code Mode call into two nested tools. Explain the stored checkpoint after the first result. |
| 80–110 | Run the drill: first tool finishes, second starts, parent sends SIGKILL, a fresh process reopens SQLite. Count effects and inspect the final submission. |
| 110–120 | Discuss a payment or email occurring just before a crash. Explain why this experiment does not prove exactly-once external effects. |

## Participant card

1. Predict whether the first tool will run twice.
2. Run the exercise and inspect its timeline and full trace.
3. Find the completed effect in `runs/<run-id>/effects.txt`.
4. Identify where the process is killed and where the new process is started.
5. Explain why `pause` is marked replay-safe, while an arbitrary external action should not be.

**Reference:** the file contains one recorded effect. The completed nested call is reused. The second call resumes through its declared replay behavior. The host—not Durable by itself—starts the new process.

## Facilitation notes

This is a real forced process termination, not a browser refresh dressed up as recovery. Agent decisions are scripted so the reliability experiment is repeatable.

Ask: “What if the external action happened but its result had not yet been committed?” Useful answers include idempotency keys, querying the external system, reconciliation, or asking a human. “Durable guarantees it” is not sufficient.

**Stretch:** replace the pause with a human-review state and expose it in the web interface.

**Done when:** participants can identify the stored boundary, explain which call repeats, and state what the experiment has not proved.
