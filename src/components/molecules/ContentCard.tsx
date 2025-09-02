/**
 * ContentCard Component - React wrapper for ContentCardFactory
 */

import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

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
  // React-specific event handlers
  onClick?: (_event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (_event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (_event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const handleEvent = (eventType: string, detail: any) => {
    switch (eventType) {
      case 'click':
        if (onClick) onClick(detail);
        break;
      case 'mouseenter':
        if (onMouseEnter) onMouseEnter(detail);
        break;
      case 'mouseleave':
        if (onMouseLeave) onMouseLeave(detail);
        break;
    }
  };

  return createFactoryComponent<ContentCardProps>('ContentCard', 'ContentCardFactory')({
    ...props,
    onEvent: handleEvent,
    onClick,
    onMouseEnter,
    onMouseLeave
  });
};

export default ContentCard;
