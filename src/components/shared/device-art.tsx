import { cn } from "@/lib/utils";
import { Lightbulb, Blinds, Fan, Layers, Power, Sun } from "lucide-react";

/**
 * Original ConnectCom device illustrations (CSS only, no third-party brand imagery).
 * These stand in for product photography — swap for real shots in src/data/products.ts.
 */
export type DeviceVariant = "panel" | "sensor" | "lock" | "hub";

export function DeviceArt({ variant, className }: { variant: DeviceVariant; className?: string }) {
  if (variant === "panel") return <Panel className={className} />;
  if (variant === "sensor") return <Sensor className={className} />;
  if (variant === "lock") return <Lock className={className} />;
  return <Hub className={className} />;
}

const bezel =
  "relative rounded-[1.6rem] border border-white/20 bg-gradient-to-br from-[#2b323c] via-[#12151a] to-[#0a0c10] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.25)]";

export function Panel({ className, active = 0 }: { className?: string; active?: number }) {
  const items = [Lightbulb, Layers, Blinds, Fan, Power, Sun];
  return (
    <div className={cn(bezel, "aspect-square w-40 p-2.5 sm:w-48", className)} aria-hidden>
      <div className="relative grid h-full grid-cols-3 gap-2 overflow-hidden rounded-[1.1rem] bg-[#06080b] p-2.5">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent" />
        {items.map((Icon, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-center rounded-xl border transition-colors duration-500",
              i === active
                ? "border-gold/60 bg-gold/15 text-gold shadow-[0_0_24px_-4px_rgb(201_169_110/0.7)]"
                : "border-white/10 bg-white/[0.03] text-white/45",
            )}
          >
            <Icon className="size-[38%]" strokeWidth={1.4} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Sensor({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-32 sm:w-40", className)} aria-hidden>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f2efe8] via-[#d9d5cb] to-[#a9a59b] shadow-[0_28px_60px_-18px_rgba(0,0,0,0.85),inset_0_2px_3px_rgba(255,255,255,0.9)]" />
      <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-[#1b2027] to-[#05070a] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-[38%] rounded-full bg-gold/80 shadow-[0_0_22px_4px_rgb(201_169_110/0.55)]" />
    </div>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <div className={cn(bezel, "aspect-[2/5] w-24 rounded-[1.3rem] p-2.5 sm:w-28", className)} aria-hidden>
      <div className="relative flex h-full flex-col items-center justify-between rounded-[0.9rem] bg-[#06080b] px-2 py-4">
        <div className="pointer-events-none absolute inset-0 rounded-[0.9rem] bg-gradient-to-br from-white/[0.08] to-transparent" />
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="size-2.5 rounded-full border border-white/20 bg-white/[0.05]" />
          ))}
        </div>
        <span className="size-3 rounded-full bg-gold shadow-[0_0_16px_3px_rgb(201_169_110/0.6)]" />
        <span className="h-16 w-3.5 rounded-full bg-gradient-to-b from-[#d9d5cb] to-[#8f8b82] shadow-[0_6px_14px_rgba(0,0,0,0.7)]" />
      </div>
    </div>
  );
}

function Hub({ className }: { className?: string }) {
  return (
    <div className={cn(bezel, "aspect-[4/3] w-48 rounded-[1.4rem] p-3 sm:w-56", className)} aria-hidden>
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1rem] bg-[#06080b] p-3">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
        <div className="flex items-center justify-between text-[0.6rem] tracking-[0.25em] text-gold">
          <span>CONNECTCOM</span>
          <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgb(201_169_110/0.7)]" />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={cn("h-6 rounded-md border", i % 3 === 0 ? "border-gold/50 bg-gold/15" : "border-white/10 bg-white/[0.04]")} />
          ))}
        </div>
      </div>
    </div>
  );
}
