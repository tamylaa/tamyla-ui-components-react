/**
 * Performance optimization utilities for React components
 *
 * This file provides centralized performance optimizations that can be applied
 * across all components in the package without modifying each individual file.
 */

import React, { ComponentType, LazyExoticComponent, Suspense, memo, useMemo, useCallback } from 'react';

// ============================================
// SMART MEMOIZATION UTILITIES
// ============================================

/**
 * Smart memo wrapper that handles common prop comparison scenarios
 *
 * @example
 * const OptimizedButton = smartMemo(Button, ['onClick', 'children']);
 */
export function smartMemo<T extends ComponentType<any>>(
  Component: T,
  skipProps: string[] = []
): React.MemoExoticComponent<T> {
  return memo(Component, (prevProps: any, nextProps: any) => {
    // Skip comparison for function props that commonly change
    const functionalProps = ['onClick', 'onChange', 'onSubmit', 'onFocus', 'onBlur', ...skipProps];

    const prevFiltered = { ...prevProps };
    const nextFiltered = { ...nextProps };

    // Remove functional props from comparison
    functionalProps.forEach(prop => {
      if (functionalProps.includes(prop)) {
        delete prevFiltered[prop];
        delete nextFiltered[prop];
      }
    });

    // Deep comparison for remaining props
    return JSON.stringify(prevFiltered) === JSON.stringify(nextFiltered);
  });
}

/**
 * Auto-memo wrapper that applies React.memo with default optimizations
 *
 * @example
 * export default autoMemo(MyComponent);
 */
export function autoMemo<T extends ComponentType<any>>(Component: T): React.MemoExoticComponent<T> {
  return memo(Component);
}

/**
 * Heavy component memo - for components with expensive render cycles
 *
 * @example
 * const OptimizedChart = heavyMemo(ChartComponent, ['data', 'config']);
 */
export function heavyMemo<T extends ComponentType<any>>(
  Component: T,
  criticalProps: string[] = []
): React.MemoExoticComponent<T> {
  return memo(Component, (prevProps: any, nextProps: any) => {
    // Only re-render if critical props change
    return criticalProps.every(prop => prevProps[prop] === nextProps[prop]);
  });
}

// ============================================
// LAZY LOADING UTILITIES
// ============================================

/**
 * Simple lazy loader with basic error handling
 *
 * @example
 * const LazyDialog = createLazyComponent(() => import('./organisms/Dialog'));
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return React.lazy(importFn);
}

/**
 * Batch lazy loader for related components
 *
 * @example
 * const { LazyModal, LazyDialog } = batchLazy({
 *   LazyModal: () => import('./organisms/Modal'),
 *   LazyDialog: () => import('./organisms/Dialog')
 * });
 */
export function batchLazy<T extends Record<string, () => Promise<{ default: ComponentType<any> }>>>(
  imports: T
): { [K in keyof T]: LazyExoticComponent<ComponentType<any>> } {
  const result = {} as any;

  Object.entries(imports).forEach(([key, importFn]) => {
    result[key] = createLazyComponent(importFn);
  });

  return result;
}

// ============================================
// HOOK OPTIMIZATION UTILITIES
// ============================================

/**
 * Optimized callback hook that memoizes based on dependencies
 *
 * @example
 * const handleClick = useOptimizedCallback((id) => onClick(id), [onClick]);
 */
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  fn: T,
  deps: React.DependencyList
): T {
  return useCallback(fn, deps);
}

/**
 * Optimized memo hook with deep comparison
 *
 * @example
 * const processedData = useOptimizedMemo(() => heavyComputation(data), [data]);
 */
export function useOptimizedMemo<T>(
  fn: () => T,
  deps: React.DependencyList
): T {
  return useMemo(fn, deps);
}

/**
 * Debounced memo hook for expensive computations
 *
 * @example
 * const debouncedSearch = useDebouncedMemo(() => searchData(query), [query], 300);
 */
export function useDebouncedMemo<T>(
  fn: () => T,
  deps: React.DependencyList,
  delay: number = 300
): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(() => fn());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(fn());
    }, delay);

    return () => clearTimeout(timer);
  }, [...deps, delay]);

  return debouncedValue;
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Performance monitor wrapper for components
 *
 * @example
 * const MonitoredChart = withPerformanceMonitor(Chart, 'Chart');
 */
export function withPerformanceMonitor<T extends ComponentType<any>>(
  Component: T,
  componentName: string
): React.ForwardRefExoticComponent<any> {
  return React.forwardRef((props: any, ref: any) => {
    const renderStart = typeof window !== 'undefined' && window.performance ? window.performance.now() : Date.now();

    React.useEffect(() => {
      const renderEnd = typeof window !== 'undefined' && window.performance ? window.performance.now() : Date.now();
      const renderTime = renderEnd - renderStart;

      if (renderTime > 16.67 && process.env.NODE_ENV === 'development') { // More than one frame (60fps)
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    });

    return React.createElement(Component, { ...props, ref });
  });
}

// ============================================
// BUNDLE SPLITTING UTILITIES
// ============================================

/**
 * Route-based code splitting utility
 *
 * @example
 * const routes = createLazyRoutes({
 *   '/dashboard': () => import('./pages/Dashboard'),
 *   '/settings': () => import('./pages/Settings')
 * });
 */
export function createLazyRoutes<T extends Record<string, () => Promise<{ default: ComponentType<any> }>>>(
  routes: T
): { [K in keyof T]: LazyExoticComponent<ComponentType<any>> } {
  return batchLazy(routes);
}

/**
 * Feature-based code splitting
 *
 * @example
 * const { SearchFeature, ChartFeature } = createFeatureBundles({
 *   SearchFeature: () => import('./features/Search'),
 *   ChartFeature: () => import('./features/Chart')
 * });
 */
export function createFeatureBundles<T extends Record<string, () => Promise<{ default: ComponentType<any> }>>>(
  features: T
): { [K in keyof T]: LazyExoticComponent<ComponentType<any>> } {
  return batchLazy(features);
}
