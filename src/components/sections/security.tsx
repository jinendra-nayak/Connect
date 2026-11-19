import Image from "next/image";
import { KeyRound, Link2, Lock, ShieldCheck } from "lucide-react";
import { security } from "@/data/content";
import { SectionHeader } from "@/components/shared/section";
import { EnquireLink } from "@/components/shared/enquire-link";
import { Reveal } from "@/components/shared/motion";

const icons = [ShieldCheck, KeyRound, Lock, Link2];

export function Security() {
  return (
    <section id="security" className="relative isolate overflow-hidden bg-ink py-20 sm:py-32">
      <Image src="/images/night-15.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Smart security"
            title="Security that feels like peace of mind."
            description="Smart door locks bring secure, convenient entry together with the rest of your connected home."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {security.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.title}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <div className="glass h-full rounded-2xl p-6">
                      <Icon className="size-6 text-gold" strokeWidth={1.4} />
                      <h3 className="mt-4 font-medium text-ivory">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-mute">{s.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <Reveal delay={0.2}>
            <EnquireLink interest="Smart Door Locks" className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">
              Enquire about Smart Door Locks
            </EnquireLink>
          </Reveal>
        </div>

        <Reveal y={50}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10">
            <Image src="/images/hall-16.jpg" alt="A modern home entrance" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-mute backdrop-blur">Lifestyle photography</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
