import { resortInfo } from "@/content/resort";
import { publicFaqs } from "@/content/faqs";
import { approvedReviews } from "@/content/reviews";
import { trustBadges } from "@/content/trustBadges";

export const SITE_URL = "https://www.theblueskyresortalibag.com"; // TODO: replace with production domain

export interface BreadcrumbEntry {
  name: string;
  path: string; // relative path, "" for current/no-link not needed since all get itemListElement
}

/** Builds BreadcrumbList JSON-LD that must mirror the visible breadcrumb trail exactly. */
export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: `${SITE_URL}${entry.path}`,
    })),
  };
}

/**
 * LodgingBusiness / Hotel schema — only includes verified facts.
 * AggregateRating is included only when the Google rating trust
 * badge is verified, per the truthfulness rules (never manufacture
 * rating/review schema).
 */
export function lodgingBusinessSchema() {
  const googleBadge = trustBadges.find((b) => b.id === "google-rating");
  const hasVerifiedAddress = resortInfo.address?.verified;
  const hasVerifiedCoords = resortInfo.mapCoordinates?.verified;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: resortInfo.brandName,
    url: SITE_URL,
  };

  if (hasVerifiedAddress) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: resortInfo.address!.value,
      addressLocality: "Alibag",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    };
  }

  if (hasVerifiedCoords) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: resortInfo.mapCoordinates!.value.lat,
      longitude: resortInfo.mapCoordinates!.value.lng,
    };
  }

  if (resortInfo.contact.phoneNumber?.verified) {
    schema.telephone = resortInfo.contact.phoneNumber.value;
  }

  if (googleBadge?.verified && googleBadge.displayValue) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: googleBadge.displayValue,
      reviewCount: undefined, // set once numeric review count is verified separately
    };
  }

  if (approvedReviews.length) {
    schema.review = approvedReviews.map((r) => ({
      "@type": "Review",
      author: r.authorNameOrInitial,
      datePublished: r.date,
      reviewBody: r.quote,
      ...(r.rating
        ? { reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 } }
        : {}),
    }));
  }

  return schema;
}

export function organizationSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: resortInfo.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    sameAs: resortInfo.socialLinks.filter((s) => s.verified).map((s) => s.url),
  };

  if (resortInfo.contact.phoneNumber?.verified) {
    schema.telephone = resortInfo.contact.phoneNumber.value;
  }
  if (resortInfo.contact.email?.verified) {
    schema.email = resortInfo.contact.email.value;
  }

  return schema;
}

export function faqPageSchema() {
  if (!publicFaqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: publicFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
