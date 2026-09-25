import type { Loader } from 'astro/loaders';
import { SITE } from '../site.config';

/**
 * Loads published tools from the backend at build time. The site stays fully static;
 * the backend only has to be up while a build runs. A failed fetch fails the build on purpose,
 * so Cloudflare keeps the previous deploy live instead of publishing an empty directory.
 */
export function apiToolsLoader(): Loader {
  return {
    name: 'api-tools',
    async load({ store, parseData, generateDigest, renderMarkdown, logger }) {
      const base = (process.env.TOOLS_API_URL ?? SITE.apiBase).replace(/\/$/, '');
      const url = `${base}/api/tools`;
      logger.info(`Loading tools from ${url}`);
      const res = await fetch(url).catch((e: Error) => { throw new Error(`Could not reach the tools API at ${url}: ${e.message}`); });
      if (!res.ok) throw new Error(`Tools API returned ${res.status} for ${url}. Check TOOLS_API_URL (Cloudflare Pages env) or SITE.apiBase.`);
      const tools = (await res.json()) as Array<Record<string, unknown> & { slug: string; body?: string }>;
      store.clear();
      for (const t of tools) {
        const { body = '', ...fields } = t;
        const data = await parseData({ id: t.slug, data: fields });
        store.set({ id: t.slug, data, body, digest: generateDigest(t), rendered: await renderMarkdown(body) });
      }
      logger.info(`Loaded ${tools.length} tools`);
    },
  };
}
