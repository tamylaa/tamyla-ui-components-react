/**
 * Dashboard Organism Tests
 * Testing the Dashboard component with factory integration
 */

import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import Dashboard from '../Dashboard';

// Mock the dynamic import function used by FactoryImporter
jest.mock('../../../core/factory/factory-importer', () => ({
  FactoryImporter: {
    getInstance: jest.fn(() => ({
      getFactory: jest.fn(() => ({
        create: jest.fn((config = {}) => {
          console.log('🎭 Mock DashboardFactory.create called with config:', config);
          const element = document.createElement('div');
          element.className = 'mock-dashboard';
          element.setAttribute('data-mock', 'true');

          // Create dashboard header
          const header = document.createElement('header');
          header.textContent = config.title || 'Dashboard';
          element.appendChild(header);

          // Create widgets container
          const widgets = document.createElement('div');
          widgets.className = 'dashboard-widgets';
          widgets.textContent = 'Dashboard widgets will appear here';
          element.appendChild(widgets);

          return element;
        })
      }))
    }))
  },
  factoryImporter: {
    getFactory: jest.fn(() => ({
      create: jest.fn((config = {}) => {
        console.log('🎭 Mock factoryImporter.getFactory().create called with config:', config);
        const element = document.createElement('div');
        element.className = 'mock-dashboard';
        element.setAttribute('data-mock', 'true');

        // Create dashboard header
        const header = document.createElement('header');
        header.textContent = config.title || 'Dashboard';
        element.appendChild(header);

        // Create widgets container
        const widgets = document.createElement('div');
        widgets.className = 'dashboard-widgets';
        widgets.textContent = 'Dashboard widgets will appear here';
        element.appendChild(widgets);

        return element;
      })
    }))
  }
}));

// Mock the factory registry
jest.mock('../../../core/factory/factory-registry', () => ({
  FactoryRegistry: {
    getInstance: jest.fn(() => ({
      hasFactory: jest.fn((name: string) => {
        // Return true for all Dashboard-related factories
        return name.includes('Dashboard') || name === 'DashboardContent' || name === 'DashboardSearch' || name === 'DashboardKnowledge' || name === 'DashboardMedia';
      }),
      getFactory: jest.fn((name: string) => ({
        create: jest.fn((config = {}) => {
          console.log(`🎭 Mock Registry ${name}.create called with config:`, config);
          const element = document.createElement('div');
          element.className = `mock-${name.toLowerCase()}`;
          element.setAttribute('data-mock', 'true');

          // Create dashboard header
          const header = document.createElement('header');
          header.textContent = config.title || `${name} Dashboard`;
          element.appendChild(header);

          // Create widgets container
          const widgets = document.createElement('div');
          widgets.className = 'dashboard-widgets';
          widgets.textContent = `${name} widgets will appear here`;
          element.appendChild(widgets);

          return element;
        })
      }))
    }))
  },
  factoryRegistry: {
    hasFactory: jest.fn((name: string) => {
      // Return true for all Dashboard-related factories
      return name.includes('Dashboard') || name === 'DashboardContent' || name === 'DashboardSearch' || name === 'DashboardKnowledge' || name === 'DashboardMedia';
    }),
    getFactory: jest.fn((name: string) => ({
      create: jest.fn((config = {}) => {
        console.log(`🎭 Mock Registry factoryRegistry.getFactory().create called for ${name} with config:`, config);
        const element = document.createElement('div');
        element.className = `mock-${name.toLowerCase()}`;
        element.setAttribute('data-mock', 'true');

        // Create dashboard header
        const header = document.createElement('header');
        header.textContent = config.title || `${name} Dashboard`;
        element.appendChild(header);

        // Create widgets container
        const widgets = document.createElement('div');
        widgets.className = 'dashboard-widgets';
        widgets.textContent = `${name} widgets will appear here`;
        element.appendChild(widgets);

        return element;
      })
    }))
  }
}));describe('Dashboard Organism', () => {
  test('renders with default props', () => {
    render(<Dashboard />);
    expect(screen.getByText(/dashboardcontent widgets/i)).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    render(<Dashboard title="My Custom Dashboard" />);
    expect(screen.getByText(/my custom dashboard/i)).toBeInTheDocument();
  });

  test('renders with different types', () => {
    render(<Dashboard type="search" />);
    expect(screen.getByText(/dashboardsearch widgets/i)).toBeInTheDocument();
  });
});
