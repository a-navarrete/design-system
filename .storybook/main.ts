import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-designs"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config, { configType }) {
    // GitHub Pages serves at https://a-navarrete.github.io/design-system/, so the
    // production build needs that base path. But Chromatic and other consumers
    // serve at root, so only apply it when the deploy-storybook workflow opts in.
    if (configType === 'PRODUCTION' && process.env.GITHUB_PAGES === 'true') {
      config.base = '/design-system/';
    }
    return config;
  },
};
export default config;
