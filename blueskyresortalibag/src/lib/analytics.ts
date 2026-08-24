"use client";

/**
 * ANALYTICS EVENT HELPER
 * ------------------------------------------------------------------
 * Consent-aware, provider-agnostic. Wire a real provider (GA4,
 * Plausible, Segment, etc.) by filling in `dispatch()` — until then
 * events are only logged to the console in development so the event
 * plan can be validated end-to-end. See /docs/analytics-event-spec.md
 * for the full list of event names and required properties.
 *
 * No event fires until consent is granted for "analytics" (see
 * ConsentBanner + useConsent hook), except essential functional
 * events that do not touch third-party analytics.
 */

export type AnalyticsEvent =
  | "view_home"
  | "availability_search"
  | "room_view"
  | "booking_start"
  | "booking_engine_open"
  | "room_selected"
  | "checkout_start"
  | "booking_complete"
  | "booking_error"
  | "group_enquiry_start"
  | "group_enquiry_submit"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "directions_click"
  | "review_link_click"
  | "award_badge_click"
  | "gallery_open";

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined;
}

const CONSENT_KEY = "bsr-consent";

export function getConsent(): "granted" | "denied" | "unset" {
  if (typeof window === "undefined") return "unset";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    if (v === "granted" || v === "denied") return v;
    return "unset";
  } catch {
    return "unset";
  }
}

export function setConsent(value: "granted" | "denied") {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage unavailable — fail silently, consent banner will re-prompt
  }
  // Notify subscribers (see subscribeConsent) even if storage failed, so
  // the banner still dismisses for this tab.
  window.dispatchEvent(new CustomEvent("bsr-consent-change", { detail: value }));
}

/**
 * useSyncExternalStore-compatible subscribe/getSnapshot pair for reading
 * consent state. Using this (instead of reading localStorage inside a
 * useEffect + setState) keeps ConsentBanner's server/client snapshots
 * consistent and avoids calling setState directly inside an effect body.
 */
export function subscribeConsent(callback: () => void) {
  window.addEventListener("bsr-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("bsr-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function getConsentSnapshot(): "granted" | "denied" | "unset" {
  return getConsent();
}

export function getConsentServerSnapshot(): "granted" | "denied" | "unset" {
  return "unset";
}

function dispatch(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  // TODO: wire real provider here, e.g.:
  // window.gtag?.('event', event, properties);
  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics] ${event}`, properties ?? {});
  }
}

export function track(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted") return;
  dispatch(event, properties);
}

/** UTM capture — stored for passthrough to booking engine / enquiry forms where permitted. */
export function captureUtms() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const found: Record<string, string> = {};
  keys.forEach((k) => {
    const v = params.get(k);
    if (v) found[k] = v;
  });
  if (Object.keys(found).length) {
    try {
      window.sessionStorage.setItem("bsr-utms", JSON.stringify(found));
    } catch {
      // ignore
    }
  }
}

export function getStoredUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem("bsr-utms");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
