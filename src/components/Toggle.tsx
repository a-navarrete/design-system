import React from 'react';
import './Toggle.css';

interface ToggleProps {
  /** Is the toggle switched on? */
  checked?: boolean;
  /** Callback when the state changes */
  onChange?: (checked: boolean) => void;
  /** Accessible label */
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label = 'Toggle',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className="toggle">
      <input
        type="checkbox"
        className="toggle__input"
        checked={checked}
        onChange={handleChange}
        aria-label={label}
      />
      <span className="toggle__slider">
        <span className="toggle__knob" />
      </span>
    </label>
  );
};
