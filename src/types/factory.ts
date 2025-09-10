/**
 * Factory System Type Definitions
 * Provides proper TypeScript types for @tamyla/ui-components integration
 */

import React from 'react';

// Base factory component interface
export interface BaseFactoryComponent {
  element: HTMLElement;
  destroy(): void;
  update(config: Record<string, unknown>): void;
}

// Factory creation function type
export type FactoryCreator<TConfig = Record<string, unknown>> = (config?: TConfig) => BaseFactoryComponent;

// Generic factory interface
export interface ComponentFactory<TConfig = Record<string, unknown>> {
  create: FactoryCreator<TConfig>;
  createPrimary?: FactoryCreator<TConfig>;
  createSecondary?: FactoryCreator<TConfig>;
  createOutline?: FactoryCreator<TConfig>;
  createGhost?: FactoryCreator<TConfig>;
}

// Event data types for component events
export interface ComponentEventData {
  type: string;
  target: string;
  data?: unknown;
  timestamp: number;
}

// Component event handler type
export type ComponentEventHandler = (event: ComponentEventData) => void;

// Factory configuration types
export interface FactoryConfig {
  id?: string;
  className?: string;
  style?: Record<string, string>;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Button factory specific types
export interface ButtonFactoryConfig extends FactoryConfig {
  text?: string;
  onClick?: () => void;
  loading?: boolean;
  icon?: string;
}

// Input factory specific types
export interface InputFactoryConfig extends FactoryConfig {
  placeholder?: string;
  value?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  required?: boolean;
  pattern?: string;
}

// Card factory specific types
export interface CardFactoryConfig extends FactoryConfig {
  title?: string;
  content?: string;
  header?: boolean;
  footer?: boolean;
}

// Main UI Components module interface
export interface UIComponentsModule {
  // Factory classes
  ButtonFactory: ComponentFactory<ButtonFactoryConfig>;
  InputFactory: ComponentFactory<InputFactoryConfig>;
  CardFactory: ComponentFactory<CardFactoryConfig>;

  // Direct component access
  Button: FactoryCreator<ButtonFactoryConfig>;
  Input: FactoryCreator<InputFactoryConfig>;
  Card: FactoryCreator<CardFactoryConfig>;

  // Utility functions
  createComponent: <TConfig>(type: string, config?: TConfig) => BaseFactoryComponent;
  destroyComponent: (component: BaseFactoryComponent) => void;
}

// Factory bridge props with proper typing
export interface FactoryBridgeProps {
  componentType: keyof UIComponentsModule;
  config?: Record<string, unknown>;
  children?: React.ReactNode;
  className?: string;
  onEvent?: ComponentEventHandler;
  onMount?: (component: BaseFactoryComponent) => void;
  onUnmount?: () => void;
}

// Alias for backward compatibility
export type FactoryComponentProps = FactoryBridgeProps;

// Factory function type for registry (can return various things)
export type FactoryFunction = () => unknown;

// Factory registry entry
export interface FactoryRegistryEntry {
  name: string;
  factory: FactoryFunction;
  configSchema?: Record<string, unknown>;
}
