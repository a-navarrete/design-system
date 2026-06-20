import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

// Component tests run in a real browser (Playwright/Chromium) so styles, layout,
// and DOM APIs behave like production. Requires the Chromium binary once:
//   npx playwright install chromium
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
})
