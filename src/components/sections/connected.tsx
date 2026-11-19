"use client";

import { useState } from "react";
import { Blinds, Cpu, Lightbulb, LayoutGrid, Lock, Radar } from "lucide-react";
import { nodes, scenes } from "@/data/content";
import { SectionHeader } from "@/components/shared/section";
import { cn } from "@/lib/utils";

const icons = { panel: LayoutGrid, lighting: Lightbulb, sensors: Radar, locks: Lock, curtains: Blinds, control: Cpu } as const;

export function Connected() {
  const [scene, setScene] = useState<string>(scenes[3].id);
  const [focus, setFocus] = useState<string>(nodes[0].id);
  const on: readonly string[] = scenes.find((s) => s.id === scene)!.on;
  const current = nodes.find((n) => n.id === focus)!;

  return (
    <section id="connected" className="relative bg-charcoal/40 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Connected living"
          title="Everything works together."
          description="Choose an everyday moment and see how ConnectCom products come together. This is an illustration of the idea, not a product specification."
        />

        <div role="group" aria-label="Choose a scene" className="mt-12 flex flex-wrap justify-center gap-2.5">
          {scenes.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scene === s.id}
              onClick={() => setScene(s.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm transition-colors",
                scene === s.id ? "border-gold bg-gold text-ink" : "border-white/15 text-ivory/80 hover:border-gold/50",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative mx-auto mt-14 aspect-square w-full max-w-[34rem] sm:aspect-[4/3] sm:max-w-3xl">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
            {nodes.map((n) => (
              <line
                key={n.id}
                x1="50" y1="50" x2={n.x} y2={n.y}
                stroke="#C9A96E"
                strokeWidth="0.25"
                strokeDasharray="1.2 1.2"
                vectorEffect="non-scaling-stroke"
                className="transition-opacity duration-700"
                opacity={on.includes(n.id) ? 0.9 : 0.12}
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-ink shadow-[0_0_60px_-5px_rgb(201_169_110/0.5)] sm:size-32">
            <span className="text-center text-[0.6rem] font-medium tracking-[0.2em] text-gold sm:text-xs">YOUR<br />HOME</span>
          </div>

          {nodes.map((n) => {
            const Icon = icons[n.id];
            const lit = on.includes(n.id);
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setFocus(n.id)}
                onMouseEnter={() => setFocus(n.id)}
                aria-label={n.label}
                aria-pressed={focus === n.id}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              >
                <span
                  className={cn(
                    "flex size-14 items-center justify-center rounded-full border backdrop-blur transition-all duration-700 sm:size-[4.5rem]",
                    lit ? "border-gold bg-gold/20 text-gold shadow-[0_0_40px_-4px_rgb(201_169_110/0.7)]" : "border-white/15 bg-white/[0.03] text-white/40",
                    focus === n.id && "ring-2 ring-gold/60 ring-offset-2 ring-offset-charcoal",
                  )}
                >
                  <Icon className="size-6 sm:size-7" strokeWidth={1.4} />
                </span>
                <span className={cn("text-xs sm:text-sm", lit ? "text-ivory" : "text-mute")}>{n.label}</span>
              </button>
            );
          })}
        </div>

        <p className="mx-auto mt-10 min-h-14 max-w-lg text-center text-ivory/80" aria-live="polite">
          <span className="font-medium text-gold">{current.label}.</span> {current.text}
        </p>
      </div>
    </section>
  );
}
