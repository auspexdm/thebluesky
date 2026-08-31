"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { cn, whatsappHref } from "@/lib/utils";
import { resortInfo } from "@/content/resort";
import { track } from "@/lib/analytics";
import { bookingHref, isLiveBookingEngine } from "@/lib/booking";

const NAV_LINKS = [
  { href: "/stay", label: "Stay & Book" },
  { href: "/group-stays", label: "Group Stays" },
  { href: "/experience", label: "Experience" },
  { href: "/gallery", label: "Gallery" },
  { href: "/location", label: "Location" },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const whatsapp = resortInfo.contact.whatsappNumber;

  // Close the mobile menu when the route changes. Adjusting state during
  // render (rather than in an effect) avoids an extra render pass — this
  // is React's documented pattern for resetting state on a prop change.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const isTransparent = overlay && !scrolled && !menuOpen;

  return (
    <>
      <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isTransparent ? "bg-transparent" : "bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-line)]"
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center" aria-label="The Blue Sky Resort Alibag — Home">
          <Image
            src="/brand/logo.png"
            alt="The Blue Sky — Quaint & Tranquil"
            width={112}
            height={112}
            priority
            className={cn("h-11 w-11 sm:h-14 sm:w-14", isTransparent && "drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]")}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                isTransparent ? "text-ivory/90 hover:text-ivory" : "text-charcoal-600 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {whatsapp?.verified && (
            <a
              href={whatsappHref(whatsapp.value)}
              onClick={() => track("whatsapp_click", { location: "header" })}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                isTransparent
                  ? "border-ivory/60 text-ivory hover:bg-ivory/10"
                  : "border-line text-sage-700 hover:bg-sage-100"
              )}
              aria-label="Message us on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          )}
          <Link
            href={bookingHref}
            onClick={() => track("booking_start", { location: "header", live: isLiveBookingEngine })}
            className={cn(
              "rounded-[var(--radius-sm)] px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors",
              isTransparent ? "bg-gold text-ink hover:bg-ivory" : "bg-ink text-ivory hover:bg-ink-700"
            )}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile: compact header always solid text for legibility */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={bookingHref}
            onClick={() => track("booking_start", { location: "header-mobile", live: isLiveBookingEngine })}
            className={cn(
              "rounded-[var(--radius-sm)] px-4 py-2 text-xs font-semibold tracking-wide",
              isTransparent ? "bg-gold text-ink" : "bg-ink text-ivory"
            )}
          >
            Book Now
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border",
              isTransparent ? "border-ivory/50 text-ivory" : "border-line text-ink"
            )}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-ivory px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium text-charcoal hover:bg-sand/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={bookingHref}
                onClick={() => track("booking_start", { location: "header-menu", live: isLiveBookingEngine })}
                className="mt-2 block rounded-[var(--radius-sm)] bg-ink px-3 py-3 text-center text-base font-semibold text-ivory"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </nav>
      )}
      </header>
      {/*
        Header is always `fixed`, so on every page that isn't rendering it
        as a transparent overlay over a full-bleed hero (only the
        homepage), this spacer reserves the header's real height in
        normal flow — otherwise the Breadcrumbs/H1 that follow would be
        hidden underneath it. Height must stay in sync with the header's
        own h-16 sm:h-20.
      */}
      {!overlay && <div aria-hidden="true" className="h-16 sm:h-20" />}
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
export function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.03.29-3.5-.73-2.96-1.23-4.86-4.24-5.01-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.24.6.83 2.06.9 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.17-.2.73-.85.93-1.14.2-.3.4-.24.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.08.13.08.74-.16 1.42z" />
    </svg>
  );
}
