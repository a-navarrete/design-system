# CLAUDE.md

Guidance for agents in this repo. The phased build plan and "what's next" live
in **`docs/PLAN.md`** — the source of truth; keep it current as work lands.

Path-scoped detail lives in `.claude/rules/` and loads only when you touch the
matching files (deps, Code Connect, build config).

## Architecture

- **Tokens:** `src/tokens/` — one CSS file per category (color, typography,
  spacing, radius, elevation), exposed as CSS custom properties.
- **Components:** `src/components/`. **Target** layout is folder-per-component
  (`<Name>/{<Name>.tsx, <Name>.css, <Name>.stories.tsx, <Name>.figma.tsx}`).
  Today everything is still flat (`Button.tsx`, `Toggle.tsx`) demo scaffolding —
  the folder layout begins with the first real component build.
- **Docs:** Storybook MDX in `src/stories/`.
- **Bridge:** Figma variables ↔ CSS custom properties (1:1 by name); Figma
  components ↔ React via Code Connect (`.figma.tsx`).

## Verification — close the loop

Before reporting a task done, all four must be green:

```bash
npm run lint              # ESLint over .ts/.tsx
npm run typecheck         # tsc -b
npm test                  # Vitest, headless Chromium (one-time: npx playwright install chromium)
npm run build-storybook   # catches MDX/story indexing errors
```

1. Run lint + typecheck after any change; build-storybook after touching `.mdx` /
   `.stories.*`.
2. Never trust dev-server hot reload as verification.
3. On failure, stop and fix before continuing. Don't mark unverified work done.

Local visual check: `npm run storybook`; visual regression runs in Chromatic (CI).
A Husky pre-commit hook auto-formats staged files (lint-staged); it's bypassable
with `--no-verify`, so **CI (`.github/workflows/ci.yml`) is the real gate**.

## Dependencies (headline)

Pin Storybook to **8.x**; never use `--legacy-peer-deps` — fix peer conflicts at
the source. (Full detail loads from `.claude/rules/` when you edit `package.json`.)

## Conventions

- Branches: `feat/<area>` for new work, `docs/<topic>` / `chore/<topic>` otherwise.
- PR titles: `feat(<area>): <imperative summary>`.
- **Never overwrite `.env` or `figma.config.json`.**
- Full naming + per-component definition-of-done: `docs/PLAN.md`.
