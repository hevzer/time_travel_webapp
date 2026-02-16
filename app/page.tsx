import { DestinationGrid } from "@/components/destinations/destination-grid";
import { Hero } from "@/components/home/hero";
import { Process } from "@/components/home/process";
import { RecommendationQuiz } from "@/components/home/recommendation-quiz";
import { Storyline } from "@/components/home/storyline";
import { VideoGallery } from "@/components/home/video-gallery";
import { SectionTitle } from "@/components/ui/section-title";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Storyline />
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <SectionTitle
          eyebrow="Destinations"
          title="Trois époques. Trois façons de voyager."
          subtitle="Explorez les expériences temporelles les plus demandées de la saison : culture, aventure et immersion historique."
        />
        <div className="mt-8">
          <DestinationGrid />
        </div>
      </section>
      <VideoGallery />
      <section className="mx-auto max-w-6xl px-5 py-4 md:px-8">
        <RecommendationQuiz />
      </section>
      <section className="mx-auto mb-24 max-w-6xl px-5 md:px-8">
        <div className="rounded-3xl border border-white/10 bg-surface-soft p-8 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-soft">
              Concierge temporel
            </p>
            <h2 className="mt-3 font-serif text-4xl text-white">Passez en mode planification</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Notre parcours de réservation valide vos préférences et génère un dossier
              de voyage cohérent avec les règles de sécurité temporelle.
            </p>
          </div>
          <Link
            href="/reservation"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-[#231309] md:mt-0"
          >
            Commencer la réservation
          </Link>
        </div>
      </section>
    </>
  );
}
