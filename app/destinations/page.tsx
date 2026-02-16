import { DestinationGrid } from "@/components/destinations/destination-grid";
import { SectionTitle } from "@/components/ui/section-title";

export default function DestinationsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <SectionTitle
        eyebrow="Catalogue"
        title="Choisissez votre destination temporelle"
        subtitle="Chaque itinéraire est encadré par nos protocoles de sécurité, avec un niveau de personnalisation adapté à votre profil voyageur."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-surface p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">Fenêtre active</p>
          <p className="mt-2 text-2xl font-semibold text-white">03 époques</p>
          <p className="mt-2 text-sm text-muted">Disponibles pour la prochaine vague de départ.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">Personnalisation</p>
          <p className="mt-2 text-2xl font-semibold text-white">100% modulable</p>
          <p className="mt-2 text-sm text-muted">Rythme, confort, priorités culturelles ou aventure.</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">Sécurité</p>
          <p className="mt-2 text-2xl font-semibold text-white">Ancrage continu</p>
          <p className="mt-2 text-sm text-muted">Surveillance et protocole de retour automatisé.</p>
        </article>
      </div>
      <div className="mt-8">
        <DestinationGrid />
      </div>
    </section>
  );
}
