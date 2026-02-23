#!/usr/bin/env node
/**
 * split-to-markdown.mjs
 *
 * Converts codex.json (48 entries) + 3 legacy mock essays
 * into individual Markdown files for Astro Content Collections.
 *
 * Output: src/content/transmissions/NNN-slug.md
 *
 * Usage: node scripts/split-to-markdown.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CODEX_PATH = join(ROOT, '..', 'travisbreaks-site', 'data', 'codex.json')
const OUTPUT_DIR = join(ROOT, 'src', 'content', 'transmissions')

// --- Curated tag channels (Gemini's recommendation: ~10 high-signal categories) ---
const TAG_MAP = {
  // Map keywords in title/summary to curated channels
  grief: 'grief',
  loss: 'grief',
  pain: 'grief',
  suffer: 'grief',
  trauma: 'systems',
  somatic: 'systems',
  body: 'systems',
  biology: 'systems',
  breath: 'systems',
  consciousness: 'void',
  'altered state': 'void',
  enlightenment: 'void',
  mystical: 'void',
  prayer: 'void',
  theology: 'void',
  sacred: 'void',
  oracle: 'void',
  spiritual: 'void',
  AI: 'signal',
  model: 'signal',
  algorithm: 'signal',
  machine: 'signal',
  prompt: 'signal',
  'latent space': 'signal',
  interface: 'protocol',
  brutalism: 'protocol',
  design: 'protocol',
  UI: 'protocol',
  pixel: 'protocol',
  brand: 'protocol',
  music: 'sonic',
  sound: 'sonic',
  sonic: 'sonic',
  distortion: 'sonic',
  frequency: 'sonic',
  bass: 'sonic',
  audio: 'sonic',
  track: 'sonic',
  tempo: 'sonic',
  metronome: 'sonic',
  identity: 'self',
  persona: 'self',
  mask: 'self',
  self: 'self',
  voice: 'self',
  becoming: 'self',
  system: 'systems',
  infrastructure: 'systems',
  load: 'systems',
  energy: 'systems',
  power: 'systems',
  control: 'systems',
  ethics: 'systems',
  trust: 'systems',
  risk: 'systems',
  draft: 'process',
  archive: 'process',
  deletion: 'process',
  prune: 'process',
  patch: 'process',
  practice: 'process',
  ritual: 'process',
  intention: 'process',
  simulation: 'worlds',
  festival: 'worlds',
  mythology: 'worlds',
  world: 'worlds',
  island: 'worlds',
  nomadic: 'worlds',
  liminal: 'worlds',
}

// The 10 curated channels
const CHANNELS = ['grief', 'void', 'signal', 'protocol', 'sonic', 'self', 'systems', 'process', 'worlds']

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function assignTags(title, summary, keyQuote) {
  const text = `${title} ${summary} ${keyQuote}`.toLowerCase()
  const matched = new Set()

  for (const [keyword, channel] of Object.entries(TAG_MAP)) {
    if (text.includes(keyword.toLowerCase())) {
      matched.add(channel)
    }
  }

  // Every transmission gets at least one tag
  if (matched.size === 0) matched.add('signal')

  return [...matched].sort()
}

function formatDate(dateStr, year, month) {
  // "2025.12" -> "2025-12-01"
  if (year && month) {
    return `${year}-${String(month).padStart(2, '0')}-01`
  }
  const [y, m] = dateStr.split('.')
  return `${y}-${m.padStart(2, '0')}-01`
}

function entryToMarkdown(entry, index) {
  const slug = generateSlug(entry.title)
  const tags = assignTags(entry.title, entry.summary, entry.key_quote)
  const date = formatDate(entry.date, entry.year, entry.month)
  const paddedId = String(entry.id).padStart(3, '0')
  const filename = `${paddedId}-${slug}.md`

  const frontmatter = [
    '---',
    `title: "${entry.title}"`,
    `date: ${date}`,
    `confidence: ${entry.confidence}`,
    `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`,
    `key_quote: "${entry.key_quote.replace(/"/g, '\\"')}"`,
    `source_platform: "chatgpt"`,
    `id: ${entry.id}`,
    '---',
  ].join('\n')

  // Body: summary as the main content
  // Short entries get the summary as a paragraph — will grow longer via pipeline
  const body = entry.summary

  return { filename, content: `${frontmatter}\n\n${body}\n` }
}

function mockEssayToMarkdown(essay, id) {
  const slug = generateSlug(essay.title)
  const tags = essay.tags || []
  const date = essay.date || '2026-01-05'
  const paddedId = String(id).padStart(3, '0')
  const filename = `${paddedId}-${slug}.md`

  // Extract first sentence as key_quote if not provided
  const keyQuote = essay.excerpt || essay.content.split('\n')[0]

  const frontmatter = [
    '---',
    `title: "${essay.title}"`,
    `date: ${date}`,
    `confidence: 99`,
    `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`,
    `key_quote: "${keyQuote.replace(/"/g, '\\"')}"`,
    `source_platform: "chatgpt"`,
    `id: ${id}`,
    '---',
  ].join('\n')

  return { filename, content: `${frontmatter}\n\n${essay.content}\n` }
}

// --- The 3 mock essays from figma-contribution/src/app/App.tsx ---
const MOCK_ESSAYS = [
  {
    title: 'THOUGHTCRIMES: Digital Brutalism & The Void Protocol',
    content: `The interface is not a window. It's a scar.

Every pixel, every glyph, every geometric cut on this screen is a deliberate act of violence against the smooth, frictionless future they promised us. We were told technology would erase boundaries, but what we got was a suffocating gloss—rounded corners that infantilize, shadows that fake depth, animations that condescend.

The Void Protocol rejects this.

We build in the void because the void is honest. It doesn't pretend to be friendly. It doesn't hide its seams. The grain you see isn't a bug; it's the fingerprint of a machine that refuses to lie about being a machine.

This is digital brutalism. Not the brutalism of concrete slabs and Soviet megastructures, but the brutalism of terminal windows at 3 AM, of text files that refuse to be "user-friendly," of code that doesn't care if you're comfortable.

The UI scars when you click too hard. That's intentional. Your violence leaves a mark. Your presence is recorded. The system doesn't just respond; it reacts, it remembers, it bears witness.

This isn't nostalgia for old technology. This is a rejection of new lies.`,
    excerpt: "The interface is not a window. It's a scar.",
    tags: ['protocol', 'void'],
    date: '2026-01-05',
  },
  {
    title: 'THE SOMATIC ARCHITECTURE',
    content: `Pain leaves traces in the body. So does interaction.

The "somatic scars" aren't metaphor—they're function. When you hover, when you click, when you drag across this interface, you're not just consuming content. You're performing a ritual. Every gesture is a wound that heals slowly, mathematically.

The gold slashes that appear on violent interaction fade with opacity decay at v * 0.94 per frame. This isn't arbitrary. It's the rate at which adrenaline leaves the bloodstream. The UI breathes with your nervous system.

We don't want smooth. We want visceral. We don't want invisible. We want accountable.

Your clicks have weight. Your scrolls have momentum. The camera doesn't glide—it flies. The sphere doesn't spin—it warps under frequency pressure from the bass line.

This is somatic design: the interface as a body that reacts to trauma.`,
    excerpt: 'Pain leaves traces in the body. So does interaction.',
    tags: ['systems', 'protocol'],
    date: '2026-01-06',
  },
  {
    title: 'WEB AUDIO API INTEGRATION NOTES',
    content: `Technical notes for implementing the frequency-reactive sphere:

- Use Web Audio API analyser node
- 32-segment icosphere geometry in Three.js
- Bass frequencies (20-250Hz) mapped to vertex displacement
- Real-time FFT analysis at 60fps
- Normalize frequency data to prevent clipping

TODO:
- Add envelope follower for smoother transitions
- Implement attack/release curves
- Test with different audio formats
- Optimize for mobile performance`,
    excerpt: 'Technical implementation notes for audio-reactive visuals',
    tags: ['sonic', 'process'],
    date: '2026-01-07',
  },
]

// --- Main ---
function main() {
  // Read codex.json
  const raw = readFileSync(CODEX_PATH, 'utf-8')
  const data = JSON.parse(raw)
  const entries = data.codex_entries

  console.log(`[split-to-markdown] Found ${entries.length} codex entries`)
  console.log(`[split-to-markdown] Adding ${MOCK_ESSAYS.length} legacy essays`)

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true })

  let written = 0

  // Convert 48 codex entries
  for (const entry of entries) {
    const { filename, content } = entryToMarkdown(entry)
    writeFileSync(join(OUTPUT_DIR, filename), content)
    written++
  }

  // Convert 3 mock essays (IDs 49-51)
  for (let i = 0; i < MOCK_ESSAYS.length; i++) {
    const id = 49 + i
    const { filename, content } = mockEssayToMarkdown(MOCK_ESSAYS[i], id)
    writeFileSync(join(OUTPUT_DIR, filename), content)
    written++
  }

  console.log(`[split-to-markdown] Wrote ${written} markdown files to ${OUTPUT_DIR}`)

  // Print channel distribution
  const channelCounts = {}
  for (const entry of entries) {
    const tags = assignTags(entry.title, entry.summary, entry.key_quote)
    for (const tag of tags) {
      channelCounts[tag] = (channelCounts[tag] || 0) + 1
    }
  }
  console.log('\n[split-to-markdown] Channel distribution:')
  for (const [channel, count] of Object.entries(channelCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${channel}: ${count}`)
  }
}

main()
