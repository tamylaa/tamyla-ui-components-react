/**
 * Theme Provider - Unified theming system
 * Combines ui-components design tokens with Trading Portal theme management
 */

import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import { useAppSelector } from '../store/hooks';
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
    --tmyl-primary-500: #3b82f6;
    --tmyl-space-4: 1rem;
    --tmyl-text-base: 1rem;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
    color: #1f2937;
    background-color: #ffffff;
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
  const themeState = useAppSelector(state => state.theme);

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

      <StyledThemeProvider theme={styledTheme as any}>
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
