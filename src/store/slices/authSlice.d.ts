/**
 * Auth Slice - User authentication state management
 * Migrated from Trading Portal with enhanced TypeScript safety
 */
import { PayloadAction } from '@reduxjs/toolkit';
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
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    sessionExpiry: string | null;
}
export declare const authSlice: import("@reduxjs/toolkit").Slice<AuthState, {
    loginStart: (state: import("immer").WritableDraft<AuthState>) => void;
    loginSuccess: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<{
        user: User;
        token: string;
        expiresAt?: string;
    }>) => void;
    loginFailure: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<string>) => void;
    logout: (state: import("immer").WritableDraft<AuthState>) => void;
    updateUser: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<Partial<User>>) => void;
    updateUserProfile: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<Partial<User['profile']>>) => void;
    updateUserPreferences: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<Partial<User['preferences']>>) => void;
    clearError: (state: import("immer").WritableDraft<AuthState>) => void;
    setLoading: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<boolean>) => void;
    refreshToken: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<{
        token: string;
        expiresAt?: string;
    }>) => void;
}, "auth", "auth", import("@reduxjs/toolkit").SliceSelectors<AuthState>>;
export declare const authActions: import("@reduxjs/toolkit").CaseReducerActions<{
    loginStart: (state: import("immer").WritableDraft<AuthState>) => void;
    loginSuccess: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<{
        user: User;
        token: string;
        expiresAt?: string;
    }>) => void;
    loginFailure: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<string>) => void;
    logout: (state: import("immer").WritableDraft<AuthState>) => void;
    updateUser: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<Partial<User>>) => void;
    updateUserProfile: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<Partial<User['profile']>>) => void;
    updateUserPreferences: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<Partial<User['preferences']>>) => void;
    clearError: (state: import("immer").WritableDraft<AuthState>) => void;
    setLoading: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<boolean>) => void;
    refreshToken: (state: import("immer").WritableDraft<AuthState>, action: PayloadAction<{
        token: string;
        expiresAt?: string;
    }>) => void;
}, "auth">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
//# sourceMappingURL=authSlice.d.ts.map