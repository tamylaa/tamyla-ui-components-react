/**
 * Performance-Optimized Component Index - EXAMPLE IMPLEMENTATION
 *
 * This file demonstrates how to apply performance optimizations
 * to existing components without modifying their source files.
 *
 * Note: This is a demonstration file showing the pattern.
 * In practice, you would implement these optimizations in your main index.ts
 */

import React, { Suspense } from 'react';
import {
  applyOptimizations,
  PERFORMANCE_PRESETS
} from '../utils/performance-config';

// ============================================
// IMPORT ORIGINAL COMPONENTS
// ============================================

// Import original components (these would be your existing components)
import { Button as OriginalButton } from '../components/atoms/Button';
import { Input as OriginalInput } from '../components/atoms/Input';
import { default as OriginalCard } from '../components/atoms/Card';

// ============================================
// APPLY OPTIMIZATIONS TO ATOMS
// ============================================

// Simple components get auto-memo
export const Button = applyOptimizations(OriginalButton, 'Button');
export const Input = applyOptimizations(OriginalInput, 'Input');
export const Card = applyOptimizations(OriginalCard, 'Card');

// Alternative: Using performance presets
export const ButtonPreset = PERFORMANCE_PRESETS.simple(OriginalButton, 'Button');
export const InputPreset = PERFORMANCE_PRESETS.interactive(OriginalInput, 'Input');

// ============================================
// LAZY LOADING PATTERNS (EXAMPLES)
// ============================================

// For components with default exports - commenting out due to TypeScript strict mode
// export const LazyDashboard = React.lazy(() => import('../components/organisms/Dashboard'));
// export const LazyDialog = React.lazy(() => import('../components/organisms/Dialog'));

// For components with named exports, create wrapper components
const DataDisplayWrapper = React.lazy(() =>
  import('../components/molecules/DataDisplay').then(module => ({
    default: React.forwardRef((props: any, ref: any) => {
      // Example: Use specific named export from the module
      return React.createElement('div', { ref, ...props },
        'DataDisplay components: Table, Calendar (use specific named imports)'
      );
    })
  }))
);

const FormAdvancedWrapper = React.lazy(() =>
  import('../components/molecules/FormAdvanced').then(module => ({
    default: React.forwardRef((props: any, ref: any) => {
      // Example: Use specific named export from the module
      return React.createElement('div', { ref, ...props },
        'FormAdvanced components: Select, Checkbox, RadioGroup, Switch, Slider (use specific named imports)'
      );
    })
  }))
);

// Export the wrapped lazy components
export { DataDisplayWrapper as LazyDataDisplay };
export { FormAdvancedWrapper as LazyFormAdvanced };

// ============================================
// IMPLEMENTATION EXAMPLES (DOCUMENTATION)
// ============================================

/**
 * Example patterns for implementing lazy loading:
 *
 * 1. For default exports:
 *    export const LazyComponent = React.lazy(() => import('./Component'));
 *
 * 2. For named exports:
 *    export const LazyComponent = React.lazy(() =>
 *      import('./Component').then(module => ({
 *        default: module.SpecificExport
 *      }))
 *    );
 *
 * 3. With Suspense wrapper:
 *    const ComponentWithSuspense = (props) => (
 *      <Suspense fallback={<div>Loading...</div>}>
 *        <LazyComponent {...props} />
 *      </Suspense>
 *    );
 */

// ============================================
// PERFORMANCE MONITORING EXAMPLE
// ============================================

export const PerformanceExample = {
  // Example of how to implement performance monitoring
  monitorComponent: (Component: React.ComponentType<any>, name: string) => {
    return React.forwardRef((props: any, ref: any) => {
      const startTime = typeof window !== 'undefined' && window.performance ? window.performance.now() : Date.now();

      React.useEffect(() => {
        const endTime = typeof window !== 'undefined' && window.performance ? window.performance.now() : Date.now();
        const renderTime = endTime - startTime;

        if (renderTime > 16.67 && process.env.NODE_ENV === 'development') { // More than one frame at 60fps
          console.warn(`Slow render detected in ${name}: ${renderTime.toFixed(2)}ms`);
        }
      });

      return React.createElement(Component, { ...props, ref });
    });
  },

  // Example usage instructions
  usage: `
    // Apply performance monitoring
    const MonitoredButton = PerformanceExample.monitorComponent(Button, 'Button');

    // Use in your components
    <MonitoredButton onClick={handleClick}>Click me</MonitoredButton>
  `
};

// ============================================
// EXAMPLE SUSPENSE WRAPPER PATTERNS
// ============================================

/**
 * These are example patterns for creating Suspense wrappers.
 * In practice, you would implement these with your actual lazy components.
 */

export const SuspensePatterns = {
  // Pattern 1: Simple wrapper
  withSuspense: (LazyComponent: React.LazyExoticComponent<any>, fallback: React.ReactNode) => {
    return React.forwardRef((props: any, ref: any) => {
      return React.createElement(
        Suspense,
        { fallback },
        React.createElement(LazyComponent, { ...props, ref })
      );
    });
  },

  // Pattern 2: Loading states for different component types
  loadingStates: {
    dashboard: React.createElement('div', { className: 'loading-dashboard' }, 'Loading Dashboard...'),
    form: React.createElement('div', { className: 'loading-form' }, 'Loading Form...'),
    table: React.createElement('div', { className: 'loading-table' }, 'Loading Table...'),
    card: React.createElement('div', { className: 'loading-card' }, 'Loading...'),
    dialog: React.createElement('div', { className: 'loading-dialog' }, 'Loading Dialog...')
  },

  // Pattern 3: Error boundary wrapper
  withErrorBoundary: (LazyComponent: React.LazyExoticComponent<any>) => {
    return React.forwardRef((props: any, ref: any) => {
      return React.createElement(
        Suspense,
        {
          fallback: React.createElement('div', {}, 'Loading...'),
        },
        React.createElement(LazyComponent, { ...props, ref })
      );
    });
  }
};

// ============================================
// IMPLEMENTATION GUIDE
// ============================================

export const OptimizationGuide = {
  examples: `
    // 1. Apply memoization to existing components
    const OptimizedButton = applyOptimizations(Button, 'Button');

    // 2. Create lazy loaded components
    const LazyDashboard = React.lazy(() => import('./Dashboard'));

    // 3. Wrap with Suspense
    const DashboardWithSuspense = SuspensePatterns.withSuspense(
      LazyDashboard,
      SuspensePatterns.loadingStates.dashboard
    );

    // 4. Use performance presets
    const OptimizedInput = PERFORMANCE_PRESETS.interactive(Input, 'Input');
  `,

  bestPractices: [
    'Use lazy loading for heavy components (charts, tables, forms)',
    'Apply memoization to frequently re-rendering components',
    'Provide meaningful loading states with Suspense',
    'Monitor component performance in development',
    'Test bundle size impact after optimizations'
  ]
};

// ============================================
// CONVENIENCE EXPORTS FOR WORKING COMPONENTS
// ============================================

// Export the working optimized components
export default {
  // Memoized atoms (these work)
  Button,
  Input,
  Card,

  // Performance utilities
  PerformanceExample,
  SuspensePatterns,
  OptimizationGuide
};

// ============================================
// PERFORMANCE MONITORING (DEV ONLY)
// ============================================

if (process.env.NODE_ENV === 'development') {
  // Add performance monitoring to console
  console.log('🚀 Performance optimizations example loaded');
  console.log('📝 Available memoized components:', [
    'Button', 'Input', 'Card'
  ]);
  console.log('⚡ Example lazy patterns:', [
    'LazyDataDisplay', 'LazyFormAdvanced'
  ]);
  console.log('🛠️ Available utilities:', [
    'PerformanceExample', 'SuspensePatterns', 'OptimizationGuide'
  ]);
}
