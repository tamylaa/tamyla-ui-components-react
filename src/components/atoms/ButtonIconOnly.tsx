import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

export interface ButtonIconOnlyProps {
  onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  'aria-label': string;
  tooltip?: string;
  className?: string;
}

export const ButtonIconOnly: React.FC<ButtonIconOnlyProps> = ({
  onClick,
  ...props
}) => {
  const handleEvent = (eventType: string, detail: any) => {
    if (eventType === 'click' && onClick) {
      const syntheticEvent = {
        ...detail,
        preventDefault: () => detail.preventDefault(),
        stopPropagation: () => detail.stopPropagation(),
        target: detail.target,
        currentTarget: detail.currentTarget
      } as React.MouseEvent<HTMLButtonElement>;
      onClick(syntheticEvent);
    }
  };

  return createFactoryComponent<ButtonIconOnlyProps>('ButtonIconOnly', 'ButtonIconOnly')({
    ...props,
    onEvent: handleEvent
  });
};

export default ButtonIconOnly;
