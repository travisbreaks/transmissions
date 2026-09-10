#!/usr/bin/env bash
# release.sh: build the transmissions site from a CLEAN worktree at a commit,
# gate it with the read-along checker, and deploy it to Cloudflare Pages.
#
#   scripts/release.sh            # releases HEAD of the current checkout
#   scripts/release.sh <commit>   # releases that commit
#
# Stops on the first failed step (set -e): a failing checker means no upload.
# Never builds from the working tree, so untracked files under public/ and
# uncommitted essay edits cannot ride a release (DEPLOY.md, 2026-09-07).
# The apex (travisbreaks.org) rebuilds separately from GitHub main via the CODE
# deploy-netlify.yml workflow; push first, then run that workflow.
set -euo pipefail

repo=$(git rev-parse --show-toplevel)
commit=$(git -C "$repo" rev-parse "${1:-HEAD}")
wt=$(mktemp -d /tmp/tx-release.XXXXXX)
stage=$(mktemp -d /tmp/transmissions-deploy.XXXXXX)

echo "release: commit $commit"
echo "worktree: $wt"
git -C "$repo" worktree add --detach "$wt" "$commit" >/dev/null
# cleanup of the script's OWN temp worktree and staging dir (both mktemp'd above)
trap 'git -C "$repo" worktree remove --force "$wt" >/dev/null 2>&1 || true; rm -rf "$stage"' EXIT

cd "$wt"
[ "$(git status --short | wc -l | tr -d ' ')" = "0" ] || { echo "worktree is not clean"; exit 1; }
npm ci --no-audit --no-fund >/dev/null
npm run build >/dev/null
node scripts/readalong-check.mjs          # the release gate: exits 1 on any failure

mkdir "$stage/transmissions"
cp -R dist/. "$stage/transmissions/"
echo "staged: $stage ($(ls "$stage/transmissions" | grep -c 'timing.json$') sidecars)"

CLOUDFLARE_API_TOKEN=$(security find-generic-password -s CLOUDFLARE_API_TOKEN -w) \
  npx wrangler pages deploy "$stage" --project-name=transmissions --branch=main 2>&1 | grep -v -i token

cat <<EOF

verify (both hosts; the apex needs: git push, then
  gh workflow run deploy-netlify.yml --repo travisbreaks/CODE --ref main):
  for h in https://transmissions.pages.dev https://travisbreaks.org; do
    curl -s -o /dev/null -w "\$h %{http_code}\n" "\$h/transmissions/"
  done
EOF
