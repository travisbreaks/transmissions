#!/usr/bin/env python3
"""Regression fixtures for the narration extractor's HTML furniture removal.

The four cases are Riker's (astra/2026-09-08-0301-riker-wrap-review.md): the
column-0 regex they broke leaked promo text on an indented close, consumed an
essay paragraph up to the next column-0 close, and left the tail of a nested
block. Both extraction paths (extract_paragraphs, extract_sections) must agree.

    python3 scripts/test-narration-extract.py        (exit 1 on any failure)

Run by scripts/readalong-check.mjs as part of the release gate.
"""
import importlib.util, sys, tempfile
from pathlib import Path

spec = importlib.util.spec_from_file_location("nwt", Path(__file__).with_name("narrate-with-timing.py"))
nwt = importlib.util.module_from_spec(spec); spec.loader.exec_module(nwt)

CASES = [
    ("simple column-0 block",
     "Before.\n\n<div class=\"card\">\nPromo.\n</div>\n\nAfter.\n",
     ["Before.", "After."]),
    ("indented close tag",
     "Before.\n\n<div class=\"card\">\nPromo.\n  </div>\n\nAfter.\n",
     ["Before.", "After."]),
    ("indented close followed by prose and a figure (the destructive case)",
     "Before.\n\n<div class=\"card\">\nPromo.\n  </div>\n\nKEEP THIS ESSAY PARAGRAPH.\n\n<figure>\nCaption.\n</figure>\n\nAfter.\n",
     ["Before.", "KEEP THIS ESSAY PARAGRAPH.", "After."]),
    ("nested block with a column-0 inner close",
     "Before.\n\n<div class=\"outer\">\n<div class=\"inner\">\nPromo.\n</div>\nTail promo.\n</div>\n\nAfter.\n",
     ["Before.", "After."]),
    ("one-line open+close inside a block does not end it",
     "Before.\n\n<div class=\"player\">\n  <div class=\"fill\"></div>\n  Furniture.\n</div>\n\nAfter.\n",
     ["Before.", "After."]),
    ("bare blockquote is prose, classed blockquote is furniture",
     "Before.\n\n<blockquote>\nQuoted prose.\n</blockquote>\n\n<blockquote class=\"pull\">\nPull quote.\n</blockquote>\n\nAfter.\n",
     ["Before.", "Quoted prose.", "After."]),
    ("unbalanced block is left in place, not consumed to end of file",
     "Before.\n\n<div class=\"card\">\nPromo.\n\nAfter.\n",
     ["Before.", "Promo.", "After."]),
]

failures = 0
with tempfile.TemporaryDirectory() as d:
    for n, (name, body, want) in enumerate(CASES):
        p = Path(d) / f"case{n}.md"
        p.write_text("---\ntitle: x\n---\n" + body, encoding="utf-8")
        got_a = nwt.extract_paragraphs(p)
        got_b = [q for s in nwt.extract_sections(p, True) for q in s]
        ok = got_a == want and got_b == want
        failures += 0 if ok else 1
        print(f"{'OK  ' if ok else 'FAIL'} extract: {name}" + ("" if ok else f"\n      want {want}\n      paragraphs {got_a}\n      sections {got_b}"))

print(f"{failures} failure(s)" if failures else "all extractor fixtures passed")
sys.exit(1 if failures else 0)
