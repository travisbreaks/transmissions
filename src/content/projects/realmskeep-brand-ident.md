---
name: "Realmskeep Brand Ident"
category: "Creative"
status: "SUSTAIN"
enjoyment: 7
resources: 10
viability: 10
scale: 3
action: "SHIPPED. Porting to Buddy's repo. Done."
tags: ["animation", "svg", "gsap", "branding", "collaboration"]
stack: ["Vanilla JS", "GSAP", "SVG", "CSS Custom Properties"]
deploy_url: "https://travisbreaks.org/research/realmskeep-brand-ident/"
git_dir: "realmskeep"
date: 2025-02-10
---

# Realmskeep Brand Identity

A 3-phase GSAP brand identity animation for Realmskeep — a tabletop gaming project with collaborator Buddy Floyd. Assembly → ambient → click-replay. Features an "Eternal Duel" window glow effect. Built for white background with dark logo, using CSS custom properties for theme-aware JS.

## Architecture

The animation sequence:
1. **Assembly** — SVG elements scatter from off-canvas positions and assemble into the Realmskeep logo
2. **Ambient** — subtle breathing animations, beam glow pulses, bird stroke animations
3. **Click-Replay** — user click triggers full reset and replay with `clearProps: "all"` + manual SVG attribute restoration

CSS custom properties (`--beam-opacity`, `--bird-stroke`) control theme-dependent values. JS reads these at runtime with `getComputedStyle` fallbacks. This means the same JS runs on both the white-background showcase and the dark-themed research page.

## Technology Decisions

**GSAP over CSS animations.** The scatter-and-assemble effect requires per-element staggered timelines with spring-like easing. GSAP's timeline API makes this trivial. CSS `@keyframes` would require 20+ separate animation definitions.

**Theme-aware JS via CSS custom properties.** When the same JS runs on pages with different themes (white bg showcase vs dark bg research page), CSS custom properties let each page set its own values. JS reads them with fallbacks. Avoids forking the JS code.

## Lessons Learned

- **GSAP's `rotation` clobbers SVG `transform` attributes.** For elements with built-in SVG transforms like `rotate(-89.9)`, only animate x/y — never rotation. On replay/reset, `clearProps: "all"` doesn't restore the original SVG attribute; must manually `setAttribute("transform", ...)` after clearing.
- **Inline SVG without `width`/`height` collapses to 0x0** inside `display: inline-block`. Use explicit `width: 250px` in CSS, not `max-width`. Set `overflow: visible` on the svg and all ancestor containers for off-canvas scatter animations.
- **`currentColor` inside `<a>` tags inherits the browser's link color** (blue/purple), not your theme color. Use explicit CSS custom properties for dynamically created SVG elements.

## Status

Shipped February 10, 2026. Also being ported to collaborator's repo (`malfloyd9/Realmskeep`). The canonical source is the deployed build, NOT `CODE/realmskeep/src/` (which is outdated).
