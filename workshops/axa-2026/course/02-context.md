# 2 · Spend context deliberately

**Outcome:** use Code Mode to combine tools and measure what reaches the model.

Start with [the common introduction](INTRO.md). Open `02-context.excalidraw` and path 2 in the workbench.

| Time | Facilitate |
| --- | --- |
| 20–40 | Draw the two paths: raw tool data enters context; or a script computes a summary first. Predict which information the summary loses. |
| 40–80 | Pairs inspect and modify `labs/context.mjs`. Add a minimum, maximum, or missing-value count. Run the script through the actual QuickJS sandbox. |
| 80–110 | Compare output bytes and check the calculations independently. Introduce one question the summary cannot answer. |
| 110–120 | Each pair writes a rule for deciding what to return to a model. |

## Participant card

There are 2,000 synthetic records repeating `[0,100,null,200]`.

1. Predict the recorded count, missing count and mean.
2. Run the exercise and inspect the Code Mode script.
3. Add a missing-value count to the returned object.
4. Verify it without trusting the model's explanation.
5. Ask which individual record had the highest value. Decide whether your summary is sufficient.

**Reference:** 1,500 recorded values, 500 missing values, mean 100. Zero occurs 500 times. JSON byte reduction is measured; token reduction and answer quality are not inferred from it.

## Facilitation notes

Code Mode is JavaScript execution with explicit tool capabilities. It is not another chat model. The sandbox does not directly expose Node's filesystem or network. A tool can still have powerful external effects, so discuss its contract.

Ask: “What evidence would you preserve for a reviewer?” A small summary plus references to the full trace is often better than discarding all detail.

**Stretch:** add a narrow JEV or small-model classifier inside the script; return only uncertain records. Use the reviewer exercise to assess its mistakes.

**Done when:** the script returns the correct summary, participants can explain what remains outside model context, and they can name a question the summary cannot answer.
