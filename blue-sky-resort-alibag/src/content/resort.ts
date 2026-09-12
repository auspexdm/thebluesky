import { ResortInfo } from "./types";

/**
 * RESORT INFO — PLACEHOLDER DATA
 * ------------------------------------------------------------------
 * Every field below is currently unverified (`verified: false`).
 * The resort team must confirm each value; once confirmed, flip
 * `verified` to true and set `verifiedDate`. Components that render
 * these facts check `verified` and will not display false claims —
 * see /docs/launch-checklist.md before going live.
 */
export const resortInfo: ResortInfo = {
  legalName: "[PLACEHOLDER: Legal entity name]",
  brandName: "The Blue Sky Resort Alibag",

  address: {
    value: "Varsoli Village, near Varsoli Beach, Alibaug, Maharashtra",
    verified: true,
    verifiedDate: "2026-08-24",
    source: "https://www.theblueskyresortalibag.com/about",
    note: "Village-level address confirmed from the resort's live website. Exact street address/PIN still to be confirmed with the resort team before enabling precise map pins.",
  },

  mapCoordinates: {
    value: { lat: 0, lng: 0 },
    verified: false,
    note: "Placeholder coordinates — replace with verified GPS pin before enabling map.",
  },

  mapEmbedUrl: null,
  googleMapsUrl: null,

  beachDistance: {
    value: "Varsoli Beach, Alibaug",
    verified: true,
    verifiedDate: "2026-08-24",
    source: "https://www.theblueskyresortalibag.com/about",
    note: "Resort's own site names Varsoli Beach as the neighbouring beach; exact distance/walking time still to be confirmed and added before publishing a specific claim.",
  },

  checkIn: {
    value: "[PLACEHOLDER: e.g. 2:00 PM]",
    verified: false,
  },
  checkOut: {
    value: "[PLACEHOLDER: e.g. 11:00 AM]",
    verified: false,
  },
  childPolicy: {
    value: "[PLACEHOLDER: child age bands, extra bed rules, charges]",
    verified: false,
  },
  cancellationPolicySummary: {
    value: "[PLACEHOLDER: cancellation window, refund rules, no-show policy]",
    verified: false,
  },
  parking: {
    value: "[PLACEHOLDER: on-site parking availability, capacity, cost]",
    verified: false,
  },
  wifi: {
    value: "[PLACEHOLDER: Wi-Fi availability/coverage/speed notes]",
    verified: false,
  },
  poolAccess: {
    value: "[PLACEHOLDER: pool hours, guest-only rules, safety notes]",
    verified: false,
  },
  restaurantHours: {
    value: "[PLACEHOLDER: The Backyard Cafe opening hours]",
    verified: false,
  },
  accessibility: {
    value: "[PLACEHOLDER: step-free access, accessible rooms/bathrooms, ramps]",
    verified: false,
  },
  petsPolicy: {
    value: "[PLACEHOLDER: pets allowed / not allowed, conditions]",
    verified: false,
  },

  bookingEngineProvider: {
    value: "Secure Booking Engine",
    verified: true,
    verifiedDate: "2026-08-24",
    note: "Live booking link provided by the resort team and confirmed live on the resort's current website. See /docs/booking-engine-integration-plan.md for the redirect flow.",
  },
  bookingEngineUrl: {
    value:
      "https://www.secure-booking-engine.com/accounts/BfgSCVivNHnHbZJG2we-7A/properties/I2C5-lMV0M7dnUBhoAlYUg/booking-engine/web/source/4wsctBw6Oq6j-g9XuxeRzQ/cart/qxl0-3I-w9DmrNnnNkD8JQ/#!/rooms",
    verified: true,
    verifiedDate: "2026-08-24",
    note: "Provided directly by the resort team. Every Book Now / Check availability control redirects here, in the same tab, with a brief on-page disclosure that guests are moving to the booking partner — see AvailabilityWidget.tsx and /docs/booking-engine-integration-plan.md.",
  },
  paymentProvider: {
    value: "[PLACEHOLDER: handled by the booking engine at checkout — confirm processor name with resort team]",
    verified: false,
  },

  socialLinks: [
    { platform: "Instagram", url: "https://www.instagram.com/theblueskyalibaug/", verified: true },
    { platform: "Facebook", url: "https://www.facebook.com/theblueskyresortalibaug/", verified: true },
  ],

  contact: {
    whatsappNumber: {
      value: "+91 83696 36351",
      verified: false,
      source: "https://www.theblueskyresortalibag.com/about",
      note: "This is the resort's published phone number. Not yet confirmed as WhatsApp-enabled — flip to verified once the resort team confirms it takes WhatsApp messages.",
    },
    phoneNumber: {
      value: "+91 83696 36351",
      verified: true,
      verifiedDate: "2026-08-24",
      source: "https://www.theblueskyresortalibag.com/about",
    },
    email: {
      value: "theblueskyresortalibag@gmail.com",
      verified: true,
      verifiedDate: "2026-08-24",
      source: "https://www.theblueskyresortalibag.com/about",
    },
    responseHours: {
      value: "[PLACEHOLDER: e.g. 8:00 AM – 9:00 PM IST, daily]",
      verified: false,
    },
    responseTimeCommitment: null,
  },
};
