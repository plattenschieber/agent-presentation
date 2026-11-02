# Token maxing (or burning)?

Five two-hour course options. One shared introduction. Small experiments you can inspect.

**Start here:**

```sh
cd workshops/axa-2026
npm ci --omit=dev
npm run setup
npm run demo
```

Open **http://127.0.0.1:4173**. Select an idea, run its exercise, inspect the trace, and save a review. No key is needed for offline exploration. Each run gets a fresh workspace.

| Path | Build | Best for |
| --- | --- | --- |
| 1. Smallest useful agent | A real file repair driven by a visible four-tool loop | First principles |
| 2. Spend context deliberately | A Code Mode script that summarizes 2,000 records | Understanding context |
| 3. Question the reviewer | Human labels, a typed judge, threshold tradeoffs | Data scientists |
| 4. Survive a crash | A durable workflow killed and reopened mid-run | Advanced engineers |
| 5. Agent workbench | Trace → observation → targeted check → rerun | **Recommended workshop spine** |

Choose **one** path. For AXA, use path 5 with the shared introduction and the coding exercise from path 1. Show crash recovery as a short closing demo. Code Mode and model-based reviewers are extensions, not prerequisites for a successful two hours.

## Teach

- [Preparation session: 30 minutes](SETUP.md)
- [Shared introduction: 20 minutes](course/INTRO.md)
- [Facilitator index and five paths](course/README.md)
- [Research and design decisions](RESEARCH.md)
- [Verification: commands, evidence, limits](VERIFICATION.md)
- Editable boards: `course/boards/*.excalidraw`. Open with Excalidraw's **Open** command.

## What is real?

Offline mode executes real file edits, tests, QuickJS scripts, HTTP requests, SQLite persistence, and a forced process crash. Agent decisions and reviewer scores are explicitly scripted. They demonstrate plumbing; they do not establish model quality.

`npm run live` enables configured model providers for the reviewer and workbench. See [SETUP.md](SETUP.md). Live failures never silently become mock successes. The claims data is entirely synthetic.

## Read the code

`labs/` contains five small exercises. `agent.mjs` owns Durable; `server.mjs` owns HTTP; `web/` owns the interface. `evaluate.mjs` contains two concrete output checks. Provider configuration stays outside the interface.

This is a local teaching prototype, not a shared hosted service. It runs on loopback and writes traces under ignored `runs/`. Pi's file and shell tools run with your user permissions; a working directory is not a security sandbox.
