"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Hydration-safe media query: the server and the first client render both see
 * `false`, then React re-renders with the real value.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotionSafe = () => useMediaQuery("(prefers-reduced-motion: reduce)");
