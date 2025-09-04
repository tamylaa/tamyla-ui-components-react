/**
 * Enhanced Button Component - shadcn/ui inspired with Redux integration
 * Combines shadcn/ui patterns with your enterprise features
 */

import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';

// shadcn/ui inspired variant system (simplified without external deps)
const getButtonClasses = ({
  variant = 'default',
  size = 'default',
  isLoading = false,
  disabled = false,
  className = ''
}: {
  variant?: string;
  size?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary',
  };

  const sizeClasses: Record<string, string> = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  };

  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    isLoading && 'opacity-50 cursor-not-allowed',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  loadingText?: string;
  useThemeVariant?: boolean;
  // shadcn/ui patterns
  // asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'default',
  size = 'default',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  onClick,
  enableAnalytics = false,
  analyticsEvent,
  loadingText,
  useThemeVariant = false,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);
  const uiState = useAppSelector(state => state.ui);

  // Enhanced click handler with Redux + Analytics
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    // Your unique Redux analytics
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Button Analytics',
        message: `Button clicked: ${analyticsEvent || children}`,
        autoClose: true,
        duration: 2000
      }));
    }
  }, [onClick, enableAnalytics, analyticsEvent, dispatch, children]);

  // Dynamic theming (your unique feature)
  const actualVariant = useThemeVariant && theme.mode === 'dark'
    ? variant === 'default' ? 'secondary' : variant
    : variant;

  const buttonClasses = getButtonClasses({
    variant: actualVariant,
    size,
    isLoading,
    disabled: disabled || uiState.loading.global,
    className
  });

  return (
    <button
      className={buttonClasses}
      ref={ref}
      onClick={handleClick}
      disabled={disabled || isLoading || uiState.loading.global}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin mr-2" aria-hidden="true">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-8a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}

      {leftIcon && !isLoading && (
        <span className="mr-2">
          {leftIcon}
        </span>
      )}

      <span>
        {isLoading && loadingText ? loadingText : children}
      </span>

      {rightIcon && !isLoading && (
        <span className="ml-2">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
