# Launch Checklist

**Nothing on this list may be marked done without a named person at The
Blue Sky Resort Alibag confirming it.** This site was deliberately built
with every business fact as an unverified placeholder — that was a
requirement, not an oversight. Every row below must flip from placeholder
to verified, in the code, before it can appear live. Search the codebase
for `[PLACEHOLDER` and `verified: false` to find every remaining one.

## How to verify a fact in the code

Each fact lives in `src/content/*.ts` as a `VerifiedFact<T>`:
`{ value, verified, verifiedDate, source }`. To publish it: set the real
`value`, set `verified: true`, set `verifiedDate` to today's date, and
where relevant set `source` to the proof (a URL, screenshot reference, or
internal document). Trust badges, prices, and policy text render
automatically once `verified`/`approved` flips to `true` — no other code
change is needed. See `/docs/cms-content-model.md` for details.

## Ratings & awards (`src/content/trustBadges.ts`)

- [ ] Google rating value, review count, official Google review URL, and
      the date the rating was retrieved.
- [ ] MakeMyTrip "Star Host" status: exact wording MakeMyTrip permits,
      confirmation the logo may be used, and the destination URL it should
      link to.
- [ ] Times of India recognition: exact title as published, year, logo
      usage permission, and a working proof link (article URL).
- [ ] "Secure direct booking" claim — only enable once a real payment
      provider is integrated and the checkout flow is actually secure
      (see `/docs/booking-engine-integration-plan.md`).

## Reviews (`src/content/reviews.ts`)

- [ ] At least one real, approved guest review with name/initial, source,
      date, verbatim quote, and a link to the original — currently empty
      by design (no fabricated testimonials).

## Rooms (`src/content/rooms.ts`) — repeat for all 5 room types

- [ ] Room name (confirm "Quad Room", "Group Room Jumbo", "Romantic Glass
      Room", "Group Room Superior", "Cozy Couple Room" are the resort's
      actual current room names).
- [ ] Max guests and recommended occupancy (these must be visibly
      distinct per spec — the code already separates them, just needs
      real numbers).
- [ ] Bed configuration.
- [ ] Room size (or leave `roomSizeSqft: null` if genuinely unknown/not
      to be published).
- [ ] Highlights (2–3 real, specific features — not generic filler).
- [ ] Inclusions and exclusions.
- [ ] Accessibility notes, if any apply.
- [ ] Price: `rate.fromPrice` (amount, currency, tax status) **and**
      `rate.liveSource` set to a real source — both are required together
      before any price displays anywhere on the site.
- [ ] Real photography for every room (replacing `PlaceholderImage`).

## Resort-wide facts (`src/content/resort.ts`)

- [ ] Legal entity name and full registered address.
- [ ] GPS coordinates and Google Maps URL.
- [ ] Distance/walking time to Varsoli Beach — must be actually measured,
      not estimated.
- [ ] Check-in and check-out times.
- [ ] Child policy (age bands, extra bed charges).
- [ ] Cancellation policy summary.
- [ ] Parking availability/capacity/cost.
- [ ] Wi-Fi availability notes.
- [ ] Pool access hours and rules.
- [ ] Restaurant (The Backyard Cafe) hours.
- [ ] Accessibility notes (step-free access, accessible rooms).
- [ ] Pets policy.
- [ ] Booking engine provider (once selected/contracted — see
      `/docs/booking-engine-integration-plan.md`).
- [ ] Payment provider (once selected/contracted).
- [ ] WhatsApp number and confirmation the team will actually monitor and
      respond to it.
- [ ] Phone number.
- [ ] Email address.
- [ ] Response hours, and only add a response-time *commitment* if it's
      operationally guaranteed.
- [ ] Social links (Instagram/Facebook), only if the accounts are real,
      active, and belong to the resort.

## Group stays (`src/content/groupStays.ts`)

- [ ] Which use cases actually apply (family stays, reunions,
      celebrations, get-togethers, corporate offsites) — remove any that
      don't.
- [ ] Real multi-room/interconnecting configurations and capacities, if
      the resort wants to publish specific ones — otherwise leave the
      page inquiry-oriented (current default).
- [ ] Do not add promises of exclusive buyouts, event services, décor,
      catering, transport, alcohol, or music unless genuinely offered and
      approved (spec section 9 — explicitly called out as an area to
      avoid overpromising).

## Experience page (`src/content/experience.ts`)

- [ ] Pool description, hours, access rules.
- [ ] Garden/grounds description.
- [ ] The Backyard Cafe description, hours, menu style.
- [ ] Gatherings/events — only describe what's actually offered.
- [ ] Beach distance/walking time (same figure as above — keep in sync).

## FAQs (`src/content/faqs.ts`)

- [ ] Write real, approved answers and flip `publicOnSite: true` per item
      — only answered, approved items appear on the site or in FAQ
      schema. Unanswered/placeholder items stay hidden automatically.

## Policies (`src/content/policies.ts`)

- [ ] Booking Terms — legal review required.
- [ ] Cancellation & Refund Policy — legal review required.
- [ ] Child & Extra Bed Policy.
- [ ] Privacy Policy — legal review required; must describe what's
      actually collected (see `/api/enquiry/route.ts` and
      `src/lib/analytics.ts` for what the site currently captures).
- [ ] House Rules.
- [ ] Remove `robots: { index: false }` from `src/app/policies/page.tsx`
      once approved.

## Technical / infrastructure

- [ ] `SITE_URL` in `src/lib/schema.tsx` updated to the real production
      domain.
- [ ] Redirect map populated in `next.config.ts` (see
      `/docs/seo-redirect-plan.md`).
- [ ] Analytics provider wired into `dispatch()` in `src/lib/analytics.ts`.
- [ ] `/api/enquiry` forwards to a real inbox/CRM, not just server logs
      (see `/docs/booking-engine-integration-plan.md`).
- [ ] Booking engine and payment provider integrated, or the enquiry
      fallback consciously kept as the permanent flow.
- [ ] Accessibility and performance checklist completed
      (`/docs/accessibility-performance-qa-checklist.md`).
- [ ] Final grep for `[PLACEHOLDER` across `src/content/` returns zero
      results still visibly rendered on any page a real guest can reach.

## Final sign-off

- [ ] Someone at The Blue Sky Resort Alibag has reviewed this entire
      checklist and confirms every checked item is factually accurate as
      of the launch date.
- [ ] Sign-off name, role, and date: ______________________
