import React, { memo } from 'react';
import { RecentSearchesListProps, RecentSearch } from '../types';

/**
 * RecentSearchesList - Reusable recent searches display component
 *
 * This component will be moved to @tamyla/ui-components-react package.
 * It provides a consistent UI for displaying recent search queries across all Tamyla applications.
 *
 * Features:
 * - Support for both string and RecentSearch object arrays
 * - Configurable maximum items display
 * - Click handlers for search item and button
 * - Empty state handling
 * - Accessible keyboard navigation
 */
export const RecentSearchesList: React.FC<RecentSearchesListProps> = memo(({
  searches,
  onSearchClick,
  maxItems = 5,
  title = "🔄 Recent Searches",
  className = "",
  emptyMessage = "No recent searches"
}) => {
  // Limit searches if maxItems is specified
  const displaySearches = searches.slice(0, maxItems);

  if (searches.length === 0) {
    return (
      <div className={`recent-searches ${className}`}>
        <h3>{title}</h3>
        <div className="recent-searches-empty">
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  const handleSearchClick = (search: string | RecentSearch) => {
    const query = typeof search === 'string' ? search : search.query;
    onSearchClick(query);
  };

  const handleSearchButtonClick = (e: React.MouseEvent, search: string | RecentSearch) => {
    e.stopPropagation();
    const query = typeof search === 'string' ? search : search.query;
    onSearchClick(query);
  };

  const getSearchQuery = (search: string | RecentSearch): string => {
    return typeof search === 'string' ? search : search.query;
  };

  const getSearchMeta = (search: string | RecentSearch): string => {
    if (typeof search === 'string') return '';

    const meta: string[] = [];
    if (search.timestamp) {
      const date = new Date(search.timestamp);
      meta.push(date.toLocaleDateString());
    }
    if (search.resultsCount !== undefined) {
      meta.push(`${search.resultsCount} results`);
    }
    return meta.join(' • ');
  };

  return (
    <div className={`recent-searches ${className}`}>
      <h3>{title}</h3>
      <div className="searches-list">
        {displaySearches.map((search, index) => {
          const query = getSearchQuery(search);
          const meta = getSearchMeta(search);

          return (
            <div
              key={`${query}-${index}`}
              className="search-item"
              onClick={() => handleSearchClick(search)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSearchClick(search);
                }
              }}
            >
              <div className="search-info">
                <span className="search-query">{query}</span>
                {meta && <span className="search-meta">{meta}</span>}
              </div>
              <button
                onClick={(e) => handleSearchButtonClick(e, search)}
                aria-label={`Search again for ${query}`}
              >
                🔍 Search Again
              </button>
            </div>
          );
        })}
      </div>

      {searches.length > maxItems && (
        <div className="recent-searches-footer">
          <p className="searches-truncated">
            Showing {maxItems} of {searches.length} recent searches
          </p>
        </div>
      )}
    </div>
  );
});

export default RecentSearchesList;
