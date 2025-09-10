/**
 * UI Slice - Interface state management
 * Enhanced from Trading Portal with additional component states
 */



import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIComponentState, SearchResult, FilterValue } from '../../types/common';

// Notification interface
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  autoClose?: boolean;
  duration?: number;
}

// Modal interface
export interface Modal {
  isOpen: boolean;
  data?: unknown;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// UI state interface
export interface UIState {
  // Layout and Navigation
  sidebar: {
    isOpen: boolean;
    isMobile: boolean;
    activeSection: string;
    pinnedItems: string[];
  };

  // Modal management
  modals: {
    [key: string]: Modal;
  };

  // Loading states
  loading: {
    global: boolean;
    components: { [key: string]: boolean };
  };

  // Notifications
  notifications: Notification[];

  // Search state
  search: {
    query: string;
    filters: { [key: string]: FilterValue };
    results: SearchResult[];
    isSearching: boolean;
  };

  // Viewport information
  viewport: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };

  // Component states
  componentStates: {
    [componentId: string]: UIComponentState;
  };
}

// Initial UI state
const initialState: UIState = {
  sidebar: {
    isOpen: true,
    isMobile: false,
    activeSection: 'dashboard',
    pinnedItems: ['dashboard']
  },

  modals: {},

  loading: {
    global: false,
    components: {}
  },

  notifications: [],

  search: {
    query: '',
    filters: {},
    results: [],
    isSearching: false
  },

  viewport: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isMobile: false,
    isTablet: false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true // Default to desktop for SSR
  },

  componentStates: {}
};

// UI slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar management
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload;
    },

    setActiveSection: (state, action: PayloadAction<string>) => {
      state.sidebar.activeSection = action.payload;
    },

    pinSidebarItem: (state, action: PayloadAction<string>) => {
      if (!state.sidebar.pinnedItems.includes(action.payload)) {
        state.sidebar.pinnedItems.push(action.payload);
      }
    },

    unpinSidebarItem: (state, action: PayloadAction<string>) => {
      state.sidebar.pinnedItems = state.sidebar.pinnedItems.filter(
        item => item !== action.payload
      );
    },

    // Modal management
    openModal: (state, action: PayloadAction<{
      id: string;
      data?: unknown;
      size?: Modal['size'];
    }>) => {
      state.modals[action.payload.id] = {
        isOpen: true,
        data: action.payload.data,
        size: action.payload.size || 'md'
      };
    },

    closeModal: (state, action: PayloadAction<string>) => {
      if (state.modals[action.payload]) {
        state.modals[action.payload].isOpen = false;
      }
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(id => {
        state.modals[id].isOpen = false;
      });
    },

    // Loading states
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },

    setComponentLoading: (state, action: PayloadAction<{
      component: string;
      loading: boolean;
    }>) => {
      state.loading.components[action.payload.component] = action.payload.loading;
    },

    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        autoClose: true,
        duration: 5000,
        ...action.payload
      };

      state.notifications.unshift(notification);

      // Keep only last 10 notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10);
      }
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Search management
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },

    setSearchFilter: (state, action: PayloadAction<{ key: string; value: FilterValue }>) => {
      state.search.filters[action.payload.key] = action.payload.value;
    },

    clearSearchFilters: (state) => {
      state.search.filters = {};
    },

    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.search.results = action.payload;
    },

    setSearching: (state, action: PayloadAction<boolean>) => {
      state.search.isSearching = action.payload;
    },

    // Viewport management
    updateViewport: (state, action: PayloadAction<{
      width: number;
      height: number;
    }>) => {
      state.viewport.width = action.payload.width;
      state.viewport.height = action.payload.height;
      state.viewport.isMobile = action.payload.width <= 768;
      state.viewport.isTablet = action.payload.width > 768 && action.payload.width <= 1024;
      state.viewport.isDesktop = action.payload.width > 1024;

      // Auto-close sidebar on mobile
      if (state.viewport.isMobile && state.sidebar.isOpen) {
        state.sidebar.isOpen = false;
      }

      state.sidebar.isMobile = state.viewport.isMobile;
    },

    // Component state management
    setComponentState: (state, action: PayloadAction<{
      componentId: string;
      updates: Partial<UIState['componentStates'][string]>;
    }>) => {
      const { componentId, updates } = action.payload;

      if (!state.componentStates[componentId]) {
        state.componentStates[componentId] = {
          isVisible: true,
          isExpanded: false,
          data: null
        };
      }

      state.componentStates[componentId] = {
        ...state.componentStates[componentId],
        ...updates
      };
    },

    removeComponentState: (state, action: PayloadAction<string>) => {
      delete state.componentStates[action.payload];
    }
  }
});

// Export actions
export const uiActions = uiSlice.actions;

// Export default reducer
export default uiSlice.reducer;
