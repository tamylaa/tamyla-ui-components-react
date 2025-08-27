/**
 * Component Slice - UI component-specific state management
 * Handles dynamic component behavior and configurations
 */
import { PayloadAction } from '@reduxjs/toolkit';
export interface ComponentConfig {
    id: string;
    type: 'atom' | 'molecule' | 'organism';
    name: string;
    props: Record<string, any>;
    state: Record<string, any>;
    isVisible: boolean;
    isDisabled: boolean;
    lastUpdated: string;
}
export interface ComponentState {
    components: {
        [componentId: string]: ComponentConfig;
    };
    activeComponent: string | null;
    componentRegistry: {
        [componentName: string]: {
            type: 'atom' | 'molecule' | 'organism';
            defaultProps: Record<string, any>;
            stateSchema: Record<string, any>;
        };
    };
}
export declare const componentSlice: import("@reduxjs/toolkit").Slice<ComponentState, {
    registerComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        id: string;
        name: string;
        props?: Record<string, any>;
        initialState?: Record<string, any>;
    }>) => void;
    unregisterComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string>) => void;
    updateComponentProps: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        props: Record<string, any>;
    }>) => void;
    updateComponentState: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        stateUpdates: Record<string, any>;
    }>) => void;
    setComponentVisibility: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        isVisible: boolean;
    }>) => void;
    setComponentDisabled: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        isDisabled: boolean;
    }>) => void;
    setActiveComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string | null>) => void;
    registerComponentType: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        name: string;
        config: {
            type: 'atom' | 'molecule' | 'organism';
            defaultProps: Record<string, any>;
            stateSchema: Record<string, any>;
        };
    }>) => void;
    unregisterComponentType: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string>) => void;
    batchUpdateComponents: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        updates: Array<{
            componentId: string;
            props?: Record<string, any>;
            state?: Record<string, any>;
            isVisible?: boolean;
            isDisabled?: boolean;
        }>;
    }>) => void;
    resetComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string>) => void;
    resetAllComponents: (state: import("immer").WritableDraft<ComponentState>) => void;
}, "components", "components", import("@reduxjs/toolkit").SliceSelectors<ComponentState>>;
export declare const componentActions: import("@reduxjs/toolkit").CaseReducerActions<{
    registerComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        id: string;
        name: string;
        props?: Record<string, any>;
        initialState?: Record<string, any>;
    }>) => void;
    unregisterComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string>) => void;
    updateComponentProps: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        props: Record<string, any>;
    }>) => void;
    updateComponentState: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        stateUpdates: Record<string, any>;
    }>) => void;
    setComponentVisibility: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        isVisible: boolean;
    }>) => void;
    setComponentDisabled: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        componentId: string;
        isDisabled: boolean;
    }>) => void;
    setActiveComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string | null>) => void;
    registerComponentType: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        name: string;
        config: {
            type: 'atom' | 'molecule' | 'organism';
            defaultProps: Record<string, any>;
            stateSchema: Record<string, any>;
        };
    }>) => void;
    unregisterComponentType: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string>) => void;
    batchUpdateComponents: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<{
        updates: Array<{
            componentId: string;
            props?: Record<string, any>;
            state?: Record<string, any>;
            isVisible?: boolean;
            isDisabled?: boolean;
        }>;
    }>) => void;
    resetComponent: (state: import("immer").WritableDraft<ComponentState>, action: PayloadAction<string>) => void;
    resetAllComponents: (state: import("immer").WritableDraft<ComponentState>) => void;
}, "components">;
declare const _default: import("redux").Reducer<ComponentState>;
export default _default;
//# sourceMappingURL=componentSlice.d.ts.map