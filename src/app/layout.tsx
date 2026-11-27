import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/shared/motion";
import { LiquidGlassFilter } from "@/components/ui/liquid-glass-button";

const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ConnectCom | Smart Home Automation", template: "%s | ConnectCom" },
  description: site.description,
  applicationName: site.name,
  keywords: ["smart home automation", "smart glass touch panel", "smart switch panel", "smart door lock", "smart sensors", "home automation"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "ConnectCom | Intelligent Living, Beautifully Connected.",
    description: site.description,
    images: [{ url: "/images/luxury/villa-evening.jpg", width: 1920, height: 1047, alt: "A modern living space powered by ConnectCom smart home automation" }],
  },
  twitter: { card: "summary_large_image", title: "ConnectCom | Smart Home Automation", description: site.description, images: ["/images/luxury/villa-evening.jpg"] },
};

export const viewport: Viewport = { themeColor: "#080A0D", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    slogan: site.tagline,
    description: site.description,
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
  };
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      {/* suppressHydrationWarning: browser extensions inject attributes onto <body> before hydration */}
      <body suppressHydrationWarning className="bg-ink font-sans text-ivory antialiased">
        <a href="#main" className="sr-only z-[60] rounded bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <LiquidGlassFilter />
        <MotionProvider>{children}</MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
