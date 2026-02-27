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
Follow these commands strictly to validate changes:
- **Build**: `npm run build`
- **Storybook Build**: `npm run build-storybook`
- **Lint**: `npm run lint`
- **Testing**: `npx vitest --run` (Once configured)

### Validation Workflow
1. **Always** run `npm run lint` and `npm run build` after any logic or component change.
2. **Always** run `npm run build-storybook` after modifying `.mdx` or `.stories.ts` files to catch indexing errors.
3. **Never** assume a change is correct based only on dev-server hot reloading.
4. If a build command fails, **stop** and resolve the specific error before attempting further changes or installs.
