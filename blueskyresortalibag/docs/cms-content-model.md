# CMS Content Model & Editor Guide

## How content works in this build

There is no external CMS wired up yet. Every piece of editable content —
rooms, trust badges, reviews, FAQs, gallery images, group-stay content,
policies, and resort/contact details — lives as typed data files in
`src/content/`. This was chosen deliberately for launch:

- No new accounts or services to set up before going live on Vercel.
- Free, versioned in the same GitHub repo the site deploys from.
- Every field is typed (`src/content/types.ts`), so a wrong or missing
  field is a build error, not a silent bug on the live site.

This is a legitimate "lightweight CMS" for a small team that's comfortable
opening a text file, or who hands edits to a developer. If the resort team
later wants a point-and-click dashboard, the schema below maps directly
onto a headless CMS (Sanity, Contentful, Payload, etc.) — see "Upgrading to
a hosted CMS" at the bottom.

## The core rule: `verified`

Almost every fact-bearing field is wrapped in a `VerifiedFact<T>`:

```ts
{
  value: T,
  verified: boolean,
  verifiedDate?: string,   // ISO date last confirmed
  source?: string,         // URL or internal reference
  note?: string,           // editor-facing note
}
```

**`verified: false` means the UI will not display it as a real claim.**
Trust badges, prices, ratings, and awards with `verified: false` are hidden
outright (never shown as an empty badge or "coming soon" — see
`TrustStrip.tsx`). Policy and FAQ fields with `verified`/`approved: false`
show an honest "pending confirmation" message instead of the placeholder
text itself leaking onto the live site copy... except right now, before
launch, the placeholder text **is** visible in a few spots so the resort
team can see exactly what needs to be filled in. Search the codebase for
`[PLACEHOLDER` to find every one — see `/docs/launch-checklist.md`.

## Content files

| File | Governs |
|---|---|
| `src/content/resort.ts` | Address, map, check-in/out, policies summary, contact channels, booking/payment provider, social links |
| `src/content/rooms.ts` | All 5 room types: capacity, beds, size, highlights, inclusions/exclusions, images, pricing |
| `src/content/trustBadges.ts` | Google rating, MakeMyTrip Star Host, Times of India recognition, secure-booking claim |
| `src/content/reviews.ts` | Guest testimonials (empty until approved reviews are supplied) |
| `src/content/faqs.ts` | All FAQ content, tagged by topic and gated by `publicOnSite` |
| `src/content/gallery.ts` | Gallery image slots, categorized |
| `src/content/groupStays.ts` | Group use cases, stay configurations, planning steps |
| `src/content/experience.ts` | Pool/garden/café/beach/events feature tiles |
| `src/content/policies.ts` | Booking terms, cancellation, privacy, house rules |

## Editing a room

Open `src/content/rooms.ts`, find the room by `slug`, and update fields.
Example — confirming max guests for the Quad Room:

```ts
maxGuests: { value: 4, verified: true, verifiedDate: "2026-09-01" },
```

To publish a real price, `rate.fromPrice` must be a `VerifiedFact<Money>`
**and** `rate.liveSource` must not be `"none"` — this two-part gate exists
so a stale hardcoded price can never survive a rate change silently (see
spec section 7: "Never show stale fixed pricing if rates vary").

## Editing images

Every image is currently a labeled placeholder (`PlaceholderImage`
component) describing the real photo that belongs there. To swap one in:

1. Add the real, compressed image file (WebP/AVIF preferred) to `public/images/...`.
2. Replace the relevant `PlaceholderImage` usage with `next/image`, using
   the `altText` already defined in the content file.
3. Keep `alt` text required and accurate — the CMS types make `altText`
   mandatory on every `GalleryImage`.

## Adding a review

Reviews are empty by default — never fabricate one. Add an entry to
`src/content/reviews.ts` only once the resort team supplies the guest's
name/initial, the source (Google/MakeMyTrip/Direct), a link back to the
original, and sets `approved: true`.

## Upgrading to a hosted CMS

If the team wants a non-technical dashboard later, the fastest path is:

1. Stand up Sanity (or similar) with a schema mirroring `src/content/types.ts`.
2. Replace the static imports in `src/content/*.ts` with fetch calls to the
   CMS (e.g. `getRooms()` using the Sanity client), keeping the same
   exported shapes so no page/component code needs to change.
3. Keep the `verified`/`approved` gating fields in the CMS schema — they're
   what keeps unverified claims off the live site.

## Admin safeguards to add if/when a real CMS is introduced

- Draft/preview/publish workflow (native to most headless CMSs).
- Required alt text at the schema level (already required in `types.ts`).
- Mandatory verification fields for ratings, awards, offers — mirror the
  `verified`/`verifiedDate`/`source` pattern already in `types.ts`.
- Audit trail for changes to trust badges, prices, and policies.
- Seasonal offers with automatic expiry (add an `expiresAt` field and
  filter it out server-side, not just client-side).
