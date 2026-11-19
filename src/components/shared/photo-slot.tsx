import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Real product photo when available; otherwise an honest, labelled placeholder.
 * Never renders an imagined device.
 */
export function ProductPhoto({
  src,
  alt,
  label,
  className,
  sizes = "(min-width:1024px) 50vw, 100vw",
  fit = "cover",
  priority = false,
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none", fit === "cover" ? "object-cover" : "object-contain")}
        />
      ) : (
        <div role="img" aria-label={`${label}: product photo to be added`} className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.025)_0_12px,transparent_12px_24px)] p-4 text-center">
          <ImageIcon className="size-6 text-gold/70" strokeWidth={1.3} />
          <span className="text-xs font-medium text-ivory/80">{label}</span>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mute">Product photo to be added</span>
        </div>
      )}
    </div>
  );
}
