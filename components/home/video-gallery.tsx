import { LazyVideo } from "@/components/media/lazy-video";
import { destinations } from "@/data/destinations";

export function VideoGallery() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-soft">Galerie vidéo</p>
      <h2 className="mt-3 font-serif text-4xl text-white">Captures temporelles officielles</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Les vidéos sont chargées à l&apos;approche de la zone visible pour limiter le poids initial de
        la page.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {destinations.map((destination) => (
          <article key={destination.id} className="overflow-hidden rounded-2xl border border-white/10 bg-surface p-3">
            <LazyVideo
              src={destination.media.video}
              poster={destination.media.heroImage}
              title={`Capture vidéo - ${destination.name}`}
              className="aspect-[16/10] overflow-hidden rounded-xl"
              autoPlay
              loop
              controls
            />
            <div className="px-1 pb-1 pt-3">
              <h3 className="font-semibold text-white">{destination.name}</h3>
              <p className="mt-1 text-xs text-muted">{destination.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
