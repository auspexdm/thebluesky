# The Blue Sky Resort Alibag — Website

A premium, mobile-first, conversion-focused website for The Blue Sky
Resort Alibag, built with Next.js (App Router) + TypeScript + Tailwind
CSS v4, ready to deploy on Vercel from GitHub.

**Before this goes live**, read `/docs/launch-checklist.md`. Every rating,
award, price, policy, and contact detail on this site is currently an
unverified placeholder by design — see "Truthfulness" below.

## Truthfulness by design

This site was built without inventing any business facts. Every rating,
award, room price, policy, and contact detail is either hidden or clearly
marked `[PLACEHOLDER]` until the resort team confirms it in the content
files under `src/content/`. See `/docs/cms-content-model.md` for how the
content model works and `/docs/launch-checklist.md` for the full list of
what needs verifying before launch.

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note on fonts**: this project uses `next/font/google` (Fraunces +
> Inter), which fetches font files at build/dev time. That requires normal
> outbound internet access — it works fine on Vercel and on a typical
> developer machine, but will fail in network-restricted sandboxes.

## Project structure

```
src/
  app/            Routes (App Router) — one folder per page in the IA
  components/      Shared UI (Header, Footer, forms, cards, etc.)
  content/         Typed CMS-style content/data files — see docs/cms-content-model.md
  lib/             Analytics, JSON-LD builders, small utilities
docs/              Supporting deliverables (see below)
```

## Supporting documentation

- `docs/cms-content-model.md` — content model & editor guide
- `docs/booking-engine-integration-plan.md` — booking engine integration
  plan and the enquiry fallback flow currently live
- `docs/analytics-event-spec.md` — the full analytics event plan
- `docs/seo-redirect-plan.md` — SEO setup and redirect-migration plan
- `docs/accessibility-performance-qa-checklist.md` — QA checklist
- `docs/launch-checklist.md` — verifies every claim before go-live

## Deploying — GitHub + Vercel

1. **Push this project to a GitHub repository.**

   ```bash
   git init   # if not already a repo
   git add .
   git commit -m "Initial build: The Blue Sky Resort Alibag website"
   git branch -M main
   git remote add origin https://github.com/<your-org>/<your-repo>.git
   git push -u origin main
   ```

2. **Import the repo into Vercel.**
   - Go to [vercel.com/new](https://vercel.com/new) and import the GitHub
     repository.
   - Framework preset: Vercel auto-detects **Next.js** — no changes
     needed.
   - Build command: `next build` (default). Output: managed automatically
     by the Next.js framework preset.

3. **Set environment variables in Vercel** (Project Settings →
   Environment Variables) once you have them:
   - Analytics provider keys (once wired into `src/lib/analytics.ts`).
   - Any booking-engine or payment-provider API keys (once integrated —
     see `docs/booking-engine-integration-plan.md`).
   - An email-sending provider key for `/api/enquiry` (once wired — see
     the same doc).

4. **Add your custom domain** in Vercel (Project Settings → Domains), then
   update `SITE_URL` in `src/lib/schema.tsx` to match before your next
   deploy, so canonical URLs, sitemap, and structured data all point to
   the real domain.

5. **Every subsequent `git push` to `main`** auto-deploys via Vercel's
   GitHub integration; pushes to other branches get their own preview
   deployments — a good place to review content changes (e.g. flipping a
   `verified` flag) before they go live.

## Before you flip the site live

Work through `docs/launch-checklist.md` top to bottom with someone from
the resort team. Nothing marked `verified: false` in `src/content/`
should stay that way once real guests can see the page.
