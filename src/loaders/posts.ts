import type { Loader } from 'astro/loaders';
import { SITE } from '../site.config';

/** Loads published articles from the backend at build time. Same contract as the tools loader. */
export function apiPostsLoader(): Loader {
  return {
    name: 'api-posts',
    async load({ store, parseData, generateDigest, renderMarkdown, logger }) {
      const base = (process.env.TOOLS_API_URL ?? SITE.apiBase).replace(/\/$/, '');
      const url = `${base}/api/posts`;
      logger.info(`Loading posts from ${url}`);
      const res = await fetch(url).catch((e: Error) => { throw new Error(`Could not reach the posts API at ${url}: ${e.message}`); });
      if (!res.ok) throw new Error(`Posts API returned ${res.status} for ${url}.`);
      const posts = (await res.json()) as Array<Record<string, unknown> & { slug: string; body?: string }>;
      store.clear();
      for (const p of posts) {
        const { body = '', ...fields } = p;
        const data = await parseData({ id: p.slug, data: fields });
        store.set({ id: p.slug, data, body, digest: generateDigest(p), rendered: await renderMarkdown(body) });
      }
      logger.info(`Loaded ${posts.length} posts`);
    },
  };
}
