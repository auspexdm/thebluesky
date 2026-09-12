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

// Real property photography, supplied directly by the resort (Aug 2026).
// `src` points at /public/rooms; no `credit` field since these are the
// actual rooms, not stand-in stock photography.
const realImg = (
  id: string,
  category: Room["images"][number]["category"],
  label: string,
  alt: string,
  src: string
) => ({
  id,
  category,
  altText: alt,
  placeholderLabel: label,
  src,
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
      realImg("ccr-1", "stays", "Cozy Couple Room — bed with wooden ceiling", "Cozy Couple Room bed with wooden slat ceiling and blackout curtains", "/rooms/ccr-real-1.jpg"),
      realImg("ccr-2", "stays", "Cozy Couple Room — window view", "Window view from the Cozy Couple Room", "/rooms/ccr-real-2.jpg"),
      realImg("ccr-3", "stays", "Cozy Couple Room — Starry Night wall art", "Cozy Couple Room seating area with framed Starry Night print", "/rooms/ccr-real-3.jpg"),
      realImg("ccr-4", "stays", "Cozy Couple Room — bed and decor", "Cozy Couple Room bed with pink cushions and wall art", "/rooms/ccr-real-4.jpg"),
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
      realImg("rgr-1", "stays", "Romantic Glass Room — window and curtain", "Romantic Glass Room large window with blackout curtain", "/rooms/rgr-real-1.jpg"),
      realImg("rgr-2", "stays", "Romantic Glass Room — palm tree view", "View of palm trees and pool through the Romantic Glass Room window", "/rooms/rgr-real-2.jpg"),
      realImg("rgr-3", "stays", "Romantic Glass Room — bed and TV", "Romantic Glass Room bed with mounted TV and wooden ceiling", "/rooms/rgr-real-3.jpg"),
      realImg("rgr-4", "stays", "Romantic Glass Room — Starry Night wall art", "Romantic Glass Room with framed Starry Night print above the bed", "/rooms/rgr-real-4.jpg"),
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
    // Photos supplied for a room numbered "001" — mapped here to Quad Room
    // as a best guess (folder names gave no capacity/label info). Confirm
    // against the physical room before treating this pairing as final.
    images: [
      realImg("qr-1", "stays", "Quad Room — bed with red cushions", "Quad Room bed with red cushions and pendant lighting", "/rooms/qr-real-1.jpg"),
      realImg("qr-2", "stays", "Quad Room — room view", "Wide view of the Quad Room showing bed and layout", "/rooms/qr-real-2.jpg"),
      realImg("qr-3", "stays", "Quad Room — decorative wall art", "Quad Room wall with decorative plant motif art", "/rooms/qr-real-3.jpg"),
      realImg("qr-4", "stays", "Quad Room — seating nook", "Quad Room seating nook with wooden bench", "/rooms/qr-real-4.jpg"),
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
    // Photos supplied for a room numbered "101" — mapped here to Group Room
    // Superior as a best guess (folder names gave no capacity/label info).
    // Confirm against the physical room before treating this pairing as final.
    images: [
      realImg("grs-1", "stays", "Group Room Superior — bed with cushions", "Group Room Superior bed with blue-grey cushions", "/rooms/grs-real-1.jpg"),
      realImg("grs-2", "stays", "Group Room Superior — window with wall art", "Group Room Superior window with floral wall art", "/rooms/grs-real-2.jpg"),
      realImg("grs-3", "stays", "Group Room Superior — room with TV and seating", "Group Room Superior wide view with mounted TV and seating", "/rooms/grs-real-3.jpg"),
      realImg("grs-4", "stays", "Group Room Superior — bed and lighting", "Group Room Superior bed area with pendant lighting", "/rooms/grs-real-4.jpg"),
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
