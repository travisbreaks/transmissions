---
name: "Overture"
category: "Tech (Core)"
status: "SUSTAIN"
enjoyment: 8
resources: 9
viability: 9
scale: 6
action: "v2 live. Monitor and polish. Mobile: typewriter + eyebrow animation disabled to prevent layout jumps. Port 5181."
tags: ["dashboard", "ai", "stats", "r2", "visualization", "public-facing"]
stack: ["React 19", "Vite 7", "Tailwind 4", "Framer Motion"]
deploy_url: "https://travisbreaks.org/overture/"
git_dir: "overture"
phases: ["Current Sprint", "Portfolio Foundation", "Asset Hosting & Domains"]
date: 2026-01-10
---

# Overture — Public AI Stats Dashboard

A public-facing dashboard showing Travis's Claude AI usage stats — tokens, cost, model distribution, project activity — pulled live from R2. The "transparency layer" for the AI-assisted work on travisBREAKS.

## Architecture

React + Vite. Data fetched from `assets.travisbreaks.com/overture/stats.json` (R2 bucket, updated by scripts). Count-up animation on load. Typing effect for headline stats. Responsive grid layout.

Deployed at `travisbreaks.org/overture/` — same Netlify site, subdirectory pattern.

## Status

v2 shipped (2026-02-27): AI stats section, live R2 data, count-up animation, typing effect, v2 version bump. Mobile fixes shipped (2026-03-01): typewriter + eyebrow line animation killed on mobile to prevent layout jumps.

Port 5181 for local dev (not 5180 — that's binary-protocol).

## Technology Decisions

**R2 for data, not API.** Stats are computed offline and uploaded as a JSON blob to R2. No API server needed — Cloudflare CDN serves the data fast and free, and there's no auth surface to worry about.

**Public by design.** This is intentionally visible — showing AI usage in the open is part of the travisBREAKS brand. Nothing here is sensitive.

## What's Next

Sustain mode. Update stats JSON periodically. Consider automated R2 upload via cron + script.
