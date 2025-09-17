/**
 * Unified Factory Bridge - Single, clean React wrapper for ALL ui-components
 *
 * Mirrors the root platform's proven factory pattern with React-specific implemen        // Show error placeholder
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="
              padding: var(--spacing-4, 1rem);
              border: 2px dashed var(--color-error-border, #ef4444);
              border-radius: var(--border-radius-md, 0.375rem);
              background: var(--color-error-bg, #fee2e2);
              color: var(--color-error-text, #dc2626);
              font-family: var(--font-family-mono, monospace);
              text-align: center;
            ">`Eliminates all duplication and inconsistency.
 * Uses dynamic imports to prevent SSR issues.
 */

import React, { useEffect, useRef } from 'react';
import logger from '../utils/logger';

// Dynamic imports to prevent SSR DOM access issues
// Factories will be loaded async when needed
/*
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
*/

// Unified factory registry - will be populated dynamically to prevent SSR issues
const FACTORY_REGISTRY: { [key: string]: unknown } = {};

// Dynamic factory loader to prevent SSR issues
const loadFactory = async (factoryName: string) => {
  if (FACTORY_REGISTRY[factoryName]) {
    return FACTORY_REGISTRY[factoryName];
  }

  try {
    const moduleName = '@tamyla/' + 'ui-components';
    // Handle missing peer dependency gracefully
    let uiComponents: any = null;
    try {
      uiComponents = await import(/* webpackIgnore: true */ moduleName);
    } catch (importError) {
      logger.warn('Peer dependency @tamyla/ui-components not available', { error: importError }, 'UnifiedBridge');
    }

    if (!uiComponents) {
      logger.warn(`@tamyla/ui-components not available for factory: ${factoryName}`, null, 'UnifiedBridge');
      return null;
    }

    // Map factory names to their imports
    const factoryMap: { [key: string]: string } = {
      button: 'ButtonFactory',
      input: 'InputFactory',
      card: 'CardFactory',
      actionCard: 'ActionCardFactory',
      searchBar: 'SearchBarFactory',
      contentCard: 'ContentCardFactory',
      fileList: 'FileListFactory',
      notification: 'NotificationFactory',
      searchInterface: 'SearchInterfaceFactory'
    };

    const importName = factoryMap[factoryName];
    if (importName && uiComponents[importName]) {
      FACTORY_REGISTRY[factoryName] = uiComponents[importName];
      return FACTORY_REGISTRY[factoryName];
    }

    // eslint-disable-next-line no-console
    console.warn(`Factory ${factoryName} not found in @tamyla/ui-components`);
    return null;
  } catch (error) {
    logger.warn(`Failed to load factory ${factoryName}`, { error }, 'UnifiedBridge');
    return null;
  }
};

// Component type definitions
export type ComponentType = 'button' | 'input' | 'card' | 'actionCard' | 'searchBar' | 'contentCard' | 'fileList' | 'notification' | 'searchInterface';

export interface ComponentProps {
  [key: string]: unknown;
}

/**
 * Unified factory hook - handles all component types consistently
 */
export function useComponentFactory() {
  const createElement = async (type: ComponentType, props: ComponentProps = {}): Promise<HTMLElement> => {
    const factory = await loadFactory(type);

    if (!factory) {
      throw new Error(`Component type "${type}" not found in factory registry`);
    }

    let element: HTMLElement;

    // Handle different factory patterns consistently
    if (typeof factory === 'function') {
      // Function factory (ContentCard, FileList, etc.)
      const functionFactory = factory as (props: ComponentProps) => unknown;
      const result = functionFactory(props);
      element = (result as any)?.element || result;
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

    const createAndMountComponent = async () => {
      try {
        // Create the vanilla component
        const element = await createElement(type, config);

        // Add any additional classes
        if (className) {
          element.classList.add(...className.split(' ').filter(Boolean));
        }

        // Clear and append
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(element);
        }

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
    };

    createAndMountComponent();
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
