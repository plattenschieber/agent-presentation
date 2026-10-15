# Round 8 facilitator notes

**Jev & the New Normal — Who Reviews All This Code?**

Tuesday 20 October 2026, 18:00–21:00 Europe/Berlin, STARTPLATZ Köln.

## Jeronim's first lightning talk: target 7 minutes, maximum 10

Jeronim always opens with the first lightning talk. Keep it between 5 and 10 minutes, then open the round for guests and contributors to showcase their presentations. **Every presenter gets a kefir, as always.**

- 0:00–0:30: title and review bottleneck
- 0:30–1:20: Jev's bounded decision primitives
- 1:20–2:10: synthetic cache-key PR and the passing submitted test
- 2:10–4:10: optional local-model judgment followed by the independent probe
- 4:10–5:00: type validity, correct judgment, and authorization
- 5:00–6:00: Qodo's bounded experiment and its caveats
- 6:00–7:00: one question for the room and immediate handover

Slides 1–7 form the opening. Slide 8 welcomes guest/contributor presentations, five minutes each, with kefir for each presenter. Slide 9 supports closing discussion. Slides 10–12 are optional reference material; do not extend the opening to present them. Keep discussion and showcases within the 21:00 event end.

## Optional actual local-model demonstration

This is a **local generative LLM via Ollama, not Jev**. It illustrates a bounded judgment followed by independent verification. It is not an equivalence claim, benchmark, or evidence of the local model's review accuracy.

Requirements: Node 20 or later, an already running local Ollama server, and an already installed local model. Do not install software or download models during the talk. The script never pulls a model or contacts a configurable remote API. It uses only `http://127.0.0.1:11434`, checks the installed model, and rejects cloud-backed models.

```sh
# Substitute an already-installed local tag confirmed during rehearsal.
ROUND8_MODEL=<installed-local-tag> npm run demo:round8
```

A candidate to rehearse is `qwen3:4b`; do not assume it is installed or suitable. The actual Mac chip, RAM, OS, installed models, and latency remain unverified. Select the model only after checking available headroom and rehearsing the complete command. Ollama's macOS documentation currently requires macOS 14 or newer, with Apple M-series GPU support and Intel CPU-only support. An 8B model needs separately measured headroom and latency; bigger is not automatically better for a lightning talk.

The model receives a synthetic isolation requirement, the diff dropping tenant identity from the cache key, and a submitted same-tenant test. It does not receive the expected answer or independent probe result. It returns a strict JSON object with a bounded risk, proposed next check, and short rationale. There is no confidence number or auto-merge decision.

The script prints the genuine returned judgment only after successful validation. It then runs the deterministic probe **regardless of the answer or any model failure**. The model stage has a 18-second deadline. If unavailable, it says so explicitly and runs the fallback; do not retry on stage until a preferred answer appears. Mocked tests verify the integration and failure paths, not the model.

### Rehearsal gate

Before choosing the live path, run it on the actual presentation Mac with the installed local model. Confirm latency, schema compliance, terminal readability, and the deterministic result. Test the unavailable-server fallback as well. No actual Mac/model smoke test has been completed as part of this repository update. If the gate is not met, use the deterministic exercise alone. MLX is an optional future alternative only if its server and model are already installed and rehearsed; this deliverable does not claim MLX support.

## Deterministic fallback and tests

```sh
npm run test:round8       # synthetic cache and policy exercise, no model
npm run test:round8:demo  # mocked HTTP integration tests, no model
```

The original exercise is preserved. Both key implementations pass the same-tenant test. A two-tenant probe reproduces a collision with the broken key and passes with the tenant-scoped key. This proves the synthetic behavior only. A real application needs its identity contract and complete cache read/write paths; globally unique IDs could change the analysis.

Never present mocked fixtures as live model output. A replay is acceptable only if it comes from an actual rehearsal and is clearly labeled; none is supplied here.

## Primary sources

Checked 14–15 October 2026. Relevant slide notes contain sources too.

- [TypeSafe launch](https://typesafe.ai/blog/introducing-system-one-models-and-jev): Jev's structured decisions and launch date.
- [TypeSafe quick start](https://docs.typesafe.ai/introduction/quickstart) and [confidence](https://docs.typesafe.ai/confidence): interfaces and probability/confidence distinction.
- [Qodo's experiment](https://www.qodo.ai/blog/does-jev-make-ai-code-review-more-efficient/): 24 evaluation cases, one additional required test gap, zero additional confirmed defects, three cases with unsupported concerns. Categories overlap, evidence access differs, and developer-time savings were unmeasured.
- [Experimental Jev Review](https://github.com/devagrawal09/jev-review): inspiration for the optional workflow discussion, not a production guarantee.
- [Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs), [chat API](https://docs.ollama.com/api/chat), and [macOS support](https://docs.ollama.com/macos).
- [Ollama Qwen3 4B](https://ollama.com/library/qwen3:4b): candidate model, conditional on actual hardware and rehearsal.
- [MLX LM](https://github.com/ml-explore/mlx-lm): possible alternative, not implemented or tested here.
