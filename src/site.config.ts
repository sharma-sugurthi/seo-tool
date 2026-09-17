/**
 * Single place to change the brand, domain, prices and form endpoints.
 * Everything on the site reads from here.
 */
export const SITE = {
  name: 'Lantle',
  tagline: 'AI tools that run the money side of a business',
  // Replace with your real domain once bought. Used for canonical URLs, sitemap and RSS.
  url: 'https://lantle.ai',
  description:
    'Independent reviews, comparisons and a curated directory of AI tools for finance, accounting, bookkeeping and business operations. Plus done-for-you SEO, Reddit and LinkedIn growth services for B2B SaaS.',
  email: 'hello@lantle.ai',
  // Create a free form at https://formspree.io (or Tally / Basin) and paste the endpoint here.
  formEndpoint: 'https://formspree.io/f/REPLACE_ME',
  social: {
    linkedin: 'https://www.linkedin.com/company/REPLACE_ME',
    twitter: 'https://x.com/REPLACE_ME',
    reddit: 'https://www.reddit.com/user/REPLACE_ME',
  },
  // Current domain rating. Update as the site grows; it is shown on the Advertise page.
  domainRating: 'New site (building authority)',
};

export type Price = { name: string; price: string; unit?: string; points: string[]; badge?: string };

/** What advertisers can buy on THIS site. */
export const ADVERTISE_PRICES: Price[] = [
  {
    name: 'Sponsored article',
    price: '$120',
    unit: 'per article',
    points: [
      'Up to 2 dofollow links (rel="sponsored")',
      '800 to 1,500 words, written by you or by us (+$60)',
      'Permanent, indexed, shared on LinkedIn and Reddit',
      'Live within 3 business days',
    ],
    badge: 'Most popular',
  },
  {
    name: 'Link insertion',
    price: '$70',
    unit: 'per link',
    points: [
      '1 contextual link in an existing, indexed article',
      'You choose the article and anchor text (within guidelines)',
      'Permanent placement',
      'Live within 48 hours',
    ],
  },
  {
    name: 'Featured tool listing',
    price: '$90',
    unit: 'per year',
    points: [
      'Dedicated tool page with dofollow link, logo and screenshots',
      'Pinned to the top of your category for 12 months',
      'Included in our "best tools" roundups where relevant',
      'Free basic listing (nofollow) is always available',
    ],
  },
  {
    name: 'Homepage spotlight',
    price: '$150',
    unit: 'per month',
    points: [
      'Tool of the month card above the fold',
      'Mention in that month\'s newsletter and LinkedIn post',
      'Limited to 1 sponsor per month',
    ],
  },
];

/** Done-for-you services you sell to other companies. */
export const SERVICE_PRICES: Price[] = [
  {
    name: 'Reddit presence and citations',
    price: 'from $350',
    unit: 'per month',
    badge: 'Best for AI visibility',
    points: [
      'Aged, reputable accounts engaged in your buyers\' subreddits',
      '15 to 20 genuinely helpful comments and 4 posts a month that mention your product where it fits',
      'Reddit threads are heavily cited by Google AI Overviews, ChatGPT and Perplexity',
      'Monthly report: threads, upvotes, mentions, AI citations spotted',
    ],
  },
  {
    name: 'LinkedIn ghostwriting for founders',
    price: 'from $400',
    unit: 'per month',
    points: [
      '12 posts a month in the founder\'s voice, from a 30 minute interview',
      'Hooks, carousels and comment replies',
      'Repurposed from your blog, podcast or customer calls',
      'Weekly performance summary',
    ],
  },
  {
    name: 'SEO and GEO blog content',
    price: 'from $90',
    unit: 'per article',
    points: [
      'Keyword and AI search research (what ChatGPT and Google actually cite)',
      '1,200 to 2,000 words, expert reviewed, with schema markup',
      'Internal links, meta tags and a featured image',
      'Bundles of 4 or 8 a month at a discount',
    ],
  },
  {
    name: 'Directory and listicle placement',
    price: '$150',
    unit: 'one time',
    points: [
      'Submission to 100+ AI and SaaS directories (Product Hunt, SaaSHub, AlternativeTo, G2, Capterra and more)',
      'Pitch for inclusion in 10 "best X tools" listicles',
      'Spreadsheet of every submission with status and live links',
      'Delivered in 10 business days',
    ],
  },
  {
    name: 'Guest post outreach and placement',
    price: 'from $120',
    unit: 'per placement',
    points: [
      'We find, vet (real traffic, DR 30+) and negotiate niche sites',
      'Article written and placed, dofollow link to your page',
      'Pay per live link, not per attempt',
      'Replacement guarantee for 6 months',
    ],
  },
  {
    name: 'AI visibility audit',
    price: '$250',
    unit: 'one time',
    points: [
      'How often ChatGPT, Perplexity, Gemini and Google AI Overviews mention you versus competitors',
      'Which sources they cite for your category',
      'Prioritised 90 day plan to earn those citations',
      'Credited toward any monthly plan',
    ],
  },
];
