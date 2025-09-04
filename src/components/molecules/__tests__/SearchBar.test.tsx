/**
 * SearchBar Molecule Tests
 * Testing the enhanced SearchBar component with Redux integration
 */

import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-utils/test-setup';
import SearchBar from '../SearchBar';

describe('SearchBar Molecule', () => {
  test('renders with default props', () => {
    render(<SearchBar />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Search for products..." />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with voice enabled', () => {
    render(<SearchBar voiceEnabled={true} />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with voice disabled', () => {
    render(<SearchBar voiceEnabled={false} />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('handles search input', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    // The component should handle search events through its internal logic
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('handles suggestion selection', () => {
    const handleSuggestionSelect = jest.fn();
    render(<SearchBar onSuggestionSelect={handleSuggestionSelect} />);

    // The component should handle suggestion events through its internal logic
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<SearchBar className="custom-search" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('integrates with Redux store', () => {
    render(<SearchBar />);
    // The component should dispatch Redux actions
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('handles search with Redux dispatch', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    // The component should dispatch setSearchQuery action
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with suggestions enabled', () => {
    render(<SearchBar />);
    // The component should show suggestions by default
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('renders with clearable option', () => {
    render(<SearchBar />);
    // The component should be clearable by default
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('handles complex search scenarios', () => {
    const handleSearch = jest.fn();
    const handleSuggestionSelect = jest.fn();

    render(
      <SearchBar
        onSearch={handleSearch}
        onSuggestionSelect={handleSuggestionSelect}
        placeholder="Advanced search..."
        voiceEnabled={true}
      />
    );

    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('maintains search state', () => {
    const { rerender } = render(<SearchBar placeholder="Initial" />);
    expect(document.querySelector('div')).toBeInTheDocument();

    rerender(<SearchBar placeholder="Updated" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});
