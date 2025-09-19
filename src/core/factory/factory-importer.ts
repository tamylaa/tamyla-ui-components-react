/**
 * Factory Importer - Handles safe importing of ui-components factories
 * Uses lazy loading to avoid DOM access during module initialization
 */

import logger from '../../utils/logger';
import { factoryOptimizer } from './factory-optimizer';
import type { ComponentData, FactoryProps } from '../../types/factory-components';

interface FactoryModule {
  [key: string]: unknown;
  default?: unknown;
}

interface FactoryFunction {
  create: (props: FactoryProps) => HTMLElement;
}

export class FactoryImporter {
  private static instance: FactoryImporter | null = null;
  private factories: Map<string, any> = new Map();
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;
  private loadingPromises = new Map<string, Promise<void>>();

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

    // Prevent concurrent initialization
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        // Try to import factories from @tamyla/ui-components
        await this.loadFactoriesFromUIComponents();
        this.initialized = true;
      } catch (error) {
        logger.warn('Failed to load factories', { error }, 'FactoryImporter');
        // Don't mark as initialized on failure so we can retry
      }
    })();

    return this.initializationPromise;
  }

  private async loadFactoriesFromUIComponents(): Promise<void> {
    const moduleKey = '@tamyla/ui-components';
    
    // Prevent concurrent loading of the same module
    if (this.loadingPromises.has(moduleKey)) {
      return this.loadingPromises.get(moduleKey);
    }

    const loadingPromise = (async () => {
      try {
        // Skip dynamic import in test environment
        if ((globalThis as any).jest !== undefined || process.env.NODE_ENV === 'test') {
          logger.info('Skipping dynamic import in test environment', null, 'FactoryImporter');
          return;
        }

        // Only load in browser environment
        if (typeof window === 'undefined') {
          return; // Keep using mock factories in SSR
        }

        // Import the main UI components module with timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Module load timeout')), 5000);
        });

        const loadPromise = import(moduleKey).catch(() => null);
        const uiComponents = await Promise.race([loadPromise, timeoutPromise]);

        if (!uiComponents) {
          logger.warn('@tamyla/ui-components not available, keeping mock factories', null, 'FactoryImporter');
          return;
        }

        // Load factories with performance optimization
        this.loadFromModule(uiComponents);

        // Success - factories loaded from @tamyla/ui-components
        logger.info('Real factories loaded from @tamyla/ui-components', null, 'FactoryImporter');
      } catch (error) {
        logger.warn('Failed to load real factories, using mocks', { error }, 'FactoryImporter');
        // Fallback to mock factories if import fails
        if (this.factories.size === 0) {
          this.createMockFactories();
        }
      } finally {
        // Clean up loading promise
        this.loadingPromises.delete(moduleKey);
      }
    })();

    this.loadingPromises.set(moduleKey, loadingPromise);
    return loadingPromise;
  }

  private createSSRSafeFactories(): void {
    // Create factories that don't access DOM during SSR
    const createSSRFactory = (name: string) => ({
      create: (props: Record<string, any> = {}) => {
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
        } as Record<string, any>;
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

    logger.info('SSR-safe factories created', null, 'FactoryImporter');
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
      create: (props: FactoryProps = {}) => {
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
        if (props.value) input.value = String(props.value);
        if (props.type) input.type = props.type;
        if (props.disabled) input.disabled = props.disabled;
        if (props.required) input.required = props.required;

        container.appendChild(input);
        return container;
      }
    });

    const createButtonFactory = () => ({
      create: (props: FactoryProps = {}) => {
        const button = document.createElement('button');
        button.className = 'tamyla-button';
        button.textContent = String(props.text || props.children || 'Button');
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
        logger.debug('ContentCardFactory.create called', { props }, 'FactoryImporter');
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
            logger.debug('Attaching onClick handler to ContentCard', null, 'FactoryImporter');
            card.addEventListener('click', props.onClick);
          }
          if (props.onMouseEnter && typeof props.onMouseEnter === 'function') {
            logger.debug('Attaching onMouseEnter handler to ContentCard', null, 'FactoryImporter');
            card.addEventListener('mouseenter', props.onMouseEnter);
          }
          if (props.onMouseLeave && typeof props.onMouseLeave === 'function') {
            logger.debug('Attaching onMouseLeave handler to ContentCard', null, 'FactoryImporter');
            card.addEventListener('mouseleave', props.onMouseLeave);
          }
        } else {
          logger.debug('ContentCard using onEvent callback, skipping direct event listeners', null, 'FactoryImporter');
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
        logger.debug(`${className}Factory.create called`, { props }, 'FactoryImporter');
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
            logger.debug(`Attaching onDragOver handler to ${className}`, null, 'FactoryImporter');
            element.addEventListener('dragover', props.onDragOver);
          }
          if (props.onDragLeave && typeof props.onDragLeave === 'function') {
            logger.debug(`Attaching onDragLeave handler to ${className}`, null, 'FactoryImporter');
            element.addEventListener('dragleave', props.onDragLeave);
          }
          if (props.onDrop && typeof props.onDrop === 'function') {
            logger.debug(`Attaching onDrop handler to ${className}`, null, 'FactoryImporter');
            element.addEventListener('drop', props.onDrop);
          }

          // Attach general event handlers that might be used by other components
          if (props.onClick && typeof props.onClick === 'function') {
            logger.debug(`Attaching onClick handler to ${className}`, null, 'FactoryImporter');
            element.addEventListener('click', props.onClick);
          }
          if (props.onMouseEnter && typeof props.onMouseEnter === 'function') {
            logger.debug(`Attaching onMouseEnter handler to ${className}`, null, 'FactoryImporter');
            element.addEventListener('mouseenter', props.onMouseEnter);
          }
          if (props.onMouseLeave && typeof props.onMouseLeave === 'function') {
            logger.debug(`Attaching onMouseLeave handler to ${className}`, null, 'FactoryImporter');
            element.addEventListener('mouseleave', props.onMouseLeave);
          }
        } else {
          logger.debug(`${className} using onEvent callback, skipping direct event listeners`, null, 'FactoryImporter');
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
        if (factory && typeof (factory as { create?: unknown }).create === 'function') {
          return (factory as { create: (props: any) => unknown }).create(props);
        }
        return createStandardFactory('div', `tamyla-${type}`, `${type} Organism`).create(props);
      },
      createSearchInterface: (props: any = {}) => createSearchInterfaceFactory().create(props)
    }, null, 'OrganismFactory'));

    if (process.env.NODE_ENV === 'development') {
      logger.info('ALL mock factories created with consistent structure', null, 'FactoryImporter');
      logger.debug('Available factories', { factories: Array.from(this.factories.keys()) }, 'FactoryImporter');
    }
  }

  private loadFromModule(module: FactoryModule): void {
    logger.info('Loading factories from module...', null, 'FactoryImporter');

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
        logger.info(`Loaded and normalized real factory: ${key}`, null, 'FactoryImporter');
      } else {
        logger.warn(`Invalid factory ${key}, keeping mock`, null, 'FactoryImporter');
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
        logger.info(`Loaded and normalized optional factory: ${key}`, null, 'FactoryImporter');
      } else if (value !== undefined) {
        logger.warn(`Invalid optional factory ${key}, keeping mock`, null, 'FactoryImporter');
      }
    });
  }

  /**
   * Normalize any factory structure to use the consistent create method pattern
   */
  private normalizeFactory(factory: unknown, factoryName?: string): unknown {
    if (!factory) return null;

    let normalizedFactory: any = null;

    // If it's already an object with a create method, use as base
    if (typeof factory === 'object' && typeof (factory as any).create === 'function') {
      normalizedFactory = factory;
    }
    // If it's a class constructor, wrap it properly (check this first - more specific condition)
    else if (typeof factory === 'function' && factory.prototype && factory.prototype.constructor === factory) {
      normalizedFactory = {
        create: (props: any = {}) => {
          try {
            const instance = new (factory as any)(props);
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
            logger.warn(`Failed to instantiate ${factory.name}`, { error }, 'FactoryImporter');
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
            logger.warn(`Function factory error for ${factory.name || 'unnamed'}`, { error }, 'FactoryImporter');
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
        if (typeof (factory as any)[method] === 'function') {
          normalizedFactory = {
            create: (factory as any)[method].bind(factory)
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
            if ((factory as any).style) {
              Object.assign(element.style, (factory as any).style);
            }

            return element;
          }
        };
      }
    }

    // If we couldn't normalize it, return null
    if (!normalizedFactory) {
      logger.warn('Unable to normalize factory', { factory }, 'FactoryImporter');
      return null;
    }

    // Enhance normalized factory with missing methods based on factory type
    return this.enhanceFactoryWithMissingMethods(normalizedFactory, factory, factoryName);
  }

  /**
   * Add missing methods that React components expect
   */
  private enhanceFactoryWithMissingMethods(normalizedFactory: unknown, originalFactory: unknown, factoryName?: string): unknown {
    const name = factoryName || (originalFactory as any)?.name || (originalFactory as any)?.constructor?.name || 'Unknown';

    // Add missing methods based on factory type
    if (name.includes('Button')) {
      // ButtonFactory missing methods
      if (!(normalizedFactory as any).enableTradingPortalPatterns) {
        (normalizedFactory as any).enableTradingPortalPatterns = () => {
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
          logger.debug(`Mock event listener added for: ${event}`, null, 'FactoryImporter');
          return () => logger.debug(`Mock event listener removed for: ${event}`, null, 'FactoryImporter');
        },
        off: (event: string, callback?: Function) => {
          logger.debug(`Mock event listener removed for: ${event}`, null, 'FactoryImporter');
        },
        emit: (event: string, data?: unknown) => {
          logger.debug(`Mock event emitted: ${event}`, { data }, 'FactoryImporter');
        }
      };

      // Enhance the factory creation to include selectionManager
      const originalCreate = (normalizedFactory as any).create;
      (normalizedFactory as any).create = (props: any = {}) => {
        try {
          // Add mock selectionManager to the instance
          if ((originalFactory as any).prototype) {
            (originalFactory as any).prototype.selectionManager = mockSelectionManager;
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
      if (!(normalizedFactory as any).setResults) {
        (normalizedFactory as any).setResults = (results: unknown[]) => {
          logger.debug('Mock setResults called', { results }, 'FactoryImporter');
          return normalizedFactory;
        };
      }
    }

    if (name.includes('Organism')) {
      // OrganismFactory missing methods
      if (!(normalizedFactory as any).createSearchInterface) {
        (normalizedFactory as any).createSearchInterface = (_props: any = {}) => {
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
          logger.warn(`Required property ${prop} not found in ${moduleName}`, null, 'FactoryImporter');
        }
      });

      return result;
    } catch (error) {
      if (required) {
        logger.error(`Failed to import ${moduleName}`, { error }, 'FactoryImporter');
      }
      return {};
    }
  }

  private safeRequireFromModule(module: unknown, properties: string[], required = true): Record<string, any> {
    try {
      const result: Record<string, any> = {};

      properties.forEach(prop => {
        if ((module as any)[prop] !== undefined) {
          let factory = (module as any)[prop];

          // Handle class constructors that need 'new'
          if (typeof factory === 'function' && factory.prototype && factory.prototype.constructor === factory) {
            // This is a class constructor - wrap it to handle instantiation
            factory = {
              create: (props: any = {}) => {
                try {
                  const instance = new (module as any)[prop](props);

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
                      logger.warn(`Failed to initialize ${prop}`, { error: initError }, 'FactoryImporter');
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
                  logger.warn(`Failed to instantiate ${prop}`, { error }, 'FactoryImporter');
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
          logger.warn(`Required property ${prop} not found in module`, null, 'FactoryImporter');
        }
      });

      return result;
    } catch (error) {
      if (required) {
        logger.error('Failed to extract properties from module', { error }, 'FactoryImporter');
      }
      return {};
    }
  }

  getFactory(name: string): unknown {
    // Ensure mock factories are created if this is the first access
    if (this.factories.size === 0) {
      this.createMockFactories();
    }

    // Lazy initialize real factories on first access (only in browser and not in test)
    if (!this.initialized && typeof window !== 'undefined' && (globalThis as any).jest === undefined && process.env.NODE_ENV !== 'test') {
      this.initializationPromise = this.initializeFactories();
    }

    // Factories should always be available (mock or real)
    const factory = this.factories.get(name);

    if (!factory) {
      logger.warn(`No factory found for ${name}, creating fallback`, null, 'FactoryImporter');

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
  logger.error('Error creating instance', { error }, 'FactoryImporter');
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
