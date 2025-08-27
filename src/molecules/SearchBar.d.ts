/**
 * SearchBar Molecule - Enhanced search with Factory Bridge integration
 */
import React from 'react';
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
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
//# sourceMappingURL=SearchBar.d.ts.map