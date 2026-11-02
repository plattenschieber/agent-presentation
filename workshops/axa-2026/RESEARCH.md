# Why these five paths?

## What people are building

| Evidence | Concrete pattern | What to borrow |
| --- | --- | --- |
| [Hamel Husain + Shreya Shankar: eval skills](https://hamel.dev/blog/posts/evals-skills/) | Generated trace-review interfaces, error discovery, evaluator audits, judge validation | Read examples and write human observations before automating judgments |
| [Eval skills issue 2](https://github.com/ai-evals-course/evals-skills/issues/2) | A user asks how the demo's annotation-monitoring workflow is implemented | The UI is part of the evaluation workflow, not just a score dashboard |
| [Eval skills PR 7](https://github.com/ai-evals-course/evals-skills/pull/7) | Proposed gating of suggestions until several human reviews | Avoid letting an agent invent the failure taxonomy before humans inspect traces |
| [Alejandro AO's companion repository](https://github.com/alejandro-ao/pi-durable-demo) | A small durable chat application, local-model option and persisted conversations | A narrow starting point for building your own surface |
| [Disler's durable-pi](https://github.com/disler/durable-pi) | Richer persistent agents reachable through multiple interfaces | Separate the agent's lifetime from a browser connection |
| [Earendil's Code Mode example](https://earendil.com/posts/you-said-no-mcp/) | Tool retrieval plus JEV classification inside a script | Return useful exceptions, not every intermediate record |

These are documented examples and open-source workflows. They do not establish widespread production adoption or a universal productivity gain. The linked video has been cross-checked against its companion code; no transcript was available. Grok/X-specific research remains unverified because login was not completed.

## Three pieces that should stay distinct

**Harness:** gives the model context, tools and an execution lifecycle. Pi Durable is an alternative persistent harness built on shared Pi components; it is not a drop-in UI replacement for the coding-agent CLI.

**Code Mode:** executes JavaScript in QuickJS and exposes selected tools. Intermediate tool results can stay outside the conversation. It also works independently of Durable.

**JEV or another reviewer:** answers narrow judgment questions. It is not the JavaScript engine. A typed answer still needs validation against human labels.

Primary references: [Pi SDK](https://pi.dev/docs/latest/sdk), [Code Mode](https://pi.dev/docs/latest/codemode), [Pi Durable](https://earendil.com/posts/pi-durable/), [TypeSafe API](https://api.typesafe.ai/redoc), [Durable package source](https://github.com/earendil-works/pi/tree/main/packages/durable).

## Workshop choices

- Borrow Matt Pocock's progression: clarify the task, make a small plan, implement, verify, review. [Talk](https://ai.engineer/talks/-QFHIoCo-Ko-ai-coding-workflow).
- Use Jeronim's [Go agent](https://github.com/plattenschieber/anthropic-golang-agent) to make the loop concrete. Participants need not install Go to understand it.
- Use Hamel/Shreya's error-discovery approach. The prototype includes free-text observations and expandable traces; it is not a complete implementation of every eval skill.
- Keep subagents optional. First make one agent observable and testable.
- Teach context degradation as a practical risk, not a universal token threshold or a fixed “dumb zone.”
- Keep Durable experimental and pinned to 1.5.0. Its host still has to restart it. Completed-call replay does not guarantee exactly-once arbitrary external effects.
- Hold one model, dataset and task constant when comparing an instruction change. Re-run on fresh examples before claiming improvement.
