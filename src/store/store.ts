/**
 * Redux Store - Migrated from Trading Portal with enhancements
 * Professional state management with TypeScript safety
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Fallback storage for server-side rendering and testing
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

// Use redux-persist's built-in web storage with fallback
const storageEngine = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// Handle SSR by providing noop storage if web storage fails
const createSafeStorage = () => {
  if (typeof window === 'undefined') {
    return createNoopStorage();
  }

  try {
    // Test if storage is available
    const testKey = '__storage_test__';
    storageEngine.setItem(testKey, 'test');
    storageEngine.removeItem(testKey);
    return storageEngine;
  } catch (_error) {
    // Fallback to noop storage
    return createNoopStorage();
  }
};

// Import slices
import { authSlice } from './slices/authSlice';
import { uiSlice } from './slices/uiSlice';
import { themeSlice } from './slices/themeSlice';
import { componentSlice } from './slices/componentSlice';

// Root reducer combination
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  theme: themeSlice.reducer,
  components: componentSlice.reducer
});

// Persistence configuration - only enable in browser environment
const persistConfig = {
  key: 'tamyla-ui-components',
  version: 1,
  storage: createSafeStorage(),
  whitelist: ['auth', 'theme'], // Only persist auth and theme
  blacklist: ['ui', 'components'] // Don't persist UI state
};

// Create persisted reducer only if we're in a browser environment
const persistedReducer = typeof window !== 'undefined'
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

// Store configuration
export const store = configureStore({
  reducer: persistedReducer as any, // Type assertion to handle conditional persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PERSIST',
          'persist/REGISTER'
        ],
        ignoredActionsPaths: ['payload.timestamp'],
        ignoredPaths: ['_persist']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = typeof window !== 'undefined' ? persistStore(store) : null;

// Type definitions (temporarily disabled for Rollup build issues)
// TODO: Fix Rollup TypeScript configuration to enable type exports
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Action exports
export { authActions } from './slices/authSlice';
export { uiActions } from './slices/uiSlice';
export { themeActions } from './slices/themeSlice';
export { componentActions } from './slices/componentSlice';
