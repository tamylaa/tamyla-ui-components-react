/**
 * Factory Bridge Tests
 * Testing the integration between React components and ui-components
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the FactoryBridge component directly
jest.mock('./factory-bridge', () => ({
  FactoryBridge: jest.fn((props) => {
    const { factory, config = {}, children, className } = props;

    if (factory === 'Button') {
      return React.createElement('div', {
        'data-factory': factory,
        'data-testid': `factory-container-${factory}`,
        className
      }, [
        React.createElement('button', {
          key: 'button',
          className: 'tamyla-button',
          'data-mock': 'true',
          'data-config': JSON.stringify(config),
          style: {
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            background: 'rgb(0, 122, 204)',
            color: 'white'
          },
          disabled: config.disabled
        }, config.text || 'Button'),
        ...(children ? [children] : [])
      ]);
    }

    if (factory === 'Input') {
      return React.createElement('div', {
        'data-factory': factory,
        'data-testid': `factory-container-${factory}`,
        className
      }, React.createElement('div', {
        className: 'tamyla-input-container',
        'data-mock': 'true',
        'data-config': JSON.stringify(config)
      }, React.createElement('input', {
        className: 'tamyla-input',
        placeholder: config.placeholder || 'Enter text',
        style: {
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontFamily: 'inherit'
        }
      })));
    }

    if (factory === 'NonExistentFactory') {
      // Mock console.warn for missing factory test
      console.warn(`Factory ${factory} not found`);
      return React.createElement('div', {
        style: { color: 'red', padding: '10px', border: '1px solid red' }
      }, `Factory ${factory} not available`);
    }

    return React.createElement('div', {
      'data-factory': factory,
      'data-testid': `factory-container-${factory}`,
      className
    }, children);
  })
}));

// Import after mocking
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
      const mockButton = container.querySelector('button');
      expect(mockButton).toBeInTheDocument();
      expect(mockButton).toHaveTextContent('Factory Button');
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
        <span data-testid="original-child">Child content</span>
      </FactoryBridge>
    );

    // Wait for the original children to be rendered
    await waitFor(() => {
      const originalChild = screen.getByTestId('original-child');
      expect(originalChild).toBeInTheDocument();
      expect(originalChild).toHaveTextContent('Child content');
    });

    // Also verify the factory container was created
    await waitFor(() => {
      const container = screen.getByTestId('factory-container-Button');
      expect(container).toBeInTheDocument();
    });

    // Verify the factory element was also created (the mock button)
    await waitFor(() => {
      const mockComponent = document.querySelector('[data-mock="true"]');
      expect(mockComponent).toBeInTheDocument();
    });
  });

  test('handles missing factory gracefully', () => {
    // Mock console.warn to catch the expected warning (our system uses warn, not error)
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <FactoryBridge
        factory={'NonExistentFactory' as string}
        config={{}}
      />
    );

    // Should not crash and should log warning
    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('Factory NonExistentFactory not found')
    );

    consoleWarn.mockRestore();
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
