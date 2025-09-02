/**
 * Input Component - React wrapper for ui-components InputFactory
 */

import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

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
  onChange?: (_event: Event) => void;
  onFocus?: (_event: FocusEvent) => void;
  onBlur?: (_event: FocusEvent) => void;
  onInput?: (_event: Event) => void;
}

export const Input: React.FC<InputProps> = ({
  onChange,
  onFocus,
  onBlur,
  onInput,
  ...props
}) => {
  const handleEvent = (eventType: string, detail: any) => {
    switch (eventType) {
      case 'change':
        if (onChange) onChange(detail);
        break;
      case 'focus':
        if (onFocus) onFocus(detail);
        break;
      case 'blur':
        if (onBlur) onBlur(detail);
        break;
      case 'input':
        if (onInput) onInput(detail);
        break;
    }
  };

  return createFactoryComponent<InputProps>('Input', 'Input')({
    ...props,
    onEvent: handleEvent
  });
};

export default Input;
