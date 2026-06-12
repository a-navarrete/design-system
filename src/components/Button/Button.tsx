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
