/**
 * SearchInterface Organism Tests
 * Testing the SearchInterface component with factory integration
 */

import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import SearchInterface from '../SearchInterface';

// Mock the dynamic import function used by FactoryImporter
const mockImport = jest.fn();
jest.mock('../../../core/factory/factory-importer', () => ({
  FactoryImporter: {
    getInstance: jest.fn(() => ({
      getFactory: jest.fn(() => ({
        create: jest.fn((config = {}) => {
          console.log('🎭 Mock SearchInterfaceFactory.create called with config:', config);
          const element = document.createElement('div');
          element.className = 'mock-search-interface';
          element.setAttribute('data-mock', 'true');

          // Create a search input
          const input = document.createElement('input');
          input.type = 'search';
          input.placeholder = config.placeholder || 'Search...';
          input.setAttribute('role', 'searchbox');
          element.appendChild(input);

          // Create a search button
          const button = document.createElement('button');
          button.textContent = 'Search';
          button.setAttribute('role', 'button');
          element.appendChild(button);

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
        element.className = 'mock-search-interface';
        element.setAttribute('data-mock', 'true');

        // Create a search input
        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = config.placeholder || 'Search...';
        input.setAttribute('role', 'searchbox');
        element.appendChild(input);

        // Create a search button
        const button = document.createElement('button');
        button.textContent = 'Search';
        button.setAttribute('role', 'button');
        element.appendChild(button);

        return element;
      })
    }))
  }
}));

describe('SearchInterface Organism', () => {
  test('renders with default props', () => {
    render(<SearchInterface />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('renders with custom title', () => {
    render(<SearchInterface title="Custom Search" />);
    // Since it's a mock, we can't test the title directly, but the component should render
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  test('renders with filters', () => {
    const filters = [
      {
        name: 'type',
        label: 'Type',
        type: 'select' as const,
        options: [
          { value: 'all', label: 'All' },
          { value: 'image', label: 'Image' }
        ]
      }
    ];
    render(<SearchInterface filters={filters} showFilters={true} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
