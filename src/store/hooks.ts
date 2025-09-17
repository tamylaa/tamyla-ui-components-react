/**
 * Typed Redux Hooks - Enhanced from Trading Portal
 * Type-safe state access with performance optimizations
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { store } from './store';
import { authActions, type User } from './slices/authSlice';
import { uiActions } from './slices/uiSlice';
import { 
  safeSetTimeout, 
  safeClearTimeout, 
  safeWindowAddEventListener, 
  safeWindowRemoveEventListener,
  isBrowser 
} from '../utils/ssr-safe';
import { Logger } from '../utils/logger';
import { safeFetch } from '../utils/async-safety';
import type { ComponentProps, ComponentState, FilterValue, SearchResult } from '../types/common';

// Initialize logger instance
const logger = new Logger({ enableConsole: true });

// Local type definitions (not exported due to Rollup build issues)
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
import { themeActions } from './slices/themeSlice';
import { componentActions } from './slices/componentSlice';

// Typed hooks for Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Enhanced Auth Hook
export const useAuth = () => {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    dispatch(authActions.loginStart());

    try {
      // 🔒 SECURITY FIX: Use safe fetch with timeout and proper error handling
      const response = await safeFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        timeout: 15000, // 15 second timeout
        retries: 1,
        onTimeout: () => {
          dispatch(authActions.loginFailure('Login request timed out'));
        },
        onError: (error) => {
          logger.error('Login network error:', error, 'useAuth');
        }
      });

      if (response && response.ok) {
        try {
          const data = await response.json();
          dispatch(authActions.loginSuccess({
            user: data.user,
            token: data.token,
            expiresAt: data.expiresAt
          }));
        } catch (_parseError) {
          throw new Error('Invalid response format from server');
        }
      } else if (response) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Login failed: ${response.status} ${errorText}`);
      } else {
        throw new Error('Login request failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(authActions.loginFailure(errorMessage));
      logger.error('Login error:', error, 'useAuth');
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  const updateProfile = useCallback((updates: Partial<User>) => {
    if (auth.user) {
      dispatch(authActions.updateUser(updates));
    }
  }, [dispatch, auth.user]);

  return {
    ...auth,
    login,
    logout,
    updateProfile
  };
};

// Enhanced UI Hook
export const useUI = () => {
  const ui = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  const toggleSidebar = useCallback(() => {
    dispatch(uiActions.toggleSidebar());
  }, [dispatch]);

  const setSidebarOpen = useCallback((isOpen: boolean) => {
    dispatch(uiActions.setSidebarOpen(isOpen));
  }, [dispatch]);

  const showNotification = useCallback((notification: {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
  }) => {
    dispatch(uiActions.addNotification(notification));
  }, [dispatch]);

  const openModal = useCallback((modalId: string, data?: unknown, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    dispatch(uiActions.openModal({ id: modalId, data, size }));
  }, [dispatch]);

  const closeModal = useCallback((modalId: string) => {
    dispatch(uiActions.closeModal(modalId));
  }, [dispatch]);

  return {
    ...ui,
    toggleSidebar,
    setSidebarOpen,
    showNotification,
    openModal,
    closeModal
  };
};

// Enhanced Theme Hook
export const useTheme = () => {
  const theme = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const setMode = useCallback((mode: 'light' | 'dark' | 'auto') => {
    dispatch(themeActions.setThemeMode(mode));
  }, [dispatch]);

  const setPrimaryColor = useCallback((color: string) => {
    dispatch(themeActions.setPrimaryColor(color));
  }, [dispatch]);

  const toggleAnimations = useCallback(() => {
    dispatch(themeActions.toggleAnimations());
  }, [dispatch]);

  // Auto-detect system preferences with improved cleanup
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR guard

    if (theme.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        dispatch(themeActions.setThemeMode(e.matches ? 'dark' : 'light'));
      };

      // Modern API with fallback
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent); // Initial check

        return () => {
          try {
            mediaQuery.removeEventListener('change', handleChange);
          } catch (error) {
            logger.error('Failed to remove media query listener:', error, 'useTheme');
          }
        };
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

        return () => {
          try {
            mediaQuery.removeListener(handleChange);
          } catch (error) {
            logger.error('Failed to remove media query listener (fallback):', error, 'useTheme');
          }
        };
      }
    }
  }, [theme.mode, dispatch]); // Fixed: include dispatch in dependencies

  // Auto-detect reduced motion preference with improved cleanup
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR guard

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(themeActions.setReducedMotion(e.matches));
    };

    // Modern API with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent); // Initial check

      return () => {
        try {
          mediaQuery.removeEventListener('change', handleChange);
        } catch (error) {
          logger.error('Failed to remove reduced motion listener:', error, 'useTheme');
        }
      };
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);

      return () => {
        try {
          mediaQuery.removeListener(handleChange);
        } catch (error) {
          logger.error('Failed to remove reduced motion listener (fallback):', error, 'useTheme');
        }
      };
    }
  }, [dispatch]);

  return {
    ...theme,
    setMode,
    setPrimaryColor,
    toggleAnimations
  };
};

// Component Management Hook
export const useComponent = (componentId: string, componentName?: string) => {
  const components = useAppSelector(state => state.components);
  const dispatch = useAppDispatch();

  const component = components.components[componentId];

  // Auto-register component if it doesn't exist and componentName is provided
  useEffect(() => {
    if (!component && componentName) {
      dispatch(componentActions.registerComponent({
        id: componentId,
        name: componentName
      }));
    }
  }, [component, componentId, componentName, dispatch]);

  const updateProps = useCallback((props: ComponentProps) => {
    dispatch(componentActions.updateComponentProps({
      componentId,
      props
    }));
  }, [componentId, dispatch]);

  const updateState = useCallback((stateUpdates: ComponentState) => {
    dispatch(componentActions.updateComponentState({
      componentId,
      stateUpdates
    }));
  }, [componentId, dispatch]);

  const setVisibility = useCallback((isVisible: boolean) => {
    dispatch(componentActions.setComponentVisibility({
      componentId,
      isVisible
    }));
  }, [componentId, dispatch]);

  const setDisabled = useCallback((isDisabled: boolean) => {
    dispatch(componentActions.setComponentDisabled({
      componentId,
      isDisabled
    }));
  }, [componentId, dispatch]);

  return {
    component,
    updateProps,
    updateState,
    setVisibility,
    setDisabled
  };
};

// Responsive Hook with improved memory management (SSR-safe)
export const useResponsive = () => {
  const viewport = useAppSelector(state => state.ui.viewport);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isBrowser()) return; // SSR guard

    let timeoutId: number | undefined = undefined;

    // Debounced resize handler to prevent excessive updates
    const handleResize = () => {
      if (timeoutId !== undefined) {
        safeClearTimeout(timeoutId);
      }

      timeoutId = safeSetTimeout(() => {
        try {
          dispatch(uiActions.updateViewport({
            width: window.innerWidth,
            height: window.innerHeight
          }));
        } catch (error) {
          logger.error('Viewport update failed:', error, 'useViewport');
        }
        timeoutId = undefined;
      }, 16); // ~60fps throttling
    };

    // Initial check
    handleResize();

    safeWindowAddEventListener('resize', handleResize, { passive: true });

    return () => {
      try {
        if (timeoutId !== undefined) {
          safeClearTimeout(timeoutId);
        }
        safeWindowRemoveEventListener('resize', handleResize);
      } catch (error) {
        logger.error('Failed to cleanup resize listener:', error, 'useViewport');
      }
    };
  }, [dispatch]);

  return viewport;
};

// Search Hook
export const useSearch = () => {
  const search = useAppSelector(state => state.ui.search);
  const dispatch = useAppDispatch();

  const setQuery = useCallback((query: string) => {
    dispatch(uiActions.setSearchQuery(query));
  }, [dispatch]);

  const setFilter = useCallback((key: string, value: FilterValue) => {
    dispatch(uiActions.setSearchFilter({ key, value }));
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch(uiActions.clearSearchFilters());
  }, [dispatch]);

  const setResults = useCallback((results: SearchResult[]) => {
    dispatch(uiActions.setSearchResults(results));
  }, [dispatch]);

  const setSearching = useCallback((isSearching: boolean) => {
    dispatch(uiActions.setSearching(isSearching));
  }, [dispatch]);

  return {
    ...search,
    setQuery,
    setFilter,
    clearFilters,
    setResults,
    setSearching
  };
};

// Loading Hook
export const useLoading = () => {
  const loading = useAppSelector(state => state.ui.loading);
  const dispatch = useAppDispatch();

  const setGlobalLoading = useCallback((isLoading: boolean) => {
    dispatch(uiActions.setGlobalLoading(isLoading));
  }, [dispatch]);

  const setComponentLoading = useCallback((component: string, isLoading: boolean) => {
    dispatch(uiActions.setComponentLoading({ component, loading: isLoading }));
  }, [dispatch]);

  return {
    ...loading,
    setGlobalLoading,
    setComponentLoading
  };
};

// Notifications Hook
export const useNotifications = () => {
  const notifications = useAppSelector(state => state.ui.notifications);
  const dispatch = useAppDispatch();

  const addNotification = useCallback((notification: {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
  }) => {
    dispatch(uiActions.addNotification(notification));
  }, [dispatch]);

  const removeNotification = useCallback((id: string) => {
    dispatch(uiActions.removeNotification(id));
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(uiActions.clearNotifications());
  }, [dispatch]);

  // Convenience methods
  const success = useCallback((title: string, message: string) => {
    addNotification({ type: 'success', title, message });
  }, [addNotification]);

  const error = useCallback((title: string, message: string) => {
    addNotification({ type: 'error', title, message });
  }, [addNotification]);

  const warning = useCallback((title: string, message: string) => {
    addNotification({ type: 'warning', title, message });
  }, [addNotification]);

  const info = useCallback((title: string, message: string) => {
    addNotification({ type: 'info', title, message });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
};
