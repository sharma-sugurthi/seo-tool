# Lantle

A content site plus directory for AI and software tools across every business function (finance and accounting first), with pages that sell sponsored posts, link insertions, featured listings and done-for-you growth services (Reddit, LinkedIn, SEO content, directory placement, outreach).

Built with [Astro](https://astro.build). Hosts free on Cloudflare Pages, Netlify or Vercel. Content is loaded at build time from the backend database (Supabase via Lantle Backend). Features data-driven category pages, public API, Deals rail, and an MCP server for AI agents

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type check + static build into dist/
```

## Make it yours (15 minutes)

1. **Brand and domain.** Edit `src/site.config.ts`: name, tagline, URL, email, social links. Update `public/robots.txt` with the same domain.
2. **Backend.** Forms, submissions, payments and the tool listings themselves come from the `lantle-backend` service. Set `apiBase` in `src/site.config.ts` to its URL, and `TOOLS_API_URL` in Cloudflare Pages environment variables to the same value (the build fetches published tools from `/api/tools`). Locally, put `TOOLS_API_URL=http://localhost:3000` in `.env`.
3. **Prices.** `ADVERTISE_PRICES` (what people buy on this site) and `SERVICE_PRICES` (what you sell to other companies) live in the same file. Raise prices as domain rating grows and update `domainRating`.
4. **About page.** Replace the placeholder paragraph in `src/pages/about.astro` with your name, background and LinkedIn. Real people earn trust and sales.
5. **Favicon and logo.** `public/favicon.svg`.

## Content Management

- **Database-Driven Content:** All blog posts, editorial articles, and tool listings are submitted and managed via the `lantle-backend` admin panel. No markdown files needed!
- **Instant Publish & Deals:** Vendors can submit Free, Instant Publish ($29), and Featured listings. They can also attach deals (coupons/offers) that automatically show up on their profile.
- **Awards & Directory Packages:** Sell a $199 directory submission package, run Readers' Choice awards, and offer high-value SEO services.

## Deploy (free)

Cloudflare Pages: connect the repo, build command `npm run build`, output directory `dist`, root directory left blank (this folder is the repo root). Point your domain at it. Netlify and Vercel work the same way.

## Launch checklist

See `LAUNCH-CHECKLIST.md` for the step by step plan, the directory submission list and the first 30 days of sales actions.
