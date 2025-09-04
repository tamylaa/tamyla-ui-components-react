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
    this.createMockFactories();
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
      // Skip dynamic import in test environment
      if (typeof jest !== 'undefined' || process.env.NODE_ENV === 'test') {
        console.log('FactoryImporter: Skipping dynamic import in test environment');
        return;
      }

      // Only load in browser environment
      if (typeof window === 'undefined') {
        return; // Keep using mock factories in SSR
      }

      // Import the main UI components module with fallback handling
      const moduleName = '@tamyla/' + 'ui-components';
      // @ts-ignore - Peer dependency may not be available during CI type checking
      const uiComponents = await import(moduleName).catch(() => null);

      if (!uiComponents) {
        console.warn('Factory Importer: @tamyla/ui-components not available, keeping mock factories');
        return;
      }

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

  private createSSRSafeFactories(): void {
    // Create factories that don't access DOM during SSR
    const createSSRFactory = (name: string) => ({
      create: (props: any = {}) => {
        // Return a factory that will create actual DOM elements when called in browser
        if (typeof document !== 'undefined') {
          const element = document.createElement('div');
          element.className = `tamyla-${name.toLowerCase()}-ssr`;
          element.textContent = `${name} (SSR)`;
          return element;
        }
        // In SSR, return a placeholder object
        return {
          tagName: 'DIV',
          className: `tamyla-${name.toLowerCase()}-ssr`,
          textContent: `${name} (SSR)`,
          appendChild: () => {},
          style: {},
          // Simulate basic DOM element interface
          outerHTML: `<div class="tamyla-${name.toLowerCase()}-ssr">${name} (SSR)</div>`
        } as any;
      }
    });

    // Create SSR-safe versions of all factory types
    const factoryNames = [
      'ButtonFactory',
      'InputFactory',
      'CardFactory',
      'SearchBarFactory',
      'ActionCardFactory',
      'SearchInterfaceFactory',
      'StatusIndicatorFactory',
      'ContentCardFactory',
      'FileListFactory',
      'NotificationFactory',
      'CampaignSelectorSystem',
      'ContentManagerApplicationFactory',
      'EnhancedSearchApplicationFactory',
      'TamylaUISystem',
      'RewardSystem',
      'InputGroupFactory',
      'OrganismTemplates',
      'OrganismFactory'
    ];

    factoryNames.forEach(name => {
      this.factories.set(name, createSSRFactory(name));
    });

    console.log('✅ SSR-safe factories created');
  }

  private createMockFactories(): void {
    // Only create mock factories in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // In SSR environment, create basic fallback factories that don't access DOM
      this.createSSRSafeFactories();
      return;
    }

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
        console.log('🎭 ContentCardFactory.create called with props:', props);
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

        // Attach event handlers for ContentCard tests
        // Only attach direct event listeners if there's no onEvent callback (to avoid double firing)
        if (!props.onEvent) {
          if (props.onClick && typeof props.onClick === 'function') {
            console.log('🎭 Attaching onClick handler to ContentCard');
            card.addEventListener('click', props.onClick);
          }
          if (props.onMouseEnter && typeof props.onMouseEnter === 'function') {
            console.log('🎭 Attaching onMouseEnter handler to ContentCard');
            card.addEventListener('mouseenter', props.onMouseEnter);
          }
          if (props.onMouseLeave && typeof props.onMouseLeave === 'function') {
            console.log('🎭 Attaching onMouseLeave handler to ContentCard');
            card.addEventListener('mouseleave', props.onMouseLeave);
          }
        } else {
          console.log('🎭 ContentCard using onEvent callback, skipping direct event listeners');
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

        // Always add an action button
        const actionContainer = document.createElement('div');
        actionContainer.style.cssText = 'margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;';

        const actionBtn = createButtonFactory().create({
          text: props.actionText || 'Action',
          variant: 'primary',
          onClick: props.onAction
        });
        actionContainer.appendChild(actionBtn);

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
        console.log(`🎭 ${className}Factory.create called with props:`, props);
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

        // Attach event handlers for FileList drag events
        // Only attach direct event listeners if there's no onEvent callback (to avoid double firing)
        if (!props.onEvent) {
          if (props.onDragOver && typeof props.onDragOver === 'function') {
            console.log(`🎭 Attaching onDragOver handler to ${className}`);
            element.addEventListener('dragover', props.onDragOver);
          }
          if (props.onDragLeave && typeof props.onDragLeave === 'function') {
            console.log(`🎭 Attaching onDragLeave handler to ${className}`);
            element.addEventListener('dragleave', props.onDragLeave);
          }
          if (props.onDrop && typeof props.onDrop === 'function') {
            console.log(`🎭 Attaching onDrop handler to ${className}`);
            element.addEventListener('drop', props.onDrop);
          }

          // Attach general event handlers that might be used by other components
          if (props.onClick && typeof props.onClick === 'function') {
            console.log(`🎭 Attaching onClick handler to ${className}`);
            element.addEventListener('click', props.onClick);
          }
          if (props.onMouseEnter && typeof props.onMouseEnter === 'function') {
            console.log(`🎭 Attaching onMouseEnter handler to ${className}`);
            element.addEventListener('mouseenter', props.onMouseEnter);
          }
          if (props.onMouseLeave && typeof props.onMouseLeave === 'function') {
            console.log(`🎭 Attaching onMouseLeave handler to ${className}`);
            element.addEventListener('mouseleave', props.onMouseLeave);
          }
        } else {
          console.log(`🎭 ${className} using onEvent callback, skipping direct event listeners`);
        }

        return element;
      }
    });

    // Set up ALL factory instances with consistent structure
    // Every factory is an object with a 'create' method
    this.factories.set('ButtonFactory', this.enhanceFactoryWithMissingMethods(createButtonFactory(), null, 'ButtonFactory'));
    this.factories.set('InputFactory', this.enhanceFactoryWithMissingMethods(createInputFactory(), null, 'InputFactory'));
    this.factories.set('CardFactory', this.enhanceFactoryWithMissingMethods(createCardFactory(), null, 'CardFactory'));
    this.factories.set('SearchBarFactory', this.enhanceFactoryWithMissingMethods(createSearchBarFactory(), null, 'SearchBarFactory'));
    this.factories.set('ActionCardFactory', this.enhanceFactoryWithMissingMethods(createActionCardFactory(), null, 'ActionCardFactory'));
    this.factories.set('SearchInterfaceFactory', this.enhanceFactoryWithMissingMethods(createSearchInterfaceFactory(), null, 'SearchInterfaceFactory'));
    this.factories.set('StatusIndicatorFactory', this.enhanceFactoryWithMissingMethods(createStandardFactory('span', 'tamyla-status-indicator', 'Status'), null, 'StatusIndicatorFactory'));

    // All the following factories use the same consistent pattern
    this.factories.set('ContentCardFactory', this.enhanceFactoryWithMissingMethods(createCardFactory(), null, 'ContentCardFactory')); // Reuse card factory
    this.factories.set('FileListFactory', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-file-list', 'File List'), null, 'FileListFactory'));
    this.factories.set('NotificationFactory', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-notification', 'Notification'), null, 'NotificationFactory'));
    this.factories.set('CampaignSelectorSystem', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-campaign-selector', 'Campaign Selector'), null, 'CampaignSelectorSystem'));
    this.factories.set('ContentManagerApplicationFactory', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-content-manager', 'Content Manager'), null, 'ContentManagerApplicationFactory'));
    this.factories.set('EnhancedSearchApplicationFactory', this.enhanceFactoryWithMissingMethods(createSearchInterfaceFactory(), null, 'EnhancedSearchApplicationFactory')); // Reuse search interface
    this.factories.set('TamylaUISystem', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-ui-system', 'Tamyla UI System'), null, 'TamylaUISystem'));
    this.factories.set('RewardSystem', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-reward-system', 'Reward System'), null, 'RewardSystem'));
    this.factories.set('InputGroupFactory', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-input-group', 'Input Group'), null, 'InputGroupFactory'));
    this.factories.set('OrganismTemplates', this.enhanceFactoryWithMissingMethods(createStandardFactory('div', 'tamyla-organism-templates', 'Organism Templates'), null, 'OrganismTemplates'));

    // Special OrganismFactory with multiple methods
    this.factories.set('OrganismFactory', this.enhanceFactoryWithMissingMethods({
      create: (type: string, props: any = {}) => {
        const factory = this.factories.get(`${type}Factory`);
        if (factory && typeof factory.create === 'function') {
          return factory.create(props);
        }
        return createStandardFactory('div', `tamyla-${type}`, `${type} Organism`).create(props);
      },
      createSearchInterface: (props: any = {}) => createSearchInterfaceFactory().create(props)
    }, null, 'OrganismFactory'));

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
      const normalizedFactory = this.normalizeFactory(value, key);
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
      const normalizedFactory = this.normalizeFactory(value, key);
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
  private normalizeFactory(factory: any, factoryName?: string): any {
    if (!factory) return null;

    let normalizedFactory: any = null;

    // If it's already an object with a create method, use as base
    if (typeof factory === 'object' && typeof factory.create === 'function') {
      normalizedFactory = factory;
    }
    // If it's a class constructor, wrap it properly (check this first - more specific condition)
    else if (typeof factory === 'function' && factory.prototype && factory.prototype.constructor === factory) {
      normalizedFactory = {
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
    // If it's a direct function, wrap it in an object with create method
    else if (typeof factory === 'function') {
      normalizedFactory = {
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
    // Handle objects that might have other factory patterns
    else if (typeof factory === 'object') {
      // Check for common factory patterns and try to normalize them
      const possibleMethods = ['render', 'createElement', 'build', 'generate'];

      for (const method of possibleMethods) {
        if (typeof factory[method] === 'function') {
          normalizedFactory = {
            create: factory[method].bind(factory)
          };
          break;
        }
      }

      // If it's an object with properties but no obvious factory method,
      // treat it as a factory config and create a simple factory
      if (!normalizedFactory && Object.keys(factory).length > 0) {
        normalizedFactory = {
          create: (_props: any = {}) => {
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

    // If we couldn't normalize it, return null
    if (!normalizedFactory) {
      console.warn('Unable to normalize factory:', factory);
      return null;
    }

    // Enhance normalized factory with missing methods based on factory type
    return this.enhanceFactoryWithMissingMethods(normalizedFactory, factory, factoryName);
  }

  /**
   * Add missing methods that React components expect
   */
  private enhanceFactoryWithMissingMethods(normalizedFactory: any, originalFactory: any, factoryName?: string): any {
    const name = factoryName || originalFactory?.name || originalFactory?.constructor?.name || 'Unknown';

    // Add missing methods based on factory type
    if (name.includes('Button')) {
      // ButtonFactory missing methods
      if (!normalizedFactory.enableTradingPortalPatterns) {
        normalizedFactory.enableTradingPortalPatterns = () => {
          // Mock implementation for trading portal patterns
          return {
            enabled: true,
            patterns: ['trading-button', 'market-action', 'portfolio-control']
          };
        };
      }
    }

    if (name.includes('CampaignSelector')) {
      // CampaignSelectorSystem missing methods
      const mockSelectionManager = {
        on: (event: string, callback: Function) => {
          // Mock event listener
          console.log(`Mock event listener added for: ${event}`);
          return () => console.log(`Mock event listener removed for: ${event}`);
        },
        off: (event: string, callback?: Function) => {
          console.log(`Mock event listener removed for: ${event}`);
        },
        emit: (event: string, data?: any) => {
          console.log(`Mock event emitted: ${event}`, data);
        }
      };

      // Enhance the factory creation to include selectionManager
      const originalCreate = normalizedFactory.create;
      normalizedFactory.create = (props: any = {}) => {
        try {
          // Add mock selectionManager to the instance
          if (originalFactory.prototype) {
            originalFactory.prototype.selectionManager = mockSelectionManager;
          }
          return originalCreate(props);
        } catch (error) {
          // If instantiation fails, create a fallback
          const element = document.createElement('div');
          element.className = 'tamyla-campaign-selector-fallback';
          element.textContent = 'Campaign Selector (Mock)';
          return element;
        }
      };
    }

    if (name.includes('SearchInterface')) {
      // SearchInterface missing methods
      if (!normalizedFactory.setResults) {
        normalizedFactory.setResults = (results: any[]) => {
          console.log('Mock setResults called with:', results);
          return normalizedFactory;
        };
      }
    }

    if (name.includes('Organism')) {
      // OrganismFactory missing methods
      if (!normalizedFactory.createSearchInterface) {
        normalizedFactory.createSearchInterface = (_props: any = {}) => {
          const element = document.createElement('div');
          element.className = 'tamyla-search-interface';
          element.textContent = 'Search Interface (Mock)';
          return element;
        };
      }
    }

    return normalizedFactory;
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
    // Ensure mock factories are created if this is the first access
    if (this.factories.size === 0) {
      this.createMockFactories();
    }

    // Lazy initialize real factories on first access (only in browser and not in test)
    if (!this.initialized && typeof window !== 'undefined' && typeof jest === 'undefined' && process.env.NODE_ENV !== 'test') {
      this.initializationPromise = this.initializeFactories();
    }

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
let _factoryImporter: any;
try {
  _factoryImporter = FactoryImporter.getInstance();
} catch (error) {
  console.error('FactoryImporter: Error creating instance:', error);
  _factoryImporter = {
    getFactory: (name: string) => ({
      create: (props: any = {}) => {
        if (name === 'ActionCardFactory') {
          const button = document.createElement('button');
          button.setAttribute('role', 'button');
          button.className = 'mock-action-card';
          button.textContent = 'Action';
          return button;
        }
        const element = document.createElement('div');
        element.className = `mock-${name.toLowerCase()}`;
        element.textContent = name;
        return element;
      }
    })
  };
}
export const factoryImporter = _factoryImporter;
