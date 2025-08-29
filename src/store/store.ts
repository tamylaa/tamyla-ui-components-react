/**
 * Redux Store - Migrated from Trading Portal with enhancements
 * Professional state management with TypeScript safety
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

// Persistence configuration
const persistConfig = {
  key: 'tamyla-ui-components',
  version: 1,
  storage,
  whitelist: ['auth', 'theme'], // Only persist auth and theme
  blacklist: ['ui', 'components'] // Don't persist UI state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER'
        ],
        ignoredActionsPaths: ['payload.timestamp'],
        ignoredPaths: ['_persist']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

// Type definitions (temporarily disabled for Rollup build issues)
// TODO: Fix Rollup TypeScript configuration to enable type exports
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Action exports
export { authActions } from './slices/authSlice';
export { uiActions } from './slices/uiSlice';
export { themeActions } from './slices/themeSlice';
export { componentActions } from './slices/componentSlice';
