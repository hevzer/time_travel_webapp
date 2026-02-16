import Link from "next/link";

const chapters = [
  {
    phase: "Pré-brief",
    title: "Simulation et calibration",
    description:
      "Nous analysons vos préférences et vos contraintes de voyage avant de verrouiller la fenêtre temporelle.",
  },
  {
    phase: "Transit",
    title: "Insertion sans interférence",
    description:
      "Votre capsule suit des corridors à faible impact historique, avec supervision continue par notre cellule de stabilité.",
  },
  {
    phase: "Retour",
    title: "Débrief et archivage",
    description:
      "Votre parcours est vérifié, puis archivé dans votre dossier voyage avec recommandations pour la prochaine mission.",
  },
];

export function Storyline() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="grid-overlay relative overflow-hidden rounded-3xl border border-white/10 bg-surface-soft p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(241,143,68,0.22),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(78,175,255,0.2),transparent_38%)]" />
        <div className="relative grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-soft">
              Storytelling voyage
            </p>
            <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">
              Un voyage qui se raconte, pas juste une destination.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Chaque mission TimeTravel Agency suit une dramaturgie en trois actes : préparation,
              immersion, retour. Vous profitez de l&apos;émotion historique sans perdre la rigueur
              opérationnelle.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/85">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-2">
                Débrief personnalisé
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-2">
                Trace narrative de mission
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-2">
                Assistance IA continue
              </span>
            </div>
            <Link
              href="/faq"
              className="mt-6 inline-block rounded-full border border-white/25 px-5 py-2 text-sm text-white transition hover:border-white"
            >
              Lire les protocoles
            </Link>
          </div>
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <article key={chapter.phase} className="rounded-2xl border border-white/15 bg-[#0b1a2d]/85 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-soft">
                  Étape 0{index + 1} - {chapter.phase}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{chapter.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{chapter.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
