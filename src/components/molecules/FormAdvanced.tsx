/**
 * Missing Form Components - Select, Checkbox, Radio, Switch, Slider
 * shadcn/ui inspired with Redux integration
 */

import React, { forwardRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { cn } from '../../utils/classnames';
import { responsiveSizes, responsiveSpacing } from '../../utils/responsive-utils';

// Explicit DOM type imports for ESLint
type HTMLSelectElement = globalThis.HTMLSelectElement;

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  error?: string;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  placeholder,
  error,
  enableAnalytics = false,
  analyticsEvent,
  className,
  onChange,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(state => state.ui);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);

    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Select Analytics',
        message: `Select changed: ${analyticsEvent || e.target.value}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, enableAnalytics, analyticsEvent, dispatch]);

  return (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface-primary)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-[var(--destructive)] focus:ring-[var(--destructive)]',
        className
      )}
      onChange={handleChange}
      disabled={props.disabled || uiState.loading.global}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';

// Checkbox Component
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  enableAnalytics = false,
  analyticsEvent,
  className,
  onChange,
  id,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(state => state.ui);
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Checkbox Analytics',
        message: `Checkbox ${e.target.checked ? 'checked' : 'unchecked'}: ${analyticsEvent || label}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, enableAnalytics, analyticsEvent, label, dispatch]);

  return (
    <div className="flex items-center space-x-2">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-[var(--destructive)] focus:ring-[var(--destructive)]',
          className
        )}
        onChange={handleChange}
        disabled={props.disabled || uiState.loading.global}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

// Radio Group Component
interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onValueChange,
  disabled,
  className,
  enableAnalytics = false,
  analyticsEvent,
  children
}) => {
  const dispatch = useAppDispatch();

  const handleValueChange = useCallback((newValue: string) => {
    onValueChange?.(newValue);

    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Radio Group Analytics',
        message: `Radio selected: ${analyticsEvent || newValue}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onValueChange, enableAnalytics, analyticsEvent, dispatch]);

  return (
    <div
      className={cn(responsiveSpacing.gap.sm, className)}
      role="radiogroup"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props) {
          const childProps = child.props as { value?: string; disabled?: boolean };
          return React.cloneElement(child, {
            checked: childProps.value === value,
            onChange: () => handleValueChange(childProps.value || ''),
            disabled: disabled || childProps.disabled
          } as React.InputHTMLAttributes<HTMLInputElement>);
        }
        return child;
      })}
    </div>
  );
};

// Radio Group Item
interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
}

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(({
  value,
  className,
  ...props
}, ref) => (
  <input
    ref={ref}
    type="radio"
    value={value}
    className={cn(
      'h-4 w-4 border border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));

RadioGroupItem.displayName = 'RadioGroupItem';

// Switch Component
interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  enableAnalytics = false,
  analyticsEvent,
  className,
  onChange,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(state => state.ui);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Switch Analytics',
        message: `Switch ${e.target.checked ? 'on' : 'off'}: ${analyticsEvent}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, enableAnalytics, analyticsEvent, dispatch]);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        onChange={handleChange}
        disabled={props.disabled || uiState.loading.global}
        {...props}
      />
      <div
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          props.checked ? 'bg-[var(--primary)]' : 'bg-[var(--surface-secondary)]',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-[var(--surface-primary)] transition-transform',
            props.checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </div>
    </label>
  );
});

Switch.displayName = 'Switch';

// Slider Component
interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  // Your unique Redux integration
  enableAnalytics?: boolean;
  analyticsEvent?: string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(({
  min = 0,
  max = 100,
  step = 1,
  value,
  onValueChange,
  enableAnalytics = false,
  analyticsEvent,
  className,
  onChange,
  ...props
}, ref) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(state => state.ui);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChange?.(Number(e.target.value));

    if (enableAnalytics) {
      dispatch(uiActions.addNotification({
        type: 'info',
        title: 'Slider Analytics',
        message: `Slider value: ${analyticsEvent || e.target.value}`,
        autoClose: true,
        duration: 1000
      }));
    }
  }, [onChange, onValueChange, enableAnalytics, analyticsEvent, dispatch]);

  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      className={cn(
        'w-full h-2 bg-[var(--surface-secondary)] rounded-lg appearance-none cursor-pointer slider',
        className
      )}
      onChange={handleChange}
      disabled={props.disabled || uiState.loading.global}
      {...props}
    />
  );
});

Slider.displayName = 'Slider';

// Export all form components
export {
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider
};
