---
name: "Claude Usage Dashboard"
category: "Tech (Core)"
status: "PRIORITIZE"
enjoyment: 7
resources: 10
viability: 10
scale: 2
action: "Finish spend tracking — ensure all usage captured. Commit dashboard fixes."
tags: ["analytics", "visualization", "api", "developer-tools"]
stack: ["React 19", "Vite 7", "Tailwind 4", "Recharts", "Framer Motion"]
deploy_url: "https://travisbreaks.org/research/claude-usage/"
git_dir: "claude-usage"
date: 2025-02-18
---

# Claude Usage Dashboard

A usage tracking dashboard + live "Claude Fuel" widget for monitoring Claude Code API consumption. The dashboard shows session history, token usage over time, model distribution, tool patterns, and hourly activity. The widget is a real-time thermometer that shows current rate limit status.

## Architecture

Two modes in one app:
- **Dashboard** (default) — full analytics with filter bar, time range selector, and 8 chart panels
- **Widget** (`?widget` param) — compact thermometer for monitoring usage during active coding sessions

The widget has two sub-modes:
- **Live** (local dev only) — calls `api.anthropic.com/api/oauth/usage` via OAuth token from macOS Keychain
- **Demo** (deployed site) — animated fill → explosion → refuel cycle for the showcase

### Data Pipeline

A Node script (`scripts/process-data.ts`) reads JSONL session log files, aggregates by date/project/model/hour, computes token costs per model, and outputs clean `usage-data.json`. The React app fetches this static JSON file and renders through a `DashboardContext` that handles filtering and metric selection.

### Widget: Matrix Rain + Space Lobster

The widget features a canvas-based matrix rain background (procedural Japanese characters + hex), a space lobster portrait with a green border, and a glass info panel. Color interpolation smoothly transitions from green → orange → red (0% → 50% → 100% usage).

## Technology Decisions

**Claude OAuth usage API.** Undocumented `GET api.anthropic.com/api/oauth/usage` returns exact 5-hour session % and 7-day weekly % with reset timestamps. Auth via Bearer token from macOS Keychain. This is far more accurate than trying to reconstruct usage from JSONL token counts.

**Why JSONL tokens don't match Claude's rate limits.** Local JSONL files only log `input_tokens`, `output_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`. Claude's rate limiter counts additional overhead (system prompts, tool definitions, internal tokens) that aren't in JSONL. Trying to match the API percentage from JSONL data is always 30-50% off.

## Lessons Learned

- **Don't reverse-engineer rate limits from JSONL.** Use the OAuth API directly. It gives you the exact numbers Claude uses internally.
- **Canvas for procedural effects** (matrix rain) doesn't impact layout or React reconciliation. Use a separate `<canvas>` with `blur()` filter for depth.
- **Glass-morphism pattern** — `background: rgba(8, 8, 8, 0.55)` + `backdrop-filter: blur(10px)` + subtle border creates an elegant panel that works on any background.

## Status

Shipped February 18, 2026. Dashboard deployed to research page. Widget runs locally at `localhost:5174/?widget` for real-time rate limit monitoring during Claude Code sessions.
