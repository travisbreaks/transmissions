# Transmissions Blog — Claude Instructions

This is the canonical rule set for writing, editing, and shipping transmissions. If a rule here conflicts with memory files, this file wins.

---

## Editorial Authority

**Travis (final say) > Tadao (canon knowledge) > GPT (editorial input)**

GPT provides editorial feedback. Tadao applies it. But Tadao knows the canon, the voice rules, and the cross-transmission landscape. If GPT suggests something that contradicts established rules or doesn't fit the voice, Tadao pushes back and checks with Travis. GPT is input, not authority. Travis overrides everything.

**Discernment pattern (071, three GPT rounds):** GPT is excellent on logic, factual precision, and overclaim detection (take those), and it reliably drifts the prose toward seminar-speak ("Historical-critical scholars commonly place Daniel's final form under Antiochus IV" vs the voice's "Critical scholarship puts Daniel under Antiochus"). Take the substance, refuse the register, and say which was which when reporting to Travis. Travis's own verdict overrides GPT's scope (GPT said cut 10%; Travis's "too long" meant 45%).

---

## Voice

Travis's voice. Not Tadao's. Not GPT's. Not Claude's.

**Terminal vs transmissions (Travis-stated 2026-07-12, non-negotiable):** `terminal`-tagged pieces (999, 1001, 1002...) are Tadao writing, the robot's voice. Everything else in transmissions is TRAVIS's voice, his experience, his writing. Do not let the two registers bleed.

**The 071 lesson (a full draft was rejected as "too long, boring, not me"):** the failure mode is the scholar-lecture register: long flowing paragraphs, historical parades, connective throat-clearing, a quotable line at the end of every paragraph ("aphorism traffic jam"). The fix is structural, not cosmetic:
- Cold-open the thesis in 1-2 lines, then a frame line ("That is the argument. The rest is architecture." = 055; each piece writes its OWN).
- Short paragraphs, 1-3 sentences, each laying down a position.
- Personal authority in single lines, not scenes ("I did not serve to protect the state from scrutiny. I served so scrutiny was possible." = 054).
- ONE aphorism per section, maximum. Plain prose around the strong lines makes them hit.
- Two examples prove a pattern; six examples are a museum tour.
- READ 049/052/054/055 before drafting. Actually read them, in full, every time.

**Reference transmissions** (read before writing anything):
- **049** (Thoughtcrimes) — voice calibration gold standard
- **055** (Pain as Signal) — scholarly + personal integration
- **052** (Infrastructure of Being Seen) — emotional grounding
- **054** (Spirit Paired with Technical Literacy) — concise systems piece

**Voice characteristics:**
- Declarative, concrete, first-person where grounded in real experience
- Systems thinking applied to human experience
- Professional-sardonic, not academic, not motivational
- One sharp observation per paragraph max
- Contractions allowed sparingly

**Hard rules:**
- No em dashes. Use commas, periods, colons, semicolons, parentheses.
- No "sober." Always "in recovery."
- No second-person "you/your" in long-form prose. Gold standards have ZERO. (001 Archive of Becoming is the only exemption as the genesis piece.)
- No repeating signature phrases across transmissions. Each piece owns its closer.
- Ground in Travis's actual work, infrastructure, recovery, creative practice. Do not just theorize.

---

## Absolutes Policy

Soften universal claims. Travis's writing asserts without overreaching.

| Instead of | Use |
|---|---|
| never | rarely, almost never |
| always | almost always, consistently |
| cannot | rarely can, struggles to |
| impossible | nearly impossible, extraordinarily difficult |
| every (as universal) | most, nearly every |

**Exceptions where absolutes are allowed:**
- Thesis lines and key quotes (these are meant to be strong assertions)
- Technical definitions ("A hard constraint is a requirement that cannot be violated" — that's what the word means)
- Personal observations about one's own experience ("The pattern is always the same" — describing a personal 25-year pattern)
- Rhetorical emphasis when the absolute IS the point (013's "impossible" x3 for hard constraints)

**The test:** If a reader could reasonably produce a counterexample, soften the claim. If the absolute is definitional or personal, keep it.

---

## Cross-Transmission Deduplication

These patterns were caught during a full-batch QA pass. Check EVERY batch before shipping.

1. **Signature phrases are per-transmission.** "The rest is architecture" = 055. "The blueprint is the building" = 001. Before writing a closer, grep all existing transmissions.
2. **"The distinction/difference matters"** — cap at 2 per batch. Currently owned by 001 and 013.
3. **"This is not X. It is Y." (negation-correction)** — Travis uses this (049: "This is not metaphor. It is implementation."), but overuse across a batch is an AI fingerprint. Vary: try direct assertion, "X, not Y" inversions, or just state what it IS.
4. **"That is" sentence openers** — same density issue. Mix in other constructions or drop the opener entirely.
5. **"The model is hydraulic"** — owned by 006. Do not reuse.
6. **Shared metaphor check** — before using an unusual metaphor (hydraulic, curriculum, noise floor), grep to see if another transmission already owns it. One primary metaphor per transmission.
7. **071-owned signatures** (do not reuse): "The signs did not multiply. The resolution did." / "We mistook higher resolution for a nearer end." / "finds me awake" (closer) / "me catching up to my own config" / "That is the collision. What follows is the audit." Also owned elsewhere: "the wrong time, agreed upon" (061), "The feed curates the curator" + the mirror (005), the casino (1002).
8. **Frame-line template watch**: "That is the X. [Short second sentence.]" is now used by 054, 055, and 071. It is a series convention, but three is approaching saturation; vary the frame move in the next pieces.
9. **Derivative sweep method (071)**: before ship, grep 30+ probe phrases (the piece's distinctive n-grams and metaphor families) across the full corpus, then hand-judge any hits in context (a word-level hit is usually shared vocabulary, not a collision; check the FUNCTION the phrase serves).

---

## Structure

- **Opening:** Best or third-best line in the piece. Strong thesis. 1-2 sentences.
- **Section breaks:** `---` between sections. 5-8 sections typical.
- **Closing:** Second-best line. The punchline, the reveal, the earned payoff. Each transmission needs its own closing signature.
- **Grounding section:** At least one section per essay ties to Travis's actual work, infrastructure, recovery, or creative practice.

**Line hierarchy (hard rule):**
1. **Best line** → opener (leads the essay)
2. **Second-best line** → closer/punchline (the reveal, earned at the end)
3. **Third-best line** → `key_quote` in frontmatter (the yellow teaser)

The `key_quote` is NOT the first sentence pulled up. It is a standalone teaser that hooks without giving away the opener or the closer. It should come from somewhere in the middle of the piece, or be written specifically for the frontmatter.

**Structure pattern (from 052-055):**
1. Strong thesis opener
2. Framing line ("That is the argument." or similar)
3. 5-8 sections: context, architecture, technical grounding, philosophical claim, reflection, earned closer
4. Closer echoes or inverts the opener

---

## Pipeline (DO NOT SKIP STEPS)

### Phase 1: Draft (Tadao)
1. Read the stub (frontmatter + summary)
2. Read original ChatGPT source if available (source_platform field)
3. Draft full essay in Travis's voice (~1500-2500 words)
4. Replace stub body (keep frontmatter unchanged)
5. Self-review: em dashes, you/your, absolutes, voice consistency, grounding

### Phase 2: Editorial Review (Travis + GPT)
6. Travis reviews draft, takes it through GPT editorial pass
7. Travis returns edits. Tadao applies them.
8. Cross-transmission QA: grep full archive for signature phrases, shared metaphors, retold incidents. This is a blocker, not a suggestion. See "Cross-Transmission Deduplication" section below.

### Phase 3: TTS + Audio
9. Run the canonical generator (mp3 + read-along sidecar in one shot):
   `python3 scripts/narrate-with-timing.py --md src/content/transmissions/NNN-slug.md --slug NNN-slug --number "spoken-number" --title "Spoken Title" --out-dir public --work-dir /tmp/narrate-NNN --section-chunks --stop-at-sources`
10. Upload to R2: `npx wrangler r2 object put travis-assets/transmissions/NNN-slug.mp3 --file public/NNN-slug.mp3 --content-type audio/mpeg --remote` (keychain token inline). The `.timing.json` sidecar stays in `public/` and gets COMMITTED.
11. Add audio player HTML block (copy from a narrated piece, update src to the R2 URL + duration)
12. Generate on LOCKED text only (chunk cache makes small re-edits cheap, but the discipline is one generation per approved text)

### Phase 4: OG + QA
13. Generate OG image: `node travisbreaks-blog/scripts/generate-og-images.mjs N`
14. Upload OG to R2
15. Local QA: build blog, check rendering, verify audio playback, confirm OG tags

### Phase 5: Commit + Deploy
16. **ONLY NOW**: stage and commit. Not before.
17. **Each transmission gets its own commit.** Never bundle multiple transmissions in a single commit. Dedup fixes, new essays, and narration additions are separate commits. This keeps the git history readable and makes reverts surgical.
18. Push (with Travis approval)
18. Post-deploy verify: `curl -s URL | grep og:`

**CRITICAL: Essays are NOT committed after Phase 1. They are local drafts until all phases are complete.**

---

## Audio Config

**Canonical generator (2026-07-13, supersedes tts-transmission.py for essays): `scripts/narrate-with-timing.py`** — produces the mp3 AND the word-timing sidecar the read-along needs, in one run. Use `--section-chunks --stop-at-sources`. What it encodes (learned on 071, verified against the v3 docs):

- **v3 stability is modal**: 0.0 Creative / 0.5 Natural / 1.0 Robust. Narration = Natural (0.5). If section seams sound inconsistent, the next lever is Robust.
- **eleven_v3 REJECTS request stitching** (previous_text/next_text → HTTP 400); the script auto-falls-back. Consistency comes from chunking at `---` section breaks (pauses land where the essay breathes) + keeping every chunk over ~250 chars (v3 goes inconsistent below that).
- **Audio tags** ([thoughtful], [sighs]) are for dialogue/emotional acting, not measured narration; 071 shipped tagless and correct. The script filters bracket tags out of the sidecar if they are ever used.
- **Sources blocks are excluded from narration** (`--stop-at-sources`); the ReadAlong client tolerates a sidecar that ends before the page does.
- **Chunk caching**: every TTS chunk is cached by content hash; a failed or repeated run never re-bills completed chunks. Text edits re-bill only the changed sections.
- Key: `ELEVENLABS_API_KEY` in env or `CODE/.env.local` (keychain has no entry).

Legacy settings below still apply to the intro/outro format and the voice:

- **Engine:** ElevenLabs `eleven_v3`
- **Voice:** George (`Apa0qDTZZx6F8Azt5oFG`), similarity_boost=0.88, style=0.08 (stability: use the v3 modal values above)
- **Script (legacy, plain narration without read-along):** `scripts/tts-transmission.py` (lives in CODE)
- **Intro format:** "Transmission. Number {N in words}. {Title}."
- **Outro format:** "Thus concludes our transmission on {Title}. This has been a narration brought to you by travisbreaks.org. Hope you have enjoyed it."
- **Gaps:** 2s silence between intro/body and body/outro
- **Fades:** 40ms per segment
- **NEVER `open` audio files directly** (triggers Apple Music). Use `open -R`.
- **R2 path:** `travis-assets/transmissions/{id}-{slug}.mp3`
- **Cache busting:** Use `?v=N` query param on re-uploads (Cloudflare 4hr TTL)

---

## Audio Player Template

Copy from any narrated transmission (049, 051-055). Update:
- `src` URL with correct slug
- `~Xmin` duration estimate
- Place between frontmatter `---` and essay body
- Must include speed buttons (1x / 1.25x / 1.5x)

---

## OG Images

Every transmission page needs a custom OG image before push. This is a **pre-push blocker**.

1. Generate: `node scripts/generate-og-images.mjs {NNN}` (zero-padded filename prefix: "071", not "71")
2. Upload: `npx wrangler r2 object put travis-assets/transmissions/og/{slug}-og.png --file /tmp/og-images/{slug}-og.png --remote`
3. Verify accessible: `curl -sI https://assets.travisbreaks.com/transmissions/og/{slug}-og.png | head -3`
4. After deploy, verify live: `curl -s URL | grep og:`

---

## Frontmatter Schema

```yaml
title: "TITLE IN CAPS"
date: YYYY-MM-DD
confidence: 50-100
tags: ["process", "protocol", "self", "signal", "sonic", "systems", "void", "grief", "worlds"]
key_quote: "The thesis line."
source_platform: "chatgpt" | "claude" | omitted
source_id: "uuid" (optional, for ChatGPT source conversations)
id: N
```

**Tag taxonomy (9 categories):** process, protocol, self, signal, sonic, systems, void, grief, worlds

---

## Batching Strategy

- 5 per batch, grouped by theme or source depth
- Write all essays first, then TTS + upload as a batch
- Before compact: checkpoint which transmissions are done/in-progress to `memory/current-state.md`

---

## Quality Gates (Pre-Ship Checklist)

Before marking any transmission as ready for TTS:

- [ ] No em dashes
- [ ] No "you/your" (except 001)
- [ ] No "sober" (use "in recovery")
- [ ] Absolutes audit: no unnecessary "never/always/cannot/impossible"
- [ ] Cross-transmission dedup: grep for signature phrases, shared metaphors
- [ ] At least one section grounded in Travis's actual work/infrastructure/recovery
- [ ] Closing signature is unique (not used in any other transmission)
- [ ] Key quote still fits the expanded essay
- [ ] Frontmatter unchanged from stub (except adding source_id if discovered)
- [ ] No AI fingerprint density: negation-correction and "That is" openers varied
