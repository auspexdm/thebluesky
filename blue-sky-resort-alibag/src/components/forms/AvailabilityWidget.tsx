"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { resortInfo } from "@/content/resort";
import { track } from "@/lib/analytics";
import { CTAButton } from "../CTAButton";
import { cn } from "@/lib/utils";
import { isLiveBookingEngine } from "@/lib/booking";

export interface SearchCriteria {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

const CRITERIA_KEY = "bsr-search-criteria";

export function storeCriteria(c: SearchCriteria) {
  try {
    sessionStorage.setItem(CRITERIA_KEY, JSON.stringify(c));
  } catch {
    // ignore
  }
}

export function readStoredCriteria(): Partial<SearchCriteria> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(CRITERIA_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Booking-widget UI is identical whether or not a live booking engine
 * is connected. If `isLiveBookingEngine` is false (current state),
 * submitting reveals a transparent "we don't have live availability
 * yet" message and routes the guest into the enquiry flow instead of
 * faking a search result — per spec section 8.
 */
export function AvailabilityWidget({
  variant = "page",
  className,
}: {
  variant?: "hero" | "page";
  className?: string;
}) {
  const router = useRouter();
  const [criteria, setCriteria] = useState<SearchCriteria>({
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
  });
  const [status, setStatus] = useState<"idle" | "fallback">("idle");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!criteria.checkIn || !criteria.checkOut) {
      setError("Please choose both a check-in and check-out date.");
      return;
    }
    if (criteria.checkOut <= criteria.checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    track("availability_search", { ...criteria, live: isLiveBookingEngine });
    storeCriteria(criteria);

    if (variant === "hero") {
      router.push("/stay#availability");
      return;
    }

    if (isLiveBookingEngine && resortInfo.bookingEngineUrl?.value) {
      track("booking_engine_open", { ...criteria });
      // Redirect in the same tab per spec section 8 (brand continuity —
      // no new-window pop, guest sees a brief disclosure first).
      window.location.href = resortInfo.bookingEngineUrl.value;
    } else {
      setStatus("fallback");
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={handleSubmit}
        aria-label="Check availability"
        className="grid grid-cols-2 gap-3 rounded-[var(--radius-md)] bg-white p-4 shadow-lg ring-1 ring-line sm:grid-cols-4 sm:p-5 lg:grid-cols-5"
      >
        <Field label="Check-in">
          <input
            type="date"
            required
            value={criteria.checkIn}
            onChange={(e) => setCriteria((c) => ({ ...c, checkIn: e.target.value }))}
            className="w-full rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink"
          />
        </Field>
        <Field label="Check-out">
          <input
            type="date"
            required
            value={criteria.checkOut}
            onChange={(e) => setCriteria((c) => ({ ...c, checkOut: e.target.value }))}
            className="w-full rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink"
          />
        </Field>
        <Field label="Guests">
          <select
            value={criteria.guests}
            onChange={(e) => setCriteria((c) => ({ ...c, guests: Number(e.target.value) }))}
            className="w-full rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Rooms">
          <select
            value={criteria.rooms}
            onChange={(e) => setCriteria((c) => ({ ...c, rooms: Number(e.target.value) }))}
            className="w-full rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} room{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
        <div className="col-span-2 flex items-end sm:col-span-4 lg:col-span-1">
          <CTAButton type="submit" variant="gold" className="w-full">
            Check availability
          </CTAButton>
        </div>
      </form>

      {error && (
        <p role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}

      {isLiveBookingEngine && variant === "page" && (
        <p className="mt-3 text-xs leading-relaxed text-charcoal-400">
          Checking availability opens our secure booking partner in this tab to complete your reservation.
        </p>
      )}

      {status === "fallback" && (
        <div
          role="status"
          className="mt-4 rounded-[var(--radius-md)] border border-gold-100 bg-gold-100/40 p-4 text-sm leading-relaxed text-charcoal-600"
        >
          <p className="font-medium text-ink">
            Live availability search isn&apos;t connected yet.
          </p>
          <p className="mt-1">
            We won&apos;t pretend to show you real-time availability until it is.
            Send us your dates below and our team will confirm within{" "}
            {resortInfo.contact.responseHours?.verified
              ? resortInfo.contact.responseHours.value
              : "our usual response time"}
            .
          </p>
          <a href="#enquiry" className="mt-3 inline-block font-semibold text-ink underline">
            Continue to enquiry form ↓
          </a>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="col-span-1 flex flex-col gap-1 text-xs font-medium text-charcoal-600">
      {label}
      {children}
    </label>
  );
}
