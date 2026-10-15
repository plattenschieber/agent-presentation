# Claude Code Anonymous - Presentations

Real talk about agentic coding from the Cologne meetup trenches.

## 🎯 View Presentations Online

**Live at:** https://plattenschieber.github.io/agent-presentation/

## 📊 Presentations

### Round 8: Jev & the New Normal — Who Reviews All This Code? (20 October 2026)
Jeronim opens with a 5–10 minute lightning talk (target: 7 minutes), then guests and contributors present. Every presenter gets a kefir. Includes an optional local Ollama demonstration and a deterministic fallback.

- **Event:** Tuesday 20 October 2026, 18:00–21:00 Europe/Berlin, STARTPLATZ Köln
- **Deck source:** [Round 8](presentations/round8-jev-review.md)
- **Published route after merge/deploy:** `/agent-presentation/round8/`
- **Offline exercise:** `npm run test:round8` (synthetic example, no API key or network)
- **Run of show and local demo setup:** [Facilitator notes](docs/round8-facilitator.md)
- **Optional live demo:** `ROUND8_MODEL=<installed-local-tag> npm run demo:round8` (localhost Ollama only, never downloads a model)
- **Mocked integration tests:** `npm run test:round8:demo` (offline; not model-quality tests)

### Round 7: Less Steering, More Alignment (September 2026)
How lean skills, decision-first reviews, and cloud agents shift the work from supervising execution to aligning intent.

- **Slides:** https://plattenschieber.github.io/agent-presentation/round7/
- **Topics:** Pi, Grill with Docs, Bro, cloud agents, Amp Orbs, semanticOS
- **Duration:** 5 minutes

### Round 6: Make It Yours (2026)
How to customize an agent harness around the way you actually work.

- **Slides:** https://plattenschieber.github.io/agent-presentation/round6/
- **Topics:** configuration, skills, plugins, extensions, reusable workflows

### Round 5: The Month Everything Exploded (February 2026)
A fast-moving update from ClawCon, OpenClaw, and the expanding agent ecosystem.

- **Slides:** https://plattenschieber.github.io/agent-presentation/round5/
- **Topics:** ClawCon, OpenClaw, agent workflows, lessons learned

### Round 4: Ralph Wiggum, Clawd Bot & Skills (January 2026)
The patterns that are actually working right now.

- **Slides:** https://plattenschieber.github.io/agent-presentation/round4/
- **Topics:** Ralph Wiggum Technique, Clawdbot personal assistant, Skills vs MCPs, Gas Town preview
- **Duration:** 15 minutes + demos

### Round 3: Patterns That Stuck (December 2025)
Which workflows survived daily use? What got quietly abandoned?

- **Slides:** https://plattenschieber.github.io/agent-presentation/round3/
- **Topics:** Developing intuition, blast radius thinking, parallel agent windows, context management
- **Duration:** 10 minutes

### Round 2: From Hype to Habits (October 2024)
Real learnings from 30 days of refined agentic development.

- **Slides:** https://plattenschieber.github.io/agent-presentation/round2/
- **Topics:** Socratic approach, dangerously-skip-permissions, 3-agent setup, anti-over-engineering
- **Duration:** 5 minutes

### Round 1: Intent → Impact (September 2024)
My journey from tab completion to building what matters.

- **Slides:** https://plattenschieber.github.io/agent-presentation/round1/
- **Topics:** Stone Age → Bronze Age → Iron Age evolution, SpecFlow methodology
- **Duration:** 5 minutes

### Sokrates — semanticOS (March 2026)
A technical lightning talk about Sokrates as a semanticOS for operational AI and end-to-end execution.

- **Slides:** https://plattenschieber.github.io/agent-presentation/semanticos/
- **Topics:** product AI vs operational AI, WhatsApp → PR → preview workflows, end-to-end execution
- **Duration:** 5 minutes

### ast-grep + Claude Code (October 2024)
Automated architectural enforcement for AI-assisted development.

- **Slides:** https://plattenschieber.github.io/agent-presentation/ast-grep/
- **Topics:** Pattern drift prevention, security boundaries, architectural enforcement
- **Duration:** Lightning talk

## 📁 Repository Structure

```
agent-presentation/
├── presentations/     # Slide decks and shared visual system
├── .agents/skills/    # Project-local agent workflows
├── public/            # Shared assets (images, logos)
├── scripts/          # Build scripts
├── docs/             # Methodology docs, notes
├── events/           # Event invitations, materials
├── archive/          # Old versions, drafts
└── transcripts/      # Video transcripts
```

## 🚀 Running Locally

```bash
# Install dependencies
npm ci

# Run presentations locally
npm run dev:round1    # Round 1: Intent → Impact
npm run dev:round2    # Round 2: From Hype to Habits
npm run dev:round3    # Round 3: Patterns That Stuck
npm run dev:round4    # Round 4: Ralph Wiggum, Clawd Bot & Skills
npm run dev:round5    # Round 5: The Month Everything Exploded
npm run dev:round6    # Round 6: Make It Yours
npm run dev:semanticos # Sokrates — semanticOS
npm run dev:astgrep   # ast-grep + Claude Code
npm run dev:round7    # Round 7: Less Steering, More Alignment
npm run dev:round8    # Round 8: Jev & the New Normal

# Build all presentations
npm run build
```

## 🎨 Presentation Design

The Agents Anonymous archive uses a shared visual system in
`presentations/styles/index.css`. Every deck scopes its styles with a unique
class (`aa-round1`, `aa-round2`, and so on), so a deck can have its own accent
without leaking styles into the others.

The project-local `polish-slidev-deck` skill is automatically available to
compatible coding agents from `.agents/skills/polish-slidev-deck/`. It applies
when creating or redesigning a presentation in this repository. The workflow:

1. Define a visual thesis for the talk.
2. Assign cover, content, comparison, sequence, thesis, and question archetypes.
3. Keep deck-wide CSS globally available but scoped to that deck's unique class.
4. Render every slide at 16:9, inspect final click states, and run the full build.

## 🛠️ Tech Stack

- [Slidev](https://sli.dev) - Presentation slides for developers
- GitHub Pages - Hosting
- GitHub Actions - Automated deployment

## 📝 License

MIT

## 🤝 About

These presentations are from the **Claude Code Anonymous** meetup in Cologne, where developers share real experiences with agentic coding tools - no BS, no hype, just honest talk about what actually works.
