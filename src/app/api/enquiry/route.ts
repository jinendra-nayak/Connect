import { NextResponse } from "next/server";
import { validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

export async function POST(req: Request) {
  let body: Partial<EnquiryInput>;
  try {
    body = await req.json();
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const v: EnquiryInput = {
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    interest: String(body.interest ?? ""),
    message: String(body.message ?? ""),
    website: String(body.website ?? ""),
  };

  // Honeypot: pretend success so bots learn nothing.
  if (v.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(v);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", errors }, { status: 422 });

  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!hook) {
    // Never claim success when nobody will receive the lead.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "connectcom-website",
        name: v.name.trim(),
        phone: v.phone.trim(),
        email: v.email.trim(),
        interest: v.interest,
        message: v.message.trim(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
