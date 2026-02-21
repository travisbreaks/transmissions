---
name: "travisBREAKS (Portfolio)"
category: "Creative"
status: "BUILD NOW"
enjoyment: 10
resources: 10
viability: 10
scale: 8
action: "v1 LIVE at travisbreaks.org. v2 (Rabbit Hole) actively rebuilding in travisbreaks-site-v2/ — Next.js 15 full rebuild."
tags: ["portfolio", "web", "creative", "music", "three.js"]
stack: ["Vanilla JS", "Three.js", "Web Audio API", "GSAP", "CSS Custom Properties"]
deploy_url: "https://travisbreaks.org"
git_dir: "travisbreaks-site"
date: 2025-01-01
---

# travisBREAKS — The Living Portfolio

The central nervous system. travisBREAKS is a dark brutalist portfolio that doubles as a creative research lab — a single-page experience built entirely in vanilla JavaScript with zero frameworks. Every section tells a story. Every interaction is intentional.

## Architecture

No React. No build step (until Vite was added for the research subdirectory pattern). The main site is hand-rolled HTML/CSS/JS with a modular section system. Each section (SIGNAL, CODEX, RESEARCH, BACKDOOR) loads independently and communicates through a lightweight event bus.

Three.js powers the particle backgrounds and visual effects. Web Audio API drives reactive elements in the music section. GSAP handles scroll-triggered animations. The entire aesthetic is defined through CSS custom properties — `--void`, `--gold`, `--pink`, `--cyan` — making theme changes trivial.

## The Research Page

The `/research/` section is a horizontal-scroll card gallery that acts as a testing ground. Successful experiments (Kimi Agent Mandala, Realmskeep, Claude Usage) live here as subdirectory deploys — each built by CI, copied into `travisbreaks-site/research/`, and served as part of the same Netlify site. This avoids managing separate Netlify sites per experiment.

## Technology Decisions

**Why vanilla JS?** Performance and control. No virtual DOM overhead, no hydration, no bundle bloat. The portfolio loads in under 1 second on 3G. Every byte is intentional.

**Why Three.js for backgrounds?** Particle systems create depth without competing with content. The `ShaderMaterial` approach gives GPU-accelerated visuals at near-zero CPU cost. Point size math: Camera Z=4, FOV=60 → frustum ±2.3 units. Current point size: 25 (~6px sand grains).

**Why CSS Custom Properties over Tailwind?** The site predates the monorepo. Custom properties provide theme-aware styling that works across vanilla JS, Three.js shader uniforms, and GSAP animations without a build step.

## Lessons Learned

- **Vite HMR does NOT recompile ShaderMaterial GPU programs** when shader strings change. Must kill dev server, clear `node_modules/.vite` cache, restart, and hard refresh. This burned hours.
- **NormalBlending solved white particle blowout.** 50K particles with AdditiveBlending blow out to white in dense areas. Switching to NormalBlending gave proper compositing.
- **The subdirectory deploy pattern is elegant.** One Netlify site serves the main portfolio plus all research experiments. CI builds each experiment, copies `dist/` to the right path. No extra config.

## What's Next

Evolving from static portfolio into an **adaptive discovery engine** — genre-selective music paths, persona-based blog routing, responsive artifacts, and sight-behavior-driven content. The research section stays as a lab; successful experiments graduate to the main site.
