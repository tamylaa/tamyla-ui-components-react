import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

export interface ButtonIconOnlyProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  'aria-label': string;
  tooltip?: string;
  className?: string;
}

export const ButtonIconOnly = createFactoryComponent<ButtonIconOnlyProps>(
  'ButtonIconOnly',
  'ButtonIconOnly'
);

export default ButtonIconOnly;
