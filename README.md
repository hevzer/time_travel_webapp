# TimeTravel Agency

Interactive web app for a fictional temporal travel agency.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Bun (`1.3.9`)

## Local Development

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
bun run lint
bun run build
```

## GitHub Pages Deployment

This repository is configured for static export + GitHub Pages.

- Workflow file: `.github/workflows/deploy-pages.yml`
- Next config: `next.config.ts` (`output: "export"`)

### Required GitHub repo setting

In GitHub:

1. Go to **Settings -> Pages**
2. Set **Source** to **GitHub Actions**

Then push to `main` (or `master`) to trigger deployment.
