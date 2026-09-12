import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AvailabilityWidget } from "@/components/forms/AvailabilityWidget";
import { RoomFilterGrid } from "@/components/RoomFilterGrid";
import { Accordion } from "@/components/Accordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { CTALink } from "@/components/CTAButton";
import { TrackPageView } from "@/components/TrackPageView";
import { rooms } from "@/content/rooms";
import { faqsByTopic } from "@/content/faqs";
import { resortInfo } from "@/content/resort";

export const metadata: Metadata = {
  title: "Stay & Book — Rooms and Availability",
  description:
    "Browse rooms at The Blue Sky Resort Alibag and check availability for couples, families, and group stays near Varsoli Beach.",
  alternates: { canonical: "/stay" },
};

export default function StayPage() {
  const bookingFaqs = faqsByTopic("booking");

  return (
    <>
      <TrackPageView event="room_view" properties={{ page: "stay-index" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "Stay & Book", path: "/stay" }]} />

      <Container as="section" className="py-12 sm:py-16">
        <h1 className="font-display max-w-2xl text-4xl text-ink sm:text-5xl">Stay &amp; Book</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
          Five room types, each suited to a different kind of stay — from a
          quiet couple&apos;s escape to a room built for a group. Check your
          dates below to get started.
        </p>
      </Container>

      <section id="availability" className="scroll-mt-20 border-y border-line bg-sand/40 py-8">
        <Container>
          <AvailabilityWidget variant="page" />
        </Container>
      </section>

      <Container as="section" className="py-14 sm:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Rooms</h2>
        <div className="mt-8">
          <RoomFilterGrid rooms={rooms} />
        </div>
      </Container>

      {resortInfo.cancellationPolicySummary?.verified && (
        <section className="border-t border-line bg-sand/30 py-14">
          <Container className="max-w-2xl">
            <h2 className="font-display text-2xl text-ink">Booking with confidence</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
              {resortInfo.cancellationPolicySummary.value}
            </p>
            <CTALink href="/policies" variant="ghost" className="mt-4 px-0">
              Read our full booking policies →
            </CTALink>
          </Container>
        </section>
      )}

      <Container as="section" className="py-14 sm:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Booking questions</h2>
        <div className="mt-6 max-w-3xl">
          <Accordion items={bookingFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
        </div>
      </Container>

      <section id="enquiry" className="scroll-mt-20 border-t border-line bg-ink py-16 sm:py-20">
        <Container className="max-w-2xl">
          <div className="rounded-[var(--radius-lg)] bg-ivory p-6 sm:p-8">
            <EnquiryForm
              title="Can't find your dates? Send an enquiry."
              description="Tell us what you're looking for and our team will get back to you directly."
              type="room-enquiry"
              showDates
              showRoomsCount
              startEvent="booking_start"
              submitEvent="booking_complete"
              submitLabel="Send enquiry"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
