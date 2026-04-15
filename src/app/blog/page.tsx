import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { BlogFilter } from "@/components/BlogFilter";
import { articles } from "@/lib/content";

const pillars = [
  {
    title: "Ontology Architecture",
    body: "Deep technical content for Foundry architects and senior engineers.",
  },
  {
    title: "Enterprise AI Strategy",
    body: "Perspective on AI investment, architecture, and the evolving data landscape.",
  },
  {
    title: "Platform ROI & Use Cases",
    body: "Concrete examples of what organizations achieve with Palantir.",
  },
  {
    title: "Training & Enablement",
    body: "Curriculum updates, course previews, and learning frameworks.",
  },
  {
    title: "Field Notes",
    body: "First-person observations from live enterprise deployments.",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <AmbientVideo density={26} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900/40 to-ink-900" />
        <div className="container-prose">
          <Reveal>
            <div className="eyebrow">Blog &amp; Insights</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-4xl text-[40px] leading-[1.05] md:text-[72px]">
              Field intelligence for practitioners who build on Palantir.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-200 md:text-xl">
              Specific observations from specific deployments — the patterns
              that recur, the design decisions that separate high-performing
              Ontologies from failing ones, and the organizational dynamics
              that determine whether a technology transformation succeeds.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-prose py-16">
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-ink-100/10 bg-gradient-to-br from-violet-500/15 via-ink-800/40 to-mint-400/10 p-10 transition-all hover:border-violet-500/40 hover:shadow-float md:p-16"
          >
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <div className="eyebrow">Featured article</div>
                <h2 className="display mt-5 text-3xl leading-[1.1] md:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-ink-300">
                  <Clock size={14} /> {featured.readTime}
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink-100/10 bg-white/[0.03] px-3 py-1 font-mono uppercase tracking-widest"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-start md:justify-end">
                <span className="btn-primary">
                  Read article <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ARTICLES GRID — filterable */}
      <section className="container-prose pb-24">
        <BlogFilter articles={rest} />
      </section>

      {/* PILLARS */}
      <section className="relative border-y border-ink-100/10 bg-white/[0.015] py-24">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Content pillars"
            title="Five strategic pillars behind everything we publish."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-100/10 bg-ink-100/10 md:grid-cols-5">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="flex h-full flex-col bg-ink-900 p-6">
                  <span className="font-mono text-xs text-mint-400">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-medium text-ink-50">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-300">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Subscribe"
        title="Field notes from live Palantir engagements — in your inbox."
        body="Two articles per month, one weekly cadence during active campaigns. No marketing. No repackaged vendor copy. Practitioner observations only."
        primary={{ href: "#contact", label: "Subscribe" }}
        secondary={{ href: "/consulting#contact", label: "Talk to a Practitioner" }}
      />
    </>
  );
}
