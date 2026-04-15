import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-prose flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="eyebrow">404</div>
      <h1 className="display mt-4 text-4xl md:text-6xl">
        This page is off the Ontology.
      </h1>
      <p className="mt-4 max-w-lg text-ink-300">
        The link you followed does not resolve. Head back to the homepage or
        explore the practice.
      </p>
      <Link href="/" className="btn-primary mt-10">
        Back to home
      </Link>
    </section>
  );
}
