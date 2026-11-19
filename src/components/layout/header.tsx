"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { nav, whatsappLink } from "@/lib/site";
import { Logo } from "@/components/shared/logo";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wa = whatsappLink("Hello ConnectCom, I'd like a free consultation.");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Drawer a11y: lock scroll, Escape closes, Tab stays inside, focus returns to the toggle.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const f = [toggle as HTMLElement, ...focusables()];
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#top" aria-label="ConnectCom home" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:gap-9 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm tracking-wide text-ivory/75 transition-colors hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LiquidButton href="#consultation" size="md" className="hidden sm:inline-flex">
            Get a Free Consultation
          </LiquidButton>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-ivory transition-colors hover:border-gold/60 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>
    </header>

    {/* Rendered outside <header>: its backdrop-filter would otherwise become the containing block for these fixed elements. */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop: tap outside to close */}
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label="Close menu"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-x-0 bottom-0 top-16 z-40 bg-black/60 lg:hidden"
            />
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-16 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-white/10 bg-ink px-6 pb-6 pt-4 lg:hidden"
            >
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
                <ul>
                  {nav.map((n) => (
                    <li key={n.href} className="border-b border-white/10 last:border-0">
                      <a
                        href={n.href}
                        onClick={close}
                        className="flex min-h-12 items-center justify-between text-sm font-medium tracking-wide text-ivory/90 transition-colors hover:text-gold"
                      >
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-3 pt-4">
                <LiquidButton href="#consultation" variant="gold" size="md" className="w-full" onClick={close}>
                  Get a Free Consultation
                </LiquidButton>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-center rounded-full border border-gold/40 text-sm text-gold"
                  >
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
