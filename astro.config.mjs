import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { SITE } from './src/site.config.ts';
import { VERTICALS } from './src/data/taxonomy.ts';

// Category pages with no tools are rendered noindex, so keep them out of the sitemap too.
const toolsDir = new URL('./src/content/tools/', import.meta.url);
const usedVerticals = new Set(
  readdirSync(toolsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readFileSync(new URL(f, toolsDir), 'utf8').match(/^vertical:\s*(\S+)/m)?.[1])
    .filter(Boolean),
);
const emptyCategoryPaths = VERTICALS.filter((v) => !usedVerticals.has(v.slug)).map((v) => `/categories/${v.slug}/`);

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
