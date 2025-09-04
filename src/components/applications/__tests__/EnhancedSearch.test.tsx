/**
 * EnhancedSearch Application Tests
 * Testing the EnhancedSearch component with factory integration
 */

import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { EnhancedSearch } from '../EnhancedSearch';

// Mock the dynamic import function used by FactoryImporter
jest.mock('../../../core/factory/factory-importer', () => ({
  FactoryImporter: {
    getInstance: jest.fn(() => ({
      getFactory: jest.fn(() => ({
        create: jest.fn((config = {}) => {
          console.log('🎭 Mock EnhancedSearchApplicationFactory.create called with config:', config);
          const element = document.createElement('div');
          element.className = 'mock-enhanced-search';
          element.setAttribute('data-mock', 'true');

          // Create search input
          const input = document.createElement('input');
          input.type = 'search';
          input.placeholder = config.placeholder || 'Search...';
          input.setAttribute('role', 'searchbox');
          element.appendChild(input);

          // Create search button
          const button = document.createElement('button');
          button.textContent = 'Enhanced Search';
          button.setAttribute('role', 'button');
          element.appendChild(button);

          // Create results area
          const results = document.createElement('div');
          results.className = 'search-results';
          results.textContent = 'Enhanced search results';
          element.appendChild(results);

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
        element.className = 'mock-enhanced-search';
        element.setAttribute('data-mock', 'true');

        // Create search input
        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = config.placeholder || 'Search...';
        input.setAttribute('role', 'searchbox');
        element.appendChild(input);

        // Create search button
        const button = document.createElement('button');
        button.textContent = 'Enhanced Search';
        button.setAttribute('role', 'button');
        element.appendChild(button);

        // Create results area
        const results = document.createElement('div');
        results.className = 'search-results';
        results.textContent = 'Enhanced search results';
        element.appendChild(results);

        return element;
      })
    }))
  }
}));

describe('EnhancedSearch Application', () => {
  test('renders with default props', () => {
    render(<EnhancedSearch />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enhanced search/i })).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(<EnhancedSearch placeholder="Find anything..." />);
    expect(screen.getByPlaceholderText('Find anything...')).toBeInTheDocument();
  });

  test('renders with filters', () => {
    const filters = [
      {
        name: 'category',
        label: 'Category',
        type: 'select' as const,
        options: [
          { value: 'all', label: 'All' },
          { value: 'docs', label: 'Documents' }
        ]
      }
    ];
    render(<EnhancedSearch filters={filters} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
