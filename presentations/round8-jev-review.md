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
Jeronim gives the first lightning talk. Target 7 minutes, hard maximum 10.
Slides 1–7 form the opening, slide 8 hands over immediately to guests and
contributors. Slides 9–12 are closing/optional reference material, not extra
opening content. 0:00–0:30: name the review bottleneck and introduce one tiny PR.
If the local model is not rehearsed on this Mac, use the deterministic fallback.
Each presenter gets a kefir, as always.
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
0:30–1:20. Jev is the reference point for bounded decisions: Choice, Score,
and Noul. Choice and Score include probabilities and confidence; Noul returns
a probability without a separate confidence. Jev launched September 15, 2026.
The upcoming local demonstration uses a generative LLM via Ollama, not Jev.
It illustrates workflow composition, not model equivalence or a speed comparison.
Sources:
https://docs.typesafe.ai/introduction
https://typesafe.ai/blog/introducing-system-one-models-and-jev
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
1:20–2:10. Show the synthetic diff and the passing same-tenant test. Ask the
room to keep one possible missing test in mind; do not start a pair exercise.
The snippet omits the cache-write path, which the runnable example supplies.
Show only synthetic data to the local model. Its prompt does not contain the
expected answer or the result of the independent probe.
-->

---
class: round8
---

<div class="r8-kicker">OPTIONAL LOCAL DEMO / OLLAMA / NOT JEV</div>

# A judgment, then a check

<div class="r8-list">
<div><b>Ask</b><span>A local model chooses a risk and the next check</span></div>
<div><b>Inspect</b><span>Read its bounded answer, including a possible mistake</span></div>
<div><b>Verify</b><span>Run the two-tenant probe regardless of its advice</span></div>
</div>

<div class="r8-bottom">No working local model? Run the deterministic exercise. Never fake a model answer.</div>

<!--
2:10–4:10. Switch to the terminal only after rehearsing on the actual Mac.
Run ROUND8_MODEL=<installed-local-tag> npm run demo:round8. The script asks Ollama
on 127.0.0.1 for a schema-constrained judgment, then always runs the deterministic
exercise. No model is downloaded. Show the selected model name.
The model might miss the issue or choose a different check. Discuss the mismatch;
do not retry until it produces the answer you want. A 18-second timeout caps the
model stage. On failure it explicitly reports unavailable, then runs the probe.
Fallback alone: npm run test:round8. This proves the synthetic defect, not model
quality. This demonstration has not yet been rehearsed on Jeronim's Mac.
Source: https://docs.ollama.com/api/chat
Source: https://docs.ollama.com/capabilities/structured-outputs
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
4:10–5:00. A valid enum can still encode the wrong judgment. The same boundary
applies when a local generative model is constrained to JSON. Jev's confidence
summarizes its probability distribution; it does not confer permission to merge.
The independent executable check must remain independent of the model's advice.
Source: https://docs.typesafe.ai/confidence
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
5:00–6:00. One bounded Qodo experiment added one required test gap across 24
cases, no additional confirmed defects, and unsupported concerns in three cases.
Categories overlap. Evidence access differed and developer-time savings were not
measured. This is neither a model ranking nor evidence for our local model.
Source: https://www.qodo.ai/blog/does-jev-make-ai-code-review-more-efficient/
-->

---
class: round8 r8-question
---

<div class="r8-kicker">BACK TO YOUR PR</div>

# What would let you<br>review it with less guesswork?

<div class="r8-large">One explicit invariant.<br>One disconfirming test.<br><span class="r8-accent">One accountable owner.</span></div>

<div class="r8-bottom">Where would you use a bounded judgment? Where would you refuse one?</div>

<!--
6:00–7:00. Leave the room with this question, then hand over to the next guest.
Do not extend this into a facilitated exercise during the opening. Jeronim's
first lightning talk is 5–10 minutes maximum, targeting 7 including the demo.
If discussion starts, save it for after the guest/contributor presentations.
-->

---
class: round8 r8-question
---

<div class="r8-kicker">LIGHTNING TALKS</div>

# Your turn. Five minutes.

<div class="r8-large">One real workflow.<br>One failure or surprise.<br><span class="r8-accent">One question for the room.</span></div>

<div class="r8-bottom">Every presenter gets a kefir. 🥛 Guests and contributors, the floor is yours.</div>

<!--
Jeronim's opening ends here. Open the round to guests and contributors for
five-minute presentations and showcases. Every presenter gets a kefir, as always.
Invite honest examples and keep private code and client details off screen.
Leave room for questions and open discussion after the presentations.
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
class: round8
---

<div class="r8-kicker">OPTIONAL REFERENCE / AFTER THE OPENING</div>

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
Optional discussion reference, outside the 5–10 minute opening. Walk through this proposed workflow. The connectors represent the flow
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

<div class="r8-kicker">OPTIONAL REFERENCE / TEAM EXPERIMENT</div>

# A shadow review before automatic action

<div class="r8-list">
<div><b>Freeze</b><span>Same PRs, evidence, obligations, and model version</span></div>
<div><b>Compare</b><span>Baseline review versus baseline plus structured triage</span></div>
<div><b>Measure</b><span>Missed defects, useful gaps, false alarms, reviewer minutes</span></div>
<div><b>Decide</b><span>Keep it only if the benefit survives the added work</span></div>
</div>

<!--
Outside the opening. Proposed evaluation design, not a completed result. Include correct
code with missing tests, correct code with adequate tests, and defective code
with green tests. Use held-out cases and independent executable checks. Blind
adjudication where practical. Track the time needed to dismiss a false alarm.
Inspect performance by risk class and confidence band. Compare equal evidence
access before drawing model conclusions. No auto-merge during this trial.
-->

---
class: round8 r8-sources
---

<div class="r8-kicker">READING / SOURCE NOTES</div>

# Follow the evidence

- [TypeSafe: Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) · 15 September
- [TypeSafe: primitives and API quick start](https://docs.typesafe.ai/introduction/quickstart)
- [TypeSafe: what confidence means](https://docs.typesafe.ai/confidence)
- [Ollama: structured outputs](https://docs.ollama.com/capabilities/structured-outputs)
- [Qodo: Does Jev make AI code review more efficient?](https://www.qodo.ai/blog/does-jev-make-ai-code-review-more-efficient/) · 5 October
- [devagrawal09/jev-review: experimental staged review](https://github.com/devagrawal09/jev-review)

<div class="r8-bottom">Sources checked 14–15 October 2026. Toy PR and routing exercise are illustrative.</div>

<!--
Appendix, outside the 5–10 minute opening. Primary sources, including a vendor's
own evaluation, support the factual claims. Proposed workflow and teaching
exercise are our synthesis. The optional local generative-model demo is not Jev and makes no performance claim.
-->
