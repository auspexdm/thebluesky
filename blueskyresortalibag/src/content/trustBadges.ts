import { TrustBadge } from "./types";

/**
 * TRUST BADGES — all unverified placeholders.
 * `verified: false` means the badge MUST NOT render on the live
 * site (see TrustStrip component) — never show an empty badge slot
 * to guests. Flip to true only after the resort team supplies
 * proof (rating export, MakeMyTrip badge grant, ToI article link).
 */
export const trustBadges: TrustBadge[] = [
  {
    id: "google-rating",
    label: "Google rating",
    verified: false,
    displayValue: "[PLACEHOLDER: e.g. 4.6 (312 reviews)]",
    note: "Requires: rating value, review count, official review URL, and retrieval date.",
  },
  {
    id: "makemytrip-star-host",
    label: "MakeMyTrip Star Host",
    verified: false,
    displayValue: "[PLACEHOLDER: exact MakeMyTrip wording]",
    logoPermissionGranted: false,
  },
  {
    id: "times-of-india",
    label: "Times of India recognition",
    verified: false,
    displayValue: "[PLACEHOLDER: exact award/article title + year]",
    logoPermissionGranted: false,
  },
  {
    id: "secure-booking",
    label: "Secure direct booking",
    verified: false,
    note: "Only enable once checkout/payment integration is live and PCI-compliant.",
  },
];
