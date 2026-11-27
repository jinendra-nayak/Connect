import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Photos } from "@/lib/photos";
import { panelFeatures, sensors } from "@/data/content";
import { EnquireLink } from "@/components/shared/enquire-link";
import { ProductPhoto } from "@/components/shared/photo-slot";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

const sensorSlots = ["sensorMotion", "sensorDoor", "sensorTemp", "sensorHumidity", "sensorSecurity"] as const;

/** Slots still filled by third-party photos. Delete an entry once ConnectCom's own photo replaces it. */
const thirdParty: Partial<Record<(typeof sensorSlots)[number], string>> = {
  sensorTemp: "Reference photo: Xiaomi sensor",
  sensorHumidity: "Reference photo: Xiaomi sensor",
};

function Copy({
  category, title, text, interest, children,
}: { category: string; title: string; text: string; interest: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center">
      <p className="eyebrow">{category}</p>
      <h3 className="display mt-4 text-[1.75rem] font-medium text-ivory sm:text-4xl lg:text-[2.75rem]">{title}</h3>
      <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-mute sm:text-base">{text}</p>
      {children}
      <EnquireLink interest={interest} className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-gold">
        <span className="border-b border-gold/40 pb-0.5 transition-colors hover:border-gold">Explore Product</span>
        <ArrowUpRight className="size-4" />
      </EnquireLink>
    </div>
  );
}

export function Products({ photos }: { photos: Photos }) {
  // Only sensors with a photograph get a tile; all of them are described in the Sensors section.
  const shown = sensorSlots.map((key, i) => ({ key, title: sensors[i].title })).filter((s) => photos[s.key]);
  return (
    <section id="products" className="relative bg-charcoal/40 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Product collection"
          title="Designed to be touched. Built to disappear."
          description="Four product families that work beautifully alone and even better together."
        />

        {/* 1. Smart Glass Panels — large photograph, details beside */}
        <article className="group mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <ProductPhoto src={photos.panelMain} alt="Smart glass touch panel on a wall" sizes="(min-width:1024px) 58vw, 100vw" className="aspect-[3/2] w-full" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <ProductPhoto src={photos.switchMain} alt="Four-key smart switch panel" sizes="(min-width:1024px) 20vw, 33vw" className="aspect-[4/3]" />
              <ProductPhoto src={photos.panelDetailA} alt="Smart glass panel with gold frame" sizes="(min-width:1024px) 20vw, 33vw" className="aspect-[4/3] bg-[#ded7cb]" fit="contain" />
              <ProductPhoto src={photos.panelDetailB} alt="Smart glass panel close-up" sizes="(min-width:1024px) 20vw, 33vw" className="aspect-[4/3]" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <Copy category="01 · Panels & Switches" title="Touch Panels & Smart Switches" interest="Smart Glass Touch Panels" text="Touch-sensitive glass that puts lighting, scenes, curtains and appliances under one fingertip.">
              <ul className="mt-6 space-y-2.5 text-sm text-ivory/80">
                {panelFeatures.map((f) => (
                  <li key={f.title} className="flex items-center gap-3 border-b border-white/10 pb-2.5"><span className="size-1 rounded-full bg-gold" />{f.title}</li>
                ))}
              </ul>
            </Copy>
          </Reveal>
        </article>

        {/* 2. Smart Sensors — photo grid */}
        <article className="mt-20 sm:mt-28">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">02 · Smart Sensors</p>
                <h3 className="display mt-4 text-[1.75rem] font-medium text-ivory sm:text-4xl lg:text-[2.75rem]">Smart Sensors</h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-mute sm:text-base">Quiet sensors that notice motion, doors, temperature and humidity, so your home can respond.</p>
              </div>
              <EnquireLink interest="Smart Sensors" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-gold">
                <span className="border-b border-gold/40 pb-0.5">Explore Product</span><ArrowUpRight className="size-4" />
              </EnquireLink>
            </div>
          </Reveal>
          <ul className={cn("mt-8 grid gap-3", shown.length >= 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : shown.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-3")}>
            {shown.map(({ key, title }, i) => (
              <li key={key} className="group">
                <Reveal delay={i * 0.06}>
                  <ProductPhoto src={photos[key]} alt={title} sizes="(min-width:1024px) 33vw, 50vw" className="aspect-square" />
                  <p className="mt-3 text-sm font-medium text-ivory">{title}</p>
                  {thirdParty[key] && <p className="mt-0.5 text-xs text-mute">{thirdParty[key]}</p>}
                </Reveal>
              </li>
            ))}
          </ul>
        </article>

        {/* 3. Smart Door Locks — large photograph with close-ups */}
        <article className="group mt-20 grid gap-8 sm:mt-28 lg:grid-cols-12 lg:gap-14">
          <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-5">
            <Copy category="03 · Smart Door Locks" title="Smart Door Locks" interest="Smart Door Locks" text="Secure, convenient entry designed to sit beautifully on your door." />
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-7">
            <ProductPhoto src={photos.lockMain} alt="Smart door lock installed on a door" sizes="(min-width:1024px) 58vw, 100vw" className="aspect-[3/2] w-full" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <ProductPhoto src={photos.lockDetailA} alt="Smart lock keypad close-up" sizes="(min-width:1024px) 29vw, 50vw" className="aspect-[16/9]" />
              <ProductPhoto src={photos.lockDetailB} alt="Smart lock handle and finish" sizes="(min-width:1024px) 29vw, 50vw" className="aspect-[16/9]" />
            </div>
          </Reveal>
        </article>

        {/* 4. Smart Home Control — installation photography */}
        <article className="group mt-20 grid gap-8 sm:mt-28 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            {photos.controlMain ? (
              <ProductPhoto src={photos.controlMain} alt="Smart home control installed" className="aspect-[3/2] w-full" />
            ) : (
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image src="/images/living-3.jpg" alt="A modern connected living space" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03] motion-reduce:transition-none" />
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <Copy category="04 · Smart Home Control" title="Smart Home Control" interest="Intelligent Home Control" text="One intelligent layer that connects every product into a single, effortless experience." />
          </Reveal>
        </article>
      </div>
    </section>
  );
}
