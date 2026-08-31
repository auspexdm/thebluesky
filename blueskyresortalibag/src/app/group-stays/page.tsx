import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Accordion } from "@/components/Accordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { TrackPageView } from "@/components/TrackPageView";
import { groupUseCases, groupConfigurations, groupPlanningSteps } from "@/content/groupStays";
import { galleryImages } from "@/content/gallery";
import { faqsByTopic } from "@/content/faqs";
import { resortInfo } from "@/content/resort";
import { whatsappHref } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/Header";

export const metadata: Metadata = {
  title: "Group Stays — Family, Friends & Corporate Groups",
  description:
    "Plan a family gathering, reunion, celebration, or offsite at The Blue Sky Resort Alibag. Multi-room and group-friendly stays near Varsoli Beach.",
  alternates: { canonical: "/group-stays" },
};

const gatheringImages = galleryImages.filter((g) => g.category === "gatherings");

export default function GroupStaysPage() {
  const groupFaqs = faqsByTopic("group");

  return (
    <>
      <TrackPageView event="group_enquiry_start" properties={{ page: "group-stays-view" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "Group Stays", path: "/group-stays" }]} />

      <Container as="section" className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="font-display max-w-2xl text-4xl text-ink sm:text-5xl">More room for your people.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
            Plan a family gathering, friends&apos; escape, celebration, offsite, or
            multi-room stay with a team that helps make the details simple.
          </p>

          {groupUseCases.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {groupUseCases.map((u) => (
                <li key={u.id} className="rounded-full border border-line px-4 py-1.5 text-sm text-charcoal-600">
                  {u.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <PlaceholderImage
          label="Extended family group relaxing together on the lawn"
          alt="Outdoor lawn gathering setup with string lights, illustrative stock photo"
          src="/images/gathering-setup.jpg"
          isStockOrIllustrative
          aspect="4/3"
          tone="ocean"
        />
      </Container>

      {groupConfigurations.some((c) => c.verified) && (
        <section className="border-y border-line bg-sand/30 py-14 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Stay configurations</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {groupConfigurations
                .filter((c) => c.verified)
                .map((c) => (
                  <div key={c.id} className="rounded-[var(--radius-md)] border border-line bg-white p-5 text-sm text-charcoal-600">
                    {c.label}
                  </div>
                ))}
            </div>
          </Container>
        </section>
      )}

      <Container as="section" className="py-14 sm:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">How planning works</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groupPlanningSteps.map((step) => (
            <li key={step.step}>
              <span className="font-display text-3xl text-gold-700">{String(step.step).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-lg text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>

      {gatheringImages.length > 0 && (
        <section className="border-t border-line bg-sand/30 py-14 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Group moments</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gatheringImages.map((img) => (
                <PlaceholderImage
                  key={img.id}
                  label={img.placeholderLabel}
                  alt={img.altText}
                  src={img.src}
                  isStockOrIllustrative={img.isStockOrIllustrative}
                  aspect="4/3"
                  tone="sage"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="enquiry" className="scroll-mt-20 border-t border-line bg-ink py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="rounded-[var(--radius-lg)] bg-ivory p-6 sm:p-8">
            <EnquiryForm
              title="Plan a group stay"
              description="Share a few details and we'll help you find the right room combination."
              type="group-enquiry"
              showDates
              showRoomsCount
              showOccasion
              showBudget
              startEvent="group_enquiry_start"
              submitEvent="group_enquiry_submit"
              submitLabel="Send group enquiry"
            />
          </div>
          <div className="text-ivory">
            <h2 className="font-display text-2xl">Prefer to talk it through?</h2>
            <p className="mt-3 text-sm leading-relaxed text-ivory/75">
              For larger or more complex groups, our team is happy to talk
              through options directly.
            </p>
            {resortInfo.contact.whatsappNumber?.verified ? (
              <a
                href={whatsappHref(resortInfo.contact.whatsappNumber.value, "Hi! I'd like to ask about a group stay.")}
                className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-ivory/60 px-5 py-3 text-sm font-medium text-ivory hover:bg-ivory hover:text-ink"
              >
                <WhatsAppIcon /> WhatsApp us about your group
              </a>
            ) : (
              <p className="mt-5 text-sm text-ivory/60">
                A direct WhatsApp line will be added here once approved — for
                now, please use the enquiry form.
              </p>
            )}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-14 sm:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Group stay questions</h2>
        <div className="mt-6 max-w-3xl">
          <Accordion items={groupFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
        </div>
      </Container>
    </>
  );
}
