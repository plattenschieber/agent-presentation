---
theme: default
title: Agents Anonymous Cologne - Round 7 - Proof, Not Prompts
info: |
  ## Agents Anonymous Cologne — Round 7
  Proof, Not Prompts — When Is Agent Work Done?
layout: cover
background: /round7-event-cover.png
class: r7-slide r7-cover text-left
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# <span class="sr-only">Proof, Not Prompts — When Is Agent Work Done?</span>

<div class="cover-credit">
  <strong>Hosted by Jeronim Morina + Lorenz Gräf</strong><br/>
  Advanced practitioners · Tool-agnostic · Private room
</div>

---
class: r7-slide
---

# A demo is a claim

<div class="text-xl text-cyan-100 opacity-90 mb-6">
The shipping decision needs evidence.
</div>

<div class="grid grid-cols-2 gap-6 text-left">

<div class="evidence-card amber-card">

### What the agent reports

<div class="signal-list">

- ✅ “Implemented”
- ✅ “Tests pass”
- ✅ “Diff looks clean”
- ✅ “Ready to merge”

</div>

<div class="card-caption">A polished status update is still self-attestation.</div>

</div>

<div class="evidence-card cyan-card">

### What the gate asks

<div class="signal-list">

- Which behavior was promised?
- What check could have failed?
- What did we actually observe?
- Who owns the remaining risk?

</div>

<div class="card-caption">“Done” is a decision made from receipts.</div>

</div>

</div>

<v-click>

<div class="gate-line mt-7">
Output is not evidence. Confidence is not a gate.
</div>

</v-click>

---
class: r7-slide
---

# Green can still be wrong

<div class="grid grid-cols-5 gap-3 mt-8 text-left text-sm">

<v-clicks>

<div class="failure-card">
  <div class="failure-index">01</div>
  <strong>Missing intent</strong>
  <p>The checks validate a task that was never the real requirement.</p>
</div>

<div class="failure-card">
  <div class="failure-index">02</div>
  <strong>Wrong oracle</strong>
  <p>The test faithfully encodes the same mistaken assumption as the code.</p>
</div>

<div class="failure-card">
  <div class="failure-index">03</div>
  <strong>Fake independence</strong>
  <p>The reviewer inherits the author’s context and repeats its blind spot.</p>
</div>

<div class="failure-card">
  <div class="failure-index">04</div>
  <strong>Environment gap</strong>
  <p>The proof passes locally but depends on state that exists only in production.</p>
</div>

<div class="failure-card">
  <div class="failure-index">05</div>
  <strong>Invisible side effect</strong>
  <p>The visible result is correct while latency, permissions, or data drift.</p>
</div>

</v-clicks>

</div>

<v-click>

<div class="question-line mt-8">
Not “did it run?” — <strong>what does this evidence rule out?</strong>
</div>

</v-click>

---
class: r7-slide
---

# The proof stack

<div class="text-left mt-3 proof-stack">

<v-clicks>

<div class="proof-layer layer-1">
  <span class="layer-number">1</span>
  <div><strong>Acceptance criteria</strong><br/><small>State the claim in observable behavior and explicit boundaries.</small></div>
</div>

<div class="proof-layer layer-2">
  <span class="layer-number">2</span>
  <div><strong>Executable checks</strong><br/><small>Tests, invariants, static analysis, policy checks, dry runs.</small></div>
</div>

<div class="proof-layer layer-3">
  <span class="layer-number">3</span>
  <div><strong>Observed artifacts</strong><br/><small>Traces, screenshots, diffs, logs, before/after state, replayable commands.</small></div>
</div>

<div class="proof-layer layer-4">
  <span class="layer-number">4</span>
  <div><strong>Independent challenge</strong><br/><small>Review from the criteria, adversarial cases, a different vantage point.</small></div>
</div>

<div class="proof-layer layer-5">
  <span class="layer-number">5</span>
  <div><strong>Risk gate</strong><br/><small>Named owner, residual risk, rollback or stop condition, permission to proceed.</small></div>
</div>

</v-clicks>

</div>

<v-click>

<div class="gate-line proof-summary mt-3">A layer adds confidence only when it can fail independently.</div>

</v-click>

---
class: r7-slide
---

# Proof depth follows blast radius

<div class="grid grid-cols-4 gap-3 mt-7 text-left text-sm">

<div class="risk-column">
  <div class="risk-label risk-low">LOCAL</div>
  <h3>Copy or style</h3>
  <ul>
    <li>Rendered preview</li>
    <li>Link and layout check</li>
    <li>Intent review</li>
  </ul>
</div>

<div class="risk-column">
  <div class="risk-label risk-medium">ROUTINE</div>
  <h3>Application logic</h3>
  <ul>
    <li>Acceptance tests</li>
    <li>Focused integration check</li>
    <li>Independent diff review</li>
  </ul>
</div>

<div class="risk-column">
  <div class="risk-label risk-high">STATEFUL</div>
  <h3>Data migration</h3>
  <ul>
    <li>Count and shape invariants</li>
    <li>Representative dry run</li>
    <li>Rollback evidence</li>
  </ul>
</div>

<div class="risk-column">
  <div class="risk-label risk-critical">AUTONOMOUS</div>
  <h3>Deployment</h3>
  <ul>
    <li>Canary observation</li>
    <li>Abort threshold</li>
    <li>Named operator gate</li>
  </ul>
</div>

</div>

<v-click>

<div class="question-line mt-7">
Same agent. Different proof budget. <strong>Risk shapes depth; ceremony does not.</strong>
</div>

</v-click>

---
class: r7-slide
---

# Three changes. Three receipts.

<div class="grid grid-cols-3 gap-4 mt-6 text-left text-sm">

<div class="receipt-card">
  <div class="receipt-title">UI behavior</div>
  <p><strong>Claim:</strong> the flow works at the target viewport and from the keyboard.</p>
  <p><strong>Receipt:</strong> before/after capture + interaction path + accessibility result.</p>
  <p class="receipt-fail"><strong>Not enough:</strong> one pretty screenshot.</p>
</div>

<div class="receipt-card">
  <div class="receipt-title">Data migration</div>
  <p><strong>Claim:</strong> state changes once, completely, and reversibly.</p>
  <p><strong>Receipt:</strong> sampled diff + invariants + rerun result + rollback rehearsal.</p>
  <p class="receipt-fail"><strong>Not enough:</strong> a green unit test on toy data.</p>
</div>

<div class="receipt-card">
  <div class="receipt-title">Retry worker</div>
  <p><strong>Claim:</strong> transient failure recovers without duplicate side effects.</p>
  <p><strong>Receipt:</strong> injected failure trace + dedupe proof + recovered final state.</p>
  <p class="receipt-fail"><strong>Not enough:</strong> the happy path completed.</p>
</div>

</div>

<v-click>

<div class="gate-line mt-7">Good evidence is specific enough to argue with.</div>

</v-click>

---
class: r7-slide
---

# Evidence can lie

<div class="evidence-table mt-6 text-left text-sm">
  <div class="table-head">Signal</div>
  <div class="table-head">False comfort</div>
  <div class="table-head">Disconfirming move</div>

  <div><strong>Tests pass</strong></div>
  <div>The test restates the implementation.</div>
  <div>Change the assumption; inject a counterexample.</div>

  <div><strong>Reviewer approves</strong></div>
  <div>Author and reviewer share one context.</div>
  <div>Review from criteria and artifacts, not the agent’s narrative.</div>

  <div><strong>Trace is clean</strong></div>
  <div>Execution is visible; correctness is not.</div>
  <div>Compare observed state with an independent invariant.</div>

  <div><strong>Screenshot looks right</strong></div>
  <div>A single frame hides interaction and reflow.</div>
  <div>Exercise the path, alternate viewport, and failure state.</div>
</div>

<v-click>

<div class="question-line mt-6">
The strongest receipt is often the one designed to prove you wrong.
</div>

</v-click>

---
class: r7-slide
---

# The Evidence Gate

<div class="gate-flow mt-7 text-left">

<v-clicks>

<div class="gate-step"><span>1</span><strong>State the claim</strong><small>Observable behavior, boundary, non-goals.</small></div>
<div class="gate-arrow">→</div>
<div class="gate-step"><span>2</span><strong>Attach receipts</strong><small>Checks plus observed artifacts.</small></div>
<div class="gate-arrow">→</div>
<div class="gate-step"><span>3</span><strong>Seek disconfirmation</strong><small>Counterexample, failure injection, independent view.</small></div>
<div class="gate-arrow">→</div>
<div class="gate-step"><span>4</span><strong>Make the risk decision</strong><small>Owner, residual risk, rollback, permission.</small></div>

</v-clicks>

</div>

<div class="grid grid-cols-2 gap-5 mt-8 text-left">

<v-click>

<div class="gate-status gate-open">
  <strong>GATE OPEN</strong>
  <span>Criteria are evidenced, checks disagree productively, and recovery is credible.</span>
</div>

</v-click>

<v-click>

<div class="gate-status gate-hold">
  <strong>HOLD</strong>
  <span>Ambiguous intent, correlated checks, production-only assumptions, or no owner.</span>
</div>

</v-click>

</div>

---
class: r7-slide
---

# Bring receipts, not setup tours

<div class="text-lg text-cyan-100 mb-5">
Lightning talks · 5 minutes · 1–2 slides · tool-agnostic
</div>

<div class="grid grid-cols-2 gap-4 text-left">

<v-clicks>

<div class="prompt-card"><strong>Show one artifact</strong><span>that made you trust an agent’s work.</span></div>
<div class="prompt-card"><strong>Tell us about “green”</strong><span>that was still wrong.</span></div>
<div class="prompt-card"><strong>Draw your gate</strong><span>before commit, PR, merge, or deploy.</span></div>
<div class="prompt-card"><strong>Name the human judgment</strong><span>you deliberately kept—or removed.</span></div>

</v-clicks>

</div>

<v-click>

<div class="ritual-line mt-7">
Private room. No recording. Candid failure stories welcome. Speakers get a Kefir. 🥛
</div>

</v-click>

---
class: r7-slide
---

# A definition of done you can use tomorrow

<div class="definition-template mt-7 text-left">
  We will call <strong>[change]</strong> done when <strong>[acceptance criteria]</strong><br/>
  are demonstrated by <strong>[checks + observed artifacts]</strong>,<br/>
  independently challenged by <strong>[review or counterexample]</strong>,<br/>
  and <strong>[risk owner]</strong> accepts <strong>[residual risk + recovery plan]</strong>.
</div>

<div class="grid grid-cols-3 gap-4 mt-8 text-left text-sm">
  <div class="discussion-card"><strong>What evidence changed your mind?</strong></div>
  <div class="discussion-card"><strong>Which green signal do you distrust?</strong></div>
  <div class="discussion-card"><strong>Where should your gate get stricter?</strong></div>
</div>

<div class="event-footer">
  <strong>Agents Anonymous Cologne — Round 7</strong><br/>
  Tuesday 4 August 2026 · 18:00–20:30 · STARTPLATZ Cologne<br/>
  Jeronim Morina + Lorenz Gräf · Advanced practitioners · Tool-agnostic
</div>
