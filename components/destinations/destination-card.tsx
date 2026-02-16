"use client";

import { withBasePath } from "@/lib/base-path";
import type { Destination } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type DestinationCardProps = {
  destination: Destination;
};

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`group overflow-hidden rounded-2xl border bg-gradient-to-br p-4 ${destination.ambienceClass} shadow-xl shadow-black/25`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15">
        <Image
          src={withBasePath(destination.media.heroImage)}
          alt={`Visuel principal - ${destination.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,19,0.15),rgba(4,10,19,0.78))]" />
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">{destination.period}</p>
          <p className="rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-[11px] text-white">
            Risque {destination.riskLevel}
          </p>
        </div>
      </div>

      <div className="px-2 pb-2 pt-4">
        <h3 className="font-serif text-3xl text-white">{destination.name}</h3>
        <p className="mt-2 text-sm text-white/85">{destination.subtitle}</p>
        <p className="mt-4 text-sm text-white/80">{destination.teaser}</p>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-brand-soft">{destination.budgetLabel}</p>
          <Link
            href={`/destinations/${destination.slug}`}
            className="rounded-full bg-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/25"
          >
            Explorer
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
