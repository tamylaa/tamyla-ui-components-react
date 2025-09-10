/**
 * Safe Dashboard Component - Production-ready wrapper with error boundary
 */

import React from 'react';
import { ErrorBoundaryEnhanced } from '../molecules/ErrorBoundaryEnhanced';
import Dashboard from './Dashboard';
import { Logger } from '../../utils/logger';

const logger = new Logger({ enableConsole: true });

// Use a simple props interface that's compatible
export interface SafeDashboardProps {
  type?: 'search' | 'content' | 'knowledge' | 'media';
  title?: string;
  description?: string;
  layout?: 'grid' | 'list' | 'cards' | 'vertical' | 'horizontal';
  size?: 'default' | 'compact' | 'large' | 'expanded';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Dashboard fallback component
 */
const DashboardFallback: React.FC<{
  error: Error;
  errorInfo: React.ErrorInfo;
  retry: () => void;
}> = ({ error, retry }) => (
  <div
    style={{
      width: '100%',
      minHeight: '400px',
      background: 'var(--color-background, white)',
      border: '2px dashed var(--color-error-border, #ef4444)',
      borderRadius: 'var(--border-radius-md, 0.375rem)',
      padding: 'var(--spacing-6, 1.5rem)',
      fontFamily: 'var(--font-family-sans, system-ui)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-error-text, #dc2626)',
      textAlign: 'center' as const
    }}
  >
    <div style={{ maxWidth: '400px' }}>
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
        Dashboard Error
      </h2>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', lineHeight: '1.4' }}>
        The dashboard component failed to load. This may be due to a data loading error or component initialization issue.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
        <button
          onClick={retry}
          style={{
            background: 'var(--color-primary, #2563eb)',
            color: 'var(--color-primary-foreground, white)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          Retry Dashboard
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'var(--color-secondary, #6b7280)',
            color: 'var(--color-secondary-foreground, white)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          Refresh Page
        </button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <details style={{ marginTop: '1rem', textAlign: 'left' as const, fontSize: '0.75rem' }}>
          <summary style={{ cursor: 'pointer' }}>Error Details</summary>
          <pre style={{
            background: 'var(--color-error-bg-dark, #fecaca)',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            overflow: 'auto',
            maxHeight: '150px',
            marginTop: '0.5rem'
          }}>
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  </div>
);

/**
 * Safe Dashboard with error boundary
 */
export const SafeDashboard: React.FC<SafeDashboardProps> = (props) => (
  <ErrorBoundaryEnhanced
    fallback={DashboardFallback}
    componentName="Dashboard"
    enableAnalytics={true}
    showErrorDetails={process.env.NODE_ENV === 'development'}
    onError={(error, errorInfo) => {
      // Dashboard-specific error handling
      logger.error('Dashboard Component Error:', {
        error: error.message,
        type: props.type,
        layout: props.layout,
        componentStack: errorInfo.componentStack
      });

      // Report critical dashboard errors to monitoring
      const sentry = (window as { Sentry?: { captureException: (error: Error, options?: { tags: Record<string, string> }) => void } }).Sentry;
      if (sentry) {
        sentry.captureException(error, {
          tags: {
            component: 'Dashboard',
            type: props.type || 'default',
            layout: props.layout || 'default'
          }
        });
      }
    }}
  >
    <Dashboard {...props} />
  </ErrorBoundaryEnhanced>
);

SafeDashboard.displayName = 'SafeDashboard';

export default SafeDashboard;
