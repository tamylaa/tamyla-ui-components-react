// Central core exports: pick canonical implementations here
export { default as FactoryBridge } from './factory/factory-bridge';
export { useFactoryBridge, AVAILABLE_FACTORIES } from './factory/factory-bridge';
export * from './factory/factory-bridge'; // Export all React components

// Theme and design system exports
export { designTokens } from './design-tokens';
export { TamylaThemeProvider, GlobalStyles, useTamylaTheme } from './theme-provider-new';
