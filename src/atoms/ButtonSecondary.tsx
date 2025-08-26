import React from 'react';
import { createFactoryComponent } from '../core/factory-bridge';

export interface ButtonSecondaryProps {
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

export const ButtonSecondary = createFactoryComponent<ButtonSecondaryProps>(
  'ButtonSecondary',
  'ButtonSecondary'
);

export default ButtonSecondary;
