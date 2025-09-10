import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';

export interface ButtonSuccessProps {
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

export const ButtonSuccess: React.FC<ButtonSuccessProps> = ({
  onClick,
  children,
  ...props
}) => {
  const handleEvent = (eventData: ComponentEventData) => {
    if (eventData.type === 'click' && onClick) {
      // Create a synthetic React event from the DOM event
      const domEvent = (eventData.data as { event: MouseEvent })?.event;
      if (domEvent) {
        const syntheticEvent = {
          ...domEvent,
          preventDefault: () => domEvent.preventDefault(),
          stopPropagation: () => domEvent.stopPropagation(),
          target: domEvent.target,
          currentTarget: domEvent.currentTarget
        } as unknown as React.MouseEvent<HTMLButtonElement>;
        onClick(syntheticEvent);
      }
    }
  };

  return createFactoryComponent<ButtonSuccessProps>('ButtonSuccess', 'ButtonSuccess')({
    ...props,
    children,
    componentType: 'ButtonFactory',
    onEvent: handleEvent
  });
};

export default ButtonSuccess;
