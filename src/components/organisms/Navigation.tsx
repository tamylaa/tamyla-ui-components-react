/**
 * Enhanced Navigation Component - shadcn/ui inspired with Redux integration
 * Combines shadcn/ui navigation patterns with your enterprise features
 */

import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { createThemeStyles, combineThemeClasses } from '../../utils/theme-utils';
import { responsiveSizes, touchUtilities, combineResponsive } from '../../utils/responsive-utils';
import logger from '../../utils/logger';

// Navigation Item
interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
}

// Navigation Context
interface NavigationContextValue {
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'default' | 'lg';
}

const NavigationContext = React.createContext<NavigationContextValue | null>(null);

const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a Navigation');
  }
  return context;
};

// Navigation Root
interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'default' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  componentId?: string;
}

const Navigation = forwardRef<HTMLElement, NavigationProps>(({
  items,
  activeItem,
  onItemClick,
  variant = 'default',
  size = 'default',
  orientation = 'horizontal',
  enableAnalytics = false,
  analyticsEvent,
  componentId,
  className,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();

  const handleItemClick = useCallback((item: NavigationItem) => {
    onItemClick?.(item);

    // Your unique Redux analytics
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Navigation Analytics',
        message: `Navigation item clicked: ${analyticsEvent || item.label}`,
        autoClose: true,
        duration: 1500
      }));
    }
  }, [onItemClick, enableAnalytics, analyticsEvent, dispatch]);

  const orientationClasses = {
    horizontal: 'flex flex-row space-x-1',
    vertical: 'flex flex-col space-y-1'
  };

  return (
    <NavigationContext.Provider value={{
      activeItem,
      onItemClick: handleItemClick,
      variant,
      size
    }}>
      <nav
        ref={ref}
        className={cn(orientationClasses[orientation], className)}
        data-component-id={componentId}
        {...props}
      >
        {items ? items.map((item) => (
          <NavigationItemComponent key={item.id} item={item} />
        )) : props.children}
      </nav>
    </NavigationContext.Provider>
  );
});

Navigation.displayName = 'Navigation';

// Navigation Item Component
interface NavigationItemComponentProps {
  item: NavigationItem;
  level?: number;
}

const NavigationItemComponent: React.FC<NavigationItemComponentProps> = ({
  item,
  level = 0
}) => {
  const { activeItem, onItemClick, variant, size } = useNavigation();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const isActive = activeItem === item.id;
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (item.disabled) return;

    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick?.(item);
    }

    if (item.href) {
      e.preventDefault();
      // Handle navigation (you can integrate with your router here)
      logger.info('Navigate to:', item.href, 'Navigation');
    }
  }, [item, hasChildren, isExpanded, onItemClick]);

  // Variant styles
  const variantClasses = {
    default: cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      isActive
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-600)]'
        : 'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]'
    ),
    pills: cn(
      'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      isActive
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-600)]'
        : 'hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]'
    ),
    underline: cn(
      'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-b-2',
      isActive
        ? 'border-[var(--primary)] text-[var(--primary)]'
        : 'border-transparent hover:border-[var(--text-secondary)]/20'
    )
  };

  // Size styles
  const sizeClasses = {
    sm: responsiveSizes.navigation.sm,
    default: responsiveSizes.navigation.default,
    lg: responsiveSizes.navigation.lg
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={item.disabled}
        className={cn(
          variantClasses[variant || 'default'],
          sizeClasses[size || 'default'],
          item.disabled && 'opacity-50 cursor-not-allowed',
          level > 0 && 'ml-4'
        )}
      >
        {item.icon && (
          <span className="mr-2">
            {item.icon}
          </span>
        )}
        <span>{item.label}</span>
        {item.badge && (
          <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-[var(--primary-foreground)] bg-[var(--primary)] rounded-full">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <svg
            className={cn(
              'ml-2 h-4 w-4 transition-transform',
              isExpanded && 'rotate-180'
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        )}
      </button>

      {/* Submenu */}
      {hasChildren && isExpanded && (
        <div className="mt-1 ml-4 space-y-1">
          {item.children?.map((child) => (
            <NavigationItemComponent
              key={child.id}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Navigation Menu (alternative layout)
interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('relative', className)}
    {...props}
  >
    {children}
  </div>
);

// Navigation Menu Item
interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn('relative', className)}
    {...props}
  />
);

// Navigation Menu Trigger
interface NavigationMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(({
  className,
  children,
  ...props
}, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] h-10 px-4 py-2',
      className
    )}
    {...props}
  >
    {children}
  </button>
));

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// Navigation Menu Content
interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'absolute top-full left-0 z-50 min-w-[200px] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-primary)] p-4 text-[var(--text-primary)] shadow-md animate-in fade-in-0 zoom-in-95',
      className
    )}
    {...props}
  />
);

// Export all components and interfaces
export {
  Navigation,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
};

export type {
  NavigationProps,
  NavigationMenuProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationItem
};
