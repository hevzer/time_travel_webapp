"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/destinations", label: "Destinations" },
  { href: "/reservation", label: "Réservation" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#040913]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-serif text-2xl tracking-wide text-brand-soft">
          TimeTravel Agency
        </Link>
        <button
          type="button"
          className="rounded-md border border-white/20 px-3 py-1 text-sm md:hidden"
          onClick={() => setOpen((state) => !state)}
          aria-expanded={open}
          aria-label="Ouvrir le menu"
        >
          Menu
        </button>
        <nav className="hidden gap-6 text-sm text-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 text-sm text-muted md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
