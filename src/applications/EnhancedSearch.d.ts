/**
 * Enhanced Search Application - React wrapper for ui-components EnhancedSearchApplicationFactory
 */
/// <reference types="react" />
interface EnhancedSearchProps {
    apiEndpoint?: string;
    placeholder?: string;
    filters?: Array<{
        name: string;
        label: string;
        type: 'select' | 'checkbox' | 'date' | 'range';
        options?: Array<{
            value: string;
            label: string;
        }>;
    }>;
    resultsPerPage?: number;
    enableAdvancedSearch?: boolean;
    enableSorting?: boolean;
    enableExport?: boolean;
    onSearch?: (query: string, filters: any) => void;
    onResultSelect?: (result: any) => void;
    onFilterChange?: (filters: any) => void;
}
export declare const EnhancedSearch: import("react").FC<EnhancedSearchProps>;
export default EnhancedSearch;
//# sourceMappingURL=EnhancedSearch.d.ts.map