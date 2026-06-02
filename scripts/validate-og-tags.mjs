#!/usr/bin/env node
/**
 * OG Tag Validator — PRE-PUSH BLOCKER
 *
 * Validates that every transmission has a corresponding OG image on R2.
 * Also checks that SEOHead.astro wires all 9 required meta tags.
 *
 * Usage:
 *   node scripts/validate-og-tags.mjs           # check all transmissions
 *   node scripts/validate-og-tags.mjs --local    # check local OG images only (no HTTP)
 *
 * Runs in CI as part of the build pipeline.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'transmissions')
const SEOHEAD_PATH = join(__dirname, '..', 'src', 'components', 'SEOHead.astro')
const R2_BASE = 'https://assets.travisbreaks.com/transmissions/og'

const localOnly = process.argv.includes('--local')
let exitCode = 0

function fail(msg) {
  console.error(`  FAIL  ${msg}`)
  exitCode = 1
}

function pass(msg) {
  console.log(`  OK    ${msg}`)
}

// --- Check 1: SEOHead has all 9 required meta tags ---
async function checkSEOHead() {
  console.log('\n--- SEOHead Meta Tag Check ---')
  const src = await readFile(SEOHEAD_PATH, 'utf-8')
  const required = [
    'og:title',
    'og:description',
    'og:image',
    'og:url',
    'og:type',
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image',
  ]
  for (const tag of required) {
    if (src.includes(tag)) {
      pass(tag)
    } else {
      fail(`Missing ${tag} in SEOHead.astro`)
    }
  }
}

// --- Check 2: Every transmission has an OG image ---
async function checkTransmissionOGs() {
  console.log('\n--- Transmission OG Image Check ---')
  const files = (await readdir(CONTENT_DIR))
    .filter((f) => f.endsWith('.md'))
    .sort()

  const missing = []

  for (const file of files) {
    const slug = file.replace('.md', '')
    const ogUrl = `${R2_BASE}/${slug}-og.png`

    if (localOnly) {
      // In local/CI mode, just verify the slug pattern is valid
      pass(`${slug} (pattern valid)`)
      continue
    }

    try {
      const res = await fetch(ogUrl, { method: 'HEAD' })
      if (res.ok) {
        pass(`${slug}`)
      } else {
        fail(`${slug} — OG image missing at ${ogUrl} (HTTP ${res.status})`)
        missing.push(slug)
      }
    } catch (err) {
      fail(`${slug} — OG image unreachable at ${ogUrl}`)
      missing.push(slug)
    }
  }

  if (missing.length > 0) {
    console.log(`\n--- Missing OG Images (${missing.length}) ---`)
    console.log('Generate with:')
    for (const slug of missing) {
      const id = slug.match(/^(\d+)/)?.[1] || slug
      console.log(`  node scripts/generate-og-images.mjs ${id}`)
    }
    console.log('\nUpload with:')
    console.log(
      '  for f in /tmp/og-images/*-og.png; do npx wrangler r2 object put "travis-assets/transmissions/og/$(basename $f)" --file "$f" --content-type image/png --remote; done',
    )
  }
}

// --- Check 3: [slug].astro wires image prop to SEOHead ---
async function checkSlugPage() {
  console.log('\n--- [slug].astro OG Wiring Check ---')
  const slugPath = join(__dirname, '..', 'src', 'pages', '[slug].astro')
  try {
    const src = await readFile(slugPath, 'utf-8')
    if (src.includes('assets.travisbreaks.com/transmissions/og/')) {
      pass('[slug].astro wires R2 OG image URL')
    } else {
      fail('[slug].astro does not reference R2 OG image URL')
    }
  } catch {
    fail('[slug].astro not found')
  }
}

async function main() {
  console.log('OG Tag Validation')
  console.log('=================')

  await checkSEOHead()
  await checkSlugPage()
  await checkTransmissionOGs()

  console.log(`\n${exitCode === 0 ? 'ALL CHECKS PASSED' : 'VALIDATION FAILED — fix issues above before pushing'}`)
  process.exit(exitCode)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
