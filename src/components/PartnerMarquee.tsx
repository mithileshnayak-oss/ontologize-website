const partners = [
  "Palantir Foundry",
  "Apollo",
  "AIP",
  "Gotham",
  "Snowflake",
  "Databricks",
  "AWS",
  "Azure",
  "GCP",
  "Kafka",
];

export function PartnerMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-ink-100/10 bg-white/[0.015] py-10">
      <p className="container-prose mb-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink-400">
        Deployed across Fortune 500 enterprises and federal programs
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex min-w-full shrink-0 animate-[shimmer_30s_linear_infinite] items-center justify-around gap-16 whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={i}
              className="font-mono text-sm uppercase tracking-[0.25em] text-ink-300"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
