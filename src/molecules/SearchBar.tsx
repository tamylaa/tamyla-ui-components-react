/**
 * SearchBar Molecule - Enhanced search with Factory Bridge integration
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FactoryBridge, createFactoryComponent } from '../core/factory-bridge';
import { useAppDispatch } from '../store/hooks';
import { uiActions } from '../store/store';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: any) => void;
  voiceEnabled?: boolean;
  clearable?: boolean;
  showSuggestions?: boolean;
  onTmylSearch?: (event: any) => void;
  onTmylSearchSuggestion?: (event: any) => void;
  className?: string;
}

// Create factory component for SearchBar
const FactorySearchBar = createFactoryComponent<SearchBarProps>(
  'SearchBar',
  'SearchBar'
);

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onSuggestionSelect,
  voiceEnabled = true,
  className
}) => {
  const dispatch = useAppDispatch();

  const handleSearch = useCallback((event: any) => {
    const query = event.detail?.query || event.target?.value;
    if (query) {
      onSearch?.(query);
      dispatch(uiActions.setSearchQuery(query));
    }
  }, [onSearch, dispatch]);

  const handleSuggestionSelect = useCallback((event: any) => {
    onSuggestionSelect?.(event.detail);
  }, [onSuggestionSelect]);

  return (
    <SearchContainer className={className}>
      <FactorySearchBar
        placeholder={placeholder}
        voiceEnabled={voiceEnabled}
        clearable={true}
        showSuggestions={true}
        onTmylSearch={handleSearch}
        onTmylSearchSuggestion={handleSuggestionSelect}
      />
    </SearchContainer>
  );
};

export default SearchBar;
