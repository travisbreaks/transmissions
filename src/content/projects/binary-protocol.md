---
name: "Binary Protocol"
category: "Tech (Core)"
status: "BUILD NOW"
enjoyment: 9
resources: 8
viability: 7
scale: 4
action: "Phase 3 complete locally (SuperCollider clock, WS server, OSC bridge). Phase 2: React frontend HUD with WS hook + Zustand store. Phase 3 blocked: Buffer.read audio sample wiring in SuperCollider."
tags: ["audio", "supercollider", "websocket", "osc", "real-time", "visualization"]
stack: ["SuperCollider", "Python", "WebSocket", "OSC", "React 19", "Zustand"]
deploy_url: ""
git_dir: "binary-protocol"
phases: ["Current Sprint"]
date: 2026-01-15
---

# Binary Protocol — Rhythmic Clock System

A real-time polyrhythmic clock engine built in SuperCollider, bridged to a React HUD via WebSocket and OSC. Provides a visual and sonic representation of complex rhythmic structures — quintillo, clave, cascara, and custom patterns.

## Architecture

Three layers:
1. **SuperCollider clock** (`clock.py` + SC scripts) — rhythmic engine, BPM control, pattern presets (quintillo, cascara, 3:4, 5:8). Outputs OSC messages on beat events.
2. **Python WS bridge** (`clock.py` port 8765) — receives OSC from SuperCollider, fans out to WebSocket clients. Also exposes REST control endpoints.
3. **React HUD** (port 5180, pending) — WS hook receives beat events, Zustand store tracks rhythm state, visual overlay animates on beat.

## Status

Phase 3 (the full Python/SC engine) is complete and running locally. Ports: frontend 5180, WS 8765, SC OSC 57120.

Run: `cd binary-protocol/python && ../.venv/bin/python3.12 -u clock.py --bpm 86 --preset quintillo`

Phase 2 (React HUD) not started. Phase 3b (audio sample wiring via `Buffer.read` in SuperCollider) blocked — deferred.

## Technology Decisions

**SuperCollider over Tone.js.** SC is the right tool for rhythmic precision — sample-accurate scheduling, built-in OSC, and a decades-deep library of pattern primitives. Browser audio is convenient but not precise enough for polyrhythm work.

**Python bridge (not SC HTTP).** SC's built-in HTTP support is minimal. Python gives clean WebSocket fanout, REST control endpoints, and easy JSON serialization of beat events.

## What's Next

React HUD: WS hook, Zustand beat store, animated beat indicators per subdivision. Then audio sample wiring once SuperCollider Buffer.read issues are resolved.
