/**
 * Dynamic UI Components Importer
 * Provides runtime dynamic import functionality for @tamyla/ui-components
 * This prevents TypeScript compilation errors when the peer dependency is not available
 */

import type { ComponentFactory, FactoryConfig } from '../types/common';
import logger from './logger';
import { safeDynamicImport } from './async-safety';

// Local interface for AbortSignal to avoid ESLint issues
interface AbortSignalLike {
  readonly aborted: boolean;
  readonly reason?: unknown;
  addEventListener(type: 'abort', listener: () => void, options?: { once?: boolean }): void;
  removeEventListener(type: 'abort', listener: () => void): void;
}

export interface UIComponentsModule {
  // Factory types
  ButtonFactory?: unknown;
  InputFactory?: unknown;
  CardFactory?: unknown;
  SearchBarFactory?: unknown;
  ActionCardFactory?: unknown;
  SearchInterfaceFactory?: unknown;
  StatusIndicatorFactory?: unknown;
  ContentCardFactory?: unknown;
  FileListFactory?: unknown;
  NotificationFactory?: unknown;
  CampaignSelectorSystem?: unknown;
  ContentManagerApplicationFactory?: unknown;
  EnhancedSearchApplicationFactory?: unknown;
  TamylaUISystem?: unknown;
  RewardSystem?: unknown;
  InputGroupFactory?: unknown;
  OrganismTemplates?: unknown;
  OrganismFactory?: unknown;

  // Utility functions
  createFactory?: unknown;
  FactoryRegistry?: unknown;

  // Other exports
  [key: string]: unknown;
}

/**
 * Dynamically imports @tamyla/ui-components if available
 * Returns null if the module is not available (e.g., in CI environments)
 */
export async function dynamicImportUIComponents(
  signal?: AbortSignalLike
): Promise<UIComponentsModule | null> {
  const moduleSpecifier = '@tamyla/ui-components';

  const result = await safeDynamicImport<UIComponentsModule>(moduleSpecifier, {
    timeout: 10000,
    retries: 2,
    retryDelay: 1000,
    signal,
    onError: (error) => {
      logger.warn('@tamyla/ui-components import failed', {
        error: error.message,
        moduleSpecifier
      }, 'DynamicUI');
    },
    onTimeout: () => {
      logger.warn('@tamyla/ui-components import timed out', { moduleSpecifier }, 'DynamicUI');
    }
  });

  if (result && process.env.NODE_ENV === 'development') {
    logger.info('Successfully loaded @tamyla/ui-components', null, 'DynamicUI');
  }

  return result;
}

/**
 * Gets a specific factory from @tamyla/ui-components with fallback
 */
export async function getUIComponentFactory(factoryName: string): Promise<unknown | null> {
  try {
    const uiComponents = await dynamicImportUIComponents();

    if (!uiComponents) {
      logger.warn(`Cannot get ${factoryName}: @tamyla/ui-components not available`, null, 'DynamicUI');
      return null;
    }

    const factory = uiComponents[factoryName];
    if (!factory) {
      logger.warn(`Factory ${factoryName} not found in @tamyla/ui-components`, null, 'DynamicUI');
      return null;
    }

    logger.info(`Successfully loaded factory: ${factoryName}`, null, 'DynamicUI');
    return factory;
  } catch (error) {
    logger.error(`Error loading factory ${factoryName}`, { error }, 'DynamicUI');
    return null;
  }
}

/**
 * Checks if @tamyla/ui-components is available without importing it
 */
export async function isUIComponentsAvailable(): Promise<boolean> {
  try {
    await dynamicImportUIComponents();
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets multiple factories at once with fallback
 */
export async function getUIComponentFactories(factoryNames: string[]): Promise<Record<string, ComponentFactory>> {
  const factories: Record<string, ComponentFactory> = {};

  try {
    const uiComponents = await dynamicImportUIComponents();

    if (!uiComponents) {
      logger.warn('Cannot get factories: @tamyla/ui-components not available', null, 'DynamicUI');
      return factories;
    }

    for (const factoryName of factoryNames) {
      const factory = uiComponents[factoryName];
      if (factory && typeof factory === 'object' && 'create' in factory) {
        factories[factoryName] = factory as ComponentFactory;
        logger.info(`Loaded factory: ${factoryName}`, null, 'DynamicUI');
      } else {
        logger.warn(`Factory ${factoryName} not found or invalid`, null, 'DynamicUI');
      }
    }

    return factories;
  } catch (error) {
    logger.error('Error loading factories', { error }, 'DynamicUI');
    return factories;
  }
}

/**
 * Creates a mock factory for development/testing when real ones aren't available
 */
export function createMockFactory(factoryName: string): ComponentFactory {
  return {
    create: (config: FactoryConfig = {}) => {
      logger.debug(`Mock ${factoryName} create called`, { config }, 'MockFactory');
      return {
        element: document.createElement('div'),
        destroy: () => {
          logger.debug(`Mock ${factoryName} destroyed`, null, 'MockFactory');
        },
        update: (newConfig: FactoryConfig) => {
          logger.debug(`Mock ${factoryName} updated`, { newConfig }, 'MockFactory');
        }
      };
    },

    // Enhanced methods
    enableTradingPortalPatterns: () => {
      logger.debug(`Mock ${factoryName} enableTradingPortalPatterns called`, null, 'MockFactory');
      return { success: true, patterns: ['mock-pattern'] };
    },

    selectionManager: {
      on: (event: string, callback: (...args: any[]) => any) => {
        logger.debug(`Mock ${factoryName} selectionManager.on(${event}) called`, null, 'MockFactory');
        return callback;
      }
    },

    setResults: (results: unknown[]) => {
      logger.debug(`Mock ${factoryName} setResults called`, { results }, 'MockFactory');
    },

    createSearchInterface: (config: FactoryConfig = {}) => {
      logger.debug(`Mock ${factoryName} createSearchInterface called`, { config }, 'MockFactory');
      return { element: document.createElement('div'), config };
    }
  };
}
