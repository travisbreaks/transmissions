import { defineCollection, z } from 'astro:content'

const transmissions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    confidence: z.number().min(0).max(100),
    tags: z.array(z.string()),
    key_quote: z.string(),
    source_platform: z.string().default('chatgpt'),
    source_id: z.string().optional(),
    id: z.number(),
    draft: z.boolean().default(false),
    // Dated correction notice for substantive post-publication edits. Rendered by
    // the page template OUTSIDE the narrated body, so it never desyncs a timing
    // sidecar and is never read aloud. Format: "Correction, <Month D, YYYY>: ...".
    corrected: z.string().optional(),
    // editorial frame shown BEFORE the essay, outside the narrated body (e.g. "An account of the first night, September 6, 2026.")
    note: z.string().optional(),
  }),
})

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    status: z.enum(['BUILD NOW', 'PRIORITIZE', 'SUSTAIN', 'WATCH', 'KILL/ARCHIVE']),
    enjoyment: z.number().min(0).max(10),
    resources: z.number().min(0).max(10),
    viability: z.number().min(0).max(10),
    scale: z.number().min(0).max(10),
    action: z.string(),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    deploy_url: z.string().optional(),
    git_dir: z.string().optional(),
    date: z.coerce.date(),
  }),
})

export const collections = { transmissions, projects }
