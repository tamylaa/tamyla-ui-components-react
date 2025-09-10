/**
 * Input Component Tests
 * Testing the enhanced Input component with Redux integration
 */

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { Input } from '../Input';

describe('Input Component', () => {
  test('renders with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('renders with label', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id');
  });

  test('handles text input', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });

  test('shows required indicator when required', () => {
    render(<Input label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('applies different variants correctly', () => {
    const { rerender } = render(<Input variant="default" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-[var(--border)]');

    rerender(<Input variant="secondary" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-[var(--surface-secondary)]');

    rerender(<Input variant="ghost" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-transparent');
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('min-h-[44px]', 'sm:h-10');

    rerender(<Input size="default" />);
    expect(screen.getByRole('textbox')).toHaveClass('min-h-[44px]', 'sm:h-11');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('min-h-[48px]', 'sm:h-12');
  });

  test('shows error state correctly', () => {
    render(<Input error errorMessage="This field is required" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('border-destructive');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('shows help text when provided', () => {
    render(<Input helpText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('handles disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  test('renders with start and end icons', () => {
    const startIcon = <span data-testid="start-icon">🔍</span>;
    const endIcon = <span data-testid="end-icon">✕</span>;

    render(<Input startIcon={startIcon} endIcon={endIcon} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-input');
  });

  test('handles different input types', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });
});
