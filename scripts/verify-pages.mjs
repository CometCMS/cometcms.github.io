import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const directory = path.resolve(process.argv[2] || '.output/public')
const origin = 'https://cometcms.github.io'
const locales = [
  { code: 'en', route: '/', file: 'index.html', heading: 'Your pages.', ogLocale: 'en_GB' },
  { code: 'de', route: '/de/', file: 'de/index.html', heading: 'Deine Seiten.', ogLocale: 'de_DE' },
]
const english = JSON.parse(await readFile(new URL('../i18n/locales/en.json', import.meta.url), 'utf8'))
const assets = new Set()

for (const locale of locales) {
  const catalog = JSON.parse(await readFile(new URL(`../i18n/locales/${locale.code}.json`, import.meta.url), 'utf8'))
  assert.deepEqual(Object.keys(catalog).sort(), Object.keys(english).sort(), `${locale.code}: translation keys must match English`)
  assert.ok(Object.values(catalog).every(value => typeof value === 'string' && value.trim()), `${locale.code}: translations must not be empty`)

  const html = await readFile(path.join(directory, locale.file), 'utf8')
  assert.match(html, new RegExp(`<html[^>]*lang="${locale.code}"`), `${locale.route}: incorrect document language`)
  assert.ok(html.includes(`<title>${catalog.seoTitle}</title>`), `${locale.route}: missing translated title`)
  assert.ok(html.includes(`<h1>${locale.heading}`), `${locale.route}: missing translated heading`)
  assert.ok(html.includes(`property="og:locale" content="${locale.ogLocale}"`), `${locale.route}: incorrect Open Graph locale`)
  assert.ok(html.includes(`rel="canonical" href="${origin}${locale.route}"`), `${locale.route}: incorrect canonical URL`)
  for (const alternate of locales) {
    assert.ok(html.includes(`rel="alternate" hreflang="${alternate.code}" href="${origin}${alternate.route}"`), `${locale.route}: missing ${alternate.code} alternate`)
    assert.match(html, new RegExp(`<a[^>]*href="${alternate.route}"[^>]*hreflang="${alternate.code}"`), `${locale.route}: missing language switch link`)
  }
  const activeLanguage = html.match(new RegExp(`<a[^>]*hreflang="${locale.code}"[^>]*>`))?.[0] || ''
  assert.ok(activeLanguage.includes('aria-current="page"'), `${locale.route}: active language must be indicated`)
  assert.ok(html.includes(`rel="alternate" hreflang="x-default" href="${origin}/"`), `${locale.route}: missing default alternate`)

  const modules = [...html.matchAll(/<script\b[^>]*\btype="module"[^>]*\bsrc="([^"]+)"/g)]
  assert.ok(modules.length, `${locale.route}: expected a generated Nuxt module script`)
  for (const [, source] of modules) {
    assert.ok(source.startsWith('/_nuxt/'), `Module must load from the organization root: ${source}`)
  }

  // Check browser asset requests, excluding SEO links to HTML pages.
  for (const [tag] of html.matchAll(/<(?:script|link|img|source)\b[^>]*>/g)) {
    if (/\brel="(?:canonical|alternate)"/.test(tag)) continue
    for (const [, reference] of tag.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
      if (reference.startsWith('#')) continue
      const url = new URL(reference, `${origin}${locale.route}`)
      if (url.origin !== origin) continue
      assert.ok(reference.startsWith('/'), `Asset must use a root-relative URL: ${reference}`)
      assets.add(decodeURIComponent(url.pathname))
    }
  }
}

for (const asset of assets) {
  const file = path.resolve(directory, `.${asset}`)
  assert.ok(file.startsWith(`${directory}${path.sep}`), `Asset escapes the output directory: ${asset}`)
  const info = await stat(file).catch(() => null)
  assert.ok(info?.isFile(), `Generated page references a missing asset: ${asset}`)
}

console.log(`Pages verification passed: ${locales.length} translated pages and ${assets.size} assets at organization-root URLs.`)
