/**
 * Card Component - React wrapper for CardFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface CardProps {
  title?: string;
  content?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Card = createFactoryComponent<CardProps>(
  'Card',
  'CardFactory'
);

export default Card;
