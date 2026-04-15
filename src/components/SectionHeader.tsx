import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="display text-3xl leading-[1.05] md:text-5xl">{title}</h2>
      {body && (
        <p className="mt-5 text-base leading-relaxed text-ink-300 md:text-lg">
          {body}
        </p>
      )}
    </Reveal>
  );
}
