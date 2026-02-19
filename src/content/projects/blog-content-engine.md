---
name: "Blog / Content Engine"
category: "Creative"
status: "PRIORITIZE"
enjoyment: 9
resources: 9
viability: 9
scale: 7
action: "51 transmissions built. Content curation in progress. Deploy to travisbreaks.org/transmissions/."
tags: ["blog", "ssg", "content", "seo", "astro"]
stack: ["Astro 5", "Content Collections", "Markdown", "CSS Custom Properties"]
deploy_url: ""
git_dir: "travisbreaks-blog"
date: 2026-02-18
---

# Blog / Content Engine — Transmissions

An Astro 5 static-site-generated blog that replaces the old "codex" system (renamed because OpenAI took the name). 51 markdown transmissions via Astro Content Collections. PROTOCOL aesthetic with grain, scan lines, glass cards, corner accents, card entrance animations, hover glow, and status LEDs.

## Architecture

Astro 5 with Content Collections. Each transmission is a markdown file with structured frontmatter (title, date, confidence score, tags, key quote, source platform). Client-side search, multi-tag filtering, 4-way sorting. Builds to static HTML — no client JS except the interactive filter/search components.

Content direction: Philosophy + Technology only. No songwriting or unfinished creative projects. All transmissions must trace back to real ChatGPT conversations that can be expanded.

## Technology Decisions

**Astro over Next.js for the blog.** Static-first, zero client JS by default, native Content Collections with type-safe frontmatter. Next.js would add unnecessary hydration overhead for what is fundamentally a document site.

**Confidence scores on blog posts.** Each transmission has a 0-100 confidence rating reflecting how settled the ideas are. This is honest signal — readers see which ideas are well-formed vs. exploratory.

## Data Pipeline

A separate editorial dashboard (React 19 at `~/code/ChatGPT-data-dump-through-FEB-2026/dashboard/`) processes 1,180 ChatGPT conversations / 19,537 messages through a Keep/Skip/Maybe decision workflow. 48 out of 52 weeks have blog-worthy content, making a weekly publishing cadence sustainable.

## What's Next

Deploy to `travisbreaks.org/transmissions/` via the subdirectory pattern. Add to CI workflow. Begin weekly publishing cadence.
