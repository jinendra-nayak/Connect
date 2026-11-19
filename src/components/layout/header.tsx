"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/site";
import { Logo } from "@/components/shared/logo";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="ConnectCom home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
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
            type="button"
            className="glass inline-flex size-11 items-center justify-center rounded-full text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto px-5 pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((n) => (
                <li key={n.href} className="border-b border-white/10">
                  <a href={n.href} onClick={() => setOpen(false)} className="display block py-5 text-3xl text-ivory">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <LiquidButton href="#consultation" variant="gold" className="mt-8 w-full" onClick={() => setOpen(false)}>
              Get a Free Consultation
            </LiquidButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
