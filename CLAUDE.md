# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repo. The phased
build plan and "what's next" live in **`docs/PLAN.md`** — treat it as the source
of truth and keep it current as work lands.

## Architecture

- **Tokens:** `src/tokens/` — one CSS file per category (`color`, `typography`,
  `spacing`, `radius`, `elevation`), exposed as CSS custom properties.
- **Components:** folder-per-component — `src/components/<Name>/{<Name>.tsx,
<Name>.css, <Name>.stories.tsx, <Name>.figma.tsx}`. (Some legacy demo files are
  still flat under `src/components/`; they're throwaway scaffolding.)
- **Docs:** Storybook MDX in `src/stories/`.
- **Bridge:** Figma variables ↔ CSS custom properties (1:1 by name); Figma
  components ↔ React via Code Connect (`.figma.tsx`).

## Verification — always close the loop

Before reporting a task complete, verify your own work. All four must be green:

```bash
npm run lint              # ESLint over all .ts/.tsx
npm run typecheck         # tsc -b (project references, no emit)
npm test                  # Vitest once, headless Chromium (browser mode)
npm run build-storybook   # catches MDX/story indexing errors; what Chromatic snapshots
```

- **First-time test setup:** the browser binary isn't vendored —
  run `npx playwright install chromium` once.
- **Local visual check:** `npm run storybook` (http://localhost:6006). Visual
  regression is handled by Chromatic in CI.
- Watch mode while iterating on tests: `npm run test:watch`.

### Pre-commit hook (fast convenience layer)

A Husky pre-commit hook runs **lint-staged** on staged files only: ESLint
(`--fix`) on `.ts/.tsx` and Prettier (`--write`) on matching files. It's for
fast feedback and auto-formatting — **not** a full gate. It deliberately does
**not** run typecheck or the browser tests (whole-project checks that don't
scope to staged files); those run in CI (`.github/workflows/ci.yml`).

The hook is bypassable with `git commit --no-verify`, so **CI remains the real
gate.** It runs automatically after `npm install` (via the `prepare` script).

Rules:

1. Run `lint` + `typecheck` after any logic/component change; `build-storybook`
   after touching `.mdx` / `.stories.*` files.
2. Never assume a change is correct based only on dev-server hot reload.
3. If a check fails, **stop** and fix the specific error before further changes
   or installs. Don't mark work done on unverified changes.

## Dependencies & Storybook

- **Pin Storybook to 8.x** (currently `8.6.15`). Do not upgrade to v10 or mix
  majors — it deadlocks peer deps with Vite/React. Install addons at the matching
  version (e.g. `npm install -D @storybook/addon-name@8.6.15`).
- **Never use `--legacy-peer-deps`.** It bypasses the resolver and leaves the
  tree mismatched (Rollup binaries, `polished`/`lit-html`, esbuild-register
  drift) — failures that look like Storybook bugs but aren't. Fix conflicts at
  the source: adjust the offending `^x.y.z` in `package.json` to a version whose
  peer ranges match the tree, or add a scoped `overrides` entry, then reinstall.
  - Example already in place: `overrides` forces `eslint-plugin-react-hooks`'s
    copy of `zod-validation-error` to v5 (it needs the `./v4` subpath) while
    `@figma/code-connect` keeps v3.
- When choosing the version of an ESLint/Storybook plugin, match the **installed
  Storybook 8** line — many plugins' latest majors require Storybook 10.

## Configuration

- Keep `vite.config.ts` minimal. Browser-mode test config lives in
  `vitest.config.ts` (Playwright/Chromium provider), kept separate.
- `.storybook/main.ts` should only list installed, active addons.
- **Protected files:** `.env` and `figma.config.json` must be preserved — never
  overwrite during scaffolding or dependency work.

## Figma Code Connect

- Keep the `.figma.tsx` file beside its component.
- Verify node IDs and file keys before updating mapping URLs. The canonical Figma
  file is `eWc98Xh9u5EOvbVd9c7JT3` ("NBC") — see `docs/PLAN.md` for the others
  and their disposition.

## Conventions

- **Branches:** `feat/<kebab-area>` for new work, `docs/<topic>` /
  `chore/<topic>` for docs/tooling.
- **PR titles:** `feat(<area>): <imperative summary>`.
- Full naming and per-component definition-of-done are in `docs/PLAN.md`.
