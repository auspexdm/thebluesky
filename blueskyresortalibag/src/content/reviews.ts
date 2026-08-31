import { Review } from "./types";

/**
 * GUEST REVIEWS — empty by default.
 * Do not populate with invented testimonials. Add real reviews only
 * once the resort team supplies the guest's name/initial, source,
 * date, quote, and a link back to the original review, and marks
 * `approved: true`. The Guest Voices section renders nothing (and
 * hides itself) when this array has no approved entries.
 */
export const reviews: Review[] = [
  // Example shape for the content editor — remove once real reviews are approved:
  // {
  //   id: "review-1",
  //   authorNameOrInitial: "R.",
  //   source: "Google",
  //   rating: 5,
  //   date: "2026-05-01",
  //   quote: "Real guest quote goes here, verbatim.",
  //   sourceUrl: "https://www.google.com/maps/...",
  //   approved: true,
  // },
];

export const approvedReviews = reviews.filter((r) => r.approved);
