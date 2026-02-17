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
- Chatbot IA (Mistral API) avec fallback local déterministe
- Quiz intelligent de 4 questions avec recommandation personnalisée
- Formulaire de réservation multi-étapes avec validation
- Page de confirmation de dossier
- Déploiement dynamique Cloudflare Workers (CI GitHub Actions)

## Outils IA utilisés (transparence)

- Assistance de développement: OpenCode (`gpt-5.3-codex`)
- Design de référence: MCP Stitch (récupération/alignement visuel)
- Recommandation utilisateur: moteur local déterministe + intégration Mistral API pour le chatbot
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

### Variables d'environnement

Copier `.env.example` vers `.env.local` et définir:

- `MISTRAL_API_KEY` (obligatoire pour réponses IA distantes)
- `MISTRAL_MODEL` (optionnel, défaut: `mistral-small-latest`)

Sans clé Mistral, l'app bascule automatiquement sur le moteur de réponses local.

## Scripts disponibles

- `bun run dev` : serveur de développement
- `bun run build` : build de production Next.js
- `bun run start` : démarrage en mode production
- `bun run lint` : lint global
- `bun run preview` : build + prévisualisation Cloudflare Workers locale
- `bun run deploy` : build + déploiement Cloudflare Workers

## Déploiement Cloudflare Workers (automatique)

Le déploiement est assuré via GitHub Actions.

- Workflow: `.github/workflows/deploy-cloudflare.yml`
- Runtime cible: Cloudflare Workers (OpenNext)

Secrets GitHub requis:

1. `CLOUDFLARE_API_TOKEN`
2. `CLOUDFLARE_ACCOUNT_ID`

Secrets Cloudflare Worker requis:

- `MISTRAL_API_KEY` (à définir dans le dashboard Cloudflare ou via `wrangler secret put`)

Chaque push sur `main` ou `master` lance automatiquement lint, build et déploiement.

## Crédits

### APIs / services

- Mistral API (chatbot IA, avec fallback local si clé absente)

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
