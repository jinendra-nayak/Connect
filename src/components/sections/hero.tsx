import { ArrowRight } from "lucide-react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const images = [
  "/images/stream/s1.jpg", "/images/stream/s8.jpg", "/images/stream/s2.jpg", "/images/stream/s4.jpg",
  "/images/stream/s5.jpg", "/images/stream/s9.jpg", "/images/stream/s3.jpg", "/images/stream/s6.jpg",
  "/images/stream/s10.jpg", "/images/stream/s7.jpg",
].map((src) => ({ src }));

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-ink">
      {/* On phones the corridor is drawn wider than the screen so the photography stays large. */}
      <ImageStreamHero
        images={images}
        cards={9}
        speed={22}
        axis={58}
        className="absolute inset-y-0 left-1/2 w-[320%] -translate-x-1/2 sm:w-[150%] lg:w-full"
      />
      <div className="relative">
        {/* legibility veil: keeps the corridor cinematic but the copy readable */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(8_10_13/0.78)_0%,rgb(8_10_13/0.55)_38%,rgb(8_10_13/0.2)_75%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-8">
          <p className="eyebrow animate-[fadeUp_1s_0.1s_both]">ConnectCom · Premium Smart Home Automation</p>
          <h1
            id="hero-title"
            className="display mt-7 animate-[fadeUp_1s_0.25s_both] text-balance text-[clamp(2.9rem,7.6vw,6.4rem)] font-medium text-ivory"
          >
            Intelligent Living, <span className="text-gold">Beautifully Connected.</span>
          </h1>
          <p className="mt-7 max-w-2xl animate-[fadeUp_1s_0.4s_both] text-pretty text-base leading-relaxed text-ivory/75 sm:text-lg">
            From elegant touch panels to intelligent sensors and effortless voice control, ConnectCom brings your home together through beautifully integrated automation.
          </p>
          <div className="mt-10 flex w-full animate-[fadeUp_1s_0.55s_both] flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <LiquidButton href="#solutions" variant="gold" className="w-full sm:w-auto">
              Discover Smart Living <ArrowRight className="size-4" />
            </LiquidButton>
            <LiquidButton href="#consultation" className="w-full sm:w-auto">
              Book a Consultation
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
