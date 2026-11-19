"use client";

/**
 * Liquid Glass Button — adapted from designali-in's component on 21st.dev
 * (https://21st.dev/@designali-in/components/liquid-glass-button).
 * Keeps the SVG-displacement "liquid" backdrop and layered rim light. Changes:
 * renders an <a> when `href` is given (no Radix Slot dependency), gold/ivory
 * tones for the ConnectCom dark theme, and one shared SVG filter definition.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "glass" | "gold";
type Size = "md" | "lg";

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<"a">, "href" | "children" | "className">)
  | ({ href?: undefined } & Omit<React.ComponentProps<"button">, "children" | "className">)
);

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[0.95rem]",
};
const variants: Record<Variant, string> = {
  glass: "text-ivory",
  gold: "text-ink bg-gradient-to-b from-[#e3cfa3] to-[#c9a96e] shadow-[0_10px_40px_-10px_rgb(201_169_110/0.6)]",
};

export function LiquidButton({ variant = "glass", size = "lg", className, children, ...rest }: Props) {
  const cls = cn(
    "group relative isolate inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide",
    "transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100",
    sizes[size],
    variants[variant],
    className,
  );

  const inner = (
    <>
      {variant === "glass" && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.25),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.55),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.35),inset_0_0_6px_6px_rgba(255,255,255,0.07),0_0_14px_rgba(201,169,110,0.15)]"
          />
          <span
            aria-hidden
            className="absolute inset-0 -z-20 overflow-hidden rounded-full bg-white/[0.04]"
            style={{ backdropFilter: 'url("#connectcom-liquid-glass") blur(2px)' }}
          />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...a } = rest as React.ComponentProps<"a"> & { href: string };
    return (
      <a href={href} className={cls} {...a}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as React.ComponentProps<"button">)}>
      {inner}
    </button>
  );
}

/** Mount once (layout). Referenced by every glass button. */
export function LiquidGlassFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <filter id="connectcom-liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="40" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  );
}
