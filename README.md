# Agents Anonymous Cologne - Presentations

Real talk about agentic coding from the Cologne meetup trenches.

## 🎯 View Presentations Online

**Live at:** https://plattenschieber.github.io/agent-presentation/

## 📊 Presentations

The generated landing page is the presentation inventory. Browse the latest deployed version on the [live presentation index](https://plattenschieber.github.io/agent-presentation/); cards are maintained in `scripts/create-index.js`, and routes and build targets in `package.json`.

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
npm ci

# List available deck-specific development commands
npm run

# Run Round 7 locally
npm run dev:round7

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

These presentations are from **Agents Anonymous Cologne** (formerly Claude Code Anonymous), where practitioners share real experiences with agentic coding tools—no BS, no hype, just honest talk about what actually works.
