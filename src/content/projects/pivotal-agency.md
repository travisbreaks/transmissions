---
name: "Pivotal Agency (Cole Jones)"
category: "Client Work"
status: "BUILD NOW"
enjoyment: 7
resources: 8
viability: 10
scale: 8
action: "SOP deep-dive FIRST. Review all operational workflows (booking, settlement, commissions, venue routing) before proposing tool delivery. Extraction worker built, needs deploy."
tags: ["client", "business-analysis", "automation", "pdf", "agents"]
stack: ["React 19", "Vite 7", "Recharts", "Python", "Cloudflare Workers", "Claude API", "Google Sheets"]
deploy_url: ""
git_dir: "pivotal-brief"
phases: ["Pivotal Agency"]
date: 2026-02-25
---

# Pivotal Agency — Business Analysis + Tool Delivery

Paid engagement for Pivotal Agency (comedy booking). Deep financial analysis, business proposal, and tool delivery pipeline for Cole Jones.

## Components

1. **Business Analysis** (`pivotal-business-analysis/`) — KEY_METRICS.md ground truth, revenue/expense/agent breakdown, settlement extraction, legal exposure analysis. LOCAL ONLY.
2. **Brief Deck** (`pivotal-brief/`) — React 19 interactive deck with 12 slides, Recharts visualizations. Deployed to share page.
3. **Extraction Worker** (`pivotal-extraction-worker/`) — Cloudflare Worker for PDF booking offer extraction via Claude API. Built, not yet deployed.
4. **Coverage Dashboard** — Google Sheets KPI tracking with Apps Script triggers. Scripts committed.

## Priority

This is paid work. TOP PRIORITY in the roadmap. Next step: SOP deep-dive to understand all operational workflows before proposing tool delivery.
