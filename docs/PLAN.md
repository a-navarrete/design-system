# NBC Design System — Build Plan

The phased build plan. Status here is the source of truth for "what's next" — keep it current as work lands.

## Architecture

- **Code:** tokens in `src/tokens/` (one file per category), components in `src/components/`, Storybook docs in `src/stories/`.
- **Figma:** file `eWc98Xh9u5EOvbVd9c7JT3` ("NBC"). The Foundations page is the doc hub — every foundation gets a section here mirroring its code counterpart.
- **Bridge:** Figma variables ↔ CSS custom properties (1:1 by name). Figma text styles ↔ semantic CSS roles. Figma effect styles ↔ elevation tokens.

## Phase status

| # | Phase | Status | PR |
|---|---|---|---|
| 0 | Token file split (per-category partials) | ✅ merged | [#1](https://github.com/a-navarrete/design-system/pull/1) |
| 1a | Color — NBC grayscale ramp | ✅ merged | [#2](https://github.com/a-navarrete/design-system/pull/2) |
| 1b | Color — extract `white`/`black` primitives, drop `grey/0` | 🟡 open | [#3](https://github.com/a-navarrete/design-system/pull/3) |
| 1c | Color — delete legacy paint styles | ✅ done in Figma |  |
| 1d | Color — semantic Light/Dark composition mockup | ✅ done in Figma |  |
| 1e | Color — text contrast matrix | ✅ done in Figma |  |
| 2a | Typography — practical 4-point scale, code + Figma styles | 🟡 open | [#4](https://github.com/a-navarrete/design-system/pull/4) |
| 2b | Typography — Foundations Type Scale visual reference | ✅ done in Figma |  |
| 3 | Spacing — fill code tokens, build Foundations visual | ⏸ not started |  |
| 4 | Radius — fill `radius.css`, build Foundations visual | ⏸ not started |  |
| 5 | Elevation — fill `elevation.css`, document existing Figma effect styles | ⏸ not started |  |
| 6 | Component rebuild (Button, Toggle, then expand) | ⏸ blocked on foundations |  |

## Parallel work

The Phase 0 split made tokens.css per-category, so Phases 3, 4, and 5 don't share files and can run on independent branches without merge friction. Suggested branches:

- `feat/spacing-foundation` — `src/tokens/spacing.css`, Spacing visual on Foundations
- `feat/radius-foundation` — `src/tokens/radius.css`, Radius visual on Foundations
- `feat/elevation-foundation` — `src/tokens/elevation.css`, Elevation visual on Foundations

Each can land independently. Component rebuild (Phase 6) is the synchronization point — it consumes everything.

## Conventions

- **Branch names:** `feat/<kebab-area>` for new work, `docs/<topic>` for documentation
- **PR titles:** `feat(<area>): <imperative summary>` (e.g. `feat(typography): replace golden-ratio scale`)
- **Variable naming:**
  - Color: `color/{family}/{stop}` (e.g. `color/grey/100`)
  - Spacing: `space/{n}` (e.g. `space/16`)
  - Radius: `radius/{name}` (e.g. `radius/lg`)
  - Semantic: `{role}/{variant}` (e.g. `surface/canvas`, `text/primary`)
- **Figma text style names:** no spaces around slashes (`Body/Default`, `Heading/Medium`)
- **CSS token naming:** size-numbered for primitives (`--font-size-12`), role-named for semantic tokens (`--text-body-size`)

## Reference

- Figma file: https://www.figma.com/design/eWc98Xh9u5EOvbVd9c7JT3
- Storybook: deployed via GitHub Actions on merges to `main`
- Repo: https://github.com/a-navarrete/design-system

## Known gaps / follow-ups

- **248 component-instance fills** lost their style binding when legacy paint styles were deleted. They'll be refixed during Phase 6.
- **Foundations canvas text labels** (`grey1..grey10`) still use the old naming because Arthouse Owned isn't loadable from the plugin runtime. Cosmetic on the doc page only — variables and bindings are correct.
- **No button-specific text style** yet (would be `Body/Default` at Semi Bold). Belongs in component-level tokens, not foundations.

## Updating this doc

Treat this as a living plan. When a phase lands, flip its status and add the PR link. When a new phase or follow-up appears, add it here before opening the work — the doc should always answer "what's next" without re-deriving from commit messages.
