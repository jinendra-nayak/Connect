"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { experiences } from "@/data/content";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";

/** Interactive image accordion: hover/focus/tap a panel to expand it. */
export function Experience() {
  const [active, setActive] = useState(0);
  return (
    <section id="solutions" className="relative bg-ink py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="The smart living experience"
          title="More Than Automation. A Better Way to Live."
          description="Technology should disappear into the home. What remains is comfort, calm and control."
        />

        <Reveal className="mt-16" y={40}>
          <ul className="flex h-[78svh] min-h-[560px] flex-col gap-3 md:h-[34rem] md:flex-row">
            {experiences.map((e, i) => {
              const on = i === active;
              return (
                <li
                  key={e.id}
                  className={cn(
                    "group relative min-h-0 min-w-0 overflow-hidden rounded-3xl border border-white/10 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    on ? "grow-[5]" : "grow-[1]",
                    "basis-0",
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="absolute inset-0 text-left"
                  >
                    <Image
                      src={e.image}
                      alt=""
                      fill
                      sizes="(min-width:768px) 60vw, 100vw"
                      className={cn("object-cover transition-transform duration-[1200ms]", on ? "scale-100" : "scale-110")}
                    />
                    <span className={cn("absolute inset-0 transition-opacity duration-500", on ? "bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" : "bg-ink/55")} />
                    <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-8">
                      <span className="eyebrow">0{i + 1}</span>
                      <span className={cn("display font-medium text-ivory transition-all duration-500", on ? "text-2xl sm:text-3xl" : "text-lg md:[writing-mode:vertical-rl] md:rotate-180")}>
                        {e.title}
                      </span>
                      <span className={cn("max-w-md text-sm leading-relaxed text-ivory/75 transition-all duration-500", on ? "max-h-24 opacity-100 delay-200" : "max-h-0 opacity-0")}>
                        {e.text}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
