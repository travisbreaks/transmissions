---
name: "travisBREAKS v2 (Rabbit Hole)"
category: "Creative"
status: "WATCH"
enjoyment: 10
resources: 3
viability: 10
scale: 9
action: "PARKED. Next.js 15 rebuild waiting on v1 maturity. Keep building v1 pages/personas, then transition everything. The bigger v1 gets, the bigger this project becomes."
tags: ["portfolio", "web", "next.js", "gsap", "lenis", "zustand"]
stack: ["Next.js 15", "GSAP", "Lenis", "Zustand", "Tailwind v4"]
deploy_url: ""
git_dir: "travisbreaks-site-v2"
phases: ["Portfolio Sites", "Canon + Voice"]
date: 2026-02-19
---

# travisBREAKS v2 — Rabbit Hole Rebuild

A ground-up reimagination of the portfolio in Next.js 15. Codename: **Rabbit Hole**.

The v1 site (vanilla JS, Three.js) proved the aesthetic. v2 takes it further — deeper scroll choreography, cinematic transitions, and a fully normalized content model that powers 165 items across 61 routes.

## Architecture

- **Next.js 15** App Router with RSC for static-heavy pages
- **GSAP + Lenis** for ultra-smooth scroll and timeline-driven reveals
- **Zustand** for global state (genre selection, scroll position, active section)
- **Tailwind v4** with CSS variable design tokens inherited from v1

## 5-Phase Build Plan

1. Foundation & routing (done)
2. Content normalization — 165 items across music, research, transmissions (done)
3. Motion system — GSAP ScrollTrigger + Lenis integration
4. Adaptive discovery engine — genre paths, persona routing
5. Performance & deploy — static export, Netlify, CI

## Status

Active development. Not yet committed to git — local scaffold in `travisbreaks-site-v2/`. Will commit as first major milestone ships.
