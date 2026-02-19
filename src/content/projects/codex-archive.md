---
name: "Codex Archive (figma-contribution)"
category: "Creative"
status: "KILL/ARCHIVE"
enjoyment: 6
resources: 10
viability: 10
scale: 3
action: "RETIRED. Replaced by Transmissions (travisbreaks-blog). Remove from CI."
tags: ["archive", "blog", "legacy"]
stack: ["React 19", "TypeScript", "Tailwind", "Framer Motion", "Vitest"]
deploy_url: "https://codex-archive.netlify.app"
git_dir: "figma-contribution"
date: 2025-06-01
---

# Codex Archive

The original philosophical blog — 48 entries capturing the backbone of Travis's creative philosophy. Built as a React SPA with Tailwind and Framer Motion. Being retired in favor of the Astro-based travisbreaks-blog (Transmissions), which is more performant, SEO-friendly, and maintainable.

## Lessons Learned

- **CI workspace name mismatch** caused deployment failures. The directory was renamed from `Figma_contribution` to `figma-contribution` but CI still referenced the old name. Always verify workspace names match the `package.json` workspaces array.
- **React SPAs are wrong for content sites.** The blog is a collection of documents — it should be static HTML, not a client-rendered app. Astro Content Collections are the right tool for this job.

## Status

Deployed at codex-archive.netlify.app. Being retired once travisbreaks-blog goes live. Will be removed from workspaces and CI.
