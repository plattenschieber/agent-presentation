# 3 · Build a reviewer you can question

**Outcome:** turn a human-observed failure into a typed reviewer and inspect its errors.

Start with [the common introduction](INTRO.md). Open `03-reviewer.excalidraw` and path 3 in the workbench.

| Time | Facilitate |
| --- | --- |
| 20–40 | Read examples and write observations individually. Agree what counts as the zero-versus-missing failure. |
| 40–80 | Inspect the Code Mode batching script and reviewer adapter. Run a configured JEV or small model; keep fixture mode clearly labeled if access is absent. |
| 80–110 | Compare with human labels. Pick a threshold on practice cases, freeze it, then inspect holdout cases. Discuss false acceptance versus unnecessary rejection. |
| 110–120 | Record where a human must still decide. |

## Participant card

1. Run the exercise. Label the examples before revealing the supplied reference labels.
2. Disagree with a reference label if the rubric is unclear; rewrite the rubric before changing a model.
3. Compare thresholds 0.5 and 0.8 on the practice examples.
4. Freeze your choice before revealing holdout results.
5. Add one ambiguous example of your own and decide how “needs review” should work.

**Fixture answer:** at 0.5, practice example B is wrongly accepted. At 0.8, the three practice examples are classified correctly. This is a hand-authored illustration, not a JEV benchmark or a proven threshold for real data.

## Facilitation notes

Follow Hamel and Shreya's sequence: read traces, record observations, identify failure modes, then automate specific checks. The model must not define both the answer and the standard by which it passes.

A chat model's self-reported probability is not automatically calibrated. Even a purpose-built probabilistic reviewer must be checked on your task. Six examples teach the method; they cannot validate a deployed reviewer. Reusing holdout examples while tuning turns them into practice data.

**Stretch:** compare two reviewers with the same rubric and a larger, separately labeled set.

**Done when:** participants can point to a reviewer mistake, explain a threshold tradeoff, and distinguish human labels from model scores.
