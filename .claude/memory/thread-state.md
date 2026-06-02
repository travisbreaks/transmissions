# transmissions — thread state

## Canonical brief

**Status (2026-06-02):** The sovereign home for ALL transmissions. Extracted from the CODE monorepo (was `travisbreaks-blog`) and reconciled with the pre-existing public remote `github.com/travisbreaks/transmissions`. **PUBLIC** (it's a published essay archive). Realm 1 (creative/public).

**What it is:** a curated archive of long-form essays ("transmissions") on AI, consciousness, grief, and creative process. Astro 5 SSG. Dual-licensed: code MIT, written content CC BY-NC-ND 4.0. See `README.md`.
- `src/content/transmissions/` — 62 published transmissions (001 → 1001).
- `src/content/projects/` — project pages.
- `drafts/` — working drafts not yet promoted to published (currently #049 v1/v2/v3 + #051).

**Reconcile (2026-06-02):** CODE/travisbreaks-blog (148 files, ahead with #056-060 + #1001 + projects/) merged with the public remote's dual-license commit (which CODE lacked). Clean fast-forward push to the public remote: nothing lost either way. M2 archives: `transmissions-extraction-2026-06-02/` (both `transmissions-tracked-main.tar.gz` and `transmissions-reconciled-split.tar.gz`, 148 files each, sha256-verified).

**Deploy (LIVE on CF Pages 2026-06-02):** transmissions now SELF-PUBLISHES to Cloudflare Pages. Project `transmissions` (direct-upload, like the other travisbreaks Pages projects) at **`transmissions.pages.dev`**. Because the build bakes `base: '/transmissions'` into all links/assets, the dist is deployed nested under a `transmissions/` folder, so live URLs are `transmissions.pages.dev/transmissions/<slug>/`. See `DEPLOY.md` for the repeatable deploy steps. Verified end-to-end: 12/12 smoke 200s, CSS + inter-page links + rss + sitemap all resolve.

**404 BUG FIXED:** #056-060, #999 (slug renamed terminal-test→tales-from-the-terminal), #1001 all returned 404 on the OLD travisbreaks.org/transmissions/ (stale committed site fallback in travisbreaks-site/transmissions/, missing post-snapshot content). All now 200 on the CF deploy. Root cause was the stale fallback + decoupled rebuild pipeline, NOT a build bug (source builds all 64 pages clean).

**Final home (pending):** target is `travisbreaks.org/transmissions/`. Blocked on the travisbreaks.org DNS migration Netlify→CF (apex is on Netlify/NS1 as of 2026-06-02; boss-gated asymmetric op). The `/transmissions/` base already matches, so no rebuild when the apex routes to this Pages project. A `transmissions.travisbreaks.org` subdomain CNAME is a lower-risk interim option.

## Execution log

- 2026-06-02: extracted from CODE (travisbreaks-blog) via subtree-split (68 commits). Reconciled with public remote (merged dual-license, brought 31 commits of newer content). gitleaks clean (69 commits). Pushed reconciled history to public remote (fast-forward, 148 files). Cloned to ~/code/transmissions/. Folded transmission-drafts (4 files) into drafts/. CODE decouple done (CODE #297 + dangling-ref cleanup #299; loss-audit confirmed nothing lost).
- 2026-06-02 (later): stood up CF Pages deploy. Project `transmissions` created, dist (nested under transmissions/) deployed to transmissions.pages.dev. 404 bug fixed (056-060/999/1001 now 200). Added DEPLOY.md + expanded .gitignore (dist/node_modules/.DS_Store/.wrangler were missing). Apex route to travisbreaks.org/transmissions/ deferred to the DNS migration.
