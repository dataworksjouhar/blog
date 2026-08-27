import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['notes', 'projects', 'reflections']),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    external: z.string().optional(),

    // --- optional card fields (used mainly on project cards) ---
    // one short outcome line, shown in bold on the card
    impact: z.string().optional(),
    // display-only tech chips, e.g. ["Power BI", "SQL"]
    tools: z.array(z.string()).default([]),
    // optional links shown as small buttons on the card
    demo: z.string().optional(),
    repo: z.string().optional(),
    video: z.string().optional(),
    // optional image path, e.g. "/images/thumb-x.png" (safe to leave out)
    thumbnail: z.string().optional(),
  }),
});

export const collections = { posts };
