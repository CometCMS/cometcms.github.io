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

import { messages, locales, type Locale } from '~/i18n'

const props = defineProps<{ locale: Locale }>()
const t = computed(() => messages[props.locale])
const route = useRoute()
const mounted = ref(false)
const siteOrigin = 'https://cometcms.github.io'
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
  title: () => t.value.seoTitle,
  description: () => t.value.seoDescription,
  ogTitle: () => t.value.seoTitle,
  ogDescription: () => t.value.seoOgDescription,
  ogType: 'website',
  ogLocale: () => locales[props.locale].ogLocale,
  ogUrl: () => `${siteOrigin}${assetBase}${locales[props.locale].path}`,
})

useHead(() => ({
  htmlAttrs: { lang: props.locale },
  link: [
    { rel: 'canonical', href: `${siteOrigin}${assetBase}${locales[props.locale].path}` },
    ...Object.entries(locales).map(([locale, config]) => ({
      rel: 'alternate' as const, hreflang: locale, href: `${siteOrigin}${assetBase}${config.path}`,
    })),
    { rel: 'alternate', hreflang: 'x-default', href: `${siteOrigin}${assetBase}` },
    { rel: 'icon', href: `${assetBase}favicon.ico` },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap',
    },
  ],
  script: [{ innerHTML: themeBootstrap, tagPosition: 'head' }],
}))

onMounted(() => {
  mounted.value = true
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
    <a class="brand" href="#top" :aria-label="t.homeLabel">
      <img :src="`${assetBase}logo.png`" alt="" />
      <span>COMET<b>CMS</b></span>
    </a>
    <nav :aria-label="t.navigationLabel">
      <a href="#builder" @click="closeMenu">{{ t.navBuilder }}</a>
      <a href="#headless" @click="closeMenu">{{ t.navHeadless }}</a>
      <a href="#use-cases" @click="closeMenu">{{ t.navUseCases }}</a>
      <a :href="links.docs" target="_blank" rel="noreferrer">{{ t.navDocs }}
        <span>↗</span></a>
    </nav>
    <div class="language-switcher" role="group" :aria-label="t.languageLabel">
      <NuxtLink v-for="(language, code) in locales" :key="code"
        :to="{ path: `/${language.path}`, hash: mounted ? route.hash : '' }"
        :lang="code" :hreflang="code" :title="language.name"
        :aria-label="language.name" :aria-current="locale === code ? 'page' : undefined"
        @click="closeMenu">{{ language.label }}</NuxtLink>
    </div>
    <button class="theme-toggle" type="button" :aria-label="t.themeLabel" :title="t.themeTitle"
      @click="toggleTheme">
      <Sun class="theme-icon-sun" :size="18" />
      <Moon class="theme-icon-moon" :size="18" />
    </button>
    <a class="nav-cta" :href="links.download">{{ t.download }}
      <ArrowDown :size="14" />
    </a>
    <button class="menu-button" type="button" :aria-label="t.menuLabel" :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen">
      <X v-if="menuOpen" :size="22" />
      <Menu v-else :size="22" />
    </button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span> {{ t.heroEyebrow }}</div>
        <h1>{{ t.heroTitlePages }}<br />{{ t.heroTitleContent }} <br/><em>{{ t.heroTitleServer }}</em></h1>
        <p class="hero-lede">{{ t.heroDescription }}</p>
        <div class="hero-actions">
          <a class="button primary" :href="links.download"><span>{{ t.downloadLatest }}</span>
            <ArrowDown :size="17" />
          </a>
          <a class="button secondary" :href="links.docs" target="_blank"
            rel="noreferrer">{{ t.readDocs }}
            <ArrowUpRight :size="14" />
          </a>
        </div>
        <div class="hero-notes">
          <span><Server :size="23" /><span>PHP 8.2+<small>{{ t.onlyRequirement }}</small></span></span>
          <span><FileJson :size="23" /><span>{{ t.noDatabase }}<small>{{ t.jsonContent }}</small></span></span>
          <span><LayoutTemplate :size="23" /><span>{{ t.visualHeadless }}<small>{{ t.builderApiMcp }}</small></span></span>
        </div>
      </div>

      <div class="hero-visual reveal delay-1">
        <figure class="mcp-browser builder-shot">
          <div class="mcp-browser-head"><span><img :src="`${assetBase}logo.png`" alt="" /> {{ t.builderCaption }}</span></div>
          <img class="shot-dark" :src="`${assetBase}screenshots/page-builder.webp`" :alt="t.builderAlt" width="3200" height="2000" loading="lazy" fetchpriority="high" />
          <img class="shot-light" :src="`${assetBase}screenshots/page-builder-light.webp`" :alt="t.builderAlt" width="3200" height="2000" loading="lazy" fetchpriority="high" />
        </figure>
      </div>
    </section>

    <section class="overview-band" id="features">
      <div class="overview-title"><div class="section-kicker">{{ t.overviewKicker }}</div><h2>{{ t.overviewTitleStart }}<br />{{ t.overviewTitleEnd }}</h2></div>
      <a class="overview-card" href="#builder"><span class="overview-icon"><LayoutTemplate :size="26" /></span><div><h3>{{ t.navBuilder }}</h3><p>{{ t.overviewBuilder }}</p><span class="card-link">{{ t.learnMore }} <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#headless"><span class="overview-icon"><Database :size="26" /></span><div><h3>{{ t.overviewHeadlessTitle }}</h3><p>{{ t.overviewHeadless }}</p><span class="card-link">{{ t.learnMore }} <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#integrations"><span class="overview-icon"><Code2 :size="26" /></span><div><h3>{{ t.overviewMcpTitle }}</h3><p>{{ t.overviewMcp }}</p><span class="card-link">{{ t.learnMore }} <ArrowUpRight :size="15" /></span></div></a>
    </section>

    <section class="intro product-overview" id="builder">
      <div class="mcp-heading reveal">
        <div><div class="section-kicker">{{ t.builderKicker }}</div><h2>{{ t.builderTitleStart }}<br /><em>{{ t.builderTitleEnd }}</em></h2><p>{{ t.builderDescription }}</p></div>
        <p>{{ t.builderTemplates }}</p>
      </div>
      <div class="mcp-stage reveal">
        <div class="mcp-steps">
          <div><span><Blocks :size="28" /></span><p><strong>{{ t.dragDrop }}</strong>{{ t.dragDropDescription }}</p></div>
          <div><span><Link2 :size="28" /></span><p><strong>{{ t.bindFields }}</strong>{{ t.bindFieldsDescription }}</p></div>
          <div><span><Smartphone :size="28" /></span><p><strong>{{ t.checkDevices }}</strong>{{ t.checkDevicesDescription }}</p></div>
          <div><span><Languages :size="28" /></span><p><strong>{{ t.everyLanguage }}</strong>{{ t.everyLanguageDescription }}</p></div>
          <div class="mcp-actions"><a class="button primary" :href="links.websiteGuide" target="_blank" rel="noreferrer">{{ t.builderGuide }} <ArrowUpRight :size="16" /></a><a class="button secondary" :href="links.extensionExamples" target="_blank" rel="noreferrer">{{ t.extensions }} <ArrowUpRight :size="16" /></a></div>
        </div>
        <div class="mcp-showcase" :aria-label="t.builderScreenshotLabel">
          <div class="floating-service float-github"><LayoutTemplate :size="40" /></div>
          <div class="floating-service float-slack"><Palette :size="40" /></div>
          <div class="floating-service float-drive"><Smartphone :size="40" /></div>
          <figure class="mcp-browser builder-shot">
            <div class="mcp-browser-head"><span><img :src="`${assetBase}logo.png`" alt="" /> {{ t.tabletCaption }}</span></div>
            <img class="shot-dark" :src="`${assetBase}screenshots/page-builder-tablet.webp`" :alt="t.tabletAlt" width="3200" height="2000" loading="lazy" />
            <img class="shot-light" :src="`${assetBase}screenshots/page-builder-tablet-light.webp`" :alt="t.tabletAlt" width="3200" height="2000" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section class="memory-section" id="headless">
      <div class="section-kicker reveal">{{ t.headlessKicker }}</div>
      <div class="memory-heading reveal">
        <h2>{{ t.headlessTitleStart }}<br /><em>{{ t.headlessTitleEnd }}</em></h2>
        <p>{{ t.headlessDescription }}</p>
      </div>
      <div class="memory-grid">
        <article class="memory-card memory-docs-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">{{ t.fieldsKicker }}</span>
            <h3>{{ t.fieldsTitle }}</h3>
            <p>{{ t.fieldsDescription }}</p>
          </div>
          <figure class="card-shot"><img class="shot-dark" :src="`${assetBase}screenshots/custom-fields.webp`" :alt="t.fieldsAlt" width="2560" height="1820" loading="lazy" /><img class="shot-light" :src="`${assetBase}screenshots/custom-fields-light.webp`" :alt="t.fieldsAlt" width="2560" height="1820" loading="lazy" /></figure>
          <div class="memory-card-foot"><span>{{ t.fieldTypes }}</span><span>{{ t.localizedFields }}</span><span>{{ t.jsonStorage }}</span><span>OpenAPI</span></div>
        </article>
        <article class="memory-card memory-recall-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">{{ t.apiKicker }}</span>
            <h3>{{ t.apiTitle }}</h3>
            <p>{{ t.apiDescription }}</p>
          </div>
          <figure class="card-shot"><img class="shot-dark" :src="`${assetBase}screenshots/api-explorer.webp`" :alt="t.apiAlt" width="2560" height="1620" loading="lazy" /><img class="shot-light" :src="`${assetBase}screenshots/api-explorer-light.webp`" :alt="t.apiAlt" width="2560" height="1620" loading="lazy" /></figure>
        </article>
        <article class="memory-card memory-dream-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">{{ t.tokensKicker }}</span>
            <h3>{{ t.tokensTitle }}</h3>
            <p>{{ t.tokensDescription }}</p>
          </div>
          <div class="dream-preview" aria-hidden="true">
            <div class="dream-preview-head"><KeyRound :size="23" /><span><strong>{{ t.eventsEditor }}</strong><small>{{ t.tokenScope }}</small></span></div>
            <div class="dream-steps">
              <div class="dream-step"><span class="dream-step-icon"><ShieldCheck :size="19" /></span><span>{{ t.choose }}<br />{{ t.actions }}</span></div>
              <div class="dream-step"><span class="dream-step-icon"><Database :size="19" /></span><span>{{ t.limit }}<br />{{ t.content }}</span></div>
              <div class="dream-step"><span class="dream-step-icon"><ListFilter :size="19" /></span><span>{{ t.allow }}<br />{{ t.fields }}</span></div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="workspace" id="integrations">
      <div class="workspace-bg"></div>
      <div class="section-kicker light reveal">{{ t.integrationsKicker }}</div>
      <div class="workspace-heading reveal"><h2>{{ t.integrationsTitleStart }}<br /><em>{{ t.integrationsTitleEnd }}</em></h2><p>{{ t.integrationsDescription }}</p></div>
      <div class="remote-grid">
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">{{ t.mcpKicker }}</span><h3>{{ t.mcpTitle }}</h3><p>{{ t.mcpDescription }}</p><div class="remote-platforms"><span><img :src="`${assetBase}mcp-icons/claude-code-icon.svg`" alt="" /> Claude Code</span><span><img :src="`${assetBase}mcp-icons/codex-icon.svg`" alt="" /> Codex</span><span><img :src="`${assetBase}mcp-icons/visual-studio-code-icon.svg`" alt="" /> VS Code</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><img :src="`${assetBase}logo.png`" alt="" /></span><div><strong>CometCMS MCP</strong><small>{{ t.mcpConnected }}</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing">{{ t.mcpRequest }}</div><div class="preview-message incoming">{{ t.mcpResponse }}</div></div><div class="preview-input preview-code">POST /mcp/v1/workspaces/northstar-studio <Send :size="14" /></div></div></article>
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">{{ t.webhooksKicker }}</span><h3>{{ t.webhooksTitle }}</h3><p>{{ t.webhooksDescription }}</p><div class="remote-platforms"><span><Rocket :size="18" /> Netlify</span><span><Triangle :size="18" /> Vercel</span><span><img class="github-mark" :src="`${assetBase}mcp-icons/github-icon.svg`" alt="" /> GitHub Actions</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><Webhook :size="18" /></span><div><strong>{{ t.siteRebuild }}</strong><small>content.published · content.unpublished</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing preview-code">POST /build_hooks/northstar · 200 OK</div><div class="preview-message incoming preview-code">{{ webhookSample }}</div></div><div class="preview-input preview-code">X-CometCMS-Signature: sha256=9f2c… <ShieldCheck :size="14" /></div></div></article>
      </div>
    </section>

    <section class="personalize" id="use-cases">
      <div class="section-kicker reveal">{{ t.useCasesKicker }}</div>
      <div class="personal-heading reveal">
        <div class="personal-copy">
          <h2>{{ t.useCasesTitleStart }} <em>{{ t.useCasesTitleEnd }}</em></h2>
        </div>
        <p>{{ t.useCasesDescription }}</p>
      </div>
      <div class="personal-feature-grid reveal" :aria-label="t.useCasesLabel">
        <article>
          <Globe :size="21" /><span>{{ t.websitesLabel }}</span>
          <h3>{{ t.websitesTitle }}</h3>
          <ul><li>{{ t.websitesItem1 }}</li><li>{{ t.websitesItem2 }}</li></ul>
          <p class="use-case-tools">{{ t.websitesTools }}</p>
        </article>

        <article>
          <Newspaper :size="21" /><span>{{ t.blogsLabel }}</span>
          <h3>{{ t.blogsTitle }}</h3>
          <ul><li>{{ t.blogsItem1 }}</li><li>{{ t.blogsItem2 }}</li></ul>
          <p class="use-case-tools">{{ t.blogsTools }}</p>
        </article>

        <article>
          <CalendarDays :size="21" /><span>{{ t.eventsLabel }}</span>
          <h3>{{ t.eventsTitle }}</h3>
          <ul><li>{{ t.eventsItem1 }}</li><li>{{ t.eventsItem2 }}</li></ul>
          <p class="use-case-tools">{{ t.eventsTools }}</p>
        </article>

        <article>
          <Languages :size="21" /><span>{{ t.languagesLabel }}</span>
          <h3>{{ t.languagesTitle }}</h3>
          <ul><li>{{ t.languagesItem1 }}</li><li>{{ t.languagesItem2 }}</li></ul>
          <p class="use-case-tools">{{ t.languagesTools }}</p>
        </article>

        <article>
          <Code2 :size="21" /><span>{{ t.headlessLabel }}</span>
          <h3>{{ t.headlessCaseTitle }}</h3>
          <ul><li>{{ t.headlessItem1 }}</li><li>{{ t.headlessItem2 }}</li></ul>
          <p class="use-case-tools">{{ t.headlessTools }}</p>
        </article>

        <article>
          <Inbox :size="21" /><span>{{ t.formsLabel }}</span>
          <h3>{{ t.formsTitle }}</h3>
          <ul><li>{{ t.formsItem1 }}</li><li>{{ t.formsItem2 }}</li></ul>
          <p class="use-case-tools">{{ t.formsTools }}</p>
        </article>
      </div>
      <div class="personal-extras reveal"><span>{{ t.extrasLabel }}</span><p><Palette :size="16" /> {{ t.themePresets }}</p><p><DatabaseBackup :size="16" /> {{ t.backups }}</p><p><Webhook :size="16" /> {{ t.webhooks }}</p><p><Construction :size="16" /> {{ t.maintenance }}</p><p><Search :size="16" /> {{ t.siteSearch }}</p><p><Users :size="16" /> {{ t.rolesPermissions }}</p></div>
    </section>

    <section class="cta-section" id="download">
      <div class="cta-inner">
        <div class="cta-copy reveal">
          <div class="eyebrow"><span></span> {{ t.ctaEyebrow }}</div>
          <h2>{{ t.ctaTitleStart }}<br /><em>{{ t.ctaTitleEnd }}</em></h2>
          <p>{{ t.ctaDescription }}</p>
          <div class="hero-actions"><a class="button primary platform-download"
              :href="links.download"><span>{{ t.downloadLatest }}</span>
              <ArrowDown :size="17" />
            </a></div>
          <div class="cta-providers">
            <span class="cta-providers-title">{{ t.phpHosting }}</span>
            <ul>
              <li>{{ t.sharedHosting }}</li><li>Apache</li>
              <li>Nginx</li><li>Caddy</li>
              <li>VPS</li><li>{{ t.localPhp }}</li>
            </ul>
          </div>
          <div class="download-alternates">
            <span>{{ t.explore }}</span>
            <a :href="links.source">{{ t.sourceCode }}</a>
            <a :href="links.releases">{{ t.allReleases }}</a>
          </div>
          <small>{{ t.licenseNote }}</small>
        </div>
      </div>
    </section>
  </main>

  <footer><a class="brand" href="#top"><img :src="`${assetBase}logo.png`" alt="" /><span>COMET<b>CMS</b></span></a>
    <p>{{ t.copyright }}</p>
    <div><a :href="links.docs">{{ t.navDocs }}</a><a
        :href="links.releases">{{ t.releases }}</a><a
        :href="links.issues">{{ t.support }}</a></div>
  </footer>
</template>
