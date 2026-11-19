"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { panelFeatures } from "@/data/content";
import { Panel } from "@/components/shared/device-art";
import { SectionHeader } from "@/components/shared/section";
import { EnquireLink } from "@/components/shared/enquire-link";
import { cn } from "@/lib/utils";

/** Spatial showcase: a sticky device whose screen follows the feature in view. */
export function PanelShowcase() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 14]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="panel" className="relative overflow-hidden bg-ink py-24 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 size-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Smart Glass Panel"
          title="One panel. Your entire home at your fingertips."
          description="A refined glass surface that brings the everyday controls of your home together in one beautiful place."
        />

        <div ref={stage} className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-[32rem] lg:self-start">
            <div className="glass relative flex h-[22rem] items-center justify-center overflow-hidden rounded-[2rem] sm:h-[28rem] lg:h-full [perspective:1200px]">
              {/* wall light wash */}
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgb(201_169_110/0.18),transparent_60%)]" />
              <motion.div style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className="relative">
                <Panel active={panelFeatures[active].active} className="w-60 sm:w-72" />
                <div aria-hidden className="absolute -bottom-10 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-full bg-black/60 blur-2xl" />
              </motion.div>
              <p className="absolute bottom-5 left-0 right-0 text-center text-xs tracking-[0.25em] text-gold" aria-live="polite">
                {panelFeatures[active].title.toUpperCase()}
              </p>
            </div>
          </div>

          <ol className="flex flex-col gap-6 lg:gap-0">
            {panelFeatures.map((f, i) => (
              <li
                key={f.title}
                data-i={i}
                ref={(el) => { refs.current[i] = el; }}
                className={cn(
                  "rounded-3xl border p-7 transition-all duration-500 sm:p-9 lg:my-[8vh] lg:first:mt-0 lg:last:mb-0",
                  active === i ? "border-gold/40 bg-white/[0.04]" : "border-white/10 opacity-70 lg:opacity-40",
                )}
              >
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="display mt-3 text-2xl font-medium text-ivory sm:text-3xl">{f.title}</h3>
                <p className="mt-3 text-mute">{f.text}</p>
              </li>
            ))}
            <li className="pt-4 lg:pt-10">
              <EnquireLink interest="Smart Glass Touch Panels" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">
                Enquire about Smart Glass Panels
              </EnquireLink>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
