"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock } from "@/components/Clock";

const NAV = [
  { href: "/", label: "Rooftop" },
  { href: "/tracks", label: "The Crate" },
  { href: "/about", label: "Manifesto" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-ember/50 bg-black/40">
              <span className="display text-sm text-ember">DHH</span>
            </span>
            <span className="display text-lg leading-none text-cream">
              Desi Hip Hop
            </span>
          </Link>
          <span className="hidden h-7 w-px shrink-0 bg-line sm:block" />
          <span className="hidden shrink-0 sm:inline-flex">
            <Clock />
          </span>
        </div>

        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-ember text-[#160a04]"
                    : "text-muted hover:bg-white/10 hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
