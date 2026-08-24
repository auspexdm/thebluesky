import { resortInfo } from "@/content/resort";

/**
 * Central source of truth for where "Book Now" / "Check availability"
 * controls should send guests. See /docs/booking-engine-integration-plan.md.
 *
 * When `resortInfo.bookingEngineUrl` is verified, every booking CTA across
 * the site links straight to the live booking engine (opened in the same
 * tab, per spec section 8's brand-continuity rule). Until a URL is set and
 * verified, CTAs fall back to the on-site availability widget + enquiry
 * flow at /stay#availability so nothing links to a dead or fake booking
 * experience.
 */
export const isLiveBookingEngine = Boolean(resortInfo.bookingEngineUrl?.verified);

export const bookingHref = isLiveBookingEngine
  ? resortInfo.bookingEngineUrl!.value
  : "/stay#availability";
