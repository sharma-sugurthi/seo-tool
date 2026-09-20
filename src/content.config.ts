import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    tags: z.array(z.string()).default([]),
    // Set true for paid posts. Outbound links in the post body get rel="sponsored" via the layout notice.
    sponsored: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
    tagline: z.string().max(140),
    category: z.enum([
      'Bookkeeping',
      'Accounts payable',
      'Expense management',
      'FP&A and forecasting',
      'Tax',
      'Invoicing and AR',
      'Spend cards',
      'Business operations',
    ]),
    pricing: z.enum(['Free', 'Freemium', 'Paid', 'Enterprise']),
    bestFor: z.string(),
    rating: z.number().min(1).max(5).optional(),
    // featured: paid listing, dofollow link, pinned to top of category. Basic listings are nofollow.
    featured: z.boolean().default(false),
    // editorsPick: our own recommendation. Shown with a pill and sorted after featured. Link stays nofollow. Never paid.
    editorsPick: z.boolean().default(false),
    thumbnail: z.string().optional(),
    addedDate: z.coerce.date(),
  }),
});

export const collections = { blog, tools };
