# Round 8 facilitator notes

**Jev & the New Normal — Who Reviews All This Code?**

Tuesday 20 October 2026, 18:00–21:00 Europe/Berlin, STARTPLATZ Köln.

## Opening: 15 minutes

Speaker notes in `presentations/round8-jev-review.md` carry the detailed delivery cues.

- 0:00–2:15: a waiting PR, the review bottleneck, and an evidence contract
- 2:15–5:30: Jev primitives, the type-safety boundary, and a proposed workflow
- 5:30–8:30: pair exercise with a synthetic cache-key PR and explicit routing policy
- 8:30–11:00: Qodo's bounded experiment and Vercel's distinct adoption signal
- 11:00–15:00: a shadow evaluation and one real example from the room

Slides 14–15 support participant talks and the closing discussion. Slide 16 is a reading appendix. Preserve five-minute participant lightning talks and leave time for discussion before the 21:00 event end. These are facilitation cues, not a separately announced minute-by-minute event schedule.

## Offline exercise

Run `npm run test:round8`. No network, API key, paid service, or real customer data is involved.

The proposed cache-key change drops tenant identity. The submitted same-tenant test passes for both versions. A two-tenant probe reproduces a collision in the broken version and passes on the original version. The example intentionally uses a simple in-memory cache. It does not establish anything about a real application's ID or cache contract.

Ask participants for the missing identity contract, cache read/write paths, and isolation test. Evidence may disconfirm the initial hypothesis. A real system with globally unique invoice IDs, for example, requires a different analysis. Model confidence alone must not decide whether to merge.

The routing code is illustrative application policy, not a Jev SDK sample. All outcomes preserve review or revision. The exercise verifies the example and policy assertions; it does not test Jev or measure model quality.

## Claims and sources

Checked 14 October 2026. Source links also appear in the relevant slide notes.

- [TypeSafe launch, 15 September](https://typesafe.ai/blog/introducing-system-one-models-and-jev): structured decisions rather than generated strings. Its type guarantee must not be mistaken for semantic correctness.
- [TypeSafe introduction](https://docs.typesafe.ai/introduction) and [quick start](https://docs.typesafe.ai/introduction/quickstart): Choice, Score, and Noul interfaces. Choice and Score include confidence; Noul returns a probability without a separate confidence field.
- [Confidence documentation](https://docs.typesafe.ai/confidence): confidence summarizes the returned distribution. Domain evaluation and authorization remain separate responsibilities.
- [Vercel, 18 September](https://vercel.com/blog/ai-gateway-jev-model-launch): first-day AI Gateway adoption claim, not evidence of review accuracy.
- [Qodo, 5 October](https://www.qodo.ai/blog/does-jev-make-ai-code-review-more-efficient/): 24 evaluation cases; one added required test gap; zero added confirmed defects; unsupported concerns in three cases. Unequal evidence access prevents an equal-conditions model ranking. Developer-time savings were not measured. Categories overlap.
- [Experimental Jev Review workflow](https://github.com/devagrawal09/jev-review): inspiration for staged risk screening, evidence selection, severity, and routing. It does not establish a production-ready review guarantee.

No live Jev demonstration is promised. Optional future live use needs an independently tested setup and permission before sending repository content to an external service.
