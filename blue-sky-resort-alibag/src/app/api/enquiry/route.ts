import { NextRequest, NextResponse } from "next/server";

/**
 * Enquiry intake stub.
 * ------------------------------------------------------------------
 * TODO before launch: forward validated payloads to the resort
 * team's chosen recipient (email/CRM) per
 * /docs/booking-engine-integration-plan.md. Currently this route
 * validates shape, logs server-side, and returns success so the
 * front-end flow (loading/success/error states, analytics) can be
 * built and QA'd end-to-end before a real integration is wired in.
 * No booking is actually confirmed by this endpoint — enquiries are
 * always human-confirmed.
 */

interface EnquiryPayload {
  type: "room-enquiry" | "group-enquiry" | "contact";
  name: string;
  email: string;
  phone?: string;
  preferredContact?: "phone" | "whatsapp" | "email";
  message?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  occasion?: string;
  consent: boolean;
  utms?: Record<string, string>;
  company_website?: string; // honeypot — must stay empty
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body.company_website) {
    // Honeypot tripped — pretend success, drop silently. See
    // /docs/booking-engine-integration-plan.md for production spam
    // protection recommendations (rate limiting, CAPTCHA if needed).
    return NextResponse.json({ ok: true, confirmationMessage: "Thanks — we've received your enquiry." });
  }

  if (!body.name || body.name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  }
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }
  if (!body.consent) {
    return NextResponse.json(
      { ok: false, error: "Please confirm you're okay with us contacting you about this enquiry." },
      { status: 422 }
    );
  }

  console.log("[enquiry] received:", { ...body, receivedAt: new Date().toISOString() });

  return NextResponse.json({
    ok: true,
    confirmationMessage:
      "Thanks — we've received your enquiry. Our team will follow up shortly.",
  });
}
