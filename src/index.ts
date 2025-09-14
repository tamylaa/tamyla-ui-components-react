/**
 * Tamyla UI React Components v1.1.1
 *
 * ARCHITECTURE: Dual-mode component library with performance optimizations
 * - Native React: Pure React implementations with React.memo for simple components
 * - Wrapper React: Factory-based wrappers with lazy loading for complex components
 * - Performance: Strategic memoization and code splitting for optimal bundle size
 *
 * This provides the best of both worlds: performance + feature completeness
 */

import React, { memo, lazy, Suspense } from 'react';

// ============================================
// PERFORMANCE OPTIMIZATION IMPORTS
// ============================================

// Import original components for optimization
import { Button as OriginalButton } from './components/atoms/Button';
import { Input as OriginalInput } from './components/atoms/Input';
import { default as OriginalErrorBoundary } from './components/atoms/ErrorBoundary';
import {
  Card as OriginalCard,
  CardHeader as OriginalCardHeader,
  CardTitle as OriginalCardTitle,
  CardContent as OriginalCardContent
} from './components/atoms/Card';

// ============================================
// MEMOIZED NATIVE REACT COMPONENTS (High Performance)
// ============================================

// Export components from the main components index (already optimized)
export * from './components';

// Enhanced shadcn/ui inspired components with React.memo optimization
export const Button = memo(OriginalButton);
export const Input = memo(OriginalInput);
export const ErrorBoundary = memo(OriginalErrorBoundary);

// Card compound components with memoization
export const Card = memo(OriginalCard);
export const CardHeader = memo(OriginalCardHeader);
export const CardTitle = memo(OriginalCardTitle);
export const CardContent = memo(OriginalCardContent);

// Form components (keep as-is - they're already compound components)
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from './components/organisms/Dialog';

export {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormInput,
  FormTextarea
} from './components/molecules/Form';

export {
  Navigation,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from './components/organisms/Navigation';

// ============================================
// WRAPPER REACT COMPONENTS (Factory-based, Feature Complete)
// ============================================

// ATOMS - Factory Wrappers (12 components - COMPLETE parity)
export { default as ButtonPrimary } from './components/atoms/ButtonPrimary';
export { default as ButtonSecondary } from './components/atoms/ButtonSecondary';
export { default as ButtonGhost } from './components/atoms/ButtonGhost';
export { default as ButtonDanger } from './components/atoms/ButtonDanger';
export { default as ButtonSuccess } from './components/atoms/ButtonSuccess';
export { default as ButtonWithIcon } from './components/atoms/ButtonWithIcon';
export { default as ButtonIconOnly } from './components/atoms/ButtonIconOnly';
export { default as InputGroup } from './components/atoms/InputGroup';

// MOLECULES - Factory Wrappers (6 components - COMPLETE parity)
export { default as SearchBar } from './components/molecules/SearchBar';
export { default as SearchBarNew } from './components/molecules/SearchBarNew';
export { default as ActionCard } from './components/molecules/ActionCard';
export { default as ContentCard } from './components/molecules/ContentCard';
export { default as FileList } from './components/molecules/FileList';
export { default as Notification } from './components/molecules/Notification';

// ORGANISMS - Factory Wrappers (5 components + Dashboard variants)
export { default as Dashboard, DashboardSearch, DashboardContent, DashboardKnowledge, DashboardMedia } from './components/organisms/Dashboard';
export { default as SearchInterface } from './components/organisms/SearchInterface';
export { default as Reward } from './components/organisms/Reward';
export { default as Modal } from './components/organisms/Modal';
export { default as MobileSidebar } from './components/organisms/MobileSidebar';

// APPLICATIONS - Factory Wrappers (3 components - COMPLETE parity)
export { default as EnhancedSearch } from './components/applications/EnhancedSearch';
export { default as ContentManager } from './components/applications/ContentManager';
export { default as CampaignSelector } from './components/applications/CampaignSelector';

// ============================================
// PERFORMANCE UTILITIES & LOADING COMPONENTS
// ============================================

// Export performance optimization utilities for advanced usage
export {
  smartMemo,
  autoMemo,
  heavyMemo,
  createLazyComponent,
  batchLazy
} from './utils/performance-optimization';

export {
  MEMOIZATION_CONFIG,
  LAZY_LOADING_CONFIG,
  MONITORING_CONFIG
} from './utils/performance-config';

// Loading fallback components for better UX
export const LoadingSpinner = () => React.createElement('div', {
  style: { padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }
}, 'Loading...');

export const LoadingDashboard = () => React.createElement('div', {
  style: { padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }
}, 'Loading Dashboard...');

export const LoadingSearch = () => React.createElement('div', {
  style: { padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }
}, 'Loading Search...');

export const LoadingManager = () => React.createElement('div', {
  style: { padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }
}, 'Loading Manager...');

// ============================================
// SHARED INFRASTRUCTURE
// ============================================

// Core design tokens
export { designTokens } from './core/design-tokens';

// Theme provider and styling
export { TamylaThemeProvider, GlobalStyles, useTamylaTheme } from './core/theme-provider-new';

// Store exports - Explicitly preserve these for external consumers
import { store, persistor, authActions, uiActions, themeActions, componentActions } from './store/store';

export { store, persistor, authActions, uiActions, themeActions, componentActions };

// Force preservation of Redux exports by creating side effects
// This prevents tree-shaking from removing these exports
if (typeof window !== 'undefined' && window) {
  // Attach to window to ensure they're preserved
  (window as any).__TAMYLA_REDUX_EXPORTS__ = {
    store,
    persistor,
    authActions,
    uiActions,
    themeActions,
    componentActions
  };
}

// Also export them as named exports to ensure they're available
export const reduxStore = store;
export const reduxPersistor = persistor;
export const reduxAuthActions = authActions;
export const reduxUiActions = uiActions;
export const reduxThemeActions = themeActions;
export const reduxComponentActions = componentActions;

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

// Redux-optional utilities
export {
  useAppDispatchOptional,
  useAppSelectorOptional,
  useThemeOptional,
  useUIOptional,
  useAnalyticsOptional,
  ThemeProvider,
  UIProvider,
  hasRedux
} from './utils/redux-optional';

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
  'Jest testing suite',
  'Dual-mode architecture: Native + Wrapper components'
];

// ============================================
// ENTERPRISE-GRADE UTILITIES (MUST PRESERVE)
// ============================================

// Advanced security and safety utilities
export {
  safeAsync,
  safeFetch,
  safeDynamicImport
} from './utils/async-safety';

export type { AsyncOperationOptions } from './utils/async-safety';

export {
  sanitizeHTML,
  safeSetInnerHTML,
  safeCreateElementFromHTML
} from './utils/dom-safety';

export {
  dynamicImportUIComponents
} from './utils/dynamic-ui-components';

export type { UIComponentsModule } from './utils/dynamic-ui-components';

export {
  FactoryHealthMonitor
} from './utils/factory-health-monitor';

export type { FactoryHealthStatus } from './utils/factory-health-monitor';

// Enhanced logging for enterprise monitoring
export {
  Logger,
  LogLevel
} from './utils/logger';

export type {
  LogConfig,
  LogEntry
} from './utils/logger';

// ============================================
// TYPE DEFINITIONS (MUST PRESERVE)
// ============================================

export type {
  ComponentProps,
  ComponentState,
  BaseComponentConfig,
  ComponentRegistryEntry
} from './types/common';

export type {
  BaseFactoryComponent,
  FactoryCreator,
  ComponentEventData
} from './types/factory';

// Handle naming conflicts explicitly
export type { ComponentFactory as CommonComponentFactory } from './types/common';
export type { ComponentFactory as FactoryComponentFactory, FactoryConfig } from './types/factory';

// ============================================
// LICENSE VALIDATION UTILITIES
// ============================================

// Export license validation utilities
export * from './utils/license-validation';

// Export premium components (with license checks)
export { PremiumDashboard, usePremiumFeature, withPremiumCheck } from './components/premium/PremiumDashboard';

// ============================================
// CSS DESIGN TOKENS (MUST PRESERVE)
// ============================================

// Note: CSS design tokens are included via package.json "files" and "sideEffects"
// Consumers should import: import '@tamyla/ui-components-react/src/core/design-tokens.css'
