// Brand intro splash video — 4s logo reveal.
// Sequence: particles converge → logo mark fades in → wordmark draws in → hold → fade out.
// Palette: navy #1C2947, sky #2EA9E0, mint #2CB67D, ink #E4E6EB. No warm colors.

import { spawn } from "node:child_process";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "intro.mp4");

const W = 1280;
const H = 720;
const FPS = 30;
const DUR = 4.2;
const FRAMES = Math.round(FPS * DUR);

function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry(7);

const PARTICLES = 120;
const particles = Array.from({ length: PARTICLES }, () => {
  const a = rand() * Math.PI * 2;
  const dist = rand() * 0.55 + 0.2;
  return {
    sx: W / 2 + Math.cos(a) * W * dist,
    sy: H / 2 + Math.sin(a) * H * dist * 1.1,
    r: rand() * 2 + 1.0,
    hue: rand() > 0.8 ? "sky" : rand() > 0.65 ? "mint" : "ink",
  };
});

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
        const f = 1 - Math.sqrt(d2) / radius;
        addPx(x, y, r, g, b, a * f);
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
function drawCapsule(x, y, w, h, r, g, b, a) {
  // vertical rounded capsule
  const rad = w / 2;
  // central rect
  for (let yy = y + rad; yy < y + h - rad; yy++) {
    for (let xx = x; xx < x + w; xx++) addPx(xx, yy, r, g, b, a);
  }
  // caps
  for (let yy = y; yy < y + rad; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      const dx = xx - (x + rad);
      const dy = yy - (y + rad);
      if (dx * dx + dy * dy <= rad * rad) addPx(xx, yy, r, g, b, a);
    }
  }
  for (let yy = y + h - rad; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      const dx = xx - (x + rad);
      const dy = yy - (y + h - rad);
      if (dx * dx + dy * dy <= rad * rad) addPx(xx, yy, r, g, b, a);
    }
  }
}
function drawTriangle(x0, y0, x1, y1, x2, y2, r, g, b, a) {
  const minX = Math.max(0, Math.min(x0, x1, x2) | 0);
  const maxX = Math.min(W - 1, Math.max(x0, x1, x2) | 0);
  const minY = Math.max(0, Math.min(y0, y1, y2) | 0);
  const maxY = Math.min(H - 1, Math.max(y0, y1, y2) | 0);
  const sign = (ax, ay, bx, by, cx, cy) =>
    (ax - cx) * (by - cy) - (bx - cx) * (ay - cy);
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const d1 = sign(x, y, x0, y0, x1, y1);
      const d2 = sign(x, y, x1, y1, x2, y2);
      const d3 = sign(x, y, x2, y2, x0, y0);
      const neg = d1 < 0 || d2 < 0 || d3 < 0;
      const pos = d1 > 0 || d2 > 0 || d3 > 0;
      if (!(neg && pos)) addPx(x, y, r, g, b, a);
    }
  }
}
function drawChevron(cx, cy, size, thick, r, g, b, a) {
  // draws a "^" from (cx-size, cy+size/2) → (cx, cy-size/2) → (cx+size, cy+size/2)
  const x0 = cx - size, y0 = cy + size * 0.6;
  const x1 = cx, y1 = cy - size * 0.6;
  const x2 = cx + size, y2 = cy + size * 0.6;
  drawThickLine(x0, y0, x1, y1, thick, r, g, b, a);
  drawThickLine(x1, y1, x2, y2, thick, r, g, b, a);
}
function drawVee(cx, cy, size, thick, r, g, b, a) {
  const x0 = cx - size, y0 = cy - size * 0.6;
  const x1 = cx, y1 = cy + size * 0.6;
  const x2 = cx + size, y2 = cy - size * 0.6;
  drawThickLine(x0, y0, x1, y1, thick, r, g, b, a);
  drawThickLine(x1, y1, x2, y2, thick, r, g, b, a);
}
function drawY(cx, cy, size, thick, r, g, b, a) {
  drawThickLine(cx - size, cy - size * 0.6, cx, cy, thick, r, g, b, a);
  drawThickLine(cx + size, cy - size * 0.6, cx, cy, thick, r, g, b, a);
  drawThickLine(cx, cy, cx, cy + size * 0.6, thick, r, g, b, a);
}
function drawThickLine(x0, y0, x1, y1, thick, r, g, b, a) {
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  const steps = Math.ceil(len);
  for (let i = 0; i <= steps; i++) {
    const tt = i / steps;
    const x = x0 + dx * tt;
    const y = y0 + dy * tt;
    drawDisc(x, y, thick / 2, r, g, b, a);
  }
}

function fillBg(frame) {
  const t = frame / FPS;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      // base
      let r = 8, g = 5, b = 28;
      const dx = x - W / 2, dy = y - H / 2;
      const d2 = dx * dx + dy * dy;
      const glow = Math.exp(-d2 / (W * 180));
      r += 127 * 0.35 * glow;
      g += 90 * 0.35 * glow;
      b += 240 * 0.35 * glow;
      // sky wash from bottom-right
      const dx2 = x - W * 0.8, dy2 = y - H * 0.85;
      const d22 = dx2 * dx2 + dy2 * dy2;
      const sky = Math.exp(-d22 / (W * 120)) * 0.35;
      r += 46 * sky;
      g += 169 * sky;
      b += 224 * sky;
      buf[i]     = clamp(r);
      buf[i + 1] = clamp(g);
      buf[i + 2] = clamp(b);
    }
  }
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

function renderFrame(frame) {
  fillBg(frame);
  const t = frame / FRAMES; // 0..1

  // phase 1: particles converge to center (0..0.55)
  // phase 2: logo reveal (0.45..0.85)
  // phase 3: wordmark (0.6..0.95)
  // phase 4: fade out (0.9..1)

  // particles
  const convergeT = Math.min(1, Math.max(0, (t - 0.05) / 0.5));
  const e = easeInOut(convergeT);
  const px0 = W / 2, py0 = H / 2;
  for (const p of particles) {
    const x = p.sx + (px0 - p.sx) * e;
    const y = p.sy + (py0 - p.sy) * e;
    const col =
      p.hue === "sky" ? [46, 169, 224] :
      p.hue === "mint" ? [44, 182, 125] :
      [228, 230, 235];
    const alpha = (1 - e * 0.6);
    drawGlow(x, y, p.r * 7, col[0], col[1], col[2], 0.18 * alpha);
    drawDisc(x, y, p.r, col[0], col[1], col[2], 0.9 * alpha);
  }

  // logo reveal starts at ~45%
  const logoT = Math.min(1, Math.max(0, (t - 0.42) / 0.2));
  const logoAlpha = easeOut(logoT);
  if (logoAlpha > 0) {
    // center the logo composition
    const cx = W / 2;
    const cy = H / 2 - 30;
    const scale = 2.2;

    // small sky triangle (upper-left)
    drawTriangle(
      cx - 50 * scale, cy - 20 * scale,
      cx - 20 * scale, cy - 40 * scale,
      cx - 20 * scale, cy - 5 * scale,
      46, 169, 224, logoAlpha
    );
    // small navy triangle (lower-right)
    drawTriangle(
      cx + 20 * scale, cy + 20 * scale,
      cx + 50 * scale, cy + 5 * scale,
      cx + 50 * scale, cy + 40 * scale,
      28, 41, 71, logoAlpha
    );
    // left sky capsule
    drawCapsule(
      cx - 25 * scale, cy - 15 * scale,
      16 * scale, 75 * scale,
      46, 169, 224, logoAlpha
    );
    // right white capsule
    drawCapsule(
      cx + 10 * scale, cy - 50 * scale,
      16 * scale, 75 * scale,
      255, 255, 255, logoAlpha
    );
  }

  // wordmark "AAVYA" at ~60%
  const wordT = Math.min(1, Math.max(0, (t - 0.58) / 0.22));
  if (wordT > 0) {
    const wy = H / 2 + 180;
    const s = 34;
    const th = 7;
    const spacing = 90;
    const glyphs = [
      { draw: drawChevron, x: W / 2 - spacing * 2 },
      { draw: drawChevron, x: W / 2 - spacing * 1 },
      { draw: drawVee,     x: W / 2 },
      { draw: drawY,       x: W / 2 + spacing * 1 },
      { draw: drawChevron, x: W / 2 + spacing * 2 },
    ];
    glyphs.forEach((g, i) => {
      const localT = Math.min(1, Math.max(0, (wordT * glyphs.length - i)));
      const a = easeOut(localT);
      if (a > 0) g.draw(g.x, wy, s, th, 228, 230, 235, a);
    });
  }

  // tagline "ontologize" fade in after wordmark
  // skipping complex text — rely on wordmark alone

  // vignette / fade out
  if (t > 0.9) {
    const fadeT = (t - 0.9) / 0.1;
    for (let i = 0; i < buf.length; i += 3) {
      buf[i]     = clamp(buf[i]     * (1 - fadeT));
      buf[i + 1] = clamp(buf[i + 1] * (1 - fadeT));
      buf[i + 2] = clamp(buf[i + 2] * (1 - fadeT));
    }
  }
}

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
      process.stdout.write(`\rintro frame ${f}/${FRAMES}`);
    }
  }
  ff.stdin.end();
  ff.on("close", (code) => {
    const s = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\nintro done · ${FRAMES} frames in ${s}s → ${OUT}`);
  });
})();
