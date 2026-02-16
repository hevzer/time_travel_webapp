import { LazyVideo } from "@/components/media/lazy-video";
import type { Destination } from "@/lib/types";
import Image from "next/image";

type DestinationMediaGalleryProps = {
  destination: Destination;
};

export function DestinationMediaGallery({ destination }: DestinationMediaGalleryProps) {
  return (
    <article className="mt-6 rounded-2xl border border-white/10 bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-soft">Galerie média</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Visuels et vidéo de mission</h2>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-white/10 lg:col-span-2">
          <LazyVideo
            src={destination.media.video}
            poster={destination.media.heroImage}
            title={`Vidéo destination - ${destination.name}`}
            className="aspect-video"
            autoPlay
            loop
            controls
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <figure className="relative aspect-square overflow-hidden rounded-xl border border-white/10">
            <Image
              src={destination.media.squareImage}
              alt={`Visuel carré - ${destination.name}`}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover"
            />
          </figure>
          <figure className="relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 sm:aspect-square lg:aspect-[9/16]">
            <Image
              src={destination.media.portraitImage}
              alt={`Visuel portrait - ${destination.name}`}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover"
            />
          </figure>
        </div>
      </div>
    </article>
  );
}
