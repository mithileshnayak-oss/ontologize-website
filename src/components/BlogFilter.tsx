"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Clock, Search } from "lucide-react";
import { Reveal } from "./Reveal";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
};

export function BlogFilter({ articles }: { articles: Article[] }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.tags))),
    [articles]
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return articles.filter((a) => {
      if (tag && !a.tags.includes(tag)) return false;
      if (!query) return true;
      return (
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [articles, q, tag]);

  return (
    <div>
      <div className="mb-10 grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search insights — Ontology, AIP, scalability…"
            className="w-full rounded-full border border-ink-100/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-ink-100 placeholder:text-ink-400 focus:border-sky-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag(null)}
            className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              !tag
                ? "border-sky-400 bg-sky-500/20 text-sky-200"
                : "border-ink-100/10 bg-white/[0.03] text-ink-300 hover:text-ink-100"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t === tag ? null : t)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                tag === t
                  ? "border-sky-400 bg-sky-500/20 text-sky-200"
                  : "border-ink-100/10 bg-white/[0.03] text-ink-300 hover:text-ink-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-ink-400">
          No insights match those filters.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {filtered.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${a.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-ink-100/10 bg-white/[0.02] transition-all hover:border-sky-500/40 hover:bg-white/[0.04]"
              >
                <div className="h-44 w-full bg-gradient-to-br from-sky-500/25 via-navy-800/60 to-mint-400/10" />
                <div className="p-7">
                  <div className="flex items-center gap-2 text-xs text-ink-400">
                    <Clock size={12} /> {a.readTime}
                  </div>
                  <h3 className="mt-4 text-lg font-medium tracking-tight text-ink-50">
                    {a.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-300">
                    {a.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {a.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink-100/10 bg-ink-900 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
