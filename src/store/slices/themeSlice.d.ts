/**
 * Theme Slice - Unified theme management
 * Integrates ui-components design tokens with Trading Portal theme patterns
 */
import { PayloadAction } from '@reduxjs/toolkit';
export interface ThemeState {
    mode: 'light' | 'dark' | 'auto';
    currentTheme: 'light' | 'dark';
    primaryColor: string;
    fontSize: 'sm' | 'md' | 'lg';
    animations: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
    customColors: {
        [key: string]: string;
    };
}
export declare const themeSlice: import("@reduxjs/toolkit").Slice<ThemeState, {
    setThemeMode: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<'light' | 'dark' | 'auto'>) => void;
    setPrimaryColor: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<string>) => void;
    setFontSize: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<'sm' | 'md' | 'lg'>) => void;
    toggleAnimations: (state: import("immer").WritableDraft<ThemeState>) => void;
    setAnimations: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<boolean>) => void;
    setReducedMotion: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<boolean>) => void;
    setHighContrast: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<boolean>) => void;
    setCustomColor: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<{
        key: string;
        value: string;
    }>) => void;
    removeCustomColor: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<string>) => void;
    resetCustomColors: (state: import("immer").WritableDraft<ThemeState>) => void;
    resetTheme: () => ThemeState;
}, "theme", "theme", import("@reduxjs/toolkit").SliceSelectors<ThemeState>>;
export declare const themeActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setThemeMode: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<'light' | 'dark' | 'auto'>) => void;
    setPrimaryColor: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<string>) => void;
    setFontSize: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<'sm' | 'md' | 'lg'>) => void;
    toggleAnimations: (state: import("immer").WritableDraft<ThemeState>) => void;
    setAnimations: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<boolean>) => void;
    setReducedMotion: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<boolean>) => void;
    setHighContrast: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<boolean>) => void;
    setCustomColor: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<{
        key: string;
        value: string;
    }>) => void;
    removeCustomColor: (state: import("immer").WritableDraft<ThemeState>, action: PayloadAction<string>) => void;
    resetCustomColors: (state: import("immer").WritableDraft<ThemeState>) => void;
    resetTheme: () => ThemeState;
}, "theme">;
declare const _default: import("redux").Reducer<ThemeState>;
export default _default;
//# sourceMappingURL=themeSlice.d.ts.map