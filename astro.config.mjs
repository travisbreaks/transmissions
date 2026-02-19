import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://travisbreaks.org',
  base: '/transmissions',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
})
