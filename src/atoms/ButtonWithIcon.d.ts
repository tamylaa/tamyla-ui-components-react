import React from 'react';
export interface ButtonWithIconProps {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    icon: string;
    iconPosition?: 'left' | 'right';
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    className?: string;
}
export declare const ButtonWithIcon: React.FC<ButtonWithIconProps>;
export default ButtonWithIcon;
//# sourceMappingURL=ButtonWithIcon.d.ts.map