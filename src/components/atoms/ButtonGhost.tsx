import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

export interface ButtonGhostProps {
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

export const ButtonGhost = createFactoryComponent<ButtonGhostProps>(
  'ButtonGhost',
  'ButtonGhost'
);

export default ButtonGhost;
