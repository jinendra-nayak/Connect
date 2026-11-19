import { Cpu, Gem, Sparkles, Wrench, Home, MousePointerClick } from "lucide-react";
import { why } from "@/data/content";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";

const icons = [Cpu, Gem, Sparkles, MousePointerClick, Wrench, Home];

export function Why() {
  return (
    <section id="about" className="relative bg-ink py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Why ConnectCom"
          title="Smart living, considered in every detail."
          description="ConnectCom is a smart home automation brand focused on beautifully designed products and an effortless experience."
        />
        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w, i) => {
            const Icon = icons[i];
            return (
              <li key={w.title} className="bg-ink">
                <Reveal delay={i * 0.05} className="h-full">
                  <div className="group h-full p-8 transition-colors duration-500 hover:bg-charcoal sm:p-10">
                    <Icon className="size-7 text-gold transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.3} />
                    <h3 className="display mt-8 text-xl font-medium text-ivory">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute">{w.text}</p>
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
