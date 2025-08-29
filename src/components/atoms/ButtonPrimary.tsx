import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

export interface ButtonPrimaryProps {
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

export const ButtonPrimary = createFactoryComponent<ButtonPrimaryProps>(
  'ButtonPrimary',
  'ButtonPrimary'
);

export default ButtonPrimary;
