import React from 'react';
import { createFactoryComponent } from '../core/factory-bridge';

export interface ButtonSuccessProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const ButtonSuccess = createFactoryComponent<ButtonSuccessProps>(
  'ButtonSuccess',
  'ButtonSuccess'
);

export default ButtonSuccess;
