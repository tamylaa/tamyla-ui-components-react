/**
 * ActionCard Component - Enhanced React wrapper for ActionCardFactory
 * Features: Redux integration, styled-components, accessibility, analytics
 */

import React, { useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { responsiveSizes, responsiveSpacing } from '../../utils/responsive-utils';

// Styled components
const ActionCardContainer = styled.div<{
  variant: string;
  elevation: boolean;
  disabled: boolean;
}>`
  position: relative;
  border-radius: 8px;
  padding: ${responsiveSizes.card.sm};
  transition: all 0.2s ease-in-out;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};

  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${props.theme?.primaryColor || '#3b82f6'};
          color: white;
          border: 1px solid ${props.theme?.primaryColor || '#3b82f6'};
        `;
      case 'success':
        return `
          background: #10b981;
          color: white;
          border: 1px solid #10b981;
        `;
      case 'warning':
        return `
          background: #f59e0b;
          color: white;
          border: 1px solid #f59e0b;
        `;
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          border: 1px solid #ef4444;
        `;
      default:
        return `
          background: ${props.theme?.mode === 'dark' ? '#1f2937' : 'white'};
          color: ${props.theme?.mode === 'dark' ? 'white' : '#1f2937'};
          border: 1px solid ${props.theme?.mode === 'dark' ? '#374151' : '#e5e7eb'};
        `;
    }
  }}

  /* Elevation styles */
  ${props => props.elevation && `
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    &:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `}

  /* Hover effects */
  &:hover {
    transform: translateY(-2px);
    ${props => !props.disabled && `
      filter: brightness(1.05);
    `}
  }

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${props => props.theme?.primaryColor || '#3b82f6'};
    outline-offset: 2px;
  }

  /* Loading state */
  ${props => props.disabled && `
    pointer-events: none;
  `}
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${responsiveSpacing.gap.sm};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GamificationBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #1f2937;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div<{ progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0 0 8px 8px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: currentColor;
    transition: width 0.3s ease;
  }
`;

// Enhanced props interface
interface ActionCardProps {
  // Core props
  title?: string;
  description?: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  elevation?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // Gamification features
  points?: number;
  level?: string;
  progress?: number;
  badge?: string;

  // React event handlers
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;

  // Additional props
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Create factory component
const FactoryActionCard = createFactoryComponent<ActionCardProps>(
  'ActionCard',
  'ActionCard'
);

// Enhanced ActionCard component
export const ActionCard: React.FC<ActionCardProps> = React.memo(({
  title = 'Action Card',
  description,
  icon,
  variant = 'default',
  size = 'md',
  interactive = true,
  elevation = true,
  disabled = false,
  loading = false,
  points,
  level,
  progress,
  badge,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  className,
  style,
  'data-testid': testId,
  ...otherProps
}) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Memoized computed values
  const cardId = useMemo(() => `action-card-${Math.random().toString(36).substr(2, 9)}`, []);
  const shouldShowGamification = useMemo(() =>
    Boolean(points || level || progress || badge),
    [points, level, progress, badge]
  );

  // Enhanced event handlers with analytics
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || loading) return;

    // Track interaction
    dispatch(uiActions.addNotification({
      type: 'info',
      title: 'Action Card Clicked',
      message: `Clicked: ${title}`,
      autoClose: true,
      duration: 2000
    }));

    // Track analytics
    if (typeof window !== 'undefined') {
      const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
      if (w.gtag) {
        w.gtag('event', 'action_card_click', {
          event_category: 'engagement',
          event_label: title,
          value: points || 0
        });
      }
    }

    onClick?.(event);
  }, [disabled, loading, dispatch, title, points, onClick]);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    onMouseLeave?.(event);
  }, [onMouseLeave]);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  }, [onBlur]);

  // Factory event handler
  const handleFactoryEvent = useCallback((eventData: ComponentEventData) => {
    const event = (eventData.data as { event?: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement> })?.event;

    switch (eventData.type) {
      case 'click':
        if (onClick && event) onClick(event as React.MouseEvent<HTMLDivElement>);
        break;
      case 'mouseenter':
        if (onMouseEnter && event) onMouseEnter(event as React.MouseEvent<HTMLDivElement>);
        break;
      case 'mouseleave':
        if (onMouseLeave && event) onMouseLeave(event as React.MouseEvent<HTMLDivElement>);
        break;
      case 'focus':
        if (onFocus && event) onFocus(event as React.FocusEvent<HTMLDivElement>);
        break;
      case 'blur':
        if (onBlur && event) onBlur(event as React.FocusEvent<HTMLDivElement>);
        break;
    }
  }, [onClick, onMouseEnter, onMouseLeave, onFocus, onBlur]);

  // Render icon
  const renderIcon = useMemo(() => {
    if (!icon) return null;

    return (
      <IconWrapper>
        {icon.startsWith('http') || icon.startsWith('data:') ? (
          <img src={icon} alt="" style={{ width: 24, height: 24 }} />
        ) : (
          <span style={{ fontSize: 24 }}>{icon}</span>
        )}
      </IconWrapper>
    );
  }, [icon]);

  // Render gamification elements
  const renderGamification = useMemo(() => {
    if (!shouldShowGamification) return null;

    return (
      <>
        {badge && <GamificationBadge>{badge}</GamificationBadge>}
        {progress !== undefined && (
          <ProgressBar progress={Math.min(Math.max(progress, 0), 100)} />
        )}
      </>
    );
  }, [shouldShowGamification, badge, progress]);

  return (
    <ActionCardContainer
      variant={variant}
      elevation={elevation}
      disabled={disabled || loading}
      className={className}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      aria-describedby={description ? `${cardId}-description` : undefined}
      aria-disabled={disabled || loading}
      data-testid={testId}
      data-hovered={isHovered}
      data-focused={isFocused}
      data-loading={loading}
    >
      <CardContent>
        {renderIcon}
        <TextContent>
          <Title id={cardId}>{title}</Title>
          {description && (
            <Description id={`${cardId}-description`}>
              {description}
            </Description>
          )}
        </TextContent>
      </CardContent>

      {renderGamification}

      {/* Factory bridge integration */}
      <FactoryActionCard
        config={{
          title,
          description,
          icon,
          variant,
          size,
          interactive,
          elevation,
          disabled: disabled || loading,
          points,
          level,
          progress,
          badge,
          ...otherProps
        }}
        componentType="CardFactory"
        onEvent={handleFactoryEvent}
        style={{ display: 'none' }} // Hide factory component, use our styled wrapper
      />
    </ActionCardContainer>
  );
});

ActionCard.displayName = 'ActionCard';

export default ActionCard;
