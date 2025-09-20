import React, { memo } from 'react';
import { SearchStatusIndicatorProps, SearchStatus } from '../types';

/**
 * SearchStatusIndicator - Reusable search system status display component
 *
 * This component will be moved to @tamyla/ui-components-react package.
 * It provides a consistent UI for displaying system status across all Tamyla applications.
 *
 * Features:
 * - Visual status indicators with colored dots
 * - Flexible status configuration
 * - Optional title display
 * - Accessible status information
 * - Support for multiple services
 */
export const SearchStatusIndicator: React.FC<SearchStatusIndicatorProps> = memo(({
  statuses,
  title = "🔗 Content Search Integration",
  className = "",
  showTitle = true
}) => {
  const getStatusClass = (isConnected: boolean): string => {
    return isConnected ? 'status-dot active' : 'status-dot';
  };

  const getStatusAriaLabel = (status: SearchStatus): string => {
    const state = status.isConnected ? 'connected' : 'disconnected';
    return `${status.service} is ${state}`;
  };

  return (
    <div className={`search-status ${className}`}>
      {showTitle && <h4>{title}</h4>}

      <div className="status-indicators" role="list">
        {statuses.map((status, index) => (
          <div
            key={`${status.service}-${index}`}
            className="status-item"
            role="listitem"
            aria-label={getStatusAriaLabel(status)}
          >
            <span
              className={getStatusClass(status.isConnected)}
              aria-hidden="true"
            ></span>
            <span className="status-label">
              {status.label || `${status.service}: ${status.isConnected ? 'Connected' : 'Disconnected'}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

// Default status configurations for common use cases
export const createDefaultSearchStatuses = (): SearchStatus[] => [
  {
    service: 'search-service',
    label: 'Search Service: Connected',
    isConnected: true
  },
  {
    service: 'content-database',
    label: 'Content Database: Ready',
    isConnected: true
  },
  {
    service: 'search-application',
    label: 'Search Application: Active',
    isConnected: true
  }
];

export default SearchStatusIndicator;
