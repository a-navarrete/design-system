import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Save changes', onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants — one story per
export const Primary: Story     = { args: { variant: 'primary' } };
export const Secondary: Story   = { args: { variant: 'secondary', children: 'Preview' } };
export const Ghost: Story       = { args: { variant: 'ghost', children: 'Skip for now' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete episode' } };

// Sizes
export const Small: Story  = { args: { variant: 'primary', size: 'sm', children: 'Follow show' } };
export const Medium: Story = { args: { variant: 'primary', size: 'md', children: 'Follow show' } };
export const Large: Story  = { args: { variant: 'primary', size: 'lg', children: 'Follow show' } };

// States — one disabled story per fill treatment (solid / bordered / bare)
export const DisabledPrimary: Story   = { args: { variant: 'primary', disabled: true } };
export const DisabledSecondary: Story = { args: { variant: 'secondary', disabled: true, children: 'Preview' } };
export const DisabledGhost: Story     = { args: { variant: 'ghost', disabled: true, children: 'Skip for now' } };
