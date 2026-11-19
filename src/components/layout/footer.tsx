import Link from "next/link";
import { nav, site } from "@/lib/site";
import { interests } from "@/data/content";
import { Logo } from "@/components/shared/logo";

const col = "text-sm text-mute transition-colors hover:text-gold";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-28 pt-20 lg:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              {site.tagline}
              <br />
              ConnectCom brings beautifully designed smart home automation to modern living.
            </p>
            {site.socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((s) => (
                  <li key={s.label}><a className={col} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Products">
            <h2 className="eyebrow">Products</h2>
            <ul className="mt-5 space-y-3">
              {interests.slice(0, 7).map((i) => <li key={i}><a className={col} href="#products">{i}</a></li>)}
            </ul>
          </nav>

          <nav aria-label="Smart home solutions">
            <h2 className="eyebrow">Smart Home Solutions</h2>
            <ul className="mt-5 space-y-3">
              {nav.slice(1).map((n) => <li key={n.href}><a className={col} href={n.href}>{n.label}</a></li>)}
              <li><a className={col} href="#connected">Connected Living</a></li>
              <li><a className={col} href="#security">Smart Security</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-mute">
              {site.phone && <li><a className={col} href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a></li>}
              {site.email && <li><a className={col} href={`mailto:${site.email}`}>{site.email}</a></li>}
              {site.address && <li>{site.address}</li>}
              <li><a className={col} href="#consultation">Book a free consultation</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-16 max-w-3xl text-[0.7rem] leading-relaxed text-mute/80">
          Photo credits: Echo Dot by Samuel Wiki (CC0). Google Nest Mini by Sikander Iqbal and Xiaomi temperature &amp; humidity sensor by
          Jacek Halicki, both{" "}
          <a className="underline underline-offset-2 hover:text-gold" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
          , via Wikimedia Commons. Amazon, Echo, Google, Nest and Xiaomi are trademarks of their owners; no endorsement is implied.
        </p>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-mute sm:flex-row">
          <p>© ConnectCom. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link className={col} href="/privacy">Privacy Policy</Link></li>
            <li><Link className={col} href="/terms">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
