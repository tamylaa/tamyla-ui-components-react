/**
 * Component Slice - UI component-specific state management
 * Handles dynamic component behavior and configurations
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Component configuration interface
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

// Component slice state
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

// Initial component state
const initialState: ComponentState = {
  components: {},
  activeComponent: null,
  componentRegistry: {
    // Atoms
    'Button': {
      type: 'atom',
      defaultProps: {
        variant: 'primary',
        size: 'md',
        disabled: false,
        loading: false,
      },
      stateSchema: {
        isHovered: false,
        isFocused: false,
        isPressed: false,
      },
    },
    'Input': {
      type: 'atom',
      defaultProps: {
        type: 'text',
        size: 'md',
        disabled: false,
        required: false,
      },
      stateSchema: {
        value: '',
        isFocused: false,
        hasError: false,
        errorMessage: '',
      },
    },
    'StatusIndicator': {
      type: 'atom',
      defaultProps: {
        status: 'idle',
        size: 'md',
        showText: true,
      },
      stateSchema: {
        isAnimating: false,
        lastStatusChange: null,
      },
    },
    // Molecules
    'ActionCard': {
      type: 'molecule',
      defaultProps: {
        title: '',
        description: '',
        variant: 'default',
        showProgress: false,
      },
      stateSchema: {
        progress: 0,
        isExpanded: false,
        isCompleted: false,
        xpEarned: 0,
      },
    },
    'SearchBar': {
      type: 'molecule',
      defaultProps: {
        placeholder: 'Search...',
        showSuggestions: true,
        clearable: true,
      },
      stateSchema: {
        query: '',
        suggestions: [],
        isSearching: false,
        showDropdown: false,
      },
    },
    // Organisms
    'NavigationSidebar': {
      type: 'organism',
      defaultProps: {
        items: [],
        collapsible: true,
        pinnable: true,
      },
      stateSchema: {
        isCollapsed: false,
        pinnedItems: [],
        activeItem: null,
        expandedSections: [],
      },
    },
    'DashboardWidget': {
      type: 'organism',
      defaultProps: {
        title: '',
        type: 'default',
        refreshable: true,
      },
      stateSchema: {
        data: null,
        isLoading: false,
        lastRefresh: null,
        error: null,
      },
    },
  },
};

// Component slice
export const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // Component registration and management
    registerComponent: (state, action: PayloadAction<{
      id: string;
      name: string;
      props?: Record<string, any>;
      initialState?: Record<string, any>;
    }>) => {
      const { id, name, props = {}, initialState: compState = {} } = action.payload;
      const registryEntry = state.componentRegistry[name];
      
      if (registryEntry) {
        state.components[id] = {
          id,
          type: registryEntry.type,
          name,
          props: { ...registryEntry.defaultProps, ...props },
          state: { ...registryEntry.stateSchema, ...compState },
          isVisible: true,
          isDisabled: false,
          lastUpdated: new Date().toISOString(),
        };
      }
    },
    
    unregisterComponent: (state, action: PayloadAction<string>) => {
      delete state.components[action.payload];
      if (state.activeComponent === action.payload) {
        state.activeComponent = null;
      }
    },
    
    // Component props management
    updateComponentProps: (state, action: PayloadAction<{
      componentId: string;
      props: Record<string, any>;
    }>) => {
      const { componentId, props } = action.payload;
      if (state.components[componentId]) {
        state.components[componentId].props = {
          ...state.components[componentId].props,
          ...props,
        };
        state.components[componentId].lastUpdated = new Date().toISOString();
      }
    },
    
    // Component state management
    updateComponentState: (state, action: PayloadAction<{
      componentId: string;
      stateUpdates: Record<string, any>;
    }>) => {
      const { componentId, stateUpdates } = action.payload;
      if (state.components[componentId]) {
        state.components[componentId].state = {
          ...state.components[componentId].state,
          ...stateUpdates,
        };
        state.components[componentId].lastUpdated = new Date().toISOString();
      }
    },
    
    // Component visibility and interaction
    setComponentVisibility: (state, action: PayloadAction<{
      componentId: string;
      isVisible: boolean;
    }>) => {
      const { componentId, isVisible } = action.payload;
      if (state.components[componentId]) {
        state.components[componentId].isVisible = isVisible;
        state.components[componentId].lastUpdated = new Date().toISOString();
      }
    },
    
    setComponentDisabled: (state, action: PayloadAction<{
      componentId: string;
      isDisabled: boolean;
    }>) => {
      const { componentId, isDisabled } = action.payload;
      if (state.components[componentId]) {
        state.components[componentId].isDisabled = isDisabled;
        state.components[componentId].lastUpdated = new Date().toISOString();
      }
    },
    
    setActiveComponent: (state, action: PayloadAction<string | null>) => {
      state.activeComponent = action.payload;
    },
    
    // Component registry management
    registerComponentType: (state, action: PayloadAction<{
      name: string;
      config: {
        type: 'atom' | 'molecule' | 'organism';
        defaultProps: Record<string, any>;
        stateSchema: Record<string, any>;
      };
    }>) => {
      const { name, config } = action.payload;
      state.componentRegistry[name] = config;
    },
    
    unregisterComponentType: (state, action: PayloadAction<string>) => {
      delete state.componentRegistry[action.payload];
    },
    
    // Batch operations
    batchUpdateComponents: (state, action: PayloadAction<{
      updates: Array<{
        componentId: string;
        props?: Record<string, any>;
        state?: Record<string, any>;
        isVisible?: boolean;
        isDisabled?: boolean;
      }>;
    }>) => {
      const timestamp = new Date().toISOString();
      
      action.payload.updates.forEach(update => {
        const component = state.components[update.componentId];
        if (component) {
          if (update.props) {
            component.props = { ...component.props, ...update.props };
          }
          if (update.state) {
            component.state = { ...component.state, ...update.state };
          }
          if (typeof update.isVisible === 'boolean') {
            component.isVisible = update.isVisible;
          }
          if (typeof update.isDisabled === 'boolean') {
            component.isDisabled = update.isDisabled;
          }
          component.lastUpdated = timestamp;
        }
      });
    },
    
    resetComponent: (state, action: PayloadAction<string>) => {
      const componentId = action.payload;
      const component = state.components[componentId];
      
      if (component) {
        const registryEntry = state.componentRegistry[component.name];
        if (registryEntry) {
          component.props = { ...registryEntry.defaultProps };
          component.state = { ...registryEntry.stateSchema };
          component.isVisible = true;
          component.isDisabled = false;
          component.lastUpdated = new Date().toISOString();
        }
      }
    },
    
    resetAllComponents: (state) => {
      const timestamp = new Date().toISOString();
      
      Object.values(state.components).forEach(component => {
        const registryEntry = state.componentRegistry[component.name];
        if (registryEntry) {
          component.props = { ...registryEntry.defaultProps };
          component.state = { ...registryEntry.stateSchema };
          component.isVisible = true;
          component.isDisabled = false;
          component.lastUpdated = timestamp;
        }
      });
      
      state.activeComponent = null;
    },
  },
});

// Export actions
export const componentActions = componentSlice.actions;

// Export default reducer
export default componentSlice.reducer;
