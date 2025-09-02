/**
 * Factory Bridge Tests
 * Testing the integration between React components and ui-components
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FactoryBridge } from './factory-bridge';

describe('Factory Bridge', () => {
  test('renders Button factory component', async () => {
    render(
      <FactoryBridge
        factory="Button"
        config={{ text: 'Factory Button' }}
      />
    );

    // Wait for the factory bridge to create the DOM elements
    await waitFor(() => {
      const container = screen.getByTestId('factory-container-Button');
      expect(container).toBeInTheDocument();
    });

    // The factory bridge creates a container with data-factory attribute
    const container = screen.getByTestId('factory-container-Button');
    expect(container).toHaveAttribute('data-factory', 'Button');

    // Check that the mock component was created inside
    await waitFor(() => {
      const mockComponent = document.querySelector('[data-mock="true"]');
      expect(mockComponent).toBeInTheDocument();
      expect(mockComponent).toHaveAttribute('data-config', '{"text":"Factory Button"}');
    });
  });

  test('applies custom className', async () => {
    render(
      <FactoryBridge
        factory="Button"
        className="custom-button"
        config={{ text: 'Custom Button' }}
      />
    );

    // Wait for the container to be created
    await waitFor(() => {
      const container = screen.getByTestId('factory-container-Button');
      expect(container).toHaveClass('custom-button');
    });
  });

  test('handles different factory types', async () => {
    render(
      <FactoryBridge
        factory="Input"
        config={{ placeholder: 'Enter text' }}
      />
    );

    // Wait for the factory bridge to create the DOM elements
    await waitFor(() => {
      const container = screen.getByTestId('factory-container-Input');
      expect(container).toBeInTheDocument();
    });

    const container = screen.getByTestId('factory-container-Input');
    expect(container).toHaveAttribute('data-factory', 'Input');

    // Check that the mock component was created inside
    await waitFor(() => {
      const mockComponent = document.querySelector('[data-mock="true"]');
      expect(mockComponent).toBeInTheDocument();
    });
  });

  test('renders with children', async () => {
    render(
      <FactoryBridge factory="Button" config={{ text: 'Button' }}>
        <span>Child content</span>
      </FactoryBridge>
    );

    // Wait for children to be rendered
    await waitFor(() => {
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    // Also verify the factory container was created
    await waitFor(() => {
      const container = screen.getByTestId('factory-container-Button');
      expect(container).toBeInTheDocument();
    });
  });

  test('handles missing factory gracefully', () => {
    // Mock console.error to avoid noise in test output
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <FactoryBridge
        factory={'NonExistentFactory' as any}
        config={{}}
      />
    );

    // Should not crash and should log error
    expect(consoleError).toHaveBeenCalledWith(
      expect.stringContaining('Factory NonExistentFactory not found'),
      expect.any(Array)
    );

    consoleError.mockRestore();
  });

  test('passes config to factory correctly', async () => {
    const testConfig = { text: 'Test Button', variant: 'primary', disabled: true };

    render(
      <FactoryBridge
        factory="Button"
        config={testConfig}
      />
    );

    // Wait for the mock component to be created with correct config
    await waitFor(() => {
      const mockComponent = document.querySelector('[data-mock="true"]');
      expect(mockComponent).toBeInTheDocument();
      expect(mockComponent).toHaveAttribute('data-config', JSON.stringify(testConfig));
    });
  });
});
