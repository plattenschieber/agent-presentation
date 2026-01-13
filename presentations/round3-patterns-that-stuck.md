---
theme: default
background: https://cover.sli.dev
title: Patterns That Stuck
info: |
  ## Patterns That Stuck
  Claude Code Anonymous - Round 3
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Patterns That Stuck
## Claude Code Anonymous - Round 3

*We've had the hype. We've had the experiments. Which workflows survived?*

<div class="text-center mt-4">
<img src="../public/anon3.jpg" alt="Claude Code Anonymous Round 3" class="mx-auto rounded-lg shadow-md" style="max-height: 300px;">
</div>

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# What Actually Stuck?

<div class="bg-blue-50 p-2 rounded-lg mb-4 text-left text-sm">
<strong>"Just talk to it. Play with it. Develop intuition."</strong> — steipete
</div>

<div class="grid grid-cols-2 gap-4 text-left text-sm">

<div>

### What Stuck

<v-clicks>

<div class="bg-green-50 p-2 rounded-lg mb-1">
<strong>Developing intuition</strong> — You FEEL when the model struggles
</div>

<div class="bg-green-50 p-2 rounded-lg mb-1">
<strong>Blast radius thinking</strong> — Understand scope before execution
</div>

<div class="bg-green-50 p-2 rounded-lg mb-1">
<strong>Parallel agent windows</strong> — 3-8 terminals > elaborate setups
</div>

<div class="bg-green-50 p-2 rounded-lg mb-1">
<strong>Clawd 🦞 pattern</strong> — Composable CLIs + messaging = assistant
</div>

</v-clicks>

</div>

<div>

### What Got Dropped

<v-clicks>

<div class="bg-red-50 p-2 rounded-lg mb-1">
<strong>"You are an expert..."</strong> — Persona prompts don't help
</div>

<div class="bg-red-50 p-2 rounded-lg mb-1">
<strong>Elaborate system prompts</strong> — "Context poison"
</div>

<div class="bg-red-50 p-2 rounded-lg mb-1">
<strong>Most MCPs</strong> — "Context tax when CLIs work"
</div>

<div class="bg-red-50 p-2 rounded-lg mb-1">
<strong>Complex subagent orchestration</strong> — Manual windows work better
</div>

</v-clicks>

</div>

</div>

<v-click>

<div class="bg-yellow-50 p-2 rounded-lg mt-4 text-left text-sm">
<strong>Hot take: Skills vs MCPs vs CLIs?</strong> Skills promise "model picks at runtime" - but ~20% activation without workarounds. Worth it?
</div>

</v-click>

---
layout: center
class: text-center
---

# Your Turn: Lightning Talks!

<v-click>

<div class="text-2xl mt-8 mb-8 font-bold text-purple-600">
What's one pattern you KEPT<br/>and one you DROPPED?
</div>

</v-click>

<v-click>

<div class="grid grid-cols-3 gap-4 text-lg mt-8">
  <div class="p-4 bg-blue-50 rounded-lg">
    Which workflows survived<br/>YOUR daily use?
  </div>
  <div class="p-4 bg-yellow-50 rounded-lg">
    What did you<br/>quietly abandon?
  </div>
  <div class="p-4 bg-green-50 rounded-lg">
    What's different now<br/>vs 6 months ago?
  </div>
</div>

</v-click>

<div class="absolute bottom-10 left-10">
<small>Slides: github.com/plattenschieber/agent-presentation</small>
</div>
