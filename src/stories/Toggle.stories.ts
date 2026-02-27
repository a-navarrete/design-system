import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Toggle } from '../components/Toggle';

const meta = {
  title: 'Example/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/iJ8gvICLXnbsh9ple9rogK/Design-Systems?node-id=9-13&m=dev',
    },
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    checked: false,
  },
};

export const On: Story = {
  args: {
    checked: true,
  },
};
