"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Mic, Smartphone, Wifi } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { EnquireLink } from "@/components/shared/enquire-link";
import { Reveal } from "@/components/shared/motion";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/use-media-query";
import { site } from "@/lib/site";

const commands = ["Turn on the living room lights", "Close the bedroom curtains", "Good night"];

const ways = [
  { icon: Mic, title: "Speak to your home", text: "Use a compatible voice assistant for lights, curtains and scenes.", image: "/images/tech/wall-panel.jpg", alt: "A wall touch panel showing room, scene and curtain controls" },
  { icon: Smartphone, title: "Control from your phone", text: "Open curtains or change the light from a mobile app, from the sofa.", image: "/images/tech/app-control.jpg", alt: "A hand using a phone app to control curtains in a living room" },
  { icon: Wifi, title: "Connected over Wi-Fi", text: "Your devices work together through your home network.", image: "/images/tech/connected-home.jpg", alt: "Illustration of a house with its connected devices linked over Wi-Fi" },
];

export function VoiceApp() {
  const stage = useRef<HTMLDivElement>(null);
  const seen = useInView(stage, { once: true, margin: "0px 0px 80px 0px" });
  // The 3D runtime is heavy: desktop with a mouse only, never for reduced motion or data saver.
  const capable = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reduce = useReducedMotionSafe();
  const saveData = typeof navigator !== "undefined" && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const show3d = seen && capable && !reduce && !saveData;

  const still = (
    <Image src="/images/tech/app-control.jpg" alt="A hand using a phone app to control curtains in a living room" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[80%_50%]" />
  );

  return (
    <section id="voice-app" aria-labelledby="voice-app-title" className="relative bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Card className="relative w-full overflow-hidden rounded-[2rem] border-white/10 bg-black/[0.96]">
          <Spotlight size={520} />
          <div className="flex flex-col lg:min-h-[36rem] lg:flex-row">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-7 sm:p-12">
              <p className="eyebrow">Voice assistant &amp; mobile app</p>
              <h2 id="voice-app-title" className="display mt-5 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text pb-1 text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium text-transparent">
                Your home listens. Your phone commands.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-neutral-300">
                Intelligent living over Wi-Fi: speak a command or tap the app, and your lights, curtains and scenes respond as one connected home.
              </p>
              <ul aria-label="Example voice commands" className="mt-7 flex flex-col items-start gap-2.5">
                {commands.map((c) => (
                  <li key={c} className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] py-2 pl-3 pr-4 text-sm text-ivory">
                    <Mic aria-hidden className="size-4 shrink-0 text-gold" />“{c}”
                  </li>
                ))}
              </ul>
              <EnquireLink interest="Voice Assistant Integration" className="mt-8 inline-flex min-h-12 w-fit items-center rounded-full bg-gradient-to-b from-gold-soft to-gold px-7 text-sm font-medium text-ink">
                Plan my voice &amp; app control
              </EnquireLink>
            </div>

            <div ref={stage} data-robot className="relative h-72 flex-1 sm:h-96 lg:h-auto">
              {show3d && site.splineScene ? (
                <SplineScene scene={site.splineScene} label="Animated 3D robot, decorative" fallback={still} className="absolute inset-0" />
              ) : (
                still
              )}
            </div>
          </div>
        </Card>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {ways.map(({ icon: Icon, title, text, image, alt }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="glass group h-full overflow-hidden rounded-3xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={image} alt={alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] motion-reduce:transition-none" />
                  </div>
                  <div className="p-6">
                    <h3 className="flex items-center gap-3 font-medium text-ivory"><Icon aria-hidden className="size-5 text-gold" strokeWidth={1.5} />{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute">{text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
