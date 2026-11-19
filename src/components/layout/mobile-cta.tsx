import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

/** Thumb-reach conversion bar, mobile/tablet only. */
export function MobileCta() {
  const wa = whatsappLink("Hello ConnectCom, I'd like a free consultation.");
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/85 p-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a href="#consultation-form" className="flex h-12 flex-1 items-center justify-center rounded-full bg-gradient-to-b from-gold-soft to-gold text-sm font-medium text-ink">
          Free Consultation
        </a>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
            <MessageCircle className="size-5" />
          </a>
        )}
      </div>
    </div>
  );
}
