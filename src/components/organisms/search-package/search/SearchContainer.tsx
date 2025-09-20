import React, { useState, useCallback, memo } from 'react';
import { SearchContainerProps } from '../types';
import { SearchInput } from './SearchInput';
import { SearchResultsList } from './SearchResultsList';
import { RecentSearchesList } from './RecentSearchesList';
import { SearchStatusIndicator } from './SearchStatusIndicator';

/**
 * SearchContainer - Complete search interface component
 *
 * This component provides a full search experience by orchestrating
 * SearchInput, SearchResultsList, RecentSearchesList, and SearchStatusIndicator.
 *
 * Features:
 * - Integrated search input with debouncing
 * - Results display with loading states
 * - Recent searches management
 * - Status indicators
 * - Flexible layout options
 * - Accessible and responsive
 */
export const SearchContainer: React.FC<SearchContainerProps> = memo(({
  // Search input props
  initialQuery = '',
  placeholder = 'Search...',
  debounceMs = 300,
  autoFocus = false,

  // Results props
  results = [],
  maxResults,
  loading = false,
  emptyMessage = 'No results found',

  // Recent searches props
  recentSearches = [],
  maxRecentItems = 5,
  showRecentSearches = true,

  // Status props
  statuses = [],
  showStatusIndicator = true,

  // Layout props
  layout = 'vertical',
  className = '',

  // Event handlers
  onSearch,
  onResultClick,
  onRecentSearchClick
}) => {
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search input changes
  const handleInputChange = useCallback((value: string) => {
    setCurrentQuery(value);
  }, []);

  // Handle search submission
  const handleSearch = useCallback((query: string) => {
    setCurrentQuery(query);
    setHasSearched(true);
    onSearch?.(query);
  }, [onSearch]);

  // Handle result clicks
  const handleResultClick = useCallback((result: any) => {
    onResultClick?.(result);
  }, [onResultClick]);

  // Handle recent search clicks
  const handleRecentSearchClick = useCallback((search: string) => {
    setCurrentQuery(search);
    setHasSearched(true);
    onRecentSearchClick?.(search);
    onSearch?.(search);
  }, [onRecentSearchClick, onSearch]);

  const containerClasses = `search-container ${layout} ${className}`.trim();

  return (
    <div className={containerClasses}>
      {/* Search Input Section */}
      <div className="search-input-section">
        <SearchInput
          value={currentQuery}
          onChange={handleInputChange}
          onSearch={handleSearch}
          placeholder={placeholder}
          debounceMs={debounceMs}
          loading={loading}
          autoFocus={autoFocus}
        />
      </div>

      {/* Main Content Area */}
      <div className="search-content">
        {layout === 'horizontal' ? (
          <div className="search-content-horizontal">
            {/* Results Section */}
            <div className="search-results-section">
              <SearchResultsList
                results={results}
                onResultClick={handleResultClick}
                loading={loading && hasSearched}
                emptyMessage={hasSearched ? emptyMessage : ''}
                maxResults={maxResults}
              />
            </div>

            {/* Sidebar */}
            <div className="search-sidebar">
              {showRecentSearches && recentSearches.length > 0 && (
                <RecentSearchesList
                  searches={recentSearches}
                  onSearchClick={handleRecentSearchClick}
                  maxItems={maxRecentItems}
                  title="Recent Searches"
                />
              )}

              {showStatusIndicator && statuses.length > 0 && (
                <SearchStatusIndicator
                  statuses={statuses}
                  title="Search Services"
                  showTitle={true}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="search-content-vertical">
            {/* Results Section */}
            <SearchResultsList
              results={results}
              onResultClick={handleResultClick}
              loading={loading && hasSearched}
              emptyMessage={hasSearched ? emptyMessage : ''}
              maxResults={maxResults}
            />

            {/* Bottom Section */}
            <div className="search-bottom-section">
              {showRecentSearches && recentSearches.length > 0 && (
                <RecentSearchesList
                  searches={recentSearches}
                  onSearchClick={handleRecentSearchClick}
                  maxItems={maxRecentItems}
                  title="Recent Searches"
                />
              )}

              {showStatusIndicator && statuses.length > 0 && (
                <SearchStatusIndicator
                  statuses={statuses}
                  title="Search Services"
                  showTitle={true}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default SearchContainer;
