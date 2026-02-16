export type RiskLevel = "Faible" | "Modéré" | "Élevé";

export type Destination = {
  id: string;
  slug: string;
  name: string;
  period: string;
  subtitle: string;
  teaser: string;
  description: string;
  riskLevel: RiskLevel;
  budgetLabel: string;
  bestWindow: string;
  durationOptions: number[];
  highlights: string[];
  rules: string[];
  packing: string[];
  faq: Array<{ question: string; answer: string }>;
  ambienceClass: string;
  media: {
    heroImage: string;
    squareImage: string;
    portraitImage: string;
    video: string;
  };
};

export type TravelerProfile = {
  budget: "Essentiel" | "Confort" | "Signature";
  style: "Culture" | "Aventure" | "Prestige";
  comfort: "Standard" | "Premium";
  durationDays: number;
};

export type ChatReply = {
  answer: string;
  suggestions: string[];
  recommendationSlug?: string;
};
