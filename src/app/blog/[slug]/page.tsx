import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <article className="container-prose pb-16 pt-24 md:pt-28">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-ink-100"
        >
          <ArrowLeft size={14} /> Back to all insights
        </Link>
        <Reveal>
          <div className="eyebrow mt-10">Insight</div>
          <h1 className="display mt-5 max-w-4xl text-[34px] leading-[1.08] md:text-[64px]">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-ink-300">
            <Clock size={14} /> {article.readTime}
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink-100/10 bg-white/[0.03] px-3 py-1 font-mono uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 h-64 w-full rounded-3xl bg-gradient-to-br from-violet-500/25 via-ink-700/50 to-mint-400/15 ring-1 ring-white/5 md:h-96" />
        <Reveal delay={0.1}>
          <div className="prose prose-invert mx-auto mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-ink-200 md:text-lg">
            <p className="text-xl text-ink-100">{article.excerpt}</p>
            <p>
              The Ontology is not a feature of the Palantir platform. It is the
              architectural foundation that determines what every AI capability
              built on top of it can accomplish. When well-structured, it gives
              language model outputs the operational context needed to
              generate actionable intelligence rather than plausible text.
            </p>
            <h2 className="pt-4 text-2xl font-medium text-ink-50">
              What changes when the Ontology is designed with precision
            </h2>
            <p>
              The organizations that are generating real AI returns have
              structured their data foundations differently from those that
              are not. The difference is not investment level. It is
              architectural thinking applied before the platform is deployed,
              and maintained ruthlessly as the business evolves.
            </p>
            <p>
              Across client engagements we observe a recurring pattern: the
              design decisions that look optional during discovery are the
              exact decisions that constrain AI readiness two years later. We
              recommend investing in Ontology clarity at the earliest possible
              stage — long before the first AIP configuration is written.
            </p>
            <h2 className="pt-4 text-2xl font-medium text-ink-50">
              A practical assessment framework
            </h2>
            <p>
              If you are evaluating where your current architecture sits, start
              by mapping three dimensions: semantic fidelity to business
              operations, coverage of critical object types, and the clarity of
              your action-type model. Gaps in any of these translate directly
              to ceilings on AI-driven automation.
            </p>
            <blockquote className="border-l-2 border-violet-500 pl-6 text-xl italic text-ink-100">
              AI systems that process fragmented, semantically disconnected
              data can produce outputs. They cannot produce intelligence.
            </blockquote>
            <p>
              The path forward is not another model. It is a structured
              remediation of the semantic layer — and a commitment to maintain
              that layer as a first-class operational asset.
            </p>
          </div>
        </Reveal>
      </article>

      <CTA
        eyebrow="Continue the conversation"
        title="Ready to assess your own Ontology?"
        body="Our Palantir Readiness Assessment is a focused two-week diagnostic that identifies exactly where your current architecture sits — and what the remediation path looks like."
        primary={{ href: "/consulting#contact", label: "Schedule a Readiness Assessment" }}
        secondary={{ href: "/blog", label: "More Insights" }}
      />
    </>
  );
}
