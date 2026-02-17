# AGENTS.md

Practical operating guide for agentic coding assistants in this repository.

## 1) Project Snapshot
- Product: `TimeTravel Agency` immersive web app.
- Runtime + package manager: **Bun** (`bun@latest`).
- Framework: Next.js 16 App Router (`app/`).
- Language: TypeScript (`strict: true`).
- UI stack: React 19 + Tailwind CSS v4 + Framer Motion.
- Hosting target: Cloudflare Workers via OpenNext.
- UI language: French-first (accents expected in user-facing copy).

## 2) Repository Map
- `app/` -> routes, layouts, and API handlers.
- `app/api/chat/route.ts` -> chatbot server endpoint (Mistral + fallback).
- `components/` -> UI blocks (home, booking, chat, layout).
- `components/chat/chat-widget.tsx` -> floating chatbot widget.
- `lib/` -> business logic (`chat`, `recommendation`, `quiz-recommendation`).
- `data/` -> static content (`destinations.ts`, `faq.ts`).
- `public/` -> static media assets.
- `open-next.config.ts` + `wrangler.jsonc` -> Cloudflare/OpenNext integration.
- `.github/workflows/ci.yml` -> CI-only (lint + build).

## 3) Build, Lint, Dev, Deploy Commands
- Install dependencies: `bun install`
- Start local dev server: `bun run dev`
- Lint full repo: `bun run lint`
- Lint one file: `bunx eslint components/chat/chat-widget.tsx`
- Build app (Next production build): `bun run build`
- Start production server locally: `bun run start`
- Preview Cloudflare runtime locally: `bun run preview`
- Deploy to Cloudflare Workers: `bun run deploy`
- Generate Cloudflare env types: `bun run cf-typegen`
- `bun run build` is the main type-safety gate.
- For Cloudflare behavior, `bun run preview` is the closest runtime check.

## 4) Test Commands (including single test)
- Current state: no committed app-level `*.test.*` / `*.spec.*` files.
- Current state: no Jest/Vitest/Playwright config detected.
- When tests are added, use Bun test runner by default.
- Run all tests: `bun test`
- Run one file: `bun test path/to/file.test.ts`
- Run one test by name: `bun test -t "name fragment"`
- Optional watch mode: `bun test --watch`
- Suggested first targets: `lib/quiz-recommendation.ts`, `lib/chat.ts`, `app/api/chat/route.ts`.

## 5) Cursor/Copilot Rules Status
- Repository scan found no additional AI policy files:
  - `.cursor/rules/` (not present)
  - `.cursorrules` (not present)
  - `.github/copilot-instructions.md` (not present)
- If these files appear later, treat them as repository policy.

## 6) Formatting Rules
- Use 2-space indentation.
- Use semicolons consistently.
- Use double quotes for strings.
- Avoid style-only churn in unrelated files.
- Add comments only for non-obvious logic.
- Keep identifiers mostly ASCII; keep accented French in UI copy.

## 7) Imports and Module Structure
- Prefer absolute imports via alias `@/*`.
- Import order convention:
  1) external/framework imports,
  2) internal imports,
  3) type imports (`import type` / inline `type`).
- Remove unused imports immediately.
- Keep route files thin; move reusable logic to `lib/`.
- Keep modules focused; avoid dumping unrelated helpers.

## 8) TypeScript and Validation Standards
- Do not relax TypeScript strictness.
- Avoid `any`; prefer explicit unions/literals/interfaces.
- Validate unknown input at boundaries (API payloads, query params).
- Use narrowing helpers before consuming untyped data.
- Keep shared domain shapes in `lib/types.ts` when reused.

## 9) Naming Conventions
- React component names: PascalCase.
- Component file names: kebab-case (`chat-widget.tsx`).
- Utility/lib file names: kebab-case.
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE only when truly constant/global.

## 10) Next.js and React Conventions
- Default to Server Components.
- Add `"use client"` only for hooks/events/browser APIs.
- Keep `app/**/page.tsx` compositional and lightweight.
- Precompute derived values outside JSX return when practical.
- Use typed props for reusable components.
- Use `next/link` and `next/image` where appropriate.

## 11) API and Error-Handling Rules
- Return structured JSON with explicit HTTP status codes.
- Keep API response shapes stable where possible.
- Use French user-facing messages for recoverable errors.
- Do not expose stack traces/secrets in API responses.
- Log concise server diagnostics for failed external calls.
- Provide fallback behavior for degraded external services.

## 12) Chatbot-Specific Guidance
- Main endpoint: `app/api/chat/route.ts`.
- Runtime model keys: `MISTRAL_API_KEY`, `MISTRAL_MODEL`.
- Preserve deterministic fallback via `createChatReply`.
- Do not claim live AI responses when fallback is active.
- Keep persona aligned with luxury time-travel concierge tone.
- Keep invented pricing coherent with destination baselines.

## 13) Styling, Accessibility, Performance
- Reuse design tokens from `app/globals.css`.
- Preserve established dark + gold visual language.
- Keep responsive behavior robust on mobile and desktop.
- Respect reduced motion preferences.
- Provide meaningful alt text for media.
- Lazy-load non-critical media; keep video preload conservative.

## 14) Localization and Content Integrity
- UI copy is French-first.
- Preserve accents (`Réservation`, `Sécurité`, `Crétacé`, etc.).
- Avoid accidental English labels in user-facing UI.
- Keep destination references and lore internally consistent.

## 15) Cloudflare and CI/CD Notes
- Default deploy path: Cloudflare Workers Builds (Git integration).
- Build command used in Cloudflare: `bun run lint && bunx opennextjs-cloudflare build`.
- Deploy command used in Cloudflare: `bunx opennextjs-cloudflare deploy -- --keep-vars`.
- CI-only workflow exists at `/.github/workflows/ci.yml` (lint + build).
- Worker runtime secret must include `MISTRAL_API_KEY`.
- `.open-next/` is generated output and must remain ignored.

## 16) Git and Workspace Hygiene
- You may work in a dirty tree; never revert unrelated user changes.
- Do not modify generated folders manually (`.next/`, `.open-next/`).
- Do not commit secrets (`.env*`, credentials, tokens).
- Keep edits scoped to the request; avoid opportunistic refactors.
- Prefer small, reviewable diffs in touched files.

## 17) Agent Completion Checklist
Before finishing a change:
1. Run `bun run lint`.
2. Run `bun run build`.
3. Run targeted tests for changed scope (`bun test ...`) when present.
4. For Cloudflare-impacting changes, run `bun run preview` when possible.
5. Confirm no unintended file changes or generated artifacts are staged.
6. Summarize behavior changes, validation steps, and follow-up actions.
