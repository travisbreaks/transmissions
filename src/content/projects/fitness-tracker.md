---
name: "Sovereign Fitness PWA"
category: "Tech (Core)"
status: "WATCH"
enjoyment: 8
resources: 8
viability: 9
scale: 6
action: "Deprioritized. Push MVP when bandwidth opens."
tags: ["pwa", "fitness", "voice", "pocketbase"]
stack: ["React 19", "PocketBase", "React Query", "PWA", "Voice API"]
deploy_url: ""
git_dir: "fitness-tracker"
date: 2025-06-01
---

# Sovereign Fitness PWA

A personal fitness tracker with voice input pipeline. PocketBase backend for local data persistence. React Query for data fetching. PWA for offline capability.

## Technology Decisions

**PocketBase over Firebase/Supabase.** Self-hosted, zero vendor lock-in, SQLite under the hood. Runs locally during development. The tradeoff: PocketBase must be running locally for the app to function.

## Status

Deprioritized behind portfolio work. Voice pipeline not fully wired. MVP push when bandwidth opens.
