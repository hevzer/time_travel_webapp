import { SectionTitle } from "@/components/ui/section-title";
import { globalFaq } from "@/data/faq";
import Link from "next/link";

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <SectionTitle
        eyebrow="Assistance"
        title="Questions fréquentes"
        subtitle="Retrouvez les réponses essentielles avant votre départ. Pour un conseil personnalisé, utilisez le bouton Agent IA en bas de page."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {globalFaq.map((entry) => (
          <article key={entry.question} className="rounded-2xl border border-white/10 bg-surface p-6">
            <h2 className="text-lg font-semibold text-white">{entry.question}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{entry.answer}</p>
          </article>
        ))}
      </div>
      <article className="mt-8 rounded-2xl border border-white/10 bg-surface-soft p-6 md:flex md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.23em] text-brand-soft">
            Besoin d&apos;un conseil direct ?
          </p>
          <p className="mt-2 text-sm text-muted">
            Ouvrez le panneau Agent IA pour une réponse immédiate, ou lancez directement votre
            réservation.
          </p>
        </div>
        <Link
          href="/reservation"
          className="mt-4 inline-block rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#25150a] md:mt-0"
        >
          Démarrer la réservation
        </Link>
      </article>
    </section>
  );
}
