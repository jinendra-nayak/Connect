"use client";

/**
 * Spotlight — adapted from ibelick's component, used in the 21st.dev "Spline Scene"
 * demo (https://21st.dev/@serafimcloud/components/splite). Changes:
 * - listeners are named, so every one of them is actually removed on cleanup
 * - never writes styles to the parent: the parent must be `relative overflow-hidden`
 * - position is driven by motion values (transform only), so no React re-renders
 * - off for touch pointers and when the visitor prefers reduced motion
 */
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-media-query";

const SPRING: SpringOptions = { bounce: 0, duration: 450 };

export function Spotlight({
  className,
  size = 420,
  springOptions = SPRING,
}: {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const x = useSpring(0, springOptions);
  const y = useSpring(0, springOptions);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent || reduce) return;

    const place = (e: PointerEvent, jump: boolean) => {
      if (e.pointerType === "touch") return;
      const r = parent.getBoundingClientRect();
      const nx = e.clientX - r.left - size / 2;
      const ny = e.clientY - r.top - size / 2;
      if (jump) {
        x.jump(nx);
        y.jump(ny);
      } else {
        x.set(nx);
        y.set(ny);
      }
      opacity.set(1);
    };
    const onEnter = (e: PointerEvent) => place(e, true);
    const onMove = (e: PointerEvent) => place(e, opacity.get() === 0);
    const onLeave = () => opacity.set(0);

    parent.addEventListener("pointerenter", onEnter);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      opacity.set(0);
    };
  }, [reduce, size, x, y, opacity]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      data-spotlight
      className={cn(
        "pointer-events-none absolute left-0 top-0 rounded-full mix-blend-screen transition-opacity duration-300",
        "bg-[radial-gradient(circle_at_center,rgb(255_226_170/0.28),rgb(201_169_110/0.1)_40%,transparent_70%)]",
        className,
      )}
      style={{ width: size, height: size, x, y, opacity }}
    />
  );
}
