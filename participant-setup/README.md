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
pixi run pi
```

The first check expects **OK** from Azure. The second verifies that the model actually reads a file and runs Node through bash. Both must pass before Wednesday.

Pi opens in `participant-setup/`. Ask it to create a small file, explain a change, or run a command. Exit with Ctrl+C twice. For a one-shot prompt:

```sh
pixi run pi --print "Explain the files in this directory."
```

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
