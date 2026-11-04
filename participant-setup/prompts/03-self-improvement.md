# Let your harness improve itself

Start your generated harness with `pixi run agent-01` (or `agent-02`).
Point it at its own source folder, then paste:

```text
Add --summarize-tools to your own code. Keep verbose output as the default.

With the flag, show the tool name and a pulsing indicator while it runs, then a short summary when it finishes. Keep errors visible. The model must still receive the full tool output; only my display changes.

Restart the changed harness and show me both modes working on the same task.
```
