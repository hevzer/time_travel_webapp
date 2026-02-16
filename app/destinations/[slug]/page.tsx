import { destinationBySlug, destinations } from "@/data/destinations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DestinationScene } from "@/components/destinations/destination-scene";
import { DestinationMediaGallery } from "@/components/destinations/destination-media-gallery";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div className={`rounded-3xl border bg-gradient-to-br p-8 ${destination.ambienceClass}`}>
        <p className="text-xs uppercase tracking-[0.26em] text-brand-soft">{destination.period}</p>
        <h1 className="mt-4 font-serif text-5xl text-white">{destination.name}</h1>
        <p className="mt-4 max-w-3xl text-base text-white/85">{destination.description}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/90">
          <span className="rounded-full border border-white/35 px-3 py-1">
            Risque {destination.riskLevel}
          </span>
          <span className="rounded-full border border-white/35 px-3 py-1">
            Fenêtre idéale : {destination.bestWindow}
          </span>
          <span className="rounded-full border border-white/35 px-3 py-1">
            {destination.budgetLabel}
          </span>
        </div>
      </div>

      <DestinationScene destination={destination} />
      <DestinationMediaGallery destination={destination} />

      <article className="mt-6 rounded-2xl border border-white/10 bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-soft">
          Trame narrative
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#091526] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Jour 01</p>
            <p className="mt-2 text-sm text-white">Briefing, adaptation locale et premier repère historique.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#091526] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Jour 02+</p>
            <p className="mt-2 text-sm text-white">
              Immersion active avec itinéraire sur mesure et supervision guide.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#091526] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Retour</p>
            <p className="mt-2 text-sm text-white">
              Extraction stabilisée, débrief complet et remise de dossier mission.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-semibold text-white">Moments forts</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {destination.highlights.map((highlight) => (
              <li key={highlight}>• {highlight}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-semibold text-white">Règles à respecter</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {destination.rules.map((rule) => (
              <li key={rule}>• {rule}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="font-semibold text-white">Préparation conseillée</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {destination.packing.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-white/10 bg-surface p-6">
        <h2 className="font-semibold text-white">FAQ destination</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {destination.faq.map((entry) => (
            <div key={entry.question} className="rounded-xl border border-white/10 bg-[#091526] p-4">
              <h3 className="text-sm font-semibold text-white">{entry.question}</h3>
              <p className="mt-2 text-sm text-muted">{entry.answer}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-8">
        <Link
          href={`/reservation?destination=${destination.slug}`}
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-[#25140a]"
        >
          Planifier ce voyage
        </Link>
      </div>
    </section>
  );
}
