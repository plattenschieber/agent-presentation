# My Agentic Development Journey - Raw Notes

## The Problem That Started Everything
My wife was on the founding team of Cozama (the layer for open accelerators at Startplatz). She always wanted a tool she could use for herself, but Cozama was only for startups and teams. This motivated me to dive deeper into the agent route.

## The Struggle Phase (Stone Age)
- Used tab completion tools like GitHub Copilot and Cursor for over a year
- Really struggled with Cursor's cmd+i on-screen mode
- Never trusted it, didn't produce great results
- Maybe the LLMs just weren't ready yet
- Kept using Cursor but copied generated code manually
- Used smart insertion tools by Cursor instead of full agents

## The First Breakthrough
- First "this might work" moment came with Claude Code
- Let it run successfully on smaller tasks like GitHub Action CI issues
- Started iterating but got disgusted by bullish ideas on Reddit and X:
  - Individual agents for each task
  - RIPER 5 (research, innovate, plan, execute, review)
  - Multiple Claude instances in tmux
  - Git worktrees
  - "I Build A Prompt That Can Make Any Prompt 10x Better"
- Most had good ideas but none really took off

## The Real Aha Moment
- Sonnet 4 came out and all coding got immediately better
- Being an evals disciple, tried to understand what I was doing all day with coding agents
- Used conversations as memory for future changes
- Found SpecStory extension: "Preserve intent: Automatically capture AI conversations in Markdown"
- Enabled searching in old conversations
- More importantly: showed colleagues how I created PRs they were reviewing

## The PRD Revolution
- Distilling knowledge from saved conversations led to PRD trend
- SpecStories founder's slogan: "Intent is the new source code"
- Discovered SpecFlow: "Plan first, act second. Every great building starts with a blueprint."
- SpecFlow structure: brainstorm.md, spec.md, tasks.md with prepared prompts
- Not only created products faster, but created the RIGHT products

## Building the Right Things Fast
- Created tool to enable founders to build product ideas
- Had sparring partner who's incredibly knowledgeable and keen to help non-stop
- 5-hour coding sessions were normal
- Started building products for wife and two co-founders really fast
- Convinced Lorenz this approach works for entire product lifecycle, not just greenfield

## The Production Reality Check
- Wanted to launch first product (mysokrates.com) for co-founder Mana
- Took several weeks to completely set up ONE project
- So many parts for production-ready application: CI, CD, secrets, auth, artifacts, dev envs
- Even with experience, always takes dozen+ hours to replicate setup

## Dogfooding Our Way to Omaverse
- Creating first application in universe of tools/frameworks
- Help get running faster with great ideas
- Opinionated omakase approach
- Led to omaship.com - technical backbone for all other tools
- Omaversum tools: omacontent, omatalent, omalaunch, and more coming

## Multi-Agent Orchestration
- Creating application with Claude Code
- Also looked at other agents:
  - Gemini: Great at slurping huge codebase parts, great reviews
  - Codex: Non-chatty, just-work-it-out guy
  - Claude Code: Opus 4.1 planning mode is amazing
- Let Claude plan → Codex review → ping pong iterations
- Especially useful for important code (auth, resource-efficient voice server in Go)
- Gemini: Great at ingesting whole codebase + brainstorm/specs for marketing plans, SEO optimization, copy, imagery

## Key Learnings
- SpecFlow methodology transforms vague ideas into crystal clear plans in hours instead of weeks
- Context management is crucial - keep it clean for maximum model capacity
- AGENTS.md and CLAUDE.md files for important general themes
- Start new session for each problem to fix effectively
- Rails + agents = perfect match (convention over configuration)
- 4am coding marathons are the GOAL, not a struggle
- Intent is the new source code
- Don't build faster - build what matters, faster