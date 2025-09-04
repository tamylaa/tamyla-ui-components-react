/**
 * Test Setup and Utilities
 * Shared configuration and helpers for all component tests
 */

/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../store/slices/uiSlice';
import { themeSlice } from '../store/slices/themeSlice';
import { componentSlice } from '../store/slices/componentSlice';
import { authSlice } from '../store/slices/authSlice';

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
      theme: themeSlice.reducer,
      components: componentSlice.reducer,
      auth: authSlice.reducer,
    },
  });
};

// Custom render function that includes Redux Provider
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const store = createTestStore();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(Provider, { store, children })
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Test utilities
const testUtils = {
  // Mock functions
  createMockFunction: () => jest.fn(),

  // Mock Redux dispatch
  mockDispatch: jest.fn(),

  // Common test data
  testUser: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
  },

  // Common test props
  defaultProps: {
    children: 'Test Content',
    onClick: jest.fn(),
    className: 'test-class'
  }
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Export custom render and store
export { customRender as render, createTestStore };

// Export test utilities
export { testUtils };
