"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "aavya-intro-played";
const MAX_MS = 5000;

export function IntroSplash() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Always play on hard refresh; suppress only on SPA internal navigation.
    let isReload = true;
    try {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (nav && nav.type && nav.type !== "reload" && nav.type !== "navigate") {
        // back-forward cache etc — treat as non-reload
        isReload = false;
      } else if (nav && nav.type === "navigate") {
        // first visit this tab → play; subsequent in-SPA nav skipped via sessionStorage
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

    const safety = setTimeout(dismiss, MAX_MS);
    return () => {
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
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="h-full w-full object-cover"
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          dismiss();
        }}
        className="absolute bottom-8 right-8 rounded-full border border-ink-100/20 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-100 backdrop-blur transition-colors hover:border-ink-100/50"
      >
        Skip intro →
      </button>
    </div>
  );
}
