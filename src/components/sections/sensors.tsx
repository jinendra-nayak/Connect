import { DoorOpen, Droplets, Eye, ShieldCheck, Thermometer } from "lucide-react";
import Image from "next/image";
import { sensors } from "@/data/content";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";

const icons = { motion: Eye, door: DoorOpen, temp: Thermometer, humidity: Droplets, security: ShieldCheck } as const;

export function Sensors() {
  return (
    <section id="sensors" className="relative bg-charcoal/40 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div>
          <SectionHeader
            eyebrow="Intelligent sensors"
            title="A home that notices, so you don't have to."
            description="Sensors quietly read what is happening around the house and let it respond, turning small everyday moments into effortless automation."
          />
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {sensors.map((s, i) => {
            const Icon = icons[s.key];
            return (
              <li key={s.key} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="glass group flex h-full flex-col rounded-3xl p-7 transition-colors duration-500 hover:border-gold/40 sm:p-8">
                    <span className="flex size-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="display mt-6 text-xl font-medium text-ivory">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute">{s.text}</p>
                    <p className="mt-auto border-t border-white/10 pt-5 text-sm text-gold-soft/90">
                      <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.25em] text-mute">For example</span>
                      {s.example}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[21/9]">
            <Image src="/images/luxury/skyline-residence.jpg" alt="A luxury living space where lighting and curtains respond quietly in the background" fill sizes="(min-width:1280px) 1216px, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
            <p className="absolute bottom-5 left-5 max-w-xs font-display text-2xl leading-snug text-ivory sm:bottom-9 sm:left-9 sm:max-w-md sm:text-4xl">Lighting and curtains that follow the rhythm of the day.</p>
            <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-mute backdrop-blur">Lifestyle photography</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
