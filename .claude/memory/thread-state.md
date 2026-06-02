# transmissions — thread state

## Canonical brief

**Status (2026-06-02):** The sovereign home for ALL transmissions. Extracted from the CODE monorepo (was `travisbreaks-blog`) and reconciled with the pre-existing public remote `github.com/travisbreaks/transmissions`. **PUBLIC** (it's a published essay archive). Realm 1 (creative/public).

**What it is:** a curated archive of long-form essays ("transmissions") on AI, consciousness, grief, and creative process. Astro 5 SSG. Dual-licensed: code MIT, written content CC BY-NC-ND 4.0. See `README.md`.
- `src/content/transmissions/` — 62 published transmissions (001 → 1001).
- `src/content/projects/` — project pages.
- `drafts/` — working drafts not yet promoted to published (currently #049 v1/v2/v3 + #051).

**Reconcile (2026-06-02):** CODE/travisbreaks-blog (148 files, ahead with #056-060 + #1001 + projects/) merged with the public remote's dual-license commit (which CODE lacked). Clean fast-forward push to the public remote: nothing lost either way. M2 archives: `transmissions-extraction-2026-06-02/` (both `transmissions-tracked-main.tar.gz` and `transmissions-reconciled-split.tar.gz`, 148 files each, sha256-verified).

**Deploy (in progress):** currently published at `travisbreaks.org/transmissions/` via the OLD path (travisbreaks-site built it in and served via Netlify). Being DECOUPLED: transmissions gets its own Cloudflare Pages deploy (pure static Astro, `base: '/transmissions'` already set). Target URL stays `travisbreaks.org/transmissions/` via CF routing, wired at the travisbreaks.org Netlify->CF DNS migration. Until then, the live site serves its 66 committed transmission files as fallback.

**Known issue:** transmissions #999 + #1001 return 404 on the live site (CI dead-link check flags them) — authored but not building/publishing correctly. Fix when the CF deploy is stood up.

## Execution log

- 2026-06-02: extracted from CODE (travisbreaks-blog) via subtree-split (68 commits). Reconciled with public remote (merged dual-license, brought 31 commits of newer content). gitleaks clean (69 commits). Pushed reconciled history to public remote (fast-forward, 148 files). Cloned to ~/code/transmissions/. Folded transmission-drafts (4 files) into drafts/. CODE decouple (package.json workspace + deploy-yml steps + dir removal) + CF Pages deploy: pending.
