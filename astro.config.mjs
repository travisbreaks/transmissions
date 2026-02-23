import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://travisbreaks.org',
  base: '/transmissions',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  server: { port: 4321 },
})
