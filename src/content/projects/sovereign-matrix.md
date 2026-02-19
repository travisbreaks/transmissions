---
name: "Sovereign Matrix"
category: "Tech (Core)"
status: "KILL/ARCHIVE"
enjoyment: 8
resources: 10
viability: 10
scale: 4
action: "ABSORBED by OPS dashboard. No further development."
tags: ["productivity", "decision-framework", "scoring"]
stack: ["React 19", "Tailwind 4", "Framer Motion", "localStorage"]
deploy_url: ""
git_dir: "sovereign-matrix"
date: 2025-02-01
---

# Sovereign Matrix — Priority Orchestration

A weighted scoring system for prioritizing all life and code projects. Four dimensions — Enjoyment, Resources, Viability, Scale — each with adjustable weights. Projects are scored, ranked, and assigned to tiers: BUILD NOW, PRIORITIZE, SUSTAIN, WATCH, KILL/ARCHIVE.

## Architecture

A single React component manages 34 projects stored in localStorage. Four slider inputs adjust the dimension weights in real time, triggering instant re-sort via `useMemo`. Projects display as animated cards (Framer Motion springs) with color-coded tier badges, rank indicators, and next-action text.

The scoring formula is a simple weighted linear sum: `score = (E × wE) + (R × wR) + (V × wV) + (S × wS)`. Default weights are all 1.0. Cranking "Enjoyment" to 3.0 surfaces passion projects. Cranking "Scale" surfaces high-impact work.

## Technology Decisions

**localStorage over a database.** The tool is personal — one user, one device. A database adds complexity without value. The seed data is hardcoded in the component as the fallback.

**Why this was superseded by OPS.** Sovereign-matrix has no git activity data, no deploy status, no roadmap progress. It's a scoring tool, not an operational dashboard. OPS absorbs all sovereign-matrix functionality (same scoring, same CRUD) and adds data-driven visualizations. Sovereign-matrix is now reference code.

## Lessons Learned

- **The scoring system actually works.** Adjusting weights reveals blind spots. Cranking "Resources" down highlights projects where you're under-equipped. Cranking "Viability" down reveals passion projects with no business case.
- **Seed data goes stale immediately.** Hardcoded arrays in TSX files become invisible. The fix: move data to standalone markdown files that are version-controlled and human-editable.

## Status

Functionally complete. Absorbed by OPS dashboard (February 2026). No further development. Remains in the monorepo as a reference implementation.
