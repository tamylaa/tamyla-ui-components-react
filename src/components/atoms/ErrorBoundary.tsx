import React, { Component, ErrorInfo, ReactNode } from 'react';
import logger from '../../utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Enhanced error logging with more context
    const errorDetails = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };

    // Only log errors in development mode
    logger.error('ErrorBoundary caught an error:', errorDetails, 'ErrorBoundary');

    // Call custom error handler if provided
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (handlerError) {
        logger.error('Error in custom error handler:', { handlerError }, 'ErrorBoundary');
      }
    }

    // In production, you might want to send this to an error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Safe error reporting (you would implement your service here)
      try {
        // Example: window.errorReportingService?.report(errorDetails);
      } catch (reportingError) {
        // Avoid console in production, use logger instead
        logger.error('Failed to report error:', reportingError, 'ErrorBoundary');
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: 'var(--spacing-5)',
            margin: 'var(--spacing-5)',
            border: '1px solid var(--color-error-border)',
            borderRadius: 'var(--border-radius-md)',
            backgroundColor: 'var(--color-error-bg)',
            color: 'var(--color-error-text)'
          }}
          role="alert"
        >
          <h3 style={{ margin: '0 0 var(--spacing-2) 0' }}>Something went wrong</h3>
          <p style={{ margin: '0' }}>
            An unexpected error occurred. Please refresh the page or contact support if the problem persists.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: 'var(--spacing-2)' }}>
              <summary>Error Details (Development)</summary>
              <pre style={{
                fontSize: 'var(--font-size-xs)',
                overflow: 'auto',
                maxHeight: '200px',
                backgroundColor: 'var(--color-neutral-50)',
                padding: 'var(--spacing-2)',
                borderRadius: 'var(--border-radius-md)',
                marginTop: 'var(--spacing-1)'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

export default ErrorBoundary;
