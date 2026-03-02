#!/usr/bin/env node
/**
 * Generate per-post OG images (1200x630) matching PROTOCOL design system.
 * Outputs to /tmp/og-images/ for R2 upload.
 *
 * Usage:
 *   node travisbreaks-blog/scripts/generate-og-images.mjs           # all posts
 *   node travisbreaks-blog/scripts/generate-og-images.mjs 052       # specific post ID
 */
import { chromium } from 'playwright'
import { readdir, readFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'transmissions')
const TEMPLATE = join(__dirname, 'og-template.html')
const OUTPUT_DIR = '/tmp/og-images'

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const fm = {}
  const lines = match[1].split('\n')
  for (const line of lines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.substring(0, colonIdx).trim()
    let val = line.substring(colonIdx + 1).trim()
    // Strip quotes
    val = val.replace(/^["']|["']$/g, '')
    // Parse tags array
    if (key === 'tags') {
      val = val
        .replace(/[\[\]"]/g, '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }
    fm[key] = val
  }
  return fm
}

async function main() {
  const targetId = process.argv[2]
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = (await readdir(CONTENT_DIR))
    .filter((f) => f.endsWith('.md'))
    .sort()

  console.log(
    `Generating OG images for ${targetId ? `post ${targetId}` : `all ${files.length} posts`}...`,
  )

  const browser = await chromium.launch()
  let count = 0

  for (const file of files) {
    if (targetId && !file.startsWith(targetId)) continue

    const raw = await readFile(join(CONTENT_DIR, file), 'utf-8')
    const fm = parseFrontmatter(raw)
    if (!fm) {
      console.log(`  SKIP  ${file} (no frontmatter)`)
      continue
    }

    const slug = file.replace('.md', '')
    const params = new URLSearchParams({
      title: fm.title || '',
      quote: fm.key_quote || '',
      date: fm.date || '',
      tags: Array.isArray(fm.tags) ? fm.tags.join(',') : fm.tags || '',
    })

    const ctx = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 2,
    })
    const page = await ctx.newPage()
    await page.goto(`file://${TEMPLATE}?${params}`, {
      waitUntil: 'networkidle',
    })
    // Wait for Google Fonts to load
    await page.waitForTimeout(1500)

    const outPath = join(OUTPUT_DIR, `${slug}-og.png`)
    await page.screenshot({ path: outPath, type: 'png' })
    console.log(`  OK  ${slug}-og.png`)
    count++
    await ctx.close()
  }

  await browser.close()
  console.log(`\nGenerated ${count} OG images in ${OUTPUT_DIR}`)
  console.log(`\nUpload to R2:`)
  console.log(
    `  for f in ${OUTPUT_DIR}/*-og.png; do wrangler r2 object put "travis-assets/transmissions/og/$(basename $f)" --file "$f" --content-type image/png; done`,
  )
}

main().catch(console.error)
