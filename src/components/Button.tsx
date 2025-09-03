/**
 * React Button Component - Native React implementation
 * Uses the same design tokens and styles as vanilla components
 */

import React, { forwardRef } from 'react';
import { cn } from '../utils/classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        // Base styles from vanilla component
        'tmyl-button',
        `tmyl-button--${variant}`,
        `tmyl-button--${size}`,
        isLoading && 'tmyl-button--loading',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="tmyl-button__spinner" aria-hidden="true">
          <svg className="animate-spin" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2-8a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
      
      {leftIcon && !isLoading && (
        <span className="tmyl-button__icon tmyl-button__icon--left">
          {leftIcon}
        </span>
      )}
      
      <span className="tmyl-button__text">
        {children}
      </span>
      
      {rightIcon && !isLoading && (
        <span className="tmyl-button__icon tmyl-button__icon--right">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
