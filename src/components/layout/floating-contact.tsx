import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

/** Desktop side tab: one click opens a WhatsApp chat. Mobile uses MobileCta. */
export function FloatingContact() {
  const wa = whatsappLink("Hello ConnectCom, I'd like to know more about your smart home solutions.");
  if (!wa) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp (opens in a new tab)"
      className="group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 rounded-l-2xl border border-r-0 border-gold/40 bg-ink/80 py-5 pl-4 pr-3 text-gold shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:pr-5 hover:bg-gold hover:text-ink lg:flex lg:flex-col"
    >
      <MessageCircle className="size-5" strokeWidth={1.6} />
      <span className="text-xs font-medium uppercase tracking-[0.25em] [writing-mode:vertical-rl]">Contact Us</span>
    </a>
  );
}
