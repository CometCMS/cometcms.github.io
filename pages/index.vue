<script setup lang="ts">
import {
  ArrowDownUp,
  ArrowDown,
  ArrowUpRight,
  Bot,
  Box,
  CalendarClock,
  CircleCheck,
  Clock3,
  Database,
  MessageCircle,
  Monitor,
  Plus,
  Send,
  Settings2,
  BarChart3,
  BrainCircuit,
  Check,
  DatabaseBackup,
  EyeOff,
  FileText,
  FolderOpen,
  History,
  ListFilter,
  Menu,
  Mic2,
  Palette,
  PanelTopOpen,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from '@lucide/vue'

const downloadPlatforms = ['Windows', 'macOS', 'Linux'] as const
type DownloadPlatform = typeof downloadPlatforms[number]
const assetBase = useRuntimeConfig().app.baseURL

const menuOpen = ref(false)
const currentPlatform = ref<DownloadPlatform>('Windows')
const alternatePlatforms = computed(() => downloadPlatforms.filter(platform => platform !== currentPlatform.value))
const featuredServices = [
  { name: 'Filesystem', description: 'Read, write and search local files.', category: 'Local files', icon: '' },
  { name: 'Gmail', description: 'Search and manage your email.', category: 'Email', icon: 'gmail-icon.svg' },
  { name: 'Obsidian', description: 'Connect your notes and knowledge.', category: 'Knowledge', icon: 'obsidian-icon.svg' },
  { name: 'GitHub', description: 'Work with issues, repos and pull requests.', category: 'Development', icon: 'github-icon.svg' },
  { name: 'Google Drive', description: 'Access and manage your files.', category: 'Cloud files', icon: 'google-drive-color-icon.svg' },
  { name: 'Slack', description: 'Read and send messages.', category: 'Messaging', icon: 'slack-icon.svg' },
  { name: 'YouTube', description: 'Search and transcribe videos.', category: 'Media', icon: 'youtube-color-icon.svg' },
  { name: 'Discord', description: 'Connect with your communities.', category: 'Messaging', icon: 'discord-color-icon.svg' },
  { name: 'Canva', description: 'Find and manage your designs.', category: 'Design', icon: 'canva-icon.svg' },
] as const
let revealObserver: IntersectionObserver | undefined

useSeoMeta({
  title: 'Cynosure — Your AI, in one place',
  description: 'Cynosure is a private AI workspace for agents, durable memory, tools, media, and automations.',
  ogTitle: 'Cynosure — Your AI, in one place',
  ogDescription: 'A private AI workspace for agents, durable memory, tools, media, and automations.',
  ogType: 'website',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: `${assetBase}logo.png` },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap',
    },
  ],
  meta: [{ name: 'theme-color', content: '#070b0f' }],
})

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes('mac')) currentPlatform.value = 'macOS'
  else if (userAgent.includes('linux')) currentPlatform.value = 'Linux'

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
    <a class="brand" href="#top" aria-label="Cynosure home">
      <img :src="`${assetBase}logo.png`" alt="" />
      <span>CYNOSURE</span>
    </a>
    <nav aria-label="Main navigation">
      <a href="#features" @click="closeMenu">Capabilities</a>
      <a href="#use-cases" @click="closeMenu">Use Cases</a>
      <a href="#download" @click="closeMenu">Download</a>
      <a href="https://cynosure-ai.github.io/docs/" target="_blank" rel="noreferrer">Documentation
        <span>↗</span></a>
    </nav>
    <a class="nav-cta" href="https://github.com/Cynosure-AI/cynosure-app/releases">Download
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
        <div class="eyebrow"><span></span> The AI workspace that remembers</div>
        <h1>Your models.<br />Your tools. <br/><em>Your AI.</em></h1>
        <p class="hero-lede">Ask Cynosure to research ideas, recall project details, draft follow-ups, and organize files. Your models, tools, memory, agents, and automations work together in one place.</p>
        <div class="hero-actions">
          <a class="button primary" href="https://github.com/Cynosure-AI/cynosure-app/releases"><span>Download
              for {{ currentPlatform }}</span>
            <ArrowDown :size="17" />
          </a>
          <a class="button secondary" href="https://cynosure-ai.github.io/docs/" target="_blank"
            rel="noreferrer">Read the docs
            <ArrowUpRight :size="14" />
          </a>
        </div>
        <div class="hero-notes">
          <span><Monitor :size="23" /><span>Desktop &amp; Web<small>Free to use</small></span></span>
          <span><Database :size="23" /><span>Bring your own models<small>Or use any provider API</small></span></span>
          <span><Box :size="23" /><span>Tools, memory, agents<small>All in one workspace</small></span></span>
        </div>
      </div>

      <div class="hero-visual reveal delay-1"><WorkflowChatDemo /></div>
    </section>
    
    <section class="overview-band" id="features">
      <div class="overview-title"><div class="section-kicker">A complete AI workspace</div><h2>Everything you need<br />to go further.</h2></div>
      <a class="overview-card" href="#features-detail"><span class="overview-icon"><Box :size="26" /></span><div><h3>Models</h3><p>Use your own models or connect any provider API. Switch, compare, and customize for your workflow.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#memory"><span class="overview-icon"><Database :size="26" /></span><div><h3>Memory</h3><p>Give your AI a long-term memory. Reference past work, build context, and keep knowledge at hand.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#use-cases"><span class="overview-icon"><Sparkles :size="26" /></span><div><h3>Agents &amp; Tools</h3><p>Add tools, create agents, and automate repetitive work. Turn ideas into powerful workflows.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
    </section>





    <section class="intro product-overview" id="features-detail">
      <div class="mcp-heading reveal">
        <div><div class="section-kicker">MCP Directory</div><h2>Add functionality<br /><em>in a few clicks.</em></h2><p>Find and add MCP servers in Cynosure’s built-in store, powered by Smithery and the official MCP Registry. Bring a custom server whenever the directory doesn’t cover your workflow.</p></div>
        <p>Just add a provider API key or connect a model running locally. There is little to configure before your first conversation, with models, prompts, tools, and agents ready to customize when you want more control.</p>
      </div>
      <div class="mcp-stage reveal">
        <div class="mcp-steps">
          <div><span><Search :size="28" /></span><p><strong>Discover</strong>Browse curated and official registries.</p></div>
          <div><span><Plus :size="28" /></span><p><strong>Install</strong>Add MCP servers with one click.</p></div>
          <div><span><Settings2 :size="28" /></span><p><strong>Configure</strong>Set API keys and permissions.</p></div>
          <div><span><Box :size="28" /></span><p><strong>Use instantly</strong>Tools are available in chat right away.</p></div>
          <div class="mcp-actions"><a class="button primary" href="https://cynosure-ai.github.io/docs/" target="_blank" rel="noreferrer">Explore MCP servers <ArrowUpRight :size="16" /></a><a class="button secondary" href="https://cynosure-ai.github.io/docs/" target="_blank" rel="noreferrer">Learn more <ArrowUpRight :size="16" /></a></div>
        </div>
        <div class="mcp-showcase" aria-label="Illustration of the Cynosure MCP directory">
          <div class="floating-service float-github"><img :src="`${assetBase}mcp-icons/github-icon.svg`" alt="" /></div>
          <div class="floating-service float-slack"><img :src="`${assetBase}mcp-icons/slack-icon.svg`" alt="" /></div>
          <div class="floating-service float-drive"><img :src="`${assetBase}mcp-icons/google-drive-color-icon.svg`" alt="" /></div>
          <div class="mcp-browser">
            <div class="mcp-browser-head"><span><img :src="`${assetBase}logo.png`" alt="" /> MCP STORE</span></div>
            <div class="mcp-browser-body">
              <aside class="mcp-sidebar"><div class="mcp-search"><Search :size="13" /> Search MCP servers...</div><b>Recommended <small>12</small></b><span>Official <small>48</small></span><span>Smithery <small>312</small></span><em>INSTALLED</em><span>File System</span><span>Web &amp; Data</span><span>Development</span><span>System</span><span class="mcp-custom">＋ Add Custom Server</span></aside>
              <div class="mcp-results"><div class="mcp-results-head"><div><strong>Recommended</strong><small>Handpicked MCP servers for everyday use.</small></div><span>Popular⌄</span></div><div class="mcp-result-grid"><div v-for="service in featuredServices" :key="service.name" class="mcp-result-card"><div class="mcp-result-title"><span class="mcp-result-icon"><img v-if="service.icon" :src="`${assetBase}mcp-icons/${service.icon}`" alt="" /><FolderOpen v-else :size="25" /></span><div><strong>{{ service.name }}</strong><small>{{ service.description }}</small></div></div><div class="mcp-result-foot"><span>↧ {{ service.category }}</span><span class="install-label">Install</span></div></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="memory-section" id="memory">
      <div class="section-kicker reveal">Memory you own</div>
      <div class="memory-heading reveal">
        <h2>A memory that grows<br /><em>with your work.</em></h2>
        <p>Cynosure keeps what it learns as plain Markdown documents in folders you control. It brings back the right passages when you need them, and every change is versioned so you can review or undo it.</p>
      </div>
      <div class="memory-grid">
        <article class="memory-card memory-docs-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">DOCUMENTS + REVISIONS</span>
            <h3>Memory you can read and edit.</h3>
            <p>Memories are Markdown files organized in folders, so you can open them, edit them, or drop in your own notes. Every change is saved as a revision with a diff that shows where it came from: you, a chat, or Dreaming Mode. Folders also decide which agents can see what.</p>
          </div>
          <div class="memory-doc" role="img" aria-label="Illustration of a Markdown memory document with an inline change and its revision history">
            <div class="memory-doc-head">
              <span class="memory-doc-path"><FolderOpen :size="14" /> Projects / Atlas / <strong>launch-plan.md</strong></span>
              <span class="memory-doc-rev"><History :size="12" /> REV 4</span>
            </div>
            <div class="memory-doc-body">
              <div class="memory-doc-text">
                <p class="md-h1"># Launch plan</p>
                <p class="md-h2">## Timeline</p>
                <p class="md-line md-removed">- Public beta: October 14</p>
                <p class="md-line md-added">- Public beta: October 28, after customer feedback</p>
                <p class="md-line">- Owner: Maya</p>
                <p class="md-h2">## Preferences</p>
                <p class="md-line">- Keep status updates concise</p>
                <div class="memory-doc-change">
                  <span class="change-count"><b>+1</b> <i>−1</i></span>
                  <span class="change-source">Updated by Dreaming from “Atlas sync”</span>
                  <span class="change-restore"><History :size="12" /> Restore REV 3</span>
                </div>
              </div>
              <ol class="memory-doc-history">
                <li class="current"><span>REV 4</span><strong>Dreaming</strong><small>2h ago</small></li>
                <li><span>REV 3</span><strong>You</strong><small>Yesterday</small></li>
                <li><span>REV 2</span><strong>Chat</strong><small>Monday</small></li>
                <li><span>REV 1</span><strong>Imported</strong><small>Sep 30</small></li>
              </ol>
            </div>
          </div>
          <div class="memory-card-foot"><span>Markdown files</span><span>Folders</span><span>Revisions</span><span>Restore</span></div>
        </article>
        <article class="memory-card memory-recall-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">FOCUSED RECALL</span>
            <h3>The right detail, right on time.</h3>
            <p>When you ask, Cynosure searches your memory folders by meaning and keywords, ranks the matches, and adds only the passages that support your question, with a link back to the source.</p>
          </div>
          <div class="recall-preview" aria-hidden="true">
            <div class="recall-question"><Search :size="16" /><span>When does the Atlas beta go live?</span></div>
            <div class="recall-result"><span><CircleCheck :size="14" /> RELATED MEMORY</span><strong>Public beta: October 28, after customer feedback</strong><small>From Projects / Atlas / launch-plan.md · Timeline</small></div>
          </div>
        </article>
        <article class="memory-card memory-dream-card reveal">
          <div class="memory-card-copy">
            <span class="feature-overline">DREAMING MODE</span>
            <h3>Learning continues in the background.</h3>
            <p>While you're away, Cynosure reviews recent conversations for lasting facts, decisions, and preferences, then updates the matching documents instead of piling up duplicates.</p>
          </div>
          <div class="dream-preview" aria-hidden="true">
            <div class="dream-preview-head"><BrainCircuit :size="23" /><span><strong>Dreaming Mode</strong><small>Reflecting on past conversations</small></span></div>
            <div class="dream-steps">
              <div class="dream-step"><span class="dream-step-icon"><MessageCircle :size="19" /></span><span>Review<br />conversations</span></div>
              <div class="dream-step"><span class="dream-step-icon"><Sparkles :size="19" /></span><span>Find lasting<br />facts</span></div>
              <div class="dream-step"><span class="dream-step-icon"><FileText :size="19" /></span><span>Update<br />documents</span></div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="workspace" id="workspace">
      <div class="workspace-bg"></div>
      <div class="section-kicker light reveal">Beyond the desktop</div>
      <div class="workspace-heading reveal"><h2>Your AI, wherever<br /><em>you are.</em></h2><p>Keep the conversation going from your favorite chat app, and schedule work for Cynosure to handle at the right time.</p></div>
      <div class="remote-grid">
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">REMOTE CHAT</span><h3>Message Cynosure from anywhere.</h3><p>Talk to your AI through Telegram, Discord, or Slack. Ask questions and continue conversations when you’re away from the workspace.</p><div class="remote-platforms"><span><Send :size="19" /> Telegram</span><span><img :src="`${assetBase}mcp-icons/discord-color-icon.svg`" alt="" /> Discord</span><span><img :src="`${assetBase}mcp-icons/slack-icon.svg`" alt="" /> Slack</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><img :src="`${assetBase}logo.png`" alt="" /></span><div><strong>Cynosure</strong><small>Always ready to help</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing">Can you summarize the latest project notes?</div><div class="preview-message incoming">Of course. Here are the three updates that matter most today…</div></div><div class="preview-input">Message Cynosure <Send :size="14" /></div></div></article>
        <article class="remote-card remote-schedule reveal"><div class="remote-card-copy"><span class="feature-overline">SCHEDULES</span><h3>Put recurring work on the calendar.</h3><p>Schedule an agent to run a daily brief, weekly review, or any task you want done on a regular cadence.</p><div class="schedule-example"><CalendarClock :size="20" /><span><strong>Morning brief</strong><small>Every weekday · 08:30</small></span><CircleCheck :size="18" /></div></div><figure class="remote-schedule-shot"><img :src="`${assetBase}screenshots/schedule.png`" alt="Cynosure schedule screen showing recurring jobs and their status" loading="lazy" /></figure></article>
      </div>
    </section>

    <section class="personalize" id="use-cases">
      <div class="section-kicker reveal">Use cases</div>
      <div class="personal-heading reveal">
        <div class="personal-copy">
          <h2>Make it <em>yours.</em></h2>
        </div>
        <p>Start with a question or hand Cynosure a task. Connect the tools you use and bring conversations, files, research, and everyday work into one place.</p>
      </div>
      <div class="personal-feature-grid reveal" aria-label="Cynosure use cases">
        <article>
          <MessageCircle :size="21" /><span>01 / COMMUNICATION</span>
          <h3>Stay on top of conversations.</h3>
          <ul><li>Draft, reply to, search, and organize emails and messages.</li><li>Find unanswered requests, follow-ups, and loose ends.</li></ul>
          <p class="use-case-tools">Gmail · Outlook · Slack</p>
        </article>

        <article>
          <Search :size="21" /><span>02 / WEB &amp; RESEARCH</span>
          <h3>Turn browsing into answers.</h3>
          <ul><li>Research topics, websites, products, jobs, prices, and offers.</li><li>Extract, compare, summarize, and save what matters.</li></ul>
          <p class="use-case-tools">Browser · YouTube · Connected sources</p>
        </article>

        <article>
          <FolderOpen :size="21" /><span>03 / FILES &amp; FOLDERS</span>
          <h3>Bring order to your files.</h3>
          <ul><li>Analyze, rename, move, group, and organize local files.</li><li>Spot duplicates, old files, and messy downloads; convert formats.</li></ul>
          <p class="use-case-tools">Local files · Google Drive</p>
        </article>

        <article>
          <FileText :size="21" /><span>04 / MEDIA &amp; DOCUMENTS</span>
          <h3>Work with more than text.</h3>
          <ul><li>Pull text from screenshots, scans, PDFs, and images.</li><li>Generate images and video clips for your projects.</li></ul>
          <p class="use-case-tools">Documents · Images · Video</p>
        </article>

        <article>
          <BrainCircuit :size="21" /><span>05 / MEMORY &amp; KNOWLEDGE</span>
          <h3>Find what you already know.</h3>
          <ul><li>Search across chats, files, notes, and documents.</li><li>Pull related notes together and summarize them when you need it.</li></ul>
          <p class="use-case-tools">Memory · Obsidian · Notes</p>
        </article>

        <article>
          <Settings2 :size="21" /><span>06 / AUTOMATION</span>
          <h3>Put repeat work in motion.</h3>
          <ul><li>Handle browser forms, desktop apps, and recurring workflows.</li><li>Triage GitHub issues and run multi-step tasks with previews and confirmations.</li></ul>
          <p class="use-case-tools">GitHub · Browser · Schedules</p>
        </article>
      </div>
      <div class="personal-extras reveal"><span>THE LITTLE EXTRAS</span><p><Palette :size="16" /> Themes</p><p><Mic2 :size="16" /> Voice input</p><p><ShieldCheck :size="16" /> Tool permissions</p><p><EyeOff :size="16" /> No tracking</p><p><BarChart3 :size="16" /> Usage insights</p><p><DatabaseBackup :size="16" /> Local workspace</p></div>
    </section>

    <section class="cta-section" id="download">
      <div class="cta-inner">
        <div class="cta-copy reveal">
          <div class="eyebrow"><span></span> Start building with Cynosure</div>
          <h2>Your AI, ready<br /><em>for real work.</em></h2>
          <p>Connect a model, add the tools and memory it needs, and put your ideas to work in one private workspace.</p>
          <div class="hero-actions"><a class="button primary platform-download"
              href="https://github.com/Cynosure-AI/cynosure-app/releases"><span>Download for {{ currentPlatform
                }}</span>
              <ArrowDown :size="17" />
            </a></div>
          <div class="cta-providers">
            <span class="cta-providers-title">Choose your provider</span>
            <ul>
              <li>OpenAI</li><li>Ollama</li>
              <li>Anthropic</li><li>LM Studio</li>
              <li>Gemini</li><li>OpenRouter</li>
            </ul>
          </div>
          <div class="download-alternates">
            <span>Also available for</span>
            <a v-for="platform in alternatePlatforms" :key="platform"
              href="https://github.com/Cynosure-AI/cynosure-app/releases">{{ platform }}</a>
          </div>
          <small>Free to use · No tracking · Your data stays yours</small>
        </div>
      </div>
    </section>
  </main>

  <footer><a class="brand" href="#top"><img :src="`${assetBase}logo.png`" alt="" /><span>CYNOSURE</span></a>
    <p>© 2026 Cynosure. Free to use</p>
    <div><a href="https://cynosure-ai.github.io/docs/">Documentation</a><a
        href="https://github.com/Cynosure-AI/cynosure-app/releases">Releases</a><a
        href="https://github.com/Cynosure-AI/cynosure-app/issues">Support</a></div>
  </footer>
</template>
