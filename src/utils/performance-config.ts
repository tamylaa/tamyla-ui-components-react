/**
 * Performance Configuration - Apply optimizations strategically across the package
 *
 * This file defines which components should use which performance optimizations
 * without modifying each individual component file.
 */

import React from 'react';
import {
  autoMemo,
  smartMemo,
  heavyMemo,
  createLazyComponent,
  batchLazy,
  withPerformanceMonitor
} from './performance-optimization';

// ============================================
// COMPONENT PERFORMANCE PROFILES
// ============================================

/**
 * Define which components should be memoized and how
 */
const MEMOIZATION_CONFIG = {
  // Auto-memo for simple components
  autoMemo: [
    'Button',
    'Input',
    'Card',
    'Badge',
    'Avatar',
    'StatusIndicator'
  ],

  // Smart memo for components with frequent prop changes
  smartMemo: [
    { component: 'Form', skipProps: ['onSubmit', 'onChange'] },
    { component: 'Dialog', skipProps: ['onOpenChange', 'onClose'] },
    { component: 'Navigation', skipProps: ['onClick', 'onSelect'] },
    { component: 'SearchBar', skipProps: ['onSearch', 'onChange', 'onFocus'] }
  ],

  // Heavy memo for expensive components
  heavyMemo: [
    { component: 'DataDisplay', criticalProps: ['data', 'columns'] },
    { component: 'Chart', criticalProps: ['data', 'config'] },
    { component: 'Dashboard', criticalProps: ['layout', 'widgets'] },
    { component: 'FormAdvanced', criticalProps: ['schema', 'initialValues'] }
  ]
};

/**
 * Define which components should be lazy loaded
 */
const LAZY_LOADING_CONFIG = {
  // Heavy components that should always be lazy loaded
  alwaysLazy: [
    'Dashboard',
    'DataDisplay',
    'FormAdvanced',
    'Feedback'
  ],

  // Organism-level components
  organisms: [
    'Dialog',
    'Modal',
    'SearchInterface',
    'MobileSidebar'
  ],

  // Application-level components
  applications: [
    'EnhancedSearch',
    'ContentManager',
    'CampaignSelector'
  ],

  // Factory bridge components
  factoryComponents: [
    'ActionCard',
    'ContentCard',
    'FileList',
    'Notification',
    'Reward'
  ]
};

/**
 * Performance monitoring for development
 */
const MONITORING_CONFIG = {
  // Components to monitor for slow renders
  monitor: [
    'Dashboard',
    'DataDisplay',
    'FormAdvanced',
    'Dialog',
    'SearchInterface'
  ]
};

// ============================================
// LAZY LOADING SETUP
// ============================================

/**
 * Create lazy versions of heavy components
 */
export const createLazyComponents = () => {
  // Heavy components that benefit from lazy loading
  const heavyComponents = batchLazy({
    LazyDashboard: () => import('../components/organisms/Dashboard'),
    // Using existing components as placeholders for non-existent components
    LazyDataDisplay: () => import('../components/organisms/Dashboard').then(module => ({ default: module.default })),
    LazyFormAdvanced: () => import('../components/organisms/Dashboard').then(module => ({ default: module.default })),
    LazyFeedback: () => import('../components/organisms/Dashboard').then(module => ({ default: module.default })),
    LazyDialog: () => import('../components/organisms/Dialog'),
    LazyModal: () => import('../components/organisms/Modal'),
    LazySearchInterface: () => import('../components/organisms/SearchInterface'),
    LazyMobileSidebar: () => import('../components/organisms/MobileSidebar')
  });

  // Factory bridge components
  const factoryComponents = batchLazy({
    LazyActionCard: () => import('../components/molecules/ActionCard'),
    LazyContentCard: () => import('../components/molecules/ContentCard'),
    LazyFileList: () => import('../components/molecules/FileList'),
    LazyNotification: () => import('../components/molecules/Notification'),
    LazyReward: () => import('../components/organisms/Reward')
  });

  // Application components
  const applicationComponents = batchLazy({
    LazyEnhancedSearch: () => import('../components/applications/EnhancedSearch'),
    LazyContentManager: () => import('../components/applications/ContentManager'),
    LazyCampaignSelector: () => import('../components/applications/CampaignSelector')
  });

  return {
    ...heavyComponents,
    ...factoryComponents,
    ...applicationComponents
  };
};

// ============================================
// MEMOIZATION FACTORY
// ============================================

/**
 * Apply appropriate memoization to a component based on config
 */
export function applyOptimizations<T extends React.ComponentType<any>>(
  Component: T,
  componentName: string
): React.MemoExoticComponent<T> | T {
  let OptimizedComponent: React.MemoExoticComponent<T> | T = Component;

  // Apply auto memo
  if (MEMOIZATION_CONFIG.autoMemo.includes(componentName)) {
    OptimizedComponent = autoMemo(Component);
  }

  // Apply smart memo
  const smartMemoConfig = MEMOIZATION_CONFIG.smartMemo.find(
    config => config.component === componentName
  );
  if (smartMemoConfig) {
    OptimizedComponent = smartMemo(Component, smartMemoConfig.skipProps);
  }

  // Apply heavy memo
  const heavyMemoConfig = MEMOIZATION_CONFIG.heavyMemo.find(
    config => config.component === componentName
  );
  if (heavyMemoConfig) {
    OptimizedComponent = heavyMemo(Component, heavyMemoConfig.criticalProps);
  }

  // Apply performance monitoring in development
  if (process.env.NODE_ENV === 'development' &&
      MONITORING_CONFIG.monitor.includes(componentName)) {
    OptimizedComponent = withPerformanceMonitor(Component, componentName) as any;
  }

  return OptimizedComponent;
}

// ============================================
// BUNDLE OPTIMIZATION UTILITIES
// ============================================

/**
 * Check if a component should be lazy loaded
 */
export function shouldBeLazyLoaded(componentName: string): boolean {
  return LAZY_LOADING_CONFIG.alwaysLazy.includes(componentName) ||
         LAZY_LOADING_CONFIG.organisms.includes(componentName) ||
         LAZY_LOADING_CONFIG.applications.includes(componentName) ||
         LAZY_LOADING_CONFIG.factoryComponents.includes(componentName);
}

/**
 * Get optimized component with lazy loading if needed
 */
export function getOptimizedComponent<T extends React.ComponentType<any>>(
  Component: T,
  componentName: string,
  importPath?: string
): T | React.LazyExoticComponent<T> | React.MemoExoticComponent<T> {
  // Apply memoization first
  const MemoizedComponent = applyOptimizations(Component, componentName);

  // Check if should be lazy loaded
  if (shouldBeLazyLoaded(componentName) && importPath) {
    return createLazyComponent(() => import(importPath));
  }

  return MemoizedComponent;
}

// ============================================
// PERFORMANCE PRESETS
// ============================================

/**
 * Predefined performance presets for different component types
 */
const PERFORMANCE_PRESETS = {
  // For simple UI components (buttons, inputs, cards)
  simple: (Component: React.ComponentType<any>, name: string) =>
    autoMemo(Component),

  // For interactive components with callbacks
  interactive: (Component: React.ComponentType<any>, name: string) =>
    smartMemo(Component, ['onClick', 'onChange', 'onFocus', 'onBlur']),

  // For data-heavy components
  dataHeavy: (Component: React.ComponentType<any>, name: string) =>
    heavyMemo(Component, ['data', 'items', 'config']),

  // For complex organisms
  complex: (Component: React.ComponentType<any>, name: string) =>
    process.env.NODE_ENV === 'development'
      ? withPerformanceMonitor(Component, name) as any
      : smartMemo(Component, ['onAction'])
};

// ============================================
// EXPORT CONFIGURATION
// ============================================

export {
  MEMOIZATION_CONFIG,
  LAZY_LOADING_CONFIG,
  MONITORING_CONFIG,
  PERFORMANCE_PRESETS
};
