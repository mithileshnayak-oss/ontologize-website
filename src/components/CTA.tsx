import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { AmbientVideo } from "./AmbientVideo";

export function CTA({
  eyebrow = "Get in touch",
  title = "Tell us what you're trying to solve.",
  body = "Whether you are at the beginning of your Palantir journey or three years into a deployment that isn't delivering, we are ready to engage. The right starting point is a focused conversation — not a sales presentation.",
  primary = { href: "/consulting#contact", label: "Book a 30-Minute Discovery Call" },
  secondary = { href: "/services", label: "Download Capabilities Overview" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="absolute inset-0">
        <AmbientVideo density={22} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/60 to-ink-900" />
      <div className="container-prose relative">
        <Reveal>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="display mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            {body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={primary.href} className="btn-primary">
              <Phone size={16} /> {primary.label}
            </Link>
            <Link href={secondary.href} className="btn-ghost">
              {secondary.label} <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
