import { destinationBySlug, destinations } from "@/data/destinations";
import type { TravelerProfile } from "@/lib/types";

const scoreDestination = (slug: string, profile: TravelerProfile) => {
  let score = 0;

  if (slug === "paris-1889") {
    if (profile.style === "Culture") score += 4;
    if (profile.budget !== "Essentiel") score += 2;
    if (profile.durationDays >= 3) score += 1;
  }

  if (slug === "cretace") {
    if (profile.style === "Aventure") score += 5;
    if (profile.comfort === "Premium") score += 2;
    if (profile.durationDays <= 7) score += 1;
  }

  if (slug === "florence-1504") {
    if (profile.style === "Culture" || profile.style === "Prestige") score += 4;
    if (profile.budget === "Essentiel" || profile.budget === "Confort") score += 2;
    if (profile.durationDays >= 3) score += 1;
  }

  return score;
};

export const recommendDestination = (profile: TravelerProfile) => {
  const ranked = destinations
    .map((destination) => ({
      destination,
      score: scoreDestination(destination.slug, profile),
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0]?.destination ?? destinationBySlug("paris-1889");
  if (!top) {
    throw new Error("Aucune destination disponible.");
  }

  return {
    slug: top.slug,
    name: top.name,
    reason:
      top.slug === "cretace"
        ? "Votre profil recherche de l'intensité et une expérience hors norme."
        : top.slug === "florence-1504"
          ? "Votre profil valorise la culture, le rythme souple et l'élégance historique."
          : "Votre profil combine découverte culturelle et première immersion accessible.",
  };
};
