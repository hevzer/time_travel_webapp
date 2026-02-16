import { destinationBySlug } from "@/data/destinations";
import { recommendDestination } from "@/lib/recommendation";
import type { ChatReply, TravelerProfile } from "@/lib/types";

const normalize = (value: string) => value.toLowerCase().trim();

export const createChatReply = (
  input: string,
  contextSlug?: string,
  profile?: TravelerProfile,
): ChatReply => {
  const text = normalize(input);

  if (profile && (text.includes("recommande") || text.includes("recommand"))) {
    const recommendation = recommendDestination(profile);
    return {
      answer: `Je vous recommande ${recommendation.name}. ${recommendation.reason}`,
      suggestions: ["Montre-moi l'itinéraire", "Comparer avec une autre destination"],
      recommendationSlug: recommendation.slug,
    };
  }

  if (
    text.includes("prix") ||
    text.includes("budget") ||
    text.includes("cout") ||
    text.includes("coût")
  ) {
    return {
      answer:
        "Pour un premier voyage, Florence 1504 est la plus accessible. Paris 1889 est premium culturel, et le Crétacé est notre expédition la plus exigeante.",
      suggestions: ["Voir les offres", "Aide réservation"],
    };
  }

  if (
    text.includes("securite") ||
    text.includes("sécurité") ||
    text.includes("risque") ||
    text.includes("danger")
  ) {
    return {
      answer:
        "Nos guides certifiés appliquent un protocole de non-interférence et un retour ancré en temps réel. Le Crétacé prévoit un briefing renforcé avant départ.",
      suggestions: ["Rappelle les règles", "Comparer les destinations"],
    };
  }

  if (text.includes("paris") || text.includes("1889")) {
    const destination = destinationBySlug("paris-1889");
    return {
      answer: `${destination?.name} est idéale pour une première immersion : art, innovation et ambiance Belle Époque.`,
      suggestions: ["Voir le programme Paris", "Réserver Paris 1889"],
      recommendationSlug: "paris-1889",
    };
  }

  if (text.includes("cretace") || text.includes("crétacé") || text.includes("dino")) {
    return {
      answer:
        "Le Crétacé est une expédition intense. Vous restez dans des capsules camouflées avec surveillance continue.",
      suggestions: ["Détails sécurité Crétacé", "Réserver Crétacé"],
      recommendationSlug: "cretace",
    };
  }

  if (text.includes("florence") || text.includes("renaissance") || text.includes("1504")) {
    return {
      answer:
        "Florence 1504 est parfaite pour un voyage culturel : ateliers d'art, palais et rythme adaptable.",
      suggestions: ["Voir Florence 1504", "Réserver Florence"],
      recommendationSlug: "florence-1504",
    };
  }

  if (
    text.includes("reservation") ||
    text.includes("réservation") ||
    text.includes("reserver") ||
    text.includes("réserver")
  ) {
    const target = contextSlug ? `/reservation?destination=${contextSlug}` : "/reservation";
    return {
      answer: `Je peux vous guider en 3 étapes. Commencez ici : ${target}`,
      suggestions: ["Aller au formulaire", "Quels documents préparer ?"],
      recommendationSlug: contextSlug,
    };
  }

  return {
    answer:
      "Je suis votre agent temporel. Je peux recommander une destination, expliquer les règles de sécurité et vous aider à réserver.",
    suggestions: [
      "Quelle destination me correspond ?",
      "Quelles sont les règles de sécurité ?",
      "Aide réservation",
    ],
  };
};
