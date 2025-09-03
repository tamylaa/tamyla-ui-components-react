// Mock for @tamyla/ui-components

// Base factory class with create method
class MockFactory {
  constructor() {
    this.tokens = {};
    this.utilities = {};
  }

  setSharedFoundation(tokens, utilities) {
    this.tokens = tokens;
    this.utilities = utilities;
    return this;
  }

  create(config = {}) {
    const element = document.createElement('div');
    element.className = 'mock-component';
    element.setAttribute('data-mock', 'true');
    
    // Safely stringify config without circular references
    try {
      const safeConfig = { ...config };
      // Remove React elements and other non-serializable properties
      if (safeConfig.children) {
        delete safeConfig.children;
      }
      if (safeConfig.container) {
        delete safeConfig.container;
      }
      element.setAttribute('data-config', JSON.stringify(safeConfig));
    } catch (error) {
      // Fallback if JSON.stringify fails
      element.setAttribute('data-config', 'config-present');
    }

    // Handle children if provided in config
    if (config.children) {
      if (typeof config.children === 'string') {
        element.textContent = config.children;
      } else if (config.children instanceof HTMLElement) {
        element.appendChild(config.children);
      } else if (Array.isArray(config.children)) {
        config.children.forEach(child => {
          if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
          } else if (child instanceof HTMLElement) {
            element.appendChild(child);
          } else if (child && typeof child === 'object' && child.props && child.props.children) {
            // Handle React elements
            const childText = typeof child.props.children === 'string' ? child.props.children : String(child.props.children || '');
            element.appendChild(document.createTextNode(childText));
          }
        });
      } else if (config.children && typeof config.children === 'object' && config.children.props && config.children.props.children) {
        // Handle single React element
        const childText = typeof config.children.props.children === 'string' ? config.children.props.children : String(config.children.props.children || '');
        element.appendChild(document.createTextNode(childText));
      }
    }

    return element;
  }

  // Button-specific create methods
  createPrimary(config = {}) {
    const element = this.create(config);
    element.className += ' button-primary';
    return element;
  }

  createSecondary(config = {}) {
    const element = this.create(config);
    element.className += ' button-secondary';
    return element;
  }

  createGhost(config = {}) {
    const element = this.create(config);
    element.className += ' button-ghost';
    return element;
  }

  createDanger(config = {}) {
    const element = this.create(config);
    element.className += ' button-danger';
    return element;
  }

  createSuccess(config = {}) {
    const element = this.create(config);
    element.className += ' button-success';
    return element;
  }

  createWithIcon(config = {}) {
    const element = this.create(config);
    element.className += ' button-with-icon';
    return element;
  }

  createIconOnly(config = {}) {
    const element = this.create(config);
    element.className += ' button-icon-only';
    return element;
  }
}

// Function factory for components that return functions
const createFunctionFactory = (type) => (config = {}) => {
  const element = document.createElement('div');
  element.className = `mock-${type}`;
  element.setAttribute('data-mock', 'true');
  element.setAttribute('data-type', type);
  element.setAttribute('data-config', JSON.stringify(config));
  return { element };
};

// Factory instances - CORRECTED to match factory bridge expectations
const factoryInstances = {
  buttonFactory: new MockFactory(),
  inputFactory: new MockFactory(),
  inputGroupFactory: createFunctionFactory('input-group'),
  cardFactory: new MockFactory(),
  statusIndicatorFactory: new MockFactory(),
  actionCardFactory: new MockFactory(),
  searchBarFactory: new MockFactory(),
  contentCardFactory: createFunctionFactory('content-card'),
  fileListFactory: createFunctionFactory('file-list'),
  notificationFactory: createFunctionFactory('notification'),
  searchInterfaceFactory: createFunctionFactory('search-interface'),
  rewardSystemFactory: new MockFactory(),
  organismFactory: createFunctionFactory('organism'),
  organismTemplates: {
    searchPage: createFunctionFactory('search-page'),
    contentDashboard: createFunctionFactory('content-dashboard'),
    knowledgeBase: createFunctionFactory('knowledge-base'),
    mediaLibrary: createFunctionFactory('media-library')
  },
  enhancedSearchFactory: createFunctionFactory('enhanced-search'),
  campaignSelectorFactory: createFunctionFactory('campaign-selector'),
  contentManagerFactory: createFunctionFactory('content-manager'),
  tamylaUIFactory: createFunctionFactory('tamyla-ui')
};

// Export factory instances (what the factory bridge imports)
export const ButtonFactory = factoryInstances.buttonFactory;
export const InputFactory = factoryInstances.inputFactory;
export const InputGroupFactory = factoryInstances.inputGroupFactory;
export const CardFactory = factoryInstances.cardFactory;
export const StatusIndicatorFactory = factoryInstances.statusIndicatorFactory;
export const ActionCardFactory = factoryInstances.actionCardFactory;
export const SearchBarFactory = factoryInstances.searchBarFactory;
export const ContentCardFactory = factoryInstances.contentCardFactory;
export const FileListFactory = factoryInstances.fileListFactory;
export const NotificationFactory = factoryInstances.notificationFactory;
export const SearchInterfaceFactory = factoryInstances.searchInterfaceFactory;
export const RewardSystem = factoryInstances.rewardSystemFactory;
export const OrganismFactory = factoryInstances.organismFactory;
export const OrganismTemplates = factoryInstances.organismTemplates;
export const EnhancedSearchApplicationFactory = factoryInstances.enhancedSearchFactory;
export const CampaignSelectorSystem = factoryInstances.campaignSelectorFactory;
export const ContentManagerApplicationFactory = factoryInstances.contentManagerFactory;
export const TamylaUISystem = factoryInstances.tamylaUIFactory;

// Legacy function exports for compatibility
export const createActionCard = () => new MockFactory();
export const createStatusIndicator = () => new MockFactory();
export const createRewardSystem = () => new MockFactory();
export const createButton = () => new MockFactory();
export const createInput = () => new MockFactory();
export const createCard = () => new MockFactory();

// Legacy exports for compatibility
export const ActionCard = RewardSystem;
export const StatusIndicator = RewardSystem;
