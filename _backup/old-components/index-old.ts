/**
 * Main Entry Point - UI Components React v1.0.0
 * Professional React-based component library with Trading Portal state management
 */

// Core exports
export { designTokens } from './core/design-tokens';

// UNIFIED FACTORY BRIDGE - Clean, consistent API
export {
  FactoryBridge,
  useComponentFactory,
  createComponentBridge,
  
  // Direct component exports
  Button,
  Input,
  Card,
  ActionCard,
  SearchBar,
  ContentCard,
  FileList,
  Notification,
  SearchInterface,
  Dashboard
} from './core/unified-bridge';

// Re-export unified bridge as default
export { default } from './core/unified-bridge';
} from './core/molecule-bridge';
export {
  OrganismBridge,
  useOrganismFactory,
  ORGANISM_FACTORIES
} from './core/organism-bridge';
export {
  ApplicationBridge,
  useApplicationFactory,
  APPLICATION_FACTORIES
} from './core/application-bridge';
export {
  FactoryBridge,
  useFactoryBridge,
  ALL_FACTORIES,
  COMPONENT_AVAILABILITY
} from './core/factory-bridge';

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
export { default as Button } from './atoms/Button';
export { default as ButtonPrimary } from './atoms/ButtonPrimary';
export { default as ButtonSecondary } from './atoms/ButtonSecondary';
export { default as ButtonGhost } from './atoms/ButtonGhost';
export { default as ButtonDanger } from './atoms/ButtonDanger';
export { default as ButtonSuccess } from './atoms/ButtonSuccess';
export { default as ButtonWithIcon } from './atoms/ButtonWithIcon';
export { default as ButtonIconOnly } from './atoms/ButtonIconOnly';
export { default as Input } from './atoms/Input';
export { default as StatusIndicator } from './atoms/StatusIndicator';
export { default as Card } from './atoms/Card';
export { default as InputGroup } from './atoms/InputGroup';

// MOLECULES (6 components - COMPLETE parity)
export { default as SearchBar } from './molecules/SearchBar';
export { default as SearchBarNew } from './molecules/SearchBarNew';
export { default as ActionCard } from './molecules/ActionCard';
export { default as ContentCard } from './molecules/ContentCard';
export { default as FileList } from './molecules/FileList';
export { default as Notification } from './molecules/Notification';

// ORGANISMS (3 components - expanding coverage)
export { default as Dashboard } from './organisms/Dashboard';
export { default as SearchInterface } from './organisms/SearchInterface';
export { default as Reward } from './organisms/Reward';

// APPLICATIONS (3 components - COMPLETE parity)
export { default as EnhancedSearch } from './applications/EnhancedSearch';
export { default as ContentManager } from './applications/ContentManager';
export { default as CampaignSelector } from './applications/CampaignSelector';

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
