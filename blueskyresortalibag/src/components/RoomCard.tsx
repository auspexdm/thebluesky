import Link from "next/link";
import { Room } from "@/content/types";
import { PlaceholderImage } from "./PlaceholderImage";
import { CTALink } from "./CTAButton";
import { formatMoney } from "@/lib/utils";
import { bookingHref } from "@/lib/booking";

export function RoomCard({ room }: { room: Room }) {
  const price = room.rate.fromPrice;
  const showPrice = price && price.verified && room.rate.liveSource !== "none";

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white transition-shadow duration-200 hover:shadow-md">
      <Link href={`/stay/${room.slug}`} className="block">
        <PlaceholderImage
          label={room.images[0]?.placeholderLabel ?? room.name.value}
          aspect="4/3"
          className="rounded-none border-0 border-b border-line"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-sage-700">
            {room.positioningLabel.value}
          </span>
          <h3 className="font-display mt-1 text-xl text-ink">
            <Link href={`/stay/${room.slug}`}>{room.name.value}</Link>
          </h3>
        </div>

        <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-charcoal-600">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Max guests</dt>
            <dd>Up to {room.maxGuests.value} guests</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Bed configuration</dt>
            <dd>{room.bedConfiguration.value}</dd>
          </div>
        </dl>

        {room.highlights.length > 0 && (
          <ul className="flex flex-col gap-1 text-sm text-charcoal-600">
            {room.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="text-gold-700">•</span>
                {h.value}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="text-sm">
            {showPrice ? (
              <>
                <span className="text-charcoal-400">From </span>
                <span className="font-display text-lg text-ink">
                  {formatMoney(price!.value.amount, price!.value.currency)}
                </span>
                <span className="block text-xs text-charcoal-400">
                  {price!.value.taxStatus === "inclusive" ? "Taxes included" : "Taxes may apply"}
                </span>
              </>
            ) : (
              <span className="text-xs text-charcoal-400">Pricing on request</span>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <CTALink href={`/stay/${room.slug}`} variant="ghost" className="px-3 py-2 text-sm">
              View room
            </CTALink>
            <CTALink href={bookingHref} variant="outline" className="px-3 py-2 text-sm">
              Check availability
            </CTALink>
          </div>
        </div>
      </div>
    </article>
  );
}
