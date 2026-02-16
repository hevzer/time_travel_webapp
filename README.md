# TimeTravel Agency - Webapp Interactive

Webapp immersive pour une agence de voyages temporels fictive.

L'application permet de découvrir trois destinations (`Paris 1889`, `Crétacé`, `Florence 1504`),
de dialoguer avec un assistant conversationnel, d'obtenir une recommandation personnalisée via quiz,
et de simuler une réservation complète.

## Technologies utilisées

- Next.js 16 (App Router)
- React 19
- TypeScript (mode strict)
- Tailwind CSS v4
- Framer Motion
- Bun 1.3.9 (installation et scripts)

## Features implémentées

- Landing page immersive (animations, storytelling, CTA)
- Galerie de destinations avec cards interactives
- Pages détail pour chaque destination
- Intégration des médias du projet (images hero + vidéos)
- Chargement optimisé des médias (lazy loading images/vidéos)
- Chatbot conversationnel en mode mock (FAQ + guidance)
- Quiz intelligent de 4 questions avec recommandation personnalisée
- Formulaire de réservation multi-étapes avec validation
- Page de confirmation de dossier
- Déploiement statique compatible GitHub Pages

## Outils IA utilisés (transparence)

- Assistance de développement: OpenCode (`gpt-5.3-codex`)
- Design de référence: MCP Stitch (récupération/alignement visuel)
- Recommandation utilisateur: moteur local déterministe (pas d'appel LLM externe en runtime)
- Visuels/vidéos: médias générés lors du premier projet TimeTravel Agency puis intégrés dans `public/`

## Instructions d'installation

### Prérequis

- Bun `>= 1.3.9`

### Lancer en local

```bash
bun install
bun run dev
```

Ouvrir ensuite `http://localhost:3000`.

### Vérifications qualité

```bash
bun run lint
bun run build
```

## Scripts disponibles

- `bun run dev` : serveur de développement
- `bun run build` : build de production (export statique)
- `bun run start` : démarrage en mode production
- `bun run lint` : lint global

## Déploiement GitHub Pages

Le projet est configuré pour GitHub Pages via GitHub Actions.

- Workflow: `.github/workflows/deploy-pages.yml`
- Config Next: `next.config.ts` (`output: "export"`)

Configurer le repository:

1. Ouvrir **Settings -> Pages**
2. Choisir **Source: GitHub Actions**
3. Push sur `main` (ou `master`) pour déclencher le déploiement

## Crédits

### APIs / services

- Aucune API externe obligatoire en runtime (logique locale/mock)

### Modèles / IA

- OpenCode (`gpt-5.3-codex`) pour l'assistance de développement
- MCP Stitch pour la référence de design

### Frameworks / librairies

- Next.js
- React
- Tailwind CSS
- Framer Motion

### Assets

- Images et vidéos de destinations: assets produits dans le premier projet TimeTravel Agency
  puis stockés dans `public/Paris_1889`, `public/Cretace`, `public/Florence`

## Licence

Projet pédagogique (M1/M2 Digital & IA).
