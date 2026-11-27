import Image from "next/image";
import { AudioLines, ShieldQuestion } from "lucide-react";
import type { Photos } from "@/lib/photos";
import { voiceAssistants } from "@/data/content";
import { ProductPhoto } from "@/components/shared/photo-slot";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";
import { EnquireLink } from "@/components/shared/enquire-link";
import { VoiceDemo } from "./voice-demo";

/**
 * Voice section. Product slots (Echo, Nest) stay honest placeholders until licensed
 * photography is dropped in; nothing here is a live integration.
 */
export function VoiceControl({ photos }: { photos: Photos }) {
  return (
    <section id="voice" aria-labelledby="voice-title" className="relative isolate overflow-hidden bg-ink py-20 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_50%_0%,rgb(201_169_110/0.12),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Intelligent voice control"
          title="Your Voice. Your Home. Your Control."
          description="Experience effortless living with intelligent voice control and seamless smart-home automation."
        />
        <span id="voice-title" className="sr-only">Your Voice. Your Home. Your Control.</span>

        {/* Composition: residence + voice devices + ConnectCom panel */}
        <div className="mt-14 grid gap-3 lg:grid-cols-12 lg:gap-4">
          <Reveal className="lg:col-span-8">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 sm:aspect-[16/9]">
              <Image
                src="/images/luxury/villa-evening.jpg"
                alt="A luxury residence at dusk with a wall-mounted control screen"
                fill
                priority={false}
                sizes="(min-width:1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              {/* pin on the wall panel */}
              <div className="absolute left-[18.5%] top-[47%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex size-7 items-center justify-center">
                  <span aria-hidden className="absolute inline-flex size-full animate-ping rounded-full bg-gold/40 motion-reduce:animate-none" />
                  <span className="relative size-3 rounded-full border-2 border-ink bg-gold" />
                </span>
                <span className="absolute left-full top-1/2 ml-2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-ink/75 px-3 py-1 text-[0.7rem] tracking-wide text-ivory backdrop-blur sm:block">
                  Wall control
                </span>
              </div>
              <p className="absolute bottom-4 left-5 max-w-[16rem] text-sm leading-snug text-ivory/90 sm:bottom-6 sm:left-8 sm:max-w-sm sm:text-base">
                Touch, voice and automation, one calm system.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-3 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-3 lg:gap-4">
            <Reveal delay={0.05}>
              <ProductPhoto src={photos.echoDevice} alt="Amazon Echo smart speaker" sizes="(min-width:1024px) 33vw, 33vw" className="aspect-square bg-[#e6e0d4] lg:aspect-auto lg:h-full" fit="contain" />
            </Reveal>
            <Reveal delay={0.1}>
              <ProductPhoto src={photos.nestSpeaker} alt="Google Nest smart speaker" sizes="(min-width:1024px) 33vw, 33vw" className="aspect-square bg-[#e6e0d4] lg:aspect-auto lg:h-full" fit="contain" />
            </Reveal>
            <Reveal delay={0.15}>
              <ProductPhoto src={photos.panelDetailB} alt="ConnectCom smart glass touch panel installed on a wall" sizes="(min-width:1024px) 33vw, 33vw" className="aspect-square lg:aspect-auto lg:h-full" />
            </Reveal>
          </div>
        </div>

        {/* Assistant cards */}
        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {voiceAssistants.map((a, i) => (
            <li key={a.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="glass flex h-full flex-col rounded-3xl p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <AudioLines className="size-5" strokeWidth={1.5} />
                    </span>
                    <span
                      className={
                        a.verified
                          ? "rounded-full border border-gold/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-gold"
                          : "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-mute"
                      }
                    >
                      {!a.verified && <ShieldQuestion className="size-3.5" strokeWidth={1.6} />}
                      {a.verified ? "Verified" : "Compatibility to be confirmed"}
                    </span>
                  </div>
                  <p className="eyebrow mt-7">{a.brand}</p>
                  <h3 className="display mt-3 text-[1.65rem] font-medium leading-tight text-ivory sm:text-[1.9rem]">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{a.text}</p>
                  {a.example && (
                    <p className="mt-auto border-t border-white/10 pt-5 font-display text-lg italic text-gold-soft/95">
                      <span className="mb-1.5 block font-sans text-[0.65rem] not-italic uppercase tracking-[0.25em] text-mute">Example</span>
                      “{a.example}”
                    </p>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <VoiceDemo />

        <Reveal className="mt-12 flex justify-center">
          <EnquireLink
            interest="Voice Assistant Integration"
            className="inline-flex min-h-12 items-center rounded-full border border-gold/40 px-7 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Ask about voice integration
          </EnquireLink>
        </Reveal>
      </div>
    </section>
  );
}
