---
paths:
  - "vite.config.ts"
  - "vitest.config.ts"
  - ".storybook/**"
---

# Build & test config

- Keep `vite.config.ts` minimal — no Storybook-specific test plugins or complex
  path mappings that can break the dev server.
- Browser-mode Vitest config lives in `vitest.config.ts` (Playwright/Chromium
  provider), kept separate from `vite.config.ts`.
- `.storybook/main.ts` should list only installed, active addons.
