import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Accordion } from "@/components/Accordion";
import { TrackPageView } from "@/components/TrackPageView";
import { publicFaqs } from "@/content/faqs";
import { FaqItem } from "@/content/types";
import { JsonLd, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQs — Booking, Stay & Group Questions",
  description: "Answers to common questions about booking, staying, and planning a group visit at The Blue Sky Resort Alibag.",
  alternates: { canonical: "/faqs" },
};

const TOPIC_LABELS: Record<FaqItem["topic"], string> = {
  booking: "Booking",
  stay: "Your stay",
  group: "Group enquiries",
  location: "Location",
  general: "General",
};

export default function FaqsPage() {
  const byTopic = publicFaqs.reduce<Record<string, FaqItem[]>>((acc, f) => {
    (acc[f.topic] ||= []).push(f);
    return acc;
  }, {});

  const schema = faqPageSchema();

  return (
    <>
      <TrackPageView event="view_home" properties={{ page: "faqs" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "FAQs", path: "/faqs" }]} />

      <Container as="section" className="py-12 sm:py-16">
        <h1 className="font-display max-w-2xl text-4xl text-ink sm:text-5xl">Frequently asked questions</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
          Booking, stay, and group questions, answered plainly. Can&apos;t find
          what you need? Reach us via the Location &amp; Contact page.
        </p>
      </Container>

      <Container as="section" className="max-w-3xl pb-20">
        {Object.keys(byTopic).length === 0 ? (
          <Accordion items={[]} />
        ) : (
          Object.entries(byTopic).map(([topic, items]) => (
            <div key={topic} className="mb-10">
              <h2 className="font-display text-xl text-ink">{TOPIC_LABELS[topic as FaqItem["topic"]]}</h2>
              <div className="mt-4">
                <Accordion items={items.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
              </div>
            </div>
          ))
        )}
      </Container>

      {schema && <JsonLd data={schema} />}
    </>
  );
}
