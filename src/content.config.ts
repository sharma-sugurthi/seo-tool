import { defineCollection, z } from 'astro:content';
import { getVertical, verticalSlugs } from './data/taxonomy';
import { apiToolsLoader } from './loaders/tools';
import { apiPostsLoader } from './loaders/posts';
import { apiComparisonsLoader } from './loaders/comparisons';

// Articles live in the backend database too (editorial and sponsored). Written and approved in the admin.
const blog = defineCollection({
  loader: apiPostsLoader(),
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

// Tools live in the backend database and are fetched at build time. Editing happens in the admin.
const tools = defineCollection({
  loader: apiToolsLoader(),
  schema: z
    .object({
      name: z.string(),
      website: z.string().url(),
      tagline: z.string().max(140),
      vertical: z.enum(verticalSlugs),
      category: z.string(),
      pricing: z.enum(['Free', 'Freemium', 'Paid', 'Enterprise']),
      bestFor: z.string(),
      rating: z.number().min(1).max(5).optional(),
      // featured: paid listing, dofollow link, pinned to top of category. Computed by the API from the paid term.
      featured: z.boolean().default(false),
      featuredUntil: z.coerce.date().optional(),
      // editorsPick: our own recommendation. Shown with a pill and sorted after featured. Never paid.
      editorsPick: z.boolean().default(false),
      thumbnail: z.string().optional(),
      addedDate: z.coerce.date(),
      // Comparison data, filled in the admin (or by the submitter) and shown on the vs, alternatives and tool pages. All optional.
      pros: z.array(z.string()).default([]),
      cons: z.array(z.string()).default([]),
      // Labels from FEATURES[vertical] in src/data/taxonomy.ts. Drives the tick and cross matrix.
      keyFeatures: z.array(z.string()).default([]),
      platforms: z.array(z.string()).default([]),
      integrations: z.array(z.string()).default([]),
      // Cheapest paid plan as a phrase, e.g. "$20 per user per month". Missing means quote only or unknown.
      startingPrice: z.string().optional(),
      freeTier: z.boolean().optional(),
      trialDays: z.number().int().optional(),
      deployment: z.enum(['cloud', 'self-hosted', 'both']).optional(),
      companySize: z.array(z.enum(['solo', 'small', 'mid', 'enterprise'])).default([]),
      // One sentence, "Pick X if ...". Shown as the short answer on compare and alternatives pages.
      verdictLine: z.string().optional(),
      // When a person last checked pricing and features against the vendor's site. Shown under the tables.
      dataCheckedAt: z.coerce.date().optional(),
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

// Hand-written verdicts for the pairs with real search demand. Every other pair renders the data-driven page.
const comparisons = defineCollection({
  loader: apiComparisonsLoader(),
  schema: z.object({
    toolA: z.string(),
    toolB: z.string(),
    verdictHtml: z.string(),
    pickAIf: z.array(z.string()).default([]),
    pickBIf: z.array(z.string()).default([]),
    winner: z.string().optional(),
    winnerReason: z.string().optional(),
    reviewedAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog, tools, comparisons };
