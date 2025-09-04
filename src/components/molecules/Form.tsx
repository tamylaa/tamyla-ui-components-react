/**
 * Enhanced Form Components - shadcn/ui inspired with Redux integration
 * Combines shadcn/ui patterns with your enterprise features
 */

import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';

// Explicit DOM type imports for ESLint
type HTMLLabelElement = globalThis.HTMLLabelElement;
type HTMLParagraphElement = globalThis.HTMLParagraphElement;
type HTMLTextAreaElement = globalThis.HTMLTextAreaElement;

// Form Field Context
interface FormFieldContextValue {
  name: string;
  error?: string;
  isRequired?: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const useFormField = () => {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within a FormField');
  }
  return context;
};

// Form Item
export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
));

FormItem.displayName = 'FormItem';

// Form Label
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(({
  className,
  ...props
}, ref) => {
  const { name, error, isRequired } = useFormField();

  return (
    <label
      ref={ref}
      htmlFor={name}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        error && 'text-destructive',
        className
      )}
      {...props}
    >
      {props.children}
      {isRequired && <span className="text-destructive ml-1">*</span>}
    </label>
  );
});

FormLabel.displayName = 'FormLabel';

// Form Control
export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(({
  ...props
}, ref) => {
  const { error } = useFormField();

  return (
    <div
      ref={ref}
      data-error={!!error}
      {...props}
    />
  );
});

FormControl.displayName = 'FormControl';

// Form Description
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(({
  className,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

FormDescription.displayName = 'FormDescription';

// Form Message
export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(({
  className,
  children: _children,
  ...props
}, ref) => {
  const { error } = useFormField();

  if (!error) return null;

  return (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {error}
    </p>
  );
});

FormMessage.displayName = 'FormMessage';

// Form Field
export interface FormFieldProps {
  name: string;
  error?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  error,
  isRequired,
  children
}) => (
  <FormFieldContext.Provider value={{ name, error, isRequired }}>
    {children}
  </FormFieldContext.Provider>
);

// Enhanced Form Input (combines Form with Input)
export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  isRequired?: boolean;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
  // shadcn/ui patterns
  variant?: 'default' | 'filled' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  name,
  label,
  description,
  error,
  isRequired,
  enableAnalytics = false,
  analyticsEvent,
  variant = 'default',
  size = 'default',
  startIcon,
  endIcon,
  className,
  onChange,
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
        title: 'Form Analytics',
        message: `Form field changed: ${analyticsEvent || name}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, enableAnalytics, analyticsEvent, name, dispatch]);

  // shadcn/ui inspired variant system
  const getInputClasses = () => {
    const baseClasses = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variantClasses = {
      default: '',
      filled: 'bg-muted',
      ghost: 'border-transparent bg-transparent focus-visible:ring-0',
    };

    const sizeClasses = {
      sm: 'h-9 px-3',
      default: 'h-10 px-3 py-2',
      lg: 'h-11 px-3 py-2',
    };

    return cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      error && 'border-destructive focus-visible:ring-destructive',
      startIcon ? 'pl-10' : '',
      endIcon ? 'pr-10' : '',
      className
    );
  };

  return (
    <FormField name={name} error={error} isRequired={isRequired}>
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <div className="relative">
            {startIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {startIcon}
              </div>
            )}
            <input
              ref={ref}
              id={name}
              name={name}
              className={getInputClasses()}
              onChange={handleChange}
              disabled={props.disabled || uiState.loading.global}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : description ? `${name}-description` : undefined}
              {...props}
            />
            {endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {endIcon}
              </div>
            )}
          </div>
        </FormControl>
        {description && <FormDescription id={`${name}-description`}>{description}</FormDescription>}
        <FormMessage id={`${name}-error`} />
      </FormItem>
    </FormField>
  );
});

FormInput.displayName = 'FormInput';

// Form Textarea
export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  isRequired?: boolean;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  name,
  label,
  description,
  error,
  isRequired,
  enableAnalytics = false,
  analyticsEvent,
  className,
  onChange,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(state => state.ui);

  // Enhanced change handler with Redux + Analytics
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);

    // Your unique Redux analytics
    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Form Analytics',
        message: `Textarea changed: ${analyticsEvent || name}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, enableAnalytics, analyticsEvent, name, dispatch]);

  return (
    <FormField name={name} error={error} isRequired={isRequired}>
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <textarea
            ref={ref}
            id={name}
            name={name}
            className={cn(
              'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            onChange={handleChange}
            disabled={props.disabled || uiState.loading.global}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : description ? `${name}-description` : undefined}
            {...props}
          />
        </FormControl>
        {description && <FormDescription id={`${name}-description`}>{description}</FormDescription>}
        <FormMessage id={`${name}-error`} />
      </FormItem>
    </FormField>
  );
});

FormTextarea.displayName = 'FormTextarea';
