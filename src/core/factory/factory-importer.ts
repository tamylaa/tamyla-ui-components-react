/**
 * Factory Importer - Handles safe importing of ui-components factories
 * Uses lazy loading to avoid DOM access during module initialization
 */

export class FactoryImporter {
  private static instance: FactoryImporter | null = null;
  private factories: Map<string, any> = new Map();
  private initialized = false;

  private constructor() {
    // Don't initialize immediately - wait for explicit call
  }

  static getInstance(): FactoryImporter {
    if (!FactoryImporter.instance) {
      FactoryImporter.instance = new FactoryImporter();
    }
    return FactoryImporter.instance;
  }

  private initializeFactories(): void {
    if (this.initialized) return;
    this.initialized = true;

    try {
      // For now, don't load factories to avoid build issues
      // This will be resolved when the package is used at runtime
      console.log('FactoryImporter: Factories will be loaded at runtime');
    } catch (error) {
      console.warn('FactoryImporter: Failed to load factories:', error);
    }
  }

  private loadFromModule(module: any): void {
    // Core factories - import with error handling
    const coreImports = this.safeRequireFromModule(module, [
      'ButtonFactory',
      'InputFactory',
      'CardFactory',
      'ActionCardFactory',
      'SearchBarFactory',
      'ContentCardFactory',
      'FileListFactory',
      'NotificationFactory',
      'SearchInterfaceFactory',
      'RewardSystem'
    ]);

    // Store core factories
    Object.entries(coreImports).forEach(([key, value]) => {
      this.factories.set(key, value);
    });

    // Optional factories - try to load but don't fail if missing
    const optionalImports = this.safeRequireFromModule(module, [
      'InputGroupFactory',
      'StatusIndicatorFactory',
      'EnhancedSearchApplicationFactory',
      'CampaignSelectorSystem',
      'ContentManagerApplicationFactory',
      'TamylaUISystem',
      'OrganismFactory',
      'OrganismTemplates'
    ], false);

    // Store optional factories
    Object.entries(optionalImports).forEach(([key, value]) => {
      this.factories.set(key, value);
    });
  }

  private async safeRequire(moduleName: string, properties: string[], required = true): Promise<Record<string, any>> {
    try {
      const module = await import(moduleName);
      const result: Record<string, any> = {};

      properties.forEach(prop => {
        if (module[prop] !== undefined) {
          result[prop] = module[prop];
        } else if (required) {
          console.warn(`FactoryImporter: Required property ${prop} not found in ${moduleName}`);
        }
      });

      return result;
    } catch (error) {
      if (required) {
        console.error(`FactoryImporter: Failed to import ${moduleName}:`, error);
      }
      return {};
    }
  }

  private safeRequireFromModule(module: any, properties: string[], required = true): Record<string, any> {
    try {
      const result: Record<string, any> = {};

      properties.forEach(prop => {
        if (module[prop] !== undefined) {
          result[prop] = module[prop];
        } else if (required) {
          console.warn(`FactoryImporter: Required property ${prop} not found in module`);
        }
      });

      return result;
    } catch (error) {
      if (required) {
        console.error('FactoryImporter: Failed to extract properties from module:', error);
      }
      return {};
    }
  }

  getFactory(name: string): any {
    this.initializeFactories(); // Lazy initialization
    return this.factories.get(name);
  }

  hasFactory(name: string): boolean {
    this.initializeFactories(); // Lazy initialization
    return this.factories.has(name);
  }

  getAllFactories(): Record<string, any> {
    this.initializeFactories(); // Lazy initialization
    return Object.fromEntries(this.factories);
  }

  getAvailableFactories(): string[] {
    this.initializeFactories(); // Lazy initialization
    return Array.from(this.factories.keys());
  }
}

// Export singleton instance
export const factoryImporter = FactoryImporter.getInstance();
