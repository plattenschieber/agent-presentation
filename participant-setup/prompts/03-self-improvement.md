# Let the generated harness improve itself

Run this task through the **generated harness**, not Pi. From the repository root:

```sh
pixi run agent-01 --dir participant-setup/attempt-01 "Read ../prompts/03-self-improvement.md and perform the task in its prompt block."
```

For the second attempt, replace both `agent-01` and `attempt-01` with `agent-02` and `attempt-02`.
Save a checkpoint of the working attempt first. If the harness gets stuck, inspect its output together and use Pi to recover.

## Prompt

```text
Improve this coding harness's own terminal output by adding --summarize-tools.

Keep the current verbose behaviour as the default: tool names, arguments, and full outputs remain visible.

When --summarize-tools is enabled:
- Show which tool is running.
- Show a pulsing or animated activity indicator while it runs.
- Hide detailed arguments and raw output from the human-facing display.
- When the tool finishes, replace the activity indicator with a concise summary of what happened.
- Keep failures clear and actionable.
- Always return the full tool result to the model. This flag changes only the human-facing display.

Inspect the current implementation and decide how to implement this without changing the agent loop's behaviour. Preserve existing CLI options and launch commands.

Demonstrate both modes with the same small task in separate disposable demo directories. Restart the generated harness to run the changed source; the current process does not automatically acquire its own edits. Avoid recursive self-modification during the demonstrations.

Show actual executions, what each display reveals, and how you checked that the model still receives full tool output. Finish with exact commands I can try myself.
```
