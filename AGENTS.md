# AGENTS.md

Practical rules for agentic coding assistants operating in this repository.

## 1) Scope and Stack

- Project: `TimeTravel Agency` interactive web app.
- Runtime/package manager: **Bun** (`bun@1.3.9`).
- Framework: Next.js App Router (`app/` directory).
- Language: TypeScript (`strict` enabled).
- UI: React + Tailwind CSS v4 + Framer Motion.
- Content language: French-first; accented copy is expected.
- Current tests: no first-party test suite is committed yet.

## 2) Repository Map

- `app/` -> routes, layout, API handlers.
- `app/api/chat/route.ts` -> mock chat API endpoint.
- `app/api/recommendation/route.ts` -> quiz recommendation API endpoint.
- `components/` -> UI and feature components.
- `components/home/recommendation-quiz.tsx` -> automation quiz UI.
- `data/` -> static datasets (`destinations.ts`, `faq.ts`).
- `lib/` -> business logic (`chat`, `recommendation`, `quiz-recommendation`).
- `public/` -> static media assets (images/videos).
- `eslint.config.mjs` -> lint policy (Next + TS).
- `tsconfig.json` -> strict config and alias `@/*`.

## 3) Core Commands (Bun)

- Install dependencies: `bun install`
- Run dev server: `bun run dev`
- Build production: `bun run build`
- Start production server: `bun run start`
- Lint entire repo: `bun run lint`
- Lint one file: `bunx eslint app/page.tsx`

Notes:

- `bun run build` is the main safety check (includes type checks in Next build).
- Always run lint + build before considering work done.

## 4) Tests (including single-test execution)

Current state:

- There are no app-level `*.test.*` or `*.spec.*` files yet.
- No Jest/Vitest/Playwright config is currently present.

When adding tests, use Bun test runner by default:

- Run all tests: `bun test`
- Run one file: `bun test path/to/file.test.ts`
- Run one named test: `bun test -t "name fragment"`

Recommended first test target:

- `lib/quiz-recommendation.ts` (pure deterministic scoring logic).

## 5) Cursor/Copilot Rules Status

Repository scan found **no** extra AI rule files:

- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

If these are added later, they become repository policy and must be followed.

## 6) Formatting Rules

- Use 2-space indentation.
- Use semicolons consistently.
- Use double quotes for strings.
- Keep code style consistent with existing files; avoid style-only churn.
- Use concise comments only for non-obvious logic.
- Keep non-UI identifiers mostly ASCII; keep accented French in user-facing copy.

## 7) Import and Module Rules

- Prefer absolute internal imports with alias `@/...`.
- Typical import order:
  1. external/framework imports,
  2. internal imports,
  3. type imports (inline `type` is fine).
- Remove unused imports immediately.
- Keep modules focused; extract reusable logic to `lib/`.

## 8) Types and Naming Conventions

- Do not weaken TypeScript strictness.
- Avoid `any`; use unions and explicit interfaces/types.
- Validate unknown input at API boundaries before using it.
- Centralize shared domain shapes in `lib/types.ts` when broadly reused.
- Component exports: PascalCase.
- Component filenames: kebab-case in `components/`.
- Utility/library filenames: kebab-case.
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE only when truly constant/global.

## 9) Next.js and React Conventions

- Default to Server Components.
- Add `"use client"` only when hooks/browser APIs/events are required.
- Keep route files (`app/**/page.tsx`) compositional.
- Move business rules and scoring logic into `lib/`.
- Precompute heavy derived values outside JSX return blocks.
- Use small, composable components with typed props.

## 10) Error Handling and API Contracts

- Return structured JSON with explicit HTTP statuses.
- Validate payload shape before processing.
- Do not expose stack traces/internal details in responses.
- Use user-facing French error messages for UI-related failures.
- Provide actionable fallback messaging in client components.
- Keep API response shape stable when possible; document breaking changes.

## 11) Styling, Accessibility, and Performance

- Use Tailwind utilities and existing design language.
- Reuse tokens/variables defined in `app/globals.css`.
- Preserve immersive visual style (gradients, overlays, motion).
- Keep responsive behavior solid on mobile and desktop.
- Respect reduced-motion preferences.
- Use `next/image` for images where practical.
- Always provide meaningful alt text.
- Lazy-load non-critical media.
- Keep video preload conservative (`none`/`metadata`) unless critical hero media.

## 12) Localization Rules

- UI is French-first.
- Keep accents in visible text (example: `Réservation`, `Sécurité`, `Récapitulatif`, `Étape`, `Crétacé`).
- Avoid accidental regression to unaccented labels.
- Do not mix English labels in user UI unless branding requires it.

## 13) AI Transparency and Asset Handling

- The app currently uses mock/deterministic recommendation logic at runtime.
- Keep AI-related claims accurate (avoid claiming real LLM calls when mocked).
- Media in `public/` comes from project assets; do not rename/move casually.
- If adding assets, follow existing folder organization and naming style.

## 14) Agent Completion Checklist

Before finishing any change:

1. Run `bun run lint`.
2. Run `bun run build`.
3. Run tests for changed scope (if tests exist).
4. Verify no unrelated file modifications.
5. Summarize behavior changes and any follow-up work.

Suggested first tests to add:

- Unit: `lib/quiz-recommendation.ts` scoring and tie-break behavior.
- API: `app/api/recommendation/route.ts` invalid/valid payload paths.
- Component: quiz step progression and result rendering.
- Smoke: destination pages render media URLs and text fallback correctly.
