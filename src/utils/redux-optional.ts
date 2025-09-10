/**
 * Redux-Optional Utilities
 * Provides graceful degradation when Redux is not available
 */

import React from 'react';
import type { ReduxState } from '../types/common';
import logger from './logger';

// Optional Redux hooks with fallbacks
let reduxAvailable = false;
let useAppDispatchHook: (() => (action: unknown) => void) | null = null;
let useAppSelectorHook: (<T>(selector: (state: ReduxState) => T) => T) | null = null;

// Try to load Redux hooks dynamically
const loadReduxHooks = async () => {
  try {
    const hooks = await import('../store/hooks');
    useAppDispatchHook = hooks.useAppDispatch;
    useAppSelectorHook = hooks.useAppSelector;
    reduxAvailable = true;
    return true;
  } catch {
    // Redux not available, use no-op functions
    useAppDispatchHook = () => () => {};
    useAppSelectorHook = <T,>() => null as T;
    return false;
  }
};

// Initialize Redux loading
loadReduxHooks();

export const useAppDispatchOptional = () => {
  return useAppDispatchHook?.() || (() => {});
};

export const useAppSelectorOptional = <T,>(selector: (state: ReduxState) => T): T | null => {
  if (useAppSelectorHook) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAppSelectorHook(selector);
  }
  return null;
};

// Context-based alternatives for non-Redux usage
interface ThemeContextValue {
  mode: 'light' | 'dark';
  primaryColor?: string;
  // Add other theme properties as needed
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode; theme?: ThemeContextValue }> = ({
  children,
  theme = { mode: 'light' }
}) => (
  React.createElement(ThemeContext.Provider, { value: theme }, children)
);

export const useThemeOptional = (): ThemeContextValue | null => {
  const reduxTheme = useAppSelectorOptional((state: ReduxState) => (state as { theme?: ThemeContextValue })?.theme);
  const contextTheme = React.useContext(ThemeContext);

  return reduxTheme || contextTheme || { mode: 'light' };
};

// UI State context for non-Redux usage
interface UIContextValue {
  loading: {
    global: boolean;
  };
  // Add other UI state properties as needed
}

const UIContext = React.createContext<UIContextValue | null>(null);

export const UIProvider: React.FC<{ children: React.ReactNode; uiState?: UIContextValue }> = ({
  children,
  uiState = { loading: { global: false } }
}) => (
  React.createElement(UIContext.Provider, { value: uiState }, children)
);

export const useUIOptional = (): UIContextValue | null => {
  const reduxUI = useAppSelectorOptional((state: ReduxState) => (state as { ui?: UIContextValue })?.ui);
  const contextUI = React.useContext(UIContext);

  return reduxUI || contextUI || { loading: { global: false } };
};

// Analytics utilities that work with or without Redux
export const useAnalyticsOptional = () => {
  const dispatch = useAppDispatchOptional();

  const trackEvent = React.useCallback(async (event: string, data?: unknown) => {
    if (dispatch && reduxAvailable) {
      try {
        // Redux analytics
        const { uiActions } = await import('../store/store');
        dispatch(uiActions.addNotification({
          type: 'info',
          title: 'Analytics',
          message: `Event: ${event}`,
          autoClose: true,
          duration: 1000
        }));
      } catch {
        // Fallback if store import fails
        logger.info('Analytics Event', { event, data }, 'ReduxOptional');
      }
    } else {
      // Fallback analytics (could integrate with other analytics providers)
      logger.info('Analytics Event', { event, data }, 'ReduxOptional');
    }
  }, [dispatch]);

  return { trackEvent };
};

// Feature detection
export const hasRedux = async (): Promise<boolean> => {
  try {
    await import('../store/hooks');
    return true;
  } catch {
    return false;
  }
};
