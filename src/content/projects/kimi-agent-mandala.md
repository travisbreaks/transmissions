---
name: "Kimi Agent Mandala"
category: "Creative"
status: "SUSTAIN"
enjoyment: 8
resources: 10
viability: 10
scale: 3
action: "SHIPPED. Lives on research page. Done unless graduating to main site."
tags: ["scrollytelling", "particles", "r3f", "webgl", "geometry"]
stack: ["React 19", "React Three Fiber", "Drei", "Custom GLSL", "ScrollControls"]
deploy_url: "https://travisbreaks.org/research/kimi-agent-mandala/"
git_dir: "Kimi_Agent_Mandala"
date: 2025-02-07
---

# Sri Yantra Scrollytelling

A scroll-driven particle experience that builds a sacred geometry mandala, then destroys it. 50,000 particles form a Sri Yantra through four phases: build → explosion → convergence → tunnel. Three overlay cards appear at scroll milestones. The third card implodes with a flash effect.

## Architecture

The experience uses Drei's `ScrollControls` + `useScroll` for scroll-driven animation. A custom particle system manages 50K points using `BufferGeometry` with position, color, and size attributes updated per frame in `useFrame`.

The four phases:
1. **Build** — particles assemble from random positions into the Sri Yantra geometry
2. **Explosion** — mandala shatters outward with velocity-based scattering
3. **Convergence** — particles regroup into a dense sphere
4. **Tunnel** — Z-modulo particle recycling creates an infinite tunnel effect

## Technology Decisions

**Why custom scroll, not CSS scroll?** R3F renders on a fixed `<canvas>`. CSS scroll doesn't work with `pointer-events: none` overlays. Drei's `ScrollControls` is the standard, battle-tested approach — it intercepts wheel events and provides a normalized 0-1 scroll progress value.

**Z-modulo particle recycling** for the tunnel phase: particles that move past the camera get teleported back to the far end. `position.z = ((position.z + offset) % tunnelLength) - tunnelLength/2`. Creates infinite depth with finite particles.

**Point size formula**: `size / distance` where distance ≈ 4 (camera Z). Went through iterations: 800 → 150 → 60 → 25 (current, ~6px sand grains at default viewport).

## Lessons Learned

- **R3F scroll** — Custom `window.scrollY` listeners DON'T work with fixed canvas + pointer-events overlays. Use Drei's ScrollControls.
- **NormalBlending over AdditiveBlending** — 50K particles with additive blending blow out to white. Normal blending composites correctly.
- **Unused build deps cause CI failure.** Kimi had `tailwindcss` in PostCSS config but never used Tailwind classes. `tailwindcss-animate` plugin was missing from package.json. Removing Tailwind from PostCSS dropped CSS from 10.5KB to 5.3KB.

## Status

Shipped February 7, 2026. Deployed as a subdirectory of travisBREAKS via the CI research deploy pattern. First project to prove the pattern works.
