---
name: "Domain + Email Infrastructure"
category: "Ops"
status: "SUSTAIN"
enjoyment: 5
resources: 9
viability: 10
scale: 3
action: "travisfixes.com fully operational. Pending Travis manual actions: travisbreaks.com DKIM, horny-toad.com NS, travisbreaks.org DNS migration. Then travisbonnet.com transfer from Google/Squarespace."
tags: ["infrastructure", "email", "dns", "cloudflare", "domains"]
stack: ["Cloudflare", "Resend", "Gmail", "Netlify", "R2"]
deploy_url: ""
git_dir: ""
phases: ["Domain + Email Infrastructure"]
date: 2026-03-07
---

# Domain + Email Infrastructure

Domain management, DNS routing, email infrastructure, and asset hosting across all properties.

## Domains (6 active + 3 pending transfer)
- travisfixes.com: FULLY OPERATIONAL (CF + Resend + Gmail send-as)
- travisbreaks.com: CF DNS, R2 CDN, email receiving only
- travisbreaks.org: Netlify DNS (blocks CF email routing)
- travismakes.org: deployed, DMARC
- travismakes.love: deployed (separate tongue-in-cheek project)
- horny-toad.com: deployed, email capture wired
- travisbonnet.com / travisbonnetconsulting.com / travisbonnetconsultingllc.com: Google Domains (now Squarespace), pending transfer

## Asset Hosting
- R2 CDN at assets.travisbreaks.com (CORS configured, images optimized)
- creative-lab assets (~58MB) still need upload
