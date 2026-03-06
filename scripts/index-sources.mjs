#!/usr/bin/env node
/**
 * index-sources.mjs
 *
 * Reads the editorial-calendar.json cross-reference and:
 * 1. Writes `source_id` into each transmission's frontmatter (primary conversation UUID)
 * 2. Generates TRANSMISSION-SOURCE-INDEX.md (internal, gitignored)
 *
 * Usage: node travisbreaks-blog/scripts/index-sources.mjs
 * Idempotent: safe to re-run.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BLOG_ROOT = join(__dirname, '..')
const TRANSMISSIONS_DIR = join(BLOG_ROOT, 'src', 'content', 'transmissions')
const CALENDAR_PATH = join(__dirname, '..', '..', '..', 'ChatGPT-data-dump-through-FEB-2026', 'parsed', 'editorial-calendar.json')

// Load editorial calendar
const calendar = JSON.parse(readFileSync(CALENDAR_PATH, 'utf-8'))
const crossRef = calendar.cross_reference

// Build lookup: transmission_id -> cross_reference entry
const refMap = new Map()
for (const entry of crossRef) {
  refMap.set(entry.transmission_id, entry)
}

// Get all transmission files
const files = readdirSync(TRANSMISSIONS_DIR)
  .filter(f => f.endsWith('.md'))
  .sort()

// Track stats
let updated = 0
let skipped = 0
let noSource = 0
const indexRows = []

for (const file of files) {
  const filePath = join(TRANSMISSIONS_DIR, file)
  let content = readFileSync(filePath, 'utf-8')

  // Extract ID from filename
  const numMatch = file.match(/^(\d+)/)
  if (!numMatch) continue
  const id = parseInt(numMatch[1], 10)

  // Extract title from frontmatter
  const titleMatch = content.match(/^title:\s*"(.+)"/m)
  const title = titleMatch ? titleMatch[1] : file

  // Determine status based on line count
  const lineCount = content.split('\n').length
  let status = 'stub'
  if (lineCount > 200) status = 'full'
  else if (lineCount > 30) status = 'expanded'
  if (id === 999) status = 'terminal-test'

  // Get cross-reference data
  const ref = refMap.get(id)
  const sources = ref?.source_conversations || []

  // For 049-055, these are Claude-sourced
  const isClaude = id >= 49 && id <= 55

  // Pick primary source (highest match_strength)
  const primary = sources.length > 0
    ? sources.reduce((a, b) => (b.match_strength || 0) > (a.match_strength || 0) ? b : a)
    : null

  // Update frontmatter with source_id if there's a primary source
  if (primary && id <= 48) {
    const sourceIdLine = `source_id: "${primary.conversation_id}"`

    if (content.match(/^source_id:/m)) {
      // Replace existing
      content = content.replace(/^source_id:.*$/m, sourceIdLine)
    } else {
      // Insert after source_platform line
      content = content.replace(
        /^(source_platform:.*$)/m,
        `$1\n${sourceIdLine}`
      )
    }

    writeFileSync(filePath, content)
    updated++
  } else if (sources.length === 0 && !isClaude && id !== 999) {
    noSource++
  } else {
    skipped++
  }

  // Build index row
  const sourceList = isClaude
    ? '_Claude-sourced_'
    : sources.length > 0
      ? sources.map(s => `${s.title} (\`${s.conversation_id.slice(0, 8)}\`)`).join('; ')
      : '**NONE**'

  indexRows.push({
    id: String(id).padStart(3, '0'),
    title,
    status,
    sourceCount: isClaude ? 'claude' : sources.length,
    sourceList,
    hasDeep: ref?.has_deep_source || false,
  })
}

// Generate index document
const now = new Date().toISOString().split('T')[0]
let indexMd = `# Transmission Source Index

> Internal reference. DO NOT commit. Generated ${now}.
> Re-generate: \`node travisbreaks-blog/scripts/index-sources.mjs\`

## Summary

- **Total transmissions:** ${files.length}
- **With GPT sources:** ${indexRows.filter(r => r.sourceCount !== 'claude' && r.sourceCount > 0).length}
- **Claude-sourced (049-055):** 7
- **No source identified:** ${noSource}
- **Frontmatter updated:** ${updated}

## Full Index

| # | Title | Status | Sources |
|---|-------|--------|---------|
${indexRows.map(r =>
  `| ${r.id} | ${r.title} | ${r.status} | ${r.sourceList} |`
).join('\n')}

## Unsourced Transmissions

These have no GPT conversation mapped. They may be original compositions or need manual sourcing.

${indexRows
  .filter(r => r.sourceCount === 0)
  .map(r => `- **${r.id}**: ${r.title}`)
  .join('\n')}

## Deep Source Transmissions

These have rich, multi-conversation sourcing (10+ matched conversations).

${indexRows
  .filter(r => r.hasDeep)
  .map(r => `- **${r.id}**: ${r.title} (${r.sourceCount} sources)`)
  .join('\n')}
`

writeFileSync(join(BLOG_ROOT, 'TRANSMISSION-SOURCE-INDEX.md'), indexMd)

console.log(`\nDone.`)
console.log(`  Updated frontmatter: ${updated}`)
console.log(`  Skipped (Claude/999/no-source): ${skipped}`)
console.log(`  No source identified: ${noSource}`)
console.log(`  Index written: travisbreaks-blog/TRANSMISSION-SOURCE-INDEX.md`)
