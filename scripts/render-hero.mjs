// Brand-compliant hero video renderer.
// Generates PNG frames via raw pixel math and streams to ffmpeg → MP4.
// Palette: Aavya navy #1C2947, sky #2EA9E0, violet #7F5AF0, mint #2CB67D, ink #E4E6EB.
// No warm colors. Geometric only. Per Aavya brand rules.

import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "hero.mp4");
mkdirSync(dirname(OUT), { recursive: true });

const W = 1280;
const H = 720;
const FPS = 30;
const DUR = 12; // seconds
const FRAMES = FPS * DUR;

// --- deterministic RNG for reproducible loop seed
function mulberry(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry(42);

// --- Scene actors
const NODE_COUNT = 70;
const nodes = Array.from({ length: NODE_COUNT }, () => {
  const c = rand();
  return {
    x: rand() * W,
    y: rand() * H,
    vx: (rand() - 0.5) * 0.6,
    vy: (rand() - 0.5) * 0.6,
    r: rand() * 2.2 + 1.3,
    col: c > 0.86 ? [46, 169, 224] : c > 0.72 ? [44, 182, 125] : [228, 230, 235],
  };
});

const rings = [];
const streaks = [];

// --- Pixel buffer (RGB)
const buf = Buffer.alloc(W * H * 3);

function clamp(v) { return v < 0 ? 0 : v > 255 ? 255 : v | 0; }
function addPx(x, y, r, g, b, a) {
  x |= 0; y |= 0;
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 3;
  buf[i]     = clamp(buf[i]     * (1 - a) + r * a);
  buf[i + 1] = clamp(buf[i + 1] * (1 - a) + g * a);
  buf[i + 2] = clamp(buf[i + 2] * (1 - a) + b * a);
}
function fillRGB(r, g, b) {
  for (let i = 0; i < buf.length; i += 3) {
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b;
  }
}
function drawDisc(cx, cy, radius, r, g, b, a) {
  const r2 = radius * radius;
  const x0 = Math.max(0, cx - radius | 0);
  const x1 = Math.min(W - 1, cx + radius | 0);
  const y0 = Math.max(0, cy - radius | 0);
  const y1 = Math.min(H - 1, cy + radius | 0);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx, dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 <= r2) {
        const falloff = 1 - Math.sqrt(d2) / radius;
        addPx(x, y, r, g, b, a * falloff);
      }
    }
  }
}
function drawGlow(cx, cy, radius, r, g, b, a) {
  const r2 = radius * radius;
  const x0 = Math.max(0, cx - radius | 0);
  const x1 = Math.min(W - 1, cx + radius | 0);
  const y0 = Math.max(0, cy - radius | 0);
  const y1 = Math.min(H - 1, cy + radius | 0);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx, dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 <= r2) {
        const f = 1 - d2 / r2;
        addPx(x, y, r, g, b, a * f * f);
      }
    }
  }
}
function drawLine(x0, y0, x1, y1, r, g, b, a) {
  const dx = x1 - x0, dy = y1 - y0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy)) | 0;
  if (steps === 0) return;
  for (let i = 0; i <= steps; i++) {
    const tt = i / steps;
    const x = x0 + dx * tt;
    const y = y0 + dy * tt;
    addPx(x, y, r, g, b, a);
    addPx(x + 1, y, r, g, b, a * 0.6);
    addPx(x, y + 1, r, g, b, a * 0.6);
  }
}
function drawRing(cx, cy, radius, thickness, r, g, b, a) {
  const inner = radius - thickness;
  const x0 = Math.max(0, cx - radius | 0);
  const x1 = Math.min(W - 1, cx + radius | 0);
  const y0 = Math.max(0, cy - radius | 0);
  const y1 = Math.min(H - 1, cy + radius | 0);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx, dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d >= inner && d <= radius) {
        const f = 1 - Math.abs(d - (radius - thickness / 2)) / (thickness / 2);
        addPx(x, y, r, g, b, a * f);
      }
    }
  }
}

// ---- Layer: procedural mesh gradient (violet + navy + sky)
function paintGradient(t) {
  const cxA = W * (0.3 + 0.12 * Math.sin(t * 0.7));
  const cyA = H * (0.32 + 0.1 * Math.cos(t * 0.5));
  const radA2 = (W * 0.7) ** 2;

  const cxB = W * (0.75 + 0.08 * Math.cos(t * 0.9));
  const cyB = H * (0.72 + 0.08 * Math.sin(t * 1.1));
  const radB2 = (W * 0.55) ** 2;

  const cxC = W * (0.5 + 0.25 * Math.sin(t * 0.3));
  const cyC = H * (0.5 + 0.2 * Math.cos(t * 0.4));
  const radC2 = (W * 0.45) ** 2;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      // base deep purple-navy
      let r = 11, g = 6, b = 32;

      // violet mesh
      const da = (x - cxA) ** 2 + (y - cyA) ** 2;
      if (da < radA2) {
        const fa = (1 - da / radA2) ** 1.6;
        r += 127 * 0.6 * fa;
        g += 90 * 0.6 * fa;
        b += 240 * 0.6 * fa;
      }
      // sky blue mesh
      const db = (x - cxB) ** 2 + (y - cyB) ** 2;
      if (db < radB2) {
        const fb = (1 - db / radB2) ** 1.8;
        r += 46 * 0.5 * fb;
        g += 169 * 0.5 * fb;
        b += 224 * 0.5 * fb;
      }
      // navy vignette lift
      const dc = (x - cxC) ** 2 + (y - cyC) ** 2;
      if (dc < radC2) {
        const fc = (1 - dc / radC2) ** 2;
        r += 28 * 0.25 * fc;
        g += 41 * 0.25 * fc;
        b += 71 * 0.25 * fc;
      }

      buf[i]     = clamp(r);
      buf[i + 1] = clamp(g);
      buf[i + 2] = clamp(b);
    }
  }
}

// ---- Frame generator
function renderFrame(frame) {
  const t = (frame / FPS) * 0.8;

  paintGradient(t);

  // rings
  if (frame % 24 === 0 && rings.length < 6) {
    rings.push({
      x: W * (0.2 + rand() * 0.6),
      y: H * (0.25 + rand() * 0.5),
      r: 4,
      max: 300 + rand() * 180,
      a: 0.45,
    });
  }
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i];
    r.r += 1.6;
    r.a *= 0.985;
    if (r.a > 0.02 && r.r < r.max) {
      drawRing(r.x, r.y, r.r, 1.6, 228, 230, 235, r.a);
    } else rings.splice(i, 1);
  }

  // nodes: move + draw edges + draw disc + glow
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 20 || n.x > W - 20) n.vx *= -1;
    if (n.y < 20 || n.y > H - 20) n.vy *= -1;
  }
  // edges
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      const MAX = 180;
      if (d < MAX) {
        const al = (1 - d / MAX) * 0.28;
        drawLine(a.x, a.y, b.x, b.y, 228, 230, 235, al);
      }
    }
  }
  // nodes glow then core
  for (const n of nodes) {
    drawGlow(n.x, n.y, n.r * 8, n.col[0], n.col[1], n.col[2], 0.18);
    drawDisc(n.x, n.y, n.r, n.col[0], n.col[1], n.col[2], 0.95);
  }

  // streaks
  if (streaks.length < 10 && rand() > 0.65) {
    const angle = rand() * Math.PI * 2;
    const speed = 1.4 + rand() * 2.5;
    streaks.push({
      x: rand() * W,
      y: rand() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      max: 50 + rand() * 70,
    });
  }
  for (let i = streaks.length - 1; i >= 0; i--) {
    const s = streaks[i];
    const tailLen = 18;
    const tx = s.x - s.vx * tailLen;
    const ty = s.y - s.vy * tailLen;
    // gradient-ish: draw several segments with fading alpha
    for (let k = 0; k < tailLen; k++) {
      const tt = k / tailLen;
      const px = tx + (s.x - tx) * tt;
      const py = ty + (s.y - ty) * tt;
      const ar = 46 + (127 - 46) * tt;
      const ag = 169 + (90 - 169) * tt;
      const ab = 224 + (240 - 224) * tt;
      drawDisc(px, py, 1.3, ar, ag, ab, 0.35 * tt + 0.08);
    }
    drawDisc(s.x, s.y, 2, 228, 230, 235, 0.9);
    s.x += s.vx;
    s.y += s.vy;
    s.life++;
    if (s.life > s.max || s.x < -30 || s.x > W + 30 || s.y < -30 || s.y > H + 30) {
      streaks.splice(i, 1);
    }
  }
}

// ---- ffmpeg pipeline
const ff = spawn("ffmpeg", [
  "-y",
  "-f", "rawvideo",
  "-pix_fmt", "rgb24",
  "-s", `${W}x${H}`,
  "-r", String(FPS),
  "-i", "pipe:0",
  "-c:v", "libx264",
  "-preset", "slow",
  "-crf", "20",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  "-profile:v", "high",
  "-tune", "film",
  "-an",
  OUT,
], { stdio: ["pipe", "inherit", "inherit"] });

(async () => {
  const start = Date.now();
  for (let f = 0; f < FRAMES; f++) {
    renderFrame(f);
    if (!ff.stdin.write(buf)) {
      await new Promise((r) => ff.stdin.once("drain", r));
    }
    if (f % 30 === 0) {
      process.stdout.write(`\rframe ${f}/${FRAMES}  (${(((f + 1) / FRAMES) * 100).toFixed(0)}%)`);
    }
  }
  ff.stdin.end();
  ff.on("close", (code) => {
    const s = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\nffmpeg exit ${code} · rendered ${FRAMES} frames in ${s}s → ${OUT}`);
  });
})();
