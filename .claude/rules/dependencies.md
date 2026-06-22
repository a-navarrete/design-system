---
paths:
  - "package.json"
  - "package-lock.json"
---

# Dependency & Storybook rules

- **Pin Storybook + all `@storybook/*` to 8.x** (currently `8.6.15`). Don't
  upgrade to v10 or mix majors — it deadlocks peer deps with Vite/React. Install
  addons at the matching version (e.g. `npm install -D @storybook/addon-name@8.6.15`).
- **Never use `--legacy-peer-deps`.** It bypasses the resolver and leaves the
  tree mismatched (Rollup binaries, `polished`/`lit-html`, esbuild-register
  drift) — failures that look like Storybook bugs but aren't. Fix conflicts at
  the source: bump the offending `^x.y.z` to a version whose peer ranges match
  the tree, or add a scoped `overrides` entry, then reinstall.
  - Example in place: `overrides` forces `eslint-plugin-react-hooks`'s copy of
    `zod-validation-error` to v5 (it needs the `./v4` subpath) while
    `@figma/code-connect` keeps v3.
- **Match ESLint/Storybook plugin versions to Storybook 8** — many plugins'
  latest majors require Storybook 10 (e.g. use `eslint-plugin-storybook@^0.11.x`,
  not the v10 line).
