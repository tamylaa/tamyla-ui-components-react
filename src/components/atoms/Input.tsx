/**
 * Enhanced Input Component - shadcn/ui inspired with Redux integration
 * Combines shadcn/ui patterns with your enterprise features
 */

import React, { forwardRef, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';

// shadcn/ui inspired variant system (simplified without external deps)
const getInputClasses = ({
  variant = 'default',
  size = 'default',
  disabled = false,
  error = false,
  className = ''
}: {
  variant?: string;
  size?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}) => {
  const baseClasses = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variantClasses: Record<string, string> = {
    default: '',
    filled: 'bg-muted',
    ghost: 'border-transparent bg-transparent focus-visible:ring-0',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'h-9 px-3',
    default: 'h-10 px-3 py-2',
    lg: 'h-11 px-3 py-2',
  };

  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    error && 'border-destructive focus-visible:ring-destructive',
    className
  );
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'filled' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  error?: boolean;
  errorMessage?: string;
  helpText?: string;
  // shadcn/ui patterns
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'default',
  startIcon,
  endIcon,
  label,
  error = false,
  errorMessage,
  helpText,
  className,
  disabled,
  required,
  onChange,
  onFocus,
  onBlur,
  enableAnalytics = false,
  analyticsEvent,
  id,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(state => state.ui);

  // Enhanced change handler with Redux + Analytics
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    // Your unique Redux analytics
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Input Analytics',
        message: `Input changed: ${analyticsEvent || id || 'unnamed-input'}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, enableAnalytics, analyticsEvent, dispatch, id]);

  // Enhanced focus handler
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
  }, [onFocus]);

  // Enhanced blur handler
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  }, [onBlur]);

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const inputClasses = getInputClasses({
    variant,
    size,
    disabled: disabled || uiState.loading.global,
    error,
    className
  });

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          className={cn(
            inputClasses,
            startIcon ? 'pl-10' : '',
            endIcon ? 'pr-10' : ''
          )}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || uiState.loading.global}
          aria-invalid={error}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          {...props}
        />

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {helpText && !error && (
        <p
          id={`${inputId}-help`}
          className="text-sm text-muted-foreground"
        >
          {helpText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
