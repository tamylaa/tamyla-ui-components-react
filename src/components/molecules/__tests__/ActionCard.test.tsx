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
            // Create a hidden element to avoid interfering with enhanced component
            const element = document.createElement('div');
            element.setAttribute('data-factory', 'ActionCard');
            element.setAttribute('data-testid', 'factory-container-ActionCard');
            element.style.display = 'none';
            return element;
          })
        };
      }
      // Return a basic mock for other factories
      return {
        create: jest.fn((config = {}) => {
          const element = document.createElement('div');
          element.className = `mock-${name.toLowerCase()}`;
          element.setAttribute('data-factory', name);
          element.style.display = 'none';
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
    render(<ActionCard onMouseEnter={handleHover} />);
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
    expect(button).toHaveAttribute('aria-disabled', 'true');
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
