---
name: "OPS Dashboard"
category: "Tech (Core)"
status: "BUILD NOW"
enjoyment: 9
resources: 10
viability: 10
scale: 5
action: "Freshly built. Verify, polish, deploy. Replaces sovereign-matrix."
tags: ["productivity", "dashboard", "visualization", "developer-tools"]
stack: ["React 19", "Vite 7", "Tailwind 4", "Framer Motion", "Pure CSS/SVG Charts"]
deploy_url: ""
git_dir: "ops"
phases: ["Current Sprint", "Quality Sprint", "Foundation"]
date: 2026-02-19
---

# OPS — Unified Productivity Dashboard

A single-pane-of-glass productivity command center for the entire CODE monorepo. Shows all 34 projects (code AND life), with git activity sparklines, deploy status indicators, roadmap progress tracking, and full project management (add/edit/delete/score). Replaces sovereign-matrix.

## Architecture

Two data sources merge at runtime:
1. **Project metadata** — stored in localStorage, seeded from markdown frontmatter files (this file and its siblings). Editable through the dashboard UI.
2. **Git data** — generated at build time by `scripts/build-data.ts`, which runs `git log` commands and parses ROADMAP.md checkboxes. Output: `public/data/git-data.json`.

All visualizations are pure CSS/SVG — no chart library. Sparklines are inline SVGs (30 bars, 2px wide). The heatmap is a CSS grid. Progress bars are CSS. This keeps the bundle at 119KB gzipped and renders instantly.

### Staleness Detection

Each project has a `lastUpdated` timestamp. The build script provides `lastCommitDate` from git. When git activity is >24h newer than the last manual edit, a pulsing amber indicator appears on the edit button — prompting you to update the narrative to match code reality.

## Technology Decisions

**Pure CSS/SVG over Recharts.** The claude-usage dashboard uses Recharts (300KB) for complex charts. OPS doesn't need that complexity — sparklines, heatmaps, and progress bars are all achievable with div heights and CSS grid. Faster render, smaller bundle, more control over the brutalist aesthetic.

**Markdown frontmatter as source of truth.** Project data originates in markdown files with YAML frontmatter. The ops build script reads these files, extracts metadata, and generates `projects.json`. This keeps project data version-controlled, diffable, and impossible to lose in a localStorage wipe.

**State export button.** One click copies all project state as JSON to clipboard. Paste it back into the seed data file for a portable backup committed to the repo.

## Lessons Learned

- **localStorage is device-specific.** You need an export/import mechanism. The clipboard approach is simple and works everywhere.
- **VSCode deep links** (`vscode://file/path/to/project/`) give one-click editor access from the dashboard. High value, zero complexity.
- **Build-time data generation** (git log + markdown parsing) is the right pattern for data that changes slowly. No API server needed.

## What's Next

Polish the UI. Deploy to research page. Establish as the daily "coffee and review" tool.
