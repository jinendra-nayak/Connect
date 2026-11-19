"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { interests } from "@/data/content";
import { site, whatsappLink } from "@/lib/site";
import { validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";
import { INTEREST_EVENT } from "@/components/shared/enquire-link";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { RevealHeading, Reveal } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

const empty: EnquiryInput = { name: "", phone: "", email: "", interest: "", message: "", website: "" };
type Status = "idle" | "sending" | "sent" | "failed";

const field =
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-ivory placeholder:text-mute/70 outline-none transition-colors focus:border-gold";

export function Consultation() {
  const [v, setV] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const on = (e: Event) => setV((p) => ({ ...p, interest: (e as CustomEvent<string>).detail }));
    window.addEventListener(INTEREST_EVENT, on);
    return () => window.removeEventListener(INTEREST_EVENT, on);
  }, []);

  const set = (k: keyof EnquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k as keyof EnquiryErrors]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const summary = `Hello ConnectCom, I'd like a consultation.${v.interest ? ` Interested in: ${v.interest}.` : ""}${v.name ? ` Name: ${v.name}.` : ""}`;
  const wa = whatsappLink(summary);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(v);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (r.ok) {
        setStatus("sent");
        setV(empty);
      } else if (r.status === 422) {
        setErrors((await r.json()).errors ?? {});
        setStatus("idle");
      } else setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  const err = (k: keyof EnquiryErrors) =>
    errors[k] ? <p id={`e-${k}`} role="alert" className="mt-1.5 text-xs text-red-300">{errors[k]}</p> : null;
  const a11y = (k: keyof EnquiryErrors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <section id="consultation" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-charcoal/40 py-24 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[130px]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="eyebrow">Get in touch</p>
          <RevealHeading as="h2" text="Ready to Make Your Home Smarter?" className="display mt-5 text-[clamp(2rem,4.2vw,3.6rem)] font-medium text-ivory" />
          <span id="cta-title" className="sr-only">Ready to Make Your Home Smarter?</span>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
              Discover intelligent living with ConnectCom. Let&apos;s design a smarter experience for your home.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <LiquidButton href="#consultation-form" variant="gold">Book a Consultation</LiquidButton>
            <LiquidButton href={wa ?? "#consultation-form"} {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {wa ? <><MessageCircle className="size-4" /> Contact Us on WhatsApp</> : "Contact Us"}
            </LiquidButton>
          </Reveal>

          {(site.phone || site.email || site.address) && (
            <ul className="mt-12 space-y-4 text-sm text-ivory/80">
              {site.phone && <li className="flex items-center gap-3"><Phone className="size-4 text-gold" /><a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold">{site.phone}</a></li>}
              {site.email && <li className="flex items-center gap-3"><Mail className="size-4 text-gold" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>}
              {site.address && <li className="text-mute">{site.address}</li>}
            </ul>
          )}
        </div>

        <Reveal y={40}>
          <form id="consultation-form" onSubmit={submit} noValidate className="glass scroll-mt-28 rounded-[2rem] p-6 sm:p-10">
            <h3 className="display text-2xl font-medium text-ivory">Free consultation enquiry</h3>
            <p className="mt-1.5 text-sm text-mute">Tell us a little about your home. We&apos;ll get back to you.</p>

            {status === "sent" ? (
              <div role="status" className="mt-8 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-ivory">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
                <p>Thank you, your enquiry has been sent. Our team will be in touch shortly.</p>
              </div>
            ) : (
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className="mb-2 block text-xs uppercase tracking-widest text-mute">Full name *</label>
                  <input id="f-name" autoComplete="name" value={v.name} onChange={set("name")} className={cn(field, errors.name ? "border-red-400/70" : "border-white/10")} {...a11y("name")} />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="f-phone" className="mb-2 block text-xs uppercase tracking-widest text-mute">Phone *</label>
                  <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} className={cn(field, errors.phone ? "border-red-400/70" : "border-white/10")} {...a11y("phone")} />
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor="f-email" className="mb-2 block text-xs uppercase tracking-widest text-mute">Email</label>
                  <input id="f-email" type="email" autoComplete="email" value={v.email} onChange={set("email")} className={cn(field, errors.email ? "border-red-400/70" : "border-white/10")} {...a11y("email")} />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="f-interest" className="mb-2 block text-xs uppercase tracking-widest text-mute">I&apos;m interested in *</label>
                  <select id="f-interest" value={v.interest} onChange={set("interest")} className={cn(field, "appearance-none", errors.interest ? "border-red-400/70" : "border-white/10", !v.interest && "text-mute/70")} {...a11y("interest")}>
                    <option value="" disabled className="bg-charcoal">Select…</option>
                    {interests.map((i) => <option key={i} value={i} className="bg-charcoal text-ivory">{i}</option>)}
                  </select>
                  {err("interest")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-message" className="mb-2 block text-xs uppercase tracking-widest text-mute">Message</label>
                  <textarea id="f-message" rows={4} value={v.message} onChange={set("message")} className={cn(field, "resize-none", errors.message ? "border-red-400/70" : "border-white/10")} {...a11y("message")} />
                  {err("message")}
                </div>
                {/* honeypot */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></label>
                </div>

                {status === "failed" && (
                  <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100 sm:col-span-2">
                    We couldn&apos;t send your enquiry online right now.{" "}
                    {wa ? <>Please <a className="underline" href={wa} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a> instead.</>
                      : site.email ? <>Please email us at <a className="underline" href={`mailto:${site.email}?subject=${encodeURIComponent("Consultation enquiry")}&body=${encodeURIComponent(summary)}`}>{site.email}</a>.</>
                      : "Please try again shortly."}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                  <LiquidButton type="submit" variant="gold" disabled={status === "sending"} className="w-full sm:w-auto">
                    {status === "sending" ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : "Request Free Consultation"}
                  </LiquidButton>
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-sm text-ivory/80 hover:text-gold">
                      <MessageCircle className="size-4" /> or chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
