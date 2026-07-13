#!/usr/bin/env python3
"""
narrate-with-timing.py — George narration + word-level read-along sidecar.

Rebuilt durable 2026-07-12 (the original lived in a session scratchpad and was
lost with it). Produces the two files the ReadAlong system needs:

  public/<slug>.mp3          intro + body + outro, assembled with ffmpeg
  public/<slug>.timing.json  {version:1, voice:"george", words:[{w,s,e}...]}
                             BODY words only, ABSOLUTE times into the mp3

Contract with src/components/ReadAlong.astro (the consumer):
  - it whitespace-splits the rendered <p> text nodes and consumes characters
    against words[].w in order, so words MUST be exactly the whitespace-split
    tokens of every rendered paragraph, in document order
  - smart quotes / ellipsis differences are normalized client-side
  - any mismatch degrades silently to the plain player (word-count gate)

Credit discipline: every TTS chunk is cached in --work-dir keyed by a hash of
its text + voice settings. Re-runs reuse cached chunks; a mid-run failure never
re-bills completed chunks.

Usage:
  python3 scripts/narrate-with-timing.py \
    --md src/content/transmissions/071-not-for-you-to-know.md \
    --slug 071-not-for-you-to-know \
    --number "seventy-one" --title "Not for You to Know" \
    --out-dir public --work-dir /tmp/narrate-071

Key: ELEVENLABS_API_KEY env var, or ELEVENLABS_API_KEY= line in CODE/.env.local.
"""

import argparse, base64, hashlib, json, os, re, subprocess, sys
from pathlib import Path

import requests

VOICE_ID = "Apa0qDTZZx6F8Azt5oFG"   # George (catalog voice; the transmissions narrator)
MODEL_ID = "eleven_v3"
# v3 stability is modal: 0.0 Creative / 0.5 Natural / 1.0 Robust. Natural is the
# narration setting (per the v3 prompting guide + our prior tag research).
VOICE_SETTINGS = {"stability": 0.5, "similarity_boost": 0.88, "style": 0.08}
OUTPUT_FORMAT = "mp3_44100_128"
CHUNK_CHAR_LIMIT = 3800             # size-based fallback chunking limit
MIN_CHUNK_CHARS = 250               # v3: prompts under ~250 chars go inconsistent
SEAM_GAP_S = 0.35                   # silence between body chunks (section seam)
STITCH_CTX_CHARS = 1000             # previous_text/next_text context cap
INTRO_GAP_S = 2.0                   # per the audio config: 2s intro/body + body/outro
ENV_LOCAL = Path("/Users/travisbonnet/code/CODE/.env.local")


def api_key() -> str:
    key = os.environ.get("ELEVENLABS_API_KEY", "")
    if not key and ENV_LOCAL.exists():
        for line in ENV_LOCAL.read_text().splitlines():
            if line.startswith("ELEVENLABS_API_KEY="):
                key = line.split("=", 1)[1].strip()
                break
    if not key:
        sys.exit("ELEVENLABS_API_KEY not found (env or CODE/.env.local)")
    return key


def extract_paragraphs(md_path: Path) -> list[str]:
    """Frontmatter, HTML comments, HTML blocks, and hr lines out; paragraphs in
    document order, with markdown link/emphasis syntax reduced to rendered text."""
    text = md_path.read_text(encoding="utf-8")
    # frontmatter
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    if m:
        text = text[m.end():]
    # HTML comments (multiline)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    # HTML blocks: the audio player div, style, script (line-anchored greedy blocks)
    text = re.sub(r"<style.*?</style>", "", text, flags=re.S | re.I)
    text = re.sub(r"<script.*?</script>", "", text, flags=re.S | re.I)
    text = re.sub(r"<div class=\"listen-player\".*?</div>\s*</div>\s*</div>", "", text, flags=re.S)
    # any remaining html tags render as inline/invisible; strip tags, keep inner text
    text = re.sub(r"<[^>\n]+>", "", text)
    paras = []
    for block in re.split(r"\n\s*\n", text):
        block = block.strip()
        if not block or block == "---":
            continue
        # markdown links [text](url) -> text ; emphasis markers dropped
        block = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", block)
        block = re.sub(r"([*_]{1,2})(\S(?:.*?\S)?)\1", r"\2", block)
        # collapse internal newlines/whitespace the way HTML rendering does
        block = re.sub(r"\s+", " ", block)
        paras.append(block)
    return paras


def chunk_paragraphs(paras: list[str]) -> list[str]:
    chunks, cur = [], ""
    for p in paras:
        cand = (cur + "\n\n" + p) if cur else p
        if len(cand) > CHUNK_CHAR_LIMIT and cur:
            chunks.append(cur)
            cur = p
        else:
            cur = cand
    if cur:
        chunks.append(cur)
    return chunks


def extract_sections(md_path: Path, stop_at_sources: bool) -> list[list[str]]:
    """Like extract_paragraphs but preserves the essay's --- section structure:
    returns a list of sections, each a list of paragraphs. Optionally stops at
    the **Sources** block (narration should not read the bibliography; the
    ReadAlong client tolerates a sidecar that ends before the page does)."""
    text = md_path.read_text(encoding="utf-8")
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    if m:
        text = text[m.end():]
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = re.sub(r"<style.*?</style>", "", text, flags=re.S | re.I)
    text = re.sub(r"<script.*?</script>", "", text, flags=re.S | re.I)
    text = re.sub(r"<div class=\"listen-player\".*?</div>\s*</div>\s*</div>", "", text, flags=re.S)
    text = re.sub(r"<[^>\n]+>", "", text)
    sections, cur = [], []
    stopped = False
    for block in re.split(r"\n\s*\n", text):
        block = block.strip()
        if not block:
            continue
        if block == "---":
            if cur:
                sections.append(cur)
                cur = []
            continue
        if stop_at_sources and re.match(r"\*\*Sources\*\*", block):
            stopped = True
            break
        block = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", block)
        block = re.sub(r"([*_]{1,2})(\S(?:.*?\S)?)\1", r"\2", block)
        block = re.sub(r"\s+", " ", block)
        cur.append(block)
    if cur and not stopped:
        sections.append(cur)
    elif cur and stopped:
        sections.append(cur)
    return sections


def chunk_sections(sections: list[list[str]]) -> list[str]:
    """One chunk per essay section (prosody resets belong at section breaks).
    Sections under MIN_CHUNK_CHARS merge into the previous chunk (v3 gets
    inconsistent below ~250 chars); oversize sections fall back to size splits."""
    chunks = []
    for sec in sections:
        text = "\n\n".join(sec)
        if len(text) > CHUNK_CHAR_LIMIT:
            chunks.extend(chunk_paragraphs(sec))
        elif chunks and len(text) < MIN_CHUNK_CHARS:
            chunks[-1] = chunks[-1] + "\n\n" + text
        else:
            chunks.append(text)
    # a too-small FIRST chunk has no previous neighbor: merge it forward
    if len(chunks) > 1 and len(chunks[0]) < MIN_CHUNK_CHARS:
        chunks[1] = chunks[0] + "\n\n" + chunks[1]
        chunks.pop(0)
    return chunks


def tts(text: str, key: str, work: Path, tag: str, want_alignment: bool,
        prev_text: str = "", next_text: str = ""):
    """TTS one chunk with caching + request stitching. Returns (mp3_path, alignment_or_None).
    previous_text/next_text carry prosody across chunk seams; if the model
    rejects them (one doc says v3 may not support stitching), retry without."""
    h = hashlib.sha256(
        json.dumps([text, VOICE_ID, MODEL_ID, VOICE_SETTINGS, OUTPUT_FORMAT,
                    prev_text, next_text]).encode()
    ).hexdigest()[:16]
    mp3 = work / f"{tag}-{h}.mp3"
    alj = work / f"{tag}-{h}.alignment.json"
    if mp3.exists() and (alj.exists() or not want_alignment):
        print(f"  [cache] {tag} ({len(text)} chars)")
        return mp3, (json.loads(alj.read_text()) if want_alignment else None)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps?output_format={OUTPUT_FORMAT}"
    body = {"text": text, "model_id": MODEL_ID, "voice_settings": VOICE_SETTINGS}
    if prev_text:
        body["previous_text"] = prev_text[-STITCH_CTX_CHARS:]
    if next_text:
        body["next_text"] = next_text[:STITCH_CTX_CHARS]
    r = requests.post(url, headers={"xi-api-key": key, "content-type": "application/json"},
                      json=body, timeout=600)
    if r.status_code != 200 and (prev_text or next_text):
        print(f"  [stitch] {tag}: HTTP {r.status_code} with stitching, retrying without")
        body.pop("previous_text", None)
        body.pop("next_text", None)
        r = requests.post(url, headers={"xi-api-key": key, "content-type": "application/json"},
                          json=body, timeout=600)
    if r.status_code != 200:
        sys.exit(f"TTS failed for {tag}: HTTP {r.status_code}: {r.text[:300]}")
    data = r.json()
    mp3.write_bytes(base64.b64decode(data["audio_base64"]))
    align = data.get("alignment")
    if want_alignment:
        if not align:
            sys.exit(f"{tag}: no alignment in response (model {MODEL_ID})")
        alj.write_text(json.dumps(align))
    print(f"  [tts]   {tag} ({len(text)} chars) -> {mp3.name}")
    return mp3, align


def words_from_alignment(text: str, align: dict) -> list[dict]:
    """Whitespace-split tokens with (start, end) from per-char times.
    Asserts the token stream equals text.split() (the ReadAlong contract)."""
    chars = align["characters"]
    starts = align["character_start_times_seconds"]
    ends = align["character_end_times_seconds"]
    words, buf, s0, e0 = [], "", None, None
    for c, s, e in zip(chars, starts, ends):
        if c.isspace():
            if buf:
                words.append({"w": buf, "s": round(s0, 3), "e": round(e0, 3)})
                buf, s0, e0 = "", None, None
        else:
            if not buf:
                s0 = s
            buf += c
            e0 = e
    if buf:
        words.append({"w": buf, "s": round(s0, 3), "e": round(e0, 3)})
    expect = text.split()
    got = [w["w"] for w in words]
    if got != expect:
        # find first divergence for the error message
        i = next((k for k in range(min(len(got), len(expect))) if got[k] != expect[k]), min(len(got), len(expect)))
        sys.exit(
            f"alignment token mismatch at {i}: got {got[i:i+3]!r} expected {expect[i:i+3]!r} "
            f"(counts {len(got)} vs {len(expect)})"
        )
    # v3 audio tags ([thoughtful], [sighs], ...) are TTS directives, not page
    # text: drop them from the sidecar so the client word map stays aligned
    # with the rendered essay.
    return [w for w in words if not re.fullmatch(r"\[[^\]]+\]", w["w"])]


def duration(mp3: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", str(mp3)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def make_silence(work: Path, secs: float) -> Path:
    p = work / f"sil-{secs}.mp3"
    if not p.exists():
        subprocess.run(
            ["ffmpeg", "-y", "-v", "error", "-f", "lavfi",
             "-i", "anullsrc=r=44100:cl=mono", "-t", str(secs),
             "-c:a", "libmp3lame", "-b:a", "128k", str(p)],
            check=True,
        )
    return p


def concat(files: list[Path], out: Path):
    args = ["ffmpeg", "-y", "-v", "error"]
    for f in files:
        args += ["-i", str(f)]
    n = len(files)
    fc = "".join(f"[{i}:a]" for i in range(n)) + f"concat=n={n}:v=0:a=1[out]"
    args += ["-filter_complex", fc, "-map", "[out]", "-c:a", "libmp3lame", "-b:a", "128k", str(out)]
    subprocess.run(args, check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", required=True)
    ap.add_argument("--slug", required=True)
    ap.add_argument("--number", required=True, help='spoken number, e.g. "seventy-one"')
    ap.add_argument("--title", required=True, help='spoken title, e.g. "Not for You to Know"')
    ap.add_argument("--out-dir", default="public")
    ap.add_argument("--work-dir", required=True)
    ap.add_argument("--stop-at-sources", action="store_true",
                    help="exclude the **Sources** block (and beyond) from narration")
    ap.add_argument("--section-chunks", action="store_true",
                    help="one chunk per --- section (prosody seams at section breaks)")
    args = ap.parse_args()

    key = api_key()
    work = Path(args.work_dir); work.mkdir(parents=True, exist_ok=True)
    out_dir = Path(args.out_dir); out_dir.mkdir(parents=True, exist_ok=True)

    if args.section_chunks or args.stop_at_sources:
        sections = extract_sections(Path(args.md), stop_at_sources=args.stop_at_sources)
        paras = [p for sec in sections for p in sec]
        chunks = chunk_sections(sections) if args.section_chunks else chunk_paragraphs(paras)
    else:
        paras = extract_paragraphs(Path(args.md))
        chunks = chunk_paragraphs(paras)
    body_chars = sum(len(p) for p in paras)
    print(f"body: {len(paras)} paragraphs, {body_chars} chars, {len(chunks)} chunks "
          f"(sizes {[len(c) for c in chunks]})")

    intro_text = f"Transmission. Number {args.number}. {args.title}."
    outro_text = (f"Thus concludes our transmission on {args.title}. This has been a "
                  f"narration brought to you by travisbreaks.org. Hope you have enjoyed it.")

    intro_mp3, _ = tts(intro_text, key, work, "intro", want_alignment=False)
    chunk_files, chunk_aligns = [], []
    for i, ch in enumerate(chunks):
        prev_ctx = chunks[i - 1] if i > 0 else intro_text
        next_ctx = chunks[i + 1] if i < len(chunks) - 1 else outro_text
        f, al = tts(ch, key, work, f"body{i}", want_alignment=True,
                    prev_text=prev_ctx, next_text=next_ctx)
        chunk_files.append(f); chunk_aligns.append(al)
    outro_mp3, _ = tts(outro_text, key, work, "outro", want_alignment=False)

    # absolute word times: intro + 2s, then each chunk offset by prior durations + seams
    words, offset = [], duration(intro_mp3) + INTRO_GAP_S
    for i, (ch, f, al) in enumerate(zip(chunks, chunk_files, chunk_aligns)):
        for w in words_from_alignment(ch, al):
            words.append({"w": w["w"], "s": round(w["s"] + offset, 3), "e": round(w["e"] + offset, 3)})
        offset += duration(f)
        if i < len(chunks) - 1:
            offset += SEAM_GAP_S

    # assemble: intro | 2s | c0 | seam | c1 ... | 2s | outro
    sil2 = make_silence(work, INTRO_GAP_S)
    seam = make_silence(work, SEAM_GAP_S)
    seq = [intro_mp3, sil2]
    for i, f in enumerate(chunk_files):
        seq.append(f)
        if i < len(chunk_files) - 1:
            seq.append(seam)
    seq += [sil2, outro_mp3]
    final_mp3 = out_dir / f"{args.slug}.mp3"
    concat(seq, final_mp3)

    sidecar = out_dir / f"{args.slug}.timing.json"
    sidecar.write_text(json.dumps({"version": 1, "voice": "george", "words": words}))

    total = duration(final_mp3)
    print(f"done: {final_mp3} ({total/60:.1f} min), {sidecar} ({len(words)} words)")
    print(f"chars billed (approx): {body_chars + len(intro_text) + len(outro_text)}")


if __name__ == "__main__":
    main()
