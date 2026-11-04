# First build: prepared brief

Run `pixi run baseline` from the repository root. Pi opens in `participant-setup/`.
Copy the entire block into Pi. This builds locally; it does not publish anything.

```text
Build a minimal terminal coding agent inside ./attempt-01.

Use Node.js 24 and minimal dependencies. Use the same LLM endpoint, model, and authentication method as the working workshop Pi setup. Inspect scripts/config.mjs and, if needed, .workshop/pi/models.json for the non-secret configuration. Read credentials only through AZURE_OPENAI_API_KEY at runtime; never print them, copy them into source, or send their values to the model.

Implement attempt-01/agent.mjs as the command-line entrypoint:
- Accept a coding task from positional command-line arguments.
- Support --dir <working-directory>; resolve this argument relative to the caller's current directory. Default to attempt-01/demo relative to the entrypoint.
- Make read, write, edit, and bash tools available to the model.
- Resolve tool file paths and commands relative to that working directory.
- Execute tool calls, return full results to the model, and continue until it finishes, with a maximum of 15 model turns.
- Display tool names, arguments, and outputs in full by default, without exposing credentials.
- Show tool errors and return them to the model so it can recover.
- Finish with a concise account of the changes and checks performed.

Keep the implementation small enough to explain during a workshop. No web interface, deployment, plugins, or summarization flag yet.

Leave all existing workshop files intact except for this explicitly requested addition: add a unique agent-01 task under [tasks] in ../pixi.toml, preserving every existing task and setting. Its command must be:
node --env-file=participant-setup/.env participant-setup/attempt-01/agent.mjs

The participant must be able to run this from the repository root:
pixi run agent-01 "Create a small text file, read it back, edit it, and run a command that checks the final contents."

Add attempt-01/README.md with that command and an example using --dir. Explain that --dir selects a working directory, not a security sandbox. Load all needed configuration reliably regardless of the caller's directory.

Demonstrate the generated agent actually working in its disposable demo directory. Give it a task to create a text file, read it, edit it, and verify the final contents through bash. Show the real tool calls and resulting file. Do not substitute Pi doing those operations directly for a run of the generated harness.

Make reasonable implementation decisions and proceed without interviewing me. When finished, explain the main loop, list your assumptions, and give the exact command I can run myself.
```
