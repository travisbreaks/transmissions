# Church of the Light — The Loop (journey spec)

Boss's full vision, dictated 2026-07-11 during his GPU walk. This turns the single church room into a looping walking-sim narrative built ON the CONCRETE IN THE CLOUD (1002) essay: the empty room and the refused waterfall made walkable. Big multi-session build. File: `public/church-of-light-fable.html`.

## The loop (narrative sequence)

1. **The church** (existing). Congregation of silhouettes outside in the light. Borrowed Light plays; woven verses surface by proximity.
2. **The back-wall prompt.** Walk in a ways, turn around, look back: on the ENTRANCE (back) wall, written in CHALK, a puzzle prompt — something like "turn around and walk forward to proceed back" (exact wording TBD, cryptic/neat). Also a figure FAR out (further than any current one), elevated on a medium-tall structure, holding a SIGN above their head: "turn back around."
3. **The reveal.** When the visitor turns back around (having read the prompt/sign), the back wall CHANGES: where the chalk words were, there is now a dimly-lit PASSAGEWAY — mine-shaft style (dim hanging lights near the edges, that light does NOT bleed into the church, just a super-dim draw). Not the whole wall gone — just a passage where the words were.
4. **Tadao's empty room** (the essay's room). Down the mine-shaft hallway (not too long, but enough to feel like a small journey) into the room Tadao wrote about: chalkboards (rolling/freestanding + a couple wall-mounted) covered in REAL physics equations (actual math that could drive/describe this sim — light transport, golden ratio, etc.), a drafting table, a desk with an abacus + a compass, bags of concrete in a wheelbarrow in a corner. On the FURTHEST-BACK chalkboard: "turn back around."
5. **The tunnel transforms.** Turn back around: the mine-shaft hallway has BECOME a cobblestone ARCHWAY tunnel with sconce TORCHES (~halfway down, both sides). Longer than the mine-shaft. A bright light (same color as the cross light) at the far end. Walk toward it.
6. **The waterfall / green space** (the REFUSED WATERFALL from the essay, now real). The tunnel opens: cobblestone STEPS down (~10, steep, continue the cobblestone) into a simple but topographically + texturally interesting GREEN space. Maybe a tree or two L/R, but mostly: a small lawn landing at the bottom, then a CLIFF over a CHASM (drops into blackness, "infinite"). Across the chasm: a VALLEY with a stream/river and a WATERFALL falling into blackness ("infinite," or sold as such).
7. **The loop closes.** Turn back, up the cobblestone steps: the tunnel has now become a perfectly SQUARE, hard-edged CEMENT corridor (the church's own board-formed concrete sections). It leads back INTO the church. The loop restarts.

## Transforming corridor (the key mechanic)
The same hallway is re-skinned each pass, driven by a narrative STATE MACHINE tied to turn-around / traversal events:
- Pass 1 (church→room): mine-shaft (dim hanging lights).
- Pass 2 (room→waterfall): cobblestone archway + sconce torches, bright cross-light at the end.
- Pass 3 (waterfall→church): square church-concrete corridor.

## Build phases (proposed sequencing; each likely 1+ Fable round + models)
- **Phase A — entry mechanic (keystone):** back-wall chalk prompt + the elevated distant sign-figure + the turn-around REVEAL of the passage (transforming back wall / state machine skeleton). Mostly geometry + state; low model dependency. Build first — it proves the loop mechanic.
- **Phase B — Tadao's empty room:** mine-shaft hallway + the room + props (chalkboards w/ physics eqs, drafting table, abacus, compass, wheelbarrow + concrete bags) + "turn back around" chalkboard. NEEDS MODELS (GLB pipeline).
- **Phase C — the waterfall:** cobblestone torch tunnel + steps-down + green space + cliff/chasm/valley/river/infinite-waterfall. Geometry + water/particle FX + a tree or two.
- **Phase D — loop close:** square cement corridor + return-to-church + the full state-machine loop wired.

## Model pipeline (for props: chalkboards, drafting table, abacus, compass, wheelbarrow, torches)
Boss: "get all these models for all this shit, I'm sure you can find it." Approach: source CC0 GLB props (Poly Pizza / Sketchfab-CC0 / Quaternius / Kenney), FOREMAN downloads + hosts on R2 (travis-assets, CORS-safe) like the Borrowed Light song, Fable loads via three/addons GLTFLoader (already available via importmap). Physics equations = authored text/canvas on the chalkboard materials (real light-transport / golden-ratio / structural equations).

## Also captured this walk (near-term, in the running "core-feel" Fable round a6418dff2a4d340c4)
- Loves ULTRA-LOW-RES dark grainy path-traced look; wants it dominant (always, or moving only very slightly higher res), DARKER (still currently lightens — stop it), high-contrast (pews), keep the light-scatter. REVERT renderScale 1.0 → ~0.4-0.5.
- Resume = settle-then-go: on move-from-still, hold camera ~0.3-0.5s, settle resolution, THEN move (not seamless now).
- Light-straight-up: at the cross looking straight up = black at top; must read all light.
- Extend aisle reflective material OUT the door as a flat path to the outdoor steps.
- DONE foreman this walk: legend +arrows / -shift-run; TW 0.36→0.18 (cross concrete too thick); PT_IDLE_MS 280→800 (pause too fast).

## Essay ties (why this lands)
The empty room = "I keep one room in my digital estate with nothing in it... the most expensive room I own... What will I refuse to add today?" The waterfall = "I refused the waterfall. I will always refuse the waterfall." The loop makes the reader walk the essay's discipline: the refusal, the empty room, the honest beam.
