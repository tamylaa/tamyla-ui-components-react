/**
 * StatusIndicator Component - React wrapper for ui-components StatusIndicatorFactory
 */

import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

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
  onClick?: (_event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (_event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (_event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const handleEvent = (eventType: string, detail: any) => {
    // Handle ui-components events if needed
    console.log('StatusIndicator event:', eventType, detail);
  };

  return createFactoryComponent<StatusIndicatorProps>('StatusIndicator', 'StatusIndicator')({
    ...props,
    onEvent: handleEvent,
    onClick,
    onMouseEnter,
    onMouseLeave
  });
};

export default StatusIndicator;
