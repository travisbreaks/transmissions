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

// Drafts the archive announces without publishing: the index renders these as
// non-clickable placeholder cards (title, number, date, tags, COMING SOON) so a
// finished-but-ungated essay is visible as coming. Demo pages are never
// announced. The essay itself stays unreachable in production: `published()`
// still gates routes, terminal, and RSS, and the placeholder carries no prose.
export function upcoming(entries: Transmission[]): Transmission[] {
  return entries.filter((t) => t.data.draft === true && !t.data.tags?.includes('demo'))
}
