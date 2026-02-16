"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Choisissez votre époque",
    description:
      "Comparez les ambiances, le niveau de risque et les itinéraires proposés pour Paris 1889, Crétacé et Florence 1504.",
  },
  {
    title: "Personnalisez le voyage",
    description:
      "Notre agent IA mock affine la recommandation selon votre budget, votre style et votre niveau de confort.",
  },
  {
    title: "Départ sécurisé",
    description:
      "Validation automatisée, briefing anti-paradoxe, puis transit temporel avec protocole de retour ancré.",
  },
];

export function Process() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-surface p-6"
          >
            <p className="text-sm font-semibold text-brand-soft">0{index + 1}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
