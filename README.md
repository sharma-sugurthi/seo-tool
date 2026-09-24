# Lantle

A content site plus directory for AI and software tools across every business function (finance and accounting first), with pages that sell sponsored posts, link insertions, featured listings and done-for-you growth services (Reddit, LinkedIn, SEO content, directory placement, outreach).

Built with [Astro](https://astro.build). No database, no server. Content is Markdown. Hosts free on Cloudflare Pages, Netlify or Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type check + static build into dist/
```

## Make it yours (15 minutes)

1. **Brand and domain.** Edit `src/site.config.ts`: name, tagline, URL, email, social links. Update `public/robots.txt` with the same domain.
2. **Forms.** Create a free form at Formspree (or Tally, Basin) and paste the endpoint into `formEndpoint` in `src/site.config.ts`. Every form on the site posts there.
3. **Prices.** `ADVERTISE_PRICES` (what people buy on this site) and `SERVICE_PRICES` (what you sell to other companies) live in the same file. Raise prices as domain rating grows and update `domainRating`.
4. **About page.** Replace the placeholder paragraph in `src/pages/about.astro` with your name, background and LinkedIn. Real people earn trust and sales.
5. **Favicon and logo.** `public/favicon.svg`.

## Publish a blog post in three steps

1. Copy `templates/blog-post.md` to `src/content/blog/your-slug.md`. The filename becomes the URL.
2. Fill in the frontmatter (title, description, date, author, tags) and write the post in Markdown.
3. Change `draft: true` to `draft: false`, run `npm run build`, push. Tag pages at `/blog/tag/<tag>/` update automatically.

Sponsored post? Set `sponsored: true` and write the sponsor's links as `<a href="https://sponsor.com" rel="sponsored">Sponsor</a>`. The disclosure notice appears automatically.

New tool? Copy `templates/tool-listing.md` to `src/content/tools/tool-name.md`.

## Add content

- **Blog post:** create `src/content/blog/my-post.md` with the frontmatter shown in existing posts. Set `sponsored: true` for paid articles. The layout adds the disclosure notice. Add `rel="sponsored"` to the sponsor's links in the Markdown, for example `<a href="https://sponsor.com" rel="sponsored">Sponsor</a>`.
- **Tool listing:** create `src/content/tools/tool-name.md`. Set `featured: true` for paid listings (dofollow link, pinned). Free listings get nofollow automatically.
- **Draft:** `draft: true` hides a post from the build.

The filename becomes the URL: `src/content/blog/hello.md` becomes `/blog/hello/`.

## Deploy (free)

Cloudflare Pages: connect the repo, build command `npm run build`, output directory `dist`, root directory left blank (this folder is the repo root). Point your domain at it. Netlify and Vercel work the same way.

## Launch checklist

See `LAUNCH-CHECKLIST.md` for the step by step plan, the directory submission list and the first 30 days of sales actions.
