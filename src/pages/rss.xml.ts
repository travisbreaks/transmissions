import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const transmissions = await getCollection('transmissions')

  return rss({
    title: 'TRANSMISSIONS // PROTOCOL',
    description: 'Philosophical transmissions on AI interaction, consciousness, grief, and creative process. By Travis Bonnet.',
    site: context.site!,
    items: transmissions
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map(t => ({
        title: t.data.title,
        pubDate: t.data.date,
        description: t.body?.substring(0, 300) || '',
        link: `/transmissions/${t.slug}/`,
        categories: t.data.tags,
      })),
    customData: '<language>en-us</language>',
  })
}
