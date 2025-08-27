/**
 * Typed Redux Hooks - Enhanced from Trading Portal
 * Type-safe state access with performance optimizations
 */
/// <reference types="redux-persist/types/persistReducer" />
import { TypedUseSelectorHook } from 'react-redux';
import { store } from './store';
import { type User } from './slices/authSlice';
type RootState = ReturnType<typeof store.getState>;
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    auth: import("./slices/authSlice").AuthState;
    ui: import("./slices/uiSlice").UIState;
    theme: import("./slices/themeSlice").ThemeState;
    components: import("./slices/componentSlice").ComponentState;
} & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export declare const useAuth: () => {
    login: (credentials: {
        email: string;
        password: string;
    }) => Promise<void>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    sessionExpiry: string | null;
};
export declare const useUI: () => {
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    showNotification: (notification: {
        type: 'success' | 'error' | 'warning' | 'info';
        title: string;
        message: string;
        autoClose?: boolean;
        duration?: number;
    }) => void;
    openModal: (modalId: string, data?: any, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') => void;
    closeModal: (modalId: string) => void;
    sidebar: {
        isOpen: boolean;
        isMobile: boolean;
        activeSection: string;
        pinnedItems: string[];
    };
    modals: {
        [key: string]: import("./slices/uiSlice").Modal;
    };
    loading: {
        global: boolean;
        components: {
            [key: string]: boolean;
        };
    };
    notifications: import("./slices/uiSlice").Notification[];
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
};
export declare const useTheme: () => {
    setMode: (mode: 'light' | 'dark' | 'auto') => void;
    setPrimaryColor: (color: string) => void;
    toggleAnimations: () => void;
    mode: "auto" | "dark" | "light";
    currentTheme: "dark" | "light";
    primaryColor: string;
    fontSize: "sm" | "md" | "lg";
    animations: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
    customColors: {
        [key: string]: string;
    };
};
export declare const useComponent: (componentId: string, componentName?: string) => {
    component: import("./slices/componentSlice").ComponentConfig;
    updateProps: (props: Record<string, any>) => void;
    updateState: (stateUpdates: Record<string, any>) => void;
    setVisibility: (isVisible: boolean) => void;
    setDisabled: (isDisabled: boolean) => void;
};
export declare const useResponsive: () => {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};
export declare const useSearch: () => {
    setQuery: (query: string) => void;
    setFilter: (key: string, value: any) => void;
    clearFilters: () => void;
    setResults: (results: any[]) => void;
    setSearching: (isSearching: boolean) => void;
    query: string;
    filters: {
        [key: string]: any;
    };
    results: any[];
    isSearching: boolean;
};
export declare const useLoading: () => {
    setGlobalLoading: (isLoading: boolean) => void;
    setComponentLoading: (component: string, isLoading: boolean) => void;
    global: boolean;
    components: {
        [key: string]: boolean;
    };
};
export declare const useNotifications: () => {
    notifications: import("./slices/uiSlice").Notification[];
    addNotification: (notification: {
        type: 'success' | 'error' | 'warning' | 'info';
        title: string;
        message: string;
        autoClose?: boolean;
        duration?: number;
    }) => void;
    removeNotification: (id: string) => void;
    clearAll: () => void;
    success: (title: string, message: string) => void;
    error: (title: string, message: string) => void;
    warning: (title: string, message: string) => void;
    info: (title: string, message: string) => void;
};
export {};
//# sourceMappingURL=hooks.d.ts.map