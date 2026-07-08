import type { CollectionEntry } from 'astro:content'

type Transmission = CollectionEntry<'transmissions'>

// Filter dev-only content out of PRODUCTION builds. Demo pages (tags: ["demo"])
// and drafts (draft: true) remain reachable in `astro dev` for testing but are
// excluded from every production enumeration point: routes, index, terminal, RSS.
export function published(entries: Transmission[]): Transmission[] {
  return entries.filter((t) => {
    const devOnly = t.data.tags?.includes('demo') || t.data.draft === true
    return devOnly ? import.meta.env.DEV : true
  })
}
