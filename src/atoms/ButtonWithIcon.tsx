import React from 'react';
import { createFactoryComponent } from '../core/factory-bridge';

export interface ButtonWithIconProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon: string;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  className?: string;
}

export const ButtonWithIcon = createFactoryComponent<ButtonWithIconProps>(
  'ButtonWithIcon',
  'ButtonWithIcon'
);

export default ButtonWithIcon;
