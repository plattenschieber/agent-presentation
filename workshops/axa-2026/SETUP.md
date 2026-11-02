# Preparation session · 30 minutes

Tuesday, 3 November 2026, 16:00 Amsterdam time.

**Finish line:** every participant can launch Pi, reach the assigned model, open the exercise, and run one check.

Bring the personal laptop you will use on Wednesday, its charger, and the organizer's credentials. Do not bring AXA customer data. Work in pairs during the workshop; each pair has a driver and reviewer.

| Minutes | Do together | Evidence |
| --- | --- | --- |
| 0–5 | Explain the two-hour outcome and check access | Everyone has the repository and credentials |
| 5–12 | Install Node.js 24 LTS and Git; Windows users also need Git Bash | `node --version`, `git --version`, `bash --version` |
| 12–20 | Install this package and configure Pi | Pi lists the assigned deployment |
| 20–26 | Run a model smoke test and a tiny file-read task | A real response and a real tool result |
| 26–30 | Open the workbench; pair up; collect blockers | Each pair can run one exercise |

## Install

```sh
git clone https://github.com/plattenschieber/agent-presentation.git
cd agent-presentation
git switch workshop/axa-agent-loop
cd workshops/axa-2026
npm ci --omit=dev
```

Create `.env` in this directory with the organizer's key. The file is ignored by Git.

```dotenv
AZURE_OPENAI_API_KEY=replace-with-your-assigned-key
AZURE_OPENAI_BASE_URL=https://summit-workshops-llm.services.ai.azure.com/openai/v1
AZURE_OPENAI_DEPLOYMENT=gpt-6-luna
```

```sh
npm run setup
npm run pi
```

Setup writes only `.local/pi/models.json` and `.local/pi/settings.json`. `npm run pi` uses those settings. It does not change your global Pi configuration. Re-running setup replaces the workshop settings.

In Pi, ask: **“Read fixture/claims.json. Explain the difference between zero and null in this file.”** Check that Pi actually used `read`.

Then run `npm run demo` and open http://127.0.0.1:4173. The demo is intentionally offline. `npm run live` activates configured model calls in paths 3 and 5.

## Alternative model providers

The workshop does not require JEV. For an OpenAI-compatible agent and reviewer:

```dotenv
AGENT_BASE_URL=http://127.0.0.1:8080/v1
AGENT_MODEL=your-local-model
JUDGE_BASE_URL=http://127.0.0.1:8080/v1
JUDGE_MODEL=your-local-model
```

Remote services also need their own `AGENT_API_KEY` / `JUDGE_API_KEY`. For JEV, set `TYPESAFE_API_KEY` and leave `JUDGE_BASE_URL` unset. Azure access alone does not provide JEV access.

For a local model, start an OpenAI-compatible inference server separately, then run `npm run live`. Model quality and hardware requirements vary; local inference is optional, not part of the 30-minute setup.

## If something fails

| Symptom | Next step |
| --- | --- |
| HTTP 401 | Ask the organizer to verify the exact key and resource pairing |
| Model/deployment not found | Confirm the deployment name, not just the model family |
| Pi cannot find bash | Install Git Bash on Windows, then reopen the terminal |
| Key missing | Offline exercises still run; this does not count as a live setup pass |
| Rate limits | One driver per pair; avoid simultaneous repeated requests |

The facilitator should verify the final model's context limits, tool support and the shared quota before Wednesday. The model file currently uses conservative workshop budgets, not verified deployment specifications or prices.
