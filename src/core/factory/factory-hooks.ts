/**
 * Factory Hooks - Custom hooks for programmatic factory usage
 */

import { useCallback } from 'react';
import { factoryRegistry } from './factory-registry';

export function useFactoryBridge() {
  const createFactoryComponent = useCallback((
    factoryName: string,
    config: Record<string, any> = {}
  ): Promise<HTMLElement | null> => {
    return new Promise((resolve, reject) => {
      try {
        const factoryInstance = factoryRegistry.getFactory(factoryName);
        if (!factoryInstance) {
          reject(new Error(`Factory ${factoryName} not found`));
          return;
        }

        let element: HTMLElement;
        if (typeof factoryInstance === 'function') {
          const result = factoryInstance(config || {});
          element = (result as any)?.element || result;
        } else if ((factoryInstance as any)?.create) {
          const result = (factoryInstance as any).create(config || {});
          element = (result as any)?.element || result;
        } else {
          reject(new Error(`Factory ${factoryName} doesn't have a creation method`));
          return;
        }

        resolve(element);
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  return {
    createFactoryComponent,
    availableFactories: factoryRegistry.getAvailableFactories(),
    hasFactory: (name: string) => factoryRegistry.hasFactory(name),
    getFactory: (name: string) => factoryRegistry.getFactory(name)
  };
}

export function useFactory(factoryName: string) {
  const factoryInstance = factoryRegistry.getFactory(factoryName);

  const createInstance = useCallback((config: Record<string, any> = {}) => {
    if (!factoryInstance) {
      console.error(`Factory ${factoryName} not found`);
      return null;
    }

    try {
      if (typeof factoryInstance === 'function') {
        return factoryInstance(config);
      } else if ((factoryInstance as any)?.create) {
        return (factoryInstance as any).create(config);
      } else {
        console.error(`Factory ${factoryName} doesn't have a creation method`);
        return null;
      }
    } catch (error) {
      console.error(`Error creating instance of ${factoryName}:`, error);
      return null;
    }
  }, [factoryName, factoryInstance]);

  return {
    createInstance,
    isAvailable: !!factoryInstance,
    factory: factoryInstance
  };
}
