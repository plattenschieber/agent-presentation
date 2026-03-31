---
theme: default
title: Agents Anonymous - Round 6
info: |
  ## Agents Anonymous - Round 6
  Cologne Edition
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Agents Anonymous 🕵️
## Cologne Edition - Round 6

*Make It Yours: Customizing Your Agent Harness*

<div class="pt-4 text-lg opacity-80">
formerly Claude Code Anonymous — now for everyone
</div>

<div class="pt-8">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# 🧰 The Tool Is Not The Product

*YOUR setup is.*

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

### The Starting Line

<v-clicks>

<div class="bg-gray-50 p-3 rounded-lg mb-2 text-left">
<strong>Out-of-the-box?</strong> Everyone has the same.<br/>
Claude Code, Cursor, Windsurf, Pi, Aider...
</div>

<div class="bg-gray-50 p-3 rounded-lg mb-2 text-left">
<strong>The difference?</strong> What you bolt on top.<br/>
Config, skills, extensions, workflows.
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>My journey:</strong> Claude Code → Pi Coding Agent<br/>
The patterns transferred. The harness is portable.
</div>

</v-clicks>

</div>

<div>

### Why This Matters

<v-clicks>

- **Generic tools** solve generic problems
- **Your harness** solves YOUR problems
- **Customization** compounds over time
- **Sharing configs** = multiplier for the community

</v-clicks>

<v-click>

<div class="bg-yellow-50 p-3 rounded-lg mt-4 text-left">
<strong>💡 "The best setup is the one you built yourself"</strong><br/>
<small>...or stole from Armin Ronacher</small>
</div>

</v-click>

</div>

</div>

---

# 🎚️ The Customization Spectrum

<div class="grid grid-cols-4 gap-3 mt-6">

<v-clicks>

<div class="bg-green-50 p-4 rounded-lg text-center">
<div class="text-3xl mb-2">📝</div>
<strong>Config Files</strong>
<div class="text-sm mt-2 text-left">
CLAUDE.md<br/>
AGENTS.md<br/>
.cursorrules<br/>
settings.json
</div>
<div class="text-xs mt-2 opacity-60">5 minutes</div>
</div>

<div class="bg-blue-50 p-4 rounded-lg text-center">
<div class="text-3xl mb-2">🎯</div>
<strong>Skills</strong>
<div class="text-sm mt-2 text-left">
Markdown instructions<br/>
Loaded on-demand<br/>
Composable<br/>
/commit, /review
</div>
<div class="text-xs mt-2 opacity-60">30 minutes</div>
</div>

<div class="bg-purple-50 p-4 rounded-lg text-center">
<div class="text-3xl mb-2">🔌</div>
<strong>Extensions</strong>
<div class="text-sm mt-2 text-left">
TypeScript hooks<br/>
Custom UI/UX<br/>
Tool renderers<br/>
Slash commands
</div>
<div class="text-xs mt-2 opacity-60">1-2 hours</div>
</div>

<div class="bg-red-50 p-4 rounded-lg text-center">
<div class="text-3xl mb-2">🏗️</div>
<strong>Orchestration</strong>
<div class="text-sm mt-2 text-left">
Multi-agent<br/>
Worktrees<br/>
Cron jobs<br/>
Full pipelines
</div>
<div class="text-xs mt-2 opacity-60">A weekend</div>
</div>

</v-clicks>

</div>

<v-click>

<div class="mt-6 text-center text-lg">
Start left. Move right as you feel the friction.
</div>

</v-click>

---

# 🛸 My Cockpit: Pi Extensions

<div class="grid grid-cols-3 gap-3 mt-2">

<v-clicks>

<div class="bg-purple-50 p-3 rounded-lg text-left">
<strong>🌙 go-to-bed.ts</strong><br/>
<small>Blocks tool execution after midnight. Forces <code>echo confirm-that-we-continue</code> before proceeding.</small><br/>
<span class="text-xs opacity-60">Self-care as code.</span>
</div>

<div class="bg-blue-50 p-3 rounded-lg text-left">
<strong>🎭 whimsical.ts</strong><br/>
<small>250+ random thinking messages. "Consulting the void..." instead of "Thinking..."</small><br/>
<span class="text-xs opacity-60">Joy in the terminal.</span>
</div>

<div class="bg-green-50 p-3 rounded-lg text-left">
<strong>📊 session-breakdown.ts</strong><br/>
<small>GitHub-style calendar of coding sessions. Cost tracking. Model/directory/time breakdowns.</small><br/>
<span class="text-xs opacity-60">Know thyself.</span>
</div>

<div class="bg-orange-50 p-3 rounded-lg text-left">
<strong>🗜️ compact-tool-renderer.ts</strong><br/>
<small>Compact summaries for read/write/grep. Expandable output. Less noise, more signal.</small><br/>
<span class="text-xs opacity-60">Tame the firehose.</span>
</div>

<div class="bg-red-50 p-3 rounded-lg text-left">
<strong>🔔 notify.ts</strong><br/>
<small>Native desktop notifications when agent finishes. Never miss a completion.</small><br/>
<span class="text-xs opacity-60">Go touch grass while it works.</span>
</div>

<div class="bg-yellow-50 p-3 rounded-lg text-left">
<strong>🌳 worktree-agents</strong><br/>
<small>Multi-agent orchestration via git worktrees. /agent-new, /agent-sync, /agent-close. Full dashboard.</small><br/>
<span class="text-xs opacity-60">One agent is never enough.</span>
</div>

</v-clicks>

</div>

<v-click>

<div class="mt-3 text-center text-sm opacity-70">
18 extensions total — all symlinked from dotfiles, portable across machines
</div>

</v-click>

---

# 🧬 Standing on Shoulders

*Armin Ronacher's [agent-stuff](https://github.com/mitsuhiko/agent-stuff) — 1.8k stars*

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

### What He Published

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>19 Skills</strong><br/>
/commit, /web-browser, /ghidra, /mermaid, /sentry...
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>16 Pi Extensions</strong><br/>
answer.ts, split-fork.ts, btw.ts, context.ts...
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-2 text-left">
<strong>Plumbing Commands</strong><br/>
Intercepted pip/python, release automation
</div>

</v-clicks>

</div>

<div>

### What I Learned

<v-clicks>

- **Copy first, customize later** — fork what works
- **Dotfiles pattern** — symlink, version control, sync
- **Extensions > MCPs** — for UI/UX customization
- **Share your setup** — the community multiplier

</v-clicks>

<v-click>

<div class="bg-yellow-50 p-3 rounded-lg mt-4 text-left">
<strong>📺 Watch:</strong> Armin's Pi Day talk<br/>
<a href="https://youtu.be/0RLIlNWv1xo" class="text-sm">youtu.be/0RLIlNWv1xo</a>
</div>

</v-click>

</div>

</div>

---
layout: center
class: text-center
---

# 🥛 Your Turn!

<v-click>

<div class="text-xl mt-6 mb-4 font-bold text-purple-600">
What's ONE thing you've customized in your agent setup?
</div>

</v-click>

<v-click>

<div class="grid grid-cols-3 gap-4 text-lg mt-6">
  <div class="p-4 bg-blue-50 rounded-lg">
    📝 Config<br/>
    <small>CLAUDE.md? .cursorrules?</small>
  </div>
  <div class="p-4 bg-purple-50 rounded-lg">
    🎯 Skills / Plugins<br/>
    <small>What did you build?</small>
  </div>
  <div class="p-4 bg-green-50 rounded-lg">
    🔌 Extensions<br/>
    <small>UI, workflows, hooks?</small>
  </div>
</div>

</v-click>

<v-click>

<div class="mt-8 bg-orange-50 p-4 rounded-lg inline-block">
<strong>Up next:</strong> Your lightning talks! (5 min each, 1 hour)
</div>

</v-click>

<v-click>

<div class="mt-6">
<img src="https://media.giphy.com/media/YABz3fRfUFuec/giphy.gif" alt="Shaking Kefir" class="rounded-lg shadow-md inline-block" style="max-height: 150px;">
<div class="text-sm mt-2 opacity-70">Speakers get a Kefir. As is tradition. 🥛</div>
</div>

</v-click>

<div class="absolute bottom-10 left-10">
<small>github.com/plattenschieber/agent-presentation</small>
</div>
