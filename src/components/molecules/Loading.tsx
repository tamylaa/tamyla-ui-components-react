/**
 * Loading & Feedback Components - Skeleton, HoverCard, Popover
 * shadcn/ui inspired with Redux integration
 */

import React, { forwardRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';

// Skeleton Component
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  enableAnalytics = false,
  analyticsEvent,
  className,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Skeleton Analytics',
        message: `Skeleton rendered: ${analyticsEvent}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [enableAnalytics, analyticsEvent, dispatch]);

  return (
    <div
      ref={ref}
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';

// HoverCard Components
export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(({
  open: controlledOpen,
  onOpenChange,
  enableAnalytics = false,
  analyticsEvent,
  className,
  children,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = (open: boolean) => {
    setInternalOpen(open);
    onOpenChange?.(open);
  };

  React.useEffect(() => {
    if (enableAnalytics && isOpen) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'HoverCard Analytics',
        message: `HoverCard opened: ${analyticsEvent}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [isOpen, enableAnalytics, analyticsEvent, dispatch]);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Check if this is a HoverCardTrigger
          if (child.type === HoverCardTrigger || (child.type as any)?.displayName === 'HoverCardTrigger') {
            return React.cloneElement(child, {
              ...child.props,
              onMouseEnter: () => setIsOpen(true),
              onMouseLeave: () => setIsOpen(false)
            });
          }
          // Check if this is a HoverCardContent
          if (child.type === HoverCardContent || (child.type as any)?.displayName === 'HoverCardContent') {
            return isOpen ? child : null;
          }
        }
        return child;
      })}
    </div>
  );
});

HoverCard.displayName = 'HoverCard';

export interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

const HoverCardTrigger = forwardRef<HTMLDivElement, HoverCardTriggerProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('cursor-pointer', className)}
    {...props}
  />
));

HoverCardTrigger.displayName = 'HoverCardTrigger';

export interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(({
  side = 'top',
  align = 'center',
  className,
  ...props
}, ref) => {
  const sideClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2'
  };

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        sideClasses[side],
        alignClasses[align],
        className
      )}
      {...props}
    />
  );
});

HoverCardContent.displayName = 'HoverCardContent';

// Popover Components
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  open: controlledOpen,
  onOpenChange,
  enableAnalytics = false,
  analyticsEvent,
  className,
  children,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = (open: boolean) => {
    setInternalOpen(open);
    onOpenChange?.(open);
  };

  React.useEffect(() => {
    if (enableAnalytics && isOpen) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Popover Analytics',
        message: `Popover opened: ${analyticsEvent}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [isOpen, enableAnalytics, analyticsEvent, dispatch]);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          // Check if this is a PopoverTrigger
          if (child.type === PopoverTrigger || (child.type as any)?.displayName === 'PopoverTrigger') {
            return React.cloneElement(child, {
              ...child.props,
              onClick: () => setIsOpen(!isOpen)
            });
          }
          // Check if this is a PopoverContent
          if ((child.type === PopoverContent || (child.type as any)?.displayName === 'PopoverContent') && isOpen) {
            return React.cloneElement(child, {
              ...child.props,
              isOpen: true
            });
          }
        }
        return null;
      })}
    </div>
  );
});

Popover.displayName = 'Popover';

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(({
  className,
  children,
  ...props
}, ref) => (
  <button
    ref={ref}
    className={cn('cursor-pointer', className)}
    {...props}
  >
    {children}
  </button>
));

PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  isOpen?: boolean;
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(({
  side = 'bottom',
  align = 'center',
  className,
  isOpen,
  ...props
}, ref) => {
  if (!isOpen) return null;

  const sideClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2'
  };

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        sideClasses[side],
        alignClasses[align],
        className
      )}
      {...props}
    />
  );
});

PopoverContent.displayName = 'PopoverContent';

// Export all components
export {
  Skeleton,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Popover,
  PopoverTrigger,
  PopoverContent
};
