#!/usr/bin/env node
/**
 * readalong-check.mjs: regression check for the read-along word map.
 *
 * Runs the ACTUAL inline script from src/components/ReadAlong.astro inside a
 * minimal DOM model (no dependencies) and asserts the one property that matters:
 * on any sidecar mismatch the page text is preserved byte-for-byte, and on a
 * match every word is wrapped and the text is still byte-equal.
 *
 * Cases: matching sidecar; mismatching sidecar; sidecar exhausted before the
 * page ends (Sources block); a blockquote with and without stray ">" tokens;
 * then every built page under dist/ that has a public/<slug>.timing.json.
 * Finally, for each such slug with a markdown source, the narration extractor's
 * token stream is compared with the sidecar (the sidecar-to-source contract).
 *
 *   npm run build && node scripts/readalong-check.mjs
 *
 * Exit code 1 on any failure. Added 2026-09-06 after 072's quoted verdict lost
 * its first paragraph on the live page (a ">" token in the sidecar).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const astroSrc = readFileSync(path.join(ROOT, 'src/components/ReadAlong.astro'), 'utf8')
const m = astroSrc.match(/<script is:inline>([\s\S]*?)<\/script>/)
if (!m) throw new Error('ReadAlong.astro: inline script not found')
const SCRIPT = m[1]

// ---------- minimal DOM ----------
class DNode { constructor() { this.parentNode = null } }
class DText extends DNode {
  constructor(t) { super(); this.nodeType = 3; this.textContent = t }
}
class DFragment extends DNode {
  constructor() { super(); this.nodeType = 11; this.childNodes = [] }
  appendChild(n) { n.parentNode = this; this.childNodes.push(n); return n }
}
class DElement extends DNode {
  constructor(tag) {
    super(); this.nodeType = 1; this.tagName = tag.toUpperCase(); this.childNodes = []
    this.className = ''; this._cls = new Set()
    const self = this
    this.classList = {
      add: (c) => self._cls.add(c),
      remove: (c) => self._cls.delete(c),
      contains: (c) => self.hasClass(c),
    }
  }
  hasClass(c) { return this._cls.has(c) || String(this.className).split(/\s+/).includes(c) }
  appendChild(n) {
    if (n instanceof DFragment) { for (const c of n.childNodes) { c.parentNode = this; this.childNodes.push(c) } n.childNodes = []; return n }
    n.parentNode = this; this.childNodes.push(n); return n
  }
  replaceChild(newNode, oldNode) {
    const i = this.childNodes.indexOf(oldNode)
    if (i < 0) throw new Error('replaceChild: not a child')
    const ins = newNode instanceof DFragment ? newNode.childNodes : [newNode]
    for (const c of ins) c.parentNode = this
    this.childNodes.splice(i, 1, ...ins)
    oldNode.parentNode = null
    return oldNode
  }
  get textContent() { return this.childNodes.map((c) => c.textContent).join('') }
  set textContent(t) { const tn = new DText(t); tn.parentNode = this; this.childNodes = [tn] }
  closest(sel) {
    const cls = sel.replace(/^\./, '')
    let e = this
    while (e && e instanceof DElement) { if (e.hasClass(cls)) return e; e = e.parentNode }
    return null
  }
  querySelectorAll(sel) {
    const tag = sel.toUpperCase(); const out = []
    ;(function walk(e) { for (const c of e.childNodes) { if (c instanceof DElement) { if (c.tagName === tag) out.push(c); walk(c) } } })(this)
    return out
  }
  getBoundingClientRect() { return { top: 100, bottom: 120 } }
  scrollIntoView() {}
  addEventListener() {}
}

function makeDocument(contentEl, audioEl) {
  return {
    getElementById: (id) => (id === 'listen-audio' ? audioEl : null),
    querySelector: (sel) => (sel === '.content' ? contentEl : null),
    createTreeWalker: (root) => {
      const list = []
      ;(function walk(e) { for (const c of e.childNodes) { if (c instanceof DText) list.push(c); else if (c instanceof DElement) walk(c) } })(root)
      let i = -1
      return { nextNode() { i++; return i < list.length ? list[i] : null } }
    },
    createDocumentFragment: () => new DFragment(),
    createElement: (t) => new DElement(t),
    createTextNode: (t) => new DText(t),
  }
}

// ---------- tiny HTML parser for the .content subtree of a built page ----------
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ldquo: '\u201c', rdquo: '\u201d', lsquo: '\u2018', rsquo: '\u2019', hellip: '\u2026', mdash: '\u2014', ndash: '\u2013', middot: '\u00b7', larr: '\u2190', rarr: '\u2192' }
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
    return Object.prototype.hasOwnProperty.call(ENT, e) ? ENT[e] : all
  })
}
const VOID = new Set(['br', 'img', 'hr', 'source', 'input', 'meta', 'link', 'path', 'wbr'])
function parseHtml(html) {
  const root = new DElement('div'); root.className = 'root'
  const stack = [root]
  const re = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g
  let t
  while ((t = re.exec(html))) {
    if (t[0].startsWith('<!--')) continue
    if (t[1]) { // close tag
      const name = t[1].toUpperCase()
      for (let i = stack.length - 1; i > 0; i--) { if (stack[i].tagName === name) { stack.length = i; break } }
      continue
    }
    if (t[2]) { // open tag
      const name = t[2].toLowerCase()
      if (name === 'script' || name === 'style') { // raw text: skip to the closing tag
        const close = html.indexOf('</' + name, re.lastIndex)
        re.lastIndex = close < 0 ? html.length : close
        continue
      }
      const el = new DElement(name)
      const cm = /class\s*=\s*"([^"]*)"/.exec(t[3] || '')
      if (cm) el.className = cm[1]
      stack[stack.length - 1].appendChild(el)
      if (!VOID.has(name) && !/\/\s*$/.test(t[3] || '')) stack.push(el)
      continue
    }
    if (t[4]) stack[stack.length - 1].appendChild(new DText(decode(t[4])))
  }
  return root
}
function contentFromBuiltPage(html) {
  const open = /<div class="content[^"]*"[^>]*>/.exec(html)   // Astro appends data-astro-cid-* to the tag
  const start = open ? open.index : -1
  if (start < 0) throw new Error('no .content div in page')
  // walk forward to the matching </div>
  let depth = 0, i = start
  const re = /<div\b|<\/div>/g
  re.lastIndex = start
  let t
  while ((t = re.exec(html))) {
    if (t[0] === '<div') depth++
    else { depth--; if (depth === 0) { i = re.lastIndex; break } }
  }
  const root = parseHtml(html.slice(start, i))
  return root.childNodes.find((c) => c instanceof DElement)
}

// ---------- run one case ----------
async function runCase(label, contentEl, sidecarWords, expectAccept) {
  const ps = contentEl.querySelectorAll('p').filter((p) => !p.closest('.listen-player'))
  const before = ps.map((p) => p.textContent)
  const audio = { paused: true, currentTime: 0, addEventListener() {} }
  const document = makeDocument(contentEl, audio)
  const warnings = []
  const fakeConsole = { warn: (...a) => warnings.push(a.join(' ')), log() {}, error() {} }
  const windowStub = { addEventListener() {}, matchMedia: () => ({ matches: false }), innerHeight: 800 }
  const fetchStub = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ version: 1, words: sidecarWords }) })
  const fn = new Function('document', 'window', 'location', 'fetch', 'NodeFilter', 'requestAnimationFrame', 'console', SCRIPT)
  fn(document, windowStub, { pathname: '/transmissions/' + label + '/' }, fetchStub, { SHOW_TEXT: 4 }, () => {}, fakeConsole)
  for (let k = 0; k < 5; k++) await new Promise((r) => setImmediate(r))
  const after = ps.map((p) => p.textContent)
  const preserved = before.every((b, i) => b === after[i])
  const wrapped = contentEl.querySelectorAll('span').filter((s) => s.hasClass('ra-w')).length
  const accepted = warnings.length === 0 && wrapped > 0
  // expectAccept === null: acceptance is not asserted (untracked, undeployed sidecar); preservation still is
  const okCase = preserved && (expectAccept === null || accepted === expectAccept)
  const tag = okCase ? (expectAccept === null && !accepted ? 'WARN' : 'OK  ') : 'FAIL'
  console.log(`${tag} ${label}: preserved=${preserved} accepted=${accepted} (expected ${expectAccept === null ? 'any' : expectAccept}) wrapped=${wrapped}${warnings.length ? ' warn=' + warnings[0] : ''}`)
  if (!preserved) {
    before.forEach((b, i) => { if (b !== after[i]) console.log(`      p[${i}] before: ${JSON.stringify(b.slice(0, 80))}\n      p[${i}] after:  ${JSON.stringify(after[i].slice(0, 80))}`) })
  }
  return okCase
}
const toWords = (s) => s.split(/\s+/).filter(Boolean).map((w) => ({ w, s: 0, e: 0 }))

let failures = 0
const check = async (...a) => { if (!(await runCase(...a))) failures++ }

// synthetic cases
await check('matching', parseHtml('<div class="content"><p>Keep every word.</p></div>').childNodes[0], toWords('Keep every word.'), true)
await check('mismatching', parseHtml('<div class="content"><p>Keep every word.</p></div>').childNodes[0], toWords('Keep different word.'), false)
await check('inline-link-punctuation', parseHtml('<div class="content"><p>See <a href="/x">Rocket</a>. Then <em>more</em> text.</p></div>').childNodes[0], toWords('See Rocket. Then more text.'), true)
await check('exhausted-tail', parseHtml('<div class="content"><p>First paragraph here.</p><p><strong>Sources</strong> not narrated.</p></div>').childNodes[0], toWords('First paragraph here.'), true)
const bq = '<div class="content"><p>Verdict, inside baseball and all:</p><blockquote><p>Round 2 banked to canon.</p><p>The bonus is the finding.</p></blockquote><p>After the quote.</p></div>'
await check('blockquote-with-stray-markers', parseHtml(bq).childNodes[0], toWords('Verdict, inside baseball and all: > Round 2 banked to canon. > > The bonus is the finding. After the quote.'), false)
await check('blockquote-clean', parseHtml(bq).childNodes[0], toWords('Verdict, inside baseball and all: Round 2 banked to canon. The bonus is the finding. After the quote.'), true)

// live pages: every built page with a local sidecar
const dist = path.join(ROOT, 'dist')
const pub = path.join(ROOT, 'public')
const slugs = existsSync(dist) ? readdirSync(dist).filter((d) => existsSync(path.join(dist, d, 'index.html')) && existsSync(path.join(pub, d + '.timing.json'))) : []
if (!slugs.length) console.log('(no dist/<slug>/index.html + public/<slug>.timing.json pairs found; run npm run build)')
// Every sidecar under public/ ships with a working-tree deploy (git tracking is
// not a deployment boundary: the untracked 049 experiment went live 2026-09-06),
// so every sidecar MUST map. The only exemption is an explicit, documented one:
// a slug listed in scripts/readalong-unsupported.txt is checked for text
// preservation only.
const unsupportedFile = path.join(ROOT, 'scripts/readalong-unsupported.txt')
const unsupported = new Set(existsSync(unsupportedFile)
  ? readFileSync(unsupportedFile, 'utf8').split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean)
  : [])
if (!slugs.length) { failures++; console.log('FAIL no dist/<slug>/index.html + public/<slug>.timing.json pairs: run npm run build first') }
for (const slug of slugs) {
  const html = readFileSync(path.join(dist, slug, 'index.html'), 'utf8')
  const sidecar = JSON.parse(readFileSync(path.join(pub, slug + '.timing.json'), 'utf8'))
  const exempt = unsupported.has(slug)
  await check('live:' + slug + (exempt ? ' (documented unsupported experiment: preservation only)' : ''), contentFromBuiltPage(html), sidecar.words, exempt ? null : true)
  if (sidecar.slug && sidecar.slug !== slug) { failures++; console.log(`FAIL identity:${slug}: sidecar declares slug ${JSON.stringify(sidecar.slug)}`) }
}

// extractor parity: sidecar tokens vs the narration extractor's token stream
const extractor = path.join(ROOT, 'scripts/narrate-with-timing.py')
for (const slug of slugs) {
  const md = path.join(ROOT, 'src/content/transmissions', slug + '.md')
  if (!existsSync(md)) continue
  const sidecar = JSON.parse(readFileSync(path.join(pub, slug + '.timing.json'), 'utf8'))
  const py = `
import importlib.util, json, sys, hashlib
from pathlib import Path
spec = importlib.util.spec_from_file_location('nwt', ${JSON.stringify(extractor)})
mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
secs = mod.extract_sections(Path(${JSON.stringify(md)}), stop_at_sources=True)
paras = [p for s in secs for p in s]
print(json.dumps({"tokens": " ".join(paras).split(), "sha": hashlib.sha256("\\n\\n".join(paras).encode()).hexdigest()}))
`
  let out
  try { out = JSON.parse(execFileSync('python3', ['-c', py], { encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' } })) } catch (e) { failures++; console.log(`FAIL parity:${slug}: extractor did not run: ${String(e.message).split('\n')[0]}`); continue }
  const got = sidecar.words.map((w) => w.w)
  const exp = out.tokens
  let i = 0
  while (i < got.length && i < exp.length && got[i] === exp[i]) i++
  const equal = i === got.length && i === exp.length
  const hashOk = sidecar.source_sha256 ? sidecar.source_sha256 === out.sha : null
  const hashNote = hashOk === null ? 'hash=absent(pre-2026-09-06 sidecar)' : (hashOk ? 'hash=match' : 'hash=MISMATCH')
  // A declared source hash is a contract: a mismatch fails, whatever the tokens say.
  // Token parity is a hard contract for sidecars that declare their source;
  // older sidecars report DIFF as information (their pipeline predates the
  // extractor, e.g. 1002's figure captions).
  const bad = hashOk === false || (!equal && sidecar.source_sha256)
  console.log(`${bad ? 'FAIL' : (equal ? 'OK  ' : 'DIFF')} parity:${slug}: sidecar ${got.length} tokens vs extractor ${exp.length}; ${hashNote}${equal ? '' : `; first divergence at ${i}: sidecar ${JSON.stringify(got.slice(i, i + 3))} extractor ${JSON.stringify(exp.slice(i, i + 3))}`}`)
  if (bad) failures++
}

console.log(failures ? `\n${failures} failure(s)` : '\nall read-along checks passed')
process.exit(failures ? 1 : 0)
