/**
 * Aavya capabilities reel — ~35s, original, brand-compliant.
 *
 * Structure:
 *   00:00–00:03  Atmospheric open + eyebrow
 *   00:03–00:07  HOOK: "Your operations know more than they're telling you."
 *   00:07–00:10  Problem cut: fragmentation (scattered network)
 *   00:10–00:13  Logo reveal — Aavya Ontologize
 *   00:13–00:25  Four capability cards with kinetic type:
 *                  Ontology · Foundry · AIP Agents · Enablement
 *   00:25–00:29  Proof stats: 4wk · 300M+ · 100%
 *   00:29–00:33  CTA: "From pilot to platform."
 *   00:33–00:35  Outro mark
 */

import { spawn } from "node:child_process";
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "reel.mp4");

// Use system fonts (Helvetica is always present on macOS). We name-fallback on .ttc.
try {
  GlobalFonts.registerFromPath("/System/Library/Fonts/Helvetica.ttc", "Helvetica");
} catch {}
try {
  GlobalFonts.registerFromPath("/System/Library/Fonts/HelveticaNeue.ttc", "Helvetica Neue");
} catch {}
try {
  GlobalFonts.registerFromPath("/System/Library/Fonts/Supplemental/Arial.ttf", "Arial");
} catch {}

const FONT_SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const FONT_MONO = '"Menlo", "Courier New", monospace';

const W = 1280;
const H = 720;
const FPS = 30;
const DUR = 35;
const FRAMES = DUR * FPS;

const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// ---------- timing helpers
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
function phase(tSec, start, end) {
  return clamp((tSec - start) / (end - start), 0, 1);
}

// deterministic scene seeds
function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- persistent scene actors
const netRand = mulberry(11);
const NET_NODES = Array.from({ length: 80 }, () => ({
  x: netRand() * W,
  y: netRand() * H,
  vx: (netRand() - 0.5) * 0.6,
  vy: (netRand() - 0.5) * 0.6,
  r: netRand() * 2 + 1.2,
  c: netRand() > 0.85 ? "#2EA9E0" : netRand() > 0.7 ? "#2CB67D" : "#E4E6EB",
}));

// ---------- paint helpers
function paintBackground(tSec, hue = "violet") {
  // navy base
  ctx.fillStyle = "#07041A";
  ctx.fillRect(0, 0, W, H);

  // mesh gradient A
  const ax = W * (0.3 + 0.12 * Math.sin(tSec * 0.5));
  const ay = H * (0.3 + 0.1 * Math.cos(tSec * 0.4));
  const ga = ctx.createRadialGradient(ax, ay, 10, ax, ay, W * 0.9);
  if (hue === "sky") {
    ga.addColorStop(0, "rgba(46,169,224,0.35)");
    ga.addColorStop(0.5, "rgba(28,41,71,0.3)");
  } else if (hue === "mint") {
    ga.addColorStop(0, "rgba(44,182,125,0.28)");
    ga.addColorStop(0.5, "rgba(28,41,71,0.3)");
  } else {
    ga.addColorStop(0, "rgba(127,90,240,0.35)");
    ga.addColorStop(0.5, "rgba(28,41,71,0.3)");
  }
  ga.addColorStop(1, "rgba(7,4,26,0)");
  ctx.fillStyle = ga;
  ctx.fillRect(0, 0, W, H);

  // sky wash bottom-right
  const bx = W * 0.75;
  const by = H * 0.8;
  const gb = ctx.createRadialGradient(bx, by, 10, bx, by, W * 0.7);
  gb.addColorStop(0, "rgba(46,169,224,0.22)");
  gb.addColorStop(1, "rgba(7,4,26,0)");
  ctx.fillStyle = gb;
  ctx.fillRect(0, 0, W, H);

  // subtle grid
  ctx.strokeStyle = "rgba(228,230,235,0.04)";
  ctx.lineWidth = 1;
  const step = 56;
  for (let x = 0; x < W; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
}

function paintNetwork(tSec, intensity = 1, connect = 1) {
  // update
  for (const n of NET_NODES) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  }
  // edges
  const MAX = 180;
  ctx.lineWidth = 1;
  for (let i = 0; i < NET_NODES.length; i++) {
    for (let j = i + 1; j < NET_NODES.length; j++) {
      const a = NET_NODES[i], b = NET_NODES[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < MAX) {
        const al = (1 - d / MAX) * 0.32 * intensity * connect;
        ctx.strokeStyle = `rgba(228,230,235,${al})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  // nodes
  for (const n of NET_NODES) {
    // halo
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 9);
    g.addColorStop(0, hexToRgba(n.c, 0.22 * intensity));
    g.addColorStop(1, hexToRgba(n.c, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r * 9, 0, Math.PI * 2);
    ctx.fill();
    // core
    ctx.fillStyle = n.c;
    ctx.globalAlpha = 0.95 * intensity;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function paintFragmentation(tSec, amount) {
  // disperse nodes outward temporarily
  for (const n of NET_NODES) {
    const cx = W / 2, cy = H / 2;
    const dx = n.x - cx, dy = n.y - cy;
    n.vx += (dx / (Math.hypot(dx, dy) + 1)) * 0.1 * amount;
    n.vy += (dy / (Math.hypot(dx, dy) + 1)) * 0.1 * amount;
    n.vx *= 0.98; n.vy *= 0.98;
  }
}

function paintConverge(cx, cy, strength) {
  for (const n of NET_NODES) {
    const dx = cx - n.x, dy = cy - n.y;
    n.vx += dx * 0.002 * strength;
    n.vy += dy * 0.002 * strength;
    n.vx *= 0.92; n.vy *= 0.92;
  }
}

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ---------- typography helpers
function drawEyebrow(text, x, y, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#2CB67D";
  ctx.font = `600 13px ${FONT_MONO}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  // letter-spacing via manual draw
  const letters = text.toUpperCase().split("");
  let cx = x;
  for (const ch of letters) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + 3;
  }
  ctx.restore();
}
function drawHeadline(text, x, y, size, alpha = 1, color = "#E4E6EB", align = "left", weight = 500) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${FONT_SANS}`;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
  ctx.restore();
}
function drawCaption(text, x, y, size, alpha = 1, color = "#C6C1DB", align = "left") {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = `400 ${size}px ${FONT_SANS}`;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
  ctx.restore();
}
function drawMaskReveal(text, x, y, size, progress, color = "#E4E6EB", weight = 600) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${FONT_SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const m = ctx.measureText(text);
  const w = m.width;
  ctx.beginPath();
  ctx.rect(x, y - 10, w * progress, size + 40);
  ctx.clip();
  ctx.fillText(text, x, y);
  ctx.restore();
}
function drawLogoMark(cx, cy, scale, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  // sky triangle (top-left)
  ctx.fillStyle = "#2EA9E0";
  ctx.beginPath();
  ctx.moveTo(cx - 60 * scale, cy - 18 * scale);
  ctx.lineTo(cx - 22 * scale, cy - 42 * scale);
  ctx.lineTo(cx - 22 * scale, cy - 2 * scale);
  ctx.closePath();
  ctx.fill();
  // navy triangle (bottom-right)
  ctx.fillStyle = "#1C2947";
  ctx.beginPath();
  ctx.moveTo(cx + 22 * scale, cy + 20 * scale);
  ctx.lineTo(cx + 60 * scale, cy + 2 * scale);
  ctx.lineTo(cx + 60 * scale, cy + 42 * scale);
  ctx.closePath();
  ctx.fill();
  // left sky capsule
  roundedRect(cx - 28 * scale, cy - 22 * scale, 18 * scale, 80 * scale, 9 * scale);
  ctx.fillStyle = "#2EA9E0";
  ctx.fill();
  // right white capsule
  roundedRect(cx + 10 * scale, cy - 56 * scale, 18 * scale, 80 * scale, 9 * scale);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.restore();
}
function roundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ---------- scenes
function scene_Open(tSec) {
  paintBackground(tSec, "violet");
  paintConverge(W / 2, H / 2, 0.2);
  paintNetwork(tSec, 0.8, 1);
  const a = easeOut(phase(tSec, 0.4, 1.8));
  drawEyebrow("AAVYA · ONTOLOGY", 80, 80, a);
  const b = easeOut(phase(tSec, 1.2, 2.6));
  drawCaption("A Palantir Foundry & Ontology practice", 80, 104, 18, b, "#9C93BC");
}

function scene_Hook(tSec) {
  paintBackground(tSec, "violet");
  paintNetwork(tSec, 0.7, 0.9);
  const line1 = "Your operations know more";
  const line2 = "than they're telling you.";
  const p1 = easeOut(phase(tSec, 3.3, 4.6));
  const p2 = easeOut(phase(tSec, 3.9, 5.6));
  drawMaskReveal(line1, 80, 240, 72, p1, "#E4E6EB", 500);
  drawMaskReveal(line2, 80, 330, 72, p2, "#E4E6EB", 500);
  const pc = easeOut(phase(tSec, 5.3, 6.6));
  drawCaption("The gap between data and decision is architectural.", 80, 460, 22, pc, "#C6C1DB");
}

function scene_Fragmentation(tSec) {
  paintBackground(tSec, "sky");
  paintFragmentation(tSec, 0.8);
  paintNetwork(tSec, 1, 0.35);
  const p = easeOut(phase(tSec, 7.2, 8.6));
  drawEyebrow("THE PROBLEM", 80, 80, p);
  const p2 = easeOut(phase(tSec, 7.6, 9.0));
  drawHeadline("Fragmented data.", 80, 110, 56, p2, "#E4E6EB", "left", 500);
  const p3 = easeOut(phase(tSec, 8.0, 9.3));
  drawHeadline("Stalled decisions.", 80, 180, 56, p3, "#2EA9E0", "left", 500);
  const p4 = easeOut(phase(tSec, 8.4, 9.7));
  drawHeadline("Pilots that never scale.", 80, 250, 56, p4, "#2CB67D", "left", 500);
}

function scene_LogoReveal(tSec) {
  paintBackground(tSec, "violet");
  paintConverge(W / 2, H / 2 - 30, 0.6);
  paintNetwork(tSec, 1, 1);
  const p = easeOut(phase(tSec, 10.1, 11.4));
  drawLogoMark(W / 2, H / 2 - 20, 2.2, p);
  const pw = easeOut(phase(tSec, 11.2, 12.4));
  drawHeadline("ONTOLOGY", W / 2, H / 2 + 120, 48, pw, "#E4E6EB", "center", 600);
  const pt = easeOut(phase(tSec, 11.9, 12.9));
  drawCaption("by Aavya", W / 2, H / 2 + 178, 18, pt, "#2CB67D", "center");
}

function scene_Capability(tSec, start, end, label, headline, body, accent = "#7F5AF0") {
  paintBackground(tSec, accent === "#2EA9E0" ? "sky" : accent === "#2CB67D" ? "mint" : "violet");
  paintNetwork(tSec, 0.6, 0.75);

  const dur = end - start;
  const t = phase(tSec, start, end);
  const fadeIn = easeOut(phase(tSec, start, start + 0.5));
  const fadeOut = 1 - easeOut(phase(tSec, end - 0.35, end));
  const alpha = Math.min(fadeIn, fadeOut);

  // left number
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = accent;
  ctx.font = `500 180px ${FONT_SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(label, 80, 180);
  ctx.restore();

  drawEyebrow("CAPABILITY", 80, 130, alpha);

  const revealP = easeOut(phase(tSec, start + 0.3, start + 1.1));
  drawMaskReveal(headline, 80, 400, 60, revealP, "#E4E6EB", 500);

  const bodyP = easeOut(phase(tSec, start + 0.7, start + 1.5));
  ctx.save();
  ctx.globalAlpha = bodyP * alpha;
  ctx.fillStyle = "#C6C1DB";
  ctx.font = `400 22px ${FONT_SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const maxW = W - 160;
  wrapText(body, 80, 490, maxW, 30);
  ctx.restore();

  // progress bar for capability count
  const barP = (t);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(228,230,235,0.15)";
  ctx.fillRect(80, 600, 400, 3);
  ctx.fillStyle = accent;
  ctx.fillRect(80, 600, 400 * barP, 3);
  ctx.restore();
}

function wrapText(text, x, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lineH;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}

function scene_Stats(tSec) {
  paintBackground(tSec, "mint");
  paintConverge(W / 2, H / 2, 0.1);
  paintNetwork(tSec, 0.55, 0.65);

  const start = 25.0;
  const alpha = Math.min(
    easeOut(phase(tSec, start, start + 0.6)),
    1 - easeOut(phase(tSec, 28.8, 29.4))
  );
  drawEyebrow("PROVEN IN THE FIELD", W / 2, 120, alpha);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#2CB67D";
  ctx.font = `600 13px ${FONT_MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PROVEN IN THE FIELD", W / 2, 120);
  ctx.restore();

  const stats = [
    { v: "4wk", l: "From diagnosis to first production Ontology" },
    { v: "300M+", l: "Objects under production load" },
    { v: "100%", l: "Practitioner-led engagements" },
  ];
  const bases = [W * 0.2, W * 0.5, W * 0.8];
  stats.forEach((s, i) => {
    const p = easeOut(phase(tSec, start + 0.6 + i * 0.25, start + 1.8 + i * 0.25));
    ctx.save();
    ctx.globalAlpha = p * alpha;
    ctx.fillStyle = "#E4E6EB";
    ctx.font = `500 92px ${FONT_SANS}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.v, bases[i], 340);
    ctx.fillStyle = "#C6C1DB";
    ctx.font = `400 18px ${FONT_SANS}`;
    wrapCentered(s.l, bases[i], 420, 260, 24);
    ctx.restore();
  });
}
function wrapCentered(text, cx, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, cx, y + i * lineH));
}

function scene_CTA(tSec) {
  paintBackground(tSec, "violet");
  paintConverge(W / 2, H / 2, 0.25);
  paintNetwork(tSec, 1, 1);

  const start = 29.2;
  const alpha = Math.min(
    easeOut(phase(tSec, start, start + 0.6)),
    1 - easeOut(phase(tSec, 33.0, 33.8))
  );
  drawEyebrow("FROM PILOT TO PLATFORM", W / 2, 150, alpha);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#2CB67D";
  ctx.font = `600 13px ${FONT_MONO}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("FROM PILOT TO PLATFORM", W / 2, 150);
  ctx.restore();

  const l1 = "We embed. We build.";
  const l2 = "We stay.";
  const p1 = easeOut(phase(tSec, start + 0.3, start + 1.4));
  const p2 = easeOut(phase(tSec, start + 0.7, start + 1.8));
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#E4E6EB";
  ctx.font = `500 84px ${FONT_SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const w1 = ctx.measureText(l1).width;
  ctx.beginPath();
  ctx.rect(W / 2 - w1 / 2, 230, w1 * p1, 100);
  ctx.save();
  ctx.clip();
  ctx.fillText(l1, W / 2, 280);
  ctx.restore();
  const w2 = ctx.measureText(l2).width;
  ctx.beginPath();
  ctx.rect(W / 2 - w2 / 2, 330, w2 * p2, 100);
  ctx.save();
  ctx.clip();
  ctx.fillText(l2, W / 2, 380);
  ctx.restore();
  ctx.restore();

  // pill button
  const pp = easeOut(phase(tSec, start + 1.3, start + 2.4));
  ctx.save();
  ctx.globalAlpha = pp * alpha;
  const bw = 360, bh = 64;
  const bx = W / 2 - bw / 2;
  const by = 480;
  roundedRect(bx, by, bw, bh, 32);
  ctx.fillStyle = "#2EA9E0";
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `500 20px ${FONT_SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Book a Discovery Call  →", W / 2, by + bh / 2);
  ctx.restore();

  drawCaption("ontoligize.aavya.com", W / 2, 580, 16, alpha, "#9C93BC", "center");
}

function scene_Outro(tSec) {
  paintBackground(tSec, "violet");
  paintConverge(W / 2, H / 2, 0.4);
  paintNetwork(tSec, 0.5, 0.6);
  const p = easeOut(phase(tSec, 33.2, 34.2));
  drawLogoMark(W / 2, H / 2 - 20, 1.4, p);
  drawHeadline("AAVYA", W / 2, H / 2 + 70, 32, p, "#E4E6EB", "center", 600);

  // fade out to black at the very end
  const fo = easeOut(phase(tSec, 34.4, 35.0));
  ctx.save();
  ctx.globalAlpha = fo;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// ---------- frame dispatcher
function renderFrame(frame) {
  const t = frame / FPS;

  if (t < 3.2) scene_Open(t);
  else if (t < 7.0) scene_Hook(t);
  else if (t < 9.9) scene_Fragmentation(t);
  else if (t < 12.9) scene_LogoReveal(t);
  else if (t < 15.9) scene_Capability(t, 12.9, 15.9, "01", "Ontology Strategy & Design.", "The semantic layer that determines every AI capability built on top.", "#7F5AF0");
  else if (t < 18.9) scene_Capability(t, 15.9, 18.9, "02", "Palantir Foundry Implementation.", "End-to-end delivery from design decision to production deployment.", "#2EA9E0");
  else if (t < 21.9) scene_Capability(t, 18.9, 21.9, "03", "AIP & Agentic AI Deployment.", "Constrained agents grounded in your Ontology. Measurable outcomes.", "#2CB67D");
  else if (t < 24.9) scene_Capability(t, 21.9, 24.9, "04", "Training & Enablement.", "Built to a competency spec — not a content checklist.", "#7F5AF0");
  else if (t < 29.0) scene_Stats(t);
  else if (t < 33.2) scene_CTA(t);
  else scene_Outro(t);
}

// ---------- encode
const ff = spawn("ffmpeg", [
  "-y",
  "-f", "rawvideo",
  "-pix_fmt", "rgba",
  "-s", `${W}x${H}`,
  "-r", String(FPS),
  "-i", "pipe:0",
  "-c:v", "libx264",
  "-preset", "slow",
  "-crf", "19",
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
    const data = canvas.data();
    if (!ff.stdin.write(data)) {
      await new Promise((r) => ff.stdin.once("drain", r));
    }
    if (f % 30 === 0) {
      process.stdout.write(`\rreel ${f}/${FRAMES}  ${((f / FRAMES) * 100).toFixed(0)}%`);
    }
  }
  ff.stdin.end();
  ff.on("close", (code) => {
    const s = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\nreel done · code=${code} · ${FRAMES} frames in ${s}s → ${OUT}`);
  });
})();
