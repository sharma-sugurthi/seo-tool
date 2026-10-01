/** Small schema.org builders shared by the page templates. Every URL is absolute. */
export type Crumb = { name: string; path: string };

export function breadcrumbList(site: URL | undefined, crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: new URL(c.path, site).toString() })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** "$20 per user per month" -> 20. Returns null for quote-only or free text we cannot parse. */
export function priceValue(s?: string): number | null {
  if (!s) return null;
  const m = s.replace(/,/g, '').match(/\$\s?(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

/** Cap a meta description at 160 characters on a word boundary. */
export function metaDescription(s: string, max = 160): string {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 80)).replace(/[,;:.]$/, '')}…`;
}
