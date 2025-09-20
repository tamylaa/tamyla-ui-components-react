import React, { useState, useEffect, useCallback, memo } from 'react';
import { SearchInputProps } from '../types';

/**
 * SearchInput - Enhanced search input component
 *
 * This component provides a complete search input experience with debouncing,
 * loading states, and accessibility features.
 *
 * Features:
 * - Debounced search with configurable delay
 * - Loading state with spinner
 * - Clear button functionality
 * - Keyboard navigation support
 * - Accessible ARIA labels and roles
 * - Auto-focus capability
 */
export const SearchInput: React.FC<SearchInputProps> = memo(({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  loading = false,
  disabled = false,
  showClearButton = true,
  autoFocus = false,
  className = '',
  inputClassName = '',
  size = 'default',
  variant = 'default'
}) => {
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Handle input changes with debouncing
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new debounced search
    const timer = setTimeout(() => {
      onChange?.(newValue);
      if (newValue.trim()) {
        onSearch?.(newValue);
      }
    }, debounceMs);

    setDebounceTimer(timer);
  }, [onChange, onSearch, debounceMs, debounceTimer]);

  // Handle immediate search (Enter key)
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim()) {
        // Clear debounce timer for immediate search
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        onSearch?.(value);
      }
    }
  }, [value, onSearch, debounceTimer]);

  // Handle clear button
  const handleClear = useCallback(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    onChange?.('');
  }, [onChange, debounceTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const containerClasses = `search-input-container ${size} ${variant} ${className}`.trim();
  const inputClasses = `search-input ${inputClassName}`.trim();

  return (
    <div className={containerClasses}>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={inputClasses}
          role="searchbox"
          aria-label="Search input"
          aria-describedby={loading ? "search-loading" : undefined}
        />

        {loading && (
          <div className="search-loading-indicator" id="search-loading">
            <div className="loading-spinner-small"></div>
          </div>
        )}

        {showClearButton && value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear-button"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {!loading && value && (
          <button
            type="button"
            onClick={() => onSearch?.(value)}
            className="search-submit-button"
            aria-label="Submit search"
          >
            🔍
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchInput;
