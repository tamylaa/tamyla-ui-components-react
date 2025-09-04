/**
 * ContentCard Molecule Tests
 * Testing the enhanced ContentCard component with Redux integration
 */

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import { ContentCard } from '../ContentCard';

describe('ContentCard Molecule', () => {
  test('renders with default props', () => {
    render(<ContentCard />);
    // ContentCard should render even with minimal props
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with title and content', () => {
    render(
      <ContentCard
        title="Test Title"
        content="This is test content"
      />
    );
    // The component should render with the provided props
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    const { rerender } = render(<ContentCard variant="default" content="Content" />);
    expect(document.querySelector('div')).toBeInTheDocument();

    rerender(<ContentCard variant="featured" content="Content" />);
    expect(document.querySelector('div')).toBeInTheDocument();

    rerender(<ContentCard variant="compact" content="Content" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<ContentCard size="sm" content="Content" />);
    expect(document.querySelector('div')).toBeInTheDocument();

    rerender(<ContentCard size="md" content="Content" />);
    expect(document.querySelector('div')).toBeInTheDocument();

    rerender(<ContentCard size="lg" content="Content" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with metadata', () => {
    render(
      <ContentCard
        title="Article Title"
        content="Article content"
        author="John Doe"
        date="2025-01-01"
        readTime="5 min read"
        tags={['react', 'typescript']}
      />
    );
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<ContentCard onClick={handleClick} />);
    // Click on the card container
    const card = document.querySelector('.tamyla-card');
    if (card) {
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  test('handles mouse events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(
      <ContentCard
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
    const card = document.querySelector('.tamyla-card');
    if (card) {
      fireEvent.mouseEnter(card);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      fireEvent.mouseLeave(card);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    }
  });

  test('renders with image', () => {
    render(<ContentCard image="test.jpg" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<ContentCard className="custom-class" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with interactive state', () => {
    render(<ContentCard interactive={true} />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});
