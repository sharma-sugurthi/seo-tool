import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.ts';
import { VERTICALS } from './src/data/taxonomy.ts';

// Pages that render noindex stay out of the sitemap too: category pages with no tools, and
// alternatives pages for a tool with fewer than three same-category peers (see src/pages/tools/alternatives).
// The list comes from the backend; if it cannot be reached here the build still proceeds
// (the content loader will fail loudly a moment later if the API is really down).
const apiBase = (process.env.TOOLS_API_URL ?? SITE.apiBase).replace(/\/$/, '');
// Pages that are noindex never belong in the sitemap. Thank-you pages are noindex by template; the rest depend on content.
let noindexPaths = ['/thanks/', '/submitted/', '/404/'];
try {
  const [toolsRes, cmpRes] = await Promise.all([fetch(`${apiBase}/api/tools`), fetch(`${apiBase}/api/comparisons`)]);
  if (!toolsRes.ok) throw new Error(`tools API returned ${toolsRes.status}`);
  const tools = await toolsRes.json();
  const verdicts = cmpRes.ok ? await cmpRes.json() : [];
  const verdictKeys = new Set(verdicts.map((c) => [c.toolA, c.toolB].sort().join('-vs-')));
  const perVertical = {};
  const perCategory = {};
  for (const t of tools) {
    perVertical[t.vertical] = (perVertical[t.vertical] ?? 0) + 1;
    perCategory[t.category] = (perCategory[t.category] ?? 0) + 1;
  }
  // Mirror of the compare page's thin-page rule: no editorial verdict and structured data missing on either side.
  const hasData = (t) => (t.pros?.length ?? 0) > 0 || (t.keyFeatures?.length ?? 0) > 0 || !!t.startingPrice;
  const thinPairs = [];
  for (let i = 0; i < tools.length; i++) for (let j = i + 1; j < tools.length; j++) {
    const a = tools[i], b = tools[j];
    if (a.category !== b.category) continue;
    const key = [a.slug, b.slug].sort((x, y) => x.localeCompare(y)).join('-vs-');
    if (!verdictKeys.has(key) && (!hasData(a) || !hasData(b))) thinPairs.push(`/tools/compare/${key}/`);
  }
  noindexPaths.push(
    ...VERTICALS.filter((v) => !perVertical[v.slug]).map((v) => `/categories/${v.slug}/`),
    ...tools.filter((t) => (perCategory[t.category] ?? 1) - 1 < 3).map((t) => `/tools/alternatives/${t.slug}/`),
    ...thinPairs,
  );
  console.log(`[sitemap] excluding ${noindexPaths.length} noindex pages (${thinPairs.length} thin compare pages)`);
} catch (e) {
  // The content loader fails the build a moment later if the API is really down, so a sitemap that is too wide never ships.
  console.warn(`[sitemap] could not fetch from the API (${e.message}); the content loader will fail the build if it is down`);
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
