import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { CTALink } from "@/components/CTAButton";
import { TrackPageView } from "@/components/TrackPageView";
import { resortInfo } from "@/content/resort";
import { whatsappHref } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/Header";

export const metadata: Metadata = {
  title: "Location & Contact",
  description:
    "Find and contact The Blue Sky Resort Alibag — directions, travel guidance, and ways to reach our team near Varsoli Beach.",
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  const { contact } = resortInfo;
  const anyContactVerified = contact.phoneNumber?.verified || contact.whatsappNumber?.verified || contact.email?.verified;

  return (
    <>
      <TrackPageView event="view_home" properties={{ page: "location" }} />
      <Header />
      <Breadcrumbs trail={[{ name: "Location & Contact", path: "/location" }]} />

      <Container as="section" className="py-12 sm:py-16">
        <h1 className="font-display max-w-2xl text-4xl text-ink sm:text-5xl">Your Alibag escape starts here.</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-600 sm:text-lg">
          Making it easy to reach us matters more to us than a fancy map — here&apos;s
          everything you need.
        </p>
      </Container>

      <Container as="section" className="grid gap-10 pb-16 lg:grid-cols-2">
        <div>
          <PlaceholderImage
            label={
              resortInfo.mapCoordinates?.verified
                ? "Static map preview centred on the resort"
                : "Map preview pending verified GPS coordinates"
            }
            aspect="4/3"
            tone="sage"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            {resortInfo.googleMapsUrl?.verified ? (
              <CTALink href={resortInfo.googleMapsUrl.value} variant="outline">
                Open in Google Maps
              </CTALink>
            ) : (
              <span className="text-sm text-charcoal-400">
                Map link pending confirmation.
              </span>
            )}
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-xl text-ink">Address</h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              {resortInfo.address?.verified ? resortInfo.address.value : "[Address pending confirmation with resort team]"}
            </p>
            {resortInfo.beachDistance?.verified && (
              <p className="mt-2 text-sm text-charcoal-600">{resortInfo.beachDistance.value}</p>
            )}
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-display text-xl text-ink">Getting here</h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
              Approved travel guidance (routes from Mumbai/Pune, ferry vs. road
              options) will appear here once confirmed by the resort team.
            </p>
          </div>
        </div>

        <div id="contact" className="scroll-mt-20">
          <h2 className="font-display text-xl text-ink">Contact details</h2>
          <dl className="mt-4 flex flex-col gap-4 text-sm">
            {contact.phoneNumber?.verified && (
              <div>
                <dt className="text-charcoal-400">Phone</dt>
                <dd>
                  <a href={`tel:${contact.phoneNumber.value}`} className="font-medium text-ink">
                    {contact.phoneNumber.value}
                  </a>
                </dd>
              </div>
            )}
            {contact.whatsappNumber?.verified && (
              <div>
                <dt className="text-charcoal-400">WhatsApp</dt>
                <dd>
                  <a href={whatsappHref(contact.whatsappNumber.value)} className="inline-flex items-center gap-2 font-medium text-ink">
                    <WhatsAppIcon /> {contact.whatsappNumber.value}
                  </a>
                </dd>
              </div>
            )}
            {contact.email?.verified && (
              <div>
                <dt className="text-charcoal-400">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email.value}`} className="font-medium text-ink">
                    {contact.email.value}
                  </a>
                </dd>
              </div>
            )}
            {contact.responseHours?.verified && (
              <div>
                <dt className="text-charcoal-400">Response hours</dt>
                <dd className="font-medium text-ink">{contact.responseHours.value}</dd>
              </div>
            )}
            {!anyContactVerified && (
              <p className="rounded-[var(--radius-md)] border border-line bg-sand/40 p-4 text-charcoal-600">
                Contact details are being finalized. Please use the enquiry
                form and our team will follow up.
              </p>
            )}
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-charcoal-400">
            For medical or safety emergencies, please contact local emergency
            services directly rather than waiting on a resort response.
          </p>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-line bg-white p-6">
            <EnquiryForm
              title="Send us a message"
              description="We'll get back to you as soon as we can."
              type="contact"
              showMessage
              startEvent="group_enquiry_start"
              submitEvent="group_enquiry_submit"
              submitLabel="Send message"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
