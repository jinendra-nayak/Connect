import Image from "next/image";
import { cn } from "@/lib/utils";

/** A product photo, or nothing at all: no placeholder boxes on the public site. */
export function ProductPhoto({
  src,
  alt,
  className,
  sizes = "(min-width:1024px) 50vw, 100vw",
  fit = "cover",
  priority = false,
}: {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  if (!src) return null;
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none", fit === "cover" ? "object-cover" : "object-contain")}
      />
    </div>
  );
}
