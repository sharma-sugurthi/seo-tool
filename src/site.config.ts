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
    'Independent reviews, comparisons and a curated directory of AI tools for finance, accounting, bookkeeping and business operations. Plus done-for-you SEO, link building and LinkedIn growth services for B2B SaaS.',
  email: 'hello@lantle.ai',
  // Create a free form at https://formspree.io (or Tally / Basin) and paste the endpoint here.
  formEndpoint: 'https://formspree.io/f/REPLACE_ME',
  social: {
    linkedin: 'https://www.linkedin.com/company/REPLACE_ME',
  },
  // How advertisers pay. Shown on the Advertise page. Change when you add Stripe or another processor.
  paymentMethods: 'PayPal invoice or bank transfer',
  // Current domain rating. Update as the site grows; it is shown on the Advertise page.
  domainRating: 'New site (building authority)',
};

export type Price = { name: string; price: string; unit?: string; points: string[]; badge?: string };

/** What advertisers can buy on THIS site. Founding rates: raise them as domain rating and traffic grow. */
export const ADVERTISE_PRICES: Price[] = [
  {
    name: 'Sponsored article',
    price: '$89',
    unit: 'per article',
    points: [
      'Up to 2 dofollow links (rel="sponsored")',
      '800 to 1,500 words, written by you or by us (+$40)',
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

/** Extra fee when we write a sponsored article for the advertiser. Shown in the Advertise FAQ. */
export const SPONSORED_WRITING_FEE = '$19';

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
      '1,200–2,000 words, fact-checked, with schema markup and meta tags',
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
      '6 months link monitoring (typical turnaround: 2–4 weeks)',
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
      'One time fee, all listings are permanent (5–7 days turnaround)',
    ],
  },
];
