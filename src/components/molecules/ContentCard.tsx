/**
 * ContentCard Component - Enhanced React wrapper for ContentCardFactory
 * Features: Redux integration, styled-components, accessibility, performance optimization
 */

import React, { useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { ComponentEventData } from '../../types/factory';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { responsiveSizes } from '../../utils/responsive-utils';

// Styled components
const ContentCardContainer = styled.article<{
  variant: string;
  interactive: boolean;
}>`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: ${props => props.interactive ? 'pointer' : 'default'};
  background: ${props => props.theme?.mode === 'dark' ? '#1f2937' : 'white'};
  border: 1px solid ${props => props.theme?.mode === 'dark' ? '#374151' : '#e5e7eb'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'featured':
        return `
          border-color: ${props.theme?.primaryColor || '#3b82f6'};
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        `;
      case 'compact':
        return `
          padding: ${responsiveSizes.card.sm};
        `;
      default:
        return `
          &:hover {
            ${props.interactive && `
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              border-color: ${props.theme?.primaryColor || '#3b82f6'};
            `}
          }
        `;
    }
  }}

  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${props => props.theme?.primaryColor || '#3b82f6'};
    outline-offset: 2px;
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: ${responsiveSizes.card.default};
`;

const CardHeader = styled.header`
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: ${props => props.theme?.mode === 'dark' ? 'white' : '#1f2937'};
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: ${props => props.theme?.mode === 'dark' ? '#9ca3af' : '#6b7280'};
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const Tag = styled.span`
  padding: 4px 8px;
  background: ${props => props.theme?.primaryColor || '#3b82f6'}20;
  color: ${props => props.theme?.primaryColor || '#3b82f6'};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const ReadTime = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '📖';
  }
`;

// Enhanced props interface
interface ContentCardProps {
  title?: string;
  content?: string;
  image?: string;
  tags?: string[];
  author?: string;
  date?: string;
  readTime?: string;
  variant?: 'default' | 'featured' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;

  // React event handlers
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;

  // Additional props
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Create factory component
const FactoryContentCard = createFactoryComponent<ContentCardProps>(
  'ContentCard',
  'ContentCard'
);

// Enhanced ContentCard component
export const ContentCard: React.FC<ContentCardProps> = React.memo(({
  title = 'Content Card',
  content,
  image,
  tags = [],
  author,
  date,
  readTime,
  variant = 'default',
  size = 'md',
  interactive = true,
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoized computed values
  const cardId = useMemo(() => `content-card-${Math.random().toString(36).substr(2, 9)}`, []);
  const formattedDate = useMemo(() => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [date]);

  // Enhanced event handlers
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;

    // Track interaction
    dispatch(uiActions.addNotification({
      type: 'info',
      title: 'Content Viewed',
      message: `Viewed: ${title}`,
      autoClose: true,
      duration: 2000
    }));

    // Track analytics
    if (typeof window !== 'undefined') {
      const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
      if (w.gtag) {
        w.gtag('event', 'content_card_click', {
          event_category: 'engagement',
          event_label: title,
          value: 1
        });
      }
    }

    onClick?.(event);
  }, [interactive, dispatch, title, onClick]);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    onMouseEnter?.(event);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsHovered(false);
    onMouseLeave?.(event);
  }, [onMouseLeave]);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    onFocus?.(event);
  }, [onFocus]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    onBlur?.(event);
  }, [onBlur]);

  // Image event handlers
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Factory event handler
  const handleFactoryEvent = useCallback((eventData: ComponentEventData) => {
    const event = (eventData.data as { event?: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement> })?.event;

    switch (eventData.type) {
      case 'click':
        if (onClick && event) onClick(event as React.MouseEvent<HTMLElement>);
        break;
      case 'mouseenter':
        if (onMouseEnter && event) onMouseEnter(event as React.MouseEvent<HTMLElement>);
        break;
      case 'mouseleave':
        if (onMouseLeave && event) onMouseLeave(event as React.MouseEvent<HTMLElement>);
        break;
      case 'focus':
        if (onFocus && event) onFocus(event as React.FocusEvent<HTMLElement>);
        break;
      case 'blur':
        if (onBlur && event) onBlur(event as React.FocusEvent<HTMLElement>);
        break;
    }
  }, [onClick, onMouseEnter, onMouseLeave, onFocus, onBlur]);

  // Render tags
  const renderTags = useMemo(() => {
    if (!tags.length) return null;

    return (
      <CardTags>
        {tags.map((tag, index) => (
          <Tag key={`${tag}-${index}`}>{tag}</Tag>
        ))}
      </CardTags>
    );
  }, [tags]);

  // Render image
  const renderImage = useMemo(() => {
    if (!image || imageError) return null;

    return (
      <CardImage>
        <img
          src={image}
          alt={title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </CardImage>
    );
  }, [image, imageError, title, handleImageLoad, handleImageError]);

  return (
    <ContentCardContainer
      variant={variant}
      interactive={interactive}
      className={className}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role={interactive ? 'article' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      aria-describedby={content ? `${cardId}-content` : undefined}
      data-testid={testId}
      data-hovered={isHovered}
      data-variant={variant}
    >
      {renderImage}

      <CardContent>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {(author || formattedDate || readTime) && (
            <CardMeta>
              {author && <span>By {author}</span>}
              {formattedDate && <span>{formattedDate}</span>}
              {readTime && <ReadTime>{readTime}</ReadTime>}
            </CardMeta>
          )}
        </CardHeader>

        {content && (
          <div id={`${cardId}-content`}>
            {content.length > 150 ? `${content.substring(0, 150)}...` : content}
          </div>
        )}

        {renderTags}
      </CardContent>

      {/* Factory bridge integration */}
      <FactoryContentCard
        config={{
          title,
          content,
          image,
          tags,
          author,
          date,
          readTime,
          variant,
          size,
          interactive,
          ...otherProps
        }}
        onEvent={handleFactoryEvent}
        componentType="CardFactory"
        style={{ display: 'none' }} // Hide factory component, use our styled wrapper
      />
    </ContentCardContainer>
  );
});

ContentCard.displayName = 'ContentCard';

export default ContentCard;
