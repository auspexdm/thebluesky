import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { RoomCard } from "@/components/RoomCard";
import { CTALink } from "@/components/CTAButton";
import { TrackPageView } from "@/components/TrackPageView";
import { getRoomBySlug, rooms } from "@/content/rooms";
import { resortInfo } from "@/content/resort";
import { formatMoney } from "@/lib/utils";
import { bookingHref } from "@/lib/booking";

export function generateStaticParams() {
  return rooms.map((r) => ({ "room-slug": r.slug }));
}

export async function generateMetadata(props: PageProps<"/stay/[room-slug]">): Promise<Metadata> {
  const { "room-slug": slug } = await props.params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.name.value} — Stay & Book`,
    description: `${room.name.value} at The Blue Sky Resort Alibag — ${room.positioningLabel.value.toLowerCase()}. View capacity, bed configuration, and availability.`,
    alternates: { canonical: `/stay/${room.slug}` },
  };
}

export default async function RoomDetailPage(props: PageProps<"/stay/[room-slug]">) {
  const { "room-slug": slug } = await props.params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const relatedRooms = room.relatedSlugs.map((s) => getRoomBySlug(s)).filter(Boolean) as typeof rooms;
  const price = room.rate.fromPrice;
  const showPrice = price && price.verified && room.rate.liveSource !== "none";

  return (
    <>
      <TrackPageView event="room_view" properties={{ room: room.slug }} />
      <Header />
      <Breadcrumbs
        trail={[
          { name: "Stay & Book", path: "/stay" },
          { name: room.name.value, path: `/stay/${room.slug}` },
        ]}
      />

      <Container as="section" className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <div className="grid grid-cols-2 gap-3">
            {room.images.map((img, i) => (
              <PlaceholderImage
                key={img.id}
                label={img.placeholderLabel}
                aspect={i === 0 ? "16/9" : "4/3"}
                className={i === 0 ? "col-span-2" : undefined}
              />
            ))}
          </div>

          <div className="mt-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-sage-700">
              {room.positioningLabel.value}
            </span>
            <h1 className="font-display mt-1 text-3xl text-ink sm:text-4xl">{room.name.value}</h1>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-charcoal-400">Max guests</dt>
                <dd className="mt-1 font-medium text-ink">{room.maxGuests.value}</dd>
              </div>
              <div>
                <dt className="text-charcoal-400">Recommended</dt>
                <dd className="mt-1 font-medium text-ink">{room.recommendedOccupancy.value}</dd>
              </div>
              <div>
                <dt className="text-charcoal-400">Beds</dt>
                <dd className="mt-1 font-medium text-ink">{room.bedConfiguration.value}</dd>
              </div>
              <div>
                <dt className="text-charcoal-400">Room size</dt>
                <dd className="mt-1 font-medium text-ink">
                  {room.roomSizeSqft?.verified ? `${room.roomSizeSqft.value} sq ft` : "Not yet confirmed"}
                </dd>
              </div>
            </dl>

            {room.highlights.length > 0 && (
              <div className="mt-6">
                <h2 className="font-display text-xl text-ink">Room features</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {room.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-charcoal-600">
                      <span aria-hidden="true" className="text-gold-700">•</span>
                      {h.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-xl text-ink">What&apos;s included</h2>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-charcoal-600">
                  {room.inclusions.map((inc, i) => (
                    <li key={i}>{inc.value}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl text-ink">Not included</h2>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-charcoal-600">
                  {room.exclusions.map((exc, i) => (
                    <li key={i}>{exc.value}</li>
                  ))}
                </ul>
              </div>
            </div>

            {room.accessibilityNotes?.verified && (
              <div className="mt-8 rounded-[var(--radius-md)] border border-line bg-sand/30 p-4 text-sm text-charcoal-600">
                <strong className="text-ink">Accessibility: </strong>
                {room.accessibilityNotes.value}
              </div>
            )}

            <div className="mt-8 border-t border-line pt-6 text-sm text-charcoal-600">
              <p>
                {resortInfo.cancellationPolicySummary?.verified
                  ? resortInfo.cancellationPolicySummary.value
                  : "Booking and cancellation terms are being finalized."}{" "}
                <CTALink href="/policies" variant="ghost" className="px-0 py-0 underline">
                  Read full policies
                </CTALink>
              </p>
            </div>
          </div>
        </div>

        {/* Booking summary card — sticky on desktop */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-[var(--radius-lg)] border border-line bg-white p-6">
            <div className="text-sm">
              {showPrice ? (
                <>
                  <span className="text-charcoal-400">From </span>
                  <span className="font-display text-2xl text-ink">
                    {formatMoney(price!.value.amount, price!.value.currency)}
                  </span>
                  <span className="block text-xs text-charcoal-400">
                    per night ·{" "}
                    {price!.value.taxStatus === "inclusive" ? "taxes included" : "taxes may apply"}
                  </span>
                </>
              ) : (
                <span className="text-charcoal-600">Pricing available on enquiry</span>
              )}
            </div>
            <CTALink href={bookingHref} variant="primary" className="mt-4 w-full">
              Check availability
            </CTALink>
            <CTALink href="/stay#enquiry" variant="outline" className="mt-3 w-full">
              Enquire about this room
            </CTALink>
          </div>
        </aside>
      </Container>

      {relatedRooms.length > 0 && (
        <section className="border-t border-line bg-sand/30 py-14 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">You might also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRooms.map((r) => (
                <RoomCard key={r!.slug} room={r!} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
