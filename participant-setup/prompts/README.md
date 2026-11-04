# Build it. Then use it.

**Pi builds your harness. Your harness is the program you then try yourself.**

Run commands from the repository root. **Pi opens in `participant-setup/`, but the generated agent's Pixi task runs from the repository root.** Its `--dir` path must therefore include `participant-setup/`, even if your terminal is currently inside that folder.

| Try | Start Pi | Paste |
| --- | --- | --- |
| A direct brief | `pixi run baseline` | [First build](01-baseline-build.md) |
| An interview | `pixi run interview` | [Interview build](02-interview-build.md) |

After building:

```sh
pixi run agent-01
```

Chat with it and ask a follow-up.

To review its own source, start it with:

```sh
pixi run agent-01 --dir participant-setup/attempt-01
```

Then paste this read-only request:

```text
Read your own code and explain the agent loop. Point out one improvement worth making. Don't modify files or run commands that change anything.
```

Use the same launch command for [self-improvement](03-self-improvement.md), then paste that prompt.

For the second attempt:

```sh
pixi run agent-02 --dir participant-setup/attempt-02
```

Do not use `--dir ./attempt-01`: the Pixi task would look for that folder at the repository root.

**The build creates these launch tasks.** If you already built a harness with an earlier prompt, use [add the launcher](04-add-launcher-to-existing-build.md).

## Setup context

The workshop connection is in `scripts/config.mjs` and `.workshop/pi/models.json`, relative to Pi's starting directory. Pixi tasks go in `../pixi.toml`. Keep existing tasks intact. The ignored `.env` holds the key: load it at runtime, never print or commit it.

Keep attempts separate. These exercises run locally; nothing gets deployed. Use disposable files while trying the harness.
