/**
 * User Feedback & Status Components - Alert, Progress, Badge
 * shadcn/ui inspired with Redux integration
 */

import React, { forwardRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { createThemeStyles, combineThemeClasses } from '../../utils/theme-utils';
import { responsiveSizes, combineResponsive } from '../../utils/responsive-utils';

// Explicit DOM type imports for ESLint
type HTMLHeadingElement = globalThis.HTMLHeadingElement;
type HTMLParagraphElement = globalThis.HTMLParagraphElement;

// Alert Component
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  autoClose?: boolean;
  duration?: number;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({
  variant = 'default',
  enableAnalytics = false,
  analyticsEvent,
  autoClose = false,
  duration = 5000,
  className,
  children,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (enableAnalytics) {
          dispatch(uiActions.addNotification({
            type: 'info',
            title: 'Alert Analytics',
            message: `Alert auto-closed: ${analyticsEvent}`,
            autoClose: true,
            duration: 1000
          }));
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, enableAnalytics, analyticsEvent, dispatch]);

  if (!isVisible && autoClose) return null;

  const variantClasses = {
    default: 'bg-[var(--background)] text-[var(--foreground)]',
    destructive: 'border-[var(--destructive)]/50 text-[var(--destructive)] dark:border-[var(--destructive)] [&>svg]:text-[var(--destructive)]',
    success: 'border-[var(--success)]/50 text-[var(--success-700)] dark:text-[var(--success-400)] dark:border-[var(--success)]/50',
    warning: 'border-[var(--warning)]/50 text-[var(--warning-700)] dark:text-[var(--warning-400)] dark:border-[var(--warning)]/50',
    info: 'border-[var(--primary)]/50 text-[var(--primary-700)] dark:text-[var(--primary-400)] dark:border-[var(--primary)]/50'
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-3 sm:p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-3 sm:[&>svg]:left-4 [&>svg]:top-3 sm:[&>svg]:top-4 [&>svg]:text-[var(--foreground)]',
        variantClasses[variant || 'default'],
        className
      )}
      {...props}
    >
      {children}
      {autoClose && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <span className="sr-only">Close</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

// Alert Title
export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(({
  className,
  ...props
}, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));

AlertTitle.displayName = 'AlertTitle';

// Alert Description
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';

// Progress Component
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  showValue?: boolean;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'default',
  showValue = false,
  enableAnalytics = false,
  analyticsEvent,
  className,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  React.useEffect(() => {
    if (enableAnalytics && percentage === 100) {
      dispatch(uiActions.addNotification({
        type: 'success',
        title: 'Progress Analytics',
        message: `Progress completed: ${analyticsEvent}`,
        autoClose: true,
        duration: 2000
      }));
    }
  }, [percentage, enableAnalytics, analyticsEvent, dispatch]);

  const variantClasses = {
    default: 'bg-[var(--primary)]',
    success: 'bg-[var(--success)]',
    warning: 'bg-[var(--warning)]',
    destructive: 'bg-[var(--destructive)]'
  };

  const sizeClasses = {
    sm: 'h-2',
    default: 'h-4',
    lg: 'h-6'
  };

  return (
    <div
      ref={ref}
      className={cn('relative w-full overflow-hidden rounded-full bg-[var(--surface-secondary)]', sizeClasses[size], className)}
      {...props}
    >
      <div
        className={cn('h-full w-full flex-1 transition-all', variantClasses[variant])}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-[var(--primary-foreground)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
});

Progress.displayName = 'Progress';

// Badge Component
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'default' | 'lg';
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({
  variant = 'default',
  size = 'default',
  enableAnalytics = false,
  analyticsEvent,
  className,
  children,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Badge Analytics',
        message: `Badge rendered: ${analyticsEvent || children}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [enableAnalytics, analyticsEvent, children, dispatch]);

  const variantClasses = {
    default: 'border-transparent bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--neutral-200)]',
    secondary: 'border-transparent bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--neutral-200)]',
    destructive: 'border-transparent bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--error-600)]',
    outline: 'text-[var(--foreground)] border-[var(--border)]',
    success: 'border-transparent bg-[var(--success)] text-[var(--success-foreground)] hover:bg-[var(--success-600)]',
    warning: 'border-transparent bg-[var(--warning)] text-[var(--warning-foreground)] hover:bg-[var(--warning-600)]'
  };

  const sizeClasses = {
    xs: responsiveSizes.badge.xs,
    sm: responsiveSizes.badge.sm,
    default: responsiveSizes.badge.default,
    lg: responsiveSizes.badge.lg
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Badge.displayName = 'Badge';

// Avatar Component
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  alt,
  fallback,
  size = 'default',
  enableAnalytics = false,
  analyticsEvent,
  className,
  children,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Avatar Analytics',
        message: `Avatar rendered: ${analyticsEvent || alt || 'unnamed'}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [enableAnalytics, analyticsEvent, alt, dispatch]);

  const sizeClasses = {
    xs: 'h-6 w-6 sm:h-8 sm:w-8',
    sm: 'h-8 w-8 sm:h-10 sm:w-10',
    default: 'h-10 w-10 sm:h-12 sm:w-12',
    lg: 'h-12 w-12 sm:h-16 sm:w-16',
    xl: 'h-16 w-16 sm:h-20 sm:w-20'
  };

  const textSizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    default: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl'
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-[var(--surface-secondary)] font-medium text-[var(--text-primary)]',
          textSizeClasses[size]
        )}>
          {fallback || getInitials(alt)}
        </div>
      )}
      {children}
    </div>
  );
});

Avatar.displayName = 'Avatar';

// Export all components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Badge,
  Avatar
};
