# Package Components for @tamyla/ui-components-react

This folder contains search-related components extracted from the trading-portal that are ready to be moved to the `@tamyla/ui-components-react` package for reuse across all Tamyla applications.

## Components Overview

### 🔍 SearchResultsList
**File**: `search/SearchResultsList.tsx`
**Purpose**: Display search results in a consistent, interactive format
**Features**:
- Responsive grid layout
- Hover effects and click handlers
- Loading and empty states
- Configurable max results
- Accessible keyboard navigation
- Support for metadata and descriptions

### 🔄 RecentSearchesList  
**File**: `search/RecentSearchesList.tsx`
**Purpose**: Display recent search queries for quick re-execution
**Features**:
- Support for string arrays or RecentSearch objects
- Configurable maximum items
- Click handlers for both item and button
- Empty state handling
- Metadata display (timestamp, result count)

### 🔗 SearchStatusIndicator
**File**: `search/SearchStatusIndicator.tsx`
**Purpose**: Show system status for search services
**Features**:
- Visual status indicators with colored dots
- Multiple service status support
- Configurable titles and labels
- Accessible status information
- Default status configuration helper

## File Structure
```
src/package-components/
├── index.ts                          # Main exports
├── types/
│   └── index.ts                      # TypeScript interfaces
├── search/
│   ├── SearchResultsList.tsx         # Search results component
│   ├── RecentSearchesList.tsx        # Recent searches component
│   └── SearchStatusIndicator.tsx     # Status indicator component
└── styles/
    └── search-components.css         # Component styles
```

## Migration to Package

### Step 1: Copy to Package
1. Copy all files to `@tamyla/ui-components-react/src/components/search/`
2. Update import paths to use package structure
3. Integrate CSS with package build system

### Step 2: Package Integration
```typescript
// In @tamyla/ui-components-react/src/index.ts
export { 
  SearchResultsList,
  RecentSearchesList, 
  SearchStatusIndicator,
  createDefaultSearchStatuses 
} from './components/search';

export type {
  SearchResult,
  RecentSearch,
  SearchStatus,
  SearchResultsListProps,
  RecentSearchesListProps,
  SearchStatusIndicatorProps
} from './components/search';
```

### Step 3: Update Package Documentation
Add to package README.md:
```markdown
### Search Components

#### SearchResultsList
Display search results with consistent formatting.

#### RecentSearchesList  
Show recent searches for quick access.

#### SearchStatusIndicator
Display system status for search services.
```

## Usage Examples

### Basic Usage
```tsx
import { 
  SearchResultsList, 
  RecentSearchesList, 
  SearchStatusIndicator 
} from '@tamyla/ui-components-react';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  
  return (
    <div>
      <SearchResultsList 
        results={results}
        onResultClick={handleResultClick}
      />
      <RecentSearchesList
        searches={recentSearches}
        onSearchClick={handleRecentSearch}
      />
      <SearchStatusIndicator
        statuses={createDefaultSearchStatuses()}
      />
    </div>
  );
};
```

### Advanced Configuration
```tsx
<SearchResultsList 
  results={results}
  onResultClick={handleResultClick}
  maxResults={10}
  emptyMessage="No trading strategies found"
  className="trading-results"
/>

<RecentSearchesList
  searches={recentSearches}
  onSearchClick={handleRecentSearch}
  maxItems={3}
  title="📈 Recent Trading Searches"
  emptyMessage="No recent trading searches"
/>

<SearchStatusIndicator
  statuses={[
    { service: 'trading-api', label: 'Trading API: Online', isConnected: true },
    { service: 'market-data', label: 'Market Data: Live', isConnected: true }
  ]}
  title="🔌 Trading Services Status"
/>
```

## Benefits of Package Migration

1. **Reusability**: Same components across all Tamyla apps
2. **Consistency**: Unified search experience
3. **Maintainability**: Central updates benefit all apps
4. **Performance**: Shared bundle optimization
5. **Testing**: Isolated component testing
6. **Documentation**: Package-level documentation

## Breaking Changes for trading-portal

After migration, update ContentAccess.jsx imports:
```tsx
// Before
import { local components }

// After  
import { 
  SearchResultsList,
  RecentSearchesList,
  SearchStatusIndicator 
} from '@tamyla/ui-components-react';
```
