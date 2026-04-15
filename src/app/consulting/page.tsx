import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { engagements, process, testimonials } from "@/lib/content";

const principles = [
  {
    n: "01",
    title: "We deploy what we preach.",
    body: "Aavya runs its own commercial operations on Palantir Foundry and Ontology. Project management, client delivery tracking, resource allocation, and financial reporting all flow through an Ontology our team designed and maintains.",
  },
  {
    n: "02",
    title: "Interconnected use cases create compounding value.",
    body: "A single use case running in isolation is a point solution. Two interconnected use cases sharing Ontological context generate insights that neither can produce alone. Three begin a real operational intelligence capability.",
  },
  {
    n: "03",
    title: "The right problem is usually not the stated problem.",
    body: "We once engaged with a manufacturer focused on automating a three-person manual process. The diagnostic revealed seventeen percent of finished product was being scrapped before delivery — at a cost that dwarfed the automation opportunity.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-20 pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <AmbientVideo density={40} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 to-ink-900" />
        <div className="container-prose">
          <Reveal>
            <div className="eyebrow">Consulting</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-5xl text-[40px] leading-[1.02] md:text-[80px]">
              Enterprise consulting is broken. We are the repair.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-200 md:text-xl">
              The standard model sends junior practitioners, charges senior
              rates, delivers a strategy document, and withdraws before the
              implementation becomes difficult. Our consultants are operators
              who have built and run the systems they now help clients design
              — and they stay through deployment, because that is where the
              real problem-solving occurs.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <blockquote className="mt-10 max-w-3xl border-l-2 border-sky-500 pl-6 text-lg italic text-ink-100">
              The standard we apply to every engagement: would we build this
              the same way if we were running the business ourselves and
              living with the consequences?
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="container-prose py-24">
        <SectionHeader eyebrow="Our consulting philosophy" title="Three principles, held without exception." />
        <div className="mt-16 space-y-4">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.06}>
              <div className="grid gap-8 rounded-2xl border border-ink-100/10 bg-white/[0.02] p-8 transition-all hover:border-sky-500/30 md:grid-cols-[120px_1fr] md:items-start md:p-10">
                <div className="font-mono text-5xl font-medium text-sky-400">
                  {p.n}
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-ink-50 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-300">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ENGAGEMENTS — light band */}
      <section className="section-light py-24 md:py-32">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Engagements"
            title="Four ways to start."
            body="Each engagement is structured for a specific point on the Palantir journey — from pre-investment evaluation to multi-quarter enterprise transformation."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {engagements.map((e, i) => (
              <Reveal key={e.n} delay={i * 0.06}>
                <div className="card-surface h-full">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-sky-600">
                      Engagement {e.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-medium tracking-tight text-navy-900">
                    {e.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-navy-700">
                    {e.body}
                  </p>
                  <p className="mt-6 border-t border-navy-100 pt-4 font-mono text-xs leading-relaxed text-navy-800">
                    {e.deliverables}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-prose py-24">
        <SectionHeader eyebrow="Engagement process" title="Every engagement follows the same structured delivery model." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-100/10 bg-ink-100/10 md:grid-cols-3 lg:grid-cols-6">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.04}>
              <div className="flex h-full flex-col bg-ink-900 p-6">
                <span className="font-mono text-xs text-mint-400">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-medium text-ink-50">
                  {p.step}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-300">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="container-prose py-16">
        <Reveal>
          <figure className="rounded-3xl border border-ink-100/10 bg-gradient-to-br from-violet-500/10 via-ink-800/40 to-mint-400/10 p-10 md:p-16">
            <blockquote className="text-2xl leading-[1.25] text-ink-50 md:text-4xl">
              &ldquo;{testimonials[1].quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm text-ink-300">
              <span className="text-ink-100">{testimonials[1].name}</span> · {testimonials[1].company}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* WHY AAVYA */}
      <section className="container-prose py-24">
        <div className="grid gap-10 rounded-3xl border border-ink-100/10 bg-white/[0.02] p-10 md:grid-cols-[1fr_1.3fr] md:p-16">
          <SectionHeader
            eyebrow="A fair question"
            title="Why not hire directly from Palantir?"
          />
          <div className="space-y-5 text-base leading-relaxed text-ink-300">
            <p>
              Palantir&apos;s own professional services teams are technically
              strong and well-resourced. What they are optimized for is the
              platform — not your business.
            </p>
            <p className="text-ink-100">
              Aavya brings a client-side perspective built from years of
              operating these systems on behalf of enterprises, sector-specific
              operational experience that informs every design decision, and
              the organizational change-management capability that converts a
              technically successful deployment into a business-transforming
              one.
            </p>
            <p>
              We are the team you want working alongside you during
              implementation — and long after Palantir&apos;s own engagement
              has closed.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden border-t border-ink-100/10">
        <div className="absolute inset-0 -z-10">
          <AmbientVideo density={24} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/60 to-ink-900" />
        <div className="container-prose grid gap-14 py-24 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="eyebrow">Tell us what you&apos;re solving</div>
            <h2 className="display mt-4 text-4xl leading-[1.05] md:text-6xl">
              Request a proposal.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-300">
              A focused conversation, not a sales presentation. Share the
              context and we will respond with a clear next step within two
              business days.
            </p>
            <div className="mt-10 space-y-4 text-sm text-ink-200">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-mint-400" />
                <a href="mailto:ontologize@aavya.com">ontologize@aavya.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-mint-400" />
                <span>+1 (415) 000-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-mint-400" />
                <span>Operating globally — HQ: USA</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="card-surface space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your full name" />
                <Field label="Company" name="company" placeholder="Organization" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Email" name="email" type="email" placeholder="you@company.com" />
                <Field label="Role" name="role" placeholder="Your title" />
              </div>
              <div>
                <label className="eyebrow mb-2 block">What are you solving?</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-ink-100/10 bg-ink-950/60 p-4 text-sm text-ink-100 placeholder:text-ink-400 focus:border-violet-500 focus:outline-none"
                  placeholder="Briefly describe the engagement you're considering."
                />
              </div>
              <button
                type="button"
                className="btn-primary w-full justify-center"
              >
                Request a Proposal <ArrowRight size={16} />
              </button>
              <p className="text-xs text-ink-400">
                By submitting this form you agree to our privacy policy.
                We&apos;ll respond within two business days.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-2 block">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-100/10 bg-ink-950/60 p-3 text-sm text-ink-100 placeholder:text-ink-400 focus:border-violet-500 focus:outline-none"
      />
    </div>
  );
}
