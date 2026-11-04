---
name: grilling
description: Interview the user about a plan or design until shared understanding is reached.
---

Interview the user about the goal, constraints, examples, tradeoffs, and evidence of success. Work through decisions in dependency order.

Ask one question at a time. Give your recommended answer and explain the consequence briefly. Phrase the question so “yes” accepts the recommendation. Wait for the user's answer before asking the next question.

Use Pi's read and bash tools to resolve facts from available files before asking the user. This workshop has no sub-agent tool: investigate directly. Do not read secrets or print credentials. Decisions belong to the user.

Use each answer to decide the next unresolved question. Do not silently assume important decisions. When the important choices are settled, summarize the agreed outcome, constraints, and acceptance checks. Wait for the user to confirm shared understanding before implementation.
