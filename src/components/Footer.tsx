"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ArrowUpRight, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-ink-100/10 bg-ink-950">
      <div className="absolute inset-0 bg-violet-glow opacity-40" />
      <div className="relative">
        <div className="container-prose grid gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-300">
              Aavya&apos;s Ontology practice. Precision Ontology design,
              hands-on Palantir Foundry delivery, and training that builds
              lasting internal capability.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <SocialLink href="#" label="LinkedIn"><Linkedin size={16} /></SocialLink>
              <SocialLink href="#" label="Twitter"><Twitter size={16} /></SocialLink>
              <SocialLink href="#" label="GitHub"><Github size={16} /></SocialLink>
            </div>
          </div>
          <FooterCol
            title="Practice"
            links={[
              { href: "/services", label: "Services" },
              { href: "/consulting", label: "Consulting" },
              { href: "/training", label: "Training" },
              { href: "/blog", label: "Insights" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "/about", label: "About Aavya" },
              { href: "/about#values", label: "Values" },
              { href: "/about#leadership", label: "Leadership" },
              { href: "/consulting#contact", label: "Contact" },
            ]}
          />
          <FooterCol
            title="Industries"
            links={[
              { href: "/services#industries", label: "Defense & Intelligence" },
              { href: "/services#industries", label: "Manufacturing" },
              { href: "/services#industries", label: "Financial Services" },
              { href: "/services#industries", label: "Energy & Utilities" },
            ]}
          />
        </div>

        <div className="hairline" />

        <div className="container-prose flex flex-col gap-4 py-8 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Aavya. ontology.aavya.com. Confidential &amp; proprietary.
          </p>
          <div className="flex gap-6">
            <Link href="#">Privacy</Link>
            <Link href="#">Security</Link>
            <Link href="#">Modern Slavery Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint-400">
        {title}
      </div>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-ink-50"
            >
              {l.label}
              <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-100/15 text-ink-200 transition-colors hover:border-violet-500 hover:text-violet-300"
    >
      {children}
    </a>
  );
}
