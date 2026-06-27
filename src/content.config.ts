import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One collection holds every post. The `category` field decides which
// tab it shows up under (Notes / Projects / Reflections).
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['notes', 'projects', 'reflections']),
    // optional difficulty tag, mainly for Notes
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // If set, the post card links to this URL instead of a generated page.
    // Used for bespoke full-HTML showpieces kept in /public.
    external: z.string().optional(),
  }),
});

export const collections = { posts };
