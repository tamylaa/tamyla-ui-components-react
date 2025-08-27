/**
 * Redux Store - Migrated from Trading Portal with enhancements
 * Professional state management with TypeScript safety
 */
/// <reference types="redux-persist/types/persistReducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("./slices/authSlice").AuthState;
    ui: import("./slices/uiSlice").UIState;
    theme: import("./slices/themeSlice").ThemeState;
    components: import("./slices/componentSlice").ComponentState;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("./slices/authSlice").AuthState;
        ui: import("./slices/uiSlice").UIState;
        theme: import("./slices/themeSlice").ThemeState;
        components: import("./slices/componentSlice").ComponentState;
    } & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const persistor: import("redux-persist").Persistor;
export { authActions } from './slices/authSlice';
export { uiActions } from './slices/uiSlice';
export { themeActions } from './slices/themeSlice';
export { componentActions } from './slices/componentSlice';
//# sourceMappingURL=store.d.ts.map