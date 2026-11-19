/**
 * Single source of truth for brand + contact details.
 *
 * Nothing here is invented: phone, email, address and social links are read
 * from environment variables (see .env.example). When a value is not set the
 * UI hides the related link instead of showing a placeholder.
 */
const digits = (v?: string) => (v ?? "").replace(/\D/g, "");

export const site = {
  name: "ConnectCom",
  tagline: "Your Home. Connected. Intelligent. Effortless.",
  description:
    "ConnectCom designs smart glass touch panels, smart switch panels, sensors, door locks and intelligent home control for modern living.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: digits(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "",
  socials: [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "" },
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "" },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "" },
  ].filter((s) => s.href),
} as const;

export function whatsappLink(message?: string) {
  if (!site.whatsapp) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${q}`;
}

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Products", href: "#products" },
  { label: "Voice Control", href: "#voice" },
  { label: "Solutions", href: "#solutions" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#consultation" },
] as const;
