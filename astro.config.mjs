import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/site.config.ts';
import { VERTICALS } from './src/data/taxonomy.ts';

// Category pages with no tools render noindex, so keep them out of the sitemap too.
// Counts come from the backend; if it cannot be reached here the build still proceeds
// (the content loader will fail loudly a moment later if the API is really down).
const apiBase = (process.env.TOOLS_API_URL ?? SITE.apiBase).replace(/\/$/, '');
let emptyCategoryPaths = [];
try {
  const res = await fetch(`${apiBase}/api/tools/counts`);
  const counts = res.ok ? await res.json() : {};
  emptyCategoryPaths = VERTICALS.filter((v) => !counts[v.slug]).map((v) => `/categories/${v.slug}/`);
} catch {
  console.warn('[sitemap] could not fetch tool counts from the API; including every category page');
}

export default defineConfig({
  site: SITE.url,
  integrations: [
    sitemap({
      filter: (page) => !emptyCategoryPaths.some((p) => page.endsWith(p)),
    }),
  ],
  trailingSlash: 'always',
  build: { format: 'directory' },
});
