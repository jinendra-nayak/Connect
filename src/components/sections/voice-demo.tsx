"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { voiceDemos } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/motion";

type Demo = (typeof voiceDemos)[number];
const STEP_MS = 1500;

/** One playthrough. Remounted (via `key`) to replay, so state always starts at 0. */
function Stage({ demo, play }: { demo: Demo; play: boolean }) {
  const reduce = useReducedMotion();
  const total = demo.steps.length;
  const [step, setStep] = useState(0); // 0 = just spoken, n = n-th response shown

  useEffect(() => {
    if (!play || reduce) return;
    const timers = Array.from({ length: total }, (_, i) => setTimeout(() => setStep(i + 1), 900 + i * STEP_MS));
    return () => timers.forEach(clearTimeout);
  }, [play, reduce, total]);

  const s = reduce ? total : step;
  const night = demo.id === "night";
  // night: lights dim (step 1) -> curtains close (step 2) -> night scene (step 3)
  // living: base is dim; lights activate at step 1; environment responds at step 2
  const veil = night ? (s >= 1 ? 0.6 : 0) : s >= 1 ? 0 : 0.62;
  const curtain = night && s >= 2 ? "27%" : "0%";
  const glow = !night && s >= 1;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-charcoal sm:aspect-[16/10] lg:col-span-3">
        <Image src={demo.image} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
        <motion.div aria-hidden className="absolute inset-0 bg-[#04060c]" initial={false} animate={{ opacity: veil }} transition={{ duration: 1.1 }} />
        {glow && (
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgb(255_200_120/0.35),transparent_65%)] mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        )}
        {night && (
          <>
            <motion.div aria-hidden className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#1b1812,#2c2619_70%,#3a3322)] shadow-[8px_0_30px_rgb(0_0_0/0.5)]" initial={false} animate={{ width: curtain }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
            <motion.div aria-hidden className="absolute inset-y-0 right-0 bg-[linear-gradient(270deg,#1b1812,#2c2619_70%,#3a3322)] shadow-[-8px_0_30px_rgb(0_0_0/0.5)]" initial={false} animate={{ width: curtain }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
          </>
        )}

        {/* the spoken phrase */}
        <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
          <div className="flex items-end gap-3">
            <span aria-hidden className="mb-1 flex h-9 items-end gap-[3px] rounded-full bg-ink/70 px-3 py-2 backdrop-blur">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="w-[3px] origin-bottom rounded-full bg-gold motion-safe:animate-[voiceBar_1.1s_ease-in-out_infinite]" style={{ height: 14, animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
            <p className="rounded-2xl rounded-bl-sm bg-ink/80 px-4 py-3 font-display text-lg italic text-ivory backdrop-blur sm:text-2xl">
              “{demo.phrase}”
            </p>
          </div>
        </div>
      </div>

      <ol className="flex flex-col justify-center gap-3 lg:col-span-2">
        {demo.steps.map((label, i) => {
          const done = s > i;
          return (
            <li key={label} className={cn("glass flex items-center gap-4 rounded-2xl p-4 transition-all duration-700", done ? "border-gold/40" : "opacity-50")}>
              <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-700", done ? "border-gold bg-gold text-ink" : "border-white/20 text-mute")}>
                {done ? <Check className="size-4" strokeWidth={2.4} /> : <span className="text-xs">{i + 1}</span>}
              </span>
              <span className="text-[0.95rem] text-ivory">{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function VoiceDemo() {
  const [id, setId] = useState<string>(voiceDemos[0].id);
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const demo = voiceDemos.find((d) => d.id === id)!;

  return (
    <div ref={ref} className="mt-20 sm:mt-28">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">How it feels</p>
            <h3 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] font-medium text-ivory">Say it. The home answers.</h3>
          </div>
          <div role="group" aria-label="Choose a voice example" className="flex flex-wrap gap-2.5">
            {voiceDemos.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={id === d.id}
                onClick={() => { setId(d.id); setRun((n) => n + 1); }}
                className={cn("min-h-11 rounded-full border px-5 text-sm transition-colors", id === d.id ? "border-gold bg-gold text-ink" : "border-white/15 text-ivory/80 hover:border-gold/50")}
              >
                {d.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setRun((n) => n + 1)}
              aria-label="Replay animation"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-colors hover:border-gold/50"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </div>
      </Reveal>

      <div className="mt-8" aria-live="polite">
        <Stage key={`${demo.id}-${run}`} demo={demo} play={inView} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-mute">
        Illustration only. This animation shows the idea of a configured voice scene; it is not a live voice integration and does not control any device.
      </p>
    </div>
  );
}
