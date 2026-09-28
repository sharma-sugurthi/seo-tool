import type { Loader } from 'astro/loaders';
import { SITE } from '../site.config';

/** Editorial "A vs B" verdicts from the backend. Missing endpoint (older backend) is not fatal: the pages fall back to the data-driven version. */
export function apiComparisonsLoader(): Loader {
  return {
    name: 'api-comparisons',
    async load({ store, parseData, generateDigest, logger }) {
      const base = (process.env.TOOLS_API_URL ?? SITE.apiBase).replace(/\/$/, '');
      const url = `${base}/api/comparisons`;
      const res = await fetch(url).catch((e: Error) => { throw new Error(`Could not reach the comparisons API at ${url}: ${e.message}`); });
      store.clear();
      if (res.status === 404) { logger.warn('The backend has no /api/comparisons yet; compare pages render without editorial verdicts'); return; }
      if (!res.ok) throw new Error(`Comparisons API returned ${res.status} for ${url}`);
      const rows = (await res.json()) as Array<Record<string, unknown> & { toolA: string; toolB: string }>;
      for (const c of rows) {
        const id = `${c.toolA}-vs-${c.toolB}`;
        const data = await parseData({ id, data: c });
        store.set({ id, data, digest: generateDigest(c) });
      }
      logger.info(`Loaded ${rows.length} editorial comparisons`);
    },
  };
}
