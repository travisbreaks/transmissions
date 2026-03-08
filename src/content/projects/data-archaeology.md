---
name: "Data Archaeology + Backup"
category: "Ops"
status: "BUILD NOW"
enjoyment: 6
resources: 8
viability: 10
scale: 3
action: "T7 scan complete (63.5 GB freed). Pinned items need Travis review (STEMS, Pictures, Ableton). Next: remaining 3.5-inch HDDs + USB externals. Finalize 3-2-1 backup protocol."
tags: ["backup", "data", "drives", "archaeology", "organization"]
stack: ["Python", "SQLite", "exiftool", "SHA-256"]
deploy_url: ""
git_dir: ""
phases: ["Data Archaeology + Backup"]
date: 2026-03-07
---

# Data Archaeology + Backup

Drive auditing, data collation, deduplication, and backup protocols across all storage media.

## T7 Shield (complete)
- 88,962 files scanned, 698GB total, 10,396 dupe groups found
- 63.5 GB freed: Pass 1 deletes, LIBRARY dedup, DJ consolidation, Highland Sound merge, Pictures sort
- SQLite catalog at `_AUDIT/t7-catalog.db`
- Pinned items awaiting Travis review: STEMS dupes, Pictures overlap, Ableton cross-contamination

## Remaining Drives
- ~6 3.5-inch HDDs (arriving) + 3-4 USB externals
- Same extract protocol: scan, hash, dedup, census, sort

## Backup Protocol (3-2-1)
- Time Machine (local) + rclone (cloud) + T7 (offsite portable)
- Full protocol documentation pending after all drives audited
