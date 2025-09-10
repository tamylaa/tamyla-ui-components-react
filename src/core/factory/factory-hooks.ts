/**
 * Factory Hooks - Custom hooks for programmatic factory usage
 */

import { useCallback } from 'react';
import { factoryRegistry } from './factory-registry';
import logger from '../../utils/logger';

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
          element = (result as { element?: HTMLElement })?.element || (result as HTMLElement);
        } else if ((factoryInstance as { create?: unknown })?.create) {
          const result = ((factoryInstance as { create?: (config: Record<string, any>) => unknown }).create as (config: Record<string, any>) => unknown)(config || {});
          element = (result as { element?: HTMLElement })?.element || (result as HTMLElement);
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
      logger.error(`Factory ${factoryName} not found`, null, 'FactoryHooks');
      return null;
    }

    try {
      if (typeof factoryInstance === 'function') {
        return factoryInstance(config);
      } else if ((factoryInstance as any)?.create) {
        return (factoryInstance as any).create(config);
      } else {
        logger.error(`Factory ${factoryName} doesn't have a creation method`, null, 'FactoryHooks');
        return null;
      }
    } catch (error) {
      logger.error(`Error creating instance of ${factoryName}`, { error }, 'FactoryHooks');
      return null;
    }
  }, [factoryName, factoryInstance]);

  return {
    createInstance,
    isAvailable: !!factoryInstance,
    factory: factoryInstance
  };
}
