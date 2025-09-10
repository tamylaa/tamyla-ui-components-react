/**
 * Seaconst SearchContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: ${responsiveSizes.sm}px) {
    max-width: ${600}px;
  }
`;lecule - Enhanced search with Factory Bridge integration
 */

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { createFactoryComponent } from '../../core/factory/factory-bridge';
import { useAppDispatch } from '../../store/hooks';
import { uiActions } from '../../store/store';
import { responsiveSizes } from '../../utils/responsive-utils';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 640px) {
    max-width: ${600}px;
  }
`;

interface SearchSuggestion {
  id: string;
  text: string;
  category?: string;
}

interface SearchEvent {
  detail?: {
    query?: string;
  };
  target?: {
    value?: string;
  };
}

interface SuggestionEvent {
  detail?: SearchSuggestion;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  voiceEnabled?: boolean;
  clearable?: boolean;
  showSuggestions?: boolean;
  onTmylSearch?: (event: SearchEvent) => void;
  onTmylSearchSuggestion?: (event: SuggestionEvent) => void;
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

  const handleSearch = useCallback((event: SearchEvent) => {
    const query = event.detail?.query || event.target?.value;
    if (query) {
      onSearch?.(query);
      dispatch(uiActions.setSearchQuery(query));
    }
  }, [onSearch, dispatch]);

  const handleSuggestionSelect = useCallback((event: SuggestionEvent) => {
    if (event.detail) {
      onSuggestionSelect?.(event.detail);
    }
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
        componentType="InputFactory"
      />
    </SearchContainer>
  );
};

export default SearchBar;
