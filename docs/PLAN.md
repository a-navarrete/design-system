# NBC Design System — Build Plan

The phased build plan. Status here is the source of truth for "what's next" — keep it current as work lands.

## Architecture

- **Code:** tokens in `src/tokens/` (one file per category), components in `src/components/<Name>/<Name>.tsx` (folder-per-component), Storybook docs in `src/stories/`.
- **Figma:** file `eWc98Xh9u5EOvbVd9c7JT3` ("NBC"). The Foundations page is the doc hub — every foundation gets a section here mirroring its code counterpart. Components live on their own pages (Atoms / Molecules / Organisms / Templates).
- **Bridge:** Figma variables ↔ CSS custom properties (1:1 by name). Figma text styles ↔ semantic CSS roles. Figma effect styles ↔ elevation tokens. Figma components ↔ React components via Code Connect (`.figma.tsx` mapping files).

## Phase status

| # | Phase | Status | PR |
|---|---|---|---|
| 0 | Token file split (per-category partials) | ✅ merged | [#1](https://github.com/a-navarrete/design-system/pull/1) |
| 1a | Color — NBC grayscale ramp | ✅ merged | [#2](https://github.com/a-navarrete/design-system/pull/2) |
| 1b | Color — extract `white`/`black` primitives, drop `grey/0` | ✅ merged | [#3](https://github.com/a-navarrete/design-system/pull/3) |
| 1c | Color — delete legacy paint styles | ✅ done in Figma |  |
| 1d | Color — semantic Light/Dark composition mockup | ✅ done in Figma |  |
| 1e | Color — text contrast matrix | ✅ done in Figma |  |
| 2a | Typography — practical 4-point scale, code + Figma styles | ✅ merged | [#4](https://github.com/a-navarrete/design-system/pull/4) |
| 2b | Typography — Foundations Type Scale visual reference | ✅ done in Figma |  |
| 3 | Spacing — pixel-numbered tokens, Foundations visual reference | ✅ merged | [#6](https://github.com/a-navarrete/design-system/pull/6) |
| 4 | Radius — t-shirt-sized tokens, Foundations visual reference | ✅ merged | [#7](https://github.com/a-navarrete/design-system/pull/7) |
| 5 | Elevation — composed shadow tokens, Foundations visual reference | ✅ merged | [#8](https://github.com/a-navarrete/design-system/pull/8) |
| 6 | Component rebuild (atoms + key molecules) | 🟡 in progress | see Phase 6 sub-plan below |

**Foundations are done.** Phase 6 is the next big push.

## Phase 6 — Component Rebuild

### Decisions

- **Build fresh in Figma.** Existing Atoms/Molecules/Organisms components are guidance only. The 248 legacy instances they spawned will be replaced as we rebuild — they've been broken since the old paint styles were deleted in Phase 1c.
- **v1 scope:** atoms + Card + Form Field + Banner. Anything beyond is iteration after v1 lands.
- **Code Connect alongside each atom.** Set up `.figma.tsx` mapping per component as it lands — designers see the right code snippet in dev mode immediately.
- **Storybook coverage:** every variant a story.
- **Visual regression:** Chromatic. Snapshots every story automatically; per-story diff review UI; free at this scale. Swap later if cost becomes a concern.

### Sub-phases

| # | Component | Variants in scope | Status |
|---|---|---|---|
| 6.1 | **Strategy & template** | `docs/COMPONENT-TEMPLATE.md`, Chromatic CI, Button text styles | ✅ merged ([#10](https://github.com/a-navarrete/design-system/pull/10)) |
| 6.2 | Button | primary / secondary / ghost / destructive × default/hover/active/disabled × sm/md/lg | 🟡 in progress |
| 6.3 | Input | default / focus / error / disabled × ±label ±helper ±icon | ⏸ |
| 6.4 | Checkbox | unchecked / checked / indeterminate × default/disabled | ⏸ |
| 6.5 | Radio | unselected / selected × default/disabled | ⏸ |
| 6.6 | Toggle | off / on × default/disabled | ⏸ |
| 6.7 | Avatar | xs/sm/md/lg/xl × image/initials/placeholder | ⏸ |
| 6.8 | Badge | neutral/info/positive/warning/danger × solid/subtle | ⏸ |
| 6.9 | IconButton | default/hover/active/disabled × ghost/filled × sm/md/lg | ⏸ |
| 6.10 | Card | container with optional header / body / footer | ⏸ |
| 6.11 | Form Field | Label + Input + helper text + error state composition | ⏸ |
| 6.12 | Banner / Alert | info/success/warning/danger × dismissible | ⏸ |

Atoms (6.2 – 6.9) can run in parallel branches once 6.1 lands. Card / Form Field / Banner depend on relevant atoms.

### Per-component definition of done

- [ ] Figma component built fresh with auto-layout; every property bound to a token (no raw hex / px / shadow values)
- [ ] All variants implemented as Figma component properties
- [ ] React component in `src/components/<Name>/<Name>.tsx`
- [ ] Storybook story for every variant
- [ ] Visual regression baseline captured in Chromatic
- [ ] `.figma.tsx` Code Connect mapping with the actual node ID
- [ ] PR description includes a Figma URL with `?node-id=…`

### Per-component PR template

```markdown
## Summary
Phase 6.<N> — <Component>. Built fresh per docs/PLAN.md.

## Figma
- File: eWc98Xh9u5EOvbVd9c7JT3
- Component node: <URL with ?node-id=...>

## Variants
[checklist of variants implemented]

## Test plan
- [ ] Storybook builds
- [ ] Every variant renders in its story
- [ ] Chromatic baseline captured / diffs reviewed
- [ ] Code Connect mapping resolves in dev mode
```

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
- **Component folder layout:** `src/components/<Name>/{<Name>.tsx, <Name>.css, <Name>.stories.tsx, <Name>.figma.tsx}`

## Reference

- Figma file: https://www.figma.com/design/eWc98Xh9u5EOvbVd9c7JT3
- Storybook: deployed via GitHub Actions on merges to `main`
- Repo: https://github.com/a-navarrete/design-system
- Chromatic: https://www.chromatic.com/builds?appId=69f8c71fe9f3868fdb81902e

## Known gaps / follow-ups

- **Foundations canvas text labels** (`grey1..grey10`) still use the old naming because Arthouse Owned isn't loadable from the plugin runtime. Cosmetic on the doc page only — variables and bindings are correct.
- **Button text styles**: CSS tokens (`--text-button-{sm,md,lg}-*`) landed in 6.1 ([#10](https://github.com/a-navarrete/design-system/pull/10)); the matching Figma text styles (`Button/Sm|Md|Lg`) still need creating when Button is built in Figma (6.2).
- **The 248 broken instance fills** from Phase 1c will all be replaced by Phase 6 — they don't need a separate fix.

## Updating this doc

Treat this as a living plan. When a phase lands, flip its status and add the PR link. When a new phase or follow-up appears, add it here before opening the work — the doc should always answer "what's next" without re-deriving from commit messages.
