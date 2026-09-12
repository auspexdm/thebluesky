import { GalleryImage } from "./types";

/**
 * GALLERY
 * ------------------------------------------------------------------
 * Room photos (category "stays") are real photography supplied by the
 * resort for four of the five room types (Cozy Couple, Romantic Glass,
 * Quad, Group Room Superior) — no stock substitute is used for the
 * rooms themselves. Group Room Jumbo has no photos yet and stays as a
 * "photo pending" placeholder until the resort supplies them. The
 * "001"/"101" numbered-room -> Quad/Superior pairing was inferred from
 * the photos (no capacity label was given) — confirm before treating
 * it as final.
 *
 * Every other category (pool-outdoors, food-cafe, gatherings,
 * alibag-beach) uses free-license stock photography as an explicit,
 * resort-owner-approved interim measure — set `isStockOrIllustrative`
 * so nothing here is mistaken for a verified photo of this specific
 * property. Each has a `credit` (photographer, Unsplash License — free
 * for commercial use, no attribution legally required, kept here for
 * a clean provenance record) even though it isn't rendered on-page.
 * Swap `src` for real property photography as it becomes available —
 * see /docs/cms-content-model.md.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    category: "stays",
    placeholderLabel: "Cozy Couple Room, wooden ceiling",
    altText: "Cozy Couple Room bed with wooden slat ceiling and blackout curtains",
    src: "/rooms/ccr-real-1.jpg",
  },
  {
    id: "g2",
    category: "stays",
    placeholderLabel: "Romantic Glass Room, palm tree view",
    altText: "View of palm trees through the Romantic Glass Room window",
    src: "/rooms/rgr-real-2.jpg",
  },
  {
    id: "g3",
    category: "stays",
    placeholderLabel: "Quad Room, bed with red cushions",
    altText: "Quad Room bed with red cushions and pendant lighting",
    src: "/rooms/qr-real-1.jpg",
  },
  {
    id: "g3b",
    category: "stays",
    placeholderLabel: "Group Room Superior, bed and seating",
    altText: "Group Room Superior bed with blue-grey cushions",
    src: "/rooms/grs-real-1.jpg",
  },
  {
    id: "g4",
    category: "pool-outdoors",
    placeholderLabel: "Pool deck, wide shot",
    altText: "Wide infinity-style pool framed by palm trees, illustrative stock photo",
    src: "/images/hero-pool.jpg",
    isStockOrIllustrative: true,
    credit: "Fabio Fistarol / Unsplash",
  },
  {
    id: "g5",
    category: "pool-outdoors",
    placeholderLabel: "Garden pathway between rooms",
    altText: "Stone pathway through lush tropical garden planting, illustrative stock photo",
    src: "/images/garden-path.jpg",
    isStockOrIllustrative: true,
    credit: "Joey Genovese / Unsplash",
  },
  {
    id: "g6",
    category: "pool-outdoors",
    placeholderLabel: "Pool, evening lighting",
    altText: "Infinity pool at sunset with palm trees, illustrative stock photo",
    src: "/images/pool-evening.jpg",
    isStockOrIllustrative: true,
    credit: "Tommaso Ubezio / Unsplash",
  },
  {
    id: "g7",
    category: "food-cafe",
    placeholderLabel: "The Backyard Cafe, seating area",
    altText: "Outdoor café seating among greenery, illustrative stock photo",
    src: "/images/cafe-seating.jpg",
    isStockOrIllustrative: true,
    credit: "Waseem Wakkir / Unsplash",
  },
  {
    id: "g8",
    category: "food-cafe",
    placeholderLabel: "Breakfast spread (verify menu before publishing)",
    altText: "Breakfast plate on an outdoor table, illustrative stock photo",
    src: "/images/cafe-breakfast.jpg",
    isStockOrIllustrative: true,
    credit: "Mia de Jesus / Unsplash",
  },
  {
    id: "g9",
    category: "gatherings",
    placeholderLabel: "Group of guests around the pool",
    altText: "Pool lit for evening ambience, illustrative stock photo",
    src: "/images/pool-evening.jpg",
    isStockOrIllustrative: true,
    credit: "Tommaso Ubezio / Unsplash",
  },
  {
    id: "g10",
    category: "gatherings",
    placeholderLabel: "Family celebration setup (verify before publishing)",
    altText: "Outdoor lawn dinner setup with string lights, illustrative stock photo",
    src: "/images/gathering-setup.jpg",
    isStockOrIllustrative: true,
    credit: "tabitha turner / Unsplash",
  },
  {
    id: "g11",
    category: "alibag-beach",
    placeholderLabel: "Varsoli Beach, daytime",
    altText: "Coastal sunset over the sea, illustrative stock photo (not an actual photo of Varsoli Beach)",
    src: "/images/beach-daytime.jpg",
    isStockOrIllustrative: true,
    credit: "Alex Rybin / Unsplash",
  },
  {
    id: "g12",
    category: "alibag-beach",
    placeholderLabel: "Coastal path near the resort",
    altText: "Sandy path through palm trees toward the beach, illustrative stock photo",
    src: "/images/coastal-path.jpg",
    isStockOrIllustrative: true,
    credit: "Zidhan Ibrahim / Unsplash",
  },
];

export const galleryCategories: { id: GalleryImage["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "stays", label: "Stays" },
  { id: "pool-outdoors", label: "Pool & Outdoors" },
  { id: "food-cafe", label: "Food & Café" },
  { id: "gatherings", label: "Gatherings" },
  { id: "alibag-beach", label: "Alibag / Beach" },
];
