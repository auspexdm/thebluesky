import { PolicySection } from "./types";

/**
 * Policy content — none is approved yet. The /policies page renders
 * only sections with `approved: true`; legally-required sections
 * that are not yet approved show a clear "pending legal review"
 * placeholder rather than fabricated legal text.
 */
export const policySections: PolicySection[] = [
  {
    id: "booking-terms",
    title: "Booking Terms",
    body: "[PLACEHOLDER: approved booking terms — rates, payment, amendments]",
    approved: false,
    legallyRequired: true,
  },
  {
    id: "cancellation-policy",
    title: "Cancellation & Refund Policy",
    body: "[PLACEHOLDER: approved cancellation window, refund and no-show rules]",
    approved: false,
    legallyRequired: true,
  },
  {
    id: "child-policy",
    title: "Child & Extra Bed Policy",
    body: "[PLACEHOLDER: approved child age bands and extra bed charges]",
    approved: false,
    legallyRequired: false,
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    body: "[PLACEHOLDER: approved privacy policy — data collected, purpose, retention, contact for data requests]",
    approved: false,
    legallyRequired: true,
  },
  {
    id: "general-house-rules",
    title: "House Rules",
    body: "[PLACEHOLDER: approved house rules — pets, smoking, noise, ID requirements]",
    approved: false,
    legallyRequired: false,
  },
];

export const approvedPolicies = policySections.filter((p) => p.approved);
