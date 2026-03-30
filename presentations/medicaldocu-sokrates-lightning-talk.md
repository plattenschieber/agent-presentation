---
theme: default
title: MedicalDocu + Sokrates
description: 5-minute lightning talk about MedicalDocu and Sokrates as an operational AI system
info: |
  ## MedicalDocu + Sokrates
  A technical lightning talk on product quality, operational AI, and end-to-end execution
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# MedicalDocu + Sokrates
## From Chat Message to Shipped Change

*AI that doesn't just talk — it moves work across the whole system*

<div class="pt-4">
  <div class="text-lg opacity-75">Jeronim Morina + Team Brynk</div>
  <div class="text-sm opacity-50 mt-1">5-minute lightning talk</div>
</div>

<div class="pt-8">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# The Problem We Actually Care About
## Documentation pressure destroys quality

<v-clicks>

<div class="bg-red-50 p-3 rounded-lg mb-3 text-left">
<strong>Medical reality:</strong> documentation steals time from patient care
</div>

<div class="bg-orange-50 p-3 rounded-lg mb-3 text-left">
<strong>Process reality:</strong> under pressure, relevant information gets lost
</div>

<div class="bg-yellow-50 p-3 rounded-lg mb-3 text-left">
<strong>Business reality:</strong> delayed or incomplete letters create rework and lost revenue
</div>

<div class="bg-blue-50 p-3 rounded-lg text-left">
<strong>Our thesis:</strong> this is not mainly an automation problem. It's a <em>quality + trust</em> problem.
</div>

</v-clicks>

<!--
Lead with pain, not AI. MedicalDocu makes more sense once the audience feels the actual constraint.
-->

---

# What MedicalDocu Does
## Trustworthy medical documentation for the DACH market

<div class="grid grid-cols-2 gap-6">

<div>

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
<strong>1. Capture conversation</strong><br/>
Patient conversation gets recorded in the background
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
<strong>2. Generate draft</strong><br/>
Structured, reviewable doctor letter in German medical language
</div>

<div class="bg-blue-50 p-3 rounded-lg text-left">
<strong>3. Doctor approves</strong><br/>
Human-in-the-loop. The doctor stays author.
</div>

</v-clicks>

</div>

<div>

<v-clicks>

<div class="bg-green-50 p-3 rounded-lg mb-3 text-left">
<strong>Positioning:</strong><br/>
Not “AI for doctor letters”<br/>
But: <em>trustworthy quality solution for medical documentation</em>
</div>

<div class="bg-purple-50 p-3 rounded-lg text-left">
<strong>Why this matters:</strong><br/>
Automation without trust is a demo.<br/>
Quality + reviewability is a product.
</div>

</v-clicks>

</div>

</div>

---

# Where Sokrates Fits
## Not in the product — in the operating system around it

<v-clicks>

<div class="bg-gray-100 p-3 rounded-lg mb-3 text-left">
<strong>Sokrates is our Chief-of-Staff AI.</strong><br/>
It supports the team across WhatsApp, files, repos, tasks, and workflows.
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
<strong>It is not “just chat”.</strong><br/>
It has memory, skills, repo access, automation, and deployment workflows.
</div>

<div class="bg-green-50 p-3 rounded-lg text-left">
<strong>So the interesting part is:</strong><br/>
Feedback no longer dies in chats. It can move directly into execution.
</div>

</v-clicks>

<!--
Key distinction: product AI vs operational AI. That's the technical and organizational angle.
-->

---

# End-to-End Flow
## WhatsApp → repo change → PR → preview

<div class="grid grid-cols-2 gap-6 text-left">

<div>

### Input surface

<v-clicks>

- Team discusses landing page copy in WhatsApp
- Concrete feedback lands in the group chat
- Sokrates is mentioned directly in the thread

</v-clicks>

</div>

<div>

### Execution path

<v-clicks>

- Skill selected for MedicalDocu landing page changes
- Copy updated in the dedicated repo
- Build runs automatically
- Draft PR opens
- Preview URL gets posted back to the team

</v-clicks>

</div>

</div>

<v-click>

<div class="bg-yellow-50 p-4 rounded-lg mt-6 text-left">
<strong>This is the punchline:</strong> AI is not just generating artifacts. It's connecting communication, implementation, and feedback loops.
</div>

</v-click>

---

# Why This Matters Technically
## It compresses the distance between intent and output

<v-clicks>

<div class="bg-purple-50 p-3 rounded-lg mb-3 text-left">
<strong>Before:</strong> Chat discussion → somebody writes ticket → context gets lost → someone implements later
</div>

<div class="bg-green-50 p-3 rounded-lg mb-3 text-left">
<strong>After:</strong> Chat discussion → structured execution path → PR + preview while context is still hot
</div>

<div class="bg-blue-50 p-3 rounded-lg text-left">
<strong>Technical lever:</strong> skills, memory, repo-aware automation, and channel-native interaction
</div>

</v-clicks>

---

# Architecture Principle
## Product system + operational system

<div class="grid grid-cols-2 gap-6">

<div>

### MedicalDocu

<v-clicks>

- User-facing product
- Medical workflow
- Trust, correctness, reviewability
- Core business value

</v-clicks>

</div>

<div>

### Sokrates

<v-clicks>

- Internal AI system
- Coordination + execution layer
- Moves context across tools
- Helps the team ship faster with less friction

</v-clicks>

</div>

</div>

<v-click>

<div class="bg-orange-50 p-4 rounded-lg mt-6 text-left">
<strong>Opinionated takeaway:</strong> a lot of teams only think about AI inside the product. The bigger leverage is often AI around the product.
</div>

</v-click>

---

# Demo Structure for 5 Minutes
## Keep it brutally simple

<v-clicks>

<div class="bg-gray-100 p-3 rounded-lg mb-3 text-left">
<strong>Minute 1:</strong> the documentation problem and why trust matters
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
<strong>Minute 2:</strong> what MedicalDocu actually does
</div>

<div class="bg-green-50 p-3 rounded-lg mb-3 text-left">
<strong>Minutes 3–4:</strong> show one real end-to-end Sokrates workflow
</div>

<div class="bg-yellow-50 p-3 rounded-lg text-left">
<strong>Minute 5:</strong> explain the architectural pattern: product AI + operational AI
</div>

</v-clicks>

<!--
If live demo is risky, use screenshots. The story matters more than the stunt.
-->

---
layout: center
class: text-center
---

# The Core Idea

<div class="text-3xl font-bold text-blue-600 mb-6">
Feedback should not have to wait for project management to become execution.
</div>

<v-click>

<div class="bg-green-100 p-5 rounded-lg inline-block text-left max-w-3xl">
<strong>MedicalDocu</strong> improves documentation quality.<br/>
<strong>Sokrates</strong> improves the team's ability to turn reality into shipped change.
</div>

</v-click>

<v-click>

<div class="mt-8 text-xl opacity-80">
That's the system.
</div>

</v-click>
