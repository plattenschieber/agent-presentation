---
theme: default
title: Sokrates — semanticOS
info: |
  ## Sokrates — semanticOS
  A 5-minute lightning talk on operational AI, team coordination, and end-to-end execution with OpenClaw
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Sokrates — semanticOS
## Not another chatbot. An operating system for real team work.

<div class="pt-4">
  <div class="text-lg opacity-75">Jeronim Morina + Team Brynk</div>
  <div class="text-sm opacity-50 mt-1">ClawCon NRW — 5-minute lightning talk</div>
</div>

<div class="pt-8">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# Who am I — and why should you listen to me?
## Short version: I build the systems behind this stuff.

<div class="text-center mt-4">
<img src="../public/clawcon-photo.jpg" alt="ClawCon Group Photo" class="mx-auto rounded-lg shadow-lg" style="max-height: 250px;">
</div>

<div class="mt-3 bg-gray-100 p-4 rounded-lg text-left text-base">
<ul>
<li>Peter Steinberger invited me to ClawCon Vienna</li>
<li>I got to present <strong>brain-cli</strong></li>
<li>brain-cli later landed in the official OpenClaw docs</li>
<li>I build agent systems, infrastructure, and practical workflows that teams can actually use</li>
<li>and yes, somehow I ended up in <em>that</em> article photo</li>
</ul>
</div>

<div class="mt-3 bg-yellow-50 p-4 rounded-lg text-left">
<strong>So this talk is not theory. It is field notes from building the thing.</strong>
</div>

---

# The Problem
## The real problem is lack of clarity and focus.

<v-clicks>

<div class="bg-red-50 p-3 rounded-lg mb-3 text-left">
<strong>Today:</strong> teams often use AI without shared clarity on purpose or relevance.
</div>

<div class="bg-orange-50 p-3 rounded-lg mb-3 text-left">
<strong>Result:</strong> effort fragments across tabs, threads, and disconnected outputs.
</div>

<div class="bg-yellow-50 p-3 rounded-lg text-left">
<strong>Consequence:</strong> you get motion, noise, and weak efficiency gains instead of focused execution.
</div>

</v-clicks>

---

# The Thesis
## Companies need more than AI tools. They need a semanticOS.

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
A system that connects <strong>context</strong>, <strong>roles</strong>, <strong>tools</strong>, and <strong>execution</strong>.
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
A system where good ideas do not die in chat threads, docs, or tabs.
</div>

<div class="bg-green-50 p-3 rounded-lg text-left">
That is what Sokrates is for us: a semanticOS for turning intent into execution.
</div>

</v-clicks>

---

# What Sokrates Is
## Built on OpenClaw. Designed for real work.

<div class="grid grid-cols-2 gap-6">

<div>

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
<strong>Memory</strong><br/>
Persistent context across people, projects, and decisions
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
<strong>Skills</strong><br/>
Reusable capabilities for repeatable workflows
</div>

<div class="bg-blue-50 p-3 rounded-lg text-left">
<strong>Integrations</strong><br/>
Messaging, repos, browser automation, previews, docs
</div>

</v-clicks>

</div>

<div>

<v-clicks>

<div class="bg-green-50 p-3 rounded-lg mb-3 text-left">
<strong>Boards + structure</strong><br/>
Execution that does not dissolve into chat chaos
</div>

<div class="bg-green-50 p-3 rounded-lg mb-3 text-left">
<strong>Channel-native interaction</strong><br/>
The team works where it already works
</div>

<div class="bg-green-50 p-3 rounded-lg text-left">
<strong>Operational AI</strong><br/>
Not just answers — actions through real systems
</div>

</v-clicks>

</div>

</div>

---

# Why It Feels Different
## The point is not better text. The point is coordinated execution.

<div class="grid grid-cols-2 gap-6 text-left">

<div>

### Typical AI workflow

<v-clicks>

- ask model
- get output
- copy somewhere else
- hope someone follows through

</v-clicks>

</div>

<div>

### Sokrates workflow

<v-clicks>

- ask in the team channel
- context comes with the request
- right skill executes
- result returns to the loop

</v-clicks>

</div>

</div>

<v-click>

<div class="bg-purple-50 p-4 rounded-lg mt-6 text-left">
<strong>Claim:</strong> team intent can move directly into coordinated execution.
</div>

</v-click>

---

# The Team Layer
## AI with role awareness

<v-clicks>

<div class="bg-gray-100 p-3 rounded-lg mb-3 text-left">
We work with a 5-dimensional leadership model: Apostle, Prophet, Teacher, Evangelist, Pastor.
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3 text-left">
Sokrates does not just understand the task. It also helps map the task to the right role and owner.
</div>

<div class="bg-green-50 p-3 rounded-lg text-left">
That turns AI from individual helper into team coordination infrastructure.
</div>

</v-clicks>

---

# What The Same System Can Do
## Different outputs. One operating model.

<div class="grid grid-cols-2 gap-6 text-left">

<div>

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-3">
<strong>Landing page iteration</strong><br/>
WhatsApp feedback → repo change → PR → preview
</div>

<div class="bg-blue-50 p-3 rounded-lg mb-3">
<strong>StoryBrand / messaging work</strong><br/>
Framework-guided artifacts with project context
</div>

<div class="bg-blue-50 p-3 rounded-lg">
<strong>Bug capture</strong><br/>
Testing insight → board entry → prioritization
</div>

</v-clicks>

</div>

<div>

<v-clicks>

<div class="bg-green-50 p-3 rounded-lg mb-3">
<strong>Knowledge continuity</strong><br/>
Memory across sessions, people, and projects
</div>

<div class="bg-green-50 p-3 rounded-lg mb-3">
<strong>Operational integrations</strong><br/>
Files, browser, repos, docs, messaging surfaces
</div>

<div class="bg-green-50 p-3 rounded-lg">
<strong>Omaship</strong><br/>
The product and deployment backbone for shipping secure company systems like this
</div>

</v-clicks>

</div>

</div>

---

# Live Demo
## One WhatsApp message. Real execution.

<div class="bg-gray-100 p-5 rounded-lg text-left text-sm leading-7">
<strong>Prompt on the slide:</strong><br/><br/>
“@sokrates Please revise the MedicalDocu landing page:<br/>
1. Put trust and medical quality more in the foreground than pure automation.<br/>
2. Rework the hero so it is clear that less documentation effort is the result of better quality.<br/>
3. Add a trust bar directly below the hero with: built with physicians, German medical language, physician remains the author, GDPR-compliant.<br/>
4. Turn it into a PR with a preview link.”
</div>

<v-click>

<div class="bg-yellow-50 p-4 rounded-lg mt-6 text-left">
No prompt-theater. No special UI. Just language, context, and a real task moving through the system.
</div>

</v-click>

---

# The Bigger Bet
## We are building Brynk through the system.

<v-clicks>

<div class="bg-purple-50 p-3 rounded-lg mb-3 text-left">
We are not just using Sokrates to support Brynk AI.
</div>

<div class="bg-purple-50 p-3 rounded-lg mb-3 text-left">
We are building Brynk through Sokrates as a semanticOS.
</div>

<div class="bg-orange-50 p-3 rounded-lg text-left">
With Omaship, this becomes a product path: build, deploy, and scale secure company operating systems and the apps around them.
</div>

</v-clicks>

---
layout: center
class: text-center
---

# Try The Backbone

<div class="grid grid-cols-2 gap-8 mt-4 items-center">

<div class="text-left">

### Omaship

<v-clicks>

<div class="bg-blue-50 p-3 rounded-lg mb-3">
<strong>What it is</strong><br/>
The backbone for deploying and operating secure company systems
</div>

<div class="bg-green-50 p-3 rounded-lg mb-3">
<strong>Why it matters</strong><br/>
If Sokrates is the semanticOS, Omaship is the infrastructure that makes it shippable
</div>

<div class="bg-purple-50 p-3 rounded-lg">
<strong>CTA</strong><br/>
Scan the QR code and try the product
</div>

</v-clicks>

</div>

<div class="flex flex-col items-center justify-center">
  <div class="bg-white p-4 rounded-lg text-center shadow-md">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://omaship.com" alt="QR Code" style="margin: 0 auto; max-height: 200px;" />
    <div class="mt-2"><strong>omaship.com</strong></div>
  </div>
</div>

</div>

---
layout: center
class: text-center
---

# The Thesis

<div class="text-3xl font-bold text-blue-600 mb-6">
Sokrates is our semanticOS.
</div>

<div class="text-2xl mb-8">
It connects people, memory, tools, roles, and execution.
</div>

<v-click>

<div class="bg-green-100 p-5 rounded-lg inline-block text-left max-w-3xl">
Not AI for isolated individuals.<br/>
AI for coherent team action.
</div>

</v-click>
