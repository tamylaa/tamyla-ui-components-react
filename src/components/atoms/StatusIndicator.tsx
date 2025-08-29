/**
 * StatusIndexport const StatusIndicator = createFactoryComponent<StatusIndicatorProps>(
  'StatusIndicator',
  'StatusIndicator'
);Component - React wrapper for ui-components StatusIndicatorFactory
 */

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
}

export const StatusIndicator = createFactoryComponent<StatusIndicatorProps>(
  'StatusIndicator',
  'StatusIndicator'
);

export default StatusIndicator;
