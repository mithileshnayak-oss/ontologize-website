import Link from "next/link";
import { ArrowRight, Phone, ChevronRight, Sparkles, Layers, Workflow, Shield } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { Counter } from "@/components/Counter";
import { VideoFeature } from "@/components/VideoFeature";
import { industries, services, testimonials, stats } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-24 pt-24 md:pb-32 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <AmbientVideo density={56} intensity="high" videoSrc="/hero.mp4" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/20 via-ink-900/55 to-ink-900" />
        <div className="absolute inset-0 -z-20 grid-bg" />

        <div className="container-prose">
          <Reveal>
            <div className="eyebrow flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-mint-400 shadow-[0_0_12px_#2CB67D]" />
              ontoligize.aavya — Palantir Ontology &amp; Foundry practice
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-5xl text-[42px] leading-[1.02] md:text-[84px]">
              Your operations know more than they&apos;re telling you.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl">
              Aavya&apos;s Ontologize practice helps enterprises close the gap
              between the data they hold and the decisions they need to make —
              through precision Ontology design, hands-on Palantir Foundry
              delivery, and training that builds lasting internal capability.{" "}
              <span className="text-ink-100">We embed. We build. We stay.</span>
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/consulting#contact" className="btn-primary">
                <Phone size={16} /> Book a Discovery Call
              </Link>
              <Link href="/services" className="btn-ghost">
                Explore Our Services <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-14 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
              Deployed across Fortune 500 enterprises, federal agencies, and
              mission-critical government programs — from first use case to
              full-scale operational intelligence.
            </p>
          </Reveal>
        </div>
      </section>

      <PartnerMarquee />

      <VideoFeature src="/reel.mp4" />

      {/* VALUE PROP STRIP */}
      <section className="container-prose py-24 md:py-32">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Layers size={20} />,
              title: "Built From the Inside Out",
              body:
                "Our practitioners designed and shipped Ontology solutions from within Palantir's own delivery engine. We understand the platform the way it was architected to be used — including the constraints that surface only at production scale.",
            },
            {
              icon: <Workflow size={20} />,
              title: "Outcomes, Not Invoices",
              body:
                "Every engagement begins with a clear, agreed definition of business success. We measure performance against your operations — not against hours logged, slides produced, or change orders submitted.",
            },
            {
              icon: <Sparkles size={20} />,
              title: "From Pilot to Platform",
              body:
                "Most organizations plateau after the proof of concept. We specialize in the transition most consultancies skip: moving Palantir from a controlled experiment to the connective tissue of your enterprise operations.",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card-surface h-full">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30">
                  {v.icon}
                </div>
                <h3 className="mt-6 text-xl font-medium text-ink-50">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-3xl border border-ink-100/10 bg-gradient-to-br from-violet-500/15 via-ink-800/50 to-mint-400/10 p-10 md:p-16">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <div className="eyebrow mb-4">The thesis</div>
                <h3 className="display text-3xl leading-[1.1] md:text-5xl">
                  The Ontology is your business model.
                </h3>
              </div>
              <p className="text-base leading-relaxed text-ink-200">
                When your digital model accurately reflects your shop floor,
                your supply chain, and your customers, AI stops being a science
                project and starts generating compounding returns. We build
                Ontologies that mirror operational reality — not textbook
                templates.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="relative border-y border-ink-100/10 bg-white/[0.015] py-24 md:py-32">
        <div className="container-prose grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <SectionHeader
            eyebrow="The Palantir gap"
            title="It is not a platform problem."
          />
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-ink-300 md:text-lg">
              <p>
                Palantir Foundry is among the most capable operational
                intelligence platforms available to enterprise buyers. The
                reason so many deployments underperform has nothing to do with
                the software.
              </p>
              <p className="text-ink-100">It has to do with the Ontology.</p>
              <p>
                Too many organizations invest in the license before investing
                in the architectural thinking that determines what the platform
                can actually do. The result is predictable: siloed pipelines
                that don&apos;t connect, adoption that stalls at the analyst
                layer, and dashboards that report on the past instead of
                enabling the future.
              </p>
              <p>
                The Ontology is not a technical artifact. It is the operational
                model of your business expressed in software. Designed with
                precision, every capability built on top of it compounds.
                Designed as an afterthought, no additional investment closes
                the gap.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS — light band */}
      <section className="section-light relative py-24 md:py-32">
        <div className="container-prose">
          <div className="eyebrow mb-10">By the numbers</div>
          <div className="grid gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="flex flex-col border-l-2 border-sky-500 pl-6">
                  <span className="font-mono text-5xl font-medium tracking-tight text-navy-900 md:text-6xl">
                    <Counter value={s.value} />
                  </span>
                  <span className="mt-4 text-sm text-navy-700">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="container-prose py-24 md:py-32">
        <SectionHeader
          eyebrow="Three ways we accelerate"
          title="We don't build service lines around what consultants know how to deliver."
          body="We build them around what enterprises consistently fail to achieve with Palantir Foundry — and we design each service to eliminate that failure mode."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                href={`/services#${s.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-ink-100/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 transition-all hover:border-sky-500/40 hover:shadow-float"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-mint-400">
                    Service {s.number}
                  </span>
                  <ChevronRight className="text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-sky-300" size={18} />
                </div>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink-50">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">
                  {s.tagline}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative overflow-hidden border-y border-ink-100/10 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-violet-glow opacity-60" />
        <div className="container-prose relative">
          <div className="eyebrow mb-10">What our clients say</div>
          <div className="grid gap-10 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="card-surface">
                  <Shield size={18} className="text-mint-400" />
                  <blockquote className="mt-5 text-lg leading-relaxed text-ink-100 md:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-ink-300">
                    <span className="text-ink-100">{t.name}</span> · {t.company}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES — light band */}
      <section className="section-light py-24 md:py-32">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Industries served"
            title="One size fits none."
            body="Each vertical demands a different Ontology. Here is where we have delivered at real operational scale."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-navy-200 bg-navy-200 md:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 0.04}>
                <div className="flex h-full flex-col justify-between bg-white p-8 transition-colors hover:bg-paper-100">
                  <div>
                    <span className="font-mono text-xs text-sky-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-medium text-navy-900">
                      {ind.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-700">
                      {ind.body}
                    </p>
                  </div>
                  <p className="mt-6 border-t border-navy-100 pt-4 font-mono text-xs text-navy-800">
                    {ind.ontology}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
