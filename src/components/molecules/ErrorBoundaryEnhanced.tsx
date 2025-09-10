/**
 * Enhanced Error Boundary for Organism Components
 * Provides production-ready error isolation with fallback UI and analytics
 */

import React from 'react';
import { Logger } from '../../utils/logger';

const logger = new Logger({ enableConsole: true });

export interface ErrorBoundaryEnhancedProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; errorInfo: React.ErrorInfo; retry: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  componentName?: string;
  enableAnalytics?: boolean;
  showErrorDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string;
}

/**
 * Default fallback component for production errors
 */
const DefaultErrorFallback: React.FC<{
  error: Error;
  errorInfo: React.ErrorInfo;
  retry: () => void;
  componentName?: string;
  showErrorDetails?: boolean;
}> = ({ error, retry, componentName, showErrorDetails = false }) => {
  return (
    <div
      style={{
        padding: 'var(--spacing-4, 1rem)',
        border: '2px solid var(--color-error-border, #ef4444)',
        borderRadius: 'var(--border-radius-md, 0.375rem)',
        background: 'var(--color-error-bg, #fee2e2)',
        color: 'var(--color-error-text, #dc2626)',
        fontFamily: 'var(--font-family-sans, system-ui)',
        textAlign: 'center' as const,
        margin: 'var(--spacing-2, 0.5rem) 0'
      }}
    >
      <div style={{ marginBottom: 'var(--spacing-2, 0.5rem)' }}>
        <strong>Component Error{componentName ? `: ${componentName}` : ''}</strong>
      </div>
      <div style={{ marginBottom: 'var(--spacing-3, 0.75rem)', fontSize: '0.875rem' }}>
        Something went wrong with this component. Please try refreshing or contact support if the issue persists.
      </div>
      {showErrorDetails && (
        <details style={{ marginBottom: 'var(--spacing-3, 0.75rem)', textAlign: 'left' as const }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
          <pre style={{
            fontSize: '0.75rem',
            background: 'var(--color-error-bg-dark, #fecaca)',
            padding: 'var(--spacing-2, 0.5rem)',
            borderRadius: 'var(--border-radius-sm, 0.25rem)',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {error.message}
            {error.stack && '\n\nStack trace:\n' + error.stack}
          </pre>
        </details>
      )}
      <button
        onClick={retry}
        style={{
          background: 'var(--color-primary, #2563eb)',
          color: 'var(--color-primary-foreground, white)',
          border: 'none',
          padding: 'var(--spacing-2, 0.5rem) var(--spacing-4, 1rem)',
          borderRadius: 'var(--border-radius-md, 0.375rem)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export class ErrorBoundaryEnhanced extends React.Component<
  ErrorBoundaryEnhancedProps,
  ErrorBoundaryState
> {
  private retryCount = 0;
  private readonly maxRetries = 3;

  constructor(props: ErrorBoundaryEnhancedProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError, componentName, enableAnalytics } = this.props;

    // Log error with context
    logger.error(`Error Boundary caught error in ${componentName || 'Unknown Component'}:`, {
      error: error.message,
      stack: error.stack,
      errorInfo: errorInfo.componentStack,
      errorId: this.state.errorId,
      retryCount: this.retryCount
    }, 'ErrorBoundaryEnhanced');

    // Update state with error info
    this.setState({ errorInfo });

    // Call custom error handler
    if (onError) {
      try {
        onError(error, errorInfo);
      } catch (handlerError) {
        logger.error('Error in custom error handler:', handlerError, 'ErrorBoundaryEnhanced');
      }
    }

    // Analytics reporting (if enabled)
    if (enableAnalytics && typeof window !== 'undefined') {
      try {
        // Report to analytics service
        if ((window as any).gtag) {
          (window as any).gtag('event', 'exception', {
            description: `${componentName || 'Unknown'}: ${error.message}`,
            fatal: false,
            error_id: this.state.errorId
          });
        }
      } catch (analyticsError) {
        logger.warn('Failed to report error to analytics:', analyticsError, 'ErrorBoundaryEnhanced');
      }
    }
  }

  handleRetry = () => {
    const { componentName } = this.props;

    if (this.retryCount >= this.maxRetries) {
      logger.warn(`Maximum retry attempts (${this.maxRetries}) reached for ${componentName || 'Unknown Component'}`, null, 'ErrorBoundaryEnhanced');
      return;
    }

    this.retryCount += 1;

    logger.info(`Retrying component ${componentName || 'Unknown'} (attempt ${this.retryCount}/${this.maxRetries})`, null, 'ErrorBoundaryEnhanced');

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback: CustomFallback, componentName, showErrorDetails } = this.props;

    if (hasError && error) {
      const FallbackComponent = CustomFallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={error}
          errorInfo={errorInfo!}
          retry={this.handleRetry}
          componentName={componentName}
          showErrorDetails={showErrorDetails}
        />
      );
    }

    return children;
  }
}

/**
 * HOC for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryEnhancedProps, 'children'>
) {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundaryEnhanced {...errorBoundaryProps}>
      <Component {...(props as P)} ref={ref} />
    </ErrorBoundaryEnhanced>
  ));

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

export default ErrorBoundaryEnhanced;
