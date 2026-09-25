/**
 * Single place to change the brand, domain, prices and backend address.
 * Everything on the site reads from here.
 */
export const SITE = {
  name: 'Lantle',
  tagline: 'AI tools for every job in a business, reviewed by people',
  // Replace with your real domain once bought. Used for canonical URLs, sitemap and RSS.
  url: 'https://lantle.ai',
  description:
    'A directory of AI and software tools for every part of a business, with independent reviews, side by side comparisons and free listings for any product. Plus done-for-you SEO, link building and LinkedIn growth services for software companies.',
  email: 'hello@lantle.ai',
  // The backend (lantle-backend on Heroku). Forms post here, checkouts start here, and the build reads tools from here.
  // For a local build against a local backend, set TOOLS_API_URL in .env instead of changing this.
  apiBase: import.meta.env.TOOLS_API_URL ?? 'https://lantle-backend-ed132a1d726a.herokuapp.com',
  // Cloudflare Turnstile site key (public). Leave empty to disable the bot check widget.
  turnstileSiteKey: '',
  social: {
    linkedin: 'https://www.linkedin.com/company/REPLACE_ME',
  },
  paymentMethods: 'Card, Apple Pay or Google Pay through Dodo Payments',
};

export type Price = { name: string; price: string; unit?: string; points: string[]; badge?: string; buyHref?: string; buyLabel?: string };

/** Extra fee when we write a sponsored article for the advertiser. */
export const SPONSORED_WRITING_FEE = '$19';
/** Length of a sponsored article. Keep in one place so every page says the same thing. */
export const SPONSORED_ARTICLE_LENGTH = '1,500 to 1,800 words';

/** What advertisers can buy on THIS site. Charged amounts are set on the matching products in Dodo Payments. */
export const ADVERTISE_PRICES: Price[] = [
  {
    name: 'Sponsored article',
    price: '$89',
    unit: 'per article',
    points: [
      'Up to 2 dofollow links (rel="sponsored")',
      `${SPONSORED_ARTICLE_LENGTH}, written by you or by us (+${SPONSORED_WRITING_FEE})`,
      'Permanent, indexed, shared on LinkedIn',
      'Live within 3 business days',
    ],
    badge: 'Most popular',
  },
  {
    name: 'Featured tool listing',
    price: '$99',
    unit: 'per year',
    points: [
      'Dedicated tool page with dofollow link and custom thumbnail',
      'Pinned to the top of your category for 12 months',
      'Eligible for our "best tools" roundup articles',
      'Free basic listing (nofollow) is always available',
    ],
  },
];

/**
 * Done-for-you services, split into Content (we write) and Distribution (we place).
 * Founding client rates. Lock them for the first 10 clients, then raise.
 */
export const CONTENT_SERVICES: Price[] = [
  {
    name: 'SEO and GEO blog content',
    price: 'from $60',
    unit: 'per article',
    badge: 'Start here',
    points: [
      'Keyword research + AI citation research (what ChatGPT, Perplexity and Google actually cite)',
      '1,200 to 2,000 words, fact-checked, with schema markup and meta tags',
      'Optimised for both search rankings and AI Overviews',
      '4-article bundle available at 15% off',
    ],
  },
  {
    name: 'LinkedIn ghostwriting',
    price: 'from $150',
    unit: 'per month',
    points: [
      '8 posts per month (2 per week): hooks, text posts and document carousels',
      'Fully written in your voice after a 30-minute kick-off call',
      'Posting schedule, optimal timing and hashtag strategy included',
      'Month to month, cancel any time',
    ],
  },
];

export const DISTRIBUTION_SERVICES: Price[] = [
  {
    name: 'Guest post outreach and placement',
    price: 'from $99',
    unit: 'per placement',
    badge: 'Most popular',
    points: [
      'Article written and placed on vetted SaaS sites (DR 30+, no PBNs)',
      'Permanent dofollow link to the page of your choice',
      'Pay per live link with full domain metric reporting',
      '6 months link monitoring (typical turnaround: 2 to 4 weeks)',
    ],
  },
  {
    name: 'Directory and listicle package',
    price: '$199',
    unit: 'one time',
    points: [
      'Manual submission to 100+ active SaaS and product directories',
      'Works for any vertical: dev tools, fintech, ecommerce, B2B SaaS',
      'Spreadsheet of every live listing with URL and status',
      'One time fee, all listings are permanent (5 to 7 days turnaround)',
    ],
    buyHref: `${SITE.apiBase}/checkout/directory-package`,
    buyLabel: 'Buy now',
  },
];
