"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "./Reveal";

export function VideoFeature({
  src = "/reel.mp4",
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-prose">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="eyebrow">Capabilities reel · 35 seconds</div>
              <h2 className="display mt-4 text-3xl leading-[1.05] md:text-5xl">
                See how we turn Palantir into operating intelligence.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink-300">
              From first Ontology to enterprise-wide AI transformation — a
              compressed view of what an Aavya engagement actually delivers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            onClick={toggle}
            className="group relative overflow-hidden rounded-3xl border border-ink-100/10 bg-ink-950 shadow-[0_40px_120px_-30px_rgba(127,90,240,0.4)] cursor-pointer"
          >
            <video
              ref={ref}
              src={src}
              poster={poster}
              muted={muted}
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
              onEnded={() => setPlaying(false)}
            />

            {/* Play overlay */}
            <div
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                playing ? "opacity-0" : "opacity-100"
              } ${started ? "bg-black/20" : "bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent"}`}
            >
              <div className="flex flex-col items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-500 shadow-[0_20px_80px_-10px_rgba(46,169,224,0.7)] transition-transform group-hover:scale-110">
                  <Play size={32} fill="white" className="ml-1 text-white" />
                </div>
                {!started && (
                  <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-100">
                    Play reel
                  </div>
                )}
              </div>
            </div>

            {/* Pause indicator when hovering while playing */}
            {playing && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/60 backdrop-blur">
                  <Pause size={24} fill="white" className="text-white" />
                </div>
              </div>
            )}

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-colors hover:border-white/60"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Chapter labels — hint at content */}
            <div className="pointer-events-none absolute left-6 top-6 flex flex-wrap gap-2">
              {["Ontology", "Foundry", "AIP", "Enablement"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
