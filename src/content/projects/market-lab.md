---
name: "Market Lab"
category: "Tech"
status: "WATCH"
enjoyment: 7
resources: 5
viability: 7
scale: 7
action: "Scaffolded. Frontend (port 5178) + FastAPI backend (port 8001). Not committed. Needs clear scope definition before investing more."
tags: ["finance", "data", "api", "python", "fastapi", "react"]
stack: ["React 19", "Vite 7", "FastAPI", "Python", "SQLite"]
deploy_url: ""
git_dir: "market-lab"
phases: ["Discovery Engine"]
date: 2026-02-10
---

# Market Lab — Market Research & Analysis Tool

A local-first market research dashboard with a Python FastAPI backend and React frontend. Ingests market data, runs analysis passes, and surfaces structured insights.

## Architecture

- **Frontend** (React + Vite, port 5178) — UI for data browsing, analysis results, chart views
- **Backend** (FastAPI, port 8001) — REST API, data ingestion, LLM analysis passes, SQLite persistence
- **market-mcp** — MCP server wrapper that proxies to the FastAPI backend, giving Claude direct access to market data tools

## Status

Scaffolded locally. Not committed to git. Needs clear scope definition — what specific market data? What analysis? What decisions does it support? Currently a scaffold looking for a use case.

MCP server (`market-lab/market-mcp/server.py`) is registered in `~/.claude/settings.json` and functional.

## What's Next

Define scope clearly. If it's for personal DCA/investment tracking, evaluate against personal-finance project. If it's for business market research (e.g., Pivotal industry context), prioritize accordingly. Avoid building two data tools that overlap.
