"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import type { Photos } from "@/lib/photos";
import { controlMethods, scenes } from "@/data/content";
import { SectionHeader } from "@/components/shared/section";
import { ProductPhoto } from "@/components/shared/photo-slot";
import { cn } from "@/lib/utils";

type Id = (typeof controlMethods)[number]["id"];

/** Where each connector meets its card on the lg layout (percent of the stage). */
const anchors: Record<Id, { x: number; y: number }> = {
  touch: { x: 27, y: 26 },
  voice: { x: 27, y: 74 },
  mobile: { x: 73, y: 26 },
  auto: { x: 73, y: 74 },
};

export function Connected({ photos }: { photos: Photos }) {
  const [scene, setScene] = useState<string>(scenes[4].id);
  const on: readonly string[] = scenes.find((s) => s.id === scene)!.on;

  const pics: Record<Id, { src: string | null; alt: string; label: string }> = {
    touch: { src: photos.panelDetailB, alt: "Smart glass touch panel on a wall", label: "Smart glass panel" },
    voice: { src: photos.voiceMoment, alt: "Relaxing at home and speaking to a voice assistant", label: "Voice moment" },
    mobile: { src: photos.mobileControl, alt: "A smartphone app beside a smart glass switch", label: "Mobile app" },
    auto: { src: photos.sensorMotion, alt: "A smart motion sensor", label: "Smart sensor" },
  };

  const card = (m: (typeof controlMethods)[number], i: number) => {
    const lit = on.includes(m.id);
    const pic = pics[m.id];
    return (
      <li key={m.id} className="relative z-10">
        <a
          href={m.anchor}
          className={cn(
            "group block overflow-hidden rounded-3xl border bg-ink/80 backdrop-blur transition-all duration-700",
            lit ? "border-gold/60 shadow-[0_0_50px_-12px_rgb(201_169_110/0.55)]" : "border-white/10 opacity-60",
          )}
        >
          <div className="grid grid-cols-5 sm:grid-cols-1">
            <ProductPhoto src={pic.src} alt={pic.alt} label={pic.label} sizes="(min-width:1024px) 22vw, 40vw" className="col-span-2 aspect-auto min-h-32 rounded-none border-0 sm:aspect-[16/9]" />
            <div className="col-span-3 p-5 sm:p-6">
              <p className="eyebrow">0{i + 1}</p>
              <h3 className="display mt-2 text-[1.5rem] font-medium leading-tight text-ivory sm:text-[1.7rem]">{m.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold-soft/80">{m.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{m.text}</p>
            </div>
          </div>
        </a>
      </li>
    );
  };

  const [touch, voice, mobile, auto] = controlMethods;

  return (
    <section id="connected" className="relative bg-charcoal/40 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Connected living"
          title="One Connected Home. Multiple Ways to Control."
          description="Choose an everyday moment and see which ways of control take part. This illustrates the idea; it is not a product specification."
        />

        <div role="group" aria-label="Choose a moment" className="mt-10 flex flex-wrap justify-center gap-2.5">
          {scenes.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scene === s.id}
              onClick={() => setScene(s.id)}
              className={cn(
                "min-h-11 rounded-full border px-5 text-sm transition-colors",
                scene === s.id ? "border-gold bg-gold text-ink" : "border-white/15 text-ivory/80 hover:border-gold/50",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative mt-14">
          {/* conceptual connectors (desktop) */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full lg:block" aria-hidden>
            {controlMethods.map((m) => {
              const a = anchors[m.id];
              const lit = on.includes(m.id);
              return (
                <line
                  key={m.id}
                  x1="50" y1="50" x2={a.x} y2={a.y}
                  stroke="#C9A96E"
                  strokeWidth="1.2"
                  strokeDasharray="5 6"
                  vectorEffect="non-scaling-stroke"
                  className={cn("transition-opacity duration-700", lit && "motion-safe:animate-[dashFlow_1.6s_linear_infinite]")}
                  opacity={lit ? 0.9 : 0.15}
                />
              );
            })}
          </svg>

          <div className="grid gap-4 lg:grid-cols-[1fr_15rem_1fr] lg:items-stretch lg:gap-x-10">
            <ul className="grid gap-4 lg:content-between lg:gap-y-10">
              {card(touch, 0)}
              {card(voice, 1)}
            </ul>

            {/* hub */}
            <div className="relative z-10 order-first flex items-center justify-center py-2 lg:order-none">
              <div className="flex size-36 flex-col items-center justify-center gap-2 rounded-full border border-gold/50 bg-ink text-center shadow-[0_0_80px_-10px_rgb(201_169_110/0.55)] sm:size-44 lg:size-56">
                <Cpu className="size-6 text-gold sm:size-7" strokeWidth={1.3} />
                <span className="display text-xl font-medium leading-tight text-ivory sm:text-2xl">Your<br />Connected Home</span>
              </div>
            </div>

            <ul className="grid gap-4 lg:content-between lg:gap-y-10">
              {card(mobile, 2)}
              {card(auto, 3)}
            </ul>
          </div>
        </div>

        <p className="mt-10 flex items-center justify-center gap-3 text-xs text-mute">
          <svg width="34" height="4" aria-hidden><line x1="0" y1="2" x2="34" y2="2" stroke="#C9A96E" strokeWidth="1.4" strokeDasharray="5 5" /></svg>
          Conceptual connection. Not a wiring diagram.
        </p>
      </div>
    </section>
  );
}
