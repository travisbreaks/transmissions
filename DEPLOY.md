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

```bash
# 1. build (uses the committed base: '/transmissions')
npm install
npm run build

# 2. stage the dist under a transmissions/ folder so the baked-in paths resolve
rm -rf /tmp/transmissions-deploy
mkdir -p /tmp/transmissions-deploy/transmissions
cp -R dist/. /tmp/transmissions-deploy/transmissions/

# 3. deploy (CF token from Keychain, inline — never echo it)
CLOUDFLARE_API_TOKEN=$(security find-generic-password -s CLOUDFLARE_API_TOKEN -w) \
  npx wrangler pages deploy /tmp/transmissions-deploy \
  --project-name=transmissions --branch=main --commit-dirty=true
```

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
