# Accessibility & Performance QA Checklist

Target: WCAG 2.2 AA, excellent Core Web Vitals on mid-range mobile.

## Accessibility — built in, verify before launch

- [ ] Skip link (`Skip to main content`) works via keyboard on every page (`globals.css` `.skip-link`, `layout.tsx`).
- [ ] All landmarks present: `header`, `nav[aria-label]`, `main`, `footer` — verify with a screen reader landmark list (VoiceOver rotor / NVDA landmarks list).
- [ ] Every icon-only control has an `aria-label` (WhatsApp icon buttons, mobile menu toggle, gallery lightbox close/prev/next) — spot-check with a screen reader.
- [ ] Focus is visible on every interactive element (global `:focus-visible` style in `globals.css`) — tab through each page start to finish.
- [ ] Mobile menu: `aria-expanded` toggles correctly, focus doesn't get lost when opening/closing (`Header.tsx`).
- [ ] Accordions (`Accordion.tsx`, native `<details>/<summary>`) open/close via Enter/Space and are announced correctly.
- [ ] Gallery lightbox (`GalleryClient.tsx`): opens with focus on the close button, `Escape` closes and returns focus to the trigger thumbnail, `Tab`/`Shift+Tab` stay trapped inside the dialog, arrow keys navigate.
- [ ] Forms: every input has a associated `<label>`, the preferred-contact radio group has a `<fieldset><legend>`, required fields are marked, error messages use `role="alert"`, success states use `role="status"`.
- [ ] Breadcrumbs: all ancestors are links, current page has `aria-current="page"`, mobile-collapsed view still reaches Home.
- [ ] Color contrast: re-check with a contrast checker once real photography sits behind hero text overlays — the current gradient overlay (`page.tsx` hero) is tuned for the placeholder graphic; real images may need the overlay opacity adjusted to keep ivory text readable.
- [ ] `prefers-reduced-motion` respected — verify smooth-scroll and any future animation additions honor the media query already set globally in `globals.css`.
- [ ] No content is ever hidden exclusively behind `:hover` (spec section 7 — room facts must not hide behind hover).
- [ ] Run an automated pass (axe DevTools or Lighthouse accessibility audit) on every route listed below and fix any flagged issues.

## Performance — verify before launch

- [ ] Run Lighthouse (mobile, throttled) on `/`, `/stay`, `/stay/[a-room]`, `/group-stays`, `/gallery` — target LCP < 2.5s, CLS < 0.1, INP < 200ms.
- [ ] Once real photography replaces `PlaceholderImage`, convert every image to `next/image` with correct `sizes`, WebP/AVIF (already enabled in `next.config.ts`), and `priority` only on the true LCP image (the hero).
- [ ] Preload only the hero image and essential fonts — do not add additional `<link rel="preload">` tags without checking their impact on LCP.
- [ ] Confirm `next/font/google` (Fraunces, Inter) is working at build time in the actual deploy environment — it requires outbound network access during `next build`, which Vercel provides. (Verified locally via a temporary system-font stub, since this dev sandbox blocks outbound font requests — see commit history / build logs.)
- [ ] Keep the JS footprint minimal: no animation libraries have been added; keep it that way unless a specific, justified need arises.
- [ ] Booking widget (`AvailabilityWidget`) and other client components are already scoped with `"use client"` only where needed — most of the site remains server-rendered.
- [ ] Map embed: currently a static placeholder + "Open in Google Maps" link, per spec's performance-safe default — if an embedded interactive map is added later, lazy-load it (e.g. load the iframe only on user interaction/intersection) rather than embedding it eagerly.
- [ ] Verify no more than one analytics script and no more than one chat/WhatsApp widget loads (currently: none — `track()` only logs to console until a provider is wired in).
- [ ] Confirm static generation is working as expected: `/`, `/experience`, `/faqs`, `/gallery`, `/group-stays`, `/location`, `/stay`, and all `/stay/[room-slug]` pages should prerender (confirmed via `next build` — see route summary in build output, all marked `○` or `●`).

## Routes to test on both mobile (360px width minimum) and desktop

- `/`
- `/stay`
- `/stay/cozy-couple-room` (and the other 4 room slugs)
- `/group-stays`
- `/experience`
- `/gallery`
- `/location`
- `/faqs`
- `/policies`

## Forms to test end-to-end (loading / success / error states)

- Homepage hero availability widget → redirects to `/stay#availability`.
- `/stay` availability widget → fallback enquiry message → `/stay#enquiry` form.
- `/stay/[room-slug]` → "Enquire about this room" → `/stay#enquiry`.
- `/group-stays` group enquiry form.
- `/location` contact form.
- Submit each with: valid data (success state), missing required field (inline error), invalid email (inline error), and a filled honeypot field (silently accepted, nothing sent — verify via server logs it isn't processed).
