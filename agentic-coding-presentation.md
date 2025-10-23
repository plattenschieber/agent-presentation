---
theme: default
title: 'Agentic Coding Tools: The Current Landscape'
info: |
  ## Agentic Coding Tools: The Current Landscape
  A Guide for Newcomers to AI-Powered Development

  Speaker: Based on insights from Armen's analysis
  Duration: 30 minutes
  Audience: Developers new to agentic programming
class: text-center
highlighter: shiki
drawings:
  enabled: true
  persist: false
transition: slide-left
mdc: true
---

# Agentic Coding Tools: The Current Landscape
## A Guide for Newcomers to AI-Powered Development

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---

# About This Presentation

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

**Speaker**: Based on insights from Armen's analysis
**Duration**: 30 minutes
**Audience**: Developers new to agentic programming
**Objective**: Understanding the current state and challenges of AI coding tools

</div>

<div class="text-center">

```mermaid
graph TB
    A[New to AI Coding?] --> B[Understanding Agents]
    B --> C[Current Tools]
    C --> D[Practical Usage]
    D --> E[Best Practices]
```

</div>

</div>

---

# What Are Agentic Coding Tools?

## The Basic Concept

<div class="grid grid-cols-1 gap-4 mt-8">

- **LLM + Tool Loop**: AI models that can call tools and iterate
- **Autonomous Code Generation**: Write, test, and refine code independently
- **Command Line Focus**: Most tools moving toward CLI interfaces

</div>

## Why "Agents"?

<div class="grid grid-cols-1 gap-4 mt-4">

- Term is somewhat controversial but widely adopted
- Not true agents in the AI research sense
- More accurately: "LLM tool loops for coding"

</div>

---

# The Current Explosion (Since May 2024)

<div class="grid grid-cols-2 gap-8 mt-8">

<div>

## The Numbers
- **30+ different CLI coding tools** currently available
- New tools launching daily
- Massive investor and developer interest

</div>

<div>

## The Drivers
- Improved foundation models (Claude, GPT, Gemini)
- Better tool calling capabilities
- Proven value for certain coding workflows

</div>

</div>

<div class="text-center mt-8">

```mermaid
timeline
    title AI Coding Tools Timeline
    May 2024  : First wave of CLI tools
    Summer 2024 : Tool explosion begins
    Fall 2024 : Model improvements
    2025 : Consolidation phase
```

</div>

---

# Types of Agentic Coding Tools

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

## 1. IDE Extensions
- **Examples**: GitHub Copilot, Cursor
- **Capabilities**: Autocomplete + basic coding loops
- **Note**: Cursor now also has CLI agents

## 2. Standalone CLI Tools
- **Examples**: Claude Code, Aider, Devon
- **Capabilities**: Full system access, complex multi-file operations
- **Environment**: Run directly on your machine

</div>

<div>

## 3. Web-Based Tools
- **Examples**: v0, Bolt, Replit Agent
- **Focus**: UI/interface creation
- **Limitations**: More constrained than CLI tools

## 4. Platform-Integrated
- **Examples**: Devon (now acquired), GitHub integration tools
- **Deployment**: Remote servers, background agents

</div>

</div>

---

# How These Tools Actually Work

## Core Tool Set

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

1. **File Reading**: Access and understand codebases
2. **Code Search**: grep, ripgrep for finding relevant code
3. **File Editing**: Modify existing files or create new ones
4. **Command Execution**: Run tests, compilers, build tools
5. **Web Search**: (Some tools) Access documentation

</div>

<div>

## The Tool Loop Process

```mermaid
graph LR
    A[User Request] --> B[Planning]
    B --> C[File Analysis]
    C --> D[Code Changes]
    D --> E[Testing]
    E --> F[Iteration]
    F --> C
```

</div>

</div>

---

# The Model-Tool Binding Problem

## Key Insight: Not All Models Are Equal

<div class="grid grid-cols-1 gap-4 mt-6">

- **Best performing tools** have models trained on their specific tool set
- **Example**: Claude models trained on bash, text editor, web search tools
- **Problem**: Generic tools may not work optimally with all models

</div>

## Evidence

<div class="grid grid-cols-1 gap-4 mt-6">

- GPT-4 frequently calls non-existent "search" tool
- Early GPT-5 access tools outperformed day-one implementations
- Tool naming and prompting matter significantly

</div>

<div class="mt-8 p-4 bg-red-50 border-l-4 border-red-400">
<strong>⚠️ Warning:</strong> Model-tool compatibility is crucial for good results
</div>

---

# Model Landscape

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## Production-Ready Models
- **Anthropic**: Claude 3.5 Sonnet, Opus
- **OpenAI**: GPT-4, GPT-5
- **Google**: Gemini Pro
- **xAI**: Grok (promising but inconsistent)

## Open Source Options
- **QwQ Coder**: Capable tool calling
- **Qwen**: Multiple sizes available
- **Llama**: Various fine-tuned versions

</div>

<div>

## The Platform Problem
- Performance varies wildly between providers (OpenRouter vs direct API)
- Local vs hosted can behave differently
- "Slot machine" experience with some platforms

<div class="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
<strong>💡 Tip:</strong> Test the same model on different platforms
</div>

</div>

</div>

---

# Quality and Safety Considerations

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## Pre/Post-Flight Checks
**Example**: Claude Code
- **Pre-flight**: Haiku model creates task description
- **Post-flight**: Haiku validates tool usage safety
- **Result**: Reduces dangerous operations

</div>

<div>

## Common Problems
- Tools getting stuck in infinite loops
- Inappropriate command execution
- Working outside project boundaries
- Network request failures without recovery

</div>

</div>

<div class="mt-8 p-6 bg-red-100 border border-red-300 rounded-lg">
<h3 class="text-red-800 font-bold text-xl">⚠️ YOLO Mode Warning</h3>
<p class="text-red-700 mt-2">Not all tools are safe to run with full permissions!</p>
</div>

---

# The Evaluation Challenge

## Why It's Hard to Compare Tools

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

1. **Too many variables**: Model, tool setup, prompting, safety checks
2. **Benchmark gaming**: SWE-bench optimization vs real-world performance
3. **Cost complexity**: Cheaper tokens ≠ lower total cost
4. **Efficiency differences**: Token usage patterns vary dramatically

</div>

<div>

## Real-World Factors
- **User Experience**: Interface quality affects results
- **Workflow Integration**: How well it fits your development process
- **Reliability**: Consistency over multiple runs
- **Speed vs Quality**: Tradeoffs in iteration patterns

</div>

</div>

---

# Cost Considerations

## It's Complicated

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

- **Per-token pricing** doesn't tell the full story
- **Iteration patterns** vary between models
- **GPT-5**: Cheaper per token but more tokens used
- **Claude**: More expensive per token but more efficient loops

</div>

<div>

## Hidden Costs
- **Time to first token**: Affects perceived speed
- **Failed iterations**: Wasted compute on stuck agents
- **Context switching**: Mental overhead of tool interactions

</div>

</div>

<div class="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400">
<strong>💰 Key Point:</strong> Total cost = (tokens × price) + (time × developer_rate) + failure_cost
</div>

---

# Practical Use Cases

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## What Works Well Today ✅
1. **Prototype Tools**: Quick debugging utilities, data analysis scripts
2. **Code Modernization**: Updating syntax, fixing deprecated APIs
3. **Test Generation**: Creating comprehensive test suites
4. **Documentation**: Code comments, README generation

</div>

<div>

## What's Still Challenging ❌
- **Large refactoring**: Cross-system architectural changes
- **Performance optimization**: Subtle algorithmic improvements
- **Complex business logic**: Domain-specific requirements

</div>

</div>

<div class="mt-8 text-center">

```mermaid
graph LR
    A[Simple Tasks] --> B[Medium Complexity] --> C[Complex Architecture]
    A -.->|Works Great| D[✅ High Success]
    B -.->|Mixed Results| E[⚠️ Variable Success]
    C -.->|Still Hard| F[❌ Limited Success]
```

</div>

---

# The Startup Ecosystem

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## Current State
- **Massive funding** for AI coding tools
- **Too many similar products** (30+ CLI tools)
- **Consolidation inevitable**: Market can't support all current players

</div>

<div>

## Evaluation Difficulty
- **Twitter hype ≠ reality**: Social media not reliable for quality assessment
- **Benchmark limitations**: Standard metrics don't capture real usage
- **Personal preference**: UX and workflow fit matter more than benchmarks

</div>

</div>

<div class="mt-8 text-center">

```mermaid
pie title Current Market State
    "Established Players" : 20
    "Promising Startups" : 30
    "Me-too Products" : 40
    "Research Projects" : 10
```

</div>

---

# Best Practices for Getting Started

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## Choosing a Tool
1. **Start with established options**: Claude Code, Cursor, or Aider
2. **Match model to tool**: Use tools with their preferred models
3. **Understand safety features**: Know what protections are in place
4. **Test on non-critical projects**: Don't risk important codebases

</div>

<div>

## Setting Expectations
- **Iteration required**: Rarely perfect on first try
- **Supervision needed**: Review all code changes
- **Backup everything**: Version control is essential
- **Start small**: Simple tasks before complex projects

</div>

</div>

---

# Looking Forward

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## Short-Term Trends
- **Model improvements**: Better tool calling and reasoning
- **Tool standardization**: MCP and similar protocols
- **Cost optimization**: More efficient inference patterns
- **Safety improvements**: Better sandboxing and validation

</div>

<div>

## Questions to Watch
- **Consolidation timeline**: How many tools will survive?
- **Enterprise adoption**: Security and compliance challenges
- **Integration patterns**: How tools fit into existing workflows
- **Performance plateau**: Are we hitting capability limits?

</div>

</div>

---

# Key Takeaways

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## For Newcomers
1. **The technology works** but requires understanding and patience
2. **Tool choice matters** more than you might expect
3. **Model-tool compatibility** is crucial for good results
4. **Evaluation is difficult** - trust practical experience over hype

</div>

<div>

## Current Reality
- **Explosion of options** makes choice overwhelming
- **Quality varies significantly** between tools and models
- **Real value exists** but mostly for specific use cases
- **The field is still evolving** rapidly

</div>

</div>

---

# Resources for Further Learning

<div class="grid grid-cols-2 gap-8 mt-6">

<div>

## Documentation
- **Anthropic**: Claude model tool documentation
- **OpenAI**: GPT model capabilities and limitations
- **Tool websites**: Each major tool's getting started guide

</div>

<div>

## Practical Steps
1. **Try multiple tools** with the same task
2. **Join community discussions** (but take with grain of salt)
3. **Build your own evaluation criteria** based on your needs
4. **Share experiences** with your team

</div>

</div>

---

# Q&A

<div class="text-center mt-16">

## Questions?

<div class="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
<p class="text-lg">Remember: The field is evolving rapidly. What's true today may change in weeks or months.</p>
<p class="text-lg mt-4">Focus on understanding principles rather than memorizing specific tool features.</p>
</div>

</div>

---

# Thank You

<div class="text-center mt-12">

<div class="text-2xl mb-8">
<strong>Key Message</strong>: Agentic coding tools offer real value but require thoughtful adoption and realistic expectations.
</div>

<div class="text-xl">
<strong>Next Steps</strong>: Start experimenting with simple tasks on non-critical projects to build understanding and intuition.
</div>

<div class="mt-16 text-gray-600">
Questions? Let's chat after the talk! 🚀
</div>

</div>