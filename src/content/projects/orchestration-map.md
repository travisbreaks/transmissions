---
name: "Orchestration Map"
category: "Tech (Core)"
status: "PRIORITIZE"
enjoyment: 8
resources: 9
viability: 9
scale: 5
action: "Built locally at port 5177. Deploy to travisbreaks.org/research/orchestration-map/ via CI."
tags: ["visualization", "systems", "ai", "agents", "mcp", "architecture"]
stack: ["React 19", "Vite 7", "D3.js", "Framer Motion"]
deploy_url: ""
git_dir: "orchestration-map"
phases: ["Current Sprint", "Discovery Engine", "Foundation"]
date: 2026-02-01
---

# Orchestration Map — Agent Architecture Visualizer

An interactive map of the full multi-agent orchestration system — Claude Code (local + EC2), Egger (Docker), MCP servers, and how they communicate. Visualizes the live system topology as a navigable graph.

## Architecture

D3.js force-directed graph with React wrapper. Nodes: agents, MCP servers, data sources, external services. Edges: communication channels (stdio, WebSocket, SSH, HTTP). Node details panel on click. Live status indicators where possible.

## Status

Built locally at port 5177. Ready to deploy. Target: `travisbreaks.org/research/orchestration-map/` via the research subdirectory CI pattern.

## Technology Decisions

**D3 force-directed over fixed layout.** The system topology changes as new MCP servers are added. D3's force simulation keeps the graph readable as complexity grows — no manual layout needed.

**Research page pattern.** Following the same CI deploy pattern as Kimi Agent Mandala and other research experiments — build in CI, copy dist/ to travisbreaks-site/research/, serve as part of the same Netlify site.

## What's Next

Deploy via CI. Add live status polling for running processes. Consider making the topology data-driven from a JSON config that matches the actual MCP settings.json.
