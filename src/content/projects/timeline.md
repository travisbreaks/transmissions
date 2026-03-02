---
name: "Timeline"
category: "Creative"
status: "WATCH"
enjoyment: 9
resources: 8
viability: 6
scale: 3
action: "17 eras, 5 acts, camera zoom, ActNav, NavButtons, epigraphs all wired. Needs camera value tuning. Highly personal — private repo. Not deploying publicly."
tags: ["personal", "narrative", "visualization", "three.js", "react"]
stack: ["React 19", "Vite 7", "Three.js", "Framer Motion"]
deploy_url: ""
git_dir: "timeline"
phases: ["Portfolio Backlog"]
date: 2026-01-20
---

# Timeline — Personal Narrative Visualization

An interactive visualization of Travis's life timeline — 17 eras, 5 acts, with camera zoom into individual periods, act navigation, animated epigraphs, and a canon-sourced event structure.

## Architecture

React + Three.js camera system that moves through a 3D timeline. Each era is a node with metadata (years, title, tone, events). Camera lerps between nodes on navigation. ActNav component groups eras into 5 acts. NavButtons for sequential navigation. Epigraphs animate in on era focus.

## Status

Locally built at port 5179. All major features wired. Needs camera value tuning — transition distances and focal points need calibration for the right pacing. Committed to private `timeline` GitHub repo.

Not deploying publicly — content is highly personal and not ready for external audiences.

## Technology Decisions

**Why not a simple scroll?** The camera-in-3D-space approach gives cinematic pacing and spatial memory — each era feels like a place you visit. Linear scroll doesn't convey the weight of different periods.

**Canon-sourced.** All event data comes from `travis-canon/timeline.md` — the authoritative biographical record. Timeline is the visual companion to the text canon.

## What's Next

Camera value tuning. Possibly: audio reactive elements that shift the visual tone per act.
