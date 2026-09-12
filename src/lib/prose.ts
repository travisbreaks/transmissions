// Reduce a transmission's raw markdown body to the prose a reader actually
// reads: HTML furniture (the audio player, image figures, terminal overlays)
// out, markdown syntax reduced to rendered text.
//
// This is a port of `extract_paragraphs()` / `strip_furniture_blocks()` in
// scripts/narrate-with-timing.py, so a card summary, a read-time estimate, and
// the narration all count the same words. Verified against that extractor
// across every file in the collection (2026-09-12).
//
// Why it exists: the index built its card summaries by dropping <style>/<script>
// and then flattening tags, so every narrated card opened with the player's
// control text ("Listen · ~13 min Narrated 1x 1.25x 1.5x 0:00 --:--") in both
// the visible summary and the search index.
//
// One deliberate divergence from the Python: no frontmatter strip. Astro's
// `entry.body` is already frontmatter-free, and a leading `---` here is a
// section break, not a fence.

const FURNITURE_OPEN = /^<(div|figure|aside)\b|^<(blockquote) class\b/i

// A furniture block starts at a column-0 <div>/<figure>/<aside>/<blockquote
// class=> line and ends at the close tag that balances it, counted per tag name
// (the close may be indented). An unbalanced block is left in place rather than
// consuming the rest of the body. A bare <blockquote> is prose, not furniture.
function stripFurnitureBlocks(text: string): string {
  const lines = text.split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const open = FURNITURE_OPEN.exec(lines[i])
    if (!open) {
      out.push(lines[i])
      i++
      continue
    }

    const tag = (open[1] || open[2]).toLowerCase()
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*?(/?)>`, 'gi')
    let depth = 0
    let j = i
    let balanced = false

    while (j < lines.length) {
      for (const t of lines[j].matchAll(tagRe)) {
        if (t[1]) depth--
        else if (!t[2]) depth++
      }
      j++
      if (depth <= 0) {
        balanced = true
        break
      }
    }

    if (balanced) {
      i = j // drop lines i..j-1: the block and its balancing close
    } else {
      out.push(lines[i])
      i++
    }
  }

  return out.join('\n')
}

// Rendered paragraphs in document order.
export function proseParagraphs(body: string): string[] {
  let text = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')

  text = stripFurnitureBlocks(text)

  // Remaining tags render as inline or invisible: drop the tag, keep inner text.
  text = text.replace(/<[^>\n]+>/g, '')
  // Blockquote markers are markdown syntax, not prose.
  text = text.replace(/^[ \t]{0,3}(?:>[ \t]?)+/gm, '')

  const paras: string[] = []
  for (const block of text.split(/\n\s*\n/)) {
    const trimmed = block.trim()
    if (!trimmed || trimmed === '---') continue
    paras.push(
      trimmed
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/([*_]{1,2})(\S(?:.*?\S)?)\1/g, '$2')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/\s+/g, ' '),
    )
  }
  return paras
}

export function cleanProse(body: string): string {
  return proseParagraphs(body).join(' ')
}

export function proseWordCount(body: string): number {
  const prose = cleanProse(body)
  return prose ? prose.split(/\s+/).length : 0
}

// 200 wpm, the conventional silent-reading rate. Floor of 1 minute.
export function readMinutes(body: string): number {
  return Math.max(1, Math.round(proseWordCount(body) / 200))
}

// Card and feed summaries: clean prose cut at a word boundary. The CSS line
// clamp does the visible truncation, so no ellipsis is appended.
export function summarize(body: string, maxChars: number): string {
  const prose = cleanProse(body)
  if (prose.length <= maxChars) return prose
  return prose.slice(0, maxChars).replace(/\s+\S*$/, '')
}
