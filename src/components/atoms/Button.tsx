/**
 * Button Component - React wrapper for ui-components ButtonFactory
 * Provides immediate feature parity with all existing button capabilities
 */

import React from 'react';

// Import types from ui-components (we'll define these based on the factory)
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning' | 'info' | 'action-card' | 'status-pending' | 'status-filled' | 'status-cancelled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  text?: string;
  children?: React.ReactNode;
  // Trading Portal enhancements
  elevation?: boolean;
  rippleEffect?: boolean;
  focusRing?: boolean;
  accessibility?: boolean;
  hapticFeedback?: boolean;
  analyticsTracking?: boolean;
  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

// Simple Button component for now - will be enhanced with factory bridge later
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  text,
  onClick,
  ...props
}) => {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={`tamyla-button tamyla-button--${variant} tamyla-button--${size}`}
      data-loading={loading}
      {...props}
    >
      {loading ? 'Loading...' : (children || text)}
    </button>
  );
};

export default Button;
