"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/lib/content";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import clsx from "clsx";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-100/10 bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-prose flex h-[72px] items-center justify-between">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            const active =
              n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={clsx(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "text-ink-50"
                      : "text-ink-300 hover:text-ink-50"
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]" />
                  )}
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/consulting#contact" className="btn-primary">
            Book a Discovery Call <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-ink-100/15 p-2 text-ink-100"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-ink-100/10 bg-ink-900/95 backdrop-blur-xl">
          <ul className="container-prose flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-ink-100 hover:bg-white/[0.04]"
                >
                  {n.label}
                  <ArrowUpRight size={16} className="opacity-50" />
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/consulting#contact" className="btn-primary w-full justify-center">
                Book a Discovery Call
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
