import { DoorOpen, Droplets, Eye, ShieldCheck, Thermometer } from "lucide-react";
import { sensors } from "@/data/content";
import { DeviceArt } from "@/components/shared/device-art";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";

const icons = { motion: Eye, door: DoorOpen, temp: Thermometer, humidity: Droplets, security: ShieldCheck } as const;

export function Sensors() {
  return (
    <section id="sensors" className="relative bg-charcoal/40 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeader
            eyebrow="Intelligent sensors"
            title="A home that notices, so you don't have to."
            description="Sensors quietly read what is happening around the house and let it respond, turning small everyday moments into effortless automation."
          />
          <Reveal className="hidden justify-center lg:flex">
            <div className="relative">
              <div aria-hidden className="absolute -inset-10 animate-pulse rounded-full border border-gold/20 motion-reduce:animate-none" />
              <div aria-hidden className="absolute -inset-20 rounded-full border border-gold/10" />
              <DeviceArt variant="sensor" className="sm:w-48" />
            </div>
          </Reveal>
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
      </div>
    </section>
  );
}
