/**
 * Typed Redux Hooks - Enhanced from Trading Portal
 * Type-safe state access with performance optimizations
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { store } from './store';
import { authActions, type User } from './slices/authSlice';
import { uiActions } from './slices/uiSlice';

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
      // Simulate API call - replace with actual auth service
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(authActions.loginSuccess({
          user: data.user,
          token: data.token,
          expiresAt: data.expiresAt
        }));
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      dispatch(authActions.loginFailure(error instanceof Error ? error.message : 'Login failed'));
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

  const openModal = useCallback((modalId: string, data?: any, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
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

  // Auto-detect system preferences
  useEffect(() => {
    if (theme.mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        dispatch(themeActions.setThemeMode(mediaQuery.matches ? 'dark' : 'light'));
      };

      mediaQuery.addEventListener('change', handleChange);
      handleChange(); // Initial check

      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme.mode, dispatch]);

  // Auto-detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      dispatch(themeActions.setReducedMotion(mediaQuery.matches));
    };

    mediaQuery.addEventListener('change', handleChange);
    handleChange(); // Initial check

    return () => mediaQuery.removeEventListener('change', handleChange);
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

  const updateProps = useCallback((props: Record<string, any>) => {
    dispatch(componentActions.updateComponentProps({
      componentId,
      props
    }));
  }, [componentId, dispatch]);

  const updateState = useCallback((stateUpdates: Record<string, any>) => {
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

// Responsive Hook
export const useResponsive = () => {
  const viewport = useAppSelector(state => state.ui.viewport);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(uiActions.updateViewport({
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
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

  const setFilter = useCallback((key: string, value: any) => {
    dispatch(uiActions.setSearchFilter({ key, value }));
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch(uiActions.clearSearchFilters());
  }, [dispatch]);

  const setResults = useCallback((results: any[]) => {
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
