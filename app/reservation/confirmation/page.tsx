import Link from "next/link";

type ConfirmationPageProps = {
  searchParams: Promise<{
    bookingId?: string;
    destination?: string;
    date?: string;
    travelers?: string;
    duration?: string;
    email?: string;
  }>;
};

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const params = await searchParams;

  const bookingId = params.bookingId ?? "TTA-2026-XXXXXX";
  const destination = params.destination ?? "Destination";
  const date = params.date ?? "-";
  const travelers = params.travelers ?? "1";
  const duration = params.duration ?? "3";
  const email = params.email ?? "-";

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
      <article className="rounded-3xl border border-ok/35 bg-ok/10 p-8">
        <p className="text-xs uppercase tracking-[0.26em] text-ok">Confirmation</p>
        <h1 className="mt-3 font-serif text-4xl text-white">Votre dossier est valide</h1>
        <p className="mt-3 text-sm text-muted">
          Merci. Votre réservation a été enregistrée et notre équipe vous enverra le briefing
          final sous 24h.
        </p>
        <p className="mt-6 rounded-xl border border-white/20 bg-[#08192d] px-4 py-3 text-sm text-white">
          Numéro de dossier : <strong>{bookingId}</strong>
        </p>
      </article>

      <article className="mt-6 rounded-2xl border border-white/10 bg-surface p-6">
        <h2 className="text-lg font-semibold text-white">Récapitulatif</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>Destination: {destination}</li>
          <li>Date de départ: {date}</li>
          <li>Durée: {duration} jours</li>
          <li>Voyageurs: {travelers}</li>
          <li>Email de contact: {email}</li>
        </ul>
      </article>

      <article className="mt-6 rounded-2xl border border-white/10 bg-surface-soft p-6">
        <h2 className="text-lg font-semibold text-white">Prochaines étapes</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>Réception du briefing sécurité sous 24h.</li>
          <li>Validation logistique finale 48h avant départ.</li>
          <li>Activation de votre canal Agent IA dédié la veille du voyage.</li>
        </ul>
      </article>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/destinations"
          className="rounded-full border border-white/25 px-5 py-2 text-sm text-white"
        >
          Revoir les destinations
        </Link>
        <Link
          href="/"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#24140a]"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
