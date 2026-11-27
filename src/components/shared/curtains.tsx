"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-media-query";

/** Seconds for a full open ↔ closed run. */
const TRAVEL_S = 2.8;

/**
 * A value (0–100) that travels to `target` like a motor: duration is proportional
 * to distance, and a new target takes over from wherever the value currently is.
 */
export function useMotorPosition(target: number, travelSeconds = TRAVEL_S) {
  const reduce = useReducedMotionSafe();
  const value = useMotionValue(target);

  useEffect(() => {
    const distance = Math.abs(target - value.get());
    if (reduce || distance === 0) {
      value.jump(target);
      return;
    }
    const run = animate(value, target, {
      duration: Math.max(0.25, (distance / 100) * travelSeconds),
      ease: [0.4, 0, 0.3, 1],
    });
    return () => run.stop();
  }, [target, reduce, travelSeconds, value]);

  return value;
}

const fabric =
  "absolute inset-y-0 w-[50.6%] will-change-transform bg-[repeating-linear-gradient(90deg,#1d1912_0,#4a3f2c_3.5%,#6a5a3d_5%,#3a3122_8%,#1d1912_11%)]";

/**
 * A pair of drapes filling the parent. `position`: 0 = fully closed (panels meet),
 * 100 = fully open (gathered at the sides). Transform-only, so it stays smooth.
 */
export function Curtains({ position }: { position: MotionValue<number> }) {
  const scaleX = useTransform(position, [0, 100], [1, 0.16]);
  return (
    <div aria-hidden data-curtains className="pointer-events-none absolute inset-0">
      <motion.div data-curtain="left" style={{ scaleX }} className={`${fabric} left-0 origin-left shadow-[6px_0_18px_rgb(0_0_0/0.5)]`} />
      <motion.div data-curtain="right" style={{ scaleX }} className={`${fabric} right-0 origin-right shadow-[-6px_0_18px_rgb(0_0_0/0.5)]`} />
    </div>
  );
}

const describe = (now: number, target: number) => {
  if (Math.abs(now - target) >= 0.5) return `${target > now ? "Opening" : "Closing"} ${Math.round(now)}%`;
  if (target <= 0) return "Closed";
  if (target >= 100) return "Fully open";
  return `${Math.round(target)}% open`;
};

/** Live text readout. Re-renders only itself, and only when the text changes. */
export function MotorStatus({ position, target }: { position: MotionValue<number>; target: number }) {
  const [text, setText] = useState(() => describe(target, target));
  const [seen, setSeen] = useState(target);
  if (seen !== target) {
    setSeen(target);
    setText(describe(position.get(), target));
  }
  useMotionValueEvent(position, "change", (v) => setText(describe(v, target)));
  return <>{text}</>;
}
