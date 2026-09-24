/**
 * Two level taxonomy for the directory.
 * A vertical is the top level (Finance, Marketing, ...). A category sits inside a vertical.
 * Tool frontmatter uses `vertical: <slug>` and `category: <name>`, validated in content.config.ts.
 * To open a new area, add a vertical here. Nothing else needs to change.
 */
export type Vertical = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  categories: string[];
};

export const VERTICALS: Vertical[] = [
  {
    slug: 'finance',
    name: 'Finance and accounting',
    short: 'Finance',
    blurb: 'Bookkeeping, accounts payable, expenses, forecasting and tax. Tools that run the money side of a business.',
    categories: [
      'Bookkeeping',
      'Accounts payable',
      'Expense management',
      'FP&A and forecasting',
      'Tax',
      'Invoicing and AR',
      'Spend cards',
      'Business operations',
    ],
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    short: 'Marketing',
    blurb: 'SEO, content, email, social and paid. Tools that find customers and keep them paying attention.',
    categories: ['SEO and search', 'Content and copywriting', 'Email marketing', 'Social media', 'Advertising', 'Marketing analytics'],
  },
  {
    slug: 'sales',
    name: 'Sales',
    short: 'Sales',
    blurb: 'Prospecting, CRM, outreach and proposals. Tools that move deals from first touch to signed.',
    categories: ['CRM', 'Prospecting and outbound', 'Sales enablement', 'Proposals and quoting', 'Conversation intelligence'],
  },
  {
    slug: 'customer-support',
    name: 'Customer support',
    short: 'Support',
    blurb: 'Help desks, chat agents, voice and feedback. Tools that answer customers before a person has to.',
    categories: ['Chatbots and agents', 'Help desk', 'Voice and call centre', 'Feedback and surveys', 'Knowledge base'],
  },
  {
    slug: 'productivity',
    name: 'Productivity',
    short: 'Productivity',
    blurb: 'Writing, meetings, tasks and automation. Tools that give a working day some of its hours back.',
    categories: ['Writing and notes', 'Meetings and transcription', 'Project management', 'Automation and workflows', 'Search and knowledge'],
  },
  {
    slug: 'developer-tools',
    name: 'Developer tools',
    short: 'Developer',
    blurb: 'Coding assistants, testing, infrastructure and docs. Tools for the people who build the software.',
    categories: ['Coding assistants', 'Testing and QA', 'DevOps and infrastructure', 'APIs and integration', 'Documentation'],
  },
  {
    slug: 'design',
    name: 'Design and creative',
    short: 'Design',
    blurb: 'Image, video, audio, UI and slides. Tools that produce the visual and creative work.',
    categories: ['Image generation', 'Video', 'Audio and voice', 'UI and prototyping', 'Presentations'],
  },
  {
    slug: 'data',
    name: 'Data and analytics',
    short: 'Data',
    blurb: 'Dashboards, pipelines, spreadsheets and research. Tools that turn raw numbers into decisions.',
    categories: ['BI and dashboards', 'Data pipelines', 'Spreadsheets', 'Research and insights'],
  },
  {
    slug: 'hr',
    name: 'HR and recruiting',
    short: 'HR',
    blurb: 'Hiring, onboarding, engagement and payroll. Tools for finding people and keeping them.',
    categories: ['Recruiting and sourcing', 'Onboarding and training', 'Performance and engagement', 'Payroll and benefits'],
  },
  {
    slug: 'legal',
    name: 'Legal and compliance',
    short: 'Legal',
    blurb: 'Contracts, policy, signatures and IP. Tools that keep the paperwork right and the risk low.',
    categories: ['Contract review', 'Compliance and policy', 'E-signature', 'IP and trademarks'],
  },
  {
    slug: 'ecommerce',
    name: 'Ecommerce and retail',
    short: 'Ecommerce',
    blurb: 'Storefronts, product content, inventory and pricing. Tools for businesses that sell things online.',
    categories: ['Storefront and merchandising', 'Product content', 'Inventory and fulfilment', 'Pricing and promotions'],
  },
  {
    slug: 'operations',
    name: 'Operations and IT',
    short: 'Operations',
    blurb: 'Procurement, logistics, scheduling and security. Tools that keep the rest of the company running.',
    categories: ['Procurement', 'Logistics and supply chain', 'Scheduling', 'Security and IT'],
  },
];

export const verticalSlugs = VERTICALS.map((v) => v.slug) as [string, ...string[]];

export function getVertical(slug: string): Vertical {
  const v = VERTICALS.find((x) => x.slug === slug);
  if (!v) throw new Error(`Unknown vertical "${slug}". Add it to src/data/taxonomy.ts.`);
  return v;
}

/** Category name to vertical, for pages that only know the category. */
export function verticalForCategory(category: string): Vertical | undefined {
  return VERTICALS.find((v) => v.categories.includes(category));
}
