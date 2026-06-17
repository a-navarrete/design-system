---
name: prototype
description: Bootstrap a brand-new React component for this design system end-to-end. First explore several directions in a throwaway standalone HTML preview, then promote the chosen direction into a real component plus a Storybook story and docs that Chromatic snapshots. Use this whenever the user wants to prototype, mock up, build, or add a new component, variant, or UI element — even if they don't say "prototype." Trigger on phrasing like "new component", "build a <X> component", "prototype a <X>", "add a <X> to the design system", or "what could <X> look like".
argument-hint: [component name + what it does]
allowed-tools: Read Grep Glob Write Edit Skill Bash(open *) Bash(xdg-open *) mcp__plugin_figma_figma__use_figma mcp__plugin_figma_figma__get_design_context mcp__plugin_figma_figma__get_metadata mcp__plugin_figma_figma__get_screenshot mcp__plugin_figma_figma__get_variable_defs mcp__plugin_figma_figma__search_design_system mcp__plugin_figma_figma__get_libraries mcp__plugin_figma_figma__get_code_connect_map mcp__plugin_figma_figma__add_code_connect_map mcp__plugin_figma_figma__get_code_connect_suggestions mcp__plugin_figma_figma__get_context_for_code_connect mcp__plugin_figma_figma__send_code_connect_mappings
---

# Prototype a component

Bootstrap a new React component for this design system in three stages: first explore several directions in a throwaway HTML preview, then promote the one the user picks into a real component with a Storybook story and docs that Chromatic will pick up, then build the component fresh in Figma and wire up Code Connect so design and code stay in sync.

**Component:** $ARGUMENTS

If it's unclear what the component is or does, ask one quick question (what it's for, key states/variants) and stop. Otherwise state your main assumption in one line and start building.

## Step 0 — Match the house style (do this first, every time)

Before generating anything, learn how this repo builds components so everything you produce fits in:

- Find a representative existing component and read it **plus** its `*.stories.*` file. Mirror its file layout (co-located vs separate folders), naming, and export style.
- Detect the styling approach (CSS Modules, Tailwind, styled-components / emotion, vanilla-extract, plain CSS) and use the same one — do not introduce a new one.
- Find the design tokens (a tokens file, CSS custom properties, a theme object) and use them for color, spacing, type, radius, shadows, etc. Never hardcode a value that a token exists for.
- Check `.storybook/` for the Storybook version and config, and confirm whether the repo uses TypeScript. Assume TypeScript + CSF3 unless the repo clearly says otherwise.

If you genuinely can't find one of these, say what you assumed in one line and proceed — don't stall.

## Step 1 — Explore directions (standalone HTML)

Create a single self-contained `prototype.html` in the current directory — no build step, inline CSS/JS — showing **three meaningfully different directions** for the component. Differ on real things: structure, interaction model, density, or visual treatment, not just color.

For each direction:

- Render the component across its **meaningful states in one view**: default, hover/active, focus, disabled, plus any sizes or variants implied by the brief. Reviewing a component means seeing its states, not one happy-path instance.
- Use the design tokens you found in Step 0 (inline them as CSS variables) so the preview already looks on-brand.
- Write semantic, cleanly-structured markup with obvious classes per variant/state, so it translates faithfully to React in Step 2.
- Label the direction with a one-line tradeoff.

Add a sticky top bar that switches between the three directions. Use realistic content — never "Lorem ipsum". Then open the file (`open prototype.html` on macOS, `xdg-open prototype.html` on Linux) and tell the user in one line that it's ready.

## Step 2 — Commit the chosen direction to Storybook

Once the user picks a direction (and any tweaks), promote **just that one** into real code, matching the conventions from Step 0:

- **Component** — a typed React component with a clear props API derived from the variants and states you prototyped. Reuse tokens; no magic values. Keep it consistent with how sibling components are written.
- **Story (CSF3)** — a `*.stories.tsx` with `Meta` + `argTypes` for the props, a `Default` story, and one story per meaningful state/variant (sizes, disabled, loading, error, etc.). These stories are exactly what Chromatic snapshots, so cover every state worth catching a visual regression on — that coverage is the point of the story, not an afterthought.
- **Docs** — enable autodocs (or an MDX doc if the repo uses them) with a short description and a usage example.
- Place all files where Step 0 showed similar components live.

Then summarize what you created (file paths + the props API) so the user can run Storybook locally and push to Chromatic.

## Step 3 — Build it fresh in Figma + Code Connect

The component isn't done until it exists in Figma as a token-bound component and the code is mapped back to it. This is the design-source-of-truth half of the workflow — don't skip it.

**Load the Figma skills first.** Before any `use_figma` call, invoke the `figma-use` skill (mandatory), plus `figma-generate-library` for building the component and `figma-code-connect` for the mapping. Skipping `figma-use` causes hard-to-debug failures.

**Find the target Figma file from the repo, don't hardcode it.** Look in the build plan (e.g. `docs/PLAN.md`), existing `*.figma.tsx` Code Connect files, or any Figma config for the canonical `fileKey` and the page components live on (Atoms / Molecules / Organisms / Templates). If the repo points at more than one Figma file, ask which is the real one rather than guessing — a stray demo file is easy to pick by mistake.

**Build the component fresh:**

- Create it on the correct page with **auto-layout**, mirroring the structure of the direction promoted in Step 2.
- Bind **every** property to a Figma variable / token — color, spacing, type, radius, shadow. No raw hex, px, or shadow values. The Figma variables should map 1:1 to the CSS custom properties the code uses; reuse the existing ones rather than creating duplicates.
- Implement every variant and state from Step 2 as **Figma component properties** (variant props, boolean props), so the Figma component's API matches the React props API.

**Wire up Code Connect:**

- Write a `<Name>.figma.tsx` next to the component that maps the real Figma node to the React component, with the **actual node ID** from the component you just built (not a placeholder, not a node from a different file).
- Map Figma props to React props faithfully (e.g. `figma.enum`, `figma.boolean`, `figma.textContent`), and make the `example` render the component the way a consumer would.

**Finish:** give the user the Figma URL with `?node-id=…` for the new component (ready to drop into the PR description), and confirm the Code Connect mapping resolves. Summarize so the per-component definition of done is fully checked: Figma component ✅, variants as Figma props ✅, React component ✅, stories ✅, Chromatic baseline ✅, `.figma.tsx` mapping ✅, Figma URL for the PR ✅.

## Iterating

Treat later messages in this session as feedback on the current work. During Step 1, edit `prototype.html` and re-open it. After Step 2, refine the component and keep the stories in sync with any new states or props you add. After Step 3, keep the three sides in sync — when a prop or state changes, update the React component, its stories, **and** the Figma component + Code Connect mapping together so they don't drift. Keep edits surgical — change what was asked and leave the rest. If a request is ambiguous, make your best call and note it in one line.
