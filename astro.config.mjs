import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.ts';
import { VERTICALS } from './src/data/taxonomy.ts';

// Pages that render noindex stay out of the sitemap too: category pages with no tools, and
// alternatives pages for a tool with fewer than three same-category peers (see src/pages/tools/alternatives).
// The list comes from the backend; if it cannot be reached here the build still proceeds
// (the content loader will fail loudly a moment later if the API is really down).
const apiBase = (process.env.TOOLS_API_URL ?? SITE.apiBase).replace(/\/$/, '');
let noindexPaths = [];
try {
  const res = await fetch(`${apiBase}/api/tools`);
  const tools = res.ok ? await res.json() : [];
  const perVertical = {};
  const perCategory = {};
  for (const t of tools) {
    perVertical[t.vertical] = (perVertical[t.vertical] ?? 0) + 1;
    perCategory[t.category] = (perCategory[t.category] ?? 0) + 1;
  }
  noindexPaths = [
    ...VERTICALS.filter((v) => !perVertical[v.slug]).map((v) => `/categories/${v.slug}/`),
    ...tools.filter((t) => (perCategory[t.category] ?? 1) - 1 < 3).map((t) => `/tools/alternatives/${t.slug}/`),
  ];
} catch {
  console.warn('[sitemap] could not fetch tools from the API; including every category and alternatives page');
}

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      filter: (page) => !noindexPaths.some((p) => page.endsWith(p)),
    }),
  ],
  trailingSlash: 'always',
  build: { format: 'directory' },
});
