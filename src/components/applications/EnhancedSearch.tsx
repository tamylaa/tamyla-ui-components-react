/**
 * Enhanced Search Application - React wrapper for ui-components EnhancedSearchApplicationFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface _SearchResult {
  id: string;
  title: string;
  description?: string;
  url?: string;
  score: number;
  type: string;
  metadata?: Record<string, string | number | boolean>;
}

interface _SearchFilters {
  [key: string]: string | number | boolean | string[];
}

interface EnhancedSearchProps {
  apiEndpoint?: string;
  placeholder?: string;
  filters?: Array<{
    name: string;
    label: string;
    type: 'select' | 'checkbox' | 'date' | 'range';
    options?: Array<{ value: string; label: string }>;
  }>;
  resultsPerPage?: number;
  enableAdvancedSearch?: boolean;
  enableSorting?: boolean;
  enableExport?: boolean;
  // Event handlers
  onSearch?: (_query: string, _filters: _SearchFilters) => void;
  onResultSelect?: (_result: _SearchResult) => void;
  onFilterChange?: (_filters: _SearchFilters) => void;
}

export const EnhancedSearch = createFactoryComponent<EnhancedSearchProps>(
  'EnhancedSearch',
  'EnhancedSearch'
);

export default EnhancedSearch;
