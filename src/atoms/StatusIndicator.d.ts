/**
 * StatusIndexport const StatusIndicator = createFactoryComponent<StatusIndicatorProps>(
  'StatusIndicator',
  'StatusIndicator'
);Component - React wrapper for ui-components StatusIndicatorFactory
 */
/// <reference types="react" />
interface StatusIndicatorProps {
    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'warning';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    label?: string;
    animated?: boolean;
    pulseEffect?: boolean;
    tradingStatus?: 'order-pending' | 'order-filled' | 'order-cancelled' | 'market-open' | 'market-closed';
}
export declare const StatusIndicator: import("react").FC<StatusIndicatorProps>;
export default StatusIndicator;
//# sourceMappingURL=StatusIndicator.d.ts.map