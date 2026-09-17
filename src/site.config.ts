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
    price: '$60',
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
    name: 'Link insertion',
    price: '$35',
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
    price: '$49',
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
    price: '$79',
    unit: 'per month',
    points: [
      'Tool of the month card above the fold',
      'Mention in that month\'s LinkedIn post from our page',
      'Limited to 1 sponsor per month',
    ],
  },
];

/** Extra fee when we write a sponsored article for the advertiser. Shown in the Advertise FAQ. */
export const SPONSORED_WRITING_FEE = '$40';

/**
 * Done-for-you services you sell to other companies.
 * Order matters: it is the order shown on the Services page and in the quote form.
 * Founding client rates. Lock them for the first 10 clients, then raise.
 */
export const SERVICE_PRICES: Price[] = [
  {
    name: 'Guest post outreach and placement',
    price: 'from $80',
    unit: 'per placement',
    badge: 'Start here',
    points: [
      'We find, vet (real traffic, DR 30+) and negotiate niche finance and SaaS sites',
      'Article written and placed, dofollow link to your page',
      'Pay per live link, not per attempt',
      'Replacement guarantee for 6 months',
    ],
  },
  {
    name: 'Directory and listicle placement',
    price: '$99',
    unit: 'one time',
    points: [
      'Submission to 100+ AI and SaaS directories (Product Hunt, SaaSHub, AlternativeTo, G2, Capterra and more)',
      'Pitch for inclusion in 10 "best X tools" listicles',
      'Spreadsheet of every submission with status and live links',
      'Delivered in 10 business days',
    ],
  },
  {
    name: 'SEO and GEO blog content',
    price: 'from $60',
    unit: 'per article',
    points: [
      'Keyword and AI search research (what ChatGPT and Google actually cite)',
      '1,200 to 2,000 words, expert reviewed, with schema markup',
      'Internal links, meta tags and a featured image',
      'Bundles of 4 or 8 a month at a discount',
    ],
  },
  {
    name: 'LinkedIn ghostwriting for founders',
    price: 'from $250',
    unit: 'per month',
    points: [
      '12 posts a month in the founder\'s voice, from a 30 minute interview',
      'Hooks, carousels and comment replies',
      'Repurposed from your blog, podcast or customer calls',
      'Weekly performance summary',
    ],
  },
];
