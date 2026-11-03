<script setup lang="ts">
import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  CalendarDays,
  Code2,
  Construction,
  Database,
  DatabaseBackup,
  FileJson,
  Globe,
  Inbox,
  KeyRound,
  Languages,
  LayoutTemplate,
  Link2,
  ListFilter,
  Menu,
  Moon,
  Newspaper,
  Palette,
  Rocket,
  Search,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Sun,
  Triangle,
  Users,
  Webhook,
  X,
} from '@lucide/vue'

const assetBase = useRuntimeConfig().app.baseURL
const links = {
  download: 'https://github.com/CometCMS/CometCMS/releases/latest',
  releases: 'https://github.com/CometCMS/CometCMS/releases',
  source: 'https://github.com/CometCMS/CometCMS',
  issues: 'https://github.com/CometCMS/CometCMS/issues',
  docs: 'https://cometcms.github.io/CometCMS/',
  websiteGuide: 'https://cometcms.github.io/CometCMS/guide/website',
  extensionExamples: 'https://github.com/CometCMS/CometCMS/tree/main/examples/extensions',
}

const menuOpen = ref(false)
const themeStorageKey = 'cometcms-theme'
const themeColors = { dark: '#060a12', light: '#f6f8fb' }
// Runs before first paint so the stored or system theme never flashes. The
// theme attribute and theme-color meta stay out of useHead so hydration cannot
// reset them; without JavaScript the page keeps the dark base design.
const themeBootstrap = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('${themeStorageKey}')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';d.dataset.theme=t;var m=document.createElement('meta');m.name='theme-color';m.content=t==='light'?'${themeColors.light}':'${themeColors.dark}';document.head.appendChild(m)})()`
const webhookSample = `{ "event": "content.published",
  "occurred_at": "2026-06-02T09:14:00Z",
  "data": { "type": "events",
    "slug": "summer-open-studio" } }`
let revealObserver: IntersectionObserver | undefined
let systemTheme: MediaQueryList | undefined

useSeoMeta({
  title: 'CometCMS — The CMS that fits on any PHP host',
  description: 'CometCMS is a visual page builder and content CMS in a single PHP folder. No database, no Composer, no Node on the server.',
  ogTitle: 'CometCMS — The CMS that fits on any PHP host',
  ogDescription: 'Visual pages, structured content, a headless API and MCP. Upload a ZIP, open /admin, and start building.',
  ogType: 'website',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: `${assetBase}favicon.ico` },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap',
    },
  ],
  script: [{ innerHTML: themeBootstrap, tagPosition: 'head' }],
})

onMounted(() => {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(element => revealObserver?.observe(element))

  systemTheme = matchMedia('(prefers-color-scheme: light)')
  systemTheme.addEventListener('change', followSystemTheme)
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  systemTheme?.removeEventListener('change', followSystemTheme)
})

function closeMenu() {
  menuOpen.value = false
}

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
}

function storedTheme() {
  try {
    return localStorage.getItem(themeStorageKey)
  } catch {
    return null
  }
}

// Until a visitor picks a theme, the page follows the system setting.
function followSystemTheme(event: MediaQueryListEvent) {
  if (!storedTheme()) applyTheme(event.matches ? 'light' : 'dark')
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
  applyTheme(next)
  try {
    localStorage.setItem(themeStorageKey, next)
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this visit.
  }
}
</script>

<template>
  <div class="grain" aria-hidden="true"></div>
  <header class="site-header" :class="{ open: menuOpen }">
    <a class="brand" href="#top" aria-label="CometCMS home">
      <img :src="`${assetBase}logo.png`" alt="" />
      <span>COMET<b>CMS</b></span>
    </a>
    <nav aria-label="Main navigation">
      <a href="#builder" @click="closeMenu">Page Builder</a>
      <a href="#headless" @click="closeMenu">Headless</a>
      <a href="#use-cases" @click="closeMenu">Use Cases</a>
      <a :href="links.docs" target="_blank" rel="noreferrer">Documentation
        <span>↗</span></a>
    </nav>
    <button class="theme-toggle" type="button" aria-label="Switch between light and dark theme" title="Switch theme"
      @click="toggleTheme">
      <Sun class="theme-icon-sun" :size="18" />
      <Moon class="theme-icon-moon" :size="18" />
    </button>
    <a class="nav-cta" :href="links.download">Download
      <ArrowDown :size="14" />
    </a>
    <button class="menu-button" type="button" aria-label="Toggle navigation" :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen">
      <X v-if="menuOpen" :size="22" />
      <Menu v-else :size="22" />
    </button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span> The CMS that fits on any PHP host</div>
        <h1>Your pages.<br />Your content. <br/><em>Your server.</em></h1>
        <p class="hero-lede">CometCMS is a visual page builder and content CMS in a single PHP folder. No database, no Composer, no Node on the server. Upload it to any shared host, open /admin, and start building.</p>
        <div class="hero-actions">
          <a class="button primary" :href="links.download"><span>Download latest release</span>
            <ArrowDown :size="17" />
          </a>
          <a class="button secondary" :href="links.docs" target="_blank"
            rel="noreferrer">Read the docs
            <ArrowUpRight :size="14" />
          </a>
        </div>
        <div class="hero-notes">
          <span><Server :size="23" /><span>PHP 8.2+<small>The only requirement</small></span></span>
          <span><FileJson :size="23" /><span>No database<small>Content stored as JSON</small></span></span>
          <span><LayoutTemplate :size="23" /><span>Visual &amp; headless<small>Builder, API and MCP</small></span></span>
        </div>
      </div>

      <div class="hero-visual reveal delay-1">
        <figure class="mcp-browser builder-shot">
          <div class="mcp-browser-head"><span><img :src="`${assetBase}logo.png`" alt="" /> PAGE BUILDER</span></div>
          <img class="shot-dark" :src="`${assetBase}screenshots/page-builder.webp`" alt="The CometCMS Page Builder editing a landing page, with the element library on the left and the inspector on the right" width="3200" height="2000" loading="lazy" fetchpriority="high" />
          <img class="shot-light" :src="`${assetBase}screenshots/page-builder-light.webp`" alt="The CometCMS Page Builder editing a landing page, with the element library on the left and the inspector on the right" width="3200" height="2000" loading="lazy" fetchpriority="high" />
        </figure>
      </div>
    </section>

    <section class="overview-band" id="features">
      <div class="overview-title"><div class="section-kicker">A complete CMS</div><h2>All you need<br />to publish.</h2></div>
      <a class="overview-card" href="#builder"><span class="overview-icon"><LayoutTemplate :size="26" /></span><div><h3>Page Builder</h3><p>Design pages visually with sections, columns, blocks and field bindings. Editors fill in content while the design stays consistent.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#headless"><span class="overview-icon"><Database :size="26" /></span><div><h3>Headless content</h3><p>Content types with custom fields for text, media, relations and dates, served to any frontend through a JSON API.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#integrations"><span class="overview-icon"><Code2 :size="26" /></span><div><h3>MCP &amp; developer tools</h3><p>Let an AI agent manage content through the built-in MCP endpoint, and build API queries in the admin.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
    </section>

    <section class="intro product-overview" id="builder">
      <div class="mcp-heading reveal">
        <div><div class="section-kicker">Visual Page Builder</div><h2>Design it visually.<br /><em>Publish it instantly.</em></h2><p>What you see on the canvas is what visitors get. Drag in sections and blocks, click any element to edit it, and bind it to your content fields. Pages are rendered by PHP on your server, cached, and ship JavaScript only where a block needs it.</p></div>
        <p>Templates own the design of every entry in a content type, so a new blog post or event looks right the moment it is published. Need more blocks? Extensions add testimonials, pricing, maps, slideshows, stats and theme presets.</p>
      </div>
      <div class="mcp-stage reveal">
        <div class="mcp-steps">
          <div><span><Blocks :size="28" /></span><p><strong>Drag and drop</strong>Sections, columns, blocks and components.</p></div>
          <div><span><Link2 :size="28" /></span><p><strong>Bind your fields</strong>Headings and images pull from your content.</p></div>
          <div><span><Smartphone :size="28" /></span><p><strong>Check every device</strong>Columns and visibility per breakpoint.</p></div>
          <div><span><Languages :size="28" /></span><p><strong>Every language</strong>One design, translated content, own URLs.</p></div>
          <div class="mcp-actions"><a class="button primary" :href="links.websiteGuide" target="_blank" rel="noreferrer">Builder guide <ArrowUpRight :size="16" /></a><a class="button secondary" :href="links.extensionExamples" target="_blank" rel="noreferrer">Extensions <ArrowUpRight :size="16" /></a></div>
        </div>
        <div class="mcp-showcase" aria-label="Screenshot of the CometCMS Page Builder">
          <div class="floating-service float-github"><LayoutTemplate :size="40" /></div>
          <div class="floating-service float-slack"><Palette :size="40" /></div>
          <div class="floating-service float-drive"><Smartphone :size="40" /></div>
          <figure class="mcp-browser builder-shot">
            <div class="mcp-browser-head"><span><img :src="`${assetBase}logo.png`" alt="" /> PAGE BUILDER · TABLET</span></div>
            <img class="shot-dark" :src="`${assetBase}screenshots/page-builder-tablet.webp`" alt="The CometCMS Page Builder in tablet preview, with the page outline on the left and the style options of a selected feature card on the right" width="3200" height="2000" loading="lazy" />
            <img class="shot-light" :src="`${assetBase}screenshots/page-builder-tablet-light.webp`" alt="The CometCMS Page Builder in tablet preview, with the page outline on the left and the style options of a selected feature card on the right" width="3200" height="2000" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="memory-section" id="headless">
      <div class="section-kicker reveal">Headless CMS</div>
      <div class="memory-heading reveal">
        <h2>Custom fields.<br /><em>Any frontend.</em></h2>
        <p>Don’t need a website? Model your content with custom fields, switch on API access and feed Next.js, Astro or a mobile app. Scoped tokens decide exactly who may read or change what.</p>
      </div>
      <div class="memory-grid">
        <article class="memory-card memory-docs-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">CUSTOM FIELDS</span>
            <h3>Model content around your project.</h3>
            <p>Build content types from text, rich text, media, relations, selects, dates, repeaters and more. Every entry is stored as a plain JSON file, so there is no database to set up, migrate or lose.</p>
          </div>
          <figure class="card-shot"><img class="shot-dark" :src="`${assetBase}screenshots/custom-fields.webp`" alt="The custom fields of an Events content type in CometCMS: summary, start date, location, event type, capacity, registration and cover image" width="2560" height="1820" loading="lazy" /><img class="shot-light" :src="`${assetBase}screenshots/custom-fields-light.webp`" alt="The custom fields of an Events content type in CometCMS: summary, start date, location, event type, capacity, registration and cover image" width="2560" height="1820" loading="lazy" /></figure>
          <div class="memory-card-foot"><span>17 field types</span><span>Localized fields</span><span>JSON storage</span><span>OpenAPI</span></div>
        </article>
        <article class="memory-card memory-recall-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">API EXPLORER</span>
            <h3>Build the query, copy the URL.</h3>
            <p>Leave the Page Builder off and serve a content type through the REST API. Pick filters, sorting and a locale in the admin, then copy a ready-to-use URL or curl command.</p>
          </div>
          <figure class="card-shot"><img class="shot-dark" :src="`${assetBase}screenshots/api-explorer.webp`" alt="The CometCMS API explorer building a request for the Events collection" width="2560" height="1620" loading="lazy" /><img class="shot-light" :src="`${assetBase}screenshots/api-explorer-light.webp`" alt="The CometCMS API explorer building a request for the Events collection" width="2560" height="1620" loading="lazy" /></figure>
        </article>
        <article class="memory-card memory-dream-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">SCOPED TOKENS</span>
            <h3>Every key opens one door.</h3>
            <p>Grant tokens by action, content type, entry, media category and field. A booking system can update capacity without touching anything else.</p>
          </div>
          <div class="dream-preview" aria-hidden="true">
            <div class="dream-preview-head"><KeyRound :size="23" /><span><strong>Events editor</strong><small>content.update · events · 2 fields</small></span></div>
            <div class="dream-steps">
              <div class="dream-step"><span class="dream-step-icon"><ShieldCheck :size="19" /></span><span>Choose<br />actions</span></div>
              <div class="dream-step"><span class="dream-step-icon"><Database :size="19" /></span><span>Limit<br />content</span></div>
              <div class="dream-step"><span class="dream-step-icon"><ListFilter :size="19" /></span><span>Allow<br />fields</span></div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="workspace" id="integrations">
      <div class="workspace-bg"></div>
      <div class="section-kicker light reveal">Beyond the admin</div>
      <div class="workspace-heading reveal"><h2>Your content,<br /><em>wherever it ships.</em></h2><p>Let your coding agent manage content over MCP, and keep static frontends fresh with signed webhooks the moment something is published.</p></div>
      <div class="remote-grid">
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">EMBEDDED MCP</span><h3>Let your agent run the CMS.</h3><p>A Streamable HTTP MCP endpoint ships inside the PHP install. Agents can model content types, write entries and edit page layouts, with no Node or extra server.</p><div class="remote-platforms"><span><img :src="`${assetBase}mcp-icons/claude-code-icon.svg`" alt="" /> Claude Code</span><span><img :src="`${assetBase}mcp-icons/codex-icon.svg`" alt="" /> Codex</span><span><img :src="`${assetBase}mcp-icons/visual-studio-code-icon.svg`" alt="" /> VS Code</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><img :src="`${assetBase}logo.png`" alt="" /></span><div><strong>CometCMS MCP</strong><small>northstar-studio · connected</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing">Add a “Type &amp; Color Workshop” on July 9 with 16 seats and close registration.</div><div class="preview-message incoming">Created and published in Events. It shows up in the API and on /events right away.</div></div><div class="preview-input preview-code">POST /mcp/v1/workspaces/northstar-studio <Send :size="14" /></div></div></article>
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">WEBHOOKS</span><h3>Rebuild the moment you publish.</h3><p>Notify any HTTPS endpoint when entries are created, updated, published, unpublished, deleted or restored. Trigger a static site rebuild or sync another system, with every payload signed.</p><div class="remote-platforms"><span><Rocket :size="18" /> Netlify</span><span><Triangle :size="18" /> Vercel</span><span><img class="github-mark" :src="`${assetBase}mcp-icons/github-icon.svg`" alt="" /> GitHub Actions</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><Webhook :size="18" /></span><div><strong>Site rebuild</strong><small>content.published · content.unpublished</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing preview-code">POST /build_hooks/northstar · 200 OK</div><div class="preview-message incoming preview-code">{{ webhookSample }}</div></div><div class="preview-input preview-code">X-CometCMS-Signature: sha256=9f2c… <ShieldCheck :size="14" /></div></div></article>
      </div>
    </section>

    <section class="personalize" id="use-cases">
      <div class="section-kicker reveal">Use cases</div>
      <div class="personal-heading reveal">
        <div class="personal-copy">
          <h2>Make it <em>yours.</em></h2>
        </div>
        <p>Start from the sample website or an empty workspace. Shape content types around your project and publish it as a site, an API, or both.</p>
      </div>
      <div class="personal-feature-grid reveal" aria-label="CometCMS use cases">
        <article>
          <Globe :size="21" /><span>01 / WEBSITES</span>
          <h3>Launch a site on any host.</h3>
          <ul><li>Build landing pages, about pages and menus in the visual builder.</li><li>Share one header, footer and theme across every page.</li></ul>
          <p class="use-case-tools">Page Builder · Themes · Menus</p>
        </article>

        <article>
          <Newspaper :size="21" /><span>02 / BLOGS &amp; NEWS</span>
          <h3>Publish on your schedule.</h3>
          <ul><li>Write posts with rich text, media and categories.</li><li>Schedule publication and list posts with search and pagination.</li></ul>
          <p class="use-case-tools">Rich text · Scheduling · Search</p>
        </article>

        <article>
          <CalendarDays :size="21" /><span>03 / EVENTS &amp; LISTINGS</span>
          <h3>Structure anything.</h3>
          <ul><li>Model events, products or team members with custom fields.</li><li>Filter and sort lists by date, category or any field.</li></ul>
          <p class="use-case-tools">Custom fields · Relations · Lists</p>
        </article>

        <article>
          <Languages :size="21" /><span>04 / MULTILINGUAL</span>
          <h3>Speak every language.</h3>
          <ul><li>Translate builder content and structured fields per locale.</li><li>Give each language its own URLs, with hreflang and sitemap entries.</li></ul>
          <p class="use-case-tools">Locales · hreflang · Sitemap</p>
        </article>

        <article>
          <Code2 :size="21" /><span>05 / HEADLESS</span>
          <h3>Feed any frontend.</h3>
          <ul><li>Expose content types to Next.js, Astro or mobile apps.</li><li>Filter, sort and resolve locales with a clean JSON API.</li></ul>
          <p class="use-case-tools">REST API · OpenAPI · Webhooks</p>
        </article>

        <article>
          <Inbox :size="21" /><span>06 / FORMS</span>
          <h3>Collect submissions.</h3>
          <ul><li>Turn a content type into a form with your own messages.</li><li>Review incoming entries right in the CMS.</li></ul>
          <p class="use-case-tools">Forms · Submissions · Webhooks</p>
        </article>
      </div>
      <div class="personal-extras reveal"><span>THE LITTLE EXTRAS</span><p><Palette :size="16" /> Theme presets</p><p><DatabaseBackup :size="16" /> Backups</p><p><Webhook :size="16" /> Webhooks</p><p><Construction :size="16" /> Maintenance mode</p><p><Search :size="16" /> Site search</p><p><Users :size="16" /> Roles &amp; permissions</p></div>
    </section>

    <section class="cta-section" id="download">
      <div class="cta-inner">
        <div class="cta-copy reveal">
          <div class="eyebrow"><span></span> Start building with CometCMS</div>
          <h2>Your website, live<br /><em>in minutes.</em></h2>
          <p>Download the ZIP, upload it to any PHP host, and finish setup in the browser. No SSH, no CLI, no environment variables.</p>
          <div class="hero-actions"><a class="button primary platform-download"
              :href="links.download"><span>Download latest release</span>
              <ArrowDown :size="17" />
            </a></div>
          <div class="cta-providers">
            <span class="cta-providers-title">Runs where PHP runs</span>
            <ul>
              <li>Shared hosting</li><li>Apache</li>
              <li>Nginx</li><li>Caddy</li>
              <li>VPS</li><li>Local PHP</li>
            </ul>
          </div>
          <div class="download-alternates">
            <span>Or explore</span>
            <a :href="links.source">Source code</a>
            <a :href="links.releases">All releases</a>
          </div>
          <small>Free &amp; open source · Apache 2.0 · No database</small>
        </div>
      </div>
    </section>
  </main>

  <footer><a class="brand" href="#top"><img :src="`${assetBase}logo.png`" alt="" /><span>COMET<b>CMS</b></span></a>
    <p>© 2026 CometCMS. Open source under Apache 2.0</p>
    <div><a :href="links.docs">Documentation</a><a
        :href="links.releases">Releases</a><a
        :href="links.issues">Support</a></div>
  </footer>
</template>
