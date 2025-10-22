---
theme: default
background: https://cover.sli.dev
title: From Hype to Habits
info: |
  ## From Hype to Habits: A Month in the Trenches
  Real learnings from 30 days of refined agentic development
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# From Hype to Habits
## A Month in the Trenches

*Claude Code Anonymous - Round 2*

<div class="text-center mt-4">
<img src="/claudecodeanon2.png" alt="Claude Code Anonymous Round 2" class="mx-auto rounded-lg shadow-md" style="max-height: 300px;">
</div>

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: center
class: text-center
---

# Why Are We Here?

<v-click>

<div class="text-center mt-4">
<img src="/slotmachines.jpeg" alt="Slot Machine Addiction" class="mx-auto rounded-lg shadow-md" style="max-height: 300px;">
</div>

</v-click>

<v-click>

<div class="text-2xl mt-8 font-bold text-purple-600">
Because we're all addicted to pulling the Claude lever
</div>

</v-click>

<v-click>

<div class="text-lg mt-4 opacity-75">
Nerds being addicted to using Claude and the like
</div>

</v-click>

<v-click>

<div class="bg-yellow-50 p-4 rounded-lg mt-6">
<strong>Honest moment:</strong> How many times did you re-prompt today hoping for that perfect output?
</div>

</v-click>

---

# Quick Recap: The Journey
## For those who missed last time

<v-clicks>

**Tried tab completion** (Copilot, Cursor)
→ Never trusted the results

**Tried Reddit hype** (RIPER 5, multiple agents, git worktrees)
→ Looked cool, burned credits, projects stalled

**Found SpecFlow** (brainstorm.md → spec.md → tasks.md)
→ Started working *with* the harnesses

**Today**: Working philosophically, one step at a time, three agents simultaneously
→ No long planning cycles unless using Socratic approach

</v-clicks>

<v-click>

<div class="bg-blue-50 p-4 rounded-lg mt-6">
<strong>Quick show of hands:</strong> How many of you are still in the "trying everything Reddit suggests" phase?
</div>

</v-click>

---
layout: center
class: text-center
---

# The Real Learning?
## I stopped fighting the tools

<v-click>

<div class="text-2xl mt-8 opacity-75">
I learned to work WITH the harnesses, not against them
</div>

</v-click>

---

# Problem #1: Too Much Friction
## Permission prompts killing flow state

<v-clicks>

**The Reality:**
- "Can I read this file?"
- "Can I search here?"
- "Can I write this?"

**When you already KNOW what needs to happen:**

```bash
--dangerously-skip-permissions
```

</v-clicks>

<v-click>

<div class="bg-red-50 p-4 rounded-lg mt-4">
<strong>Philosophy:</strong> There's only a way forward, never backward
</div>

</v-click>

<v-click>

<div class="text-sm opacity-75 mt-4">
Tweet from @plattenschieber: "Meanwhile I'm using --dangerously-skip-permissions on most days 🤡🔫"
<br/>
<em>(In response to Claude Code's 84% reduction in permission prompts)</em>
</div>

</v-click>

<v-click>

<div class="bg-yellow-50 p-3 rounded-lg mt-3">
<strong>Real talk:</strong> Who here has rage-quit because of permission prompts?
</div>

</v-click>

---

# Problem #2: One-Way Conversations
## I talk, AI codes, repeat

<v-click>

<div class="text-center mb-8">
<div class="text-2xl font-bold text-red-600">❌ Old Way</div>
<div class="text-lg mt-2">Me → Prompt → AI → Code → Me → Fix prompt → AI → Code</div>
</div>

</v-click>

<v-click>

<div class="text-center mb-8">
<div class="text-2xl font-bold text-green-600">✅ Socratic Approach</div>
<div class="text-lg mt-2">Me → Vague idea → AI asks questions → I clarify → AI GETS it right</div>
</div>

</v-click>

<v-click>

<div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
<strong>Even Claude knows this now:</strong>
<div class="text-sm mt-2 italic">
Tweet from @trq212: "Anthropic added a 'Plan' button to Claude Code CLI that asks you questions before executing"
</div>
<div class="text-xs mt-2 opacity-75">
https://x.com/trq212/status/1979215901577875812
</div>
</div>

</v-click>

---

# Problem #3: Context Switching Death
## One agent at a time = constant mental gear shifts

<v-clicks>

**My Setup Now:**

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="bg-blue-50 p-4 rounded-lg">

### **Three Agents Always Open**
- **Claude #1** (main work: planning & architecture)
- **Codex** (execution & review)
- **Claude #2** (quick fixes on the fly, perpendicular tasks)

*Plus lazygit in the grid*

</div>

<div class="bg-green-50 p-4 rounded-lg">

### **Wisprflow Voice Dictation**
- Talk while thinking
- No keyboard friction
- Natural prompting

*Feels like pair programming*

</div>

</div>

**Result:** Flow state, not context switching

</v-clicks>

<v-click>

<div class="bg-purple-50 p-3 rounded-lg mt-4">
<strong>Be honest:</strong> How many terminal tabs do you have open right now? More than 10?
</div>

</v-click>

---

# Problem #4: Over-Engineering Everything
## Not everything needs Kubernetes

<v-clicks>

<div class="bg-orange-50 p-3 rounded-lg mb-4">
<div class="text-lg font-bold mb-1">Peter Steinberger: "Just Talk To It"</div>
<div class="text-sm">
Stop building elaborate systems. Stop with subagents and RAG pipelines.<br/>
<strong>Just have a conversation.</strong>
</div>
<div class="text-xs mt-1 opacity-75">https://steipete.me/posts/just-talk-to-it</div>
</div>

**Personal Examples:**
- **Git workflow**: Agents commit directly to main → Only PRs for big features/refactors
- Got burned by shell complexity → Just `mise exec` in AGENTS.md
- Everyone wants Kubernetes → Most projects don't need it

**No branches. No worktrees. No elaborate git strategies.**

</v-clicks>

<v-click>

<div class="text-sm opacity-75 mt-2">
Tweet from @plattenschieber: "So true. I've been educated to make everything run scalable on kubernetes clusters. But most companies and projects really don't need this"
</div>

</v-click>

<v-click>

<div class="bg-red-50 p-3 rounded-lg mt-2">
<strong>Controversial question:</strong> Who here still uses feature branches for solo projects? Why?
</div>

</v-click>

---
layout: center
class: text-center
---

# The Pattern

<v-clicks>

<div class="text-2xl mb-8">Every problem I solved came from</div>

<div class="text-4xl font-bold text-blue-600 mb-4">Removing complexity</div>

<div class="text-2xl mb-8">Not adding it</div>

<div class="grid grid-cols-2 gap-8 text-lg mt-8">
  <div class="p-4 bg-red-50 rounded-lg">
    <div class="font-bold mb-2">❌ Don't</div>
    <div class="text-sm">Multiple systems, elaborate prompts, orchestration layers</div>
  </div>
  <div class="p-4 bg-green-50 rounded-lg">
    <div class="font-bold mb-2">✅ Do</div>
    <div class="text-sm">Three terminals, natural conversation, trust yourself</div>
  </div>
</div>

</v-clicks>

---
layout: center
class: text-center
---

# Your Turn: Lightning Talks! ⚡

<v-click>

<div class="text-2xl mt-8 mb-8 font-bold text-purple-600">
What's one thing you STOPPED doing<br/>that made you faster?
</div>

</v-click>

<v-click>

<div class="text-lg opacity-75 mb-8">
Wins, fails, and facepalms all welcome
</div>

</v-click>

<v-click>

<div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
<div class="text-sm mb-2">Still figuring it out? Join the experiment:</div>
<div class="text-2xl font-bold text-blue-600">omaship.com</div>
<div class="text-xs mt-2 opacity-75">Help us discover what actually matters to builders</div>
</div>

</v-click>

<div class="absolute bottom-10 left-10">
<small>Slides: github.com/plattenschieber/agent-presentation</small>
</div>
