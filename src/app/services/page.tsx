"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { services, industries } from "@/lib/content";
import clsx from "clsx";

export default function ServicesPage() {
  const [open, setOpen] = useState<string | null>(services[0].slug);
  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <AmbientVideo density={34} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 to-ink-900" />
        <div className="container-prose">
          <Reveal>
            <div className="eyebrow">Services</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-4xl text-[40px] leading-[1.05] md:text-[72px]">
              Services designed to eliminate the most common Palantir failure modes.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl">
              We don&apos;t build service lines around what consultants know
              how to deliver. We build them around what enterprises
              consistently fail to achieve with Foundry — and we design each
              service to remove that failure mode.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICE ACCORDION */}
      <section className="container-prose py-20">
        <div className="space-y-4">
          {services.map((s) => {
            const isOpen = open === s.slug;
            return (
              <Reveal key={s.slug}>
                <div
                  id={s.slug}
                  className={clsx(
                    "overflow-hidden rounded-3xl border transition-all",
                    isOpen
                      ? "border-sky-500/40 bg-gradient-to-br from-sky-500/10 via-ink-900 to-mint-400/5 shadow-float"
                      : "border-ink-100/10 bg-white/[0.02]"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : s.slug)}
                    className="flex w-full items-center justify-between gap-8 p-8 text-left md:p-10"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-mint-400">
                        Service {s.number}
                      </div>
                      <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink-50 md:text-4xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm text-ink-300 md:text-base">
                        {s.tagline}
                      </p>
                    </div>
                    <ChevronDown
                      className={clsx(
                        "shrink-0 text-ink-200 transition-transform",
                        isOpen && "rotate-180 text-sky-300"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="grid gap-10 border-t border-ink-100/10 p-8 md:grid-cols-2 md:p-10">
                      <div className="space-y-5 text-sm leading-relaxed text-ink-300 md:text-base">
                        <p>{s.summary}</p>
                        <div>
                          <div className="eyebrow mb-2">The hard part</div>
                          <p className="text-ink-100">{s.hard}</p>
                        </div>
                      </div>
                      <div>
                        <div className="eyebrow mb-4">What this delivers</div>
                        <ul className="space-y-3">
                          {s.deliverables.map((d) => (
                            <li
                              key={d}
                              className="flex gap-3 text-sm text-ink-200"
                            >
                              <Check
                                size={16}
                                className="mt-0.5 shrink-0 text-mint-400"
                              />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/consulting#contact"
                          className="btn-ghost mt-8"
                        >
                          Request a Proposal <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="relative border-y border-ink-100/10 bg-white/[0.015] py-24 md:py-32">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Industries we serve"
            title="Sector-specific Ontologies, designed for operational reality."
          />
          <div className="mt-16 overflow-hidden rounded-2xl border border-ink-100/10">
            <table className="w-full border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="bg-white/[0.03] text-ink-300">
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em]">
                    Industry
                  </th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em]">
                    Representative challenge
                  </th>
                  <th className="p-5 font-mono text-[11px] uppercase tracking-[0.2em]">
                    Ontology impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {industries.map((i) => (
                  <tr
                    key={i.title}
                    className="border-t border-ink-100/10 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="p-5 align-top text-ink-50">{i.title}</td>
                    <td className="p-5 align-top text-ink-300">{i.body}</td>
                    <td className="p-5 align-top font-mono text-ink-200">
                      {i.ontology}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTA
        title="Have a specific problem in mind?"
        body="The fastest path forward is a focused conversation. Bring us your most complex use case, your stalled deployment, or your readiness question — and we will respond with direction, not a deck."
      />
    </>
  );
}
