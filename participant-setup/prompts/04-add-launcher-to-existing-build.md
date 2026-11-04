# Already built attempt-01? Add a convenient launcher

Use your existing Pi build session, or start `pixi run baseline`. Copy this block.
It adds a launcher to your existing result; it does not rebuild the harness.

```text
My generated harness already exists in ./attempt-01. Inspect its README and CLI entrypoint, then make it easy to run from the repository root.

Preserve the working implementation. Add a unique agent-01 task under [tasks] in ../pixi.toml, preserving all existing entries. Use Pixi's Node with --env-file=participant-setup/.env and the correct path to the existing entrypoint. Never print or copy the key into source.

Make sure the task accepts the coding task as trailing arguments and supports --dir <working-directory> resolved from the caller's directory. Its default working directory should be a disposable demo directory inside attempt-01. If the existing CLI differs, add the smallest compatible adapter rather than rewriting the harness.

Update attempt-01/README.md. Verify this command from the repository root:
pixi run agent-01 "Create a small text file, read it, edit it, and run a command to check its final contents."

Show the actual run and give me the exact launch command. Do not deploy anything.
```
