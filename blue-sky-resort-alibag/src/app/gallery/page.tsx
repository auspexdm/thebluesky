import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GalleryClient } from "@/components/GalleryClient";
import { TrackPageView } from "@/components/TrackPageView";
import { galleryImages } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery — Stays, Pool, Café & Alibag",
  description:
    "A look at The Blue Sky Resort Alibag — rooms, pool and outdoors, food and café, gatherings, and the Varsoli Beach setting.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <TrackPageView event="gallery_open" properties={{ page: "gallery-index" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "Gallery", path: "/gallery" }]} />

      <Container as="section" className="py-12 sm:py-16">
        <h1 className="font-display max-w-2xl text-4xl text-ink sm:text-5xl">Gallery</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
          A closer look at the property. Real room photography is shown for
          the Cozy Couple, Romantic Glass, Quad, and Group Room Superior —
          Group Room Jumbo photos are still pending. Pool, café, and setting
          images are illustrative stock photos standing in until real
          property photography is ready for those areas.
        </p>
      </Container>

      <Container as="section" className="pb-16 sm:pb-24">
        <GalleryClient images={galleryImages} />
      </Container>
    </>
  );
}
