/**
 * Notification Component - React wrapper for NotificationFactory
 */
/// <reference types="react" />
interface NotificationProps {
    type?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message?: string;
    duration?: number;
    closable?: boolean;
    actions?: Array<{
        label: string;
        action: () => void;
        variant?: 'primary' | 'secondary';
    }>;
    onClose?: () => void;
    className?: string;
}
declare const Notification: import("react").FC<NotificationProps>;
export default Notification;
//# sourceMappingURL=Notification.d.ts.map