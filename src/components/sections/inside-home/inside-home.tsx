"use client";

import { useState } from "react";
import { Blinds, Clapperboard, Lamp, LampCeiling, LampWallUp, Lightbulb, MoonStar, PanelsTopLeft, Sunrise, Sunset, type LucideIcon } from "lucide-react";
import { PearlButton } from "@/components/ui/pearl-button";
import { Spotlight } from "@/components/ui/spotlight";
import { SectionHeader } from "@/components/shared/section";
import { EnquireLink } from "@/components/shared/enquire-link";
import { Reveal } from "@/components/shared/motion";
import { MotorStatus, useMotorPosition } from "@/components/shared/curtains";
import { Room, type TimeOfDay } from "./room";

type Zone = "cove" | "lamp" | "wash";
type Home = { time: TimeOfDay; light: number; curtain: number; sash: number } & Record<Zone, boolean>;

const moods: { id: string; label: string; icon: LucideIcon; state: Home }[] = [
  { id: "morning", label: "Morning", icon: Sunrise, state: { time: "day", light: 30, curtain: 100, sash: 60, cove: false, lamp: false, wash: true } },
  { id: "evening", label: "Evening", icon: Sunset, state: { time: "dusk", light: 80, curtain: 65, sash: 25, cove: true, lamp: true, wash: true } },
  { id: "cinema", label: "Cinema", icon: Clapperboard, state: { time: "night", light: 25, curtain: 0, sash: 0, cove: true, lamp: false, wash: false } },
  { id: "night", label: "Good night", icon: MoonStar, state: { time: "night", light: 0, curtain: 0, sash: 0, cove: false, lamp: false, wash: false } },
];

const zones: { id: Zone; label: string; icon: LucideIcon }[] = [
  { id: "cove", label: "Ceiling", icon: LampCeiling },
  { id: "lamp", label: "Lamp", icon: Lamp },
  { id: "wash", label: "Wall light", icon: LampWallUp },
];

const points = [
  { icon: Lightbulb, title: "Light that sets the mood", text: "Ceiling, lamp and wall light, together or one at a time." },
  { icon: Blinds, title: "Curtains and windows", text: "Fully open, fully closed, or exactly where you like them." },
  { icon: PanelsTopLeft, title: "One calm control", text: "Scenes bring several actions together in a single touch." },
];

const cta = "inline-flex min-h-12 items-center rounded-full border border-gold/40 px-6 text-sm text-gold transition-colors hover:bg-gold hover:text-ink";

/** One compact row on phones, label above the track from `sm` up. */
function Slider({ id, label, value, onChange, status }: { id: string; label: string; value: number; onChange: (v: number) => void; status: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr_5.75rem] items-center gap-x-3 sm:grid-cols-[1fr_auto]">
      <label htmlFor={id} className="text-sm font-medium text-ivory">{label}</label>
      <span className="order-3 text-right text-xs tabular-nums text-gold-soft sm:order-none" data-status={id}>{status}</span>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-9 w-full min-w-0 cursor-pointer accent-gold sm:col-span-2 sm:h-8"
      />
    </div>
  );
}

export function InsideHome() {
  const [home, setHome] = useState<Home>(moods[1].state);
  const set = (patch: Partial<Home>) => setHome((h) => ({ ...h, ...patch }));
  const activeMood = moods.find((m) => (Object.keys(m.state) as (keyof Home)[]).every((k) => m.state[k] === home[k]));
  const anyLight = home.light > 0 && (home.cove || home.lamp || home.wash);

  const curtain = useMotorPosition(home.curtain);
  const sash = useMotorPosition(home.sash, 2.2);
  const cove = useMotorPosition(home.cove ? home.light : 0, 1.4);
  const lamp = useMotorPosition(home.lamp ? home.light : 0, 1.4);
  const wash = useMotorPosition(home.wash ? home.light : 0, 1.4);

  // Turning a zone on while the dimmer is at zero raises it, so the tap always shows.
  const toggle = (id: Zone) => set(home[id] && home.light > 0 ? { [id]: false } : { [id]: true, light: home.light || 70 });

  return (
    // overflow-clip, not hidden: `hidden` would stop the room from sticking on phones.
    <section id="inside-home" className="relative isolate overflow-clip bg-ink py-16 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_at_70%_0%,rgb(201_169_110/0.12),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Interactive experience"
            title="Inside Your Connected Home"
            description="Tap a moment, or take the controls. Watch light, curtains and windows move together."
          />
          <div className="hidden lg:block">
            <ul className="mt-10 space-y-5">
              {points.map(({ icon: Icon, title, text }, i) => (
                <li key={title}>
                  <Reveal delay={i * 0.08} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-medium text-ivory">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-mute">{text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <EnquireLink interest="Smart Curtain Automation" className={`mt-10 ${cta}`}>Plan this for your home</EnquireLink>
          </div>
        </div>

        <div className="min-w-0">
          {/* On phones and tablets the room stays in view while the controls below are used. */}
          <div className="z-20 bg-ink pb-2 [@media(max-width:1023px)_and_(min-height:560px)]:sticky [@media(max-width:1023px)_and_(min-height:560px)]:top-16 sm:[@media(max-width:1023px)_and_(min-height:560px)]:top-[4.5rem]">
            <div data-stage className="relative mx-auto aspect-[4/3] w-[min(100%,56svh)] overflow-hidden rounded-3xl border border-white/10 bg-charcoal shadow-[0_40px_90px_-40px_rgb(201_169_110/0.35)] lg:w-full">
              <Room curtain={curtain} sash={sash} cove={cove} lamp={lamp} wash={wash} time={home.time} />
              <Spotlight />
            </div>
          </div>

          <div className="glass space-y-3 rounded-3xl p-3 sm:space-y-5 sm:p-6">
            <div role="group" aria-label="Choose a moment" className="grid grid-cols-4 gap-2">
              {moods.map(({ id, label, icon: Icon, state }) => (
                <PearlButton key={id} size="sm" stacked label={label} icon={<Icon aria-hidden className="size-4" strokeWidth={1.7} />} aria-pressed={activeMood?.id === id} onClick={() => setHome(state)} />
              ))}
            </div>

            <div role="group" aria-label="Interior lights" className="grid grid-cols-3 gap-2">
              {zones.map(({ id, label, icon: Icon }) => (
                <PearlButton key={id} size="sm" stacked label={label} icon={<Icon aria-hidden className="size-4 shrink-0" strokeWidth={1.7} />} aria-pressed={home[id] && home.light > 0} onClick={() => toggle(id)} />
              ))}
            </div>

            <div role="group" aria-label="Curtain shortcuts" className="grid grid-cols-3 gap-2">
              {([["Open", 100], ["Half", 50], ["Close", 0]] as const).map(([label, value]) => (
                <PearlButton key={label} size="sm" label={label} aria-label={`${label} curtains`} icon={<Blinds aria-hidden className="size-4 shrink-0" strokeWidth={1.7} />} aria-pressed={home.curtain === value} onClick={() => set({ curtain: value })} />
              ))}
            </div>

            <div className="grid gap-x-6 gap-y-1 sm:grid-cols-3">
              <Slider id="home-light" label="Dimmer" value={home.light} onChange={(light) => set(light && !(home.cove || home.lamp || home.wash) ? { light, cove: true } : { light })} status={anyLight ? `${home.light}%` : "Off"} />
              <Slider id="home-curtain" label="Curtains" value={home.curtain} onChange={(v) => set({ curtain: v })} status={<MotorStatus position={curtain} target={home.curtain} />} />
              <Slider id="home-window" label="Window" value={home.sash} onChange={(v) => set({ sash: v })} status={<MotorStatus position={sash} target={home.sash} />} />
            </div>
          </div>

          <EnquireLink interest="Smart Curtain Automation" className={`mt-5 lg:hidden ${cta}`}>Plan this for your home</EnquireLink>
        </div>
      </div>
    </section>
  );
}
