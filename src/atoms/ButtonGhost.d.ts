import React from 'react';
export interface ButtonGhostProps {
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
export declare const ButtonGhost: React.FC<ButtonGhostProps>;
export default ButtonGhost;
//# sourceMappingURL=ButtonGhost.d.ts.map