/**
 * ActionCard Molecule Tests
 * Testing the enhanced ActionCard component with Redux integration
 */

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { ActionCard } from '../ActionCard';

// Mock the factory-importer module
jest.mock('../../../core/factory/factory-importer', () => ({
  factoryImporter: {
    getFactory: jest.fn((name: string) => {
      console.log('🎭 Mock factoryImporter.getFactory called with:', name);
      if (name === 'ActionCardFactory') {
        return {
          create: jest.fn((config = {}) => {
            console.log('🎭 Mock ActionCardFactory.create called with config:', config);
            // Create a button element directly for ActionCard
            const button = document.createElement('button');
            button.setAttribute('role', 'button');
            button.className = 'action-card-button';

            // Handle title and description
            if (config.title) {
              // Create a span for the title
              const titleSpan = document.createElement('span');
              titleSpan.className = 'action-card-title';
              titleSpan.textContent = config.title;
              button.appendChild(titleSpan);

              if (config.description) {
                // Add a separator
                button.appendChild(document.createTextNode(': '));

                // Create a span for the description
                const descSpan = document.createElement('span');
                descSpan.className = 'action-card-description';
                descSpan.textContent = config.description;
                button.appendChild(descSpan);
              }
            } else if (config.description) {
              button.textContent = config.description;
            } else {
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

            console.log('🎭 Mock returning button element:', button.outerHTML);
            return button;
          })
        };
      }
      // Return a basic mock for other factories
      return {
        create: jest.fn((config = {}) => {
          const element = document.createElement('div');
          element.className = `mock-${name.toLowerCase()}`;
          element.textContent = `${name} Mock`;
          return element;
        })
      };
    })
  }
}));describe('ActionCard Molecule', () => {
  test('renders with default props', () => {
    render(<ActionCard />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with title and description', () => {
    render(
      <ActionCard
        title="Test Action"
        description="This is a test action card"
      />
    );
    expect(screen.getByText('Test Action')).toBeInTheDocument();
    expect(screen.getByText('This is a test action card')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    const { rerender } = render(<ActionCard variant="primary" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<ActionCard variant="success" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<ActionCard variant="warning" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<ActionCard variant="danger" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<ActionCard size="sm" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<ActionCard size="md" />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<ActionCard size="lg" />);
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

  test('renders with gamification features', () => {
    render(
      <ActionCard
        title="Achievement Unlocked"
        points={100}
        level="Expert"
        progress={75}
        badge="🏆"
      />
    );
    expect(screen.getByText('Achievement Unlocked')).toBeInTheDocument();
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
