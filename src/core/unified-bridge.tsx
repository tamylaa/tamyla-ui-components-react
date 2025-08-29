/**
 * Unified Factory Bridge - Single, clean React wrapper for ALL ui-components
 *
 * Mirrors the root platform's proven factory pattern with React-specific implementation.
 * Eliminates all duplication and inconsistency.
 */

import React, { useEffect, useRef } from 'react';
import {
  // Atoms - object factories with .create() method
  ButtonFactory,
  InputFactory,
  CardFactory,

  // Molecules - mixed pattern
  ActionCardFactory,      // object with .create() method
  SearchBarFactory,       // object with .create() method
  ContentCardFactory,     // function factory
  FileListFactory,        // function factory
  NotificationFactory,    // function factory

  // Organisms
  SearchInterfaceFactory  // function factory
} from '@tamyla/ui-components';

// Unified factory registry - matches root platform pattern
const FACTORY_REGISTRY = {
  // Atoms (all object factories with .create())
  button: ButtonFactory,
  input: InputFactory,
  card: CardFactory,

  // Molecules (mixed: objects with .create() vs functions)
  actionCard: ActionCardFactory,
  searchBar: SearchBarFactory,
  contentCard: ContentCardFactory,
  fileList: FileListFactory,
  notification: NotificationFactory,

  // Organisms (function factories)
  searchInterface: SearchInterfaceFactory
} as const;

// Component type definitions
export type ComponentType = keyof typeof FACTORY_REGISTRY;

export interface ComponentProps {
  
  [key: string]: any;
}

/**
 * Unified factory hook - handles all component types consistently
 */
export function useComponentFactory() {
  const createElement = (type: ComponentType, props: ComponentProps = {}): HTMLElement => {
    const factory = FACTORY_REGISTRY[type];

    if (!factory) {
      throw new Error(`Component type "${type}" not found in factory registry`);
    }

    let element: HTMLElement;

    // Handle different factory patterns consistently
    if (typeof factory === 'function') {
      // Function factory (ContentCard, FileList, etc.)
      
      const functionFactory = factory as (props: ComponentProps) => any;
      const result = functionFactory(props);
      element = result?.element || result;
    } else if (factory && typeof factory === 'object' && 'create' in factory && typeof factory.create === 'function') {
      // Object factory with .create() method (Button, ActionCard, SearchBar, etc.)
      const objectFactory = factory as { create: () => HTMLElement };
      element = objectFactory.create();
    } else {
      throw new Error(`Factory for "${type}" has invalid format`);
    }

    if (!(element instanceof HTMLElement)) {
      throw new Error(`Factory for "${type}" did not return an HTMLElement`);
    }

    return element;
  };

  return { createElement };
}

/**
 * Generic React bridge component - works for ALL component types
 */
interface FactoryBridgeProps {
  type: ComponentType;
  config?: ComponentProps;
  className?: string;
  children?: React.ReactNode;
}

export const FactoryBridge: React.FC<FactoryBridgeProps> = ({
  type,
  config = {},
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { createElement } = useComponentFactory();

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Create the vanilla component
      const element = createElement(type, config);

      // Add any additional classes
      if (className) {
        element.classList.add(...className.split(' ').filter(Boolean));
      }

      // Clear and append
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to create ${type} component:`, error);

      // Show error placeholder
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="
            padding: 1rem; 
            border: 2px dashed #ff6b6b; 
            border-radius: 0.375rem; 
            background: #ffe0e0; 
            color: #c92a2a;
            font-family: monospace;
            text-align: center;
          ">
            Error: Failed to create ${type} component
          </div>
        `;
      }
    }
  }, [type, config, className, createElement]);

  return (
    <div ref={containerRef} className={`tmyl-bridge tmyl-${type}-bridge`}>
      {children}
    </div>
  );
};

/**
 * Convenience factory for creating specific component bridges
 */
export const createComponentBridge = (type: ComponentType) => {
  return React.forwardRef<HTMLDivElement, Omit<FactoryBridgeProps, 'type'>>((props, ref) => (
    <div ref={ref}>
      <FactoryBridge type={type} {...props} />
    </div>
  ));
};

// Export type-safe component bridges
export const Button = createComponentBridge('button');
export const Input = createComponentBridge('input');
export const Card = createComponentBridge('card');
export const ActionCard = createComponentBridge('actionCard');
export const SearchBar = createComponentBridge('searchBar');
export const ContentCard = createComponentBridge('contentCard');
export const FileList = createComponentBridge('fileList');
export const Notification = createComponentBridge('notification');
export const SearchInterface = createComponentBridge('searchInterface');

// Export the unified API
export default {
  FactoryBridge,
  useComponentFactory,
  createComponentBridge,

  // Direct component exports
  Button,
  Input,
  Card,
  ActionCard,
  SearchBar,
  ContentCard,
  FileList,
  Notification,
  SearchInterface
};
