# Deploying transmissions

Transmissions is a static Astro SSG site (no adapter). It is configured with
`base: '/transmissions'` in `astro.config.mjs` because it is meant to serve at
the `/transmissions/` path of `travisbreaks.org` (historically built into
travisbreaks-site; now self-published on Cloudflare Pages).

## Cloudflare Pages (current home)

CF Pages project: **`transmissions`** (direct-upload, not git-connected, matching
the other travisbreaks Pages projects). Lives at `transmissions.pages.dev`.

Because the build bakes `/transmissions/` into every link + asset path, the dist
must be served UNDER a `/transmissions/` path. So we deploy the dist nested inside
a `transmissions/` folder:

**Build from a clean worktree at the commit you are releasing, never from the
working tree.** A working-tree build ships everything under `public/`, tracked
or not: on 2026-09-06 that put an untracked experimental timing sidecar, the
church workshop HTML, demo files, and 24 MB of mp3s (which live on R2) on the
live site, and it would have shipped edited essays against stale narration.
The read-along checker is the release gate: a sidecar that does not map to its
page, or a declared hash/slug that mismatches, fails the release.

```bash
# 1. clean worktree at the release commit (no untracked files can leak in)
git worktree add --detach /tmp/tx-release HEAD
cd /tmp/tx-release && npm ci && npm run build

# 2. release gate: every sidecar under public/ must map to its built page
node scripts/readalong-check.mjs

# 3. stage the dist under a transmissions/ folder so the baked-in paths resolve.
#    ONE captured path for create, copy, and deploy (a glob like
#    /tmp/transmissions-deploy-*/ matches old staging dirs too and can merge
#    stale files into the release; Riker reproduced that, 2026-09-07).
tx_stage=$(mktemp -d /tmp/transmissions-deploy.XXXXXX)
mkdir "$tx_stage/transmissions"
cp -R dist/. "$tx_stage/transmissions/"

# 4. deploy (CF token from Keychain, inline; never echo it)
CLOUDFLARE_API_TOKEN=$(security find-generic-password -s CLOUDFLARE_API_TOKEN -w) \
  npx wrangler pages deploy "$tx_stage" \
  --project-name=transmissions --branch=main

# 5. afterwards: git worktree remove /tmp/tx-release (ask first; it deletes the dir)
```

The same sequence lives in `scripts/release.sh`, which stops on the first
failed step (a failed checker prevents the upload) and prints the two-host
verification commands at the end. Prefer the script over typing the recipe.

Post-deploy, check BOTH hosts (Pages and travisbreaks.org, which rebuilds from
GitHub main via the CODE `deploy-netlify.yml` workflow and needs a push plus a
workflow run): page status, sidecar word count, and the served ReadAlong
script. Removed files can linger on the Pages alias from edge cache
(`s-maxage=604800`); the deployment URL shows the truth.

Live URLs after deploy: `https://transmissions.pages.dev/transmissions/` and each
transmission at `https://transmissions.pages.dev/transmissions/<slug>/`.

## Final home (pending the travisbreaks.org DNS migration)

The target is `travisbreaks.org/transmissions/`. That requires moving the
travisbreaks.org zone from Netlify to Cloudflare (the apex is on Netlify/NS1 as of
2026-06-02), which is a separate, boss-gated, asymmetric-reverse op. Once that
migration happens, route `travisbreaks.org/transmissions/*` to this Pages project
(the `/transmissions/` base path already matches, so no rebuild needed). A
`transmissions.travisbreaks.org` subdomain CNAME is a lower-risk interim option.

## The old pipeline (removed)

travisbreaks-site used to build this repo and `cp -r dist` into
`travisbreaks-site/transmissions/`. That coupling was removed on 2026-06-02
(CODE monorepo dissolution). The 66 committed files still in
`travisbreaks-site/transmissions/` are a STALE fallback (missing #056-060, #1001,
and the #999 slug rename) — they go away when the apex serves from CF.
