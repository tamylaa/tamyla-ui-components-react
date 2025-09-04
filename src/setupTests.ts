/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';

// Mock Redux hooks globally for all tests
jest.mock('./store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn((selector) => {
    // Mock the state structure that components expect
    const mockState = {
      theme: { mode: 'light' },
      ui: {
        loading: { global: false }
      },
      components: {
        components: {}
      },
      auth: {}
    };
    return selector ? selector(mockState) : mockState;
  })
}));

// Mock @tamyla/ui-components globally for all tests
jest.mock('@tamyla/ui-components', () => ({
  ActionCardFactory: {
    create: jest.fn((config = {}) => {
      console.log('🎭 Global Mock ActionCardFactory.create called with config:', config);
      const element = document.createElement('div');
      element.className = 'mock-component';
      element.setAttribute('data-mock', 'true');

      // Always render a button for ActionCard
      const button = document.createElement('button');
      button.setAttribute('role', 'button');
      button.className = 'action-card-button';

      // Handle disabled state
      if (config.disabled) {
        button.setAttribute('disabled', 'true');
      }

      // Handle event handlers
      if (config.onClick) {
        button.addEventListener('click', config.onClick);
      }
      if (config.onHover) {
        button.addEventListener('mouseenter', config.onHover);
      }

      if (config.title || config.description) {
        if (config.title) {
          const titleDiv = document.createElement('div');
          titleDiv.className = 'action-card-title';
          titleDiv.textContent = config.title;
          button.appendChild(titleDiv);
        }

        if (config.description) {
          const descDiv = document.createElement('div');
          descDiv.className = 'action-card-description';
          descDiv.textContent = config.description;
          button.appendChild(descDiv);
        }
      } else {
        // Default content for ActionCard
        button.textContent = 'Action';
      }

      element.appendChild(button);

      // Safely stringify config
      try {
        const safeConfig = { ...config };
        if (safeConfig.children) delete safeConfig.children;
        if (safeConfig.container) delete safeConfig.container;
        Object.keys(safeConfig).forEach(key => {
          if (safeConfig[key] && typeof safeConfig[key] === 'object' && safeConfig[key].$$typeof) {
            delete safeConfig[key];
          }
        });
        element.setAttribute('data-config', JSON.stringify(safeConfig));
      } catch (_error) {
        element.setAttribute('data-config', 'config-present');
      }

      console.log('🎭 Global Mock returning element:', element.outerHTML);
      return element;
    })
  }
}), { virtual: true });

// Mock classnames utility
jest.mock('./utils/classnames', () => ({
  cn: (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ')
}));

// Mock the store actions
jest.mock('./store/store', () => ({
  uiActions: {
    addNotification: jest.fn()
  },
  componentActions: {
    updateComponentState: jest.fn()
  }
}));

// Mock the classnames utility
jest.mock('./utils/classnames', () => ({
  cn: (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ')
}));
