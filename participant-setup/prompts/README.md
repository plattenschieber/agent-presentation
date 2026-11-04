# Try the workshop yourself

**Pi builds the harness. The generated harness is a second program that you run yourself.**
All commands below start in the repository root. The Pi launchers open in `participant-setup/`.

| Step | Start | Copy into Pi |
| --- | --- | --- |
| First build | `pixi run baseline` | [01 — prepared brief](01-baseline-build.md) |
| Fresh interview/build | `pixi run interview` | [02 — grill-me](02-interview-build.md) |

After the first build finishes, open another terminal in the repository root and run:

```sh
pixi run agent-01 "Create a small text file, read it back, edit it, and run a command that checks the final contents."
```

**agent-01 is added by the first build prompt. It does not exist in the untouched checkout.**
The second build similarly adds `agent-02`. If you already built a harness with an earlier prompt, use [04 — add a launcher](04-add-launcher-to-existing-build.md) in Pi first. Do not rerun the entire build just to get a launch command.

Then give the generated harness [03 — self-improvement](03-self-improvement.md). It adds `--summarize-tools` to its own code. The model still receives full tool output; only the terminal display changes.

Keep the attempts separate. No command here deploys an application or changes your server/Cloudflare configuration. Use dummy demo files: working-directory selection is not a security sandbox.

The launcher uses the workshop key in the existing ignored `participant-setup/.env`; never paste credentials into a prompt or commit them. If setup has not created that file yet, run `pixi run setup` first.
