"use client";

/**
 * Spline Scene — https://21st.dev/@serafimcloud/components/splite
 * Same `scene` / `className` API as the original, plus: an error boundary, a load
 * timeout, a caller-supplied fallback, and sandboxed scene HTML.
 * The Spline runtime is only downloaded when this component renders.
 */
import { Component, Suspense, lazy, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

type Status = "loading" | "ready" | "error";

class Boundary extends Component<{ onError: () => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Shown until the scene is ready, and for good if it cannot be shown. */
  fallback?: React.ReactNode;
  label?: string;
  timeoutMs?: number;
}

/** Remounts per scene URL, so status can never leak from one scene to the next. */
export function SplineScene(props: SplineSceneProps) {
  return <Scene key={props.scene} {...props} />;
}

function Scene({ scene, className, fallback, label = "Interactive 3D scene", timeoutMs = 20_000 }: SplineSceneProps) {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (status !== "loading") return;
    const t = setTimeout(() => setStatus("error"), timeoutMs);
    return () => clearTimeout(t);
  }, [status, timeoutMs]);

  return (
    <div className={cn("relative size-full", className)} data-spline-status={status}>
      {status !== "ready" && fallback}
      {status === "loading" && (
        <p role="status" className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1 text-[0.7rem] text-ivory">
          <span aria-hidden className="size-3 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          Loading 3D scene…
        </p>
      )}
      {status !== "error" && (
        <div
          role="img"
          aria-label={label}
          aria-hidden={status !== "ready"}
          className={cn("absolute inset-0 transition-opacity duration-1000", status === "ready" ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          <Boundary onError={() => setStatus("error")}>
            <Suspense fallback={null}>
              <Spline scene={scene} htmlContentMode="sandbox" onLoad={() => setStatus("ready")} />
            </Suspense>
          </Boundary>
        </div>
      )}
      {status === "ready" && (
        <a href="https://spline.design" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-3 text-[0.65rem] text-ivory/60 hover:text-gold">         
        </a>
      )}
    </div>
  );
}
