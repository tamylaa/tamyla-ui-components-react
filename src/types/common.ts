/**
 * Common Type Definitions for UI Components
 * Eliminates 'any' types with proper type safety
 */

// Base component prop types
export type ComponentProps = Record<string, string | number | boolean | null | undefined | string[] | number[] | object>;

export type ComponentState = Record<string, string | number | boolean | null | undefined | object>;

// Component configuration types
export interface BaseComponentConfig {
  id: string;
  type: 'atom' | 'molecule' | 'organism';
  name: string;
  props: ComponentProps;
  state: ComponentState;
  isVisible: boolean;
  isDisabled: boolean;
  lastUpdated: string;
}

// Component registry types
export interface ComponentRegistryEntry {
  type: 'atom' | 'molecule' | 'organism';
  defaultProps: ComponentProps;
  stateSchema: ComponentState;
}

// UI component state types
export interface UIComponentState {
  isVisible: boolean;
  isExpanded: boolean;
  data: unknown;
}

// Search result types
export type SearchResult = {
  id: string;
  title: string;
  type: string;
  data?: unknown;
};

// Filter value types
export type FilterValue = string | number | boolean | string[] | number[];

// Redux action payload types
export interface ComponentUpdatePayload {
  componentId: string;
  props: ComponentProps;
}

export interface ComponentStateUpdatePayload {
  componentId: string;
  stateUpdates: ComponentState;
}

export interface SearchFilterPayload {
  key: string;
  value: FilterValue;
}

// Factory configuration types
export interface FactoryConfig {
  name?: string;
  version?: string;
  dependencies?: string[];
  [key: string]: unknown;
}

export interface ComponentFactory {
  create: (config?: FactoryConfig) => unknown;
  update?: (config: FactoryConfig) => void;
  destroy?: () => void;
  enableTradingPortalPatterns?: () => void;
  [key: string]: unknown;
}

// Theme extension types
export interface ThemeExtensions {
  [key: string]: unknown;
}

// Local storage value types
export type StorageValue = string | number | boolean | object | null;

// Redux state types for optional usage
export interface ReduxState {
  [key: string]: unknown;
}
