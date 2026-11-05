import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    baseURL: '/',
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      routes: ['/', '/de/'],
    },
  },
  typescript: {
    typeCheck: true,
  },
})
