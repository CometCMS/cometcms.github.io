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

### GitHub Pages

The Pages workflow builds with Node 24 and publishes `.output/public`. In the repository's Pages settings, select **GitHub Actions** as the build and deployment source. Because the repository is named `cometcms.github.io`, GitHub Pages serves it at the organization root, `https://cometcms.github.io/`, and the workflow uses `/` as Nuxt's base path. For a custom domain at its root, set the repository Actions variable `NUXT_APP_BASE_URL` to `/`.
