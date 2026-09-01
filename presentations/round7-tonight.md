---
theme: default
title: Less Steering, More Alignment
info: |
  ## Agents Anonymous - Round 7
  Cologne Edition
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

<div class="eyebrow">AGENTS ANONYMOUS · COLOGNE · ROUND 7</div>

# Less Steering.<br><span class="accent">More Alignment.</span>

<div class="subtitle mt-8">What remains when the agent harness disappears?</div>

<!--
Since our last meetup, my tools changed again. But the interesting part is not
which agent won. It is what disappeared from my daily work—and what became more
important instead.
-->

---

# My daily harness got smaller.

<div class="stack mt-8">

<v-clicks>

<div class="stack-row">
  <strong>Pi</strong>
  <span>A lean, general-purpose coding harness.</span>
  <small>~5k vs ~35k tokens to say “hi”*</small>
</div>

<div class="stack-row">
  <strong>Bro</strong>
  <span>Say the same thing—like a human.</span>
  <small>One tiny instruction. Daily relief.</small>
</div>

<div class="stack-row">
  <strong>Grill with Docs</strong>
  <span>Settle the thinking before generating.</span>
  <small>Shared vocabulary + ADRs as you go.</small>
</div>

</v-clicks>

</div>

<div class="footnote">*My rough measurement, in my setup—not a benchmark.</div>

<!--
Pi wastes very little context on the harness. Bro asks the model to restate its
answer simply. Grill with Docs interviews us and writes resolved terms to
CONTEXT.md and hard decisions to ADRs while we work.

[Sources]
- https://pi.dev
- https://github.com/dmmulroy/.dotfiles/blob/main/home/.agents/skills/bro/SKILL.md
- https://github.com/mattpocock/skills/blob/main/docs/engineering/grill-with-docs.md
[/Sources]
-->

---

# We stopped reviewing the generated code first.

<div class="two-side mt-10">

<div>
  <div class="label">BEFORE</div>
  <div class="big muted strike">1,000 lines</div>
  <div class="caption">“Can someone review this?”</div>
</div>

<div class="arrow">→</div>

<div>
  <div class="label accent">NOW</div>
  <div class="big">Decisions<br>+ context</div>
  <div class="caption">“Is this the architecture we want?”</div>
</div>

</div>

<v-click>
<div class="takeaway mt-10">The code proves the decision was implemented.</div>
</v-click>

<!--
Nobody wanted to review a thousand generated lines. But the team will review the
architecture decision and the new context. The conversation moved from syntax to
intent—and the team became more aligned.
-->

---

# Now even the machine is disappearing.

<div class="two-side mt-12">

<div>
  <div class="label">LOCAL</div>
  <div class="big muted">worktrees<br>ports<br>dirty state</div>
</div>

<div class="arrow">→</div>

<div>
  <div class="label accent">CLOUD</div>
  <div class="big">one task<br>one thread<br>one clean machine</div>
</div>

</div>

<v-click>
<div class="takeaway mt-10">Start anywhere. Continue anywhere. Share the thread.</div>
</v-click>

<!--
Andreas Spannlager's lightning talk inspired me to take cloud agents seriously.
I now use ChatGPT Work with GitHub so the conversation is not tied to my laptop.
Amp pushes this further: every new Orb thread gets a fresh remote machine, with
review, portals, and multiplayer built around it.

[Sources]
- https://ampcode.com/what-are-orbs
- https://ampcode.com/docs/orbs/portals
[/Sources]
-->

---

# Fresh machines change how you ask.

<div class="sequence mt-12">

<v-clicks>

<div><strong>01</strong><span>Describe the outcome</span></div>
<div><strong>02</strong><span>Give it the context</span></div>
<div><strong>03</strong><span>Define how to verify it</span></div>
<div><strong>04</strong><span>Let it return with evidence</span></div>

</v-clicks>

</div>

<v-click>
<div class="takeaway mt-10">Less watching. Smaller threads. Better repositories.</div>
</v-click>

<!--
Ephemeral instances create a healthy constraint. The repository must explain how
to install and run itself. The task must be clear. And the agent needs a way to
validate the result and present evidence back to you.

[Sources]
- https://ampcode.com/what-are-orbs
- https://ampcode.com/docs/orbs/portals
[/Sources]
-->

---
layout: center
class: text-center
---

# The work shifted.

<div class="hero-contrast mt-10">
  <span class="muted strike">Steer every step</span>
  <span class="arrow">→</span>
  <span class="accent">Align before execution</span>
</div>

<v-click>
<div class="statement mt-12">
The durable asset is not the model, the harness,<br>
the machine, or even the generated code.
</div>
</v-click>

<v-click>
<div class="thesis mt-8">It is the shared context that explains what matters—and why.</div>
</v-click>

<!--
A smaller harness reduces noise. Grill with Docs externalizes intent. Cloud agents
remove the machine. What remains is context, desired outcome, and proof.
-->

---

# Execution got cheap. Purpose did not.

<div class="purpose mt-10">

<v-clicks>

<div>We could keep building <strong>Omaship</strong> as a bespoke software factory.</div>
<div>But faster software does not fix unclear intent.</div>
<div>So we stepped back to refine <strong>semanticOS</strong>: the context and groundwork that helps any agent understand what it is working toward.</div>

</v-clicks>

</div>

<!--
The team did not lose ambition. It moved one level upstream. If a team cannot
articulate its purpose and real problems, an AI software factory will produce
aligned-looking software for an unaligned goal.
-->

---
layout: center
class: text-center
---

<div class="eyebrow">ONE QUESTION FOR TONIGHT</div>

# If you stopped watching your agent work…

<div class="question mt-8">what context would it need to produce<br>something you would trust?</div>

<v-click>
<div class="your-turn mt-12">
  <strong>Your turn. 🥛</strong>
  <span>Five minutes · one honest story · one discussion worth starting</span>
</div>
</v-click>

<!--
Use this question as the handoff into tonight's participant lightning talks.
-->

<style>
:root { --ink:#171717; --muted:#85817a; --paper:#faf8f3; --line:#d8d2c8; --accent:#df5b32; }
.slidev-layout {
  background: radial-gradient(circle at 88% 12%, rgba(223,91,50,.10), transparent 24%), var(--paper);
  color:var(--ink); padding:3.2rem 4.2rem;
}
.slidev-layout h1 { font-size:3.3rem!important; line-height:1.05!important; letter-spacing:-.045em; font-weight:820; }
.eyebrow { color:var(--accent); font-size:.85rem; font-weight:800; letter-spacing:.18em; margin-bottom:1.7rem; }
.accent { color:var(--accent); } .muted { color:var(--muted); }
.strike { text-decoration:line-through; text-decoration-thickness:3px; }
.subtitle { color:var(--muted); font-size:1.65rem; }
.statement { font-size:1.55rem; line-height:1.5; font-weight:650; }
.thesis,.takeaway { color:var(--accent); font-size:1.4rem; font-weight:800; }
.footnote { color:var(--muted); font-size:.72rem; margin-top:1rem; }
.label { font-size:.8rem; letter-spacing:.14em; font-weight:850; margin-bottom:.7rem; }
.big { font-size:2.15rem; line-height:1.08; font-weight:820; }
.caption { color:var(--muted); font-size:1rem; margin-top:.8rem; }
.arrow { color:var(--accent); font-size:2.5rem; font-weight:350; }
.stack { border-top:1px solid var(--line); }
.stack-row { display:grid; grid-template-columns:9rem 1fr 13rem; gap:1.1rem; align-items:baseline; border-bottom:1px solid var(--line); padding:1rem 0; text-align:left; }
.stack-row strong { color:var(--accent); font-size:1.35rem; }
.stack-row span { font-size:1.2rem; font-weight:700; }
.stack-row small { color:var(--muted); font-size:.86rem; }
.two-side { display:grid; grid-template-columns:1fr auto 1fr; gap:3rem; align-items:center; text-align:left; }
.sequence { display:grid; grid-template-columns:repeat(4,1fr); gap:1.4rem; text-align:left; }
.sequence div { border-top:4px solid var(--accent); padding-top:.9rem; }
.sequence strong { color:var(--accent); display:block; font-size:.8rem; margin-bottom:.5rem; }
.sequence span { font-size:1.2rem; line-height:1.25; font-weight:760; }
.hero-contrast { display:flex; align-items:center; justify-content:center; gap:2rem; font-size:2rem; font-weight:800; }
.purpose { max-width:52rem; margin-left:auto; margin-right:auto; }
.purpose div { border-bottom:1px solid var(--line); padding:1rem 0; font-size:1.3rem; line-height:1.35; text-align:left; }
.question { color:var(--accent); font-size:1.75rem; line-height:1.35; font-weight:800; }
.your-turn { display:flex; flex-direction:column; gap:.5rem; }
.your-turn strong { font-size:1.7rem; }
.your-turn span { color:var(--muted); font-size:1rem; }
</style>
