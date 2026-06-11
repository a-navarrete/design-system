# Component template

The shape every Phase 6 component follows. Copy this for each new atom — keeps PRs landing in the same shape so reviewers don't re-derive conventions every time.

## Folder layout

```
src/components/<Name>/
  <Name>.tsx           // React component
  <Name>.css           // Component styles, all values pulled from token vars
  <Name>.stories.tsx   // Storybook stories — one per variant
  <Name>.figma.tsx     // Code Connect mapping
  index.ts             // Barrel re-export: export * from './<Name>'
```

`<Name>` is PascalCase singular: `Button`, `Input`, `Checkbox`, `IconButton`.

## File roles

### `<Name>.tsx`

Functional React component. Props expose every meaningful variant. No magic strings inside — variant names are TypeScript unions.

```tsx
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', size = 'md', disabled, children, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${variant} button--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### `<Name>.css`

Every value pulled from a token. **No raw hex, px, or shadow literals.** If the token doesn't exist yet, add it to `src/tokens/` and reference here.

```css
@import '../../tokens.css';

.button {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-control);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  transition: background-color 0.2s ease;
}

.button--sm  { font-size: var(--font-size-14); padding: var(--spacing-8) var(--spacing-12); }
.button--md  { font-size: var(--font-size-16); padding: var(--spacing-12) var(--spacing-16); }
.button--lg  { font-size: var(--font-size-20); padding: var(--spacing-16) var(--spacing-24); }

.button--primary    { background: var(--accent-default); color: var(--text-on-accent); }
.button--secondary  { background: transparent; color: var(--text-primary); box-shadow: inset 0 0 0 1px var(--border-default); }
.button--ghost      { background: transparent; color: var(--text-primary); }
.button--destructive { background: var(--brand-breaking); color: var(--text-on-accent); }

.button:disabled    { opacity: 0.5; cursor: not-allowed; }
```

### `<Name>.stories.tsx`

CSF3 format. **One story per variant.** Storybook Controls expose every prop. `tags: ['autodocs']` generates the docs page.

```tsx
import type { Meta, StoryObj } from '@storybook/react';
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
  args: { children: 'Continue' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants — one story per
export const Primary: Story     = { args: { variant: 'primary' } };
export const Secondary: Story   = { args: { variant: 'secondary' } };
export const Ghost: Story       = { args: { variant: 'ghost' } };
export const Destructive: Story = { args: { variant: 'destructive' } };

// Sizes
export const Small: Story  = { args: { variant: 'primary', size: 'sm' } };
export const Medium: Story = { args: { variant: 'primary', size: 'md' } };
export const Large: Story  = { args: { variant: 'primary', size: 'lg' } };

// States
export const Disabled: Story = { args: { variant: 'primary', disabled: true } };
```

### `<Name>.figma.tsx`

Code Connect mapping. Connects a Figma component to its React component so designers see live code in dev mode.

```tsx
import { figma } from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  // Figma component URL — get from right-clicking the main component → Copy link to selection
  'https://www.figma.com/design/eWc98Xh9u5EOvbVd9c7JT3/?node-id=<NODE_ID>',
  {
    props: {
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Secondary: 'secondary',
        Ghost: 'ghost',
        Destructive: 'destructive',
      }),
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      disabled: figma.boolean('Disabled'),
      children: figma.textContent('Label'),
    },
    example: ({ variant, size, disabled, children }) => (
      <Button variant={variant} size={size} disabled={disabled}>{children}</Button>
    ),
  },
);
```

### `index.ts`

```ts
export * from './Button';
```

## Definition of done (copy into PR description)

- [ ] Figma component built fresh with auto-layout; every property bound to a token (no raw hex / px / shadow values)
- [ ] All variants implemented as Figma component properties
- [ ] React component in `src/components/<Name>/<Name>.tsx`
- [ ] Storybook story for every variant
- [ ] Visual regression baseline captured in Chromatic
- [ ] `.figma.tsx` Code Connect mapping with the actual node ID
- [ ] PR description includes a Figma URL with `?node-id=…`

## Token-only rule

Components consume tokens; they don't define values. Concretely:

- ❌ `padding: 16px;` → ✅ `padding: var(--spacing-16);`
- ❌ `color: #181a1e;` → ✅ `color: var(--text-primary);`
- ❌ `border-radius: 8px;` → ✅ `border-radius: var(--radius-md);`
- ❌ `box-shadow: 0 4px 12px rgba(0,0,0,0.12);` → ✅ `box-shadow: var(--elevation-md);`

If the right token doesn't exist, **add it to `src/tokens/<category>.css` first, then use it** — don't inline a value because it's faster.
