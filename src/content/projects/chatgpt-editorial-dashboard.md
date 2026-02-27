---
name: "ChatGPT Editorial Dashboard"
category: "Tech (Core)"
status: "WATCH"
enjoyment: 6
resources: 4
viability: 7
scale: 2
action: "Wire thread picker, prune 22 no-source transmissions, deploy to research site."
tags: ["analytics", "editorial", "visualization", "developer-tools"]
stack: ["React 19", "Vite 7", "Tailwind 4", "Recharts", "TanStack Virtual"]
deploy_url: ""
git_dir: ""
phases: ["Quality Sprint"]
date: 2026-02-22
---

# ChatGPT Editorial Dashboard

An editorial pipeline tool for processing and reviewing the full ChatGPT conversation data dump (through Feb 2026). Surfaces 219 conversation slugs with model inference, temporal metadata, and publication status for triaging which threads to publish as blog transmissions.

## Architecture

React 19 + Vite SPA running locally against a pre-processed JSON data file built by `scripts/build-dashboard-data.mjs`. The script reads the raw ChatGPT export and outputs a structured dataset with model column, date inference, and slug metadata.

TanStack Virtual handles the large conversation list without performance degradation. Recharts for any aggregate views.

## Status

Local only. Built February 22, 2026. Not deployed — contains personal conversation history. Port 5175.
