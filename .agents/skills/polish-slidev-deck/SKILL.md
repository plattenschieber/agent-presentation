---
name: polish-slidev-deck
description: Creates or redesigns Slidev presentations as polished, coherent visual systems while preserving content and speaker flow. Use when creating a presentation in this repo, when a deck looks plain or inconsistent, or when applying the house style across several Slidev decks.
---

# Polish a Slidev Deck

Turn the deck into a designed system, not a collection of decorated pages.

For a new deck, first read the repository instructions and an existing recent deck for Slidev structure—not as a visual template. Give every slide a unique deck class and choose a fresh visual thesis suited to the talk. For an existing deck, preserve its wording, click order, speaker notes, sources, and navigation.

## 1. Establish the visual thesis

Read the complete deck and name its tone in three adjectives. Choose one visual metaphor that reinforces the talk rather than illustrating each sentence. Define:

- one near-black or warm-paper canvas
- one primary accent and, at most, one secondary accent
- one display face and one mono/utility face from locally available system fonts
- one border radius, one stroke treatment, and one spacing rhythm

The content hierarchy must determine visual weight. Decoration stays quieter than the claim.

**Done when:** every color, type treatment, and motif has a named role.

## 2. Assign slide archetypes

Classify every slide before styling it:

- **Cover** — title, premise, identity
- **Content** — one claim plus supporting evidence
- **Comparison** — before/after or option/option
- **Sequence** — ordered steps or progression
- **Thesis** — one memorable argument
- **Question** — audience handoff or closing prompt

Give each archetype a composition, while sharing the same palette, typography, framing, and footer language.

**Done when:** every slide has one obvious entry point and no slide is merely a centered stack of text.

## 3. Implement safely in Slidev

Inline `<style>` blocks are slide-scoped. Put deck-wide CSS in `presentations/styles/index.css` and scope every selector to a unique class such as `.round7`. Add that class to every slide's `class:` frontmatter; never use unscoped `.slidev-layout`, `h1`, or utility overrides in the global stylesheet.

Prefer existing semantic wrappers in the Markdown. Add a wrapper or class only when it creates a real archetype seam. Preserve wording, click order, speaker notes, sources, and navigation.

Use:

- oversized, tightly tracked headings
- an asymmetric grid and generous outer margins
- quiet panels with crisp 1px strokes
- a repeated frame, folio, or grid motif
- accent color for meaning and emphasis, not confetti
- progressive disclosure already present in the deck

**Done when:** the deck's content is unchanged and all global rules are isolated to its unique class.

## 4. Inspect rendered slides

Start the deck and validate at a 16:9 presentation viewport. Load the current `agent-browser` guide before browser commands. Inspect every slide after its final click state and let slide transitions settle before capturing screenshots.

Check:

- title wrapping and clipping
- text and panel contrast
- consistent alignment and spacing
- hidden click content becoming visible in order
- no content crossing the internal frame
- browser errors and console warnings

Fix the weakest slide, then scan the full deck again so local improvements do not break cohesion.

**Done when:** every slide is legible from the back of a room and looks like part of the same deck.

## 5. Verify

Run the deck-specific build first, then the repository-required build. Confirm expected output files exist and run `git diff --check`.

Report the visual thesis, changed files, browser checks, and build result.
