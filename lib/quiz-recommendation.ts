import { destinationBySlug } from "@/data/destinations";

type DestinationSlug = "paris-1889" | "cretace" | "florence-1504";

export type QuizAnswers = {
  experience: "culture-art" | "adventure-nature" | "elegance-refinement";
  period: "modern-history" | "ancient-origins" | "renaissance-classicism";
  preference: "urban-buzz" | "wild-nature" | "art-architecture";
  activity: "visit-monuments" | "observe-fauna" | "explore-museums";
};

type QuizOption = {
  id: string;
  label: string;
  scores: Record<DestinationSlug, number>;
};

type QuizQuestion<K extends keyof QuizAnswers> = {
  id: K;
  title: string;
  options: QuizOption[];
};

export const quizQuestions: Array<QuizQuestion<keyof QuizAnswers>> = [
  {
    id: "experience",
    title: "Quel type d'expérience recherchez-vous ?",
    options: [
      {
        id: "culture-art",
        label: "Culturelle et artistique",
        scores: { "paris-1889": 2, cretace: 0, "florence-1504": 3 },
      },
      {
        id: "adventure-nature",
        label: "Aventure et nature",
        scores: { "paris-1889": 0, cretace: 4, "florence-1504": 0 },
      },
      {
        id: "elegance-refinement",
        label: "Élégance et raffinement",
        scores: { "paris-1889": 3, cretace: 0, "florence-1504": 2 },
      },
    ],
  },
  {
    id: "period",
    title: "Votre période préférée ?",
    options: [
      {
        id: "modern-history",
        label: "Histoire moderne (XIXe-XXe siècle)",
        scores: { "paris-1889": 4, cretace: 0, "florence-1504": 1 },
      },
      {
        id: "ancient-origins",
        label: "Temps anciens et origines",
        scores: { "paris-1889": 0, cretace: 4, "florence-1504": 0 },
      },
      {
        id: "renaissance-classicism",
        label: "Renaissance et classicisme",
        scores: { "paris-1889": 1, cretace: 0, "florence-1504": 4 },
      },
    ],
  },
  {
    id: "preference",
    title: "Vous préférez :",
    options: [
      {
        id: "urban-buzz",
        label: "L'effervescence urbaine",
        scores: { "paris-1889": 4, cretace: 0, "florence-1504": 1 },
      },
      {
        id: "wild-nature",
        label: "La nature sauvage",
        scores: { "paris-1889": 0, cretace: 4, "florence-1504": 0 },
      },
      {
        id: "art-architecture",
        label: "L'art et l'architecture",
        scores: { "paris-1889": 1, cretace: 0, "florence-1504": 4 },
      },
    ],
  },
  {
    id: "activity",
    title: "Votre activité idéale :",
    options: [
      {
        id: "visit-monuments",
        label: "Visiter des monuments",
        scores: { "paris-1889": 4, cretace: 0, "florence-1504": 2 },
      },
      {
        id: "observe-fauna",
        label: "Observer la faune",
        scores: { "paris-1889": 0, cretace: 5, "florence-1504": 0 },
      },
      {
        id: "explore-museums",
        label: "Explorer des musées",
        scores: { "paris-1889": 2, cretace: 0, "florence-1504": 4 },
      },
    ],
  },
];

const scoreLookup = quizQuestions.reduce(
  (accumulator, question) => {
    accumulator[question.id] = question.options.reduce(
      (optionAccumulator, option) => {
        optionAccumulator[option.id] = option;
        return optionAccumulator;
      },
      {} as Record<string, QuizOption>,
    );
    return accumulator;
  },
  {} as Record<keyof QuizAnswers, Record<string, QuizOption>>,
);

const destinationIntro: Record<DestinationSlug, string> = {
  "paris-1889":
    "Paris 1889 vous convient car vous aimez l'énergie urbaine, les monuments emblématiques et l'histoire moderne.",
  cretace:
    "Le Crétacé est votre meilleure option : vous recherchez une expérience d'aventure pure et un contact direct avec la nature sauvage.",
  "florence-1504":
    "Florence 1504 est idéale pour vous : votre profil valorise l'art, l'architecture et une immersion culturelle raffinée.",
};

export type QuizRecommendation = {
  slug: DestinationSlug;
  name: string;
  explanation: string;
  scoreBreakdown: Record<DestinationSlug, number>;
  selectedLabels: string[];
};

export const isQuizAnswers = (value: unknown): value is QuizAnswers => {
  if (!value || typeof value !== "object") return false;
  const payload = value as Partial<Record<keyof QuizAnswers, string>>;

  return quizQuestions.every((question) => {
    const answer = payload[question.id];
    return typeof answer === "string" && answer in scoreLookup[question.id];
  });
};

export const getQuizRecommendation = (answers: QuizAnswers): QuizRecommendation => {
  const scores: Record<DestinationSlug, number> = {
    "paris-1889": 0,
    cretace: 0,
    "florence-1504": 0,
  };

  const selectedLabels: string[] = [];

  for (const question of quizQuestions) {
    const option = scoreLookup[question.id][answers[question.id]];
    selectedLabels.push(option.label);
    scores["paris-1889"] += option.scores["paris-1889"];
    scores.cretace += option.scores.cretace;
    scores["florence-1504"] += option.scores["florence-1504"];
  }

  const sorted = (Object.entries(scores) as Array<[DestinationSlug, number]>).sort(
    (a, b) => b[1] - a[1],
  );

  const tie = sorted[0][1] === sorted[1][1];
  const selectedPeriod = scoreLookup.period[answers.period];

  const slug: DestinationSlug = tie
    ? (Object.entries(selectedPeriod.scores).sort((a, b) => b[1] - a[1])[0][0] as DestinationSlug)
    : sorted[0][0];

  const destination = destinationBySlug(slug);
  if (!destination) {
    throw new Error("Destination introuvable");
  }

  const explanation = `${destinationIntro[slug]} Vous avez indiqué : ${selectedLabels
    .map((label) => label.toLowerCase())
    .join(", ")}.`;

  return {
    slug,
    name: destination.name,
    explanation,
    scoreBreakdown: scores,
    selectedLabels,
  };
};
