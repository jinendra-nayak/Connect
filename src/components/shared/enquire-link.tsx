"use client";

import { cn } from "@/lib/utils";

export const INTEREST_EVENT = "connectcom:interest";

/** Scrolls to the consultation form and pre-selects the product of interest. */
export function EnquireLink({
  interest,
  className,
  children,
}: {
  interest?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#consultation"
      className={cn(className)}
      onClick={() => {
        if (interest) window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }));
      }}
    >
      {children}
    </a>
  );
}
