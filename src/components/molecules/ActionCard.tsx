/**
 * ActionCard Componeexport const ActionCard = createFactoryComponent<ActionCardProps>(
  'ActionCard',
  'ActionCard'
);act wrapper for ui-components ActionCardFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface ActionCardProps {
  title?: string;
  description?: string;
  icon?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  elevation?: boolean;
  disabled?: boolean;
  loading?: boolean;
  // Gamification features from Trading Portal
  points?: number;
  level?: string;
  progress?: number;
  badge?: string;
  // Event handlers
  onClick?: (_: MouseEvent) => void;
  onHover?: (_: MouseEvent) => void;
}

export const ActionCard = createFactoryComponent<ActionCardProps>(
  'ActionCard',
  'ActionCard'
);

export default ActionCard;
