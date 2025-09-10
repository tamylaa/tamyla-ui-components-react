import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';

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

  return createFactoryComponent<ButtonIconOnlyProps>('ButtonIconOnly', 'ButtonIconOnly')({
    ...props,
    componentType: 'ButtonFactory',
    onEvent: handleEvent
  });
};

export default ButtonIconOnly;
