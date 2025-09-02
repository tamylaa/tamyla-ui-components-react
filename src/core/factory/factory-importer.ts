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
        const container = document.createElement('div');
        container.className = 'tamyla-input-container';
        
        if (props.label) {
          const label = document.createElement('label');
          label.textContent = props.label;
          label.className = 'tamyla-input-label';
          container.appendChild(label);
        }
        
        const input = document.createElement('input');
        input.className = 'tamyla-input';
        input.style.cssText = 'width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-family: inherit;';
        
        if (props.placeholder) input.placeholder = props.placeholder;
        if (props.value) input.value = props.value;
        if (props.type) input.type = props.type;
        if (props.disabled) input.disabled = props.disabled;
        if (props.required) input.required = props.required;
        
        container.appendChild(input);
        return container;
      }
    });

    const createButtonFactory = () => ({
      create: (props: any = {}) => {
        const button = document.createElement('button');
        button.className = 'tamyla-button';
        button.textContent = props.text || props.children || 'Button';
        button.style.cssText = 'padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-family: inherit; background: #007acc; color: white;';
        
        if (props.disabled) button.disabled = props.disabled;
        if (props.onClick && typeof props.onClick === 'function') {
          button.addEventListener('click', props.onClick);
        }
        
        // Apply variant styles
        if (props.variant === 'primary') button.style.background = '#007acc';
        if (props.variant === 'secondary') button.style.background = '#6c757d';
        if (props.variant === 'success') button.style.background = '#28a745';
        if (props.variant === 'warning') button.style.background = '#ffc107';
        if (props.variant === 'danger') button.style.background = '#dc3545';
        
        return button;
      },
      createPrimary: (props: any = {}) => {
        return createButtonFactory().create({ ...props, variant: 'primary' });
      },
      createSecondary: (props: any = {}) => {
        return createButtonFactory().create({ ...props, variant: 'secondary' });
      }
    });

    const createCardFactory = () => ({
      create: (props: any = {}) => {
        const card = document.createElement('div');
        card.className = 'tamyla-card';
        card.style.cssText = 'border: 1px solid #e1e5e9; border-radius: 8px; padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 8px 0;';
        
        if (props.title) {
          const title = document.createElement('h3');
          title.textContent = props.title;
          title.style.cssText = 'margin: 0 0 12px 0; font-size: 1.2em; color: #333;';
          card.appendChild(title);
        }
        
        if (props.content || props.children) {
          const content = document.createElement('div');
          content.textContent = props.content || props.children;
          content.style.cssText = 'color: #666; line-height: 1.5;';
          card.appendChild(content);
        }
        
        return card;
      }
    });

    const createSearchBarFactory = () => ({
      create: (props: any = {}) => {
        const container = document.createElement('div');
        container.className = 'tamyla-search-bar';
        container.style.cssText = 'position: relative; width: 100%;';
        
        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = props.placeholder || 'Search...';
        input.style.cssText = 'width: 100%; padding: 12px 40px 12px 16px; border: 1px solid #ccc; border-radius: 24px; font-family: inherit; outline: none;';
        
        const searchIcon = document.createElement('div');
        searchIcon.innerHTML = '🔍';
        searchIcon.style.cssText = 'position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #666; pointer-events: none;';
        
        container.appendChild(input);
        container.appendChild(searchIcon);
        
        // Add search functionality
        if (props.onSearch && typeof props.onSearch === 'function') {
          input.addEventListener('input', (e) => {
            props.onSearch((e.target as HTMLInputElement).value);
          });
        }
        
        return container;
      }
    });

    const createActionCardFactory = () => ({
      create: (props: any = {}) => {
        const card = createCardFactory().create(props);
        
        if (props.actionText || props.secondaryActions) {
          const actionContainer = document.createElement('div');
          actionContainer.style.cssText = 'margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;';
          
          if (props.actionText) {
            const actionBtn = createButtonFactory().create({
              text: props.actionText,
              variant: 'primary',
              onClick: props.onAction
            });
            actionContainer.appendChild(actionBtn);
          }
          
          if (props.secondaryActions && Array.isArray(props.secondaryActions)) {
            props.secondaryActions.forEach((action: any) => {
              const secondaryBtn = createButtonFactory().create({
                text: action.text,
                variant: 'secondary',
                onClick: action.onClick
              });
              actionContainer.appendChild(secondaryBtn);
            });
          }
          
          card.appendChild(actionContainer);
        }
        
        return card;
      }
    });

    const createSearchInterfaceFactory = () => ({
      create: (props: any = {}) => {
        const container = document.createElement('div');
        container.className = 'tamyla-search-interface';
        container.style.cssText = 'border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; background: white;';
        
        if (props.title) {
          const title = document.createElement('h2');
          title.textContent = props.title;
          title.style.cssText = 'margin: 0 0 16px 0; color: #333;';
          container.appendChild(title);
        }
        
        const searchBar = createSearchBarFactory().create({
          placeholder: props.placeholder || 'Search...',
          onSearch: props.onSearch
        });
        container.appendChild(searchBar);
        
        if (props.showFilters && props.filters) {
          const filtersContainer = document.createElement('div');
          filtersContainer.style.cssText = 'margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;';
          
          props.filters.forEach((filter: any) => {
            if (filter.type === 'select') {
              const select = document.createElement('select');
              select.style.cssText = 'padding: 8px; border: 1px solid #ccc; border-radius: 4px;';
              
              filter.options?.forEach((option: any) => {
                const optionEl = document.createElement('option');
                optionEl.value = option.value;
                optionEl.textContent = option.label;
                select.appendChild(optionEl);
              });
              
              const filterLabel = document.createElement('label');
              filterLabel.textContent = filter.label;
              filterLabel.style.cssText = 'display: flex; flex-direction: column; gap: 4px; font-size: 0.9em;';
              filterLabel.appendChild(select);
              
              filtersContainer.appendChild(filterLabel);
            }
          });
          
          container.appendChild(filtersContainer);
        }
        
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = 'margin-top: 20px; min-height: 100px;';
        container.appendChild(resultsContainer);
        
        return container;
      }
    });

    const createBasicFactory = (elementType: string, className: string) => ({
      create: (props: any = {}) => {
        const element = document.createElement(elementType);
        element.className = className;
        element.style.cssText = 'padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa;';
        
        if (props.content) {
          element.textContent = props.content;
        } else if (props.children) {
          element.textContent = props.children;
        } else {
          element.textContent = `Mock ${className}`;
        }
        
        return element;
      }
    });

    // Set up all factory instances
    this.factories.set('ButtonFactory', createButtonFactory());
    this.factories.set('InputFactory', createInputFactory());
    this.factories.set('CardFactory', createCardFactory());
    this.factories.set('SearchBarFactory', createSearchBarFactory());
    this.factories.set('ActionCardFactory', createActionCardFactory());
    this.factories.set('ContentCardFactory', createCardFactory());
    this.factories.set('SearchInterfaceFactory', createSearchInterfaceFactory());
    this.factories.set('FileListFactory', createBasicFactory('div', 'tamyla-file-list'));
    this.factories.set('NotificationFactory', createBasicFactory('div', 'tamyla-notification'));
    this.factories.set('StatusIndicatorFactory', createBasicFactory('span', 'tamyla-status-indicator'));
    
    // Handle class-based factories that need instantiation
    this.factories.set('CampaignSelectorSystem', {
      create: (props: any = {}) => createBasicFactory('div', 'tamyla-campaign-selector').create(props)
    });
    
    this.factories.set('ContentManagerApplicationFactory', {
      create: (props: any = {}) => createBasicFactory('div', 'tamyla-content-manager').create(props)
    });
    
    // Additional organisms and applications
    this.factories.set('EnhancedSearchApplicationFactory', createSearchInterfaceFactory());
    this.factories.set('TamylaUISystem', createBasicFactory('div', 'tamyla-ui-system'));
    this.factories.set('OrganismFactory', {
      create: (type: string, props: any = {}) => {
        const factory = this.factories.get(`${type}Factory`);
        if (factory && typeof factory.create === 'function') {
          return factory.create(props);
        }
        return createBasicFactory('div', `tamyla-${type}`).create(props);
      },
      createSearchInterface: (props: any = {}) => createSearchInterfaceFactory().create(props)
    });
    
    console.log('✅ Mock factories created with proper DOM elements');
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
          let factory = module[prop];
          
          // Handle class constructors that need 'new'
          if (typeof factory === 'function' && factory.prototype && factory.prototype.constructor === factory) {
            // This is a class constructor - wrap it to handle instantiation
            factory = {
              create: (props: any = {}) => {
                try {
                  const instance = new module[prop](props);
                  // If the instance has a render method, call it to get DOM
                  if (instance.render && typeof instance.render === 'function') {
                    return instance.render();
                  }
                  // If the instance has an element property, return it
                  if (instance.element instanceof HTMLElement) {
                    return instance.element;
                  }
                  // Otherwise create a basic element
                  const element = document.createElement('div');
                  element.className = `tamyla-${prop.toLowerCase()}`;
                  element.textContent = `${prop} Instance`;
                  return element;
                } catch (error) {
                  console.warn(`Failed to instantiate ${prop}:`, error);
                  // Return fallback element
                  const element = document.createElement('div');
                  element.className = `tamyla-${prop.toLowerCase()}-fallback`;
                  element.textContent = `${prop} (Fallback)`;
                  return element;
                }
              }
            };
          }
          
          result[prop] = factory;
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
    const factory = this.factories.get(name);
    
    if (!factory) {
      console.warn(`FactoryImporter: No factory found for ${name}, creating fallback`);
      
      // Create a fallback factory on-demand
      const fallbackFactory = {
        create: (props: any = {}) => {
          const element = document.createElement('div');
          element.className = `tamyla-${name.toLowerCase()}-fallback`;
          element.style.cssText = 'padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; color: #666;';
          element.textContent = `${name} (Fallback)`;
          
          if (props.content) element.textContent = props.content;
          if (props.children) element.textContent = props.children;
          
          return element;
        }
      };
      
      // Store the fallback for future use
      this.factories.set(name, fallbackFactory);
      return fallbackFactory;
    }
    
    return factory;
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
