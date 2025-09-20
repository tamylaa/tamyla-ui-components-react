// Package components for @tamyla/ui-components-react
// These components are extracted from ContentAccess and ready to be moved to the package

// Search Components
export { SearchResultsList } from './search/SearchResultsList';
export { RecentSearchesList } from './search/RecentSearchesList';
export { SearchStatusIndicator, createDefaultSearchStatuses } from './search/SearchStatusIndicator';
export { SearchInput } from './search/SearchInput';
export { SearchContainer } from './search/SearchContainer';

// Hooks
export { useSearchState } from './hooks/useSearchState';

// Types
export type {
  SearchResult,
  RecentSearch,
  SearchStatus,
  SearchResultsListProps,
  RecentSearchesListProps,
  SearchStatusIndicatorProps,
  SearchInputProps,
  SearchContainerProps,
  SearchResultClickHandler,
  RecentSearchClickHandler,
  SearchInputChangeHandler,
  SearchSubmitHandler
} from './types';
