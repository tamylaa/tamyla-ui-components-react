/**
 * Enhanced Card Component - shadcn/ui inspired with Redux integration
 * Combines shadcn/ui patterns with your enterprise features
 */

import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions, componentActions } from '../../store/store';
import { cn } from '../../utils/classnames';

// shadcn/ui inspired variant system (simplified without external deps)
const getCardClasses = ({
  variant = 'default',
  padding = 'default',
  className = ''
}: {
  variant?: string;
  padding?: string;
  className?: string;
}) => {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm';

  const variantClasses: Record<string, string> = {
    default: '',
    outlined: 'border-2',
    elevated: 'shadow-lg',
    filled: 'bg-muted',
  };

  const paddingClasses: Record<string, string> = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    paddingClasses[padding] || paddingClasses.default,
    className
  );
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  // Your unique Redux integration
  enableStateTracking?: boolean;
  componentId?: string;
  interactive?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  // shadcn/ui patterns
  asChild?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'default',
  header,
  footer,
  children,
  className,
  componentId,
  enableStateTracking = false,
  interactive = false,
  onExpand,
  onCollapse,
  enableAnalytics = false,
  analyticsEvent,
  onClick,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();

  // Get theme and component state
  const theme = useAppSelector(state => state.theme);
  const componentState = useAppSelector(state =>
    componentId ? state.components.components[componentId] : null
  );

  // Enhanced click handler with Redux integration
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Call original onClick if provided
    onClick?.(e);

    if (interactive && componentId) {
      const isExpanded = componentState?.state?.expanded || false;

      if (isExpanded) {
        onCollapse?.();
        dispatch(componentActions.updateComponentState({
          componentId,
          stateUpdates: { expanded: false }
        }));
      } else {
        onExpand?.();
        dispatch(componentActions.updateComponentState({
          componentId,
          stateUpdates: { expanded: true }
        }));
      }

      // Your unique Redux analytics
      if (enableAnalytics) {
        dispatch(uiActions.addNotification({
          type: 'info',
          title: 'Card Analytics',
          message: `Card ${isExpanded ? 'collapsed' : 'expanded'}: ${analyticsEvent || componentId}`,
          autoClose: true,
          duration: 1500
        }));
      }
    }

    // State tracking
    if (enableStateTracking && componentId) {
      dispatch(componentActions.updateComponentState({
        componentId,
        stateUpdates: {
          lastInteraction: new Date().toISOString(),
          interactionCount: (componentState?.state?.interactionCount || 0) + 1
        }
      }));
    }
  }, [
    onClick, interactive, componentId, componentState,
    onExpand, onCollapse, enableAnalytics, analyticsEvent, enableStateTracking, dispatch
  ]);

  // Interactive state
  const isExpanded = componentState?.state?.expanded || false;

  // Use shadcn/ui inspired classes
  const cardClasses = getCardClasses({
    variant,
    padding,
    className
  });

  return (
    <div
      ref={ref}
      className={cn(
        cardClasses,
        interactive && 'cursor-pointer hover:shadow-md transition-shadow',
        isExpanded && 'ring-2 ring-ring ring-offset-2',
        theme.mode === 'dark' && 'border-border/50',
        className
      )}
      onClick={interactive ? handleClick : onClick}
      data-component-id={componentId}
      data-expanded={isExpanded}
      {...props}
    >
      {header && (
        <div className="flex flex-col space-y-1.5 p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold leading-none tracking-tight">
              {header}
            </div>
            {interactive && (
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:bg-accent hover:text-accent-foreground h-9 w-9"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(e as any);
                }}
                aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
              >
                <svg
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M4 6l4 4 4-4z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      <div className={cn(
        'p-6 pt-0',
        header ? 'pt-4' : '',
        footer ? 'pb-4' : ''
      )}>
        {children}
      </div>

      {footer && (
        <div className="flex items-center p-6 pt-0">
          {footer}
        </div>
      )}

      {/* State indicators for debugging */}
      {enableStateTracking && componentId && (
        <div className="hidden">
          Interactions: {componentState?.state?.interactionCount || 0}
          Last: {componentState?.lastUpdated}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

// CardHeader Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

// CardTitle Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

// CardContent Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0', className)}
    {...props}
  />
));

CardContent.displayName = 'CardContent';

export default Card;
