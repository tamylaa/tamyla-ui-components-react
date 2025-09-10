/**
 * Safe MobileSidebar Component - Production-ready wrapper with error boundary
 */

import React from 'react';
import { ErrorBoundaryEnhanced, withErrorBoundary } from '../molecules/ErrorBoundaryEnhanced';
import { MobileSidebar, type MobileSidebarProps, type MobileSidebarHandle } from './MobileSidebar';

/**
 * MobileSidebar fallback component
 */
const MobileSidebarFallback: React.FC<{
  error: Error;
  errorInfo: React.ErrorInfo;
  retry: () => void;
}> = ({ error, retry }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '250px',
      height: '100vh',
      background: 'var(--color-background, white)',
      border: '2px solid var(--color-error-border, #ef4444)',
      zIndex: 999,
      padding: 'var(--spacing-4, 1rem)',
      fontFamily: 'var(--font-family-sans, system-ui)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-error-text, #dc2626)'
    }}
  >
    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', textAlign: 'center' as const }}>
      Sidebar Error
    </h3>
    <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', textAlign: 'center' as const }}>
      Navigation sidebar failed to load.
    </p>
    <button
      onClick={retry}
      style={{
        background: 'var(--color-primary, #2563eb)',
        color: 'var(--color-primary-foreground, white)',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontSize: '0.875rem'
      }}
    >
      Retry
    </button>
  </div>
);

/**
 * Safe MobileSidebar with error boundary
 */
export const SafeMobileSidebar = React.forwardRef<MobileSidebarHandle, MobileSidebarProps>((props, ref) => (
  <ErrorBoundaryEnhanced
    fallback={MobileSidebarFallback}
    componentName="MobileSidebar"
    enableAnalytics={true}
    showErrorDetails={process.env.NODE_ENV === 'development'}
  >
    <MobileSidebar {...props} ref={ref} />
  </ErrorBoundaryEnhanced>
));

SafeMobileSidebar.displayName = 'SafeMobileSidebar';

export const MobileSidebarWithErrorBoundary = withErrorBoundary(MobileSidebar, {
  componentName: 'MobileSidebar',
  fallback: MobileSidebarFallback,
  enableAnalytics: true
});

export default SafeMobileSidebar;
