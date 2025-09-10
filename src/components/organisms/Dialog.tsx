/**
 * Enhanced Dialog Component - shadcn/ui inspired with Redux integration
 * Combines shadcn/ui patterns with your enterprise features
 */

import React, { forwardRef, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { createThemeStyles, combineThemeClasses } from '../../utils/theme-utils';
import { responsiveSizes, touchUtilities, combineResponsive } from '../../utils/responsive-utils';

// Dialog context for managing state
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a Dialog');
  }
  return context;
};

// Root Dialog component
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  componentId?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
  enableAnalytics = false,
  analyticsEvent,
  componentId
}) => {
  const dispatch = useAppDispatch();
  const [internalOpen, setInternalOpen] = React.useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;

  const handleOpenChange = useCallback((newOpen: boolean) => {
    onOpenChange(newOpen);

    // Your unique Redux analytics
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: newOpen ? 'info' : 'success',
        title: 'Dialog Analytics',
        message: `Dialog ${newOpen ? 'opened' : 'closed'}: ${analyticsEvent || componentId || 'unnamed-dialog'}`,
        autoClose: true,
        duration: 1500
      }));
    }
  }, [onOpenChange, enableAnalytics, analyticsEvent, componentId, dispatch]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, handleOpenChange]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

// Dialog Trigger
interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({
  asChild = false,
  children,
  onClick,
  ...props
}, ref) => {
  const { onOpenChange } = useDialog();

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(true);
  }, [onClick, onOpenChange]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<unknown>, {
      onClick: handleClick,
      ...props
    } as React.ButtonHTMLAttributes<HTMLButtonElement>);
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});

DialogTrigger.displayName = 'DialogTrigger';

// Dialog Content
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  // shadcn/ui patterns
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(({
  size = 'default',
  className,
  children,
  ...props
}, ref) => {
  const { open, onOpenChange } = useDialog();

  const sizeClasses = {
    sm: responsiveSizes.dialog.sm,
    default: responsiveSizes.dialog.default,
    lg: responsiveSizes.dialog.lg,
    xl: responsiveSizes.dialog.xl
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--backdrop)] backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div
        ref={ref}
        className={cn(
          'relative z-50 grid w-full gap-4 border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-primary)] p-6 shadow-lg duration-200 sm:rounded-lg',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});

DialogContent.displayName = 'DialogContent';

// Dialog Header
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
));

DialogHeader.displayName = 'DialogHeader';

// Dialog Title
interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({
  className,
  ...props
}, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));

DialogTitle.displayName = 'DialogTitle';

// Dialog Description
interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(({
  className,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

DialogDescription.displayName = 'DialogDescription';

// Dialog Footer
interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
));

DialogFooter.displayName = 'DialogFooter';

// Dialog Close
interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(({
  asChild = false,
  children,
  onClick,
  ...props
}, ref) => {
  const { onOpenChange } = useDialog();

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(false);
  }, [onClick, onOpenChange]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<unknown>, {
      onClick: handleClick,
      ...props
    } as React.ButtonHTMLAttributes<HTMLButtonElement>);
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--surface-primary)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--surface-secondary)] data-[state=open]:text-[var(--text-secondary)]"
      {...props}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
      <span className="sr-only">Close</span>
    </button>
  );
});

DialogClose.displayName = 'DialogClose';

// ============================================
// COMPOUND COMPONENT SETUP (Phase 2: Core Standardization)
// ============================================

// Extended Dialog interface for compound components
export interface DialogComponent extends React.FC<DialogProps> {
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Footer: typeof DialogFooter;
  Close: typeof DialogClose;
}

// Create compound component with proper typing
const DialogWithCompound = Dialog as DialogComponent;
DialogWithCompound.Trigger = DialogTrigger;
DialogWithCompound.Content = DialogContent;
DialogWithCompound.Header = DialogHeader;
DialogWithCompound.Title = DialogTitle;
DialogWithCompound.Description = DialogDescription;
DialogWithCompound.Footer = DialogFooter;
DialogWithCompound.Close = DialogClose;

// Export named components for backward compatibility
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
};

export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps
};

// Export compound component as default
export default DialogWithCompound;
