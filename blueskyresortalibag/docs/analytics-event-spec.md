# Analytics Event Specification

## Implementation

`src/lib/analytics.ts` exports a single `track(event, properties)` helper.
It is:

- **Consent-aware**: `track()` is a no-op until `getConsent() === "granted"`
  (set via the `ConsentBanner` component, stored in `localStorage`).
- **Provider-agnostic**: `dispatch()` currently only `console.log`s in
  non-production — wire a real provider (GA4, Plausible, PostHog, Segment,
  etc.) inside `dispatch()` before launch. Nothing else in the codebase
  needs to change.
- **UTM-aware**: `captureUtms()` reads `utm_*` query params on page load
  and stores them in `sessionStorage`; `getStoredUtms()` reads them back
  for passthrough into enquiry submissions and (once connected) the
  booking engine handoff.

## Event list (matches spec section 16)

| Event | Fired from | Properties |
|---|---|---|
| `view_home` | Homepage + several inner pages via `TrackPageView` | `page` (inner pages only) |
| `availability_search` | `AvailabilityWidget` on submit | `checkIn`, `checkOut`, `guests`, `rooms`, `live` |
| `room_view` | `/stay` index and each `/stay/[room-slug]` page | `room` (slug) or `page: "stay-index"` |
| `booking_start` | Header "Book Now", mobile bottom bar, `/stay` enquiry form focus | `location` or `formType` |
| `booking_engine_open` | `AvailabilityWidget` when a live booking engine is connected | search criteria |
| `room_selected` | *Not yet wired — fires once a real booking engine's room-select step exists* | room/rate id |
| `checkout_start` | *Not yet wired — fires once a real booking engine's checkout step exists* | — |
| `booking_complete` | `/stay` enquiry form successful submit (stand-in until real booking exists) | `formType` |
| `booking_error` | Any `EnquiryForm` submit failure | `formType` |
| `group_enquiry_start` | Group Stays page view, form focus | `formType` |
| `group_enquiry_submit` | Group enquiry form successful submit | `formType` |
| `whatsapp_click` | Header WhatsApp icon, mobile bottom bar, homepage final CTA, group-stays WhatsApp CTA | `location` |
| `call_click` | *Add to `tel:` links in Footer/Location once phone number is verified* | — |
| `email_click` | *Add to `mailto:` links in Footer/Location once email is verified* | — |
| `directions_click` | *Add to "Get directions" / Google Maps links once `googleMapsUrl` is verified* | — |
| `review_link_click` | *Add to the "Read reviews on Google" CTA once the Google rating trust badge is verified and that CTA is enabled* | — |
| `award_badge_click` | *Add to MakeMyTrip/Times of India badge links once verified and rendered* | — |
| `gallery_open` | `GalleryClient` lightbox open, gallery page view | `imageId`, `category` |

Events marked "not yet wired" have no live trigger yet because the
underlying feature (a real booking engine, a verified phone/email/rating)
doesn't exist on the site yet — the event name and intended trigger point
are documented here so whoever wires the feature also wires the event in
the same change, rather than it being forgotten.

## Adding the missing click-tracking

Some events are trivial to add once their target is verified and
rendered — e.g. in `Footer.tsx`:

```tsx
<a href={`tel:${contact.phoneNumber.value}`} onClick={() => track("call_click", { location: "footer" })}>
```

Search the codebase for existing `track(...)` calls as a pattern to copy.

## Suggested dashboard (for whichever analytics provider is wired in)

Build views for:

1. **Direct booking conversion** — `view_home` → `availability_search` →
   `booking_start` → `booking_complete` (or `booking_engine_open` →
   `checkout_start` → real completion, once live).
2. **Booking drop-off** — funnel step-by-step drop between the above.
3. **Group leads** — `group_enquiry_start` → `group_enquiry_submit`,
   segmented by `occasion` (captured in the enquiry payload, not yet in
   an analytics property — add it if the provider needs it explicitly).
4. **Channel/source** — segment all events by captured UTM params.
5. **Mobile vs. desktop** — standard device/viewport dimension from
   whichever provider is wired in.

## Data minimization

Only what's needed for the funnel above is captured. No enquiry-form
personal data (name/email/phone/message) should be sent to the analytics
provider — those fields stay in the `/api/enquiry` payload only, per
"Do not collect unnecessary personal data" (spec section 16).
