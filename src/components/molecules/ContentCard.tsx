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
  ...otherProps
}) => {
  const handleEvent = (eventType: string, detail: any) => {
    // Extract the original DOM event from the detail object
    const event = detail?.event || detail;

    switch (eventType) {
      case 'click':
        if (onClick) onClick(event);
        break;
      case 'mouseenter':
        if (onMouseEnter) onMouseEnter(event);
        break;
      case 'mouseleave':
        if (onMouseLeave) onMouseLeave(event);
        break;
    }
  };

  return createFactoryComponent<ContentCardProps>('ContentCard', 'ContentCardFactory')({
    ...otherProps,
    onEvent: handleEvent
    // Don't pass direct event handlers when using onEvent to avoid double firing
  });
};

export default ContentCard;
