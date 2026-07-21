# Round 7 visual assets

The Round 7 system is **The Evidence Gate**: Cologne at blue hour, amber evidence moving toward a cyan/green verification gate, and no vendor marks.

The built-in image generation tool produced the text-free source artwork at `public/round7-evidence-gate-key-art.png`. Text is intentionally absent from the generated art. The two SVG files in this directory contain deterministic typography and shading overlays for the final raster exports:

- `public/round7-event-cover.png` — 1600 × 900 landscape
- `public/round7-social-square.png` — 1080 × 1080 square

The overlays use the system font stack and keep the session title, round, date, time, and venue editable. Composite them over a cover-cropped copy of the key art; do not ask an image model to regenerate the event text.

## Generation prompt

```text
Use case: ads-marketing
Asset type: source-quality event key art for a technical meetup, intended for both landscape and square crops
Primary request: Create “The Evidence Gate” — an original visual metaphor for proving when autonomous agent work is done.
Scene/backdrop: Cologne at blue hour beside the Rhine, with the Cologne Cathedral and Hohenzollern Bridge recognizable as elegant distant silhouettes, not tourist-photo realism.
Subject: a luminous verification gate in the middle distance. Four abstract evidence cards — acceptance criteria, automated tests, execution traces, and peer review — travel toward and through it as crisp glass-like panels. Before the gate, signals are indigo and amber; after passing, they resolve into calm green and cyan. The evidence cards should use simple abstract checkmarks, waveform/trace lines, review marks, and checklist shapes only.
Style/medium: sophisticated cinematic editorial illustration with restrained near-future interface details; premium event campaign art; atmospheric depth; geometric clarity; not anime, not cartoon.
Composition/framing: wide landscape composition that also survives a centered square crop; keep generous dark negative space in the upper-left and left-center for deterministic title typography; gate is center-right; skyline stays secondary; no important content at the extreme edges.
Lighting/mood: blue-hour indigo, cyan rim light, controlled amber uncertainty glow, emerald verification light; private, serious, optimistic, practitioner-focused.
Color palette: deep navy #07152f, indigo #253c88, cyan #35d7ff, amber #f6b84a, verification green #41d98b.
Materials/textures: translucent evidence panels, subtle wet-stone and river reflections, clean metal gate, fine film grain.
Constraints: no text, no letters, no numbers, no dates, no people, no vendor logos, no brand marks, no watermark. Keep the gate and evidence flow immediately legible at thumbnail size. Make it visibly distinct from the repo’s earlier anime-style Cologne covers and the neon spiral “Lessons Learned” cover.
Avoid: generic cyberpunk city, spaceship portals, fantasy archways, UI clutter, illegible pseudo-text, corporate stock imagery, photorealistic people.
```
