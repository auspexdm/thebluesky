import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { CTALink } from "@/components/CTAButton";
import { TrackPageView } from "@/components/TrackPageView";
import { experienceFeatures } from "@/content/experience";
import { resortInfo } from "@/content/resort";
import { bookingHref } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Experience — Pool, Garden, Café & Varsoli Beach",
  description:
    "Pool, garden setting, The Backyard Cafe, gatherings, and the walk to Varsoli Beach — the everyday moments of a stay at The Blue Sky Resort Alibag.",
  alternates: { canonical: "/experience" },
};

const extraNotes: Record<string, { label: string; value: typeof resortInfo.poolAccess }> = {
  pool: { label: "Pool access", value: resortInfo.poolAccess },
  cafe: { label: "Hours", value: resortInfo.restaurantHours },
  beach: { label: "Distance", value: resortInfo.beachDistance },
};

// Free-license stock photography standing in for each amenity until
// real property photos are supplied — see /docs/cms-content-model.md.
const featureImages: Record<string, { src: string; alt: string }> = {
  pool: { src: "/images/pool-evening.jpg", alt: "Infinity pool at sunset, illustrative stock photo" },
  garden: { src: "/images/garden-path.jpg", alt: "Tropical garden pathway, illustrative stock photo" },
  cafe: { src: "/images/cafe-seating.jpg", alt: "Outdoor café seating among greenery, illustrative stock photo" },
  beach: { src: "/images/coastal-path.jpg", alt: "Sandy path toward the beach, illustrative stock photo" },
  events: { src: "/images/gathering-setup.jpg", alt: "Outdoor lawn gathering setup with string lights, illustrative stock photo" },
};

export default function ExperiencePage() {
  return (
    <>
      <TrackPageView event="view_home" properties={{ page: "experience" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "Experience", path: "/experience" }]} />

      <Container as="section" className="py-12 sm:py-16">
        <h1 className="font-display max-w-2xl text-4xl text-ink sm:text-5xl">Days that move at their own pace.</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
          Pool, garden, café, and a beach-adjacent atmosphere — practical,
          plainly-described, and true to what you&apos;ll actually find here.
        </p>
      </Container>

      {experienceFeatures.map((feature, i) => {
        const note = extraNotes[feature.id];
        return (
          <section
            key={feature.id}
            id={feature.anchor}
            className={`scroll-mt-20 border-t border-line py-14 sm:py-20 ${i % 2 === 1 ? "bg-sand/30" : ""}`}
          >
            <Container className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <PlaceholderImage
                label={feature.title}
                alt={featureImages[feature.id]?.alt}
                src={featureImages[feature.id]?.src}
                isStockOrIllustrative={Boolean(featureImages[feature.id])}
                aspect="4/3"
                tone={i % 2 === 0 ? "ocean" : "sage"}
              />
              <div>
                <h2 className="font-display text-2xl text-ink sm:text-3xl">{feature.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-charcoal-600">
                  {feature.verified ? feature.description : "Details for this section are being confirmed with the resort team and will be published once approved."}
                </p>
                {note?.value?.verified && (
                  <p className="mt-3 text-sm font-medium text-ink">
                    {note.label}: {note.value.value}
                  </p>
                )}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="border-t border-line bg-ink py-16 text-center text-ivory sm:py-20">
        <Container>
          <h2 className="font-display text-2xl sm:text-3xl">Ready to plan your stay?</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <CTALink href={bookingHref} variant="gold">
              Check availability
            </CTALink>
            <CTALink href="/group-stays" variant="outlineLight">
              Plan a group stay
            </CTALink>
          </div>
        </Container>
      </section>
    </>
  );
}
