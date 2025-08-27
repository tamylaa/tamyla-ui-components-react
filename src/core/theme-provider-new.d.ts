/**
 * Theme Provider - Unified theming system
 * Combines ui-components design tokens with Trading Portal theme management
 */
import React from 'react';
import { designTokens } from './design-tokens';
interface ThemeContextValue {
    tokens: typeof designTokens;
    currentMode: 'light' | 'dark' | 'auto';
    primaryColor: string;
    fontSize: 'sm' | 'md' | 'lg';
    animations: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
}
interface TamylaThemeProviderProps {
    children: React.ReactNode;
}
export declare const GlobalStyles: React.NamedExoticComponent<import("styled-components").ExecutionProps & object>;
export interface StyledTheme {
    mode: 'light' | 'dark' | 'auto';
    primaryColor: string;
    fontSize: 'sm' | 'md' | 'lg';
    animations: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
}
export declare const TamylaThemeProvider: React.FC<TamylaThemeProviderProps>;
export declare const useTamylaTheme: () => ThemeContextValue;
export default TamylaThemeProvider;
//# sourceMappingURL=theme-provider-new.d.ts.map