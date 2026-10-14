---
theme: default
title: 'Jev & the New Normal — Who Reviews All This Code?'
info: |
  ## Agents Anonymous · Round 8
  20 October 2026 · STARTPLATZ Köln · 18:00–21:00 Europe/Berlin
class: round8 r8-cover
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

<div class="r8-kicker">AGENTS ANONYMOUS / COLOGNE / ROUND 8</div>

# Jev & the<br>New Normal

<div class="r8-subtitle">Who reviews all this code?</div>

<div class="r8-meta">Tuesday 20 October 2026<br>STARTPLATZ Köln · 18:00–21:00 Europe/Berlin</div>

<!--
Opening: 15 minutes, slides 1–13. Slides 14–16 support the rest of the evening.
0:00–0:30. Set up the question: if generating another implementation is easy,
what becomes scarce? Ask for a show of hands: who has a PR waiting for review?
This is an examination of review workflow design, not a product endorsement.
-->

---
class: round8 r8-question
---

<div class="r8-kicker">THE QUEUE</div>

# What is waiting<br>for a human?

<div class="r8-large">The next patch?<br><span class="r8-accent">Or a decision about the last one?</span></div>

<div class="r8-bottom">Think of one PR you would hesitate to merge today.</div>

<!--
0:30–1:15. Invite two short answers: review time, unclear intent, missing test,
security ownership, or disagreement about what good looks like.
Frame the bottleneck as a question for this room, not an industry-wide statistic.
Connect to Round 7's focus on decisions and context: good intent still needs proof.
-->

---
class: round8
---

<div class="r8-kicker">A PROPOSED REVIEW CONTRACT</div>

# The author owes the reviewer evidence

<div class="r8-list">
<div><b>Intent</b><span>What behavior should change, and what must stay true?</span></div>
<div><b>Evidence</b><span>Which test would fail if this implementation were wrong?</span></div>
<div><b>Ownership</b><span>Who can accept the remaining risk?</span></div>
</div>

<div class="r8-bottom">An agent can prepare the packet. A named owner accepts the change.</div>

<!--
1:15–2:15. Proposed practice, not a description of the audience's current process.
A polished explanation is cheap too. Ask for an executable claim and a relevant
counterexample. For a migration, this may mean a rollback rehearsal. For a cache,
it may mean proving that one tenant cannot read another tenant's data.
-->

---
class: round8
---

<div class="r8-kicker">JEV / TYPESAFE AI</div>

# A model that returns bounded decisions

<div class="r8-list">
<div><b>Choice</b><span>Pick a defined option, with probabilities and confidence</span></div>
<div><b>Score</b><span>Apply a defined rubric, with probabilities and confidence</span></div>
<div><b>Noul</b><span>Return a 0–1 probability for a yes/no statement</span></div>
</div>

<div class="r8-bottom">State + typed questions in. Structured answers out. No generated prose.</div>

<!--
2:15–3:15. Jev launched September 15, 2026. Questions in a call evaluate
independently against the same state. Decompose a broad review into bounded
judgments; compose the policy in code. Noul does not return a separate confidence.
Sources:
https://typesafe.ai/blog/introducing-system-one-models-and-jev
https://docs.typesafe.ai/introduction
https://docs.typesafe.ai/introduction/quickstart
-->

---
class: round8 r8-comparison
---

<div class="r8-kicker">THE BOUNDARY</div>

# Type validity ≠ correct judgment

<div class="r8-columns">
<div><h2>Valid output</h2><p>“Request verification” belongs to the allowed choices.</p><p>The application can consume it.</p></div>
<div><h2>Correct judgment</h2><p>The evidence actually justifies requesting verification.</p><p>The team must evaluate that.</p></div>
</div>

<div class="r8-bottom">Confidence ≠ permission to merge.</div>

<!--
3:15–4:15. TypeSafe guarantees schema matching. That guarantee does not establish
semantic truth. Choice/Score confidence summarizes the probability distribution;
0.8 confidence does not mean an observed 80% correctness rate on our PRs.
Application authorization and required checks remain separate from model belief.
Source: https://docs.typesafe.ai/confidence
Source: https://typesafe.ai/blog/introducing-system-one-models-and-jev
-->

---
class: round8
---

<div class="r8-kicker">WHERE A SMALL JUDGMENT MIGHT HELP</div>

# Review orchestration

<div class="r8-flow">
<div><b>01</b><strong>PR + intent</strong><span>Diff, context, obligations</span></div>
<div><b>02</b><strong>Risk screen</strong><span>Where should we look?</span></div>
<div><b>03</b><strong>Evidence selection</strong><span>Which code and tests?</span></div>
<div><b>04</b><strong>Verification</strong><span>Run checks, inspect claims</span></div>
<div><b>05</b><strong>Owner decision</strong><span>Accept, revise, or escalate</span></div>
</div>

<div class="r8-bottom">Model judgments can prioritize attention. Policy and checks control the next action.</div>

<!--
4:15–5:30. Walk through this proposed workflow. The connectors represent the flow
of evidence, not automatic approval. Missing context must stay visible; a router
that confidently drops the important file makes later review worse.
The experimental devagrawal09/jev-review project stages risk screening, evidence
selection, mechanism classification, severity scoring, and conditional reviewer
routing. Its findings are review prompts; it does not integrate compiler checks
or static analyzers. This diagram adds explicit verification and an owner gate.
Source: https://github.com/devagrawal09/jev-review
-->

---
class: round8
---

<div class="r8-kicker">TOY PR / ILLUSTRATIVE / NO MODEL CALL</div>

# “Reuse the cached invoice”

<div class="r8-code-intent">Requirement: invoices stay isolated between tenants.</div>

```diff
 async function invoice(tenantId, invoiceId) {
-  const key = `${tenantId}:${invoiceId}`;
+  const key = invoiceId;
   return cache.get(key) ?? loadInvoice(tenantId, invoiceId);
 }
```

<div class="r8-bottom">Submitted test: tenant A requests invoice 42 twice. It passes.</div>

<!--
5:30–6:30. This synthetic snippet is deliberately incomplete: the cache write
lives elsewhere. Do not present a green test as proof, or infer everything about
production from a five-line diff. We are choosing the next piece of evidence.
The offline exercise in docs/round8-review-exercise.mjs expands the cache behavior
and reproduces the cross-tenant collision in a fully local example.
-->

---
class: round8 r8-question
---

<div class="r8-kicker">60-SECOND PAIR EXERCISE</div>

# Which evidence changes your decision?

<div class="r8-list">
<div><b>A</b><span>Another same-tenant cache-hit test</span></div>
<div><b>B</b><span>Two tenants with the same invoice ID</span></div>
<div><b>C</b><span>The agent's confident explanation of the optimization</span></div>
</div>

<div class="r8-bottom">What would you ask next? Who owns the risk?</div>

<!--
6:30–7:30. Give pairs 30 seconds, then take two answers. B targets the invariant.
Still ask whether IDs are globally unique, how cache scope works, and where
writes happen. A minimal packet contains the identity contract, read/write
paths, and a cross-tenant test. An unknown must remain an unknown.
-->

---
class: round8
---

<div class="r8-kicker">ILLUSTRATIVE APPLICATION POLICY</div>

# A review signal earns a next step

```js
if (requiredCheckFailed) return "revise";
if (evidenceMissing) return "request_verification";
if (sensitiveBoundaryChanged) return "owner_review";
return "normal_review";
```

<div class="r8-large r8-policy">No model answer can clear<br>an existing blocker.</div>

<div class="r8-bottom">These are policy inputs and routes, not Jev API code or measured model results.</div>

<!--
7:30–8:30. In this toy case request the isolation check and route to the boundary
owner. If the check reproduces a collision, revise. If the packet establishes
that IDs are globally unique, reassess the hypothesis rather than forcing a fix.
The offline exercise tests the routing and collision without a key or network.
A production router must fail safely for malformed, missing, or stale evidence.
-->

---
class: round8
---

<div class="r8-kicker">QODO'S EXPERIMENT / 5 OCTOBER 2026</div>

# What did an extra Jev check add?

<div class="r8-stats">
<div><strong>24</strong><span>evaluation cases</span></div>
<div><strong>1</strong><span>additional required<br>test gap</span></div>
<div><strong>0</strong><span>additional<br>confirmed defects</span></div>
<div><strong>3</strong><span>cases with<br>unsupported concerns</span></div>
</div>

<div class="r8-caveat">Unequal evidence access. Developer-time savings unmeasured.<br>Categories overlap. This is one bounded experiment, not a model ranking.</div>

<!--
8:30–10:00. Qodo's author compared checks, Qodo, Jev, and the combined workflow.
Qodo had repository access; Jev received fixed evidence. The added test gap
concerned query-specific isolation in a rollout gate, not an additional defect.
One unsupported concern escalated verification into a fix request. This is the
cost of a reviewer that creates extra work. The author did not measure developer
time savings; request latency alone cannot answer the efficiency question.
Source: https://www.qodo.ai/blog/does-jev-make-ai-code-review-more-efficient/
-->

---
class: round8 r8-comparison
---

<div class="r8-kicker">THE NEW NORMAL?</div>

# Adoption and review value need different evidence

<div class="r8-columns">
<div><h2>Adoption signal</h2><p>Vercel reported Jev's fastest first-day paid-team adoption on AI Gateway.</p><small>18 September 2026</small></div>
<div><h2>Our evaluation</h2><p>Does it catch meaningful gaps without burying reviewers in unsupported work?</p><small>A question for our repositories</small></div>
</div>

<div class="r8-bottom">Fast calls are useful only if the whole review improves.</div>

<!--
10:00–11:00. Attribute the launch claim to Vercel and its Gateway population.
Do not generalize it to all developers or use adoption as evidence of correctness.
We deliberately make no latency or cost promises for our own review workflow.
Source: https://vercel.com/blog/ai-gateway-jev-model-launch
-->

---
class: round8
---

<div class="r8-kicker">A PRACTICAL TEAM EXPERIMENT</div>

# A shadow review before automatic action

<div class="r8-list">
<div><b>Freeze</b><span>Same PRs, evidence, obligations, and model version</span></div>
<div><b>Compare</b><span>Baseline review versus baseline plus structured triage</span></div>
<div><b>Measure</b><span>Missed defects, useful gaps, false alarms, reviewer minutes</span></div>
<div><b>Decide</b><span>Keep it only if the benefit survives the added work</span></div>
</div>

<!--
11:00–12:30. Proposed evaluation design, not a completed result. Include correct
code with missing tests, correct code with adequate tests, and defective code
with green tests. Use held-out cases and independent executable checks. Blind
adjudication where practical. Track the time needed to dismiss a false alarm.
Inspect performance by risk class and confidence band. Compare equal evidence
access before drawing model conclusions. No auto-merge during this trial.
-->

---
class: round8 r8-question
---

<div class="r8-kicker">BACK TO YOUR PR</div>

# What would let you<br>review it with less guesswork?

<div class="r8-large">One explicit invariant.<br>One disconfirming test.<br><span class="r8-accent">One accountable owner.</span></div>

<div class="r8-bottom">Where would you use a bounded judgment? Where would you refuse one?</div>

<!--
12:30–15:00. Return to the waiting PR from slide 2. Invite one concrete case and
ask the room to identify its missing evidence. Keep disagreement useful: what
observation would change your mind? End the opening at 15 minutes and hand over.
-->

---
class: round8 r8-question
---

<div class="r8-kicker">LIGHTNING TALKS</div>

# Your turn. Five minutes.

<div class="r8-large">One real workflow.<br>One failure or surprise.<br><span class="r8-accent">One question for the room.</span></div>

<div class="r8-bottom">Any tool welcome. Honest examples. Keep private code and client details private.</div>

<!--
Participant lightning talks: five minutes each, followed by short questions.
Invite examples of review backlogs, useful evidence, and automation that made
review worse. Keep the evening conversational and leave room for discussion.
-->

---
class: round8 r8-question
---

<div class="r8-kicker">OPEN DISCUSSION / CLOSING</div>

# Who reviews the reviewer?

<div class="r8-list">
<div><b>Trust</b><span>Which evidence do you actually inspect?</span></div>
<div><b>Limits</b><span>Which changes always need a person?</span></div>
<div><b>Next time</b><span>What will you test in your own workflow?</span></div>
</div>

<div class="r8-bottom">Next dates: 10 November + 1 December · STARTPLATZ Köln · 18:00–21:00</div>

<!--
Facilitate discussion after lightning talks. Ask for one small experiment, not
an all-or-nothing verdict on AI review. Close the formal conversation before the
21:00 event end. Thank the room and the venue. Announce the confirmed next dates:
10 November and 1 December 2026, both 18:00–21:00 at STARTPLATZ Köln. Themes TBA.
-->

---
class: round8 r8-sources
---

<div class="r8-kicker">READING / SOURCE NOTES</div>

# Follow the evidence

- [TypeSafe: Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) · 15 September
- [TypeSafe: primitives and API quick start](https://docs.typesafe.ai/introduction/quickstart)
- [TypeSafe: what confidence means](https://docs.typesafe.ai/confidence)
- [Vercel: Jev's AI Gateway launch](https://vercel.com/blog/ai-gateway-jev-model-launch) · 18 September
- [Qodo: Does Jev make AI code review more efficient?](https://www.qodo.ai/blog/does-jev-make-ai-code-review-more-efficient/) · 5 October
- [devagrawal09/jev-review: experimental staged review](https://github.com/devagrawal09/jev-review)

<div class="r8-bottom">Sources checked 14 October 2026. Toy PR and routing exercise are illustrative.</div>

<!--
Appendix, outside the 15-minute opening. Primary sources, including a vendor's
own evaluation, support the factual claims. Proposed workflow and teaching
exercise are our synthesis. No live Jev call or performance benchmark is claimed.
-->
