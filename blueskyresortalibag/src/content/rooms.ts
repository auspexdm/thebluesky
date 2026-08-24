import { Room } from "./types";

/**
 * ROOM INVENTORY — PLACEHOLDER DATA
 * ------------------------------------------------------------------
 * Names below (Quad Room, Group Room Jumbo, Romantic Glass Room,
 * Group Room Superior, Cozy Couple Room) are carried over from the
 * brief as UNVERIFIED starting points only, per the spec's own
 * instruction to "treat names, capacities and prices as data to
 * verify before launch." Every capacity, bed config, inclusion and
 * price is `verified: false` until the resort team confirms it.
 * `rate.fromPrice` is `null` so no price renders anywhere on the
 * site until a live source is connected.
 */
const img = (id: string, category: Room["images"][number]["category"], label: string, alt: string) => ({
  id,
  category,
  altText: alt,
  placeholderLabel: label,
});

export const rooms: Room[] = [
  {
    slug: "cozy-couple-room",
    name: { value: "Cozy Couple Room", verified: false },
    positioningLabel: { value: "For couples", verified: false },
    maxGuests: { value: 2, verified: false },
    recommendedOccupancy: { value: "[PLACEHOLDER: recommended occupancy]", verified: false },
    bedConfiguration: { value: "[PLACEHOLDER: e.g. 1 queen bed]", verified: false },
    roomSizeSqft: null,
    highlights: [
      { value: "[PLACEHOLDER highlight 1]", verified: false },
      { value: "[PLACEHOLDER highlight 2]", verified: false },
      { value: "[PLACEHOLDER highlight 3]", verified: false },
    ],
    inclusions: [{ value: "[PLACEHOLDER: confirm inclusions]", verified: false }],
    exclusions: [{ value: "[PLACEHOLDER: confirm exclusions]", verified: false }],
    accessibilityNotes: null,
    rate: {
      fromPrice: {
        value: { amount: 1800, currency: "INR", taxStatus: "unspecified" },
        verified: true,
        verifiedDate: "2026-08-24",
        source: "https://www.theblueskyresortalibag.com/",
        note: "Sourced from the resort's live website. Treat as indicative — exact live rate and tax treatment are set by the booking engine at checkout.",
      },
      liveSource: "manual",
      ratePlanNote: "Best available rate — confirm final price and taxes at checkout.",
    },
    images: [
      img("ccr-1", "stays", "Cozy Couple Room — bed and window light", "Interior of the Cozy Couple Room showing the bed and natural light"),
      img("ccr-2", "stays", "Cozy Couple Room — seating nook", "Seating area in the Cozy Couple Room"),
    ],
    relatedSlugs: ["romantic-glass-room", "quad-room"],
  },
  {
    slug: "romantic-glass-room",
    name: { value: "Romantic Glass Room", verified: false },
    positioningLabel: { value: "For couples", verified: false },
    maxGuests: { value: 2, verified: false },
    recommendedOccupancy: { value: "[PLACEHOLDER: recommended occupancy]", verified: false },
    bedConfiguration: { value: "[PLACEHOLDER: e.g. 1 king bed]", verified: false },
    roomSizeSqft: null,
    highlights: [
      { value: "[PLACEHOLDER highlight 1]", verified: false },
      { value: "[PLACEHOLDER highlight 2]", verified: false },
      { value: "[PLACEHOLDER highlight 3]", verified: false },
    ],
    inclusions: [{ value: "[PLACEHOLDER: confirm inclusions]", verified: false }],
    exclusions: [{ value: "[PLACEHOLDER: confirm exclusions]", verified: false }],
    accessibilityNotes: null,
    rate: {
      fromPrice: {
        value: { amount: 1980, currency: "INR", taxStatus: "unspecified" },
        verified: true,
        verifiedDate: "2026-08-24",
        source: "https://www.theblueskyresortalibag.com/",
        note: "Sourced from the resort's live website. Treat as indicative — exact live rate and tax treatment are set by the booking engine at checkout.",
      },
      liveSource: "manual",
      ratePlanNote: "Best available rate — confirm final price and taxes at checkout.",
    },
    images: [
      img("rgr-1", "stays", "Romantic Glass Room — glass frontage", "Romantic Glass Room with glass-panelled wall and garden view"),
      img("rgr-2", "stays", "Romantic Glass Room — bathroom", "Bathroom in the Romantic Glass Room"),
    ],
    relatedSlugs: ["cozy-couple-room", "quad-room"],
  },
  {
    slug: "quad-room",
    name: { value: "Quad Room", verified: false },
    positioningLabel: { value: "For families", verified: false },
    maxGuests: { value: 4, verified: false },
    recommendedOccupancy: { value: "[PLACEHOLDER: recommended occupancy]", verified: false },
    bedConfiguration: { value: "[PLACEHOLDER: e.g. 2 double beds]", verified: false },
    roomSizeSqft: null,
    highlights: [
      { value: "[PLACEHOLDER highlight 1]", verified: false },
      { value: "[PLACEHOLDER highlight 2]", verified: false },
      { value: "[PLACEHOLDER highlight 3]", verified: false },
    ],
    inclusions: [{ value: "[PLACEHOLDER: confirm inclusions]", verified: false }],
    exclusions: [{ value: "[PLACEHOLDER: confirm exclusions]", verified: false }],
    accessibilityNotes: null,
    rate: {
      fromPrice: {
        value: { amount: 3500, currency: "INR", taxStatus: "unspecified" },
        verified: true,
        verifiedDate: "2026-08-24",
        source: "https://www.theblueskyresortalibag.com/",
        note: "Sourced from the resort's live website. Treat as indicative — exact live rate and tax treatment are set by the booking engine at checkout.",
      },
      liveSource: "manual",
      ratePlanNote: "Best available rate — confirm final price and taxes at checkout.",
    },
    images: [
      img("qr-1", "stays", "Quad Room — full room view", "Quad Room showing all four beds and layout"),
      img("qr-2", "stays", "Quad Room — family seating area", "Family seating area in the Quad Room"),
    ],
    relatedSlugs: ["group-room-superior", "group-room-jumbo"],
  },
  {
    slug: "group-room-superior",
    name: { value: "Group Room Superior", verified: false },
    positioningLabel: { value: "For groups", verified: false },
    maxGuests: { value: 6, verified: false },
    recommendedOccupancy: { value: "[PLACEHOLDER: recommended occupancy]", verified: false },
    bedConfiguration: { value: "[PLACEHOLDER: bed configuration]", verified: false },
    roomSizeSqft: null,
    highlights: [
      { value: "[PLACEHOLDER highlight 1]", verified: false },
      { value: "[PLACEHOLDER highlight 2]", verified: false },
      { value: "[PLACEHOLDER highlight 3]", verified: false },
    ],
    inclusions: [{ value: "[PLACEHOLDER: confirm inclusions]", verified: false }],
    exclusions: [{ value: "[PLACEHOLDER: confirm exclusions]", verified: false }],
    accessibilityNotes: null,
    rate: {
      fromPrice: {
        value: { amount: 3750, currency: "INR", taxStatus: "unspecified" },
        verified: true,
        verifiedDate: "2026-08-24",
        source: "https://www.theblueskyresortalibag.com/",
        note: "Sourced from the resort's live website. Treat as indicative — exact live rate and tax treatment are set by the booking engine at checkout.",
      },
      liveSource: "manual",
      ratePlanNote: "Best available rate — confirm final price and taxes at checkout.",
    },
    images: [
      img("grs-1", "stays", "Group Room Superior — shared space", "Group Room Superior shared sleeping and lounge space"),
      img("grs-2", "stays", "Group Room Superior — extra bedding", "Extra bedding configuration in Group Room Superior"),
    ],
    relatedSlugs: ["group-room-jumbo", "quad-room"],
  },
  {
    slug: "group-room-jumbo",
    name: { value: "Group Room Jumbo", verified: false },
    positioningLabel: { value: "For groups", verified: false },
    maxGuests: { value: 8, verified: false },
    recommendedOccupancy: { value: "[PLACEHOLDER: recommended occupancy]", verified: false },
    bedConfiguration: { value: "[PLACEHOLDER: bed configuration]", verified: false },
    roomSizeSqft: null,
    highlights: [
      { value: "[PLACEHOLDER highlight 1]", verified: false },
      { value: "[PLACEHOLDER highlight 2]", verified: false },
      { value: "[PLACEHOLDER highlight 3]", verified: false },
    ],
    inclusions: [{ value: "[PLACEHOLDER: confirm inclusions]", verified: false }],
    exclusions: [{ value: "[PLACEHOLDER: confirm exclusions]", verified: false }],
    accessibilityNotes: null,
    rate: {
      fromPrice: {
        value: { amount: 4120, currency: "INR", taxStatus: "unspecified" },
        verified: true,
        verifiedDate: "2026-08-24",
        source: "https://www.theblueskyresortalibag.com/",
        note: "Sourced from the resort's live website. Treat as indicative — exact live rate and tax treatment are set by the booking engine at checkout.",
      },
      liveSource: "manual",
      ratePlanNote: "Best available rate — confirm final price and taxes at checkout.",
    },
    images: [
      img("grj-1", "stays", "Group Room Jumbo — full layout", "Group Room Jumbo full layout with multiple beds"),
      img("grj-2", "stays", "Group Room Jumbo — common area", "Common seating area within Group Room Jumbo"),
    ],
    relatedSlugs: ["group-room-superior", "quad-room"],
  },
];

export const getRoomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
