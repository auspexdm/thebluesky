/**
 * CONTENT MODEL — THE BLUE SKY RESORT ALIBAG
 * ------------------------------------------------------------------
 * These types are the CMS schema. Every field that represents a
 * fact about the business (price, rating, policy, capacity, contact
 * detail, award, amenity) carries a `verified: boolean` and, where
 * relevant, a `verifiedDate`/`source`. Nothing with `verified: false`
 * should ever be rendered as a real claim on the live site — the UI
 * layer is responsible for hiding unverified trust content rather
 * than showing an empty or fake badge.
 *
 * See /docs/cms-content-model.md for the full editor guide.
 */

export interface VerifiedFact<T> {
  value: T;
  verified: boolean;
  verifiedDate?: string; // ISO date the fact was last confirmed with the resort team
  source?: string; // URL or internal reference proving the claim
  note?: string; // internal note for the content editor
}

export interface Money {
  amount: number;
  currency: "INR";
  taxStatus: "inclusive" | "exclusive" | "unspecified";
}

export interface RoomRate {
  fromPrice: VerifiedFact<Money> | null; // null = do not display a price at all
  ratePlanNote?: string; // e.g. "Best available rate, subject to change"
  liveSource?: "booking-engine" | "manual" | "none";
}

export interface Room {
  slug: string;
  name: VerifiedFact<string>;
  positioningLabel: VerifiedFact<string>; // e.g. "For couples"
  maxGuests: VerifiedFact<number>;
  recommendedOccupancy: VerifiedFact<string>; // e.g. "2 adults recommended, up to 4 total"
  bedConfiguration: VerifiedFact<string>;
  roomSizeSqft: VerifiedFact<number> | null;
  highlights: VerifiedFact<string>[];
  inclusions: VerifiedFact<string>[];
  exclusions: VerifiedFact<string>[];
  accessibilityNotes: VerifiedFact<string> | null;
  rate: RoomRate;
  images: GalleryImage[];
  relatedSlugs: string[];
}

export interface GalleryImage {
  id: string;
  category: "stays" | "pool-outdoors" | "food-cafe" | "gatherings" | "alibag-beach";
  altText: string; // required — CMS should block publish without this
  placeholderLabel: string; // human description of the real photo to be shot/uploaded
  caption?: string;
  isStockOrIllustrative?: boolean; // must be labelled in UI if true
}

export interface TrustBadge {
  id: "google-rating" | "makemytrip-star-host" | "times-of-india" | "secure-booking";
  label: string;
  verified: boolean;
  verifiedDate?: string;
  linkUrl?: string;
  displayValue?: string; // e.g. "4.6 (312 reviews)"
  logoPermissionGranted?: boolean;
  note?: string; // internal note on what's required to verify this badge
}

export interface Review {
  id: string;
  authorNameOrInitial: string;
  source: "Google" | "MakeMyTrip" | "Direct";
  rating?: number;
  date?: string;
  quote: string;
  sourceUrl?: string;
  approved: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  topic: "booking" | "stay" | "group" | "location" | "general";
  publicOnSite: boolean; // must be true + answer non-empty to appear in FAQPage schema
}

export interface ContactChannel {
  whatsappNumber: VerifiedFact<string> | null;
  phoneNumber: VerifiedFact<string> | null;
  email: VerifiedFact<string> | null;
  responseHours: VerifiedFact<string> | null;
  responseTimeCommitment: VerifiedFact<string> | null; // only if operationally guaranteed
}

export interface ResortInfo {
  legalName: string;
  brandName: string;
  address: VerifiedFact<string> | null;
  mapCoordinates: VerifiedFact<{ lat: number; lng: number }> | null;
  mapEmbedUrl: VerifiedFact<string> | null;
  googleMapsUrl: VerifiedFact<string> | null;
  beachDistance: VerifiedFact<string> | null; // e.g. "Varsoli Beach — 1.2 km / 5 min walk"
  checkIn: VerifiedFact<string> | null;
  checkOut: VerifiedFact<string> | null;
  childPolicy: VerifiedFact<string> | null;
  cancellationPolicySummary: VerifiedFact<string> | null;
  parking: VerifiedFact<string> | null;
  wifi: VerifiedFact<string> | null;
  poolAccess: VerifiedFact<string> | null;
  restaurantHours: VerifiedFact<string> | null;
  accessibility: VerifiedFact<string> | null;
  petsPolicy: VerifiedFact<string> | null;
  bookingEngineProvider: VerifiedFact<string> | null;
  bookingEngineUrl: VerifiedFact<string> | null; // full URL guests are redirected to on Book Now / Check availability
  paymentProvider: VerifiedFact<string> | null;
  socialLinks: { platform: string; url: string; verified: boolean }[];
  contact: ContactChannel;
}

export interface GroupUseCase {
  id: string;
  label: string;
  verified: boolean;
}

export interface GroupConfiguration {
  id: string;
  label: string; // e.g. "3 interconnecting rooms, up to 12 guests"
  verified: boolean;
}

export interface ExperienceFeature {
  id: string;
  title: string;
  description: string;
  anchor: string; // matches /experience#anchor
  verified: boolean;
  icon: "pool" | "garden" | "cafe" | "beach" | "events";
}

export interface PolicySection {
  id: string;
  title: string;
  body: string; // plain text / simple markdown, approved copy only
  approved: boolean;
  legallyRequired: boolean;
}
