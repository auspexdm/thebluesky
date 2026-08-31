# Booking-Engine Integration Plan & Fallback Flow

## Current state (as of 2026-08-24)

**Live.** `resortInfo.bookingEngineUrl` and `resortInfo.bookingEngineProvider`
are both `verified: true` in `src/content/resort.ts`, pointing at the
resort's Secure Booking Engine cart URL supplied by the resort team. The
single source of truth for every booking link is `src/lib/booking.ts`
(`bookingHref` / `isLiveBookingEngine`) — every "Book Now" / "Check
availability" control in `Header.tsx`, `MobileBottomBar.tsx`, `RoomCard.tsx`,
the homepage, `/experience`, and `/stay/[room-slug]` imports `bookingHref`
from there, so there is nowhere else that needs updating if the URL ever
changes.

Flow as shipped:

1. Header, mobile bottom bar, and most "Check availability" buttons link
   **directly** to the live booking engine URL, in the same tab.
2. The `/stay` page's `AvailabilityWidget` still lets a guest pick dates
   first; on submit it redirects to the same booking engine URL (same tab)
   and shows a one-line disclosure ("Checking availability opens our secure
   booking partner in this tab...") above the button, satisfying spec
   section 8's brand-continuity + disclosure requirement.
3. The enquiry flow (`EnquiryForm` → `POST /api/enquiry`) remains as a
   **permanent fallback** for group stays and anything the booking engine
   can't handle — it is not removed just because the booking engine is
   live.

If `resortInfo.bookingEngineUrl.verified` is ever flipped back to `false`
(e.g. the provider changes and the new URL isn't ready yet), `bookingHref`
automatically falls back to `/stay#availability` and `AvailabilityWidget`
automatically falls back to the transparent enquiry flow described below —
no other code changes needed.

## Fallback flow (when no booking engine URL is verified)

1. Guest enters dates/guests/rooms in `AvailabilityWidget`.
2. The widget explicitly tells them live search isn't connected yet — it
   never fakes a search result or spinner that pretends to check
   inventory.
3. They're routed to `EnquiryForm`, pre-filled with their dates via
   `sessionStorage` (see `readStoredCriteria`/`storeCriteria` in
   `AvailabilityWidget.tsx`).
4. Submission posts to `POST /api/enquiry` (see below), which currently
   validates + logs server-side and returns a success confirmation. A
   human on the resort team then confirms manually.

This satisfies spec section 8: *"If using an external booking engine...
If live inventory is unavailable, convert this to a transparent enquiry
flow; do not pretend availability is live."*

## Still open

1. **Pass UTM data through** where the provider allows it —
   `getStoredUtms()` in `lib/analytics.ts` already captures and stores
   incoming UTM params; the current Secure Booking Engine URL is a fixed
   cart link with no documented query-param contract, so UTMs are not yet
   appended. Revisit if the provider publishes a deep-link spec.
2. **Wire the full event set** (see `/docs/analytics-event-spec.md`) to the
   real provider's callback/webhook/redirect events where possible —
   `booking_engine_open` already fires client-side on redirect;
   `room_selected`, `checkout_start`, `booking_complete`, `booking_error`
   still only fire from the enquiry flow, since the booking engine is
   off-site and doesn't call back into this site.
3. **Confirm payment provider separately.** `resortInfo.paymentProvider`
   should only flip to `verified: true` once the resort team confirms the
   processor the booking engine uses at checkout — this also gates the
   "Secure direct booking" trust badge in `src/content/trustBadges.ts`.

## `/api/enquiry` — current stub, and what it needs before launch

`src/app/api/enquiry/route.ts` currently:

- Validates required fields (name, valid email, consent checkbox).
- Rejects silently if the honeypot field (`company_website`) is filled.
- Logs the payload server-side.
- Returns a generic success response.

**It does not yet forward anything to a human.** Before launch, wire one
of:

- An email send (e.g. via Resend, Postmark, or SMTP) to the reservations
  inbox in `resortInfo.contact.email`.
- A CRM/lead-capture webhook if the resort team uses one.
- At minimum, a scheduled export of logs if nothing else is available —
  though this is not recommended as a sole channel.

Also add basic abuse protection beyond the honeypot before launch: a
simple rate limit per IP (e.g. via Vercel's Edge Config or an in-memory
token bucket for low volume) is usually sufficient for a single-property
site; add a CAPTCHA only if spam becomes a real problem.

## Group enquiry recipient routing

`EnquiryForm` posts the same `type: "group-enquiry"` payload shape for
group stays as for room enquiries. Before launch, decide whether group
enquiries should route to a different inbox/person than individual room
enquiries, and branch in `/api/enquiry/route.ts` accordingly.
