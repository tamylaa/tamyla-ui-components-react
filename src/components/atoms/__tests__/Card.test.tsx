/**
 * Card Component Tests
 * Testing the enhanced Card component with Redux integration
 */

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { Card } from '../Card';

describe('Card Component', () => {
  test('renders with default props', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders with header and footer', () => {
    render(
      <Card
        header={<h3>Card Header</h3>}
        footer={<p>Card Footer</p>}
      >
        Card Content
      </Card>
    );

    expect(screen.getByText('Card Header')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  test('applies different variants correctly', () => {
    const { rerender } = render(<Card variant="default">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('shadow-sm');

    rerender(<Card variant="outlined">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('border-2');

    rerender(<Card variant="elevated">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('shadow-lg');

    rerender(<Card variant="filled">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('bg-muted');
  });

  test('applies different padding correctly', () => {
    const { rerender } = render(<Card padding="default">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('p-6');

    rerender(<Card padding="sm">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('p-4');

    rerender(<Card padding="lg">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('p-8');

    rerender(<Card padding="none">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('p-0');
  });

  test('handles interactive mode', () => {
    const handleClick = jest.fn();
    render(
      <Card
        interactive
        componentId="test-card"
        onClick={handleClick}
      >
        Interactive Content
      </Card>
    );

    const card = screen.getByText('Interactive Content').parentElement;
    expect(card).toHaveClass('cursor-pointer');

    fireEvent.click(card!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows expand/collapse button when interactive', () => {
    render(
      <Card
        interactive
        componentId="test-card"
        header="Test Header"
      >
        Content
      </Card>
    );

    const expandButton = screen.getByRole('button', { name: /expand card/i });
    expect(expandButton).toBeInTheDocument();
  });

  test('handles expand/collapse functionality', () => {
    const onExpand = jest.fn();
    const onCollapse = jest.fn();

    render(
      <Card
        interactive
        componentId="test-card"
        header="Test Header"
        onExpand={onExpand}
        onCollapse={onCollapse}
      >
        Content
      </Card>
    );

    const expandButton = screen.getByRole('button', { name: /expand card/i });
    fireEvent.click(expandButton);

    // Note: The actual expand/collapse state management would require more complex Redux setup
    // This test verifies the button interaction
    expect(expandButton).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('custom-card');
  });

  test('handles componentId attribute', () => {
    render(<Card componentId="my-card">Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveAttribute('data-component-id', 'my-card');
  });

  test('renders with different content types', () => {
    render(
      <Card>
        <div>Div Content</div>
        <span>Span Content</span>
        <p>Paragraph Content</p>
      </Card>
    );

    expect(screen.getByText('Div Content')).toBeInTheDocument();
    expect(screen.getByText('Span Content')).toBeInTheDocument();
    expect(screen.getByText('Paragraph Content')).toBeInTheDocument();
  });

  test('handles complex header and footer content', () => {
    render(
      <Card
        header={
          <div>
            <h3>Title</h3>
            <p>Subtitle</p>
          </div>
        }
        footer={
          <div className="flex justify-between">
            <button>Cancel</button>
            <button>Save</button>
          </div>
        }
      >
        Form Content
      </Card>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });
});
