/** Visual helpers shared by cards and rows. Deterministic, so the same tool always gets the same colour. */
const TONES = ['#156b52', '#1f5f8b', '#7a4a1f', '#5b3d8a', '#8a2e4a', '#2f6b3a', '#8a6a1f', '#2a6a6a', '#6a3a2a', '#3a4f8a', '#4f6a2a', '#6a2a6a'];
export function toneFor(key: string): string {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}
export const initial = (name: string): string => name.replace(/^the\s+/i, '').charAt(0).toUpperCase();
export const hostOf = (url: string): string => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; } };
