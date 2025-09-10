import { configureStore, createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' },
  reducers: {}
});

export const uiSlice = createSlice({
  name: 'ui',
  initialState: { loading: { global: false } },
  reducers: {}
});

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    ui: uiSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
