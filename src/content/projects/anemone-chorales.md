---
name: "Anemone Chorales"
category: "Creative"
status: "PRIORITIZE"
enjoyment: 10
resources: 9
viability: 8
scale: 5
action: "Deploy standalone. Explore integration into travisBREAKS music experience."
tags: ["audio", "visualization", "r3f", "webgl", "music"]
stack: ["React 19", "React Three Fiber", "Web Audio API", "Custom GLSL", "Drei"]
deploy_url: ""
git_dir: "anemone-chorales"
phases: ["Quality Sprint", "Adaptive Music Experience"]
date: 2025-02-01
---

# Anemone Chorales — Audio Visualizer

A deep-sea audio visualizer built in React Three Fiber. Real Web Audio API analysis drives a coral-like organism through three biomes — Bioluminescent Reef, The Abyss, and Gravitas Deep. Travis's own music plays through it.

## Architecture

The visualizer uses a coral-textured base mesh with custom GLSL shaders for tip glow effects. Real frequency data (bass/mid/treble bands) from the Web Audio API's `AnalyserNode` drives mesh deformation, color intensity, and particle behavior.

Three biomes define the visual personality:
- **Bioluminescent Reef** — warm cyan/pink palette, high particle density, reactive god rays
- **The Abyss** — deep blue/black, sparse particles, subtle caustics
- **Gravitas Deep** — gold/amber tones, heavy bass response, slow particle drift

A nautical depth system maps playback time to ocean depth: SURFACE → SHALLOWS → OPEN WATER → TWILIGHT ZONE → MIDNIGHT ZONE → THE DEEP → ABYSSAL, with each transition taking roughly 60-90 seconds.

## Technology Decisions

**Shader-based glow, not postprocessing bloom.** Every bloom approach in R3F (monkey-patch `gl.render`, `useFrame` priority 1, `@react-three/postprocessing` with multisampling=0) causes intermittent flicker on desktop Chrome/macOS. Root cause: offscreen render targets fighting R3F's compositor during React reconciliation. The fix: overdrive tip color + fresnel in the fragment shader. Zero render targets, zero flicker.

**Mobile AudioContext lifecycle.** Phone sleep suspends `AudioContext` and pauses `HTMLAudioElement`. Listening for native `pause`/`play` events on the audio element syncs app state correctly. Using `AudioContext.suspend()/resume()` for pause is too heavy — causes stutter on mobile resume.

## Lessons Learned

- **R3F + Bloom = flicker.** Every postprocessing bloom approach causes intermittent flicker. Shader-based fake glow is the answer.
- **Mobile audio is a different world.** Native browser events (`pause`/`play` on the HTMLAudioElement) are the only reliable signal. Don't fight the browser's audio lifecycle.
- **Floating controls panel** must use `pointer-events: auto` on the panel and `pointer-events: none` on the R3F canvas overlay. Otherwise, touch events don't reach the controls on mobile.

## What's Next

Deploy to the research page. Then explore absorbing it into the travisBREAKS music experience as the reactive visual layer for an adaptive music discovery system.
