"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { panelFeatures } from "@/data/content";
import { ProductPhoto } from "@/components/shared/photo-slot";
import { SectionHeader } from "@/components/shared/section";
import { EnquireLink } from "@/components/shared/enquire-link";
import { Reveal } from "@/components/shared/motion";

/** Spatial showcase: a real panel photograph with subtle scroll parallax beside the feature list. */
export function PanelShowcase({ photo }: { photo: string | null }) {
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <section id="panel" className="relative overflow-hidden bg-ink py-20 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Smart Glass Panel"
          title="One panel. Your entire home at your fingertips."
          description="A refined glass surface that brings the everyday controls of your home together in one beautiful place."
        />

        <div ref={stage} className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              <motion.div style={{ y, scale }} className="absolute -inset-[6%] motion-reduce:!transform-none">
                <ProductPhoto src={photo} alt="Smart glass touch panel installed on a living-room wall" sizes="(min-width:1024px) 50vw, 100vw" className="size-full rounded-none border-0" />
              </motion.div>
            </div>
          </div>

          <ol>
            {panelFeatures.map((f, i) => (
              <li key={f.title}>
                <Reveal delay={i * 0.04}>
                  <div className="flex gap-5 border-b border-white/10 py-6 sm:py-7">
                    <span className="eyebrow pt-1.5">0{i + 1}</span>
                    <div>
                      <h3 className="display text-xl font-medium text-ivory sm:text-2xl">{f.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
            <li className="pt-8">
              <EnquireLink interest="Smart Glass Touch Panels" className="inline-flex min-h-12 items-center rounded-full border border-gold/40 px-6 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">
                Enquire about Smart Glass Panels
              </EnquireLink>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
