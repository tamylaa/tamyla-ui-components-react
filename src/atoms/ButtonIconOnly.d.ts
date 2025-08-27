import React from 'react';
export interface ButtonIconOnlyProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
    icon: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    'aria-label': string;
    tooltip?: string;
    className?: string;
}
export declare const ButtonIconOnly: React.FC<ButtonIconOnlyProps>;
export default ButtonIconOnly;
//# sourceMappingURL=ButtonIconOnly.d.ts.map