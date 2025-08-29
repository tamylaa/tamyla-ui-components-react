/**
 * SearchBar Component - React wrapper for SearchBarFactory
 */

import { createFactoryComponent } from '../../core/factory/factory-bridge';

interface SearchBarProps {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  voiceEnabled?: boolean;
  clearable?: boolean;
  showSubmitButton?: boolean;
  suggestions?: string[];
  showSuggestions?: boolean;
  maxSuggestions?: number;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchBar = createFactoryComponent<SearchBarProps>(
  'SearchBar',
  'SearchBarFactory'
);

export default SearchBar;
