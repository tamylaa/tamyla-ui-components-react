/**
 * React Card Component - Native React implementation
 */

import React, { forwardRef } from 'react';
import { cn } from '../utils/classnames';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  header,
  footer,
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'tmyl-card',
        `tmyl-card--${variant}`,
        `tmyl-card--padding-${padding}`,
        className
      )}
      {...props}
    >
      {header && (
        <div className="tmyl-card__header">
          {header}
        </div>
      )}
      
      <div className="tmyl-card__content">
        {children}
      </div>
      
      {footer && (
        <div className="tmyl-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
