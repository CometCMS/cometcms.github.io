import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const directory = path.resolve(process.argv[2] || '.output/public')
const html = await readFile(path.join(directory, 'index.html'), 'utf8')
const origin = 'https://cometcms.github.io'
const modules = [...html.matchAll(/<script\b[^>]*\btype="module"[^>]*\bsrc="([^"]+)"/g)]

assert.ok(modules.length, 'Expected a generated Nuxt module script in index.html')
for (const [, source] of modules) {
  assert.ok(source.startsWith('/_nuxt/'), `Module must load from the organization root: ${source}`)
}

// Check the URLs the browser will request, including styles, module preloads,
// images and the Nuxt payload. A missing file would produce a Pages HTML error.
const assets = new Set()
for (const [tag] of html.matchAll(/<(?:script|link|img|source)\b[^>]*>/g)) {
  for (const [, reference] of tag.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    if (reference.startsWith('#')) continue
    const url = new URL(reference, `${origin}/`)
    if (url.origin !== origin) continue
    assert.ok(reference.startsWith('/'), `Asset must use a root-relative URL: ${reference}`)
    assets.add(decodeURIComponent(url.pathname))
  }
}

for (const asset of assets) {
  const file = path.resolve(directory, `.${asset}`)
  assert.ok(file.startsWith(`${directory}${path.sep}`), `Asset escapes the output directory: ${asset}`)
  const info = await stat(file).catch(() => null)
  assert.ok(info?.isFile(), `Generated page references a missing asset: ${asset}`)
}

console.log(`Pages verification passed: ${assets.size} assets exist at their organization-root URLs.`)
