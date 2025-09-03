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
      
      // Don't clear mock factories - instead, replace them selectively
      // this.factories.clear(); // REMOVED - keep mock factories as fallbacks
      this.loadFromModule(uiComponents);
      
      // Success - factories loaded from @tamyla/ui-components
      console.log('✅ Real factories loaded from @tamyla/ui-components');
    } catch (error) {
      console.warn('FactoryImporter: Failed to load real factories, using mocks:', error);
      // Fallback to mock factories if import fails
      if (this.factories.size === 0) {
        this.createMockFactories();
      }
    }
  }

  private createMockFactories(): void {
    // Create functional mock factories that return proper DOM elements
    // ALL factories follow the same pattern: { create: (props) => HTMLElement }
    
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
      },
      createGhost: (props: any = {}) => {
        const btn = createButtonFactory().create({ ...props, variant: 'ghost' });
        btn.style.background = 'transparent';
        btn.style.border = '1px solid #007acc';
        btn.style.color = '#007acc';
        return btn;
      },
      createDanger: (props: any = {}) => {
        return createButtonFactory().create({ ...props, variant: 'danger' });
      },
      createSuccess: (props: any = {}) => {
        return createButtonFactory().create({ ...props, variant: 'success' });
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

    // Standardized factory creator for simple components
    const createStandardFactory = (elementType: string, className: string, defaultContent?: string) => ({
      create: (props: any = {}) => {
        const element = document.createElement(elementType);
        element.className = className;
        element.style.cssText = 'padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f8f9fa; font-family: inherit;';
        
        if (props.content) {
          element.textContent = props.content;
        } else if (props.children) {
          element.textContent = props.children;
        } else {
          element.textContent = defaultContent || `Mock ${className}`;
        }
        
        return element;
      }
    });

    // Set up ALL factory instances with consistent structure
    // Every factory is an object with a 'create' method
    this.factories.set('ButtonFactory', createButtonFactory());
    this.factories.set('InputFactory', createInputFactory());
    this.factories.set('CardFactory', createCardFactory());
    this.factories.set('SearchBarFactory', createSearchBarFactory());
    this.factories.set('ActionCardFactory', createActionCardFactory());
    this.factories.set('SearchInterfaceFactory', createSearchInterfaceFactory());
    this.factories.set('StatusIndicatorFactory', createStandardFactory('span', 'tamyla-status-indicator', 'Status'));
    
    // All the following factories use the same consistent pattern
    this.factories.set('ContentCardFactory', createCardFactory()); // Reuse card factory
    this.factories.set('FileListFactory', createStandardFactory('div', 'tamyla-file-list', 'File List'));
    this.factories.set('NotificationFactory', createStandardFactory('div', 'tamyla-notification', 'Notification'));
    this.factories.set('CampaignSelectorSystem', createStandardFactory('div', 'tamyla-campaign-selector', 'Campaign Selector'));
    this.factories.set('ContentManagerApplicationFactory', createStandardFactory('div', 'tamyla-content-manager', 'Content Manager'));
    this.factories.set('EnhancedSearchApplicationFactory', createSearchInterfaceFactory()); // Reuse search interface
    this.factories.set('TamylaUISystem', createStandardFactory('div', 'tamyla-ui-system', 'Tamyla UI System'));
    this.factories.set('RewardSystem', createStandardFactory('div', 'tamyla-reward-system', 'Reward System'));
    this.factories.set('InputGroupFactory', createStandardFactory('div', 'tamyla-input-group', 'Input Group'));
    this.factories.set('OrganismTemplates', createStandardFactory('div', 'tamyla-organism-templates', 'Organism Templates'));
    
    // Special OrganismFactory with multiple methods
    this.factories.set('OrganismFactory', {
      create: (type: string, props: any = {}) => {
        const factory = this.factories.get(`${type}Factory`);
        if (factory && typeof factory.create === 'function') {
          return factory.create(props);
        }
        return createStandardFactory('div', `tamyla-${type}`, `${type} Organism`).create(props);
      },
      createSearchInterface: (props: any = {}) => createSearchInterfaceFactory().create(props)
    });
    
    console.log('✅ ALL mock factories created with consistent structure');
    console.log('Available factories:', Array.from(this.factories.keys()));
  }

  private loadFromModule(module: any): void {
    console.log('🔄 Loading factories from module...');
    
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

    // Store core factories (only if they're valid, and normalize them)
    Object.entries(coreImports).forEach(([key, value]) => {
      const normalizedFactory = this.normalizeFactory(value);
      if (this.isValidFactory(normalizedFactory)) {
        this.factories.set(key, normalizedFactory);
        console.log(`✅ Loaded and normalized real factory: ${key}`);
      } else {
        console.warn(`⚠️ Invalid factory ${key}, keeping mock`);
      }
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

    // Store optional factories (only if they're valid, and normalize them)
    Object.entries(optionalImports).forEach(([key, value]) => {
      const normalizedFactory = this.normalizeFactory(value);
      if (this.isValidFactory(normalizedFactory)) {
        this.factories.set(key, normalizedFactory);
        console.log(`✅ Loaded and normalized optional factory: ${key}`);
      } else if (value !== undefined) {
        console.warn(`⚠️ Invalid optional factory ${key}, keeping mock`);
      }
    });
  }

  /**
   * Normalize any factory structure to use the consistent create method pattern
   */
  private normalizeFactory(factory: any): any {
    if (!factory) return null;

    // If it's already an object with a create method, return as-is
    if (typeof factory === 'object' && typeof factory.create === 'function') {
      return factory;
    }

    // If it's a direct function, wrap it in an object with create method
    if (typeof factory === 'function') {
      return {
        create: (props: any = {}) => {
          try {
            // Call the function with props including container
            const result = factory(props);
            
            // If result is already a DOM element, return it
            if (result instanceof HTMLElement) {
              return result;
            }
            
            // If result has an element property, return it
            if (result && typeof result === 'object' && result.element instanceof HTMLElement) {
              return result.element;
            }
            
            // If result has render method, call it with container
            if (result && typeof result === 'object' && typeof result.render === 'function') {
              const rendered = result.render(props.container);
              if (rendered instanceof HTMLElement) {
                return rendered;
              }
              // If render returns string, convert to element
              if (typeof rendered === 'string') {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = rendered;
                return wrapper;
              }
            }
            
            // If function returned a string, convert to element
            if (typeof result === 'string') {
              const element = document.createElement('div');
              element.innerHTML = result;
              return element;
            }
            
            // Create fallback element
            const element = document.createElement('div');
            element.className = 'tamyla-function-factory';
            element.textContent = `Function factory: ${factory.name || 'unnamed'}`;
            return element;
            
          } catch (error) {
            console.warn(`Function factory error for ${factory.name || 'unnamed'}:`, error);
            const element = document.createElement('div');
            element.className = 'tamyla-function-factory-error';
            element.textContent = `Function factory error: ${error instanceof Error ? error.message : 'Unknown error'}`;
            return element;
          }
        }
      };
    }

    // If it's a class constructor, wrap it properly
    if (typeof factory === 'function' && factory.prototype && factory.prototype.constructor === factory) {
      return {
        create: (props: any = {}) => {
          try {
            const instance = new factory(props);
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
            element.className = `tamyla-${factory.name.toLowerCase()}`;
            element.textContent = `${factory.name} Instance`;
            return element;
          } catch (error) {
            console.warn(`Failed to instantiate ${factory.name}:`, error);
            // Return fallback element
            const element = document.createElement('div');
            element.className = `tamyla-${factory.name.toLowerCase()}-fallback`;
            element.textContent = `${factory.name} (Fallback)`;
            return element;
          }
        }
      };
    }

    // Handle objects that might have other factory patterns
    if (typeof factory === 'object') {
      // Check for common factory patterns and try to normalize them
      const possibleMethods = ['render', 'createElement', 'build', 'generate'];
      
      for (const method of possibleMethods) {
        if (typeof factory[method] === 'function') {
          return {
            create: factory[method].bind(factory)
          };
        }
      }
      
      // If it's an object with properties but no obvious factory method,
      // treat it as a factory config and create a simple factory
      if (Object.keys(factory).length > 0) {
        return {
          create: (props: any = {}) => {
            const element = document.createElement('div');
            element.className = 'tamyla-normalized-factory';
            element.textContent = `Normalized Factory (${Object.keys(factory).join(', ')})`;
            
            // Apply any style or config from the factory object
            if (factory.style) {
              Object.assign(element.style, factory.style);
            }
            
            return element;
          }
        };
      }
    }

    // If we can't normalize it, return null (will be caught by validation)
    console.warn('Unable to normalize factory:', factory);
    return null;
  }

  private isValidFactory(factory: any): boolean {
    if (!factory) return false;
    
    // After normalization, all factories should be objects with create methods
    return typeof factory === 'object' && typeof factory.create === 'function';
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
                  
                  // If the instance has a render method, call it with container
                  if (instance.render && typeof instance.render === 'function') {
                    const renderResult = instance.render(props?.container);
                    // Ensure we return a DOM element
                    if (renderResult instanceof HTMLElement) {
                      return renderResult;
                    }
                    // If render doesn't return a DOM element, create one
                    const wrapper = document.createElement('div');
                    wrapper.className = `tamyla-${prop.toLowerCase()}-wrapper`;
                    if (typeof renderResult === 'string') {
                      wrapper.innerHTML = renderResult;
                    } else {
                      wrapper.textContent = `${prop} Rendered`;
                    }
                    return wrapper;
                  }
                  
                  // If the instance has an element property, return it
                  if (instance.element instanceof HTMLElement) {
                    return instance.element;
                  }
                  
                  // If instance has initialize method, call it
                  if (instance.initialize && typeof instance.initialize === 'function') {
                    try {
                      instance.initialize(props?.container);
                    } catch (initError) {
                      console.warn(`Failed to initialize ${prop}:`, initError);
                    }
                    // Check again for element after initialization
                    if (instance.element instanceof HTMLElement) {
                      return instance.element;
                    }
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
