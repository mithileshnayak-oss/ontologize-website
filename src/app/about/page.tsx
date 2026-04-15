import { AmbientVideo } from "@/components/AmbientVideo";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { OntologyGraph } from "@/components/OntologyGraph";
import { values } from "@/lib/content";
import { Linkedin } from "lucide-react";

const leaders = [
  {
    name: "The Founding Partners",
    role: "Ex-Palantir Engineers",
    bio: "Spent years inside Palantir's delivery engine shipping Foundry to the largest commercial and federal buyers. Ontology is the practice we wished existed when we were on the client side.",
    expertise: ["Ontology architecture", "AIP deployment", "Federal delivery"],
  },
  {
    name: "Data Architecture Leadership",
    role: "Principal Architects",
    bio: "Two decades of production experience across industrial manufacturing, financial services, and defense — with the instinct to name the real problem before touching the keyboard.",
    expertise: ["Pipeline engineering", "Platform governance", "Scale patterns"],
  },
  {
    name: "Training & Enablement",
    role: "Curriculum Lead",
    bio: "Designed the Foundry curricula used inside multiple Fortune 100 enablement teams. Believes real competency is a demonstrated capability — not a completed module.",
    expertise: ["Learning design", "Technical mentoring", "Private cohorts"],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-20 pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-900/50 to-ink-900" />
        <div className="container-prose">
          <Reveal>
            <div className="eyebrow">About Aavya &middot; Ontology</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-6 max-w-4xl text-[40px] leading-[1.05] md:text-[72px]">
              We are operators first. Advisors when it matters.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-200 md:text-xl">
              Aavya was founded on a specific frustration with how enterprise
              technology consulting works. The Ontology practice exists as a
              deliberate alternative: former Palantir engineers, experienced
              data architects, and delivery leads who have operated inside some
              of the most demanding environments in the commercial and
              government sectors. We do not subcontract accountability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section className="relative overflow-hidden border-y border-ink-100/10 bg-white/[0.02] py-24">
        <div className="absolute inset-0 opacity-60">
          <AmbientVideo density={22} />
        </div>
        <div className="container-prose relative grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <SectionHeader eyebrow="Our story" title="Built by practitioners, for practitioners." />
          <Reveal delay={0.08}>
            <div className="space-y-5 text-base leading-relaxed text-ink-300 md:text-lg">
              <p>
                Aavya was built by practitioners who had witnessed — repeatedly
                — the gap between what Palantir can accomplish and what most
                organizations are able to unlock on their own. We saw
                enterprises invest significantly in platform licenses while
                struggling to articulate a coherent Ontology strategy, train
                their internal teams, or move past the pilot phase into
                integrated operations.
              </p>
              <p>
                We founded Ontology to address that gap specifically. It
                represents the convergence of two disciplines rarely combined
                in the same organization: deep Palantir technical fluency and
                the organizational change-management expertise that determines
                whether a technology transformation succeeds or stalls. We
                deliver them as one integrated capability.
              </p>
              <p className="text-ink-100">
                We run our own operations on Palantir Foundry and Ontology.
                Every methodology we bring to a client engagement has been
                validated in our own business before we ask you to trust it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIVE ONTOLOGY GRAPH — light band */}
      <section className="section-light py-24 md:py-32">
        <div className="container-prose grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <div className="eyebrow mb-4">We run on our own Ontology</div>
            <h2 className="display text-3xl leading-[1.05] md:text-5xl">
              This is the model we built for our own operations.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-navy-700 md:text-lg">
              Every client engagement, resource allocation, and financial
              signal flows through a live Palantir Ontology we designed and
              maintain. Drag any node. The graph settles — the same way a
              well-structured semantic layer recovers under real operational
              pressure.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-navy-800">
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-navy-800 ring-2 ring-sky-500" />
                Entity (object) types
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-mint-400 ring-2 ring-mint-600" />
                Action types — the kinetic layer
              </li>
              <li className="flex items-center gap-3">
                <span className="h-0.5 w-6 bg-gradient-to-r from-sky-500 to-navy-800" />
                Link types
              </li>
            </ul>
          </div>
          <OntologyGraph />
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="container-prose py-24 md:py-32">
        <SectionHeader
          eyebrow="Our values"
          title="Five standards we hold ourselves to — and bring to yours."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="card-surface h-full">
                <div className="font-mono text-xs text-mint-400">
                  0{i + 1}
                </div>
                <h3 className="mt-4 text-xl font-medium text-ink-50">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="relative border-y border-ink-100/10 bg-white/[0.015] py-24 md:py-32">
        <div className="container-prose">
          <SectionHeader
            eyebrow="Leadership"
            title="Proven operators, not career consultants."
            body="Aavya's leadership spans decades across Palantir product teams, enterprise data engineering, sector-specific operations, and strategic consulting. Every leader has been accountable for outcomes — not just responsible for deliverables."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {leaders.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08}>
                <div className="card-surface h-full">
                  <div className="h-44 w-full rounded-xl bg-gradient-to-br from-violet-500/25 via-ink-700/60 to-mint-400/15 ring-1 ring-white/10" />
                  <h3 className="mt-6 text-xl font-medium text-ink-50">
                    {l.name}
                  </h3>
                  <p className="font-mono text-xs text-mint-400">{l.role}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-300">
                    {l.bio}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {l.expertise.map((e) => (
                      <li
                        key={e}
                        className="rounded-full border border-ink-100/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-200"
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER ECOSYSTEM */}
      <section className="container-prose py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <SectionHeader
            eyebrow="Partner ecosystem"
            title="Alliances built on technical trust."
          />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-300 md:text-lg">
              Aavya holds a formal partnership with Palantir Technologies and
              operates within the Foundry partner ecosystem. Our alliances are
              not commercial referral relationships — they are technical
              partnerships built on a mutual commitment to engineering quality
              and client outcomes. We work alongside complementary
              infrastructure providers, cloud platforms, and integration
              specialists so your Ontology connects to the broader architecture
              of your enterprise.
            </p>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="Come work with us"
        title="Join the team rebuilding enterprise delivery."
        body="We hire practitioners, not consultants. If you have shipped Palantir at scale and are ready to do that work with accountability attached, we want to hear from you."
        primary={{ href: "#contact", label: "Meet the Team" }}
        secondary={{ href: "/services", label: "See How We Engage" }}
      />
    </>
  );
}
