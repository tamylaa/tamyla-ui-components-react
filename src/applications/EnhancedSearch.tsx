/**
 * Enhanced Search Application - React wrapper for ui-components EnhancedSearchApplicationFactory
 */

import { createFactoryComponent } from '../core/factory-bridge';

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
  onSearch?: (query: string, filters: any) => void;
  onResultSelect?: (result: any) => void;
  onFilterChange?: (filters: any) => void;
}

export const EnhancedSearch = createFactoryComponent<EnhancedSearchProps>(
  'EnhancedSearch',
  'EnhancedSearch'
);

export default EnhancedSearch;
