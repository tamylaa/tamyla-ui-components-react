/**
 * Theme Utilities - Helper functions for theme-aware styling
 * Provides utilities to consume CSS custom properties from design tokens
 */

import { designTokens } from '../core/design-tokens';

/**
 * Get CSS custom property value for a color
 */
export const getThemeColor = (colorPath: string): string => {
  return `var(--${colorPath.replace(/\./g, '-')})`;
};

/**
 * Get CSS custom property value for spacing
 */
export const getThemeSpacing = (scale: keyof typeof designTokens.spacing): string => {
  return `var(--space-${scale})`;
};

/**
 * Get CSS custom property value for typography
 */
export const getThemeFontSize = (scale: keyof typeof designTokens.typography.fontSize): string => {
  return `var(--font-size-${scale})`;
};

/**
 * Get CSS custom property value for border radius
 */
export const getThemeBorderRadius = (scale: keyof typeof designTokens.radii): string => {
  return `var(--radius${scale !== 'base' ? `-${scale}` : ''})`;
};

/**
 * Get CSS custom property value for shadows
 */
export const getThemeShadow = (scale: keyof typeof designTokens.shadows): string => {
  return `var(--shadow${scale !== 'base' ? `-${scale}` : ''})`;
};

/**
 * Generate theme-aware CSS classes using CSS custom properties
 */
export const createThemeClasses = {
  // Button variants using CSS custom properties
  button: {
    default: `
      background-color: var(--primary);
      color: var(--primary-foreground);
      border-color: var(--primary);
    `,
    'default-hover': `
      background-color: var(--primary-600);
      border-color: var(--primary-600);
    `,
    destructive: `
      background-color: var(--destructive);
      color: var(--destructive-foreground);
      border-color: var(--destructive);
    `,
    'destructive-hover': `
      background-color: var(--error-600);
      border-color: var(--error-600);
    `,
    outline: `
      background-color: transparent;
      color: var(--foreground);
      border-color: var(--border);
    `,
    'outline-hover': `
      background-color: var(--surface-secondary);
      color: var(--text-primary);
    `,
    secondary: `
      background-color: var(--surface-secondary);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    'secondary-hover': `
      background-color: var(--neutral-200);
    `,
    ghost: `
      background-color: transparent;
      color: var(--text-secondary);
      border-color: transparent;
    `,
    'ghost-hover': `
      background-color: var(--surface-secondary);
      color: var(--text-primary);
    `,
    link: `
      background-color: transparent;
      color: var(--primary);
      border-color: transparent;
      text-decoration: underline;
      text-underline-offset: 4px;
    `,
    'link-hover': `
      text-decoration: underline;
    `
  },

  // Badge variants using CSS custom properties
  badge: {
    default: `
      background-color: var(--surface-secondary);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    secondary: `
      background-color: var(--surface-secondary);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    destructive: `
      background-color: var(--destructive);
      color: var(--destructive-foreground);
      border-color: var(--destructive);
    `,
    outline: `
      background-color: transparent;
      color: var(--foreground);
      border-color: var(--border);
    `,
    success: `
      background-color: var(--success);
      color: var(--success-foreground);
      border-color: var(--success);
    `,
    warning: `
      background-color: var(--warning);
      color: var(--warning-foreground);
      border-color: var(--warning);
    `
  },

  // Card styling using CSS custom properties
  card: {
    default: `
      background-color: var(--surface-primary);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    elevated: `
      background-color: var(--surface-elevated);
      box-shadow: var(--shadow-md);
    `
  },

  // Alert variants using CSS custom properties
  alert: {
    default: `
      background-color: var(--surface-secondary);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    destructive: `
      background-color: var(--error-50);
      color: var(--error-900);
      border-color: var(--error-200);
    `,
    success: `
      background-color: var(--success-50);
      color: var(--success-900);
      border-color: var(--success-200);
    `,
    warning: `
      background-color: var(--warning-50);
      color: var(--warning-900);
      border-color: var(--warning-200);
    `,
    info: `
      background-color: var(--primary-50);
      color: var(--primary-900);
      border-color: var(--primary-200);
    `
  },

  // Progress bar styling using CSS custom properties
  progress: {
    default: `
      background-color: var(--surface-secondary);
    `,
    fill: `
      background-color: var(--primary);
    `
  },

  // Input styling using CSS custom properties
  input: {
    default: `
      background-color: var(--surface-primary);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    focus: `
      border-color: var(--border-focus);
      box-shadow: 0 0 0 2px var(--ring);
    `,
    error: `
      border-color: var(--error);
      box-shadow: 0 0 0 2px var(--error-100);
    `
  }
};

/**
 * Generate inline styles using CSS custom properties
 */
export const createThemeStyles = {
  button: {
    base: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
      borderColor: 'var(--primary)',
      borderRadius: 'var(--radius)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      transition: 'all 0.2s ease-in-out'
    },
    hover: {
      backgroundColor: 'var(--primary-600)',
      borderColor: 'var(--primary-600)'
    }
  },

  badge: {
    base: {
      backgroundColor: 'var(--surface-secondary)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)'
    }
  },

  card: {
    base: {
      backgroundColor: 'var(--surface-primary)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }
};

/**
 * Utility to combine theme classes with component classes
 */
export const combineThemeClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Check if dark mode is active
 */
/**
 * SSR-safe dark mode detection
 */
export const isDarkMode = (): boolean => {
  if (typeof document === 'undefined') return false; // SSR guard
  return document.documentElement.classList.contains('dark');
};

/**
 * Get theme-aware color value
 */
export const getThemeAwareColor = (lightColor: string, darkColor: string): string => {
  return isDarkMode() ? darkColor : lightColor;
};
