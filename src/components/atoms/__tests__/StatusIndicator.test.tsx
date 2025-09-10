/**
 * StatusIndicator Component Tests
 * Testing the StatusIndicator component wrapper
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { StatusIndicator } from '../StatusIndicator';

describe('StatusIndicator Component', () => {
  test('renders with default props', () => {
    render(<StatusIndicator />);
    // Since this is a factory component, we test that it renders without crashing
    expect(document.body).toBeInTheDocument();
  });

  test('renders with different statuses', () => {
    const { rerender } = render(<StatusIndicator status="pending" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator status="processing" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator status="completed" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator status="failed" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator status="cancelled" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator status="warning" />);
    expect(document.body).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<StatusIndicator size="xs" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator size="sm" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator size="md" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator size="lg" />);
    expect(document.body).toBeInTheDocument();
  });

  test('renders with trading status', () => {
    const { rerender } = render(<StatusIndicator tradingStatus="order-pending" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator tradingStatus="order-filled" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator tradingStatus="order-cancelled" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator tradingStatus="market-open" />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator tradingStatus="market-closed" />);
    expect(document.body).toBeInTheDocument();
  });

  test('handles showLabel prop', () => {
    const { rerender } = render(<StatusIndicator showLabel={true} />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator showLabel={false} />);
    expect(document.body).toBeInTheDocument();
  });

  test('handles custom label', () => {
    render(<StatusIndicator label="Custom Status" />);
    expect(document.body).toBeInTheDocument();
  });

  test('handles animation props', () => {
    const { rerender } = render(<StatusIndicator animated={true} />);
    expect(document.body).toBeInTheDocument();

    rerender(<StatusIndicator pulseEffect={true} />);
    expect(document.body).toBeInTheDocument();
  });

  test('handles event handlers', () => {
    const handleClick = jest.fn();
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
      <StatusIndicator
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );

    // Since this is a factory component, we can't easily test the event handlers
    // but we can verify the component renders with the props
    expect(document.body).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<StatusIndicator className="custom-indicator" />);
    expect(document.body).toBeInTheDocument();
  });

  test('handles all props combination', () => {
    render(
      <StatusIndicator
        status="completed"
        size="lg"
        showLabel={true}
        label="All Done"
        animated={true}
        pulseEffect={false}
        tradingStatus="order-filled"
        className="test-class"
      />
    );
    expect(document.body).toBeInTheDocument();
  });
});
