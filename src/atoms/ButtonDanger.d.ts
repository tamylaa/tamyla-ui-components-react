import React from 'react';
export interface ButtonDangerProps {
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
export declare const ButtonDanger: React.FC<ButtonDangerProps>;
export default ButtonDanger;
//# sourceMappingURL=ButtonDanger.d.ts.map