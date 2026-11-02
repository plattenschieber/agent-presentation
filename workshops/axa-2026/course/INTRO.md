# Shared introduction · 20 minutes

Open frame **01 / The common foundation** on any board. Keep the laptop demo ready.

| Time | Say / show | Ask the room |
| --- | --- | --- |
| 0–3 | “Today we will make one agent's work visible, useful and checkable.” State the finish line. | Who uses a coding assistant? Who has reviewed a bad agent change? |
| 3–7 | A model receives tokens and predicts more tokens. Its usable context is finite. It does not automatically know your files. | What must be in context for this task? |
| 7–12 | Walk the small Go loop: send context; receive text or a tool call; execute the tool; append its result; repeat. Point to read/write/edit/bash. | Which step actually changes the computer? |
| 12–16 | The harness owns tools, context and execution. A CLI and browser can expose the same underlying system. Explain the difference between checking output and trusting fluency. | If the browser closes, what should happen to the work? |
| 16–20 | Show the synthetic claims file: 0, 100, null, 200. Ask pairs to predict count and mean. Reveal 3 and 100. | What would a plausible but wrong answer look like? |

**Three sentences to leave visible:**

1. The model proposes; tools act.
2. The harness controls what is available and what happens next.
3. An evaluation checks a specific promise on specific examples.

Do not teach “more tokens is always better,” “a test pass proves correctness,” or “a reviewer model replaces human judgment.” A short, relevant context and a concrete check are more useful teaching targets.

**Transition:** “Now we will change one part of this loop and inspect what changes.”

**If time slips:** shorten the Go tour to one loop; preserve the prediction exercise and the hands-on time.
