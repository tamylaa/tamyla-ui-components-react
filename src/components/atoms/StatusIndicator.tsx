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
  onClick?: (_: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (_: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (_: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const handleEvent = (_eventType: string, _detail: unknown) => {
    // Handle ui-components events if needed
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
