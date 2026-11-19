import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="main" className="mx-auto min-h-screen max-w-2xl px-5 py-12 sm:px-8">
      <Link href="/" aria-label="ConnectCom home"><Logo /></Link>
      <Link href="/" className="mt-12 inline-flex items-center gap-2 text-sm text-gold"><ArrowLeft className="size-4" /> Back to home</Link>
      <h1 className="display mt-6 text-4xl font-medium">{title}</h1>
      <div className="mt-8 space-y-4 leading-relaxed text-mute [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-ivory">{children}</div>
    </main>
  );
}
