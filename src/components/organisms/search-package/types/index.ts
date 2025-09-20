// Shared types for search components that will be moved to @tamyla/ui-components-react
export interface SearchResult {
  id?: string | number;
  name: string;
  type: string;
  date: string | Date;
  description?: string;
  url?: string;
  metadata?: Record<string, any>;
}

export interface RecentSearch {
  query: string;
  timestamp?: string | Date;
  resultsCount?: number;
}

export interface SearchStatus {
  isConnected: boolean;
  service: string;
  label: string;
}

// Props interfaces for the package components
export interface SearchResultsListProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  maxResults?: number;
}

export interface RecentSearchesListProps {
  searches: (string | RecentSearch)[];
  onSearchClick: (search: string) => void;
  maxItems?: number;
  title?: string;
  className?: string;
  emptyMessage?: string;
}

export interface SearchStatusIndicatorProps {
  statuses: SearchStatus[];
  title?: string;
  className?: string;
  showTitle?: boolean;
}

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  loading?: boolean;
  disabled?: boolean;
  showClearButton?: boolean;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'outlined' | 'filled';
}

export interface SearchContainerProps {
  // Search input props
  initialQuery?: string;
  placeholder?: string;
  debounceMs?: number;
  autoFocus?: boolean;

  // Results props
  results?: SearchResult[];
  maxResults?: number;
  loading?: boolean;
  emptyMessage?: string;

  // Recent searches props
  recentSearches?: (string | RecentSearch)[];
  maxRecentItems?: number;
  showRecentSearches?: boolean;

  // Status props
  statuses?: SearchStatus[];
  showStatusIndicator?: boolean;

  // Layout props
  layout?: 'vertical' | 'horizontal';
  className?: string;

  // Event handlers
  onSearch?: (query: string) => void;
  onResultClick?: (result: SearchResult) => void;
  onRecentSearchClick?: (search: string) => void;
}

// Event handlers
export type SearchResultClickHandler = (result: SearchResult) => void;
export type RecentSearchClickHandler = (search: string) => void;
export type SearchInputChangeHandler = (value: string) => void;
export type SearchSubmitHandler = (query: string) => void;
