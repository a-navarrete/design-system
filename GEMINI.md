# Design System Project Rules

## Storybook & Dependencies
- **Version Stability**: Maintain Storybook and all `@storybook/*` packages at version `8.x` (currently `8.6.15`). Avoid upgrading to `v10.x` or mixing major versions, as this causes peer dependency deadlocks with Vite and React.
- **Package Consistency**: When installing new Storybook addons or utilities, always specify the current project version (e.g., `npm install @storybook/addon-name@8.6.15`).
- **Peer Dependencies**: Always use the `--legacy-peer-deps` flag when installing Storybook-related packages to prevent NPM from failing on transient version mismatches.
- **Addons**: Do not reinstall `@storybook/addon-vitest` or `@chromatic-com/storybook` without verifying compatibility with the existing v8 core.

## Configuration
- **Vite Config**: Keep `vite.config.ts` clean. Avoid adding Storybook-specific test plugins or complex path mappings that can break the dev server.
- **Storybook Main**: Ensure `.storybook/main.ts` only includes active, installed addons.
- **Protected Files**: `.env` and `figma.config.json` must be preserved and not overwritten during scaffolding or dependency updates.

## Figma Code Connect
- **Mapping Files**: Maintain the `.figma.tsx` naming convention for Code Connect files in the same directory as the component.
- **URL Management**: Always verify node IDs and file keys before updating the mapping URLs.

## Build & Validation
- **Pre-commit Check**: Always run the following commands to validate changes before pushing:
  - `npm run build-storybook`: Ensures documentation and components build correctly (crucial for catching MDX/Story errors).
  - `npm run build`: Ensures the core React project and TypeScript types are valid.
  - `npm run lint`: Checks for code quality and style violations.
- **Error Handling**: If a build fails, resolve the specific error in the console output before attempting to restart the dev server. Do not attempt to "force" installs if a build failure is due to code syntax or logic errors.
