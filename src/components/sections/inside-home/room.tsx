"use client";

/**
 * A stylised living room built from CSS 3D planes: no WebGL, no images, a few KB.
 * It is an illustration of home automation, deliberately generic, and does not
 * depict a ConnectCom device. Sizes are in `cqw` against a 4:3 stage.
 */
import { memo, useEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Curtains } from "@/components/shared/curtains";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-media-query";

export type TimeOfDay = "day" | "dusk" | "night";

const D = 46; // room depth

type BoxProps = {
  x: number; w: number; h: number; d: number;
  /** distance of the front face into the room */
  z: number;
  /** height of the underside above the floor */
  lift?: number;
  front: string; top: string; side: string;
  radius?: number;
};

function Box({ x, w, h, d, z, lift = 0, front, top, side, radius = 0.8 }: BoxProps) {
  return (
    <div className="absolute [transform-style:preserve-3d]" style={{ left: `${x}cqw`, bottom: `${lift}cqw`, width: `${w}cqw`, height: `${h}cqw`, transform: `translateZ(${-z}cqw)` }}>
      <div className="absolute inset-x-0 top-0 origin-top" style={{ height: `${d}cqw`, transform: "rotateX(-90deg)", background: top }} />
      <div className="absolute inset-y-0 left-0 origin-left" style={{ width: `${d}cqw`, transform: "rotateY(90deg)", background: side }} />
      <div className="absolute inset-y-0 right-0 origin-right" style={{ width: `${d}cqw`, transform: "rotateY(-90deg)", background: side }} />
      <div className="absolute inset-0" style={{ background: front, borderRadius: `${radius}cqw` }} />
    </div>
  );
}

const sky: Record<TimeOfDay, string> = {
  day: "linear-gradient(#6fa8dc,#cfe6f5 65%,#f3e7cf)",
  dusk: "linear-gradient(#1d2a4d,#7a4f6b 55%,#f0a45d)",
  night: "linear-gradient(#03050d,#0b1530 65%,#1b2644)",
};

const SKYLINE = "polygon(0 100%,0 62%,6% 62%,6% 45%,11% 45%,11% 70%,17% 70%,17% 30%,21% 30%,21% 22%,23% 22%,23% 30%,26% 30%,26% 64%,34% 64%,34% 50%,41% 50%,41% 74%,49% 74%,49% 38%,55% 38%,55% 66%,62% 66%,62% 12%,64% 4%,66% 12%,66% 66%,73% 66%,73% 48%,80% 48%,80% 72%,86% 72%,86% 40%,93% 40%,93% 58%,100% 58%,100% 100%)";

const lamps = "radial-gradient(ellipse at 50% 0%,rgb(255 205 130/0.55),rgb(255 190 110/0.12) 45%,transparent 72%)";

export type RoomProps = {
  /** 0 closed → 100 open */
  curtain: MotionValue<number>;
  /** 0 closed → 100 open */
  sash: MotionValue<number>;
  /** interior light zones, each 0 off → 100 full */
  cove: MotionValue<number>;
  lamp: MotionValue<number>;
  wash: MotionValue<number>;
  time: TimeOfDay;
};

export const Room = memo(function Room({ curtain, sash, cove, lamp, wash, time }: RoomProps) {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  const coveGlow = useTransform(cove, [0, 100], [0, 1]);
  const lampGlow = useTransform(lamp, [0, 100], [0, 1]);
  const washGlow = useTransform(wash, [0, 100], [0, 1]);
  const panelLevel = useTransform([cove, lamp, wash], (v: number[]) => Math.max(...v) / 100);
  const veil = useTransform([cove, lamp, wash, curtain], ([a, b, c, open]: number[]) => {
    const daylight = time === "day" ? 0.35 + (open / 100) * 0.6 : time === "dusk" ? (open / 100) * 0.2 : 0;
    const interior = (a * 0.55 + b * 0.3 + c * 0.35) / 100;
    return 0.66 * (1 - Math.min(1, daylight + interior));
  });
  const sashX = useTransform(sash, [0, 100], ["0%", "-86%"]);

  // Mouse parallax: move the vanishing point. Written straight to the DOM, no re-render.
  useEffect(() => {
    const el = stage.current;
    if (!el || reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.perspectiveOrigin = `${50 + px * 26}% ${46 + py * 16}%`;
    };
    const leave = () => (el.style.perspectiveOrigin = "50% 46%");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      leave();
    };
  }, [reduce]);

  return (
    <div className="absolute inset-0 [container-type:inline-size]">
      <div
        ref={stage}
        role="img"
        aria-label="Illustration of a living room with a large window, curtains, ambient lighting and a wall control panel"
        className="absolute inset-0 overflow-hidden bg-[#0b0d11] transition-[perspective-origin] duration-500 ease-out motion-reduce:transition-none"
        style={{ perspective: "100cqw", perspectiveOrigin: "50% 46%" }}
      >
        <div aria-hidden className="absolute inset-0 [transform-style:preserve-3d]">
          {/* back wall + window */}
          <div className="absolute inset-0 bg-[linear-gradient(#2a2724,#3a352f)]" style={{ transform: `translateZ(-${D}cqw)` }}>
            <div className="absolute left-[14%] top-[10%] h-[70%] w-[72%] overflow-hidden border-[0.5cqw] border-[#15130f]">
              {(Object.keys(sky) as TimeOfDay[]).map((t) => (
                <div key={t} className={cn("absolute inset-0 transition-opacity duration-[1600ms] motion-reduce:transition-none", t === time ? "opacity-100" : "opacity-0")} style={{ background: sky[t] }} />
              ))}
              <div className={cn("absolute inset-x-0 bottom-0 h-[58%] transition-colors duration-[1600ms]", time === "day" ? "bg-[#5d7186]" : "bg-[#0a0d16]")} style={{ clipPath: SKYLINE }} />
              <div className={cn("absolute inset-x-0 bottom-0 h-[34%] bg-[radial-gradient(#ffd28a_0.18cqw,transparent_0.3cqw)] [background-size:3.1cqw_2.3cqw] transition-opacity duration-[1600ms]", time === "day" ? "opacity-0" : "opacity-80")} />
              {/* fixed pane + sliding pane */}
              <div className="absolute inset-y-0 left-0 w-1/2 border-r-[0.4cqw] border-[#15130f] bg-white/[0.04]" />
              <motion.div data-sash style={{ x: sashX }} className="absolute inset-y-0 right-0 w-1/2 border-[0.5cqw] border-[#15130f] bg-[linear-gradient(115deg,rgb(255_255_255/0.14),transparent_35%,rgb(255_255_255/0.05))]">
                <span className="absolute left-[4%] top-1/2 h-[16%] w-[0.6cqw] -translate-y-1/2 rounded-full bg-gold" />
              </motion.div>
            </div>
            <div className="absolute left-[10%] top-[6%] h-[76%] w-[80%]">
              <Curtains position={curtain} />
            </div>
            <div className="absolute left-[8%] top-[4.5%] h-[1%] w-[84%] bg-[#0f0d0a]" />
            <motion.div data-zone="wash" style={{ opacity: washGlow, background: lamps }} className="absolute inset-x-0 top-0 h-[60%]" />
            <motion.div data-zone="cove" style={{ opacity: coveGlow }} className="absolute inset-x-[4%] top-0 h-[0.5cqw] bg-[#ffdca6] shadow-[0_0_3cqw_0.8cqw_rgb(255_200_120/0.55)]" />
          </div>

          {/* left wall: timber slats + art */}
          <div className="absolute inset-y-0 left-0 origin-left bg-[repeating-linear-gradient(90deg,#3b2c1f_0_1.6cqw,#241a12_1.6cqw_2.1cqw)]" style={{ width: `${D}cqw`, transform: "rotateY(90deg)" }}>
            <div className="absolute left-[34%] top-[24%] h-[30%] w-[34%] border-[0.5cqw] border-gold/70 bg-[linear-gradient(140deg,#d8cdb8,#8a7a62_55%,#2d2a28)]" />
            <motion.div style={{ opacity: washGlow, background: lamps }} className="absolute inset-0" />
          </div>

          {/* right wall: stone + wall control */}
          <div className="absolute inset-y-0 right-0 origin-right bg-[linear-gradient(90deg,#4a453d,#34302b)]" style={{ width: `${D}cqw`, transform: "rotateY(-90deg)" }}>
            <motion.div style={{ opacity: washGlow, background: lamps }} className="absolute inset-0" />
            <div className="absolute left-[38%] top-[36%] flex h-[17%] w-[30%] flex-col justify-between rounded-[1cqw] border border-gold/60 bg-[#07080b] p-[1.4cqw] shadow-[0_0_3cqw_rgb(201_169_110/0.35)]">
              {[0, 1].map((row) => (
                <div key={row} className="flex justify-between">
                  {[0, 1, 2].map((col) => (
                    <span key={col} className="size-[3.4cqw] rounded-full border-[0.35cqw] border-sky-300/80" />
                  ))}
                </div>
              ))}
              <motion.span style={{ scaleX: panelLevel }} className="block h-[0.6cqw] origin-left rounded-full bg-gold" />
            </div>
          </div>

          {/* floor + rug */}
          <div className="absolute inset-x-0 bottom-0 origin-bottom bg-[repeating-linear-gradient(90deg,#4b3a29_0_9cqw,#3f3022_9cqw_9.3cqw)]" style={{ height: `${D}cqw`, transform: "rotateX(90deg)" }}>
            <div className="absolute inset-x-[16%] inset-y-[14%] rounded-[1cqw] bg-[#b7ac98] shadow-[inset_0_0_0_0.8cqw_#9d907a]" />
            <motion.div style={{ opacity: coveGlow }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(255_205_135/0.32),transparent_65%)]" />
          </div>

          {/* ceiling with cove light */}
          <div className="absolute inset-x-0 top-0 origin-top bg-[#1c1b1a]" style={{ height: `${D}cqw`, transform: "rotateX(-90deg)" }}>
            <motion.div style={{ opacity: coveGlow }} className="absolute inset-[12%] rounded-[2cqw] border-[0.6cqw] border-[#ffdca6] shadow-[0_0_5cqw_1cqw_rgb(255_200_120/0.45),inset_0_0_5cqw_1cqw_rgb(255_200_120/0.35)]" />
          </div>

          {/* sofa (facing the window) */}
          <Box x={27} w={46} d={11} h={7} z={19} front="#d9d0c0" top="#e6ded0" side="#b9ae9c" />
          <Box x={27} w={46} d={3.5} h={14} z={14} front="linear-gradient(#e4dccd,#cbc1ae)" top="#ece5d8" side="#b9ae9c" radius={2} />
          <Box x={23} w={4.5} d={16} h={11} z={14} front="#cfc5b3" top="#e0d8c9" side="#aea392" radius={1.4} />
          <Box x={72.5} w={4.5} d={16} h={11} z={14} front="#cfc5b3" top="#e0d8c9" side="#aea392" radius={1.4} />

          {/* sideboard + table lamp */}
          <Box x={4} w={13} d={7} h={9} z={34} front="#2a2018" top="#3d3024" side="#1c150f" radius={0.3} />
          <div className="absolute [transform-style:preserve-3d]" style={{ left: "6.5cqw", bottom: "9cqw", width: "8cqw", height: "13cqw", transform: "translateZ(-37cqw)" }}>
            <span className="absolute bottom-0 left-1/2 h-[60%] w-[0.5cqw] -translate-x-1/2 bg-[#8f7748]" />
            <span className="absolute inset-x-0 top-0 h-[48%] bg-[#bfae8b] [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)]" />
            <motion.span data-zone="lamp" style={{ opacity: lampGlow }} className="absolute -inset-[8cqw] rounded-full bg-[radial-gradient(circle,rgb(255_210_140/0.8),transparent_60%)] mix-blend-screen" />
          </div>
        </div>

        <motion.div aria-hidden style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-[#02040a]" />
      </div>
    </div>
  );
});
