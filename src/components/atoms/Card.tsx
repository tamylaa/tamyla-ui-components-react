/**
 * Enhanced Card Component - shadcn/ui inspired with Redux integration
 *
 * A versatile card component that combines shadcn/ui design patterns with enterprise features
 * including optional Redux state tracking, analytics, and interactive behaviors.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *   </Card.Header>
 *   <Card.Content>
 *     // Create compound component with proper typing
const CardWithCompound = Card as CardComponent;
CardWithCompound.Header = CardHeader;
CardWithCompound.Title = CardTitle;
CardWithCompound.Content = CardContent;

// Export memoized version
export const MemoizedCard = React.memo(CardWithCompound);
MemoizedCard.displayName = 'MemoizedCard';

export default CardWithCompound;ntent goes here
 *   </Card.Content>
 * </Card>
 *
 * // With variants and Redux tracking
 * <Card
 *   variant="elevated"
 *   componentId="my-card"
 *   enableStateTracking
 *   enableAnalytics
 * >
 *   <Card.Content>Interactive card content</Card.Content>
 * </Card>
 * ```
 */
import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions, componentActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { createThemeStyles, combineThemeClasses } from '../../utils/theme-utils';
import { responsiveSizes, combineResponsive } from '../../utils/responsive-utils';

/**
 * Generates CSS classes for card styling based on variant and padding
 *
 * @param options - Configuration object for card styling
 * @returns Combined CSS class string
 */
const getCardClasses = ({
  variant = 'default',
  padding = 'default',
  className = ''
}: {
  variant?: string;
  padding?: string;
  className?: string;
}) => {
  const baseClasses = 'rounded-lg border bg-[var(--surface-primary)] text-[var(--text-primary)] shadow-sm border-[var(--border)]';

  const variantClasses: Record<string, string> = {
    default: '',
    outlined: 'border-2',
    elevated: 'shadow-lg',
    filled: 'bg-[var(--surface-secondary)]',
  };

  const paddingClasses: Record<string, string> = {
    none: 'p-0',
    xs: responsiveSizes.card.xs,
    sm: responsiveSizes.card.sm,
    default: responsiveSizes.card.default,
    lg: responsiveSizes.card.lg,
  };

  return cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    paddingClasses[padding] || paddingClasses.default,
    className
  );
};

/**
 * Props for the Card component
 *
 * Extends all standard HTML div attributes with additional card-specific features
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style variant of the card
   * @default 'default'
   */
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';

  /**
   * Padding size for the card content
   * @default 'default'
   */
  padding?: 'none' | 'xs' | 'sm' | 'default' | 'lg';

  /**
   * Header content for the card (alternative to Card.Header)
   */
  header?: React.ReactNode;

  /**
   * Footer content for the card (alternative to Card.Footer)
   */
  footer?: React.ReactNode;

  /**
   * Whether to enable Redux state tracking for this card
   * @default false
   */
  enableStateTracking?: boolean;

  /**
   * Unique identifier for the card component (used for state tracking)
   */
  componentId?: string;

  /**
   * Whether the card should be interactive (clickable)
   * @default false
   */
  interactive?: boolean;

  /**
   * Callback fired when card is expanded
   */
  onExpand?: () => void;

  /**
   * Callback fired when card is collapsed
   */
  onCollapse?: () => void;

  /**
   * Whether to enable analytics tracking for card interactions
   * @default false
   */
  enableAnalytics?: boolean;

  /**
   * Custom analytics event name for tracking
   */
  analyticsEvent?: string;

  /**
   * Render as a different element (shadcn/ui pattern)
   * @default false
   */
  asChild?: boolean;
}

/**
 * Extended Card interface for compound components
 *
 * Includes the main Card component and its sub-components for shadcn/ui-style usage
 */
export interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  /** Card header sub-component */
  Header: typeof CardHeader;
  /** Card title sub-component */
  Title: typeof CardTitle;
  /** Card content sub-component */
  Content: typeof CardContent;
}

/**
 * Card component with enhanced features and optional Redux integration
 *
 * Features:
 * - Multiple visual variants and padding options
 * - Compound component pattern (Card.Header, Card.Title, Card.Content)
 * - Optional Redux state tracking and analytics
 * - Interactive behaviors (expand/collapse)
 * - Accessibility features
 * - Graceful degradation when Redux is not available
 *
 * @param props - Card component props
 * @param ref - Forwarded ref for DOM access
 * @returns React card element
 */
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
          interactionCount: (Number(componentState?.state?.interactionCount) || 0) + 1
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
        isExpanded ? 'ring-2 ring-ring ring-offset-2' : '',
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
                  handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
                }}
                aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
              >
                <svg
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded ? 'rotate-180' : ''
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
          Interactions: {String(componentState?.state?.interactionCount || 0)}
          Last: {componentState?.lastUpdated}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

// CardHeader Component
/**
 * Card header sub-component
 *
 * Provides consistent spacing and styling for card headers.
 * Typically contains the card title and any header actions.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Button size="sm">Action</Button>
 *   </Card.Header>
 * </Card>
 * ```
 */
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
/**
 * Card title sub-component
 *
 * Provides consistent typography styling for card titles.
 * Renders as an h3 element for proper semantic structure.
 *
 * @example
 * ```tsx
 * <Card.Header>
 *   <Card.Title>My Card Title</Card.Title>
 * </Card.Header>
 * ```
 */
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
/**
 * Card content sub-component
 *
 * Provides consistent spacing for card content areas.
 * Removes top padding to align with card headers.
 *
 * @example
 * ```tsx
 * <Card.Content>
 *   <p>This is the main content of the card.</p>
 * </Card.Content>
 * ```
 */
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

// ============================================
// COMPOUND COMPONENT SETUP (Phase 2: Core Standardization)
// ============================================

// Create compound component with proper typing
const CardWithCompound = Card as CardComponent;
CardWithCompound.Header = CardHeader;
CardWithCompound.Title = CardTitle;
CardWithCompound.Content = CardContent;

export default CardWithCompound;
