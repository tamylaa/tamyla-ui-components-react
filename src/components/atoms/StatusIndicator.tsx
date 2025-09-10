/**
 * StatusIndicator Component - React wrapper for ui-components StatusIndicatorFactory
 */

import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';
import { responsiveSizes, combineResponsive } from '../../utils/responsive-utils';

interface StatusIndicatorProps {
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  pulseEffect?: boolean;
  // Trading Portal specific
  tradingStatus?: 'order-pending' | 'order-filled' | 'order-cancelled' | 'market-open' | 'market-closed';
  // React-specific event handlers
  onClick?: (_: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (_: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (_: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  size = 'default',
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const handleEvent = (_eventData: ComponentEventData) => {
    // Handle ui-components events if needed
  };

  return createFactoryComponent<StatusIndicatorProps>('StatusIndicator', 'StatusIndicator')({
    ...props,
    size: size as 'xs' | 'sm' | 'md' | 'lg',
    componentType: 'ButtonFactory', // Status indicators might use button factory
    onEvent: handleEvent,
    onClick,
    onMouseEnter,
    onMouseLeave
  });
};

export default StatusIndicator;
