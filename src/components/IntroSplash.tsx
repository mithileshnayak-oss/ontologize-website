"use client";

import { useEffect, useRef, useState } from "react";
import { AavyaMark, AavyaWordmark } from "./Logo";

const KEY = "aavya-intro-played";
const MAX_MS = 5000;

export function IntroSplash() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [fading, setFading] = useState(false);
  const [phase, setPhase] = useState(0); // 0=particles, 1=logo, 2=wordmark
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let isReload = true;
    try {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav && nav.type && nav.type !== "reload" && nav.type !== "navigate") {
        isReload = false;
      } else if (nav && nav.type === "navigate") {
        try {
          if (sessionStorage.getItem(KEY)) isReload = false;
        } catch {}
      }
    } catch {}

    if (!isReload) {
      setVisible(false);
      return;
    }
    setVisible(true);
    document.body.style.overflow = "hidden";

    // Phase timings — logo appears at 1.8s, wordmark at 2.5s
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const safety = setTimeout(dismiss, MAX_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safety);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    if (fading) return;
    setFading(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setTimeout(() => setVisible(false), 600);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!visible) return;
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onEnded = () => dismiss();
    v.addEventListener("ended", onEnded);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      v.removeEventListener("ended", onEnded);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (visible === null || visible === false) return null;

  return (
    <div
      role="dialog"
      aria-label="Aavya intro"
      onClick={dismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 transition-opacity duration-[600ms] ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background video (particles animation) */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
      />

      {/* Official logo overlay — fades in on top of video */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
          }}
        >
          <AavyaMark size={200} variant="dark" />
        </div>

        {/* Wordmark */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <AavyaWordmark className="h-[28px] w-auto" variant="dark" />
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        className="absolute bottom-8 right-8 z-20 rounded-full border border-ink-100/20 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-100 backdrop-blur transition-colors hover:border-ink-100/50"
      >
        Skip intro →
      </button>
    </div>
  );
}
