import { BookingForm } from "@/components/booking/booking-form";
import { SectionTitle } from "@/components/ui/section-title";

type ReservationPageProps = {
  searchParams: Promise<{ destination?: string }>;
};

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const { destination } = await searchParams;

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
      <SectionTitle
        eyebrow="Réservation"
        title="Construisez votre voyage temporel"
        subtitle="Sélectionnez votre destination, validez votre profil et confirmez les règles de sécurité pour obtenir votre dossier de départ."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-surface p-4 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">Étape 1</p>
          Coordonnées de mission
        </div>
        <div className="rounded-xl border border-white/10 bg-surface p-4 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">Étape 2</p>
          Profil voyageur
        </div>
        <div className="rounded-xl border border-white/10 bg-surface p-4 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-soft">Étape 3</p>
          Validation anti-paradoxe
        </div>
      </div>
      <BookingForm initialDestination={destination} />
    </section>
  );
}
