"use client";

import { useState, useSyncExternalStore } from "react";
import { setConsent, subscribeConsent, getConsentSnapshot, getConsentServerSnapshot } from "@/lib/analytics";
import { Container } from "./Container";

/**
 * Tasteful, non-blocking consent prompt — does not use a full-screen
 * modal or dark overlay. Analytics events are gated on consent
 * (see lib/analytics.ts::track).
 */
export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  if (consent !== "unset" || dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-30 px-4 lg:bottom-4"
    >
      <Container className="max-w-3xl px-0">
        <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-line bg-white p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-charcoal-600">
            We use essential cookies to run this site, and optional analytics
            cookies to understand how it&apos;s used. You can change this
            anytime.
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => {
                setConsent("denied");
                setDismissed(true);
              }}
              className="rounded-[var(--radius-sm)] border border-line px-4 py-2 text-sm font-medium text-charcoal-600 hover:bg-sand/50"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => {
                setConsent("granted");
                setDismissed(true);
              }}
              className="rounded-[var(--radius-sm)] bg-ink px-4 py-2 text-sm font-medium text-ivory hover:bg-ink-700"
            >
              Accept
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
