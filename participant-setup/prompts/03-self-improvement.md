# Let your harness improve itself

Start the generated harness in its own source folder:

```sh
pixi run agent-01 --dir participant-setup/attempt-01
```

For the second attempt, use `pixi run agent-02 --dir participant-setup/attempt-02`.
These paths are relative to the repository root, where Pixi runs the task—not Pi's `participant-setup/` working directory.

Then paste:

```text
Add --summarize-tools to your own code. Keep verbose output as the default.

With the flag, show the tool name and a pulsing indicator while it runs, then a short summary when it finishes. Keep errors visible. The model must still receive the full tool output; only my display changes.

Restart the changed harness and show me both modes working on the same task.
```
