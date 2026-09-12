import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { resortInfo } from "@/content/resort";
import { whatsappHref } from "@/lib/utils";

const FOOTER_LINKS = [
  { href: "/stay", label: "Stay & Book" },
  { href: "/group-stays", label: "Group Stays" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/location", label: "Location & Contact" },
  { href: "/faqs", label: "FAQs" },
];

const LEGAL_LINKS = [
  { href: "/policies#privacy-policy", label: "Privacy Policy" },
  { href: "/policies#booking-terms", label: "Terms / Booking Terms" },
];

export function Footer() {
  const { contact } = resortInfo;

  return (
    <footer className="border-t border-line bg-ink text-ivory">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo.png"
            alt="The Blue Sky — Quaint & Tranquil"
            width={112}
            height={112}
            className="h-16 w-16"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">
            A boutique coastal escape near Varsoli Beach, Alibag — built for
            easy, unhurried stays.
          </p>
          {resortInfo.socialLinks.some((s) => s.verified) && (
            <div className="mt-5 flex gap-4">
              {resortInfo.socialLinks
                .filter((s) => s.verified)
                .map((s) => (
                  <a key={s.platform} href={s.url} className="text-sm text-ivory/70 hover:text-ivory">
                    {s.platform}
                  </a>
                ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ivory/50">Explore</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ivory/80 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Policies">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ivory/50">Policies</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ivory/80 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ivory/50">Contact</p>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/80">
            {contact.phoneNumber?.verified && (
              <li>
                <a href={`tel:${contact.phoneNumber.value}`}>{contact.phoneNumber.value}</a>
              </li>
            )}
            {contact.whatsappNumber?.verified && (
              <li>
                <a href={whatsappHref(contact.whatsappNumber.value)}>WhatsApp us</a>
              </li>
            )}
            {contact.email?.verified && (
              <li>
                <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>
              </li>
            )}
            {!contact.phoneNumber?.verified && !contact.whatsappNumber?.verified && !contact.email?.verified && (
              <li className="text-ivory/50">
                Contact details pending — see{" "}
                <Link href="/location" className="underline">
                  Location &amp; Contact
                </Link>
                .
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-ivory/10 py-6">
        <Container className="flex flex-col gap-2 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {resortInfo.brandName}. All rights reserved.</p>
          <p>Alibag, Maharashtra, India</p>
        </Container>
      </div>
    </footer>
  );
}
