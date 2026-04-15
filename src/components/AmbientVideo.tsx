"use client";

/**
 * Cinematic ambient background for hero + CTA sections.
 *
 * Layers (back → front):
 *   1. Animated conic gradient mesh
 *   2. Orbital particle field (ontology-like network)
 *   3. Expanding concentric rings (pulse)
 *   4. Data-flow streaks
 *
 * If `/public/hero.mp4` is present, it is used instead of the canvas — making
 * this component a drop-in wrapper for a real video later. No warm colors,
 * geometric only, per Aavya brand rules.
 */
import { useEffect, useRef, useState } from "react";

type Props = {
  density?: number;
  intensity?: "low" | "med" | "high";
  className?: string;
  videoSrc?: string;
};

export function AmbientVideo({
  density = 50,
  intensity = "med",
  className = "",
  videoSrc,
}: Props) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    // force play after mount — some browsers pause autoplay until user interaction
    const v = videoRef.current;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [videoSrc]);

  if (videoSrc && !failed) {
    return (
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onError={() => setFailed(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

  return <AmbientCanvas density={density} intensity={intensity} className={className} />;
}

function AmbientCanvas({
  density,
  intensity,
  className,
}: {
  density: number;
  intensity: "low" | "med" | "high";
  className: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const NAVY = "#1C2947";
    const SKY = "#2EA9E0";
    const VIOLET = "#7F5AF0";
    const MINT = "#2CB67D";
    const WHITE = "#E4E6EB";

    const scale = intensity === "low" ? 0.55 : intensity === "high" ? 1.15 : 0.9;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    const nodes: Node[] = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3 * dpr,
      vy: (Math.random() - 0.5) * 0.3 * dpr,
      r: (Math.random() * 2 + 1.4) * dpr,
      c: Math.random() > 0.86 ? SKY : Math.random() > 0.7 ? MINT : WHITE,
    }));

    type Ring = { x: number; y: number; r: number; max: number; alpha: number };
    const rings: Ring[] = [];

    type Streak = { x: number; y: number; vx: number; vy: number; life: number; max: number };
    const streaks: Streak[] = [];

    let t = 0;

    const spawnRing = () => {
      rings.push({
        x: w * (0.2 + Math.random() * 0.6),
        y: h * (0.2 + Math.random() * 0.6),
        r: 2,
        max: Math.min(w, h) * (0.25 + Math.random() * 0.25),
        alpha: 0.55,
      });
    };
    const spawnStreak = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.8 + Math.random() * 1.8) * dpr;
      streaks.push({
        x: w * Math.random(),
        y: h * Math.random(),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 60 + Math.random() * 80,
      });
    };

    const tick = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Layer 1 — animated mesh gradient (violet + navy)
      const g1 = ctx.createRadialGradient(
        w * (0.3 + 0.1 * Math.sin(t)),
        h * (0.3 + 0.1 * Math.cos(t * 0.7)),
        10,
        w * 0.4,
        h * 0.4,
        w * 0.9
      );
      g1.addColorStop(0, "rgba(127,90,240,0.35)");
      g1.addColorStop(0.5, "rgba(28,41,71,0.35)");
      g1.addColorStop(1, "rgba(11,6,32,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Layer 1b — sky-blue wash from bottom-right
      const g2 = ctx.createRadialGradient(
        w * (0.75 + 0.05 * Math.cos(t * 1.3)),
        h * (0.75 + 0.05 * Math.sin(t)),
        10,
        w * 0.75,
        h * 0.75,
        w * 0.7
      );
      g2.addColorStop(0, "rgba(46,169,224,0.22)");
      g2.addColorStop(1, "rgba(11,6,32,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Layer 3 — rings
      if (t % 0.1 < 0.012 && rings.length < 6) spawnRing();
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.r += 1.2 * dpr * scale;
        r.alpha *= 0.985;
        ctx.strokeStyle = `rgba(228,230,235,${r.alpha})`;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
        if (r.r > r.max || r.alpha < 0.02) rings.splice(i, 1);
      }

      // Layer 2 — nodes + edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          const max = 200 * dpr;
          if (d < max) {
            const alpha = (1 - d / max) * 0.28;
            ctx.strokeStyle = `rgba(228,230,235,${alpha})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        // glow halo
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Layer 4 — data-flow streaks
      if (streaks.length < 14 && Math.random() > 0.85) spawnStreak();
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        const prevX = s.x - s.vx * 8;
        const prevY = s.y - s.vy * 8;
        const lg = ctx.createLinearGradient(prevX, prevY, s.x, s.y);
        lg.addColorStop(0, "rgba(46,169,224,0)");
        lg.addColorStop(1, "rgba(127,90,240,0.7)");
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        if (
          s.life > s.max ||
          s.x < -50 ||
          s.x > w + 50 ||
          s.y < -50 ||
          s.y > h + 50
        ) {
          streaks.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, intensity]);

  return <canvas ref={ref} className={`h-full w-full ${className}`} aria-hidden />;
}
