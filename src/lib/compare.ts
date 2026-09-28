/**
 * Shared logic for the compare, alternatives and tool pages. Everything here reads editorial data only:
 * featured (paid) placement is never an input to a label, a ranking or a verdict.
 */
import type { CollectionEntry } from 'astro:content';
import { FEATURES } from '../data/taxonomy';

export type Tool = CollectionEntry<'tools'>;
export type ToolData = Tool['data'];

export const SIZE_LABEL: Record<string, string> = { solo: 'Solo', small: 'Small teams', mid: 'Mid-size', enterprise: 'Enterprise' };
export const DEPLOY_LABEL: Record<string, string> = { cloud: 'Cloud', 'self-hosted': 'Self-hosted', both: 'Cloud or self-hosted' };

/** Ranking for lists that must not be influenced by paid placement: rating, then editor's pick, then name. */
export const editorialRank = (a: Tool, b: Tool): number =>
  (b.data.rating ?? 0) - (a.data.rating ?? 0) || Number(b.data.editorsPick) - Number(a.data.editorsPick) || a.data.name.localeCompare(b.data.name);

/** First dollar amount in a starting price phrase, or null for quote-only, percentage or unknown pricing. */
export function priceNumber(s?: string): number | null {
  if (!s || /%/.test(s)) return null;
  const m = s.replace(/,/g, '').match(/\$\s*(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

export const hasFreePlan = (d: ToolData): boolean => d.freeTier === true || d.pricing === 'Free';
export const isQuoteOnly = (d: ToolData): boolean => !d.startingPrice && (d.pricing === 'Enterprise' || d.pricing === 'Paid');

export function priceCell(d: ToolData): string {
  if (d.pricing === 'Free') return 'Free';
  if (d.startingPrice) return d.startingPrice;
  if (d.pricing === 'Enterprise') return 'Quote only';
  return 'Not published';
}
export function freeCell(d: ToolData): string {
  if (d.pricing === 'Free') return 'Everything is free';
  if (d.freeTier === true) return 'Yes';
  if (d.freeTier === false) return 'No';
  return 'Not listed';
}
export function trialCell(d: ToolData): string {
  if (d.trialDays == null) return 'Not listed';
  return d.trialDays === 0 ? 'No trial' : `${d.trialDays} days`;
}
export const sizeCell = (d: ToolData): string => (d.companySize.length ? d.companySize.map((s) => SIZE_LABEL[s]).join(', ') : 'Not listed');
export const deployCell = (d: ToolData): string => (d.deployment ? DEPLOY_LABEL[d.deployment] : 'Not listed');
export const platformsCell = (d: ToolData): string => (d.platforms.length ? d.platforms.join(', ') : 'Not listed');
export const ratingCell = (d: ToolData): string => (d.rating ? `${d.rating} / 5` : 'Not rated');

/** Spec rows for the tables. Rows where no tool has data are dropped so the table never shows a column of "Not listed". */
export function specRows(tools: ToolData[]): { label: string; cells: string[] }[] {
  const rows: { label: string; get: (d: ToolData) => string; known: (d: ToolData) => boolean }[] = [
    { label: 'Starting price', get: priceCell, known: (d) => !!d.startingPrice || d.pricing === 'Free' || d.pricing === 'Enterprise' },
    { label: 'Free plan', get: freeCell, known: (d) => d.freeTier != null || d.pricing === 'Free' },
    { label: 'Free trial', get: trialCell, known: (d) => d.trialDays != null },
    { label: 'Pricing model', get: (d) => d.pricing, known: () => true },
    { label: 'Platforms', get: platformsCell, known: (d) => d.platforms.length > 0 },
    { label: 'Deployment', get: deployCell, known: (d) => !!d.deployment },
    { label: 'Company size', get: sizeCell, known: (d) => d.companySize.length > 0 },
    { label: 'Best for', get: (d) => d.bestFor, known: (d) => !!d.bestFor },
    { label: 'Our rating', get: ratingCell, known: (d) => !!d.rating },
  ];
  return rows.filter((r) => tools.some(r.known)).map((r) => ({ label: r.label, cells: tools.map(r.get) }));
}

export type Mark = 'yes' | 'no' | 'unknown';
/** Tick when listed, cross only when the tool has feature data and the label is in the vertical vocabulary, otherwise unknown. Unknown is never rendered as a no. */
export function featureMatrix(vertical: string, tools: ToolData[]): { feature: string; marks: Mark[] }[] {
  const vocab = FEATURES[vertical] ?? [];
  return vocab
    .map((feature) => ({
      feature,
      marks: tools.map((d): Mark => (d.keyFeatures.includes(feature) ? 'yes' : d.keyFeatures.length ? 'no' : 'unknown')),
    }))
    .filter((r) => r.marks.includes('yes'));
}

/** "Pick X if" conditions derived from the data when no editorial list exists. Concrete because the inputs are concrete. */
export function derivedPicks(d: ToolData, other: ToolData): string[] {
  const out: string[] = [];
  if (hasFreePlan(d) && !hasFreePlan(other)) out.push(`You want a permanent free plan; ${other.name} has none`);
  const pa = priceNumber(d.startingPrice);
  const pb = priceNumber(other.startingPrice);
  if (pa != null && pb != null && pa < pb) out.push(`Budget matters: the entry plan starts lower (${d.startingPrice})`);
  if ((d.deployment === 'self-hosted' || d.deployment === 'both') && other.deployment === 'cloud') out.push('You need to run it on your own servers');
  const onlySizes = d.companySize.filter((s) => !other.companySize.includes(s));
  if (onlySizes.length) out.push(`You are a ${onlySizes.map((s) => SIZE_LABEL[s].toLowerCase()).join(' or ')} buyer`);
  const onlyPlatforms = d.platforms.filter((p) => !other.platforms.includes(p) && p !== 'Web');
  if (onlyPlatforms.length) out.push(`You work in ${onlyPlatforms.slice(0, 3).join(', ')}`);
  const onlyFeatures = d.keyFeatures.filter((f) => other.keyFeatures.length && !other.keyFeatures.includes(f));
  if (onlyFeatures.length) out.push(`Your must-haves include ${onlyFeatures.slice(0, 2).join(' and ')}`);
  if (d.verdictLine) out.unshift(d.verdictLine.replace(/^Pick\s+\S.*?\s+if\s+/i, '').replace(/\.$/, '').replace(/^\w/, (c) => c.toUpperCase()));
  return [...new Set(out)].slice(0, 4);
}

export type Labelled = { tool: Tool; label?: string };
/**
 * Give each alternative at most one label, each label to at most one tool, in priority order.
 * Featured is deliberately not a criterion. Rating and editorial data only.
 */
export function labelAlternatives(alts: Tool[]): Labelled[] {
  const taken = new Set<string>();
  const labels = new Map<string, string>();
  const best = (cands: Tool[]) => cands.filter((t) => !taken.has(t.id)).sort(editorialRank)[0];
  const assign = (label: string, t?: Tool) => { if (t) { taken.add(t.id); labels.set(t.id, label); } };
  assign('Highest rated alternative', best(alts.filter((t) => t.data.rating && t.data.rating >= 4.5)));
  assign('Best free alternative', best(alts.filter((t) => hasFreePlan(t.data))));
  const priced = alts.filter((t) => priceNumber(t.data.startingPrice) != null && !taken.has(t.id));
  if (priced.length >= 2) assign('Cheapest paid plan', priced.sort((a, b) => priceNumber(a.data.startingPrice)! - priceNumber(b.data.startingPrice)! || editorialRank(a, b))[0]);
  assign('Best if you need self-hosting', best(alts.filter((t) => t.data.deployment === 'self-hosted' || t.data.deployment === 'both')));
  assign('Best for enterprises', best(alts.filter((t) => t.data.companySize.includes('enterprise') && !t.data.companySize.includes('solo'))));
  assign('Best for solo users and small teams', best(alts.filter((t) => t.data.companySize.includes('solo'))));
  assign("Editor's pick", best(alts.filter((t) => t.data.editorsPick)));
  assign('Best mobile apps', best(alts.filter((t) => t.data.platforms.includes('iOS') && t.data.platforms.includes('Android'))));
  return alts.map((tool) => ({ tool, label: labels.get(tool.id) }));
}

/** Situation paragraphs for the alternatives page: which of the alternatives fit which constraint. */
export function situations(base: ToolData, alts: Tool[]): { title: string; text: string }[] {
  const names = (ts: Tool[]) => ts.slice(0, 4).map((t) => t.data.name).join(', ').replace(/, ([^,]*)$/, ' and $1');
  const out: { title: string; text: string }[] = [];
  const free = alts.filter((t) => hasFreePlan(t.data)).sort(editorialRank);
  if (free.length) out.push({ title: 'You want a free plan', text: `${names(free)} ${free.length > 1 ? 'have' : 'has'} a permanent free tier${hasFreePlan(base) ? `, as does ${base.name}, so compare the limits of each free plan rather than the price` : `, which ${base.name} does not, so the switch can cost nothing until you outgrow the limits`}.` });
  const cheap = alts.filter((t) => priceNumber(t.data.startingPrice) != null).sort((a, b) => priceNumber(a.data.startingPrice)! - priceNumber(b.data.startingPrice)!);
  const basePrice = priceNumber(base.startingPrice);
  if (cheap.length) {
    const cheaper = basePrice != null ? cheap.filter((t) => priceNumber(t.data.startingPrice)! < basePrice) : cheap;
    if (cheaper.length) out.push({ title: 'You want a lower entry price', text: `${cheaper.slice(0, 3).map((t) => `${t.data.name} (${t.data.startingPrice})`).join(', ')} start${cheaper.length === 1 ? 's' : ''} below ${base.name}${base.startingPrice ? ` (${base.startingPrice})` : ''} on the entry paid plan. Check what the entry plan leaves out before you count the saving.` });
  }
  const selfHosted = alts.filter((t) => t.data.deployment === 'self-hosted' || t.data.deployment === 'both').sort(editorialRank);
  if (selfHosted.length && base.deployment !== 'self-hosted') out.push({ title: 'You need to host it yourself', text: `${names(selfHosted)} can run on your own servers. ${base.name} is ${base.deployment === 'both' ? 'also available self-hosted' : 'cloud only'}.` });
  const enterprise = alts.filter((t) => t.data.companySize.includes('enterprise')).sort(editorialRank);
  if (enterprise.length && !base.companySize.includes('enterprise') && base.companySize.length) out.push({ title: 'You have outgrown it', text: `${base.name} fits ${base.companySize.map((s) => SIZE_LABEL[s].toLowerCase()).join(' and ')} buyers. For a company past a few hundred people, ${names(enterprise)} ${enterprise.length > 1 ? 'are' : 'is'} built for enterprise procurement, permissions and audit requirements.` });
  const solo = alts.filter((t) => t.data.companySize.includes('solo')).sort(editorialRank);
  if (solo.length && !base.companySize.includes('solo') && base.companySize.length) out.push({ title: 'You are a one-person team', text: `${base.name} is sized for ${base.companySize.map((s) => SIZE_LABEL[s].toLowerCase()).join(' and ')} teams. ${names(solo)} ${solo.length > 1 ? 'work' : 'works'} for a single user without paying for seats you do not use.` });
  const mobile = alts.filter((t) => t.data.platforms.includes('iOS') && t.data.platforms.includes('Android')).sort(editorialRank);
  if (mobile.length && !(base.platforms.includes('iOS') && base.platforms.includes('Android')) && base.platforms.length) out.push({ title: 'You need proper mobile apps', text: `${names(mobile)} ship both iOS and Android apps. ${base.name} lists ${base.platforms.join(', ')}.` });
  const missing = base.keyFeatures.length ? alts.filter((t) => t.data.keyFeatures.some((f) => !base.keyFeatures.includes(f))) : [];
  if (missing.length) {
    const gaps = new Map<string, Tool[]>();
    for (const t of missing) for (const f of t.data.keyFeatures) if (!base.keyFeatures.includes(f)) gaps.set(f, [...(gaps.get(f) ?? []), t]);
    const top = [...gaps.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 3);
    if (top.length) out.push({ title: `You need something ${base.name} does not do`, text: top.map(([f, ts]) => `${f} is listed by ${names(ts.sort(editorialRank))}`).join('. ') + '. See the feature matrix on each compare page for the full list.' });
  }
  return out;
}

/** Lowercase the first letter for mid-sentence use, unless it looks like a proper noun or acronym (second letter is uppercase or the word is one letter). */
export const midSentence = (s: string): string => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

export const pairPath = (a: string, b: string): string => { const [x, y] = [a, b].sort(); return `/tools/compare/${x}-vs-${y}/`; };
export const fmtDate = (d?: Date): string => (d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
