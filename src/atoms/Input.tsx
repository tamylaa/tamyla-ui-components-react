/**
 * Input Component - export const Input = createFactoryComponent<InputProps>(
  'Input',
  'Input'
);rapper for ui-components InputFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'filled' | 'outlined';
  icon?: string;
  iconPosition?: 'left' | 'right';
  validation?: boolean;
  errorMessage?: string;
  helpText?: string;
  // Event handlers
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onInput?: (event: Event) => void;
}

export const Input = createFactoryComponent<InputProps>(
  'Input',
  'Input'
);

export default Input;
