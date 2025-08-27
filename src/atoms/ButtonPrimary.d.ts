import React from 'react';
export interface ButtonPrimaryProps {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    icon?: string;
    iconPosition?: 'left' | 'right';
    className?: string;
}
export declare const ButtonPrimary: React.FC<ButtonPrimaryProps>;
export default ButtonPrimary;
//# sourceMappingURL=ButtonPrimary.d.ts.map