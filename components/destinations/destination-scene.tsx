import { withBasePath } from "@/lib/base-path";
import type { Destination } from "@/lib/types";
import Image from "next/image";

const sceneContent = {
  "paris-1889": {
    title: "Salon des inventions",
    caption:
      "Une soirée privée au pied de la tour Eiffel, entre pavillons électriques et orchestres Belle Époque.",
    palette: "from-amber-300/30 via-orange-400/20 to-cyan-300/20",
    badges: ["Guide historien", "Accès privé", "Belle Époque"],
  },
  cretace: {
    title: "Fenêtre paléontologique",
    caption:
      "Observation en dôme camouflé, survol de forêts primitives et protocole de sécurité renforcé.",
    palette: "from-emerald-300/30 via-lime-300/20 to-sky-400/25",
    badges: ["Capsule Anchor+", "Mode silence", "Expédition intense"],
  },
  "florence-1504": {
    title: "Atelier renaissance",
    caption:
      "Parcours artistique au cœur de Florence, entre ateliers, palais et rencontres culturelles.",
    palette: "from-rose-300/25 via-amber-300/25 to-blue-300/20",
    badges: ["Immersion culturelle", "Rythme flexible", "Élégance italienne"],
  },
} as const;

type DestinationSceneProps = {
  destination: Destination;
};

export function DestinationScene({ destination }: DestinationSceneProps) {
  const scene = sceneContent[destination.slug as keyof typeof sceneContent];

  return (
    <article
      className={`relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-7 md:p-8 ${scene.palette}`}
    >
      <Image
        src={withBasePath(destination.media.heroImage)}
        alt={`Scene hero - ${destination.name}`}
        fill
        sizes="(max-width: 768px) 100vw, 1200px"
        loading="lazy"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(4,10,19,0.8),rgba(4,10,19,0.52),rgba(4,10,19,0.86))]" />
      <div className="absolute -right-16 top-8 h-44 w-44 rounded-full border border-white/20 bg-white/10 blur-sm" />
      <div className="absolute -left-10 bottom-6 h-32 w-32 rounded-full border border-white/15 bg-white/10 blur-sm" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-soft">
          Scène recommandée
        </p>
        <h2 className="mt-3 font-serif text-4xl text-white">{scene.title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85">{scene.caption}</p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-white">
          {scene.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
