import { cn } from "@/lib/utils";
import { Reveal, RevealHeading } from "./motion";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal y={12}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <RevealHeading text={title} className="display mt-5 text-[clamp(2rem,4.2vw,3.6rem)] font-medium text-ivory" />
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-6 text-base leading-relaxed text-mute sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
