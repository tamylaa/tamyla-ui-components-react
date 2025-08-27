/**
 * UI Slice - Interface state management
 * Enhanced from Trading Portal with additional component states
 */
import { PayloadAction } from '@reduxjs/toolkit';
export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
    autoClose?: boolean;
    duration?: number;
}
export interface Modal {
    isOpen: boolean;
    data?: any;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
export interface UIState {
    sidebar: {
        isOpen: boolean;
        isMobile: boolean;
        activeSection: string;
        pinnedItems: string[];
    };
    modals: {
        [key: string]: Modal;
    };
    loading: {
        global: boolean;
        components: {
            [key: string]: boolean;
        };
    };
    notifications: Notification[];
    search: {
        query: string;
        filters: {
            [key: string]: any;
        };
        results: any[];
        isSearching: boolean;
    };
    viewport: {
        width: number;
        height: number;
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
    };
    componentStates: {
        [componentId: string]: {
            isVisible: boolean;
            isExpanded: boolean;
            data: any;
        };
    };
}
export declare const uiSlice: import("@reduxjs/toolkit").Slice<UIState, {
    toggleSidebar: (state: import("immer").WritableDraft<UIState>) => void;
    setSidebarOpen: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<boolean>) => void;
    setActiveSection: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    pinSidebarItem: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    unpinSidebarItem: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    openModal: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        id: string;
        data?: any;
        size?: Modal['size'];
    }>) => void;
    closeModal: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    closeAllModals: (state: import("immer").WritableDraft<UIState>) => void;
    setGlobalLoading: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<boolean>) => void;
    setComponentLoading: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        component: string;
        loading: boolean;
    }>) => void;
    addNotification: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => void;
    removeNotification: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    clearNotifications: (state: import("immer").WritableDraft<UIState>) => void;
    setSearchQuery: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    setSearchFilter: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        key: string;
        value: any;
    }>) => void;
    clearSearchFilters: (state: import("immer").WritableDraft<UIState>) => void;
    setSearchResults: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<any[]>) => void;
    setSearching: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<boolean>) => void;
    updateViewport: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        width: number;
        height: number;
    }>) => void;
    setComponentState: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        componentId: string;
        updates: Partial<UIState['componentStates'][string]>;
    }>) => void;
    removeComponentState: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
}, "ui", "ui", import("@reduxjs/toolkit").SliceSelectors<UIState>>;
export declare const uiActions: import("@reduxjs/toolkit").CaseReducerActions<{
    toggleSidebar: (state: import("immer").WritableDraft<UIState>) => void;
    setSidebarOpen: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<boolean>) => void;
    setActiveSection: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    pinSidebarItem: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    unpinSidebarItem: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    openModal: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        id: string;
        data?: any;
        size?: Modal['size'];
    }>) => void;
    closeModal: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    closeAllModals: (state: import("immer").WritableDraft<UIState>) => void;
    setGlobalLoading: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<boolean>) => void;
    setComponentLoading: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        component: string;
        loading: boolean;
    }>) => void;
    addNotification: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => void;
    removeNotification: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    clearNotifications: (state: import("immer").WritableDraft<UIState>) => void;
    setSearchQuery: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
    setSearchFilter: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        key: string;
        value: any;
    }>) => void;
    clearSearchFilters: (state: import("immer").WritableDraft<UIState>) => void;
    setSearchResults: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<any[]>) => void;
    setSearching: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<boolean>) => void;
    updateViewport: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        width: number;
        height: number;
    }>) => void;
    setComponentState: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<{
        componentId: string;
        updates: Partial<UIState['componentStates'][string]>;
    }>) => void;
    removeComponentState: (state: import("immer").WritableDraft<UIState>, action: PayloadAction<string>) => void;
}, "ui">;
declare const _default: import("redux").Reducer<UIState>;
export default _default;
//# sourceMappingURL=uiSlice.d.ts.map