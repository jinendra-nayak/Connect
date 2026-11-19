import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden fill="none" stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round">
        <path d="M4 15 16 5l12 10" />
        <path d="M8 13v13h16V13" />
        <path d="M12 21a5.5 5.5 0 0 1 8 0M14.2 23.6a2.4 2.4 0 0 1 3.6 0" />
      </svg>
      <span className="display text-[1.15rem] font-semibold tracking-tight text-ivory">
        Connect<span className="text-gold">Com</span>
      </span>
    </span>
  );
}
