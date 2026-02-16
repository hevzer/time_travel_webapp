import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-serif text-2xl text-brand-soft">TimeTravel Agency</p>
          <p className="mt-3 text-sm text-muted">
            Voyages temporels immersifs, protocoles certifiés, assistance IA en continu.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white">Explorer</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
            <Link href="/destinations">Destinations</Link>
            <Link href="/reservation">Planifier un voyage</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white">Confiance</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Régulation temporelle conforme GTA-9</li>
            <li>Retour ancré garanti</li>
            <li>Support 24h/24 sur ligne temporelle dédiée</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-muted">
        © 2026 TimeTravel Agency. Tous droits réservés.
      </div>
    </footer>
  );
}
