import React from 'react';
export interface ButtonSecondaryProps {
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
export declare const ButtonSecondary: React.FC<ButtonSecondaryProps>;
export default ButtonSecondary;
//# sourceMappingURL=ButtonSecondary.d.ts.map