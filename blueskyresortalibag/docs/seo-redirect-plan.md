# SEO Migration / Redirect Plan

## What's already in place

- **Per-page metadata**: every route exports (or generates, for room
  pages) a unique `title`, `description`, and `alternates.canonical` — see
  each `page.tsx`.
- **Sitemap**: `src/app/sitemap.ts` — includes all public routes and every
  room detail page. `/policies` is deliberately excluded (see below).
- **Robots**: `src/app/robots.ts` — allows all crawling except `/api/*`,
  points to the sitemap.
- **`/policies` is `noindex`** (`robots: { index: false }` in
  `src/app/policies/page.tsx`) until its legal content is approved —
  remove that once the resort team signs off on the copy.
- **Structured data**: `Organization` + `LodgingBusiness` site-wide
  (`src/lib/schema.tsx`, rendered in `layout.tsx`), `BreadcrumbList` on
  every inner page (`Breadcrumbs.tsx`), `FAQPage` on `/faqs` (only
  includes questions with `publicOnSite: true`). `AggregateRating`/
  `Review` are embedded in `LodgingBusiness` only when the underlying
  facts are `verified: true` — see `lodgingBusinessSchema()` in
  `src/lib/schema.tsx`. No `Event` or `Offer` schema exists because there
  are no real published events or time-valid offers yet — add them only
  when real ones exist, per the truthfulness rules.
- **Social preview image**: a brand-only (no photography) OG image at
  `src/app/opengraph-image.tsx`, generated at build time. Add per-page
  `opengraph-image.tsx` files (e.g. `src/app/stay/opengraph-image.tsx`)
  once real photography exists, for richer previews on `/stay`,
  `/group-stays`, etc.
- **Indexable HTML**: all pages are React Server Components rendering to
  static/prerendered HTML — no important copy is client-only rendered.

## Before launch

1. **Set the real production domain.** `SITE_URL` in `src/lib/schema.tsx`
   is a placeholder (`https://www.theblueskyresortalibag.com`) — update it
   to the actual domain once confirmed, and set `metadataBase` in
   `src/app/layout.tsx` accordingly (it already reads from `SITE_URL`).
2. **Populate the redirect map.** If there's an existing live site for The
   Blue Sky Resort Alibag, list its current indexed URLs (check Google
   Search Console or `site:` search) and map each to its new equivalent
   route below, then add them to the `redirects()` function in
   `next.config.ts`:

   | Old URL (example — confirm actual) | New route |
   |---|---|
   | `/rooms` or `/accommodation` | `/stay` |
   | `/about` | `/` (About content folded into homepage + `/experience`) |
   | `/facilities` or `/amenities` | `/experience` |
   | `/restaurant` | `/experience#cafe` |
   | `/contact` | `/location` |
   | `/reviews` | `/` (Guest Voices section) or `/faqs` |
   | `/blog/*` | Evaluate case-by-case; redirect high-traffic posts to the
     most relevant new page, 410/404 the rest if no longer relevant |

3. **Submit the new sitemap** to Google Search Console and Bing Webmaster
   Tools after DNS cutover.
4. **Verify canonical + hreflang** aren't needed beyond `en-IN` (single
   locale site — no `hreflang` currently implemented, add only if a second
   language is introduced).
5. **Re-check the `noindex` on `/policies`** — remove once legal content is
   approved, so it can be indexed and linked from search.
6. **Image SEO**: once real photography replaces `PlaceholderImage`
   components, ensure every `next/image` usage carries the descriptive
   `altText` already present in each content file's `GalleryImage`/`Room`
   records — don't regenerate generic alt text.

## Ongoing

- Keep `title`/`description` unique per page as new rooms or content are
  added — the `Metadata` pattern used throughout is copy-paste safe.
- Re-run through the launch checklist (`/docs/launch-checklist.md`)
  whenever a new trust claim, price, or policy is added.
