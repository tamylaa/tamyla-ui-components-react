/**
 * ContentCard Component - React wrapper for ContentCardFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

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
  onClick?: () => void;
  className?: string;
}

const ContentCard = createFactoryComponent<ContentCardProps>(
  'ContentCard',
  'ContentCardFactory'
);

export default ContentCard;
