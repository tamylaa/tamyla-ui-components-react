/**
 * Safe Modal Components - Production-ready wrappers with error boundaries
 * Provides enhanced error isolation and memory management for Modal organisms
 */

import React from 'react';
import { ErrorBoundaryEnhanced, withErrorBoundary } from '../molecules/ErrorBoundaryEnhanced';
import { Modal, type ModalProps, type ModalHandle } from './Modal';

/**
 * Modal fallback component for production errors
 */
const ModalFallback: React.FC<{
  error: Error;
  errorInfo: React.ErrorInfo;
  retry: () => void;
}> = ({ error, retry }) => (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'var(--color-error-bg, #fee2e2)',
      border: '2px solid var(--color-error-border, #ef4444)',
      borderRadius: 'var(--border-radius-md, 0.375rem)',
      padding: 'var(--spacing-6, 1.5rem)',
      maxWidth: '400px',
      zIndex: 10000,
      textAlign: 'center' as const,
      fontFamily: 'var(--font-family-sans, system-ui)',
      color: 'var(--color-error-text, #dc2626)'
    }}
  >
    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 'bold' }}>
      Modal Error
    </h3>
    <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>
      The modal component encountered an error and cannot be displayed.
    </p>
    <details style={{ marginBottom: '1rem', textAlign: 'left' as const }}>
      <summary style={{ cursor: 'pointer', fontSize: '0.875rem' }}>Error Details</summary>
      <pre style={{
        fontSize: '0.75rem',
        background: 'var(--color-error-bg-dark, #fecaca)',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        overflow: 'auto',
        maxHeight: '100px'
      }}>
        {error.message}
      </pre>
    </details>
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
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
      <button
        onClick={() => {
          // Close modal by hiding error fallback
          const element = document.querySelector('[data-modal-error-fallback]') as HTMLElement;
          if (element) {
            element.style.display = 'none';
          }
        }}
        style={{
          background: 'var(--color-secondary, #6b7280)',
          color: 'var(--color-secondary-foreground, white)',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}
      >
        Close
      </button>
    </div>
  </div>
);

/**
 * Safe Modal - Modal component wrapped with error boundary
 */
export const SafeModal = React.forwardRef<ModalHandle, ModalProps>((props, ref) => (
  <ErrorBoundaryEnhanced
    fallback={ModalFallback}
    componentName="Modal"
    enableAnalytics={true}
    showErrorDetails={process.env.NODE_ENV === 'development'}
    onError={(error, errorInfo) => {
      // Custom error handling for Modal-specific issues
      console.error('Modal Error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        props: { ...props, children: undefined } // Don't log children
      });

      // Report to monitoring service if available
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, {
          tags: { component: 'Modal' },
          extra: { props: { ...props, children: undefined } }
        });
      }
    }}
  >
    <Modal {...props} ref={ref} />
  </ErrorBoundaryEnhanced>
));

SafeModal.displayName = 'SafeModal';

/**
 * HOC version for existing Modal components
 */
export const ModalWithErrorBoundary = withErrorBoundary(Modal, {
  componentName: 'Modal',
  fallback: ModalFallback,
  enableAnalytics: true,
  showErrorDetails: process.env.NODE_ENV === 'development'
});

export default SafeModal;
