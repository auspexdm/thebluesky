import { ExperienceFeature } from "./types";

/**
 * Experience tiles — verified: false means the tile still renders
 * (these are facility categories, not unverifiable superlatives) but
 * carries a "details pending confirmation" note in the UI until the
 * resort team approves the descriptive copy. Do not add claims about
 * exclusivity, hours, or distance without approval.
 */
export const experienceFeatures: ExperienceFeature[] = [
  {
    id: "pool",
    title: "Pool",
    description: "[PLACEHOLDER: verified description of the pool, hours, and access rules]",
    anchor: "pool",
    verified: false,
    icon: "pool",
  },
  {
    id: "garden",
    title: "Garden setting",
    description: "[PLACEHOLDER: verified description of the garden / grounds]",
    anchor: "garden",
    verified: false,
    icon: "garden",
  },
  {
    id: "cafe",
    title: "The Backyard Cafe",
    description: "[PLACEHOLDER: verified description, hours, and menu style]",
    anchor: "cafe",
    verified: false,
    icon: "cafe",
  },
  {
    id: "beach",
    title: "Near Varsoli Beach",
    description: "[PLACEHOLDER: verified distance/walking time and practical notes]",
    anchor: "beach",
    verified: false,
    icon: "beach",
  },
  {
    id: "events",
    title: "Gatherings & events",
    description: "[PLACEHOLDER: verified description of what event support is actually offered]",
    anchor: "events",
    verified: false,
    icon: "events",
  },
];
