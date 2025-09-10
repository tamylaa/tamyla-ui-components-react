/**
 * Standardized Component Props - shadcn/ui inspired
 * Provides consistent prop interfaces across all components
 */

import React from 'react';

// Core shadcn/ui variants (standard across all components)
export type ComponentVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

// Core shadcn/ui sizes (standard across most components)
export type ComponentSize = 'xs' | 'sm' | 'default' | 'lg';

// Extended sizes for specific components (like buttons with icons)
export type ButtonSize = ComponentSize | 'icon';

// Standardized component props interface
export interface StandardizedComponentProps {
  // Core shadcn/ui props
  variant?: ComponentVariant;
  size?: ComponentSize;

  // Enterprise features (common across components)
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  componentId?: string;
}

// Button-specific extensions
export interface StandardizedButtonProps extends Omit<StandardizedComponentProps, 'variant' | 'size'> {
  variant?: ComponentVariant | 'link'; // Button gets additional 'link' variant
  size?: ButtonSize; // Button gets additional 'icon' size
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  useThemeVariant?: boolean;
}

// Input-specific extensions
export interface StandardizedInputProps extends StandardizedComponentProps {
  error?: boolean;
  errorMessage?: string;
  helpText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  required?: boolean;
}
