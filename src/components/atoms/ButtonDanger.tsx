import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

export interface ButtonDangerProps {
  children?: React.ReactNode;
  onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const ButtonDanger: React.FC<ButtonDangerProps> = ({
  onClick,
  children,
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

  return createFactoryComponent<ButtonDangerProps>('ButtonDanger', 'ButtonDanger')({
    ...props,
    children,
    onEvent: handleEvent
  });
};

export default ButtonDanger;
