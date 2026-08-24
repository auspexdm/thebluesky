import { GalleryImage } from "./types";

/**
 * GALLERY — placeholder image slots only.
 * Each entry describes the real photo that should be shot/uploaded.
 * `isStockOrIllustrative` must stay false; do not substitute stock
 * photography that doesn't resemble the actual property (per brand
 * direction). Replace `placeholderLabel`/`altText` as real assets
 * land, and set the actual image src in the CMS media field.
 */
export const galleryImages: GalleryImage[] = [
  { id: "g1", category: "stays", placeholderLabel: "Cozy Couple Room, morning light", altText: "Cozy Couple Room interior in morning light" },
  { id: "g2", category: "stays", placeholderLabel: "Romantic Glass Room, glass wall detail", altText: "Glass wall detail in the Romantic Glass Room" },
  { id: "g3", category: "stays", placeholderLabel: "Quad Room, family layout", altText: "Quad Room family bed layout" },
  { id: "g4", category: "pool-outdoors", placeholderLabel: "Pool deck, wide shot", altText: "Wide shot of the resort pool deck" },
  { id: "g5", category: "pool-outdoors", placeholderLabel: "Garden pathway between rooms", altText: "Garden pathway between guest rooms" },
  { id: "g6", category: "pool-outdoors", placeholderLabel: "Pool, evening lighting", altText: "Resort pool lit in the evening" },
  { id: "g7", category: "food-cafe", placeholderLabel: "The Backyard Cafe, seating area", altText: "Seating area at The Backyard Cafe" },
  { id: "g8", category: "food-cafe", placeholderLabel: "Breakfast spread (verify menu before publishing)", altText: "Breakfast spread at the resort cafe" },
  { id: "g9", category: "gatherings", placeholderLabel: "Group of guests around the pool", altText: "Group of guests gathered around the pool" },
  { id: "g10", category: "gatherings", placeholderLabel: "Family celebration setup (verify before publishing)", altText: "Family celebration seating setup" },
  { id: "g11", category: "alibag-beach", placeholderLabel: "Varsoli Beach, daytime", altText: "Varsoli Beach on a clear day" },
  { id: "g12", category: "alibag-beach", placeholderLabel: "Coastal path near the resort", altText: "Coastal path near the resort" },
];

export const galleryCategories: { id: GalleryImage["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "stays", label: "Stays" },
  { id: "pool-outdoors", label: "Pool & Outdoors" },
  { id: "food-cafe", label: "Food & Café" },
  { id: "gatherings", label: "Gatherings" },
  { id: "alibag-beach", label: "Alibag / Beach" },
];
