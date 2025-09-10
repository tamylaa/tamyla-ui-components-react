/**
 * ActionCard Molecule Tests - Simplified
 * Testing the enhanced ActionCard  test('renders with title and description', () => {
    render(<ActionCard title="Test Title" description="Test Description" />);
    // Check for the main container with role button
    expect(screen.getByRole('button')).toBeInTheDocument();
    // Use getAllByText and check that we have at least one
    const titleElements = screen.getAllByText('Test Title');
    expect(titleElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });with Redux integration
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
    // Check that the component renders by looking for the container
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
  });

  test('renders with title and description', () => {
    render(<ActionCard title="Test Title" description="Test Description" />);
    // Check for the main container with role button
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
    // Use getAllByText and check that we have at least one
    const titleElements = screen.getAllByText('Test Title');
    expect(titleElements.length).toBeGreaterThan(0);
    // Use getAllByText for description as well
    const descriptionElements = screen.getAllByText('Test Description');
    expect(descriptionElements.length).toBeGreaterThan(0);
  });

  test('renders with different variants', () => {
    render(<ActionCard variant="primary" />);
    // Target the main interactive container by checking for the presence of the component
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    render(<ActionCard size="lg" />);
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<ActionCard onClick={handleClick} />);
    // Target the main container by its role
    const button = screen.getAllByRole('button')[0]; // Get the first button (main container)
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('handles hover events', () => {
    const handleHover = jest.fn();
    render(<ActionCard onMouseEnter={handleHover} />);
    const button = screen.getAllByRole('button')[0]; // Get the main container button
    fireEvent.mouseEnter(button);
    expect(handleHover).toHaveBeenCalledTimes(1);
  });

  test('renders with loading state', () => {
    render(<ActionCard loading={true} />);
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
  });

  test('renders with disabled state', () => {
    render(<ActionCard disabled={true} />);
    const button = screen.getAllByRole('button')[0]; // Get the main container button
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('renders with elevation', () => {
    render(<ActionCard elevation={true} />);
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
  });

  test('renders with interactive state', () => {
    render(<ActionCard interactive={true} />);
    expect(screen.getByTestId('factory-container-ActionCard')).toBeInTheDocument();
  });
});
