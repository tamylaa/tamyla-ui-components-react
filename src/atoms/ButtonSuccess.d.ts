import React from 'react';
export interface ButtonSuccessProps {
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
export declare const ButtonSuccess: React.FC<ButtonSuccessProps>;
export default ButtonSuccess;
//# sourceMappingURL=ButtonSuccess.d.ts.map