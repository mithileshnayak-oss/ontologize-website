"use client";

/**
 * Interactive ontology graph. Draggable nodes, force-layout edges.
 * Light on white background — matches light-section theming.
 */
import { useEffect, useRef } from "react";

type N = { id: string; label: string; kind: "entity" | "action" | "link"; x: number; y: number; vx: number; vy: number };
type E = [string, string];

const NODES: Omit<N, "x" | "y" | "vx" | "vy">[] = [
  { id: "asset", label: "Asset", kind: "entity" },
  { id: "site", label: "Site", kind: "entity" },
  { id: "sensor", label: "Sensor", kind: "entity" },
  { id: "event", label: "Event", kind: "entity" },
  { id: "shift", label: "Shift", kind: "entity" },
  { id: "tech", label: "Technician", kind: "entity" },
  { id: "order", label: "Work Order", kind: "entity" },
  { id: "dispatch", label: "Dispatch", kind: "action" },
  { id: "resolve", label: "Resolve", kind: "action" },
  { id: "review", label: "Review", kind: "action" },
];

const EDGES: E[] = [
  ["asset", "site"],
  ["asset", "sensor"],
  ["sensor", "event"],
  ["event", "dispatch"],
  ["dispatch", "tech"],
  ["tech", "shift"],
  ["dispatch", "order"],
  ["order", "resolve"],
  ["resolve", "review"],
  ["review", "asset"],
  ["shift", "site"],
];

export function OntologyGraph() {
  const ref = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<N[]>([]);
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // init positions in a circle
    nodesRef.current = NODES.map((n, i) => {
      const angle = (i / NODES.length) * Math.PI * 2;
      const r = Math.min(w, h) * 0.28;
      return {
        ...n,
        x: w / 2 + Math.cos(angle) * r,
        y: h / 2 + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
      };
    });

    const byId = (id: string) => nodesRef.current.find((n) => n.id === id)!;

    const toCanvas = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) * canvas.width) / rect.width,
        y: ((e.clientY - rect.top) * canvas.height) / rect.height,
      };
    };

    const onDown = (ev: MouseEvent | TouchEvent) => {
      const p = toCanvas("touches" in ev ? ev.touches[0] : ev);
      let best: { id: string; d: number } | null = null;
      for (const n of nodesRef.current) {
        const d = Math.hypot(n.x - p.x, n.y - p.y);
        if (d < 36 * dpr && (!best || d < best.d)) best = { id: n.id, d };
      }
      if (best) {
        const n = byId(best.id);
        dragRef.current = { id: best.id, ox: p.x - n.x, oy: p.y - n.y };
      }
    };
    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;
      const p = toCanvas("touches" in ev ? ev.touches[0] : ev);
      const n = byId(dragRef.current.id);
      n.x = p.x - dragRef.current.ox;
      n.y = p.y - dragRef.current.oy;
      n.vx = 0;
      n.vy = 0;
    };
    const onUp = () => {
      dragRef.current = null;
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    const tick = () => {
      // forces
      const k = 0.015;
      const rest = 130 * dpr;
      const nodes = nodesRef.current;
      for (const a of nodes) {
        for (const b of nodes) {
          if (a === b) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy) + 0.001;
          const rep = 3000 / (d * d);
          a.vx += (dx / d) * rep;
          a.vy += (dy / d) * rep;
        }
      }
      for (const [sa, sb] of EDGES) {
        const a = byId(sa), b = byId(sb);
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy);
        const force = (d - rest) * k;
        a.vx += (dx / d) * force;
        a.vy += (dy / d) * force;
        b.vx -= (dx / d) * force;
        b.vy -= (dy / d) * force;
      }
      const cx = w / 2, cy = h / 2;
      for (const n of nodes) {
        if (dragRef.current && dragRef.current.id === n.id) continue;
        n.vx += (cx - n.x) * 0.0012;
        n.vy += (cy - n.y) * 0.0012;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
      }

      // paint
      ctx.clearRect(0, 0, w, h);

      // edges
      ctx.lineWidth = 1.4 * dpr;
      for (const [sa, sb] of EDGES) {
        const a = byId(sa), b = byId(sb);
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, "rgba(46,169,224,0.7)");
        grad.addColorStop(1, "rgba(28,41,71,0.55)");
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        // halo
        const h1 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 42 * dpr);
        h1.addColorStop(0, n.kind === "action" ? "rgba(44,182,125,0.28)" : "rgba(46,169,224,0.22)");
        h1.addColorStop(1, "rgba(46,169,224,0)");
        ctx.fillStyle = h1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 42 * dpr, 0, Math.PI * 2);
        ctx.fill();

        // disc
        ctx.fillStyle = n.kind === "action" ? "#2CB67D" : "#1C2947";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 22 * dpr, 0, Math.PI * 2);
        ctx.fill();
        // ring
        ctx.strokeStyle = n.kind === "action" ? "#0E3D2A" : "#2EA9E0";
        ctx.lineWidth = 2 * dpr;
        ctx.stroke();

        // label
        ctx.fillStyle = "#0B1022";
        ctx.font = `${12 * dpr}px Inter, system-ui`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y + 42 * dpr);
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div className="relative rounded-3xl border border-navy-200 bg-white p-4 shadow-[0_30px_80px_-40px_rgba(28,41,71,0.25)]">
      <canvas
        ref={ref}
        className="h-[480px] w-full cursor-grab active:cursor-grabbing"
      />
      <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-sky-600">
        Drag any node · live ontology graph
      </div>
    </div>
  );
}
