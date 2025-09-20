import { useState, useCallback, useEffect } from 'react';
import { SearchResult, RecentSearch, SearchStatus } from '../types';

// Declare localStorage for ESLint
declare const localStorage: {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

export interface UseSearchStateOptions {
  initialQuery?: string;
  debounceMs?: number;
  maxRecentSearches?: number;
  persistRecentSearches?: boolean;
  storageKey?: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  recentSearches: RecentSearch[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}

/**
 * useSearchState - Custom hook for managing search state
 *
 * Provides centralized state management for search functionality including:
 * - Query management with debouncing
 * - Results handling
 * - Recent searches with persistence
 * - Loading and error states
 */
export function useSearchState(options: UseSearchStateOptions = {}) {
  const {
    initialQuery = '',
    debounceMs = 300,
    maxRecentSearches = 10,
    persistRecentSearches = false,
    storageKey = 'tamyla-recent-searches'
  } = options;

  // Core search state
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Recent searches state
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    if (persistRecentSearches && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Persist recent searches
  useEffect(() => {
    if (persistRecentSearches && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(recentSearches));
      } catch {
        // Ignore storage errors
      }
    }
  }, [recentSearches, persistRecentSearches, storageKey]);

  // Debounced search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // This would typically call an API
      // For now, we'll simulate a search
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock results - in real usage, this would come from an API
      const mockResults: SearchResult[] = [
        {
          id: '1',
          name: `Result for "${searchQuery}"`,
          type: 'document',
          date: new Date(),
          description: `This is a sample result for your search query: ${searchQuery}`
        }
      ];

      setResults(mockResults);

      // Add to recent searches
      const newRecentSearch: RecentSearch = {
        query: searchQuery,
        timestamp: new Date(),
        resultsCount: mockResults.length
      };

      setRecentSearches(prev => {
        const filtered = prev.filter(item => item.query !== searchQuery);
        const updated = [newRecentSearch, ...filtered].slice(0, maxRecentSearches);
        return updated;
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [maxRecentSearches]);

  // Handle query changes
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setError(null);
  }, []);

  // Execute search
  const executeSearch = useCallback((searchQuery?: string) => {
    const queryToSearch = searchQuery ?? query;
    performSearch(queryToSearch);
  }, [query, performSearch]);

  // Clear results
  const clearResults = useCallback(() => {
    setResults([]);
    setHasSearched(false);
    setError(null);
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  // Remove specific recent search
  const removeRecentSearch = useCallback((queryToRemove: string) => {
    setRecentSearches(prev => prev.filter(item => item.query !== queryToRemove));
  }, []);

  return {
    // State
    query,
    results,
    recentSearches,
    loading,
    error,
    hasSearched,

    // Actions
    updateQuery,
    executeSearch,
    clearResults,
    clearRecentSearches,
    removeRecentSearch,

    // Computed state
    hasResults: results.length > 0,
    isEmpty: hasSearched && results.length === 0 && !loading,
    canSearch: query.trim().length > 0
  };
}

export default useSearchState;
