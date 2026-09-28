import { getCollection } from 'astro:content';
import { VERTICALS } from '../data/taxonomy';

/**
 * Static search index for the command palette (built once, fetched lazily on first open).
 * k: kind (tool | cat | post | page), n: name, d: one line, c: context label, u: url, i: image
 */
export async function GET() {
  const tools = await getCollection('tools');
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const counts = Object.fromEntries(VERTICALS.map((v) => [v.slug, tools.filter((t) => t.data.vertical === v.slug).length]));
  const items = [
    ...tools
      .sort((a, b) => (b.data.rating ?? 0) - (a.data.rating ?? 0) || a.data.name.localeCompare(b.data.name))
      .map((t) => ({ k: 'tool', n: t.data.name, d: t.data.tagline, c: t.data.category, u: `/tools/${t.id}/`, i: t.data.thumbnail ?? '' })),
    ...VERTICALS.map((v) => ({ k: 'cat', n: v.name, d: v.categories.join(', '), c: counts[v.slug] ? `${counts[v.slug]} tools` : 'Open for listings', u: `/categories/${v.slug}/` })),
    ...posts.map((p) => ({ k: 'post', n: p.data.title, d: p.data.description, c: p.data.tags.slice(0, 2).join(', '), u: `/blog/${p.id}/` })),
    { k: 'page', n: 'Submit a tool', d: 'Free basic listing, featured placement and sponsored articles', c: '', u: '/submit-tool/' },
    { k: 'page', n: 'All categories', d: 'Every vertical in the directory', c: '', u: '/categories/' },
    { k: 'page', n: 'Growth services', d: 'SEO content, guest posts, directory submissions, LinkedIn ghostwriting', c: '', u: '/services/' },
    { k: 'page', n: 'Learn', d: 'Scorecard, cost calculator, security checklist, glossary', c: '', u: '/learn/' },
    { k: 'page', n: 'About and editorial policy', d: 'Who writes the reviews and what paid placement does and does not buy', c: '', u: '/about/' },
    { k: 'page', n: 'Contact', d: 'Email us', c: '', u: '/contact/' },
  ];
  return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json; charset=utf-8' } });
}
