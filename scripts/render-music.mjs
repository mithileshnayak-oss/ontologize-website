/**
 * Original corporate-cinematic score for the Aavya capabilities reel.
 * 35s, A-minor, 90 bpm. Ambient pad + bass drone + arpeggio + scene-cut kicks & sweeps.
 * Generated sample-by-sample in pure JS. Royalty-free, zero plagiarism.
 */

import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "reel-music.m4a");

const SR = 44100;
const DUR = 35;
const N = SR * DUR;
const BPM = 90;
const BEAT = 60 / BPM;

// Chord progression (A minor tonality). Each chord holds ~4 bars ≈ 10.67s.
const PROG = [
  { start: 0,     end: 10,   chord: [110, 164.81, 220, 261.63, 329.63] }, // Am7: A E A C E
  { start: 10,    end: 19,   chord: [87.31, 174.61, 220, 261.63, 349.23] }, // F: F F A C F
  { start: 19,    end: 27,   chord: [130.81, 196, 261.63, 329.63, 392] }, // C: C G C E G
  { start: 27,    end: 35,   chord: [98, 146.83, 196, 246.94, 293.66] }, // G: G D G B D
];

// Scene-cut impacts — synced to reel.
const IMPACTS = [3.0, 7.0, 10.0, 12.9, 15.9, 18.9, 21.9, 25.0, 29.0, 33.0];

function pickChord(t) {
  for (const c of PROG) if (t >= c.start && t < c.end) return c.chord;
  return PROG[PROG.length - 1].chord;
}

// ---------- DSP primitives
function sin(t, f, phase = 0) {
  return Math.sin(2 * Math.PI * f * t + phase);
}

// simple one-pole lowpass per channel
function LP() {
  let y = 0;
  return (x, cutoff) => {
    const rc = 1 / (2 * Math.PI * cutoff);
    const a = 1 / SR / (rc + 1 / SR);
    y = y + a * (x - y);
    return y;
  };
}
function HP() {
  let prevX = 0, prevY = 0;
  return (x, cutoff) => {
    const rc = 1 / (2 * Math.PI * cutoff);
    const a = rc / (rc + 1 / SR);
    const y = a * (prevY + x - prevX);
    prevX = x; prevY = y;
    return y;
  };
}

// envelopes
function expEnv(t, tau) { return t < 0 ? 0 : Math.exp(-t / tau); }
function triEnv(t, dur) {
  if (t < 0 || t > dur) return 0;
  const half = dur / 2;
  return t < half ? t / half : 1 - (t - half) / half;
}
function adsr(t, dur, a, d, s, r) {
  if (t < 0 || t > dur) return 0;
  if (t < a) return t / a;
  if (t < a + d) return 1 - (1 - s) * ((t - a) / d);
  if (t < dur - r) return s;
  return s * (1 - (t - (dur - r)) / r);
}

// percussion
function kick(t, dur = 0.25) {
  if (t < 0 || t > dur) return 0;
  const f = 60 + 160 * Math.exp(-t * 28);
  const env = Math.exp(-t * 8);
  return Math.sin(2 * Math.PI * f * t) * env;
}
function sub(t, dur = 0.7) {
  if (t < 0 || t > dur) return 0;
  const env = Math.exp(-t * 4);
  return Math.sin(2 * Math.PI * 45 * t) * env;
}

// noise
let rnd = 1234567;
function noise() {
  rnd = (rnd * 1103515245 + 12345) & 0x7fffffff;
  return (rnd / 0x7fffffff) * 2 - 1;
}

// filtered noise riser
function makeRiser(startT, dur) {
  const lp = LP();
  return (t) => {
    const rt = t - startT;
    if (rt < 0 || rt > dur) return 0;
    const p = rt / dur;
    const env = Math.pow(p, 2.2);
    const cutoff = 300 + 5000 * p;
    const raw = noise() * 0.9 + sin(t, 80 + p * 320) * 0.25;
    return lp(raw, cutoff) * env;
  };
}

// ---------- Assemble stereo buffer
const left = new Float32Array(N);
const right = new Float32Array(N);

// Bass drone filters
const padLP_L = LP();
const padLP_R = LP();
const arpLP_L = LP();
const arpLP_R = LP();

// Precompute risers per impact
const risers = IMPACTS.map((t) => ({
  startT: t - 1.2,
  dur: 1.3,
  fn: makeRiser(t - 1.2, 1.3),
}));

const arpPattern = [0, 2, 4, 2, 0, 1, 3, 1]; // indices within chord
const sixteenth = BEAT / 4;

for (let i = 0; i < N; i++) {
  const t = i / SR;
  const chord = pickChord(t);

  // ----- Pad (soft sustained triad with slight detune + amplitude modulation)
  let padMono = 0;
  for (let k = 0; k < chord.length; k++) {
    const f = chord[k];
    // slight detune per voice, slow LFO breath
    const det = 1 + (k - chord.length / 2) * 0.0012;
    const lfo = 1 + 0.05 * Math.sin(2 * Math.PI * 0.12 * t + k);
    padMono += sin(t, f * det) * 0.06 * lfo;
    padMono += sin(t, f * det * 2) * 0.018; // octave shimmer
  }
  // envelope in/out
  const padEnv = Math.min(1, t / 2) * (t > 32 ? Math.max(0, 1 - (t - 32) / 3) : 1);
  padMono *= padEnv;

  const padL = padLP_L(padMono, 1800);
  const padR = padLP_R(padMono * 0.97, 1900);

  // ----- Sub bass drone (root + fifth on some sections)
  const root = chord[0] * 0.5; // one octave below root
  let bassMono = sin(t, root) * 0.25 + sin(t, root * 2) * 0.08;
  bassMono *= padEnv * 0.9;

  // ----- Arpeggio (sixteenth notes, soft pluck)
  const step = Math.floor(t / sixteenth);
  const stepT = t - step * sixteenth;
  const idx = arpPattern[step % arpPattern.length];
  const arpF = chord[idx % chord.length] * 2; // one octave up
  const pluckEnv = Math.exp(-stepT * 18) * 0.5 * padEnv;
  let arpMono = sin(t, arpF) * pluckEnv + sin(t, arpF * 1.005) * pluckEnv * 0.35;
  const arpL = arpLP_L(arpMono, 3500) * 0.35;
  const arpR = arpLP_R(arpMono, 3800) * 0.35;

  // ----- Percussion impacts
  let perc = 0;
  for (const it of IMPACTS) {
    const rt = t - it;
    if (rt >= 0 && rt < 0.9) {
      perc += kick(rt) * 0.7;
      perc += sub(rt) * 0.4;
    }
  }

  // ----- Risers (filtered noise sweeps)
  let riserSum = 0;
  for (const r of risers) riserSum += r.fn(t) * 0.18;

  // ----- Subtle hi-hat on offbeats (after 6s)
  let hat = 0;
  const hatStep = Math.floor(t / (BEAT / 2));
  const hatT = t - hatStep * (BEAT / 2);
  if (t > 6 && hatStep % 2 === 1 && hatT < 0.04) {
    hat = noise() * Math.exp(-hatT * 120) * 0.15;
  }

  // mix to stereo with slight panning
  let L = padL * 0.9 + arpL * 0.9 + bassMono + perc + riserSum * 0.9 + hat;
  let R = padR * 0.9 + arpR * 1.0 + bassMono + perc + riserSum * 1.0 + hat * 0.8;

  // global fade-in + fade-out
  const fadeIn = Math.min(1, t / 1.2);
  const fadeOut = t > 33.5 ? Math.max(0, 1 - (t - 33.5) / 1.5) : 1;
  const g = 0.85 * fadeIn * fadeOut;
  L *= g;
  R *= g;

  // soft clip
  L = Math.tanh(L * 0.9);
  R = Math.tanh(R * 0.9);

  left[i] = L;
  right[i] = R;
}

// ---------- Interleave stereo float32 → pipe to ffmpeg
const interleaved = Buffer.alloc(N * 2 * 4);
for (let i = 0; i < N; i++) {
  interleaved.writeFloatLE(left[i], (i * 2) * 4);
  interleaved.writeFloatLE(right[i], (i * 2 + 1) * 4);
}

const ff = spawn("ffmpeg", [
  "-y",
  "-f", "f32le",
  "-ar", String(SR),
  "-ac", "2",
  "-i", "pipe:0",
  "-c:a", "aac",
  "-b:a", "192k",
  "-movflags", "+faststart",
  OUT,
], { stdio: ["pipe", "inherit", "inherit"] });

ff.stdin.write(interleaved);
ff.stdin.end();
ff.on("close", (code) => {
  console.log(`music done · code=${code} · → ${OUT}`);
});
