/**
 * SearchInterface Component - React wrapper for SearchInterfaceFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface FilterOption {
  value: string;
  label: string;
}

interface Filter {
  name: string;
  label: string;
  type: 'select' | 'checkbox' | 'range';
  options?: FilterOption[];
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
  metadata?: Record<string, unknown>;
}

interface SearchItem {
  id: string;
  title: string;
  type: string;
  metadata?: Record<string, unknown>;
}

interface SearchInterfaceProps {
  title?: string;
  description?: string;
  searchProps?: Record<string, unknown>;
  filters?: Filter[];
  initialQuery?: string;
  initialFilters?: SearchFilters;
  searchAPI?: (query: string, filters: SearchFilters) => Promise<SearchResult[]>;
  onSearch?: (query: string, filters: SearchFilters) => void;
  onResults?: (results: SearchResult[]) => void;
  onError?: (error: Error) => void;
  onSelection?: (item: SearchItem) => void;
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
