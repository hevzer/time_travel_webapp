"use client";

import { withBasePath } from "@/lib/base-path";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="aurora-bg grid-overlay relative overflow-hidden border-b border-white/10">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40 motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={withBasePath("/Paris_1889/Paris_1889_16_9.png")}
        aria-hidden
      >
        <source src={withBasePath("/Paris_1889/Paris_1889_Video.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,13,26,0.9),rgba(8,18,32,0.55),rgba(14,33,52,0.9))]" />
      <motion.div
        aria-hidden
        animate={{ x: [0, 26, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-14 h-56 w-56 rounded-full bg-brand/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-14 top-24 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 md:px-8 md:pb-28 md:pt-32"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-soft">
          Agence de voyages temporels
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight text-white md:text-7xl">
          Rejoignez les époques qui ont changé le monde.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          TimeTravel Agency vous accompagne de la sélection de destination à votre retour.
          Paris 1889, Crétacé, Florence 1504 : trois mondes, un seul point de départ.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/destinations"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-[#140b04] transition hover:bg-[#f6a768]"
          >
            Découvrir les destinations
          </Link>
          <Link
            href="/reservation"
            className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
          >
            Planifier mon voyage
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-3 text-xs text-white/85">
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
            Paris 1889 - immersion culturelle
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
            Crétacé - expédition intense
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">
            Florence 1504 - art et élégance
          </span>
        </div>
      </motion.div>
    </section>
  );
}
