import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Monitor, Zap, Check } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { trainings, testimonials } from "@/lib/content";

const formats = [
  {
    icon: <Users size={18} />,
    title: "Private Cohort — On-Site",
    best: "Teams of 5–30, fully customized content",
    lead: "4–6 weeks",
  },
  {
    icon: <Monitor size={18} />,
    title: "Private Cohort — Virtual",
    best: "Distributed teams, global organizations",
    lead: "2–4 weeks",
  },
  {
    icon: <GraduationCap size={18} />,
    title: "Group Enrollment",
    best: "Individual practitioners and small teams",
    lead: "Rolling schedule",
  },
  {
    icon: <Zap size={18} />,
    title: "On-Demand Portal",
    best: "Self-directed learners and onboarding",
    lead: "Immediate access",
  },
];

export default function TrainingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <AmbientVideo density={28} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 to-ink-900" />
        <div className="container-prose">
          <Reveal>
            <div className="eyebrow">Training</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-4xl text-[40px] leading-[1.05] md:text-[72px]">
              You invested in Palantir to change how your organization operates.
              We build the internal expertise that makes that change permanent.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-200 md:text-xl">
              The most consistent reason Palantir deployments underperform is
              not technical — it is organizational. Our curriculum is built
              around real use cases and real organizational contexts, not
              vendor documentation repackaged as instruction.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#contact" className="btn-primary">
                Schedule a Private Training <ArrowRight size={16} />
              </Link>
              <Link href="#programs" className="btn-ghost">
                Explore Group Enrollment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMS — light band */}
      <section id="programs" className="section-light py-24 md:py-32">
        <div className="container-prose">
        <SectionHeader
          eyebrow="Programs"
          title="Four programs. Four audiences. One competency standard."
          body="Every Aavya program is designed to a competency specification, not a content checklist. Training is not complete until participants demonstrate the target capabilities — not just complete the scheduled hours."
        />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {trainings.map((t, i) => (
              <Reveal key={t.code} delay={i * 0.06}>
                <div className="card-surface h-full">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-sky-600">{t.code}</span>
                    <span className="rounded-full border border-navy-200 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-navy-700">
                      {t.duration.split("·")[0].trim()}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-medium tracking-tight text-navy-900">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-700">{t.subtitle}</p>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-sky-700">
                    For: {t.audience}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {t.topics.map((topic) => (
                      <li key={topic} className="flex gap-3 text-sm text-navy-800">
                        <Check
                          size={14}
                          className="mt-1 shrink-0 text-sky-500"
                        />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-navy-100 pt-4 text-xs text-navy-600">
                    {t.duration}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY FORMATS */}
      <section className="relative border-y border-ink-100/10 bg-white/[0.015] py-24">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Delivery formats"
            title="Meet your team where they work."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="card-surface h-full">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint-400/15 text-mint-300 ring-1 ring-mint-400/30">
                    {f.icon}
                  </div>
                  <h3 className="mt-5 text-base font-medium text-ink-50">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-300">{f.best}</p>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                    Lead time · {f.lead}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="container-prose py-24">
        <Reveal>
          <figure className="rounded-3xl border border-ink-100/10 bg-gradient-to-br from-violet-500/10 via-ink-800/40 to-mint-400/10 p-10 md:p-16">
            <div className="eyebrow">Field feedback</div>
            <blockquote className="mt-6 text-2xl leading-[1.25] text-ink-50 md:text-4xl">
              &ldquo;{testimonials[2].quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm text-ink-300">
              <span className="text-ink-100">{testimonials[2].name}</span> · {testimonials[2].company}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <CTA
        eyebrow="Learning outcomes commitment"
        title="Schedule a training that builds demonstrable capability."
        body="Before each engagement we define the specific capabilities participants must demonstrate at completion — and we build curriculum, exercises, and assessments around those capabilities."
        primary={{ href: "#contact", label: "Schedule a Private Training" }}
        secondary={{ href: "/services", label: "Pair with Implementation" }}
      />
    </>
  );
}
