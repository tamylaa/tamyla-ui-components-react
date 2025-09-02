/**
 * Main Entry Point - UI Components React v1.1.1
 * Professional React-based component library with Trading Portal state management
 * Enhanced with ESLint 9.x flat config support and improved npm publishing
 */

// Core exports
export { designTokens } from './core/design-tokens';
// Temporarily disabled due to Rollup JSX parsing issues
// export { TamylaThemeProvider, useTamylaTheme, GlobalStyles } from './core/theme-provider';

// Factory Bridge - SINGLE UNIFIED ARCHITECTURE
// Direct export to test inclusion
export const DIRECT_TEST_EXPORT = 'Direct export from index.ts';

// Import and re-export
import { TEST_EXPORT, FactoryBridge } from './core/factory/factory-bridge';
export { TEST_EXPORT, FactoryBridge };

// Export all React component exports
export * from './core/factory/factory-bridge';

// Store exports
export { store, persistor } from './store/store';
export { authActions, uiActions, themeActions, componentActions } from './store/store';

// Hooks exports
export {
  useAppDispatch,
  useAppSelector,
  useAuth,
  useUI,
  useTheme,
  useComponent,
  useResponsive,
  useSearch,
  useLoading,
  useNotifications
} from './store/hooks';

// Type exports from slices
// (Moved to end to fix Rollup build issues)

// Component exports - Factory Bridge Components (COMPLETE 100% feature parity with ui-components!)
// ATOMS (12 components - COMPLETE parity including all button variants)
export { default as Button } from './components/atoms/Button';
export { default as ButtonPrimary } from './components/atoms/ButtonPrimary';
export { default as ButtonSecondary } from './components/atoms/ButtonSecondary';
export { default as ButtonGhost } from './components/atoms/ButtonGhost';
export { default as ButtonDanger } from './components/atoms/ButtonDanger';
export { default as ButtonSuccess } from './components/atoms/ButtonSuccess';
export { default as ButtonWithIcon } from './components/atoms/ButtonWithIcon';
export { default as ButtonIconOnly } from './components/atoms/ButtonIconOnly';
export { default as Input } from './components/atoms/Input';
export { default as StatusIndicator } from './components/atoms/StatusIndicator';
export { default as Card } from './components/atoms/Card';
export { default as InputGroup } from './components/atoms/InputGroup';

// MOLECULES (6 components - COMPLETE parity)
export { default as SearchBar } from './components/molecules/SearchBar';
export { default as SearchBarNew } from './components/molecules/SearchBarNew';
export { default as ActionCard } from './components/molecules/ActionCard';
export { default as ContentCard } from './components/molecules/ContentCard';
export { default as FileList } from './components/molecules/FileList';
export { default as Notification } from './components/molecules/Notification';

// ORGANISMS (5 components + Dashboard variants - complete organism coverage)
export { default as Dashboard, DashboardSearch, DashboardContent, DashboardKnowledge, DashboardMedia } from './components/organisms/Dashboard';
export { default as SearchInterface } from './components/organisms/SearchInterface';
export { default as Reward } from './components/organisms/Reward';
export { default as Modal } from './components/organisms/Modal';
export { default as MobileSidebar } from './components/organisms/MobileSidebar';

// APPLICATIONS (3 components - COMPLETE parity)
export { default as EnhancedSearch } from './components/applications/EnhancedSearch';
export { default as ContentManager } from './components/applications/ContentManager';
export { default as CampaignSelector } from './components/applications/CampaignSelector';

// Package metadata
export const VERSION = '1.0.0';
export const BUILD_DATE = new Date().toISOString();
export const FEATURES = [
  'React 18 with TypeScript',
  'Redux Toolkit state management',
  'Styled-components theming',
  'Framer Motion animations',
  'Design token system',
  'Accessibility (WCAG 2.1 AA)',
  'Responsive design',
  'Tree-shaking support',
  'Storybook documentation',
  'Jest testing suite'
];

// Default export removed to fix TypeScript issues
// Use named exports instead: import { designTokens, TamylaThemeProvider, store, persistor } from '@tamyla/ui-components-react'

// ============================================
// TYPE EXPORTS TEMPORARILY DISABLED
// (Rollup having issues with export type syntax)
// ============================================

// TODO: Fix Rollup TypeScript configuration to enable type exports
// export type { DesignTokens, ColorScale, SpacingScale, FontSize, BorderRadius, Shadow, Breakpoint } from './core/design-tokens';
// export type { StyledTheme } from './core/theme-provider';
// export type { RootState, AppDispatch } from './store/store';
// export type { User, AuthState } from './store/slices/authSlice';
// export type { UIState, Notification, Modal } from './store/slices/uiSlice';
// export type { ThemeState } from './store/slices/themeSlice';
// export type { ComponentConfig, ComponentState } from './store/slices/componentSlice';
