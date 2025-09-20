import React, { memo } from 'react';
import { SearchResultsListProps, SearchResult } from '../types';

/**
 * SearchResultsList - Reusable search results display component
 *
 * This component will be moved to @tamyla/ui-components-react package.
 * It provides a consistent UI for displaying search results across all Tamyla applications.
 *
 * Features:
 * - Responsive grid layout
 * - Hover effects and interactions
 * - Loading and empty states
 * - Customizable result actions
 * - Accessible keyboard navigation
 */
export const SearchResultsList: React.FC<SearchResultsListProps> = memo(({
  results,
  onResultClick,
  loading = false,
  emptyMessage = "No results found",
  className = "",
  maxResults
}) => {
  // Limit results if maxResults is specified
  const displayResults = maxResults ? results.slice(0, maxResults) : results;

  if (loading) {
    return (
      <div className={`search-results ${className}`}>
        <div className="search-results-loading">
          <div className="loading-spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`search-results ${className}`}>
        <div className="search-results-empty">
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result);
  };

  const handleResultButtonClick = (e: React.MouseEvent, result: SearchResult) => {
    e.stopPropagation();
    onResultClick(result);
  };

  const formatDate = (date: string | Date): string => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`search-results ${className}`}>
      <div className="results-header">
        <h3>Search Results ({results.length} found)</h3>
        {maxResults && results.length > maxResults && (
          <p className="results-truncated">
            Showing {maxResults} of {results.length} results
          </p>
        )}
      </div>

      <div className="results-list">
        {displayResults.map((result, index) => (
          <div
            key={result.id || index}
            className="result-item"
            onClick={() => handleResultClick(result)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleResultClick(result);
              }
            }}
          >
            <div className="result-info">
              <span className="result-name">{result.name}</span>
              <span className="result-type">{result.type}</span>
              <span className="result-date">
                {formatDate(result.date)}
              </span>
              {result.description && (
                <span className="result-description">{result.description}</span>
              )}
            </div>
            <div className="result-actions">
              <button
                onClick={(e) => handleResultButtonClick(e, result)}
                aria-label={`Access ${result.name}`}
              >
                🔗 Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SearchResultsList;
