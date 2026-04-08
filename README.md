# Claude Code Anonymous - Presentations

Real talk about agentic coding from the Cologne meetup trenches.

## 🎯 View Presentations Online

**Live at:** https://plattenschieber.github.io/agent-presentation/

## 📊 Presentations

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
├── presentations/     # Slide decks (Slidev markdown)
├── public/           # Shared assets (images, logos)
├── scripts/          # Build scripts
├── docs/             # Methodology docs, notes
├── events/           # Event invitations, materials
├── archive/          # Old versions, drafts
└── transcripts/      # Video transcripts
```

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run presentations locally
npm run dev:round1    # Round 1: Intent → Impact
npm run dev:round2    # Round 2: From Hype to Habits
npm run dev:round3    # Round 3: Patterns That Stuck
npm run dev:round4    # Round 4: Ralph Wiggum, Clawd Bot & Skills
npm run dev:semanticos # Sokrates — semanticOS
npm run dev:astgrep   # ast-grep + Claude Code

# Build all presentations
npm run build
```

## 🛠️ Tech Stack

- [Slidev](https://sli.dev) - Presentation slides for developers
- GitHub Pages - Hosting
- GitHub Actions - Automated deployment

## 📝 License

MIT

## 🤝 About

These presentations are from the **Claude Code Anonymous** meetup in Cologne, where developers share real experiences with agentic coding tools - no BS, no hype, just honest talk about what actually works.
