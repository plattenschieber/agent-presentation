# Wednesday setup

Personal laptop, a terminal, and the workshop key from the organizer. The key is case-sensitive; paste the original text.

## 1. Install Pixi

macOS / Linux:

```sh
curl -fsSL https://pixi.sh/install.sh | sh
```

Windows PowerShell:

```powershell
winget install prefix-dev.pixi
```

Restart the terminal. Windows users also need **Git for Windows**, including Git Bash. If Git is missing on macOS/Linux, install it before cloning.

## 2. Get the workshop

```sh
git clone https://github.com/plattenschieber/agent-presentation.git
cd agent-presentation
git switch workshop/participant-setup
pixi run setup
```

Paste the key when asked; input is hidden. Setup installs the pinned Pi version, selects the Azure deployment, saves the key in ignored `participant-setup/.env`, and checks the connection.

Already cloned? Run `git fetch origin` and `git switch workshop/participant-setup` in that repo first.

## 3. Check and start

```sh
pixi run test-connection
pixi run test-agent
pixi run baseline
```

The first check expects **OK** from Azure. The second verifies that the model actually reads a file and runs Node through bash. Both must pass before Wednesday.

Pi opens in `participant-setup/`. Ask it to create a small file, explain a change, or run a command. Exit with Ctrl+C twice. For a one-shot prompt:

```sh
pixi run pi --print "Explain the files in this directory."
```

## Workshop attempts: clean baseline and interview

Run from the repository root:

```sh
pixi run baseline
```

This starts a fresh, non-persisted Pi session with read/write/edit/bash. It disables discovered skills, extensions (including MCP), prompt templates and AGENTS.md/CLAUDE.md context files. Personal files are not deleted. Check that startup shows no personal **Skills** or **Context** entries.

Exit Pi before the second attempt, then run:

```sh
pixi run interview
```

Only the bundled **grill-me** and **grilling** skills should appear. Start the interview with:

```text
/skill:grill-me Help me design a minimal terminal coding agent. Interview me before building it.
```

Both commands still open in `participant-setup/`. Use `attempt-01/` for the first build and a new `attempt-02/` folder for the second; neither command deletes or resets your files. Sessions are deliberately not saved or resumed. These modes accept no extra CLI options so a skill or old session cannot accidentally bypass the comparison. `pixi run pi` now starts with the same baseline isolation and still accepts explicit custom options (for example `--print`). Explicit `--skill` or `--extension` options can deliberately load extra resources; use the fixed baseline/interview commands for the workshop comparison. `test-agent` also uses the clean baseline.

This controls automatically loaded resources, not filesystem permissions or a security sandbox: the agent can still read files you ask it to inspect. The model/endpoint and key configuration remain the existing workshop setup. Review the bundled skills and their pinned upstream attribution in `skills/UPSTREAM.md`; no personal skill installation is required.

## Build and run your own harness

Follow [the copy/paste prompts](prompts/README.md): first build with `pixi run baseline`, then run the generated harness yourself with the `agent-01` task created by that build. The guide also covers the interview attempt and self-improvement.

## Optional local Kev

```sh
pixi run -e kev kev
```

This installs [Kev-0.8B](https://huggingface.co/jaredpalmer/kev-0.8b), a small JEV-style decision model, in a separate Pixi environment. The first start downloads the model and its base weights from Hugging Face. No API key or Ollama is needed. The environment supports Apple Silicon with macOS 14+, Linux x64 and Windows x64.

The local TypeSafe-compatible endpoint is `http://127.0.0.1:8009/v1/systemone`, model `kev-latest`. In another terminal, run `pixi run -e kev test-kev` for two real billing judgments. This is a smoke test, not a quality benchmark. Stop the server with Ctrl+C.

## Troubleshooting

Run `pixi run doctor` to check Node, Git, bash and key availability.

| Problem | Fix |
| --- | --- |
| `pixi` not found | Restart your terminal after installation. |
| HTTP 401 | Copy the key again; check `I`/`l` and `W`/`w`. Edit `participant-setup/.env`, then retry. |
| HTTP 429 | Wait briefly; the workshop shares a quota. |
| Bash missing on Windows | Install Git for Windows, reopen the terminal. |
| Node download fails | Check network/VPN access to conda-forge. |

Pixi supplies Node 24 and Git locally to the project, plus bash on macOS/Linux. Pi and its settings are local too; your global Node/Pi configuration is untouched. Pi can access your files and run commands with your permissions. Zero displayed API costs mean pricing is unknown, not free access.

## Maintainer checks

`pixi run test` checks configuration and failure handling without credentials. CI exercises clean installs on Linux, macOS and Windows. Live connection and tool tests require the organizer's key; never add it to source control or CI logs.

Pi is pinned to 1.5.0, including patched dependencies. Unneeded Google/protobuf install scripts are explicitly disabled. npm may still warn about `node-domexception`, an upstream Google compatibility dependency; this is separate from the security audit. Check security with `pixi run npm audit --prefix participant-setup`.
