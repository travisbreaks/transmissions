import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const transmissions = await getCollection('transmissions')
  const sorted = transmissions.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  )

  return rss({
    title: 'TRANSMISSIONS // PROTOCOL',
    description:
      'Philosophical transmissions on AI interaction, consciousness, grief, and creative process. By Travis Bonnet.',
    site: context.site!,
    items: sorted.map((t) => {
      const body = t.body || ''
      const clean = body
        .replace(/[#*_`\[\]]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      const desc =
        t.data.description ||
        (clean.length <= 155
          ? clean
          : clean.substring(0, 155).replace(/\s+\S*$/, '') + '...')

      return {
        title: t.data.title,
        pubDate: t.data.date,
        description: desc,
        content: body,
        link: `/transmissions/${t.slug}/`,
        categories: t.data.tags,
      }
    }),
    customData: '<language>en-us</language>',
  })
}
