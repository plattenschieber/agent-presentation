# Build it. Then use it.

**Pi builds your harness. Your harness is the program you then try yourself.**

Run commands from the repository root. Pi opens in `participant-setup/`.

| Try | Start Pi | Paste |
| --- | --- | --- |
| A direct brief | `pixi run baseline` | [First build](01-baseline-build.md) |
| An interview | `pixi run interview` | [Interview build](02-interview-build.md) |

After building:

```sh
pixi run agent-01
```

Chat with it, ask a follow-up, then try [self-improvement](03-self-improvement.md). Use `agent-02` for the second attempt.

**The build creates these launch tasks.** If you already built a harness with an earlier prompt, use [add the launcher](04-add-launcher-to-existing-build.md).

## Setup context

The workshop connection is in `scripts/config.mjs` and `.workshop/pi/models.json`, relative to Pi's starting directory. Pixi tasks go in `../pixi.toml`. Keep existing tasks intact. The ignored `.env` holds the key: load it at runtime, never print or commit it.

Keep attempts separate. These exercises run locally; nothing gets deployed. Use disposable files while trying the harness.
