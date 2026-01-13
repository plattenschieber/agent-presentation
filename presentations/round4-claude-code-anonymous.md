---
theme: default
title: Claude Code Anonymous - Round 4
info: |
  ## Claude Code Anonymous - Round 4
  Cologne Edition
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Claude Code Anonymous 💒
## Cologne Edition - Round 4

*Ralph Wiggum, Clawd Bot & Skills that Stuck*

<div class="flex justify-center items-center mt-4">
<img src="https://i.ytimg.com/vi/4Nna09dG_c0/hqdefault.jpg" alt="Ralph Wiggum Technique" class="rounded-lg shadow-md" style="max-height: 280px;">
</div>

<div class="pt-8">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 🤪 The Ralph Wiggum Technique
*by Jeff Huntley — "Deterministically malicking the array"*

<div class="grid grid-cols-2 gap-6">

<div>

### The Loop

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>1. Generate specs (don't write them!)</strong><br/>
Conversation → Specs → Review & Edit
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>2. User Stories + Acceptance Criteria</strong><br/>
Small tasks, clear tests, LLM decides order
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>3. <code>while true; do ralph; done</code></strong><br/>
Fresh context per iteration = no context rot
</div>

<div class="bg-green-50 p-3 rounded-lg mb-2 text-left">
<strong>4. "Low control, high oversight"</strong><br/>
Attended → Unattended → Check Results
</div>

</v-clicks>

</div>

<div>

### Why It Works

<v-clicks>

- **Fresh Context** = no compaction loss
- **"The Pin"** = Lookup table for specs
- **AGENTS.md** = Long-term memory
- **Git Commits** per story = rollback
- **Screwdriver → Jackhammer** 🔧

</v-clicks>

<v-click>

<div class="bg-yellow-50 p-3 rounded-lg mt-4 text-left">
<strong>💰 "$10.42/hour"</strong> — Jeff Huntley<br/>
<strong>🚂 "We are locomotive engineers now"</strong><br/>
<small>Job: Keep the AI on track</small>
</div>

</v-click>

</div>

</div>

---

# 🦞 Meet Clawd Bot

<div class="grid grid-cols-2 gap-6">

<div>

### What is Clawd?

<v-clicks>

<div class="bg-purple-50 p-3 rounded-lg mb-2 text-left">
<strong>Personal AI Assistant</strong><br/>
Claude Code as always-on service
</div>

<div class="bg-purple-50 p-3 rounded-lg mb-2 text-left">
<strong>Multi-Surface</strong><br/>
Telegram, WhatsApp, Discord, Signal, Slack...
</div>

<div class="bg-purple-50 p-3 rounded-lg mb-2 text-left">
<strong>Skills instead of MCPs</strong><br/>
Composable Markdown files with instructions
</div>

<div class="bg-purple-50 p-3 rounded-lg mb-2 text-left">
<strong>Cron & Heartbeats</strong><br/>
Proactive check-ins, reminders, automations
</div>

</v-clicks>

</div>

<div>

### Live Demo 🎬

<v-clicks>

<div class="bg-orange-50 p-2 rounded-lg mb-2 text-left">
<strong>⏰ 7pm Reminder</strong><br/>
Cron job triggers → Browser opens Luma → Report
</div>

<div class="bg-orange-50 p-2 rounded-lg mb-2 text-left">
<strong>🧠 Second Brain Capture</strong><br/>
"Remember X" → Auto-categorization → Confirmation
</div>

<div class="bg-orange-50 p-2 rounded-lg mb-2 text-left">
<strong>🎭 Meta-Demo</strong><br/>
This presentation was built WITH Robi!
</div>

</v-clicks>

<v-click>

<div class="bg-green-50 p-3 rounded-lg mt-2 text-left">
<strong>Stack:</strong> Claude Code + CLIs + Messaging + Skills
</div>

</v-click>

</div>

</div>

---
layout: center
class: text-center
---

# 🎬 Live Demo Time!

<v-click>

<div class="grid grid-cols-2 gap-8 text-left mt-8">

<div class="bg-purple-50 p-4 rounded-lg">

### Demo 1: Cron + Browser 🌐

1. **7pm** → Cron job fires
2. Robi opens **Luma page** automatically
3. Checks **registrations**
4. Sends **Telegram message**

*"Automation without code"*

</div>

<div class="bg-blue-50 p-4 rounded-lg">

### Demo 2: Second Brain 🧠

1. Send message: *"Remember: X"*
2. Robi **categorizes** automatically
3. Saves to `~/clawd/brain/`
4. **Confirms** with confidence score

*"Your external memory"*

</div>

</div>

</v-click>

<v-click>

<div class="mt-8 bg-yellow-50 p-4 rounded-lg inline-block">
🎭 <strong>Plot Twist:</strong> This presentation was built WITH Robi!
</div>

</v-click>

---

# 🎯 Skills: The Pattern That Stuck

<div class="grid grid-cols-3 gap-4">

<div>

### ❌ MCPs

<v-clicks>

- Context tax on every call
- Complex setup
- "20% activation rate"
- Overhead for simple tasks

</v-clicks>

</div>

<div>

### ❌ Elaborate Prompts

<v-clicks>

- "You are an expert..."
- Context poison
- Diminishing returns
- Maintenance hell

</v-clicks>

</div>

<div>

### ✅ Skills

<v-clicks>

- Markdown files
- Loaded on-demand
- CLI instructions
- Composable & portable

</v-clicks>

</div>

</div>

<v-click>

<div class="bg-blue-50 p-4 rounded-lg mt-6 text-left">

**Skill Anatomy:**
```markdown
# skill-name
When to use, what it does
## Commands
- `cli command --flag` — Description
## Gotchas
- Known pitfalls
```

</div>

</v-click>

---

# ⛽ Gas Town: A Glimpse of the Future
*Steve Yegge — 30yr veteran, Google/Amazon legend, vibe coding pioneer*

<div class="grid grid-cols-2 gap-6">

<div>

### The Vision 🔮

<v-clicks>

<div class="bg-red-50 p-3 rounded-lg mb-2 text-left">
<strong>Kubernetes for Agents</strong><br/>
Orchestrate swarms, not single agents
</div>

<div class="bg-red-50 p-3 rounded-lg mb-2 text-left">
<strong>Mayor + Crew + Polecats</strong><br/>
Different roles: planning, design, grunt work
</div>

<div class="bg-red-50 p-3 rounded-lg mb-2 text-left">
<strong>189k lines of Go</strong><br/>
No human looked at the code 🤯
</div>

</v-clicks>

<v-click>

<div class="bg-purple-100 p-3 rounded-lg mt-2 text-left">
<strong>⚠️ Bleeding Edge</strong><br/>
<small>Not how to work today — but where we're headed</small>
</div>

</v-click>

</div>

<div>

### Why It Matters

<v-clicks>

- **Genius + Mad Scientist** energy 🧪
- **"Factory farming code"** - the next era
- **Merging = The Wall** everyone will hit
- **Worth studying** for the vision

</v-clicks>

<v-click>

<div class="bg-yellow-50 p-3 rounded-lg mt-4 text-left">
<strong>🎯 Today:</strong> Ralph Wiggum, Clawd Bot<br/>
<strong>🚀 Tomorrow:</strong> Gas Town (for the 100x chasers)
</div>

</v-click>

</div>

</div>

---
layout: center
class: text-center
---

# 📚 Resources

<div class="grid grid-cols-2 gap-6 text-left mt-6">

<div>

### Videos

- 🎬 [Ralph Wiggum - Jeff Huntley](https://youtu.be/4Nna09dG_c0)
- 🎬 [Ralph Explained - Greg Isenberg](https://youtu.be/RpvQH0r0ecM)
- 🎬 [Steve Yegge Interview](https://youtu.be/zuJyJP517Uw)

</div>

<div>

### Reading

- 📝 [Gas Town Manual](https://steve-yegge.medium.com/gas-town-emergency-user-manual-cf0e4556d74b)
- 📝 [Beads Issue Tracker](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a)
- 🦞 [Clawdbot](https://github.com/steipete/clawdbot)

</div>

</div>

<v-click>

<div class="mt-8 text-sm text-gray-500">
All links available at: github.com/plattenschieber/agent-presentation
</div>

</v-click>

---
layout: center
class: text-center
---

# ⚡ Lightning Round

<v-click>

<div class="text-2xl mt-8 mb-8 font-bold text-purple-600">
"I was [reaction] when Claude Code [action]"
</div>

</v-click>

<v-click>

<div class="grid grid-cols-3 gap-4 text-lg mt-8">
  <div class="p-4 bg-blue-50 rounded-lg">
    🤯 Mind = Blown<br/>
    <small>What blew you away?</small>
  </div>
  <div class="p-4 bg-red-50 rounded-lg">
    🤦 Facepalm<br/>
    <small>What went wrong?</small>
  </div>
  <div class="p-4 bg-green-50 rounded-lg">
    🔄 Game Changer<br/>
    <small>What do you do differently now?</small>
  </div>
</div>

</v-click>

<div class="absolute bottom-10 left-10">
<small>github.com/plattenschieber/agent-presentation</small>
</div>

---
layout: center
class: text-center
---

# 🍻 Thanks! + What's Next?

<div class="grid grid-cols-2 gap-8 mt-4">

<div class="text-left">

### Interested in a Workshop? 🛠️

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-2">
1. **Build Your Own AI Agent**
</div>

<div class="bg-purple-50 p-3 rounded-lg mb-2">
2. **Personal AI Assistant** (Clawdbot Style)
</div>

<div class="bg-green-50 p-3 rounded-lg mb-2">
3. **Ralph Wiggum Deep Dive**
</div>

</v-clicks>

<div class="mt-4 text-sm">
**Jeronim Morina** — @plattenschieber<br/>
**Lorenz Gräf** — @lgraef
</div>

</div>

<div class="flex flex-col items-center justify-center">

<div class="bg-white p-4 rounded-lg text-center">
<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lu.ma/qskgc2wm" alt="QR Code" style="margin: 0 auto;">
<div class="mt-2"><strong>lu.ma/qskgc2wm</strong></div>
</div>

</div>

</div>

<div class="absolute bottom-10 left-10">
<small>Slides: github.com/plattenschieber/agent-presentation</small>
</div>
