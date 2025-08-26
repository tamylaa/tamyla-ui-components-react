/**
 * SearchInterface Component - React wrapper for SearchInterfaceFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

interface SearchInterfaceProps {
  title?: string;
  description?: string;
  searchProps?: Record<string, any>;
  filters?: Array<{
    name: string;
    label: string;
    type: 'select' | 'checkbox' | 'range';
    options?: any[];
  }>;
  initialQuery?: string;
  initialFilters?: Record<string, any>;
  searchAPI?: (query: string, filters: Record<string, any>) => Promise<any>;
  onSearch?: (query: string, filters: Record<string, any>) => void;
  onResults?: (results: any[]) => void;
  onError?: (error: Error) => void;
  onSelection?: (item: any) => void;
  showHeader?: boolean;
  showFilters?: boolean;
  showResultsActions?: boolean;
  layout?: 'vertical' | 'horizontal';
  size?: 'default' | 'compact' | 'large';
  debounceMs?: number;
  pageSize?: number;
  enableVoiceSearch?: boolean;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  trackAnalytics?: boolean;
  className?: string;
}

const SearchInterface = createFactoryComponent<SearchInterfaceProps>(
  'SearchInterface',
  'SearchInterfaceFactory'
);

export default SearchInterface;
