<script setup lang="ts">
import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  CloudSun,
  Code2,
  Construction,
  Database,
  DatabaseBackup,
  FileJson,
  FolderOpen,
  Globe,
  Inbox,
  KeyRound,
  Languages,
  Layers,
  LayoutTemplate,
  Link2,
  ListTree,
  Menu,
  Newspaper,
  Palette,
  Search,
  Server,
  ToggleRight,
  Upload,
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
  extensionsGuide: 'https://cometcms.github.io/CometCMS/guide/extensions',
  extensionExamples: 'https://github.com/CometCMS/CometCMS/tree/main/examples/extensions',
}

const menuOpen = ref(false)
const featuredExtensions = [
  { name: 'Comet Essentials', description: 'Testimonials, pricing, maps, slideshows, stats and more.', category: 'Blocks', version: '1.8.1', icon: Blocks },
  { name: 'Comet ThemePack', description: 'Neo-Brutalism, Industrial, Material and Orbital presets.', category: 'Themes', version: '2.0.0', icon: Palette },
  { name: 'Portfolio', description: 'Project case studies with a field-bound template.', category: 'Content type', version: '1.1.0', icon: BriefcaseBusiness },
  { name: 'Menu Variations', description: 'Pills, tabs, cards and sidebars from your menus.', category: 'Navigation', version: '1.1.0', icon: ListTree },
  { name: 'Fancy Containers', description: 'Geometric forms, soft lights and deep-space skies.', category: 'Layout', version: '1.1.0', icon: Layers },
  { name: 'Weather', description: 'Current weather for a place, via Open-Meteo.', category: 'Data', version: '2.0.0', icon: CloudSun },
] as const
const apiSample = `{ "data": [
  { "title": "Sommer-Atelier",
    "date": "2026-06-12",
    "location": "Studio Nord" },
  … ],
  "meta": { "total": 2 } }`
let revealObserver: IntersectionObserver | undefined

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
  meta: [{ name: 'theme-color', content: '#060a12' }],
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
})

onBeforeUnmount(() => revealObserver?.disconnect())

function closeMenu() {
  menuOpen.value = false
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
      <a href="#features" @click="closeMenu">Features</a>
      <a href="#extensions" @click="closeMenu">Extensions</a>
      <a href="#use-cases" @click="closeMenu">Use Cases</a>
      <a :href="links.docs" target="_blank" rel="noreferrer">Documentation
        <span>↗</span></a>
    </nav>
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

      <div class="hero-visual reveal delay-1"><WorkflowChatDemo /></div>
    </section>

    <section class="overview-band" id="features">
      <div class="overview-title"><div class="section-kicker">A complete CMS</div><h2>All you need<br />to publish.</h2></div>
      <a class="overview-card" href="#content"><span class="overview-icon"><LayoutTemplate :size="26" /></span><div><h3>Page Builder</h3><p>Design templates with sections, columns and field bindings. Editors fill in content while the design stays consistent.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#content"><span class="overview-icon"><Database :size="26" /></span><div><h3>Structured content</h3><p>Content types with custom fields for text, media, relations and dates, saved as plain JSON files.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#headless"><span class="overview-icon"><Code2 :size="26" /></span><div><h3>API &amp; MCP</h3><p>Expose a content type to any frontend, or let an AI agent manage content through the built-in MCP endpoint.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
    </section>

    <section class="intro product-overview" id="extensions">
      <div class="mcp-heading reveal">
        <div><div class="section-kicker">Extensions</div><h2>Add blocks<br /><em>in a few clicks.</em></h2><p>Extend the Page Builder with ZIPs of reusable blocks, content types, components, templates and theme presets. Blocks render on the server, so pages stay fast and cacheable.</p></div>
        <p>Start with Comet Essentials for testimonials, pricing, maps, slideshows and stats, or pick a look from the ThemePack. Writing your own block takes a block.json and an HTML template, with JSON schemas and a CLI to check your work.</p>
      </div>
      <div class="mcp-stage reveal">
        <div class="mcp-steps">
          <div><span><Upload :size="28" /></span><p><strong>Upload</strong>Add an extension ZIP in the admin.</p></div>
          <div><span><ToggleRight :size="28" /></span><p><strong>Review</strong>See every block and item before it installs.</p></div>
          <div><span><Blocks :size="28" /></span><p><strong>Build</strong>New blocks appear in the Page Builder.</p></div>
          <div><span><Palette :size="28" /></span><p><strong>Stay on theme</strong>Blocks follow your site’s colors and fonts.</p></div>
          <div class="mcp-actions"><a class="button primary" :href="links.extensionExamples" target="_blank" rel="noreferrer">Browse extensions <ArrowUpRight :size="16" /></a><a class="button secondary" :href="links.extensionsGuide" target="_blank" rel="noreferrer">Build your own <ArrowUpRight :size="16" /></a></div>
        </div>
        <div class="mcp-showcase" aria-label="Illustration of the CometCMS extension library">
          <div class="floating-service float-github"><Blocks :size="40" /></div>
          <div class="floating-service float-slack"><Palette :size="40" /></div>
          <div class="floating-service float-drive"><LayoutTemplate :size="40" /></div>
          <div class="mcp-browser">
            <div class="mcp-browser-head"><span><img :src="`${assetBase}logo.png`" alt="" /> EXTENSIONS</span></div>
            <div class="mcp-browser-body">
              <aside class="mcp-sidebar"><div class="mcp-search"><Search :size="13" /> Search extensions...</div><b>Installed <small>6</small></b><span>Blocks <small>22</small></span><span>Themes <small>4</small></span><em>INCLUDES</em><span>Content types</span><span>Components</span><span>Templates</span><span>Fonts</span><span class="mcp-custom">＋ Upload ZIP</span></aside>
              <div class="mcp-results"><div class="mcp-results-head"><div><strong>Installed</strong><small>Blocks, presets and starter content for your site.</small></div><span>Name⌄</span></div><div class="mcp-result-grid"><div v-for="extension in featuredExtensions" :key="extension.name" class="mcp-result-card"><div class="mcp-result-title"><span class="mcp-result-icon"><component :is="extension.icon" :size="24" /></span><div><strong>{{ extension.name }}</strong><small>{{ extension.description }}</small></div></div><div class="mcp-result-foot"><span>{{ extension.category }} · v{{ extension.version }}</span><span class="install-label">Enabled</span></div></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="memory-section" id="content">
      <div class="section-kicker reveal">Visual builder, structured content</div>
      <div class="memory-heading reveal">
        <h2>Content that keeps<br /><em>its shape.</em></h2>
        <p>Model your content with custom fields, design how it looks once, and let editors work in a clean form. Everything is saved as plain files you can read, back up and move.</p>
      </div>
      <div class="memory-grid">
        <article class="memory-card memory-docs-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">FILES + BACKUPS</span>
            <h3>Content you can open in any editor.</h3>
            <p>Every entry is a JSON file in the storage folder, so there is no database to provision, migrate or lose. Built-in backups bundle content, media and settings into one archive you can restore from the admin, and deleted entries wait in the trash.</p>
          </div>
          <div class="memory-doc" role="img" aria-label="Illustration of a content entry stored as a JSON file, next to a list of backups">
            <div class="memory-doc-head">
              <span class="memory-doc-path"><FolderOpen :size="14" /> storage / pages / <strong>about.json</strong></span>
              <span class="memory-doc-rev"><CircleCheck :size="12" /> PUBLISHED</span>
            </div>
            <div class="memory-doc-body">
              <div class="memory-doc-text">
                <p class="md-line">{</p>
                <p class="md-line md-key">"title": "About our studio",</p>
                <p class="md-line md-key">"slug": "about",</p>
                <p class="md-line md-key">"status": "published",</p>
                <p class="md-line md-key">"fields": {</p>
                <p class="md-line md-key md-nested">"tagline": "Thoughtful design for people and places",</p>
                <p class="md-line md-key md-nested">"team_size": 6</p>
                <p class="md-line md-key">}</p>
                <p class="md-line">}</p>
              </div>
              <ol class="memory-doc-history">
                <li class="current"><span>BACKUP</span><strong>Before redesign</strong><small>2h ago</small></li>
                <li><span>BACKUP</span><strong>Launch day</strong><small>Yesterday</small></li>
                <li><span>BACKUP</span><strong>New events</strong><small>Monday</small></li>
                <li><span>BACKUP</span><strong>First setup</strong><small>Oct 24</small></li>
              </ol>
            </div>
          </div>
          <div class="memory-card-foot"><span>JSON files</span><span>No database</span><span>Backups</span><span>Restore</span></div>
        </article>
        <article class="memory-card memory-recall-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">LOCALIZATION</span>
            <h3>One design, every language.</h3>
            <p>Share one design across languages, translate builder content and fields, and publish each language at its own URLs, with hreflang and sitemap entries included.</p>
          </div>
          <div class="recall-preview" aria-hidden="true">
            <div class="recall-question"><Languages :size="16" /><span>/about → /de/about</span></div>
            <div class="recall-result"><span><CircleCheck :size="14" /> DE · TRANSLATED</span><strong>Über unser Studio</strong><small>Same template · hreflang linked · in sitemap.xml</small></div>
          </div>
        </article>
        <article class="memory-card memory-dream-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">TEMPLATES</span>
            <h3>Design once, fill in forever.</h3>
            <p>A template owns the layout for every entry of a content type. Editors fill in fields, and a single entry gets its own design only when it needs one.</p>
          </div>
          <div class="dream-preview" aria-hidden="true">
            <div class="dream-preview-head"><LayoutTemplate :size="23" /><span><strong>Template system</strong><small>Shared design, per-entry content</small></span></div>
            <div class="dream-steps">
              <div class="dream-step"><span class="dream-step-icon"><Palette :size="19" /></span><span>Design<br />template</span></div>
              <div class="dream-step"><span class="dream-step-icon"><Link2 :size="19" /></span><span>Bind<br />fields</span></div>
              <div class="dream-step"><span class="dream-step-icon"><Globe :size="19" /></span><span>Publish<br />entries</span></div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="workspace" id="headless">
      <div class="workspace-bg"></div>
      <div class="section-kicker light reveal">Beyond the website</div>
      <div class="workspace-heading reveal"><h2>Your content,<br /><em>wherever it ships.</em></h2><p>Use the built-in website, go headless, or both. Every way in is guarded by the same scoped access tokens.</p></div>
      <div class="remote-grid">
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">API + MCP</span><h3>Talk to your content from anywhere.</h3><p>Feed Next.js, Astro or a mobile app through the REST API with filters, sorting and locales. Or connect your coding agent to the embedded MCP endpoint, written in plain PHP.</p><div class="remote-platforms"><span><img :src="`${assetBase}mcp-icons/claude-code-icon.svg`" alt="" /> Claude Code</span><span><img :src="`${assetBase}mcp-icons/codex-icon.svg`" alt="" /> Codex</span><span><img :src="`${assetBase}mcp-icons/visual-studio-code-icon.svg`" alt="" /> VS Code</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><img :src="`${assetBase}logo.png`" alt="" /></span><div><strong>API explorer</strong><small>northstar-studio · public read</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing preview-code">GET /content/events?locale=de&amp;sort=date</div><div class="preview-message incoming preview-code">{{ apiSample }}</div></div><div class="preview-input">Authorization: Bearer ctcms_… <KeyRound :size="14" /></div></div></article>
        <article class="remote-card remote-schedule reveal"><div class="remote-card-copy"><span class="feature-overline">ACCESS TOKENS</span><h3>Keys that open exactly one door.</h3><p>Scope tokens by action, content type, entry, media category and field. Give a frontend read access to one collection without exposing anything else.</p><div class="schedule-example"><KeyRound :size="20" /><span><strong>Website reader</strong><small>View · content, media · northstar-studio</small></span><CircleCheck :size="18" /></div></div><figure class="remote-schedule-shot"><img :src="`${assetBase}screenshots/api-tokens.png`" alt="CometCMS access tokens screen showing two scoped tokens" loading="lazy" /></figure></article>
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
