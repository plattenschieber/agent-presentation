# Second build: align through an interview

Exit the first Pi session. Run `pixi run interview` from the repository root.
Copy the block below, including `/skill:grill-me`. The launcher loads only the bundled interview skills.

```text
/skill:grill-me Help me design a minimal terminal coding agent in ./attempt-02. Interview me one question at a time, give your recommendation, and wait for my answer. Resolve the important choices and acceptance checks before implementation. Summarize our agreement and wait for my confirmation before building.

The goal is the same as the first attempt: accept a coding task, let the model use read/write/edit/bash, feed full tool results back to the model, and continue until the task is complete. Full tool-call details and outputs are visible by default. Use a maximum of 15 model turns. Surface errors so the agent can recover.

Use Node.js 24 and minimal dependencies. Use the same endpoint, model, and authentication method as our working Pi setup. Inspect scripts/config.mjs and, if needed, .workshop/pi/models.json for non-secret configuration. The key must come from AZURE_OPENAI_API_KEY at runtime; never print it, copy it into source, or send it to the model.

Start from an empty attempt-02 folder. Preserve attempt-01 and do not read or copy its implementation. No web interface, deployment, plugins, or summarization flag yet.

Once we agree and I confirm, create attempt-02/agent.mjs. It must accept the task as positional CLI arguments and --dir <working-directory>, resolved from the caller's directory. Default to attempt-02/demo relative to the entrypoint. --dir selects the working directory, not a security sandbox.

Preserve the workshop setup, with one explicit exception: add agent-02 under [tasks] in ../pixi.toml without changing any existing tasks or settings. Its command must be:
node --env-file=participant-setup/.env participant-setup/attempt-02/agent.mjs

Add a README with exact commands. Demonstrate the generated harness itself creating, reading, editing, and checking a text file in its disposable demo directory. Show actual tool calls and the result, not just an implementation description.
```
