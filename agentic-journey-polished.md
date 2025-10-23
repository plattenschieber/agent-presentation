# Intent → Impact: My Agentic Evolution
*A 5-minute lightning talk on finding what actually works in AI-powered development*

## The Motivation
My wife co-founded Cozama, the backbone for open accelerators at Startplatz. She always dreamed of having a similar tool for herself, but Cozama only served startups and teams. That dream became my mission to master agentic development.

## Act I: The Stone Age (Tab Completion Era)
For over a year, I relied on tab completion tools like GitHub Copilot and Cursor. When I tried Cursor's cmd+i on-screen mode, I hit a wall. I never trusted it. The results weren't impressive. Maybe the LLMs just weren't ready yet.

So I developed a hybrid workflow: ask the models for help, but manually copy their generated code. I used Cursor's smart insertion tools instead of letting agents run free. It worked, but it felt like I was missing something bigger.

## Act II: The Bronze Age (Agent Proliferation)
My first "this might actually work" moment came with Claude Code. I let it tackle smaller tasks like GitHub Action CI issues, and it succeeded consistently. I started iterating more boldly.

But then I got caught up in the hype cycle. Reddit and X were full of ambitious ideas:
- Individual agents for each task
- RIPER 5 frameworks (research, innovate, plan, execute, review)
- Multiple Claude instances running in tmux sessions
- Complex git worktree setups
- "I Build A Prompt That Can Make Any Prompt 10x Better"

These ideas sounded revolutionary, but none of them really took off in practice. Good concepts, poor execution.

## Act III: The Iron Age (The Real Breakthrough)
Everything changed when Sonnet 4 arrived. The quality leap was immediate and dramatic. As someone who believes in evaluation-driven development, I wanted to understand what I was actually doing with these coding agents.

I discovered the SpecStory extension: "Preserve intent: Automatically capture AI conversations in Markdown." This wasn't just about searching old conversations—it was about showing colleagues exactly how I created the PRs they were reviewing. Transparency became learning.

### The SpecFlow Revolution
Distilling knowledge from my saved conversations led me to the PRD (Product Requirement Document) trend. The SpecStories founder had a powerful slogan: **"Intent is the new source code."**

This led me to SpecFlow: "Plan first, act second. Every great building starts with a blueprint." The structure was elegant: brainstorm.md, spec.md, and tasks.md, with prepared prompts to get you running. Suddenly, I wasn't just building products faster—I was building the *right* products.

### The Clean Context Protocol
Here's what nobody talks about: context management is everything. I developed what I call the Clean Context Protocol:

- Keep AGENTS.md and CLAUDE.md files with the most important general themes
- Start a new session for each problem to maintain focus
- Maximum capacity for models means maximum results

I'm terrible at managing multiple non-orthogonal ideas simultaneously. But with focused, iterative sessions, my results improved dramatically.

### The 4AM Marathon Revelation
Those legendary all-night coding sessions? They became my *goal*, not my struggle. With SpecFlow methodology, I could take raw, unstructured ideas and crystallize them into clear plans in hours instead of weeks. My wife's app, Chaodinator.com, started as a vague concept and became crystal clear through this process.

The marathons weren't about suffering—they were about flow.

## Act IV: The Omakase Approach (Building What Matters)
### Multi-Agent Orchestration
I now create applications using Claude Code, but I've learned to orchestrate multiple agents:

- **Claude**: Planning and general development (Opus 4.1's planning mode is incredible)
- **Codex**: Reviews and refinement (the no-nonsense executor)
- **Gemini**: Codebase analysis and marketing strategy (amazing at ingesting entire codebases with specs for SEO optimization and copy)

For critical code like authentication or resource-efficient systems (like the voice server I'm building in Go), I let Claude plan, Codex review, and ping-pong between them.

### Rails + Agents = Perfect Marriage
Here's an insight that changed everything: Rails and agents are perfectly matched. Convention over configuration means less context needed for the models. Less context waste means better results.

### The Omaverse Vision
This clarity revealed something bigger. If we can accelerate individual builders this much, imagine accelerating entire startups.

That's why we're building the Omaverse—an omakase approach to products, teams, and companies:

- **Omaship**: The technical backbone (Rails-powered deployment)
- **OmaContent**: Content generation that matters
- **OmaSite**: Landing pages that convert
- **OmaTalent**: Team building with purpose
- **OmaLaunch**: Structured startup acceleration

Each tool is born from real founder needs. Products like MySokrates, Chaodinator, and Cozama—built not just faster, but building what actually matters.

## The Philosophy
The production reality hit hard with MySokrates.com. Even with all this tooling, it took weeks to set up one production-ready project. CI, CD, secrets, authentication, artifacts, development environments—the list goes on. Even with experience, it's still a dozen+ hours to replicate a setup.

But we're dogfooding our own approach. We're creating applications within a universe of tools that help you get running faster with your great ideas. It's opinionated. It's omakase. And it works.

## The Core Message
I don't build faster. **I build what matters, faster.**

The beauty of agentic development? There's no one right way. Find what works for you, but remember:

- Intent is the new source code
- Clean context beats complex setups
- Convention over configuration applies to agents too
- The 4AM marathon is the goal, not the struggle

*Want to be part of this journey? We're gathering early feedback at omaship.com—because building what matters requires knowing what actually matters to builders like you.*