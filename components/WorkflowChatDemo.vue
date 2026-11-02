<script setup lang="ts">
import { ArrowRight, Bot, Check, Database, FileText, Globe, LayoutTemplate, PenLine, Search, Sparkles } from '@lucide/vue'

const assetBase = useRuntimeConfig().app.baseURL

type ToolKind = 'read' | 'schema' | 'entry' | 'layout'

const workflows: {
  label: string
  title: string
  prompt: string
  tools: { kind: ToolKind; name: string; detail: string }[]
  reply: string
  outputs: { kind: 'page' | 'type' | 'entry'; name: string; detail: string }[]
}[] = [
  {
    label: 'New section',
    title: 'A new section, modeled and published',
    prompt: 'Add events to the Northstar site: a content type with date, location and capacity, two sample events, and a listing page at /events.',
    tools: [
      { kind: 'read', name: 'list_content_types', detail: 'northstar-studio' },
      { kind: 'schema', name: 'create_content_type', detail: 'Events · 4 fields' },
      { kind: 'entry', name: 'create_entry', detail: 'Summer Open Studio' },
      { kind: 'entry', name: 'create_entry', detail: 'Design Talk Night' },
      { kind: 'layout', name: 'set_layout', detail: 'Events template' },
    ],
    reply: 'Done. Events has date, location, capacity and registration fields, two published sample events, and a template that lists upcoming events at /events.',
    outputs: [
      { kind: 'page', name: '/events', detail: 'Listing page · published' },
      { kind: 'type', name: 'Events', detail: 'Content type · 4 fields' },
    ],
  },
  {
    label: 'Translate',
    title: 'A second language, same design',
    prompt: 'Translate the About page into German. Keep the layout exactly as it is.',
    tools: [
      { kind: 'read', name: 'get_entry', detail: 'pages / about' },
      { kind: 'read', name: 'get_layout', detail: 'Shared page template' },
      { kind: 'entry', name: 'update_entry', detail: 'locale: de · 6 fields' },
    ],
    reply: 'The German About page is ready and uses the shared template unchanged. Language links and the sitemap pick it up automatically.',
    outputs: [
      { kind: 'page', name: '/de/about', detail: 'German · published' },
    ],
  },
  {
    label: 'Edit a page',
    title: 'A quick edit, nothing else touched',
    prompt: 'On the landing page, announce that we are booking projects for spring and add a button to the contact page.',
    tools: [
      { kind: 'read', name: 'get_section', detail: 'Landing page · Hero' },
      { kind: 'layout', name: 'update_element', detail: 'Heading · text' },
      { kind: 'layout', name: 'update_section', detail: 'Button → /contact' },
    ],
    reply: 'Updated. The hero now announces spring bookings, and a “Get in touch” button links to the contact page. Only the landing page changed; the shared template is untouched.',
    outputs: [
      { kind: 'entry', name: 'Landing page', detail: 'Hero updated' },
      { kind: 'page', name: '/contact', detail: 'Linked from the hero' },
    ],
  },
]

const root = ref<HTMLElement | null>(null)
const selected = ref(0)
const promptText = ref('')
const replyText = ref('')
const shownTools = ref(0)
const showOutputs = ref(false)
const isSwitching = ref(false)
const phase = ref<'waiting' | 'prompt' | 'tools' | 'reply' | 'done'>('waiting')
const current = computed(() => workflows[selected.value]!)

let observer: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined
let isVisible = false
let runId = 0
let timer: number | undefined
let finishWait: (() => void) | undefined

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    finishWait = () => {
      if (timer !== undefined) window.clearTimeout(timer)
      timer = undefined
      finishWait = undefined
      resolve()
    }
    timer = window.setTimeout(() => finishWait?.(), ms)
  })
}

function stop() {
  runId++
  finishWait?.()
}

function beforeEnter(element: Element) {
  (element as HTMLElement).style.height = '0'
}

function enter(element: Element) {
  const node = element as HTMLElement
  node.style.height = `${node.scrollHeight}px`
}

function afterEnter(element: Element) {
  (element as HTMLElement).style.height = ''
}

function beforeLeave(element: Element) {
  const node = element as HTMLElement
  node.style.height = `${node.scrollHeight}px`
}

function leave(element: Element) {
  const node = element as HTMLElement
  // Force the browser to use the measured height as the start of the transition.
  void node.offsetHeight
  node.style.height = '0'
}

function showComplete() {
  promptText.value = current.value.prompt
  shownTools.value = current.value.tools.length
  replyText.value = current.value.reply
  showOutputs.value = true
  phase.value = 'done'
}

async function stream(value: string, target: typeof promptText, id: number) {
  for (let i = 0; i < value.length && id === runId; i++) {
    target.value = value.slice(0, i + 1)
    await wait(i % 4 === 0 ? 27 : 14)
  }
}

async function play() {
  stop()
  const id = runId
  promptText.value = ''
  replyText.value = ''
  shownTools.value = 0
  showOutputs.value = false
  phase.value = 'prompt'

  if (motionQuery?.matches) {
    showComplete()
    return
  }

  await wait(330)
  if (id !== runId) return
  await stream(current.value.prompt, promptText, id)
  if (id !== runId) return
  phase.value = 'tools'
  await wait(400)
  for (let i = 0; i < current.value.tools.length && id === runId; i++) {
    shownTools.value = i + 1
    await wait(610)
  }
  if (id !== runId) return
  phase.value = 'reply'
  await wait(300)
  if (id !== runId) return
  await stream(current.value.reply, replyText, id)
  if (id !== runId) return
  showOutputs.value = true
  phase.value = 'done'
  await wait(7000)
  if (id !== runId || !isVisible) return
  void switchWorkflow((selected.value + 1) % workflows.length)
}

async function switchWorkflow(index: number) {
  stop()
  const id = runId
  if (!isVisible || motionQuery?.matches) {
    selected.value = index
    isSwitching.value = false
    if (isVisible) void play()
    else showComplete()
    return
  }

  isSwitching.value = true
  await new Promise<void>((resolve) => window.setTimeout(resolve, 230))
  if (id !== runId) return
  selected.value = index
  void play()
  isSwitching.value = false
}

function selectWorkflow(index: number) {
  void switchWorkflow(index)
}

function onMotionChange() {
  if (motionQuery?.matches) {
    stop()
    isSwitching.value = false
    showComplete()
  } else if (isVisible) {
    void play()
  }
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', onMotionChange)
  observer = new IntersectionObserver(([entry]) => {
    if (!entry) return
    isVisible = entry.isIntersecting
    if (isVisible) {
      if (phase.value === 'waiting' || phase.value === 'done') void play()
    } else {
      stop()
      isSwitching.value = false
      if (phase.value !== 'waiting') showComplete()
    }
  }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
})
</script>

<template>
  <div ref="root" class="workflow-demo" aria-label="Illustrated conversation with an agent managing CometCMS over MCP">
    <div class="workflow-demo-top">
      <div class="workflow-demo-identity"><span class="workflow-demo-logo"><img :src="`${assetBase}logo.png`" alt="" /></span><span><strong>CometCMS MCP</strong><small>Connected to northstar-studio</small></span></div>
    </div>

    <div class="workflow-demo-tabs" aria-label="Example workflows">
      <button v-for="(workflow, index) in workflows" :key="workflow.label" type="button" :aria-pressed="selected === index" :class="{ active: selected === index }" @click="selectWorkflow(index)">{{ workflow.label }}</button>
    </div>

    <div class="workflow-demo-body">
      <div class="workflow-demo-content" :class="{ switching: isSwitching }">
      <div class="workflow-demo-caption"><span class="workflow-live-dot"></span> LIVE WORKFLOW <span class="workflow-demo-number">0{{ selected + 1 }} / 0{{ workflows.length }}</span></div>
      <h3>{{ current.title }}</h3>
      <div class="workflow-message user-message"><span class="workflow-avatar user-avatar">YOU</span><div class="workflow-message-content"><span class="workflow-message-name">You</span><p>{{ promptText }}<span v-if="phase === 'prompt'" class="workflow-cursor" aria-hidden="true"></span><span v-if="phase === 'waiting'" class="workflow-placeholder">Ask your agent to change the site…</span></p></div></div>

      <Transition name="workflow-section" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave"><div v-if="shownTools" class="workflow-section"><div class="workflow-tool-list"><div v-for="(tool, index) in current.tools.slice(0, shownTools)" :key="index" class="workflow-tool"><span class="workflow-tool-icon"><Search v-if="tool.kind === 'read'" :size="14" /><Database v-else-if="tool.kind === 'schema'" :size="14" /><PenLine v-else-if="tool.kind === 'entry'" :size="14" /><LayoutTemplate v-else :size="14" /></span><span class="workflow-tool-name">{{ tool.name }}</span><span class="workflow-tool-detail">{{ tool.detail }}</span><Check class="workflow-tool-check" :size="14" /></div></div></div></Transition>

      <Transition name="workflow-section" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave"><div v-if="phase === 'reply' || phase === 'done'" class="workflow-section"><div class="workflow-message assistant-message"><span class="workflow-avatar assistant-avatar"><Bot :size="17" /></span><div class="workflow-message-content"><span class="workflow-message-name">Agent <Sparkles :size="12" /></span><p>{{ replyText }}<span v-if="phase === 'reply'" class="workflow-cursor" aria-hidden="true"></span></p></div></div></div></Transition>

      <Transition name="workflow-section" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave"><div v-if="showOutputs" class="workflow-section"><div class="workflow-outputs"><div v-for="output in current.outputs" :key="output.name" class="workflow-output"><span class="workflow-output-icon"><Globe v-if="output.kind === 'page'" :size="18" /><Database v-else-if="output.kind === 'type'" :size="18" /><FileText v-else :size="18" /></span><span><strong>{{ output.name }}</strong><small>{{ output.detail }}</small></span><ArrowRight :size="15" /></div></div></div></Transition>
      </div>
    </div>
    <div class="workflow-demo-bottom"><span><Check :size="13" /> Content, layouts, and publishing over MCP</span><span>ILLUSTRATIVE DEMO</span></div>
  </div>
</template>
