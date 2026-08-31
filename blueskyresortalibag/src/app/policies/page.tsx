import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrackPageView } from "@/components/TrackPageView";
import { policySections } from "@/content/policies";

export const metadata: Metadata = {
  title: "Policies",
  description: "Booking, cancellation, privacy, and house policies for The Blue Sky Resort Alibag.",
  alternates: { canonical: "/policies" },
  robots: { index: false, follow: true }, // unindex until legal content is approved — see launch checklist
};

export default function PoliciesPage() {
  return (
    <>
      <TrackPageView event="view_home" properties={{ page: "policies" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "Policies", path: "/policies" }]} />

      <Container as="section" className="max-w-3xl py-12 sm:py-16">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Policies</h1>
        <p className="mt-4 text-base leading-relaxed text-charcoal-600 sm:text-lg">
          The policies below govern bookings and stays at The Blue Sky Resort
          Alibag. Sections not yet marked approved are shown as pending —
          contact us directly for anything not yet published here.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {policySections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20 border-t border-line pt-8">
              <h2 className="font-display text-2xl text-ink">{section.title}</h2>
              {section.approved ? (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-charcoal-600">{section.body}</p>
              ) : (
                <p className="mt-3 rounded-[var(--radius-md)] border border-line bg-sand/40 p-4 text-sm text-charcoal-600">
                  This section is pending legal/management review and is not
                  yet published{section.legallyRequired ? " — required before launch" : ""}.
                </p>
              )}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
