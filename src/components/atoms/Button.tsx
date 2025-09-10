/**
 * Enhanced Button Component - shadcn/ui inspired with Redux integration
 *
 * A versatile button component that combines shadcn/ui design patterns with enterprise features
 * including optional Redux integration, analytics tracking, and dynamic theming.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant and size
 * <Button variant="primary" size="lg">Large Button</Button>
 *
 * // With Redux analytics
 * <Button enableAnalytics analyticsEvent="save_click">Save</Button>
 *
 * // With icons
 * <Button leftIcon={<SaveIcon />}>Save</Button>
 *
 * // Loading state
 * <Button isLoading loadingText="Saving...">Save</Button>
 * ```
 */
import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { useAnalyticsOptional, useThemeOptional, useUIOptional } from '../../utils/redux-optional';
import { createThemeStyles, combineThemeClasses } from '../../utils/theme-utils';
import { responsiveSizes, touchUtilities, combineResponsive } from '../../utils/responsive-utils';

/**
 * Generates CSS classes for button styling based on variant and size
 *
 * @param options - Configuration object for button styling
 * @returns Combined CSS class string
 */
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
  const baseClasses = combineResponsive(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    touchUtilities.tap,
    touchUtilities.hover
  );

  // Theme-aware variant classes using CSS custom properties
  const variantClasses: Record<string, string> = {
    default: 'bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--primary)] hover:bg-[var(--primary-600)] hover:border-[var(--primary-600)]',
    destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)] border border-[var(--destructive)] hover:bg-[var(--error-600)] hover:border-[var(--error-600)]',
    outline: 'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
    secondary: 'bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--neutral-200)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] border border-transparent hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]',
    link: 'bg-transparent text-[var(--primary)] border border-transparent underline-offset-4 hover:underline',
  };

  const sizeClasses: Record<string, string> = {
    xs: responsiveSizes.button.xs,
    sm: responsiveSizes.button.sm,
    default: responsiveSizes.button.default,
    lg: responsiveSizes.button.lg,
    icon: responsiveSizes.button.icon,
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

/**
 * Props for the Button component
 *
 * Extends all standard HTML button attributes with additional features
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

  /**
   * Size variant of the button
   * @default 'default'
   */
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon';

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Icon to display on the left side of the button content
   */
  leftIcon?: React.ReactNode;

  /**
   * Icon to display on the right side of the button content
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether to enable analytics tracking for button clicks
   * @default false
   */
  enableAnalytics?: boolean;

  /**
   * Custom analytics event name for tracking
   * @default undefined
   */
  analyticsEvent?: string;

  /**
   * Text to display when button is in loading state
   * @default undefined
   */
  loadingText?: string;

  /**
   * Whether to automatically adjust variant based on theme mode
   * @default false
   */
  useThemeVariant?: boolean;
}

/**
 * Button component with enhanced features and optional Redux integration
 *
 * Features:
 * - Multiple visual variants and sizes
 * - Loading states with custom text
 * - Icon support (left/right)
 * - Optional Redux analytics integration
 * - Dynamic theming based on theme context
 * - Accessibility features
 * - Graceful degradation when Redux is not available
 *
 * @param props - Button component props
 * @param ref - Forwarded ref for DOM access
 * @returns React button element
 */
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
  // Optional Redux with graceful degradation
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);
  const uiState = useAppSelector(state => state.ui);

  // Optional Redux alternatives
  const { trackEvent } = useAnalyticsOptional();
  const optionalTheme = useThemeOptional();
  const optionalUI = useUIOptional();

  // Enhanced click handler with Redux + Analytics
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);

    // Your unique Redux analytics (with optional fallback)
    if (enableAnalytics) {
      if (dispatch) {
        dispatch(uiActions.addNotification({
          type: 'info',
          title: 'Button Analytics',
          message: `Button clicked: ${analyticsEvent || children}`,
          autoClose: true,
          duration: 2000
        }));
      } else {
        trackEvent(analyticsEvent || 'button_click', { children });
      }
    }
  }, [onClick, enableAnalytics, analyticsEvent, dispatch, children, trackEvent]);

  // Dynamic theming (your unique feature) - works with or without Redux
  const currentTheme = theme || optionalTheme;
  const actualVariant = useThemeVariant && currentTheme?.mode === 'dark'
    ? variant === 'default' ? 'secondary' : variant
    : variant;

  const currentUI = uiState || optionalUI;
  const buttonClasses = getButtonClasses({
    variant: actualVariant,
    size,
    isLoading,
    disabled: disabled || currentUI?.loading?.global,
    className
  });

  return (
    <button
      className={buttonClasses}
      ref={ref}
      onClick={handleClick}
      disabled={disabled || isLoading || currentUI?.loading?.global}
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

// Performance optimized version with React.memo
export const MemoizedButton = React.memo(Button);
MemoizedButton.displayName = 'MemoizedButton';
