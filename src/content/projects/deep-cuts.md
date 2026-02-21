---
name: "deep-cuts"
category: "Tech (Core)"
status: "PRIORITIZE"
enjoyment: 9
resources: 6
viability: 8
scale: 9
action: "Scaffolded. YouTube/podcast → transcribe → LLM analyze → semantic search + infographics. Worker + Next.js 15 frontend (port 3002). Postgres+pgvector. NOT committed yet."
tags: ["pipeline", "ai", "media", "transcription", "semantic-search", "infographics"]
stack: ["TypeScript", "Next.js 15", "Postgres", "pgvector", "Claude Sonnet", "Whisper", "SQLite"]
deploy_url: ""
git_dir: "deep-cuts"
date: 2026-02-20
---

# deep-cuts — Media Intelligence Pipeline

Ingests YouTube shows and podcasts, transcribes them, runs LLM analysis to produce structured knowledge (TLDR, keywords, categories, thought threads), stores everything in a searchable database with semantic search, and generates data-driven infographic cards per episode.

## Architecture

- **Worker** (TypeScript, SQLite job queue) — ingestion, transcription, LLM passes
- **Frontend** (Next.js 15, port 3002) — search UI, episode browser, infographic viewer
- **Postgres + pgvector** (Docker, port 5433) — embeddings + semantic search
- **Two LLM passes**: Extract (TLDR, keywords, entities) + Connect (cross-episode threads)

## Status

Scaffolded locally in `deep-cuts/`. Not yet committed to git. Worker, frontend, and docker-compose all in place. Ready to wire up real ingestion.
