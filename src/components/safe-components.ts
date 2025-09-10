/**
 * Safe Components Index
 * Production-ready components with comprehensive error boundaries and memory management
 */

// Enhanced Error Boundary
export { ErrorBoundaryEnhanced, withErrorBoundary } from './molecules/ErrorBoundaryEnhanced';

// Safe Organism Components
export { SafeModal, ModalWithErrorBoundary } from './organisms/SafeModal';
export { SafeMobileSidebar, MobileSidebarWithErrorBoundary } from './organisms/SafeMobileSidebar';
export { SafeDashboard } from './organisms/SafeDashboard';

// Factory Health Monitoring
export {
  FactoryHealthMonitor,
  factoryHealthMonitor,
  useFactoryHealth,
  type FactoryHealthStatus,
  type FactoryHealthConfig
} from '../utils/factory-health-monitor';

// Production utilities
export { safeAsync, safeFetch, safeDynamicImport } from '../utils/async-safety';
export { sanitizeHTML, safeSetInnerHTML, safeCreateElementFromHTML } from '../utils/dom-safety';

// Re-export original components for backward compatibility
export { default as Modal } from './organisms/Modal';
export { default as MobileSidebar } from './organisms/MobileSidebar';
export { default as Dashboard } from './organisms/Dashboard';
