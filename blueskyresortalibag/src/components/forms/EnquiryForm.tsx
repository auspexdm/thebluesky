"use client";

import { FormEvent, useRef, useState } from "react";
import { CTAButton } from "../CTAButton";
import { track, AnalyticsEvent, getStoredUtms } from "@/lib/analytics";
import { readStoredCriteria } from "./AvailabilityWidget";
import { resortInfo } from "@/content/resort";
import { whatsappHref } from "@/lib/utils";
import { WhatsAppIcon } from "../Header";

type Status = "idle" | "submitting" | "success" | "error";

export interface EnquiryFormProps {
  id?: string;
  title: string;
  description?: string;
  type: "room-enquiry" | "group-enquiry" | "contact";
  showDates?: boolean;
  showRoomsCount?: boolean;
  showOccasion?: boolean;
  showBudget?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
  startEvent?: AnalyticsEvent;
  submitEvent?: AnalyticsEvent;
  prefillRoomName?: string;
}

const OCCASIONS = [
  "Family stay",
  "Reunion",
  "Celebration",
  "Friends' get-together",
  "Corporate offsite",
  "Other",
];

export function EnquiryForm({
  id,
  title,
  description,
  type,
  showDates = false,
  showRoomsCount = false,
  showOccasion = false,
  showBudget = false,
  showMessage = true,
  submitLabel = "Send enquiry",
  startEvent,
  submitEvent,
  prefillRoomName,
}: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const startedRef = useRef(false);

  // Dates/guests/rooms below are uncontrolled inputs seeded from
  // sessionStorage (if the guest already searched on the homepage/stay
  // widget). Reading it directly in defaultValue — rather than via
  // useState+useEffect — avoids a server/client render mismatch, since
  // defaultValue only sets the input's *initial* value and isn't part of
  // React's hydration comparison the way controlled `value` is.
  const stored = showDates ? readStoredCriteria() : {};

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    if (startEvent) track(startEvent, { formType: type });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    // Honeypot spam protection: real visitors never see or fill this field.
    if (formData.get("company_website")) {
      setStatus("success");
      return;
    }

    const payload = {
      type,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      preferredContact: formData.get("preferredContact"),
      message: formData.get("message") || prefillRoomName ? `${prefillRoomName ? `Room: ${prefillRoomName}. ` : ""}${formData.get("message") ?? ""}` : undefined,
      checkIn: showDates ? (formData.get("checkIn") as string) : undefined,
      checkOut: showDates ? (formData.get("checkOut") as string) : undefined,
      guests: showDates ? Number(formData.get("guests")) : undefined,
      rooms: showRoomsCount ? Number(formData.get("rooms")) : undefined,
      occasion: showOccasion ? formData.get("occasion") : undefined,
      consent: formData.get("consent") === "on",
      utms: getStoredUtms(),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again or WhatsApp us.");
        setStatus("error");
        track("booking_error", { formType: type });
        return;
      }
      setStatus("success");
      if (submitEvent) track(submitEvent, { formType: type });
    } catch {
      setErrorMsg("We couldn't send that just now. Please try again or reach us on WhatsApp.");
      setStatus("error");
      track("booking_error", { formType: type });
    }
  }

  if (status === "success") {
    return (
      <div id={id} role="status" className="rounded-[var(--radius-md)] border border-sage-700/30 bg-sage-100 p-6 text-center">
        <p className="font-display text-xl text-ink">Thank you — enquiry received.</p>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
          Our team will follow up with you shortly
          {resortInfo.contact.responseHours?.verified ? ` (${resortInfo.contact.responseHours.value})` : ""}.
          Prefer to talk now?
        </p>
        {resortInfo.contact.whatsappNumber?.verified && (
          <a
            href={whatsappHref(resortInfo.contact.whatsappNumber.value)}
            className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-ink px-5 py-2.5 text-sm font-semibold text-ivory"
          >
            <WhatsAppIcon /> WhatsApp us
          </a>
        )}
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} onFocus={markStarted} className="flex flex-col gap-4" noValidate>
      <div>
        <h3 className="font-display text-2xl text-ink">{title}</h3>
        {description && <p className="mt-1 text-sm text-charcoal-600">{description}</p>}
      </div>

      {showDates && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <TextField label="Check-in" type="date" name="checkIn" defaultValue={stored.checkIn ?? ""} required />
          <TextField label="Check-out" type="date" name="checkOut" defaultValue={stored.checkOut ?? ""} required />
          <NumberField label="Guests" name="guests" defaultValue={stored.guests ?? 2} min={1} max={30} />
          {showRoomsCount && (
            <NumberField label="Rooms" name="rooms" defaultValue={stored.rooms ?? 1} min={1} max={10} />
          )}
        </div>
      )}

      {showOccasion && (
        <label className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
          Occasion / type
          <select name="occasion" className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      )}

      {showBudget && (
        <label className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
          Approximate budget (optional)
          <input name="budget" type="text" className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink" />
        </label>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
          Name
          <input name="name" type="text" required autoComplete="name" className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink" />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
          Phone
          <input name="phone" type="tel" autoComplete="tel" className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink" />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
        Email
        <input name="email" type="email" required autoComplete="email" className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink" />
      </label>

      <fieldset className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
        <legend>Preferred contact method</legend>
        <div className="mt-1 flex flex-wrap gap-4">
          {["Phone", "WhatsApp", "Email"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 font-normal text-charcoal-600">
              <input type="radio" name="preferredContact" value={opt.toLowerCase()} defaultChecked={opt === "Email"} />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {showMessage && (
        <label className="flex flex-col gap-1 text-sm font-medium text-charcoal-600">
          {type === "group-enquiry" ? "Food / event requirements (optional)" : "Anything else we should know?"}
          <textarea name="message" rows={3} className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink" />
        </label>
      )}

      <label className="flex items-start gap-2.5 text-sm text-charcoal-600">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          I agree to be contacted about this enquiry. See our{" "}
          <a href="/policies#privacy-policy" className="underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {/* Honeypot: hidden from sighted and screen-reader users, visible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label>
          Leave this field blank
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && errorMsg && (
        <p role="alert" className="text-sm text-error">
          {errorMsg}
        </p>
      )}

      <CTAButton type="submit" variant="primary" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : submitLabel}
      </CTAButton>
    </form>
  );
}

function TextField({
  label,
  type,
  name,
  defaultValue,
  required,
}: {
  label: string;
  type: string;
  name: string;
  defaultValue: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-charcoal-600">
      {label}
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink"
      />
    </label>
  );
}

function NumberField({
  label,
  name,
  defaultValue,
  min,
  max,
}: {
  label: string;
  name: string;
  defaultValue: number;
  min: number;
  max: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-charcoal-600">
      {label}
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="rounded-[var(--radius-sm)] border border-line px-3 py-2.5 text-sm text-ink"
      />
    </label>
  );
}
