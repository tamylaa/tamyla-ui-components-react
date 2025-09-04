/**
 * ActionCard Molecule Tests - Simplified
 * Testing the enhanced ActionCard component with Redux integration
 */

/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { ActionCard } from '../ActionCard';

// Mock the factory-importer module
jest.mock('../../../core/factory/factory-importer', () => ({
  factoryImporter: {
    getFactory: jest.fn((name: string) => {
      if (name === 'ActionCardFactory') {
        return {
          create: jest.fn((config = {}) => {
            // Create a button element directly for ActionCard
            const button = document.createElement('button');
            button.setAttribute('role', 'button');
            button.className = 'action-card-button';

            // Handle title and description
            if (config.title) {
              const titleSpan = document.createElement('span');
              titleSpan.className = 'action-card-title';
              titleSpan.textContent = config.title;
              button.appendChild(titleSpan);
            }

            if (config.description) {
              const descSpan = document.createElement('span');
              descSpan.className = 'action-card-description';
              descSpan.textContent = config.description;
              button.appendChild(descSpan);
            }

            // Default text if no title/description
            if (!config.title && !config.description) {
              button.textContent = 'Action';
            }

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

            return button;
          })
        };
      }
      // Return a basic mock for other factories
      return {
        create: jest.fn((_config = {}) => {
          const element = document.createElement('div');
          element.className = `mock-${name.toLowerCase()}`;
          element.textContent = `${name} Mock`;
          return element;
        })
      };
    })
  }
}));

describe('ActionCard Molecule', () => {
  test('renders with default props', () => {
    render(<ActionCard />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with title and description', () => {
    render(<ActionCard title="Test Title" description="Test Description" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    render(<ActionCard variant="primary" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    render(<ActionCard size="lg" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<ActionCard onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('handles hover events', () => {
    const handleHover = jest.fn();
    render(<ActionCard onHover={handleHover} />);
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    expect(handleHover).toHaveBeenCalledTimes(1);
  });

  test('renders with loading state', () => {
    render(<ActionCard loading={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with disabled state', () => {
    render(<ActionCard disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('renders with elevation', () => {
    render(<ActionCard elevation={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with interactive state', () => {
    render(<ActionCard interactive={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
