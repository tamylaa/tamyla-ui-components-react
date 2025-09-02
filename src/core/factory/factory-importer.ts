/**
 * Factory Importer - Handles safe importing of ui-components factories
 * Uses lazy loading to avoid DOM access during module initialization
 */

export class FactoryImporter {
  private static instance: FactoryImporter | null = null;
  private factories: Map<string, any> = new Map();
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    // Ensure mock factories are available immediately for SSR/development
    this.createMockFactories();
    // Start async initialization for real factories
    this.initializationPromise = this.initializeFactories();
  }

  static getInstance(): FactoryImporter {
    if (!FactoryImporter.instance) {
      FactoryImporter.instance = new FactoryImporter();
    }
    return FactoryImporter.instance;
  }

  private async initializeFactories(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    try {
      // Try to import factories from @tamyla/ui-components
      await this.loadFactoriesFromUIComponents();
    } catch (error) {
      console.warn('FactoryImporter: Failed to load factories:', error);
    }
  }

  private async loadFactoriesFromUIComponents(): Promise<void> {
    try {
      // Only load in browser environment
      if (typeof window === 'undefined') {
        return; // Keep using mock factories in SSR
      }

      // Import the main UI components module
      const uiComponents = await import('@tamyla/ui-components');
      
      // Clear mock factories and load real ones
      this.factories.clear();
      this.loadFromModule(uiComponents);
      
      // Success - factories loaded from @tamyla/ui-components
    } catch (error) {
      // Fallback to mock factories if import fails
      if (this.factories.size === 0) {
        this.createMockFactories();
      }
    }
  }

  private createMockFactories(): void {
    // Create functional mock factories that return proper DOM elements
    const createInputFactory = () => ({
      create: (props: any = {}) => {
        const input = document.createElement('input');
        input.className = 'tamyla-input';
        if (props.placeholder) input.placeholder = props.placeholder;
        if (props.value) input.value = props.value;
        if (props.type) input.type = props.type;
        if (props.disabled) input.disabled = props.disabled;
        return input;
      }
    });

    const createButtonFactory = () => ({
      create: (props: any = {}) => {
        const button = document.createElement('button');
        button.className = 'tamyla-button';
        button.textContent = props.text || props.children || 'Button';
        if (props.disabled) button.disabled = props.disabled;
        return button;
      },
      createPrimary: (props: any = {}) => {
        const button = createButtonFactory().create(props);
        button.className += ' tamyla-button-primary';
        return button;
      },
      createSecondary: (props: any = {}) => {
        const button = createButtonFactory().create(props);
        button.className += ' tamyla-button-secondary';
        return button;
      }
    });

    const createCardFactory = () => ({
      create: (props: any = {}) => {
        const card = document.createElement('div');
        card.className = 'tamyla-card';
        if (props.title) {
          const title = document.createElement('h3');
          title.textContent = props.title;
          card.appendChild(title);
        }
        if (props.content || props.children) {
          const content = document.createElement('div');
          content.textContent = props.content || props.children;
          card.appendChild(content);
        }
        return card;
      }
    });

    const createSearchBarFactory = () => ({
      create: (props: any = {}) => {
        const container = document.createElement('div');
        container.className = 'tamyla-search-bar';
        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = props.placeholder || 'Search...';
        container.appendChild(input);
        return container;
      }
    });

    // Set up functional mock factories
    this.factories.set('ButtonFactory', createButtonFactory());
    this.factories.set('InputFactory', createInputFactory());
    this.factories.set('CardFactory', createCardFactory());
    this.factories.set('SearchBarFactory', createSearchBarFactory());
    this.factories.set('ActionCardFactory', createCardFactory()); // Reuse card
    this.factories.set('ContentCardFactory', createCardFactory());
    this.factories.set('FileListFactory', () => ({ create: () => document.createElement('div') }));
    this.factories.set('NotificationFactory', () => ({ create: () => document.createElement('div') }));
    this.factories.set('SearchInterfaceFactory', createSearchBarFactory());
    this.factories.set('StatusIndicatorFactory', () => ({ create: () => document.createElement('span') }));
    
    // Mock factories are now available
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
    // Factories should always be available (mock or real)
    return this.factories.get(name);
  }

  async getFactoryAsync(name: string): Promise<any> {
    // Wait for initialization to complete
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
    return this.factories.get(name);
  }

  hasFactory(name: string): boolean {
    return this.factories.has(name);
  }

  getAllFactories(): Record<string, any> {
    return Object.fromEntries(this.factories);
  }

  getAvailableFactories(): string[] {
    return Array.from(this.factories.keys());
  }
}

// Export singleton instance
export const factoryImporter = FactoryImporter.getInstance();
