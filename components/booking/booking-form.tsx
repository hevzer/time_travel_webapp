"use client";

import { destinations } from "@/data/destinations";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type FormState = {
  destination: string;
  departureDate: string;
  durationDays: number;
  travelers: number;
  email: string;
  style: "Culture" | "Aventure" | "Prestige";
  budget: "Essentiel" | "Confort" | "Signature";
  consentRules: boolean;
  consentHealth: boolean;
};

const makeBookingId = () => `TTA-2026-${Math.floor(Math.random() * 900000 + 100000)}`;

type BookingFormProps = {
  initialDestination?: string;
};

export function BookingForm({ initialDestination = "paris-1889" }: BookingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDestinationFromQuery = searchParams.get("destination");
  const selectedInitialDestination =
    initialDestinationFromQuery &&
    destinations.some((destination) => destination.slug === initialDestinationFromQuery)
      ? initialDestinationFromQuery
      : initialDestination;

  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>({
    destination: selectedInitialDestination,
    departureDate: "",
    durationDays: 3,
    travelers: 1,
    email: "",
    style: "Culture",
    budget: "Confort",
    consentRules: false,
    consentHealth: false,
  });

  const selectedDestination = useMemo(
    () => destinations.find((destination) => destination.slug === state.destination),
    [state.destination],
  );

  const validateStep = () => {
    if (step === 1) {
      if (!state.destination || !state.departureDate) {
        setError("Sélectionnez une destination et une date de départ.");
        return false;
      }
      if (state.travelers < 1) {
        setError("Le nombre de voyageurs doit être au moins 1.");
        return false;
      }
    }

    if (step === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
        setError("Renseignez une adresse email valide.");
        return false;
      }
    }

    if (step === 3) {
      if (!state.consentHealth || !state.consentRules) {
        setError("Vous devez accepter les conditions de voyage temporel.");
        return false;
      }
    }

    setError(null);
    return true;
  };

  const onNext = () => {
    if (validateStep()) {
      setStep((current) => Math.min(current + 1, 3));
    }
  };

  const onBack = () => {
    setError(null);
    setStep((current) => Math.max(current - 1, 1));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;

    const bookingId = makeBookingId();
    const query = new URLSearchParams({
      bookingId,
      destination: selectedDestination?.name ?? "Destination",
      date: state.departureDate,
      travelers: String(state.travelers),
      duration: String(state.durationDays),
      email: state.email,
    });

    router.push(`/reservation/confirmation?${query.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-white/10 bg-surface p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
        <span className={step >= 1 ? "text-brand-soft" : ""}>01 Coordonnées</span>
        <span>/</span>
        <span className={step >= 2 ? "text-brand-soft" : ""}>02 Profil</span>
        <span>/</span>
        <span className={step >= 3 ? "text-brand-soft" : ""}>03 Validation</span>
      </div>

      {step === 1 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted">
            Destination
            <select
              value={state.destination}
              onChange={(event) => setState((current) => ({ ...current, destination: event.target.value }))}
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            >
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.slug}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Date de départ (temps présent)
            <input
              type="date"
              value={state.departureDate}
              onChange={(event) =>
                setState((current) => ({ ...current, departureDate: event.target.value }))
              }
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Durée (jours)
            <select
              value={state.durationDays}
              onChange={(event) =>
                setState((current) => ({ ...current, durationDays: Number(event.target.value) }))
              }
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            >
              {(selectedDestination?.durationOptions ?? [3, 7, 14]).map((duration) => (
                <option key={duration} value={duration}>
                  {duration} jours
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Nombre de voyageurs
            <input
              type="number"
              min={1}
              max={8}
              value={state.travelers}
              onChange={(event) =>
                setState((current) => ({ ...current, travelers: Number(event.target.value) }))
              }
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            />
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted md:col-span-2">
            Email de contact
            <input
              type="email"
              value={state.email}
              onChange={(event) => setState((current) => ({ ...current, email: event.target.value }))}
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Style de voyage
            <select
              value={state.style}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  style: event.target.value as FormState["style"],
                }))
              }
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            >
              <option value="Culture">Culture</option>
              <option value="Aventure">Aventure</option>
              <option value="Prestige">Prestige</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            Budget
            <select
              value={state.budget}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  budget: event.target.value as FormState["budget"],
                }))
              }
              className="rounded-xl border border-white/15 bg-[#091422] px-4 py-3 text-white"
            >
              <option value="Essentiel">Essentiel</option>
              <option value="Confort">Confort</option>
              <option value="Signature">Signature</option>
            </select>
          </label>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-[#081322] p-4">
          <p className="text-sm text-muted">
            Récapitulatif : {selectedDestination?.name}, {state.durationDays} jours, {state.travelers}{" "}
            voyageur(s), départ {state.departureDate || "-"}.
          </p>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={state.consentRules}
              onChange={(event) =>
                setState((current) => ({ ...current, consentRules: event.target.checked }))
              }
            />
            J&apos;accepte les règles de non-interférence temporelle.
          </label>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={state.consentHealth}
              onChange={(event) =>
                setState((current) => ({ ...current, consentHealth: event.target.checked }))
              }
            />
            Je confirme ma déclaration de santé et les protocoles biologiques.
          </label>
        </div>
      ) : null}

      {error ? <p className="mt-4 text-sm text-[#ffb6a1]">{error}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white"
          >
            Retour
          </button>
        ) : null}
        {step < 3 ? (
          <button
            type="button"
            onClick={onNext}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#211208]"
          >
            Continuer
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-[#211208]"
          >
            Confirmer la réservation
          </button>
        )}
      </div>
    </form>
  );
}
