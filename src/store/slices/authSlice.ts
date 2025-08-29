/**
 * Auth Slice - User authentication state management
 * Migrated from Trading Portal with enhanced TypeScript safety
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  profile: {
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
  };
}

// Auth state interface
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  sessionExpiry: string | null;
}

// Initial auth state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  sessionExpiry: null
};

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; expiresAt?: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.sessionExpiry = action.payload.expiresAt || null;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.sessionExpiry = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.sessionExpiry = null;
      state.loading = false;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateUserProfile: (state, action: PayloadAction<Partial<User['profile']>>) => {
      if (state.user) {
        state.user.profile = { ...state.user.profile, ...action.payload };
      }
    },

    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },

    clearError: (state) => {
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    refreshToken: (state, action: PayloadAction<{ token: string; expiresAt?: string }>) => {
      state.token = action.payload.token;
      state.sessionExpiry = action.payload.expiresAt || null;
    }
  }
});

// Export actions
export const authActions = authSlice.actions;

// Export default reducer
export default authSlice.reducer;
