/**
 * SearchBar Component - React wrapper for SearchBarFactory
 */
/// <reference types="react" />
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
declare const SearchBar: import("react").FC<SearchBarProps>;
export default SearchBar;
//# sourceMappingURL=SearchBarNew.d.ts.map