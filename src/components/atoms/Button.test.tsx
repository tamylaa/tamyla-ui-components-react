/**
 * Button Component Tests
 * Testing the React wrapper for ui-components ButtonFactory
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../atoms/Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct CSS classes', () => {
    render(<Button variant="primary" size="lg">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('tamyla-button', 'tamyla-button--primary', 'tamyla-button--lg');
  });

  test('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-loading', 'true');
    expect(button).toHaveTextContent('Loading...');
  });

  test('renders children when provided', () => {
    render(<Button><span>Child Content</span></Button>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('uses text prop when no children', () => {
    render(<Button text="Button Text" />);
    expect(screen.getByText('Button Text')).toBeInTheDocument();
  });
});
