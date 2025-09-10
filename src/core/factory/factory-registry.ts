/**
 * Factory Registry - Manages factory instances and mappings
 * Provides safe access to factory methods with error handling
 */

import { factoryImporter } from './factory-importer';
import logger from '../../utils/logger';
import type { FactoryFunction } from '../../types/factory';

export class FactoryRegistry {
  private static instance: FactoryRegistry;
  private factoryMap: Map<string, FactoryFunction> = new Map();

  private constructor() {
    this.initializeFactories();
  }

  static getInstance(): FactoryRegistry {
    if (!FactoryRegistry.instance) {
      FactoryRegistry.instance = new FactoryRegistry();
    }
    return FactoryRegistry.instance;
  }

  private initializeFactories(): void {
    // ALL factories now use the consistent .create() method pattern

    // Button factories
    this.registerFactory('Button', () => this.safeCall(factoryImporter.getFactory('ButtonFactory'), 'create'));
    this.registerFactory('ButtonPrimary', () => this.safeCall(factoryImporter.getFactory('ButtonFactory'), 'createPrimary'));
    this.registerFactory('ButtonSecondary', () => this.safeCall(factoryImporter.getFactory('ButtonFactory'), 'createSecondary'));
    this.registerFactory('ButtonGhost', () => this.safeCall(factoryImporter.getFactory('ButtonFactory'), 'createGhost'));
    this.registerFactory('ButtonDanger', () => this.safeCall(factoryImporter.getFactory('ButtonFactory'), 'createDanger'));
    this.registerFactory('ButtonSuccess', () => this.safeCall(factoryImporter.getFactory('ButtonFactory'), 'createSuccess'));

    // Input factories
    this.registerFactory('Input', () => this.safeCall(factoryImporter.getFactory('InputFactory'), 'create'));
    this.registerFactory('InputGroup', () => this.safeCall(factoryImporter.getFactory('InputGroupFactory'), 'create'));

    // Card factories
    this.registerFactory('Card', () => this.safeCall(factoryImporter.getFactory('CardFactory'), 'create'));

    // Other component factories
    this.registerFactory('ActionCard', () => this.safeCall(factoryImporter.getFactory('ActionCardFactory'), 'create'));
    this.registerFactory('SearchBar', () => this.safeCall(factoryImporter.getFactory('SearchBarFactory'), 'create'));
    this.registerFactory('ContentCard', () => this.safeCall(factoryImporter.getFactory('ContentCardFactory'), 'create'));
    this.registerFactory('FileList', () => this.safeCall(factoryImporter.getFactory('FileListFactory'), 'create'));
    this.registerFactory('Notification', () => this.safeCall(factoryImporter.getFactory('NotificationFactory'), 'create'));
    this.registerFactory('SearchInterface', () => this.safeCall(factoryImporter.getFactory('SearchInterfaceFactory'), 'create'));

    // Status and indicator factories
    this.registerFactory('StatusIndicator', () => this.safeCall(factoryImporter.getFactory('StatusIndicatorFactory'), 'create'));

    // Application factories - all use .create() method
    this.registerFactory('EnhancedSearch', () => this.safeCall(factoryImporter.getFactory('EnhancedSearchApplicationFactory'), 'create'));
    this.registerFactory('CampaignSelector', () => this.safeCall(factoryImporter.getFactory('CampaignSelectorSystem'), 'create'));
    this.registerFactory('ContentManager', () => this.safeCall(factoryImporter.getFactory('ContentManagerApplicationFactory'), 'create'));
    this.registerFactory('TamylaUI', () => this.safeCall(factoryImporter.getFactory('TamylaUISystem'), 'create'));

    // Organism factories
    this.registerFactory('OrganismFactory', () => this.safeCall(factoryImporter.getFactory('OrganismFactory'), 'create'));
    this.registerFactory('OrganismTemplates', () => this.safeCall(factoryImporter.getFactory('OrganismTemplates'), 'create'));

    // Reward system
    this.registerFactory('Reward', () => this.safeCall(factoryImporter.getFactory('RewardSystem'), 'create'));
  }

  private registerFactory(name: string, factoryFn: () => unknown): void {
    this.factoryMap.set(name, factoryFn);
  }

  private safeCall(factory: unknown, method?: string): unknown {
    try {
      if (!factory) {
        logger.warn('Factory is null/undefined', null, 'FactoryRegistry');
        return null;
      }

      // If factory is a class, instantiate it first
      if (typeof factory === 'function' && factory.prototype && factory.prototype.constructor === factory) {
        const instance = new (factory as new () => unknown)();

        if (method) {
          if (typeof (instance as Record<string, any>)[method] === 'function') {
            return (instance as Record<string, any>)[method] as () => unknown;
          } else {
            logger.warn(`Method ${method} not found on factory instance`, null, 'FactoryRegistry');
            return null;
          }
        }

        // If no method specified but instance has create method, return that
        if (typeof (instance as Record<string, any>).create === 'function') {
          return (instance as Record<string, any>).create as () => unknown;
        }

        return instance;
      }

      if (method) {
        if (typeof (factory as Record<string, any>)[method] === 'function') {
          return (factory as Record<string, any>)[method] as () => unknown;
        } else {
          logger.warn(`Method ${method} not found on factory`, null, 'FactoryRegistry');
          return null;
        }
      }

      // If no method specified, check if it has a create method (consistent pattern)
      if (typeof (factory as Record<string, any>)?.create === 'function') {
        return (factory as Record<string, any>).create as () => unknown;
      }

      // Legacy fallback: if it's a direct function
      if (typeof factory === 'function') {
        return factory;
      }

      logger.warn('Factory does not have a create method or is not a function', null, 'FactoryRegistry');
      return null;
    } catch (error) {
      logger.error('Error calling factory method', { error }, 'FactoryRegistry');
      return null;
    }
  }

  getFactory(name: string): unknown {
    const factoryFn = this.factoryMap.get(name);
    if (!factoryFn) {
      logger.warn(`Factory ${name} not found`, null, 'FactoryRegistry');
      return null;
    }

    try {
      return factoryFn();
    } catch (error) {
      logger.error(`Error getting factory ${name}`, { error }, 'FactoryRegistry');
      return null;
    }
  }

  hasFactory(name: string): boolean {
    return this.factoryMap.has(name);
  }

  getAvailableFactories(): string[] {
    return Array.from(this.factoryMap.keys());
  }

  getFactoryMap(): Map<string, any> {
    return new Map(this.factoryMap);
  }
}

// Export singleton instance
export const factoryRegistry = FactoryRegistry.getInstance();
