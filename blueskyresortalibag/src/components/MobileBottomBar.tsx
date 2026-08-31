"use client";

import Link from "next/link";
import { resortInfo } from "@/content/resort";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/utils";
import { bookingHref, isLiveBookingEngine } from "@/lib/booking";
import { WhatsAppIcon } from "./Header";

/**
 * Fixed bottom action bar (mobile only). Always includes Book Now.
 * The second slot is WhatsApp when the number + response process are
 * approved; otherwise it falls back to a plain "Enquire" link to the
 * Location & Contact page so the bar never advertises an unapproved
 * channel. `pb-[calc(4.5rem+env(safe-area-inset-bottom))]` on <main>
 * (see layout.tsx) keeps this bar from covering page content.
 */
export function MobileBottomBar() {
  const whatsapp = resortInfo.contact.whatsappNumber;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/97 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <Link
          href={bookingHref}
          onClick={() => track("booking_start", { location: "mobile-bottom-bar", live: isLiveBookingEngine })}
          className="flex flex-1 items-center justify-center rounded-[var(--radius-sm)] bg-ink px-4 py-3 text-sm font-semibold text-ivory"
        >
          Book Now
        </Link>
        {whatsapp?.verified ? (
          <a
            href={whatsappHref(whatsapp.value)}
            onClick={() => track("whatsapp_click", { location: "mobile-bottom-bar" })}
            className="flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-sage-700 px-4 py-3 text-sm font-semibold text-sage-700"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        ) : (
          <Link
            href="/location#contact"
            className="flex flex-1 items-center justify-center rounded-[var(--radius-sm)] border border-line px-4 py-3 text-sm font-semibold text-ink"
          >
            Enquire
          </Link>
        )}
      </div>
    </div>
  );
}
