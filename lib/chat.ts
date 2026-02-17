import { destinationBySlug } from "@/data/destinations";
import { recommendDestination } from "@/lib/recommendation";
import type { ChatReply, TravelerProfile } from "@/lib/types";

type DestinationSlug = "paris-1889" | "cretace" | "florence-1504";

const DESTINATION_BASE_PRICE: Record<DestinationSlug, number> = {
  "paris-1889": 3200,
  cretace: 6900,
  "florence-1504": 2800,
};

const DEFAULT_SUGGESTIONS = [
  "Quelle destination me correspond ?",
  "Quels prix pour 2 voyageurs ?",
  "Aide réservation",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

const includesAny = (text: string, patterns: string[]) => patterns.some((pattern) => text.includes(pattern));

const detectDestination = (text: string): DestinationSlug | undefined => {
  if (includesAny(text, ["paris", "1889", "belle epoque", "tour eiffel"])) {
    return "paris-1889";
  }

  if (includesAny(text, ["cretace", "dinosaure", "dino", "prehistor", "-65m", "95 millions"])) {
    return "cretace";
  }

  if (includesAny(text, ["florence", "renaissance", "1504", "michel-ange", "medicis"])) {
    return "florence-1504";
  }

  return undefined;
};

const extractNumber = (text: string, expressions: RegExp[], fallback: number) => {
  for (const expression of expressions) {
    const match = text.match(expression);
    if (match) {
      const parsed = Number(match[1]);
      if (Number.isFinite(parsed) && parsed > 0) {
        return parsed;
      }
    }
  }

  return fallback;
};

const formatCurrency = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} EUR`;

const estimateTripPrice = (text: string, targetDestination?: DestinationSlug) => {
  const destination = targetDestination ?? detectDestination(text) ?? "florence-1504";
  const travelers = extractNumber(
    text,
    [
      /(\d+)\s*(?:voyageurs?|personnes?|adultes?)/,
      /pour\s*(\d+)/,
    ],
    1,
  );
  const days = extractNumber(text, [/(\d+)\s*(?:jours?|nuits?)/], 3);

  const dayFactor =
    days <= 2 ? 0.9 : days <= 3 ? 1 : days <= 7 ? 1.35 : days <= 14 ? 1.8 : 1.8 + (days - 14) * 0.06;
  const comfortFactor = includesAny(text, ["signature", "prestige", "vip"])
    ? 1.32
    : includesAny(text, ["confort", "premium"])
      ? 1.15
      : includesAny(text, ["essentiel", "economique"])
        ? 0.9
        : 1;

  const estimate = Math.round((DESTINATION_BASE_PRICE[destination] * dayFactor * comfortFactor * travelers) / 50) * 50;
  const low = Math.round((estimate * 0.88) / 50) * 50;
  const high = Math.round((estimate * 1.12) / 50) * 50;

  return {
    destination,
    travelers,
    days,
    estimate,
    low,
    high,
  };
};

const destinationLabel = (slug: DestinationSlug) => {
  const destination = destinationBySlug(slug);
  return destination?.name ?? "destination sélectionnée";
};

const resolveTargetDestination = (contextSlug?: string, text?: string): DestinationSlug | undefined => {
  if (contextSlug === "paris-1889" || contextSlug === "cretace" || contextSlug === "florence-1504") {
    return contextSlug;
  }

  if (!text) return undefined;
  return detectDestination(text);
};

export const createChatReply = (
  input: string,
  contextSlug?: string,
  profile?: TravelerProfile,
): ChatReply => {
  const text = normalize(input);
  const targetDestination = resolveTargetDestination(contextSlug, text);

  if (profile && includesAny(text, ["recommande", "conseille", "choisir", "quelle destination"])) {
    const recommendation = recommendDestination(profile);
    return {
      answer: `Excellente question. Je vous recommande ${recommendation.name}. ${recommendation.reason}`,
      suggestions: ["Comparer avec une autre destination", "Quels prix pour cette formule ?"],
      recommendationSlug: recommendation.slug,
    };
  }

  if (
    includesAny(text, [
      "quelle destination",
      "que me conseille",
      "conseillez",
      "premiere fois",
      "debuter",
      "debutant",
    ])
  ) {
    const suggestedDestination = includesAny(text, ["aventure", "intense", "dinosaure"])
      ? "cretace"
      : includesAny(text, ["art", "renaissance", "michel-ange"])
        ? "florence-1504"
        : "paris-1889";

    return {
      answer:
        suggestedDestination === "cretace"
          ? "Si vous recherchez l'adrénaline, je vous conseille le Crétacé: expédition spectaculaire avec encadrement renforcé."
          : suggestedDestination === "florence-1504"
            ? "Pour une première expérience axée art et culture, Florence 1504 est un excellent choix: immersion Renaissance et rythme modulable."
            : "Pour débuter dans les meilleures conditions, Paris 1889 est idéal: immersion culturelle, rythme confortable et ambiance Belle Époque.",
      suggestions: ["Comparer avec une autre époque", "Quel budget pour cette destination ?"],
      recommendationSlug: suggestedDestination,
    };
  }

  if (includesAny(text, ["prix", "budget", "cout", "combien", "tarif"])) {
    const pricing = estimateTripPrice(text, targetDestination);
    const destination = destinationLabel(pricing.destination);

    return {
      answer:
        `${destination} démarre autour de ${formatCurrency(DESTINATION_BASE_PRICE[pricing.destination])} par voyageur. Pour ${pricing.travelers} voyageur(s) sur ${pricing.days} jour(s), je vous estime un budget entre ${formatCurrency(pricing.low)} et ${formatCurrency(pricing.high)} selon le niveau de confort.`,
      suggestions: ["Comparer Paris, Florence et Crétacé", "Aide réservation"],
      recommendationSlug: pricing.destination,
    };
  }

  if (includesAny(text, ["securite", "risque", "danger", "paradoxe", "incident"])) {
    return {
      answer:
        "Votre sécurité est prioritaire: protocole de non-interférence, ancrage bi-temporel actif et retour d'urgence instantané. Le Crétacé inclut en plus un briefing renforcé et une surveillance continue.",
      suggestions: ["Rappelle les règles essentielles", "Quelle destination est la plus accessible ?"],
    };
  }

  if (includesAny(text, ["paris", "1889", "belle epoque", "tour eiffel"])) {
    const destination = destinationBySlug("paris-1889");
    return {
      answer:
        `${destination?.name} est idéale pour une première immersion de luxe: Exposition universelle, ambiance Belle Époque et accès privilégié aux lieux culturels majeurs.`,
      suggestions: ["Quel budget pour Paris 1889 ?", "Réserver Paris 1889"],
      recommendationSlug: "paris-1889",
    };
  }

  if (includesAny(text, ["cretace", "dinosaure", "dino", "prehistor"])) {
    return {
      answer:
        "Le Crétacé est notre expédition la plus intense: observation des dinosaures depuis capsules camouflées Anchor+ et supervision guide en temps réel.",
      suggestions: ["Détails sécurité Crétacé", "Quel budget pour le Crétacé ?"],
      recommendationSlug: "cretace",
    };
  }

  if (includesAny(text, ["florence", "renaissance", "1504", "michel-ange"])) {
    return {
      answer:
        "Florence 1504 est parfaite pour une expérience culturelle raffinée: ateliers d'art, palais de la Renaissance et rythme modulable selon votre style.",
      suggestions: ["Quel budget pour Florence 1504 ?", "Réserver Florence"],
      recommendationSlug: "florence-1504",
    };
  }

  if (includesAny(text, ["reservation", "reserver", "paiement", "acompte", "modifier"])) {
    const target = contextSlug ? `/reservation?destination=${contextSlug}` : "/reservation";
    return {
      answer:
        `Je vous guide en 3 étapes: choix destination, profil voyageur, validation anti-paradoxe. Démarrage ici: ${target}. Les modifications sont possibles jusqu'à 48 h avant départ présent.`,
      suggestions: ["Aller au formulaire", "Quels documents préparer ?"],
      recommendationSlug: contextSlug,
    };
  }

  if (includesAny(text, ["faq", "question frequente", "questions frequentes", "agence", "groupe"])) {
    return {
      answer:
        "FAQ rapide: retour garanti par ancrage bi-temporel, voyage en groupe possible jusqu'à 8 voyageurs par capsule, et assistance concierge avant chaque départ.",
      suggestions: ["Peut-on voyager en groupe ?", "Que se passe-t-il en cas de paradoxe ?"],
    };
  }

  if (includesAny(text, ["quelle epoque", "quelle periode", "hesite", "indecis", "indecise"])) {
    return {
      answer:
        "Pour choisir votre époque: Paris 1889 pour l'élégance culturelle, Florence 1504 pour l'art et la Renaissance, Crétacé pour l'aventure encadrée. Dites-moi votre priorité et je vous propose un itinéraire précis.",
      suggestions: ["Je veux une première expérience", "Je veux une expérience aventure"],
    };
  }

  return {
    answer:
      "Bienvenue chez TimeTravel Agency. Je peux vous conseiller une destination, estimer un budget cohérent, comparer les époques et vous accompagner jusqu'à la réservation.",
    suggestions: DEFAULT_SUGGESTIONS,
  };
};
