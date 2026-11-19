import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/content";
import { cn } from "@/lib/utils";
import { DeviceArt } from "@/components/shared/device-art";
import { EnquireLink } from "@/components/shared/enquire-link";
import { SectionHeader } from "@/components/shared/section";
import { Reveal } from "@/components/shared/motion";

export function Products() {
  return (
    <section id="products" className="relative bg-charcoal/40 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Product collection"
          title="Designed to be touched. Built to disappear."
          description="Four product families that work beautifully alone and even better together."
        />

        <ul className="mt-16 grid auto-rows-[minmax(20rem,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(18rem,auto)]">
          {products.map((p, i) => (
            <li key={p.id} className={cn("min-w-0", p.span)}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group relative flex h-full min-h-[20rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover opacity-45 transition-all duration-[1400ms] ease-out group-hover:scale-[1.06] group-hover:opacity-60 motion-reduce:transition-none"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />

                  <div className="relative flex flex-1 items-center justify-center p-8 transition-transform duration-700 group-hover:-translate-y-2 motion-reduce:transition-none">
                    {p.photo ? (
                      <Image src={p.photo} alt={p.title} width={420} height={420} className="max-h-56 w-auto object-contain" />
                    ) : (
                      <DeviceArt variant={p.variant} />
                    )}
                  </div>

                  <div className="relative p-7 pt-0 sm:p-9 sm:pt-0">
                    <h3 className="display text-2xl font-medium text-ivory sm:text-3xl">{p.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/70">{p.description}</p>
                    <EnquireLink
                      interest={p.interest}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold after:absolute after:inset-0 after:content-['']"
                    >
                      <span className="border-b border-gold/40 pb-0.5 transition-colors group-hover:border-gold">Explore Product</span>
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </EnquireLink>
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
