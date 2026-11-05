# CometCMS Landing Page

This repository contains the marketing landing page for **CometCMS**.

## What is CometCMS?

CometCMS is a visual page builder and content CMS that runs on any shared PHP host. The whole CMS is a single PHP folder: no database, no Composer, no Node, no CLI and no SSH required.

Key capabilities highlighted on the page:

- **Visual Page Builder** — templates with sections, columns and field bindings, a shared theme, header, footer and menus.
- **Structured content** — content types with custom fields, stored as plain JSON files, with built-in backups.
- **Localization** — one design across languages, with per-language URLs, hreflang and sitemap entries.
- **Extensions** — ZIPs of reusable blocks, content types, components, templates and theme presets.
- **Headless API and embedded MCP** — expose content types to any frontend or let an AI agent manage content, guarded by scoped access tokens.

CometCMS is free and open source under the Apache 2.0 license.

- Documentation: https://cometcms.github.io/CometCMS/
- Downloads: https://github.com/CometCMS/CometCMS/releases

## About this repository

This is the **Nuxt landing page** for CometCMS — a static marketing site presenting the product, its features, use cases and download links. It is not the CMS itself.

Built with [Nuxt](https://nuxt.com/) and Tailwind CSS, and deployed as a static site.

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Languages

English is available at `/` and German at `/de/`. The header language switcher
keeps the current section when changing languages. Both pages are generated as
static HTML, including translated metadata, accessibility labels, canonical URLs
and `hreflang` links.

Translations live in `i18n/locales/en.json` and `i18n/locales/de.json`. Keep their
keys in sync; English defines the TypeScript message schema. To add a language,
add its catalog and configuration in `i18n/index.ts`, create a page that renders
`LandingPage` with that locale, and add its route to `nuxt.config.ts` and the Pages
verification script.

### GitHub Pages

The organization site lives in **`CometCMS/cometcms.github.io`** and is served at **https://cometcms.github.io/**. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.

The Pages workflow builds with Node 24, verifies the generated asset URLs, and publishes `.output/public`. It explicitly sets `NUXT_APP_BASE_URL` to `/`, overriding any old repository variable. This organization site must not use `/cometcms.github.io/` as its base path: those asset requests redirect to HTML and cause JavaScript module MIME errors.

Push to `main` or run **Deploy Nuxt site to Pages** manually from the Actions tab to deploy. To verify the static output locally:

```bash
npm run build
npm run pages:verify
```
