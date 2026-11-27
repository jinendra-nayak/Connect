import React from "react";
import { cn } from "@/lib/utils";

type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  /** Replaces the ✧ / ✦ sparkle. */
  icon?: React.ReactNode;
  size?: "sm" | "lg";
  /** Icon above the label on narrow screens. */
  stacked?: boolean;
};

/**
 * Pearl Button (21st.dev). Changes from the original:
 * - `sm` / `lg` sizes; shadows are in `em`, so they scale with the button
 * - gold state driven by `aria-pressed`, and a visible focus ring
 * - spans instead of div/p (only phrasing content is valid inside a button)
 * - hover effects only on devices that can hover, so taps do not stick
 * - one shared stylesheet, hoisted and de-duplicated by React
 */
const css = `
.pearl-button{outline:none;cursor:pointer;border:0;position:relative;display:inline-flex;min-height:44px;min-width:0;border-radius:100px;background-color:#080808;transition:transform .2s ease,box-shadow .2s ease,background-color .3s ease;-webkit-tap-highlight-color:transparent;
box-shadow:inset 0 .12em .4em rgba(255,255,255,.28),inset 0 -.05em .15em rgba(0,0,0,.7),inset 0 -.18em .45em rgba(255,255,255,.32),0 .6em 1em -.4em rgba(0,0,0,.8)}
.pearl-button:focus-visible{outline:2px solid #c9a96e;outline-offset:3px}
.pearl-button .wrap{position:relative;display:flex;flex:1;align-items:center;justify-content:center;overflow:hidden;border-radius:inherit;color:rgba(255,255,255,.86);font-weight:500;line-height:1.2}
.pearl-button[data-size=sm]{font-size:.8125rem}
.pearl-button[data-size=sm] .wrap{padding:.55em .9em}
.pearl-button[data-size=lg]{font-size:1rem}
.pearl-button[data-size=lg] .wrap{padding:1.05em 2.2em}
.pearl-button .content{position:relative;z-index:1;display:flex;align-items:center;gap:.5em;white-space:nowrap;transition:transform .2s ease}
.pearl-button .wrap::before,.pearl-button .wrap::after{content:"";position:absolute;transition:transform .3s ease,opacity .3s ease}
.pearl-button .wrap::before{left:-15%;right:-15%;bottom:35%;top:-100%;border-radius:50%;background-color:rgba(255,255,255,.1)}
.pearl-button .wrap::after{left:8%;right:8%;top:8%;bottom:55%;border-radius:22px 22px 0 0;box-shadow:inset 0 10px 8px -10px rgba(255,255,255,.7);background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(0,0,0,0) 70%)}
.pearl-button .spark-on{display:none}
.pearl-button[aria-pressed=true]{background-color:#c9a96e;box-shadow:inset 0 .12em .4em rgba(255,255,255,.55),inset 0 -.18em .45em rgba(255,236,196,.7),0 .5em 1.4em -.4em rgba(201,169,110,.75)}
.pearl-button[aria-pressed=true] .wrap{color:#080a0d}
@media (hover:hover){
.pearl-button:hover .wrap::before{transform:translateY(-5%)}
.pearl-button:hover .wrap::after{opacity:.5;transform:translateY(5%)}
.pearl-button:hover .content{transform:translateY(-4%)}
.pearl-button:hover .spark-off{display:none}
.pearl-button:hover .spark-on{display:inline}
}
.pearl-button:active{transform:translateY(2px)}
.pearl-button:disabled{cursor:not-allowed;opacity:.5}
@media (max-width:639px){
.pearl-button[data-stacked] .content{flex-direction:column;gap:.25em;font-size:.9em}
.pearl-button[data-stacked] .wrap{padding-inline:.25em}
.pearl-button[data-stacked]{border-radius:18px}
}
@media (max-width:359px){
.pearl-button[data-size=sm]{font-size:.72rem}
.pearl-button[data-size=sm] .wrap{padding-inline:.15em}
.pearl-button[data-size=sm] .content{gap:.3em}
}
@media (prefers-reduced-motion:reduce){.pearl-button,.pearl-button *,.pearl-button .wrap::before,.pearl-button .wrap::after{transition:none}}
`;

export const PearlButton: React.FC<PearlButtonProps> = ({
  label = "Pearl Button",
  icon,
  size = "lg",
  stacked,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <>
      <style href="pearl-button" precedence="default">
        {css}
      </style>
      <button type={type} data-size={size} data-stacked={stacked || undefined} className={cn("pearl-button", className)} {...props}>
        <span className="wrap">
          <span className="content">
            {icon ?? (
              <>
                <span aria-hidden className="spark-off">✧</span>
                <span aria-hidden className="spark-on">✦</span>
              </>
            )}
            {label && <span>{label}</span>}
          </span>
        </span>
      </button>
    </>
  );
};
