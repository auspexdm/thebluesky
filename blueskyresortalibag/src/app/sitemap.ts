import type { MetadataRoute } from "next";
import { rooms } from "@/content/rooms";
import { SITE_URL } from "@/lib/schema";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/stay", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/group-stays", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/experience", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/location", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/faqs", priority: 0.4, changeFrequency: "monthly" as const },
  // /policies deliberately omitted — noindex until legal content is approved.
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const roomEntries: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: `${SITE_URL}/stay/${room.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...roomEntries];
}
