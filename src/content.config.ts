import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { getVertical, verticalSlugs } from './data/taxonomy';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Lantle Editorial'),
    // One or two sentences shown at the end of the post. Real bios help E-E-A-T and guest posters expect it.
    authorBio: z.string().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Set true for paid posts. As promised in pricing, these get up to 2 dofollow links.
    sponsored: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z
    .object({
      name: z.string(),
      website: z.string().url(),
      tagline: z.string().max(140),
      // Top level area (finance, marketing, ...). Slugs live in src/data/taxonomy.ts.
      vertical: z.enum(verticalSlugs),
      // Must be one of the categories listed under that vertical in taxonomy.ts.
      category: z.string(),
      pricing: z.enum(['Free', 'Freemium', 'Paid', 'Enterprise']),
      bestFor: z.string(),
      rating: z.number().min(1).max(5).optional(),
      // featured: paid listing, dofollow link, pinned to top of category. Basic listings are nofollow.
      featured: z.boolean().default(false),
      // editorsPick: our own recommendation. Shown with a pill and sorted after featured. Link stays nofollow. Never paid.
      editorsPick: z.boolean().default(false),
      thumbnail: z.string().optional(),
      addedDate: z.coerce.date(),
    })
    .superRefine((d, ctx) => {
      const v = getVertical(d.vertical);
      if (!v.categories.includes(d.category)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['category'],
          message: `"${d.category}" is not a category in ${v.name}. Options: ${v.categories.join(', ')}`,
        });
      }
    }),
});

export const collections = { blog, tools };
