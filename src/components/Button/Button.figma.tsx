import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/eWc98Xh9u5EOvbVd9c7JT3/NBC?node-id=196-95',
  {
    props: {
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Secondary: 'secondary',
        Ghost: 'ghost',
        Destructive: 'destructive',
      }),
      size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
      // Hover/Active are CSS pseudo-states in code; only Disabled maps to a prop
      disabled: figma.enum('State', { Disabled: true }),
      children: figma.string('Label'),
    },
    example: ({ variant, size, disabled, children }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        {children}
      </Button>
    ),
  },
);
