/**
 * Button Component - React wrapper for ui-components ButtonFactory
 * Provides immediate feature parity with all existing button capabilities
 */
import React from 'react';
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
    elevation?: boolean;
    rippleEffect?: boolean;
    focusRing?: boolean;
    accessibility?: boolean;
    hapticFeedback?: boolean;
    analyticsTracking?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map