/**
 * Theme Slice - Unified theme management
 * Integrates ui-components design tokens with Trading Portal theme patterns
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Theme state interface
export interface ThemeState {
  mode: 'light' | 'dark' | 'auto';
  currentTheme: 'light' | 'dark'; // Computed current theme
  primaryColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  customColors: {
    [key: string]: string;
  };
}

// Initial theme state
const initialState: ThemeState = {
  mode: 'dark', // Default to dark mode like Trading Portal
  currentTheme: 'dark', // Computed current theme
  primaryColor: '#3b82f6',
  fontSize: 'md',
  animations: true,
  reducedMotion: false,
  highContrast: false,
  customColors: {},
};

// Theme slice
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.mode = action.payload;
    },
    
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    
    setFontSize: (state, action: PayloadAction<'sm' | 'md' | 'lg'>) => {
      state.fontSize = action.payload;
    },
    
    toggleAnimations: (state) => {
      state.animations = !state.animations;
    },
    
    setAnimations: (state, action: PayloadAction<boolean>) => {
      state.animations = action.payload;
    },
    
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
    },
    
    setHighContrast: (state, action: PayloadAction<boolean>) => {
      state.highContrast = action.payload;
    },
    
    setCustomColor: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.customColors[action.payload.key] = action.payload.value;
    },
    
    removeCustomColor: (state, action: PayloadAction<string>) => {
      delete state.customColors[action.payload];
    },
    
    resetCustomColors: (state) => {
      state.customColors = {};
    },
    
    resetTheme: () => initialState,
  },
});

// Export actions
export const themeActions = themeSlice.actions;

// Export default reducer
export default themeSlice.reducer;
