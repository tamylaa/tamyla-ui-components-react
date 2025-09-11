/**
 * Theme Provider - Unified theming system
 * Combines ui-components design tokens with Trading Portal theme management
 */

import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle, DefaultTheme } from 'styled-components';
import { useAppSelector } from '../store/hooks';
import { ThemeState } from '../store/slices/themeSlice';
import { designTokens } from './design-tokens';

// Theme context interface
interface ThemeContextValue {
  tokens: typeof designTokens;
  currentMode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

// Create theme context
const ThemeContext = createContext<ThemeContextValue | null>(null);

// Theme provider props
interface TamylaThemeProviderProps {
  children: React.ReactNode;
}

// Global styles component
export const GlobalStyles = createGlobalStyle`
  :root {
    /* Primary Colors */
    --primary: ${designTokens.colors.primary[500]};
    --primary-foreground: ${designTokens.colors.primary.contrast};
    --primary-50: ${designTokens.colors.primary[50]};
    --primary-100: ${designTokens.colors.primary[100]};
    --primary-200: ${designTokens.colors.primary[200]};
    --primary-300: ${designTokens.colors.primary[300]};
    --primary-400: ${designTokens.colors.primary[400]};
    --primary-500: ${designTokens.colors.primary[500]};
    --primary-600: ${designTokens.colors.primary[600]};
    --primary-700: ${designTokens.colors.primary[700]};
    --primary-800: ${designTokens.colors.primary[800]};
    --primary-900: ${designTokens.colors.primary[900]};

    /* Neutral Colors */
    --neutral-50: ${designTokens.colors.neutral[50]};
    --neutral-100: ${designTokens.colors.neutral[100]};
    --neutral-200: ${designTokens.colors.neutral[200]};
    --neutral-300: ${designTokens.colors.neutral[300]};
    --neutral-400: ${designTokens.colors.neutral[400]};
    --neutral-500: ${designTokens.colors.neutral[500]};
    --neutral-600: ${designTokens.colors.neutral[600]};
    --neutral-700: ${designTokens.colors.neutral[700]};
    --neutral-800: ${designTokens.colors.neutral[800]};
    --neutral-900: ${designTokens.colors.neutral[900]};

    /* Semantic Colors */
    --success: ${designTokens.colors.semantic.success.main};
    --success-foreground: ${designTokens.colors.semantic.success.contrast};
    --warning: ${designTokens.colors.semantic.warning.main};
    --warning-foreground: ${designTokens.colors.semantic.warning.contrast};
    --error: ${designTokens.colors.semantic.error.main};
    --error-foreground: ${designTokens.colors.semantic.error.contrast};
    --error-border: ${designTokens.colors.semantic.error.main};
    --error-bg: ${designTokens.colors.semantic.error.light};
    --error-text: ${designTokens.colors.semantic.error.dark};
    --destructive: ${designTokens.colors.semantic.error.main};
    --destructive-foreground: ${designTokens.colors.semantic.error.contrast};

    /* Surface Colors */
    --background: ${designTokens.colors.surface.primary};
    --foreground: ${designTokens.colors.text.primary};
    --surface-primary: ${designTokens.colors.surface.primary};
    --surface-secondary: ${designTokens.colors.surface.secondary};
    --surface-elevated: ${designTokens.colors.surface.elevated};

    /* Text Colors */
    --text-primary: ${designTokens.colors.text.primary};
    --text-secondary: ${designTokens.colors.text.secondary};
    --text-tertiary: ${designTokens.colors.text.tertiary};
    --text-inverse: ${designTokens.colors.text.inverse};
    --text-disabled: ${designTokens.colors.text.disabled};

    /* Border Colors */
    --border: ${designTokens.colors.border.primary};
    --border-secondary: ${designTokens.colors.border.secondary};
    --border-focus: ${designTokens.colors.border.focus};
    --input: ${designTokens.colors.border.primary};
    --ring: ${designTokens.colors.border.focus};

    /* Spacing */
    --space-0: ${designTokens.spacing[0]};
    --space-1: ${designTokens.spacing[1]};
    --space-2: ${designTokens.spacing[2]};
    --space-3: ${designTokens.spacing[3]};
    --space-4: ${designTokens.spacing[4]};
    --space-5: ${designTokens.spacing[5]};
    --space-6: ${designTokens.spacing[6]};
    --space-8: ${designTokens.spacing[8]};
    --space-10: ${designTokens.spacing[10]};
    --space-12: ${designTokens.spacing[12]};
    --space-16: ${designTokens.spacing[16]};
    --space-20: ${designTokens.spacing[20]};
    --space-24: ${designTokens.spacing[24]};

    /* Typography */
    --font-family: ${designTokens.typography.fontFamily.sans.join(', ')};
    --font-family-mono: ${designTokens.typography.fontFamily.mono.join(', ')};
    --font-size-xs: ${designTokens.typography.fontSize.xs};
    --font-size-sm: ${designTokens.typography.fontSize.sm};
    --font-size-base: ${designTokens.typography.fontSize.base};
    --font-size-lg: ${designTokens.typography.fontSize.lg};
    --font-size-xl: ${designTokens.typography.fontSize.xl};
    --font-weight-normal: ${designTokens.typography.fontWeight.normal};
    --font-weight-medium: ${designTokens.typography.fontWeight.medium};
    --font-weight-semibold: ${designTokens.typography.fontWeight.semibold};
    --font-weight-bold: ${designTokens.typography.fontWeight.bold};

    /* Border Radius */
    --radius: ${designTokens.radii.base};
    --radius-sm: ${designTokens.radii.sm};
    --radius-md: ${designTokens.radii.md};
    --radius-lg: ${designTokens.radii.lg};
    --radius-xl: ${designTokens.radii.xl};

    /* Shadows */
    --shadow-sm: ${designTokens.shadows.sm};
    --shadow: ${designTokens.shadows.base};
    --shadow-md: ${designTokens.shadows.md};
    --shadow-lg: ${designTokens.shadows.lg};
    --shadow-xl: ${designTokens.shadows.xl};

    /* Z-Index */
    --z-dropdown: ${designTokens.zIndex.dropdown};
    --z-sticky: ${designTokens.zIndex.sticky};
    --z-fixed: ${designTokens.zIndex.fixed};
    --z-modal: ${designTokens.zIndex.modal};
    --z-popover: ${designTokens.zIndex.popover};
    --z-tooltip: ${designTokens.zIndex.tooltip};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: 1.5;
    color: var(--foreground);
    background-color: var(--background);
  }

  /* Dark theme overrides */
  .dark {
    --background: ${designTokens.colors.neutral[900]};
    --foreground: ${designTokens.colors.neutral[50]};
    --surface-primary: ${designTokens.colors.neutral[900]};
    --surface-secondary: ${designTokens.colors.neutral[800]};
    --surface-elevated: ${designTokens.colors.neutral[800]};
    --text-primary: ${designTokens.colors.neutral[50]};
    --text-secondary: ${designTokens.colors.neutral[200]};
    --text-tertiary: ${designTokens.colors.neutral[400]};
    --border: ${designTokens.colors.neutral[700]};
    --border-secondary: ${designTokens.colors.neutral[600]};
  }
`;

// Export styled theme type
export interface StyledTheme {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

// Main theme provider component
export const TamylaThemeProvider: React.FC<TamylaThemeProviderProps> = ({ children }) => {
  // Safely get theme state with fallback
  let themeState: ThemeState;
  try {
    themeState = useAppSelector(state => state.theme) || {
      mode: 'light' as const,
      currentTheme: 'light' as const,
      primaryColor: designTokens.colors.primary[500],
      fontSize: 'md' as const,
      animations: true,
      reducedMotion: false,
      highContrast: false,
      customColors: {}
    };
  } catch (error) {
    // Redux not available, use default theme
    themeState = {
      mode: 'light' as const,
      currentTheme: 'light' as const,
      primaryColor: designTokens.colors.primary[500],
      fontSize: 'md' as const,
      animations: true,
      reducedMotion: false,
      highContrast: false,
      customColors: {}
    };
  }

  // Apply theme class to document body with SSR safety
  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return; // SSR guard
    }

    const currentTheme = themeState.mode === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : themeState.currentTheme;

    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [themeState.mode, themeState.currentTheme]);

  // Create enhanced theme object for styled-components
  const styledTheme: StyledTheme = React.useMemo(() => ({
    mode: themeState.mode,
    primaryColor: themeState.primaryColor,
    fontSize: themeState.fontSize,
    animations: themeState.animations,
    reducedMotion: themeState.reducedMotion,
    highContrast: themeState.highContrast
  }), [themeState]);

  const themeContextValue: ThemeContextValue = React.useMemo(() => ({
    tokens: designTokens,
    currentMode: themeState.mode,
    primaryColor: themeState.primaryColor,
    fontSize: themeState.fontSize,
    animations: themeState.animations,
    reducedMotion: themeState.reducedMotion,
    highContrast: themeState.highContrast
  }), [themeState]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <GlobalStyles />

      <StyledThemeProvider theme={styledTheme as unknown as DefaultTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTamylaTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTamylaTheme must be used within TamylaThemeProvider');
  }
  return context;
};

export default TamylaThemeProvider;
