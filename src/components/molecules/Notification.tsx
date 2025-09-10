/**
 * Notification Component - Enhanced React wrapper for NotificationFactory
 * Features: Redux integration, animations, accessibility, auto-dismiss
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { responsiveSizes, responsiveSpacing } from '../../utils/responsive-utils';

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled components
const NotificationContainer = styled.div<{
  type: string;
  isVisible: boolean;
}>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${responsiveSpacing.gap.sm};
  padding: ${responsiveSizes.card.sm};
  border-radius: 8px;
  margin-bottom: ${responsiveSpacing.margin.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid;
  animation: ${fadeIn} 0.3s ease-out;

  /* Type-based styling */
  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: var(--success);
          color: var(--success-foreground);
          border-color: var(--success);
        `;
      case 'error':
        return `
          background: var(--destructive);
          color: var(--destructive-foreground);
          border-color: var(--destructive);
        `;
      case 'warning':
        return `
          background: var(--warning);
          color: var(--warning-foreground);
          border-color: var(--warning);
        `;
      default: // info
        return `
          background: var(--primary);
          color: var(--primary-foreground);
          border-color: var(--primary);
        `;
    }
  }}

  /* Exit animation */
  ${props => !props.isVisible && `
    animation: ${slideOut} 0.3s ease-in forwards;
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h4`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.9;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{
  variant: string;
}>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: rgba(255, 255, 255, 0.2);
          color: var(--primary-foreground);
          border-color: rgba(255, 255, 255, 0.4);

          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `;
      default:
        return `
          background: transparent;
          color: var(--primary-foreground);
          border-color: rgba(255, 255, 255, 0.3);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        `;
    }
  }}

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary-foreground);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`;

const ProgressBar = styled.div<{
  duration: number;
  remaining: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 8px 8px;
  transition: width linear;

  width: ${props => `${(props.remaining / props.duration) * 100}%`};
`;

// Enhanced props interface
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
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Create factory component
const FactoryNotification = createFactoryComponent<NotificationProps>(
  'Notification',
  'Notification'
);

// Enhanced Notification component
export const Notification: React.FC<NotificationProps> = React.memo(({
  type = 'info',
  title,
  message,
  duration = 5000,
  closable = true,
  actions = [],
  onClose,
  className,
  style,
  'data-testid': testId,
  ...otherProps
}) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [remainingTime, setRemainingTime] = useState(duration);

  // Stable notification ID that doesn't change on re-renders
  const notificationId = useMemo(() =>
    `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    [] // Only generate once
  );
  const icon = useMemo(() => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }, [type]);

  // Enhanced close handler
  const handleClose = useCallback(() => {
    setIsVisible(false);

    // Delay actual removal to allow exit animation
    const timeoutId = setTimeout(() => {
      onClose?.();

      // Remove from Redux store if managed there
      dispatch(uiActions.removeNotification(notificationId));
    }, 300);

    // Return cleanup function for timeout
    return () => clearTimeout(timeoutId);
  }, [onClose, dispatch, notificationId]);

  // Auto-dismiss functionality with proper cleanup
  useEffect(() => {
    if (duration <= 0) return;

    let intervalId: number | null = null;
    let isMounted = true;

    intervalId = window.setInterval(() => {
      if (!isMounted) return;

      setRemainingTime(prev => {
        const newTime = prev - 100;
        if (newTime <= 0) {
          if (isMounted) {
            handleClose();
          }
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => {
      isMounted = false;
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, [duration, handleClose]);

  // Action handler
  const handleAction = useCallback((action: () => void) => {
    action();
    if (closable) {
      handleClose();
    }
  }, [handleClose, closable]);

  // Factory event handler
  const handleFactoryEvent = useCallback((eventData: ComponentEventData) => {
    switch (eventData.type) {
      case 'close':
        handleClose();
        break;
    }
  }, [handleClose]);

  // Render actions
  const renderActions = useMemo(() => {
    if (!actions.length) return null;

    return (
      <ActionsWrapper>
        {actions.map((action, index) => (
          <ActionButton
            key={`${action.label}-${index}`}
            variant={action.variant || 'secondary'}
            onClick={() => handleAction(action.action)}
          >
            {action.label}
          </ActionButton>
        ))}
      </ActionsWrapper>
    );
  }, [actions, handleAction]);

  if (!isVisible) return null;

  return (
    <NotificationContainer
      type={type}
      isVisible={isVisible}
      className={className}
      style={style}
      role="alert"
      aria-live="polite"
      aria-label={`${type} notification`}
      data-testid={testId}
      data-type={type}
    >
      <IconWrapper aria-hidden="true">
        {icon}
      </IconWrapper>

      <ContentWrapper>
        {title && <Title>{title}</Title>}
        {message && <Message>{message}</Message>}
        {renderActions}
      </ContentWrapper>

      {closable && (
        <CloseButton
          onClick={handleClose}
          aria-label="Close notification"
          type="button"
        >
          ×
        </CloseButton>
      )}

      {duration > 0 && (
        <ProgressBar
          duration={duration}
          remaining={remainingTime}
        />
      )}

      {/* Factory bridge integration */}
      <FactoryNotification
        config={{
          type,
          title,
          message,
          duration,
          closable,
          actions,
          ...otherProps
        }}
        onEvent={handleFactoryEvent}
        componentType="CardFactory"
        style={{ display: 'none' }} // Hide factory component, use our styled wrapper
      />
    </NotificationContainer>
  );
});

Notification.displayName = 'Notification';

export default Notification;
