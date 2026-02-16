import type { Destination } from "@/lib/types";

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "paris-1889",
    name: "Paris 1889",
    period: "Exposition universelle",
    subtitle: "La Belle Époque en pleine effervescence",
    teaser:
      "Montez au premier sommet de la tour Eiffel et vivez le Paris électrique des grands boulevards.",
    description:
      "Paris 1889 combine innovation, art et élégance. Votre guide temporel vous ouvre les portes des pavillons de l'Exposition universelle, des salons littéraires et des ateliers de mode.",
    budgetLabel: "à partir de 3 200 EUR",
    bestWindow: "Avril à Septembre",
    durationOptions: [3, 7, 14],
    highlights: [
      "Ascension privée de la tour Eiffel avant ouverture publique",
      "Soirée Belle Époque avec chef et orchestre",
      "Parcours impressionniste avec historienne dédiée",
    ],
    rules: [
      "Éviter toute mention de technologie postérieure à 1900",
      "Ne pas interagir avec vos ancêtres potentiels",
      "Rester dans le périmètre de sécurité de votre accompagnateur",
    ],
    packing: [
      "Tenue de ville fournie par l'agence",
      "Carnet de notes analogique",
      "Chaussures confortables pour pavillons et boulevards",
    ],
    faq: [
      {
        question: "Puis-je prendre des photos ?",
        answer:
          "Oui, avec l'appareil temporel fourni. Les captures sont automatiquement neutralisées pour éviter les paradoxes.",
      },
      {
        question: "La destination est-elle adaptée à une première expérience ?",
        answer: "Oui, c'est l'une de nos destinations les plus accessibles.",
      },
    ],
    ambienceClass:
      "from-amber-300/25 via-orange-400/20 to-cyan-300/20 border-amber-200/40",
    media: {
      heroImage: "/Paris_1889/Paris_1889_16_9.png",
      squareImage: "/Paris_1889/Paris_1889_1_1.png",
      portraitImage: "/Paris_1889/Paris_1889_9_16.png",
      video: "/Paris_1889/Paris_1889_Video.mp4",
    },
  },
  {
    id: "d2",
    slug: "cretace",
    name: "Crétacé",
    period: "Il y a environ 95 millions d'années",
    subtitle: "Expédition scientifique en terrain préhistorique",
    teaser:
      "Observez les géants du Crétacé depuis des capsules camouflées et survolez des forêts primitives.",
    description:
      "Le Crétacé est réservé aux voyageurs en recherche d'adrénaline. Nos protocoles Anchor+ maintiennent une bulle de sécurité active face aux prédateurs et aux variations climatiques.",
    budgetLabel: "à partir de 6 900 EUR",
    bestWindow: "Cycles climatiques stables (sélection automatique)",
    durationOptions: [2, 3, 7],
    highlights: [
      "Observation aérienne des écosystèmes marins et terrestres",
      "Briefing paléontologique avec expert dédié",
      "Camp de nuit en dôme de protection transparente",
    ],
    rules: [
      "Interdiction stricte de sortie de capsule sans autorisation",
      "Aucune collecte de spécimen biologique",
      "Respect absolu des directives d'évacuation immédiate",
    ],
    packing: [
      "Combinaison thermique fournie",
      "Hydratation renforcée",
      "Mode silence activé sur tous les accessoires",
    ],
    faq: [
      {
        question: "Comment se passe l'observation des dinosaures ?",
        answer:
          "L'observation se fait depuis des capsules Anchor+ conçues pour une non-détection active.",
      },
      {
        question: "Cette destination est-elle adaptée aux enfants ?",
        answer:
          "Nous recommandons un âge minimum de 16 ans avec consentement parental et briefing renforcé.",
      },
    ],
    ambienceClass:
      "from-emerald-400/25 via-lime-300/20 to-sky-400/20 border-emerald-200/40",
    media: {
      heroImage: "/Cretace/Cretace_16_9.png",
      squareImage: "/Cretace/Cretace_1_1.png",
      portraitImage: "/Cretace/Cretace_9_16.png",
      video: "/Cretace/Cretace_Video.mp4",
    },
  },
  {
    id: "d3",
    slug: "florence-1504",
    name: "Florence 1504",
    period: "Renaissance italienne",
    subtitle: "Le cœur artistique de l'Europe",
    teaser:
      "Assistez à l'installation du David de Michel-Ange et plongez dans les ateliers de maîtres florentins.",
    description:
      "Florence 1504 offre une immersion culturelle exceptionnelle. Entre palais, ateliers et places publiques, vous vivez le basculement d'une ville qui redéfinit l'art occidental.",
    budgetLabel: "à partir de 2 800 EUR",
    bestWindow: "Mars à Juin",
    durationOptions: [3, 7, 14],
    highlights: [
      "Accès privé à des ateliers de sculpture",
      "Parcours médicéen avec historien spécialiste",
      "Soirée musique de chambre en palais",
    ],
    rules: [
      "Respecter le protocole vestimentaire local",
      "Aucune transaction commerciale non autorisée",
      "Ne pas divulguer d'événements historiques futurs",
    ],
    packing: [
      "Veste légère et chaussures de marche",
      "Carnet croquis fourni",
      "Trousse de confort climat printanier",
    ],
    faq: [
      {
        question: "Dois-je parler italien ?",
        answer:
          "Non, votre oreillette de traduction contextuelle est incluse dans la formule.",
      },
      {
        question: "Le rythme est-il intense ?",
        answer: "Le programme est modulable entre mode découverte et mode expert.",
      },
    ],
    ambienceClass:
      "from-rose-300/20 via-amber-300/25 to-blue-300/20 border-rose-200/40",
    media: {
      heroImage: "/Florence/Florence_16_9.png",
      squareImage: "/Florence/Florence_1_1.png",
      portraitImage: "/Florence/Florence_9_16.png",
      video: "/Florence/Florence_Video.mp4",
    },
  },
];

export const destinationBySlug = (slug: string) =>
  destinations.find((destination) => destination.slug === slug);
