#!/usr/bin/env python3
"""Rebuild a narrate-with-timing.py chunk cache from a SHIPPED mp3 + timing sidecar.

Why: the generator caches every TTS chunk by text hash so an edited essay re-bills
only its changed sections, but the July caches lived in /tmp and are gone. The
shipped artifacts still hold everything needed: the mp3 was assembled as
  intro | 2.0s digital silence | chunk0 | 2.1s | chunk1 | ... | 2.0s | outro
and the sidecar holds every word's absolute start/end. Digital silence (anullsrc)
is exactly recoverable with silencedetect at -70 dB, so the chunks can be cut
back out losslessly (-c copy) and the alignment files re-synthesised from the
word times. After this, a run of narrate-with-timing.py on the essay with the
same --work-dir prints [cache] for every unchanged section and bills only the
changed one(s).

Usage (the --md MUST be the text AS NARRATED, i.e. the committed version):
  git show HEAD:src/content/transmissions/073-absolutely-no-ai.md > /tmp/073-as-narrated.md
  python3 scripts/rebuild-narration-cache.py --md /tmp/073-as-narrated.md \
      --slug 073-absolutely-no-ai --number "seventy-three" --title "Absolutely No AI" \
      --mp3 public/073-absolutely-no-ai.mp3 --sidecar public/073-absolutely-no-ai.timing.json \
      --work-dir /tmp/narrate-073 --section-chunks --stop-at-sources

Then verify with a dry run (zero credits if every chunk is cached):
  python3 scripts/narrate-with-timing.py --md /tmp/073-as-narrated.md ... --work-dir /tmp/narrate-073 --out-dir <scratch>
and compare the produced sidecar with the shipped one.

Added 2026-09-07 for the 073 Bartz correction (one section of seven).
"""
import argparse, importlib.util, json, re, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("nwt", HERE / "narrate-with-timing.py")
nwt = importlib.util.module_from_spec(spec)
spec.loader.exec_module(nwt)


def silence_spans(mp3: Path, min_len: float = 1.5, noise_db: int = -70):
    out = subprocess.run(
        ["ffmpeg", "-v", "info", "-i", str(mp3), "-af",
         f"silencedetect=noise={noise_db}dB:d={min_len}", "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", out)]
    if len(starts) != len(ends):
        sys.exit(f"silencedetect: {len(starts)} starts vs {len(ends)} ends")
    return list(zip(starts, ends))


def cut(src: Path, dst: Path, start: float, end: float):
    # -c copy: no re-encode, cuts on mp3 frame boundaries (~26 ms granularity)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", f"{start:.3f}", "-to", f"{end:.3f}",
                    "-i", str(src), "-c", "copy", str(dst)], check=True)


def synth_alignment(text: str, words: list[dict], t0: float) -> dict:
    """Per-character times (relative to the chunk file start) from word times.
    words_from_alignment() re-tokenises on whitespace, so any char timing that
    keeps word boundaries intact round-trips to exactly these words."""
    chars, s, e = [], [], []
    i = 0            # index into words
    pos = 0
    n = len(text)
    while pos < n:
        c = text[pos]
        if c.isspace():
            prev_end = (words[i - 1]["e"] - t0) if i > 0 else 0.0
            next_start = (words[i]["s"] - t0) if i < len(words) else prev_end
            chars.append(c); s.append(round(prev_end, 3)); e.append(round(next_start, 3))
            pos += 1
            continue
        # a word: consume non-space chars, spread the word's span linearly over them
        j = pos
        while j < n and not text[j].isspace():
            j += 1
        w = text[pos:j]
        if i >= len(words) or words[i]["w"] != w:
            got = words[i]["w"] if i < len(words) else None
            sys.exit(f"token mismatch at word {i}: text {w!r} vs sidecar {got!r}")
        ws, we = words[i]["s"] - t0, words[i]["e"] - t0
        L = len(w)
        for k, ch in enumerate(w):
            chars.append(ch)
            s.append(round(ws + (we - ws) * k / L, 3))
            e.append(round(ws + (we - ws) * (k + 1) / L, 3))
        i += 1
        pos = j
    if i != len(words):
        sys.exit(f"chunk consumed {i} words but was given {len(words)}")
    return {"characters": chars, "character_start_times_seconds": s, "character_end_times_seconds": e}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", required=True, help="the essay AS NARRATED (git show HEAD:... for a shipped piece)")
    ap.add_argument("--slug", required=True)
    ap.add_argument("--number", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--mp3", required=True)
    ap.add_argument("--sidecar", required=True)
    ap.add_argument("--work-dir", required=True)
    ap.add_argument("--section-chunks", action="store_true")
    ap.add_argument("--stop-at-sources", action="store_true")
    a = ap.parse_args()

    work = Path(a.work_dir); work.mkdir(parents=True, exist_ok=True)
    mp3 = Path(a.mp3)
    words = json.loads(Path(a.sidecar).read_text())["words"]

    # 1. reproduce the chunking the generator will use
    if a.section_chunks or a.stop_at_sources:
        secs = nwt.extract_sections(Path(a.md), stop_at_sources=a.stop_at_sources)
        paras = [p for s in secs for p in s]
        chunks = nwt.chunk_sections(secs) if a.section_chunks else nwt.chunk_paragraphs(paras)
    else:
        paras = nwt.extract_paragraphs(Path(a.md))
        chunks = nwt.chunk_paragraphs(paras)
    chunk_tokens = [c.split() for c in chunks]
    flat = [t for ct in chunk_tokens for t in ct]
    got = [w["w"] for w in words]
    if flat != got:
        i = next((k for k in range(min(len(flat), len(got))) if flat[k] != got[k]), min(len(flat), len(got)))
        sys.exit(f"sidecar/text token mismatch at {i}: text {flat[i:i+3]!r} sidecar {got[i:i+3]!r} "
                 f"({len(flat)} vs {len(got)}); is --md the AS-NARRATED text?")

    # 2. locate the assembled silences: intro gap, one seam per chunk boundary, outro gap
    spans = silence_spans(mp3)
    want = len(chunks) + 1
    if len(spans) != want:
        sys.exit(f"found {len(spans)} digital-silence spans, expected {want} (intro gap + {len(chunks)-1} seams + outro gap): {spans}")
    total = nwt.duration(mp3)

    # 3. cut intro, chunks, outro (lossless) and write them under the generator's cache names
    intro_text = f"Transmission. Number {a.number}. {a.title}."
    outro_text = (f"Thus concludes our transmission on {a.title}. This has been a "
                  f"narration brought to you by travisbreaks.org. Hope you have enjoyed it.")
    cut(mp3, work / f"intro-{nwt.cache_key(intro_text)}.mp3", 0.0, spans[0][0])
    cut(mp3, work / f"outro-{nwt.cache_key(outro_text)}.mp3", spans[-1][1], total)
    wi = 0
    for i, (text, toks) in enumerate(zip(chunks, chunk_tokens)):
        start, end = spans[i][1], spans[i + 1][0]
        h = nwt.cache_key(text)
        cut(mp3, work / f"body{i}-{h}.mp3", start, end)
        cw = words[wi:wi + len(toks)]
        wi += len(toks)
        if cw[0]["s"] < start - 0.05 or cw[-1]["e"] > end + 0.05:
            sys.exit(f"chunk {i}: word times {cw[0]['s']}..{cw[-1]['e']} fall outside the cut {start}..{end}")
        (work / f"body{i}-{h}.alignment.json").write_text(json.dumps(synth_alignment(text, cw, start)))
        print(f"  [rebuilt] body{i} {len(text)} chars {len(toks)} words  {start:.3f}..{end:.3f}s -> body{i}-{h}")
    print(f"rebuilt cache for {a.slug}: intro + {len(chunks)} chunks + outro in {work}")
    print("next: run narrate-with-timing.py with the same --work-dir; unchanged sections print [cache]")


if __name__ == "__main__":
    main()
