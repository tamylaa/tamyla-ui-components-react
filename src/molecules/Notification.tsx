/**
 * Notification Component - React wrapper for NotificationFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

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

const Notification = createFactoryComponent<NotificationProps>(
  'Notification',
  'NotificationFactory'
);

export default Notification;
