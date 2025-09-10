/**
 * Dashboard Organism - Factory-based dashboard using ui-components capabilities
 * Enhanced with comprehensive dashboard templates and organism factory patterns
 */

import React from 'react';
import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface DashboardWidget {
  id: string;
  component: string;
  props?: Record<string, string | number | boolean | object>;
}

interface SearchFilters {
  [key: string]: string | number | boolean | string[];
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url?: string;
  score: number;
  type: string;
  metadata?: Record<string, string | number | boolean>;
}

interface DashboardItem {
  id: string;
  title: string;
  type: string;
  metadata?: Record<string, string | number | boolean>;
}

interface DashboardActionData {
  action: string;
  widgetId: string;
  payload?: Record<string, string | number | boolean | object>;
}

interface DashboardProps {
  // Dashboard type selection
  type?: 'search' | 'content' | 'knowledge' | 'media';

  // Common dashboard props
  title?: string;
  description?: string;

  // Widget configuration
  widgets?: DashboardWidget[];

  // Layout options
  layout?: 'grid' | 'list' | 'cards' | 'vertical' | 'horizontal';
  size?: 'default' | 'compact' | 'large' | 'expanded';

  // Search-specific props (for search dashboard)
  searchAPI?: (query: string, filters: SearchFilters) => Promise<SearchResult[]>;
  onResults?: (results: SearchResult[]) => void;
  onError?: (error: Error) => void;

  // Content dashboard props
  onSelection?: (item: DashboardItem) => void;

  // Event handlers
  onWidgetAction?: (action: string, data: DashboardActionData) => void;

  // Container options
  className?: string;
  style?: React.CSSProperties;
}

// Individual Dashboard Components using factory bridge
export const DashboardSearch = createFactoryComponent<DashboardProps>(
  'DashboardSearch',
  'DashboardSearch'
);

export const DashboardContent = createFactoryComponent<DashboardProps>(
  'DashboardContent',
  'DashboardContent'
);

export const DashboardKnowledge = createFactoryComponent<DashboardProps>(
  'DashboardKnowledge',
  'DashboardKnowledge'
);

export const DashboardMedia = createFactoryComponent<DashboardProps>(
  'DashboardMedia',
  'DashboardMedia'
);

// Main Dashboard component that routes to appropriate dashboard type
const Dashboard: React.FC<DashboardProps> = ({ type = 'content', ...props }) => {
  switch (type) {
  case 'search':
    return <DashboardSearch {...props} componentType="CardFactory" />;
  case 'content':
    return <DashboardContent {...props} componentType="CardFactory" />;
  case 'knowledge':
    return <DashboardKnowledge {...props} componentType="CardFactory" />;
  case 'media':
    return <DashboardMedia {...props} componentType="CardFactory" />;
  default:
    return <DashboardContent {...props} componentType="CardFactory" />;
  }
};

export default Dashboard;
