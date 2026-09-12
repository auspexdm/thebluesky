import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AvailabilityWidget } from "@/components/forms/AvailabilityWidget";
import { TrustStrip, hasVerifiedTrustBadges } from "@/components/TrustStrip";
import { RoomCard } from "@/components/RoomCard";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { CTALink } from "@/components/CTAButton";
import { TrackPageView } from "@/components/TrackPageView";
import { rooms } from "@/content/rooms";
import { groupUseCases } from "@/content/groupStays";
import { experienceFeatures } from "@/content/experience";
import { approvedReviews } from "@/content/reviews";
import { galleryImages } from "@/content/gallery";
import { resortInfo } from "@/content/resort";
import { whatsappHref } from "@/lib/utils";
import { bookingHref } from "@/lib/booking";
import { WhatsAppIcon } from "@/components/Header";

export const metadata: Metadata = {
  title: "The Blue Sky Resort Alibag — A Coastal Escape Near Varsoli Beach",
  description:
    "A slower, sunnier stay near Varsoli Beach. Thoughtful rooms, relaxed poolside moments, and space to gather — book direct with The Blue Sky Resort Alibag.",
  alternates: { canonical: "/" },
};

const FEATURED_ROOMS = rooms.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <TrackPageView event="view_home" />
      <Header overlay />

      {/* A. HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
        <PlaceholderImage
          label="Cinematic hero: resort pool and gardens at golden hour, real guests in soft focus"
          alt="Poolside garden setting at golden hour, illustrative stock photo"
          src="/images/hero-pool.jpg"
          isStockOrIllustrative
          fill
          tone="ocean"
          className="rounded-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,40,54,0.35)_0%,rgba(15,40,54,0.15)_35%,rgba(15,40,54,0.85)_100%)]"
        />
        <Container className="relative z-10 pb-14 pt-32 sm:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-100">
            The Blue Sky Resort · Alibag
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
            A slower, sunnier stay near Varsoli Beach.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
            Thoughtful rooms, relaxed poolside moments, and space to gather —
            made for easy coastal getaways.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTALink href="/stay" variant="outlineLight" className="border-ivory/70">
              Explore stays
            </CTALink>
          </div>

          <div id="availability" className="mt-10 max-w-3xl scroll-mt-24">
            <AvailabilityWidget variant="hero" />
          </div>
        </Container>
      </section>

      {/* B. TRUST STRIP */}
      {hasVerifiedTrustBadges && (
        <section className="border-b border-line bg-ivory py-6">
          <Container>
            <TrustStrip />
          </Container>
        </section>
      )}

      {/* C. CHOOSE YOUR STAY */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Choose your stay"
              title="Rooms made for how you're travelling."
              description="From quiet couple escapes to rooms built for groups — a short collection to help you find your fit."
            />
            <CTALink href="/stay" variant="ghost" className="shrink-0">
              Explore all stays →
            </CTALink>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_ROOMS.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </Container>
      </section>

      {/* D. GROUP STAYS FEATURE */}
      <section className="bg-ink py-20 text-ivory sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Group stays"
              title="More room for your people."
              tone="light"
              description="Plan a family gathering, friends' escape, celebration, offsite, or multi-room stay with a team that helps make the details simple."
            />

            {groupUseCases.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {groupUseCases.map((u) => (
                  <li
                    key={u.id}
                    className="rounded-full border border-ivory/25 px-4 py-1.5 text-sm text-ivory/85"
                  >
                    {u.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <CTALink href="/group-stays" variant="gold">
                Plan a group stay
              </CTALink>
            </div>
          </div>

          <PlaceholderImage
            label="Group of friends and family gathered around the pool deck"
            aspect="4/3"
            tone="ocean"
            className="border-ivory/15"
          />
        </Container>
      </section>

      {/* E. EXPERIENCE TEASER */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Experience"
            title="Days that move at their own pace."
            description="Pool, garden, café, and a beach-adjacent atmosphere — the everyday moments that make a stay here."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experienceFeatures.map((feature) => (
              <Link
                key={feature.id}
                href={`/experience#${feature.anchor}`}
                className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line p-5 transition-colors hover:border-sage-700"
              >
                <PlaceholderImage label={feature.title} aspect="4/3" tone="sage" />
                <div>
                  <h3 className="font-display text-lg text-ink">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                    Details pending confirmation from the resort team.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* F. GUEST VOICES */}
      {approvedReviews.length > 0 && (
        <section className="bg-sand/40 py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Guest voices" title="What guests are saying." align="center" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approvedReviews.slice(0, 6).map((review) => (
                <blockquote
                  key={review.id}
                  className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line bg-white p-6"
                >
                  <p className="text-sm leading-relaxed text-charcoal-600">&ldquo;{review.quote}&rdquo;</p>
                  <footer className="mt-auto text-xs text-charcoal-400">
                    <cite className="not-italic font-medium text-ink">{review.authorNameOrInitial}</cite>
                    {" · "}
                    {review.source}
                    {review.date ? ` · ${review.date}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* G. GALLERY TEASER */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Gallery" title="A closer look." />
            <CTALink href="/gallery" variant="ghost" className="shrink-0">
              View the gallery →
            </CTALink>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryImages.slice(0, 8).map((img) => (
              <PlaceholderImage
                key={img.id}
                label={img.placeholderLabel}
                alt={img.altText}
                src={img.src}
                isStockOrIllustrative={img.isStockOrIllustrative}
                aspect="1/1"
                tone="sand"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* H. LOCATION / FINAL CTA */}
      <section className="bg-ocean py-20 text-ivory sm:py-28" id="visit">
        <Container className="text-center">
          <SectionHeading
            title="Your Alibag escape starts here."
            tone="light"
            align="center"
            description={
              resortInfo.address?.verified
                ? resortInfo.address.value
                : "Address pending confirmation — see Location & Contact for the latest details."
            }
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CTALink href={bookingHref} variant="gold">
              Check availability
            </CTALink>
            <CTALink href="/location" variant="outlineLight">
              Get directions
            </CTALink>
            {resortInfo.contact.whatsappNumber?.verified && (
              <a
                href={whatsappHref(resortInfo.contact.whatsappNumber.value)}
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-ivory/70 px-6 py-3 text-sm font-medium text-ivory hover:bg-ivory hover:text-ink"
              >
                <WhatsAppIcon /> WhatsApp us
              </a>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
