---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides, markdown enabled
title: Agentic Coding Tools
info: |
  ## Agentic Coding Tools: The Current Landscape
  A guide for newcomers to AI-powered development
# apply any unocss classes to the current slide
class: text-center
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# https://sli.dev/guide/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/transitions#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
mdc: true
---

# Agentic Coding Tools
## The Current Landscape

A guide for newcomers to AI-powered development

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next slide <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: image-right
image: /api/placeholder/600/400
---

# About This Session

<v-clicks>

- **Duration**: 30 minutes
- **Audience**: Developers new to agentic programming  
- **Based on**: Recent analysis by Armen (YouTube)
- **Goal**: Understand current state and challenges

</v-clicks>

---

# What Are Agentic Coding Tools?

<v-clicks>

## The Basic Concept
- **LLM + Tool Loop**: AI models that can call tools and iterate
- **Autonomous Code Generation**: Write, test, and refine code independently  
- **Command Line Focus**: Most tools moving toward CLI interfaces

## Why "Agents"?
- Term is controversial but widely adopted
- Not true agents in AI research sense
- More accurately: *"LLM tool loops for coding"*

</v-clicks>

---
layout: center
class: text-center
---

# The Current Explosion
## Since May 2024

<v-clicks>

<div class="text-6xl font-bold text-blue-500 mb-4">30+</div>
<div class="text-xl mb-8">Different CLI coding tools currently available</div>

<div class="grid grid-cols-2 gap-8 text-lg">
  <div>
    <div class="font-bold mb-2">📈 Growth Rate</div>
    <div>New tools launching daily</div>
  </div>
  <div>
    <div class="font-bold mb-2">💰 Investment</div>
    <div>Massive investor interest</div>
  </div>
</div>

</v-clicks>

---

# Types of Agentic Coding Tools

<div class="grid grid-cols-2 gap-8">

<div>

## 🔧 IDE Extensions
<v-clicks>

- **Examples**: GitHub Copilot, Cursor
- **Capabilities**: Autocomplete + basic loops  
- **Note**: Cursor now has CLI agents too

</v-clicks>

</div>

<div>

## 💻 Standalone CLI Tools  
<v-clicks>

- **Examples**: Claude Code, Aider, Devon
- **Capabilities**: Full system access
- **Environment**: Run on your machine

</v-clicks>

</div>

</div>

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## 🌐 Web-Based Tools
<v-clicks>

- **Examples**: v0, Bolt, Replit Agent
- **Focus**: UI/interface creation
- **Limitations**: More constrained

</v-clicks>

</div>

<div>

## ☁️ Platform-Integrated
<v-clicks>

- **Examples**: Devon, GitHub tools
- **Deployment**: Remote servers
- **Features**: Background agents

</v-clicks>

</div>

</div>

---

# How These Tools Actually Work

<v-clicks>

## Core Tool Set
1. **File Reading** - Access and understand codebases
2. **Code Search** - grep, ripgrep for finding code  
3. **File Editing** - Modify or create files
4. **Command Execution** - Run tests, compilers, builds
5. **Web Search** - Access documentation (some tools)

</v-clicks>

<v-click>

## The Tool Loop Process

```mermaid
graph LR
    A[User Request] --> B[Planning]
    B --> C[File Analysis]  
    C --> D[Code Changes]
    D --> E[Testing]
    E --> F{Success?}
    F -->|No| B
    F -->|Yes| G[Complete]
```

</v-click>

---

# ⚠️ The Model-Tool Binding Problem

<v-clicks>

## Key Insight: Not All Models Are Equal
- **Best tools** have models trained on their specific tool set
- **Example**: Claude models trained on bash, text editor, web search
- **Problem**: Generic tools may not work optimally with all models

## Evidence
- GPT-4 frequently calls non-existent "search" tool
- Early GPT-5 access tools outperformed day-one implementations  
- Tool naming and prompting matter significantly

</v-clicks>

<v-click>

<div class="bg-yellow-100 p-4 rounded-lg mt-4">
<strong>Takeaway:</strong> Model-tool compatibility is crucial for good results
</div>

</v-click>

---

# Model Landscape

<div class="grid grid-cols-2 gap-8">

<div>

## ✅ Production-Ready Models
<v-clicks>

- **Anthropic**: Claude 3.5 Sonnet, Opus
- **OpenAI**: GPT-4, GPT-5  
- **Google**: Gemini Pro
- **xAI**: Grok (promising but inconsistent)

</v-clicks>

</div>

<div>

## 🔓 Open Source Options
<v-clicks>

- **QwQ Coder**: Capable tool calling
- **Qwen**: Multiple sizes available
- **Llama**: Various fine-tuned versions

</v-clicks>

</div>

</div>

<v-click>

## 🎰 The Platform Problem
- Performance varies wildly between providers (OpenRouter vs direct API)
- Local vs hosted can behave differently
- "Slot machine" experience with some platforms

</v-click>

---

# Quality and Safety Considerations

<v-clicks>

## Pre/Post-Flight Checks
**Example**: Claude Code
- **Pre-flight**: Haiku model creates task description
- **Post-flight**: Haiku validates tool usage safety
- **Result**: Reduces dangerous operations

## Common Problems
- Tools getting stuck in infinite loops
- Inappropriate command execution  
- Working outside project boundaries
- Network request failures without recovery

</v-clicks>

<v-click>

<div class="bg-red-100 p-4 rounded-lg mt-4">
<strong>⚠️ YOLO Mode Warning:</strong> Not all tools are safe to run with full permissions!
</div>

</v-click>

---

# The Evaluation Challenge

<v-clicks>

## Why It's Hard to Compare Tools
1. **Too many variables**: Model, tool setup, prompting, safety
2. **Benchmark gaming**: SWE-bench optimization ≠ real performance
3. **Cost complexity**: Cheaper tokens ≠ lower total cost
4. **Efficiency differences**: Token usage patterns vary

## Real-World Factors
- **User Experience**: Interface quality affects results
- **Workflow Integration**: How well it fits your process
- **Reliability**: Consistency over multiple runs  
- **Speed vs Quality**: Tradeoffs in iteration patterns

</v-clicks>

<v-click>

<div class="bg-blue-100 p-4 rounded-lg mt-4">
<strong>Bottom line:</strong> Trust practical experience over hype and benchmarks
</div>

</v-click>

---

# Cost Considerations

<v-clicks>

## It's Complicated 💸
- **Per-token pricing** doesn't tell the full story
- **Iteration patterns** vary between models
- **GPT-5**: Cheaper per token but uses more tokens
- **Claude**: More expensive per token but more efficient loops

## Hidden Costs
- **Time to first token**: Affects perceived speed
- **Failed iterations**: Wasted compute on stuck agents
- **Context switching**: Mental overhead of tool interactions

</v-clicks>

<v-click>

<div class="text-center mt-8">
<div class="text-2xl font-bold">Efficiency > Raw Pricing</div>
</div>

</v-click>

---

# Practical Use Cases

<div class="grid grid-cols-2 gap-8">

<div>

## ✅ What Works Well Today
<v-clicks>

1. **Prototype Tools**: Quick debugging utilities
2. **Code Modernization**: Updating syntax, APIs
3. **Test Generation**: Comprehensive test suites  
4. **Documentation**: Comments, READMEs

</v-clicks>

</div>

<div>

## ⚠️ What's Still Challenging
<v-clicks>

- **Large refactoring**: Cross-system changes
- **Performance optimization**: Algorithmic improvements
- **Complex business logic**: Domain-specific requirements

</v-clicks>

</div>

</div>

<v-click>

<div class="mt-8 p-4 bg-green-100 rounded-lg">
<strong>Sweet spot:</strong> Tools that would be "perpetual prototypes" - useful but not worth manual development time
</div>

</v-click>

---

# The Startup Ecosystem

<v-clicks>

## Current State 🚀
- **Massive funding** for AI coding tools
- **Too many similar products** (30+ CLI tools)
- **Consolidation inevitable**: Market can't support all players

## Evaluation Difficulty 📊
- **Twitter hype ≠ reality**: Social media unreliable for quality
- **Benchmark limitations**: Standard metrics miss real usage
- **Personal preference**: UX and workflow fit matter most

</v-clicks>

<v-click>

<div class="text-center mt-8">
<div class="text-xl font-bold text-orange-500">The field is still sorting itself out</div>
</div>

</v-click>

---

# Best Practices for Getting Started

<div class="grid grid-cols-2 gap-8">

<div>

## Choosing a Tool 🔍
<v-clicks>

1. **Start established**: Claude Code, Cursor, Aider
2. **Match model to tool**: Use preferred combinations
3. **Understand safety**: Know what protections exist
4. **Test safely**: Non-critical projects first

</v-clicks>

</div>

<div>

## Setting Expectations 🎯
<v-clicks>

- **Iteration required**: Rarely perfect first try
- **Supervision needed**: Review all changes
- **Backup everything**: Version control essential
- **Start small**: Simple tasks before complex

</v-clicks>

</div>

</div>

<v-click>

<div class="mt-8 p-4 bg-purple-100 rounded-lg text-center">
<strong>Golden Rule:</strong> These are powerful assistants, not replacements
</div>

</v-click>

---

# Looking Forward

<v-clicks>

## Short-Term Trends 📈
- **Model improvements**: Better tool calling and reasoning
- **Tool standardization**: MCP and similar protocols  
- **Cost optimization**: More efficient inference
- **Safety improvements**: Better sandboxing

## Questions to Watch 🤔
- **Consolidation timeline**: How many tools survive?
- **Enterprise adoption**: Security and compliance
- **Integration patterns**: Workflow integration
- **Performance plateau**: Are we hitting limits?

</v-clicks>

---
layout: center
class: text-center
---

# Key Takeaways

<v-clicks>

<div class="text-2xl mb-8">For Newcomers</div>

<div class="grid grid-cols-2 gap-8 text-lg">
  <div class="p-4 bg-blue-50 rounded-lg">
    <div class="font-bold mb-2">✅ The technology works</div>
    <div class="text-sm">But requires understanding and patience</div>
  </div>
  <div class="p-4 bg-green-50 rounded-lg">
    <div class="font-bold mb-2">🔧 Tool choice matters</div>  
    <div class="text-sm">More than you might expect</div>
  </div>
  <div class="p-4 bg-purple-50 rounded-lg">
    <div class="font-bold mb-2">🤝 Compatibility crucial</div>
    <div class="text-sm">Model-tool pairing affects results</div>
  </div>
  <div class="p-4 bg-orange-50 rounded-lg">
    <div class="font-bold mb-2">📊 Evaluation is hard</div>
    <div class="text-sm">Trust experience over hype</div>
  </div>
</div>

</v-clicks>

---

# Current Reality Check

<v-clicks>

<div class="space-y-6">
  
<div class="flex items-center space-x-4">
  <div class="text-3xl">🌪️</div>
  <div><strong>Explosion of options</strong> makes choice overwhelming</div>
</div>

<div class="flex items-center space-x-4">
  <div class="text-3xl">📊</div>
  <div><strong>Quality varies significantly</strong> between tools and models</div>
</div>

<div class="flex items-center space-x-4">
  <div class="text-3xl">💎</div>
  <div><strong>Real value exists</strong> but mostly for specific use cases</div>
</div>

<div class="flex items-center space-x-4">
  <div class="text-3xl">🚀</div>
  <div><strong>Field evolving rapidly</strong> - expect continued change</div>
</div>

</div>

</v-clicks>

---

# Next Steps

<v-clicks>

## For You 👋
1. **Try multiple tools** with the same task
2. **Join communities** (but take with grain of salt)  
3. **Build evaluation criteria** based on your needs
4. **Share experiences** with your team

## Resources 📚
- **Anthropic**: Claude model tool documentation
- **OpenAI**: GPT model capabilities guide
- **Tool websites**: Getting started guides
- **Community forums**: Reddit, Discord, GitHub discussions

</v-clicks>

---
layout: center
class: text-center
---

# Questions?

<div class="text-lg mt-8 space-y-4">

<div>Remember: The field is evolving rapidly</div>
<div>What's true today may change in weeks</div>

<div class="mt-8 text-blue-500 font-bold">
Focus on understanding principles<br>
rather than memorizing tool features
</div>

</div>

---
layout: end
---

# Thank You! 🙏

<div class="mt-8">

**Key Message**: Agentic coding tools offer real value but require thoughtful adoption and realistic expectations.

**Next Steps**: Start experimenting with simple tasks on non-critical projects to build understanding and intuition.

</div>

<div class="absolute bottom-10 left-10">
<small>Slides available at: github.com/your-repo</small>
</div>