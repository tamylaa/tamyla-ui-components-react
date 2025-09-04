/**
 * ContentManager Application Tests
 * Testing the ContentManager component with factory integration
 */

import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { ContentManager } from '../ContentManager';

// Mock the dynamic import function used by FactoryImporter
jest.mock('../../../core/factory/factory-importer', () => ({
  FactoryImporter: {
    getInstance: jest.fn(() => ({
      getFactory: jest.fn(() => ({
        create: jest.fn((config = {}) => {
          console.log('🎭 Mock ContentManagerApplicationFactory.create called with config:', config);
          const element = document.createElement('div');
          element.className = 'mock-content-manager';
          element.setAttribute('data-mock', 'true');

          // Create upload button
          const uploadBtn = document.createElement('button');
          uploadBtn.textContent = 'Upload';
          uploadBtn.setAttribute('role', 'button');
          element.appendChild(uploadBtn);

          // Create content list
          const list = document.createElement('div');
          list.className = 'content-list';
          list.textContent = 'Content items will appear here';
          element.appendChild(list);

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
        element.className = 'mock-content-manager';
        element.setAttribute('data-mock', 'true');

        // Create upload button
        const uploadBtn = document.createElement('button');
        uploadBtn.textContent = 'Upload';
        uploadBtn.setAttribute('role', 'button');
        element.appendChild(uploadBtn);

        // Create content list
        const list = document.createElement('div');
        list.className = 'content-list';
        list.textContent = 'Content items will appear here';
        element.appendChild(list);

        return element;
      })
    }))
  }
}));

describe('ContentManager Application', () => {
  test('renders with default props', () => {
    render(<ContentManager />);
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
    expect(screen.getByText(/content items/i)).toBeInTheDocument();
  });

  test('renders with upload enabled', () => {
    render(<ContentManager showUpload={true} />);
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  test('renders with selection mode', () => {
    render(<ContentManager selectionMode={true} />);
    // Component should still render basic elements
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });
});
