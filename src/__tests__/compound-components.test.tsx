import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/atoms/Card';

// Test compound component access
describe('Card Compound Components', () => {
  it('should export Card sub-components', () => {
    expect(Card).toBeDefined();
    expect(CardHeader).toBeDefined();
    expect(CardTitle).toBeDefined();
    expect(CardContent).toBeDefined();
  });

  it('should support compound component access', () => {
    expect(Card.Header).toBeDefined();
    expect(Card.Title).toBeDefined();
    expect(Card.Content).toBeDefined();
  });

  it('should have consistent component references', () => {
    expect(Card.Header).toBe(CardHeader);
    expect(Card.Title).toBe(CardTitle);
    expect(Card.Content).toBe(CardContent);
  });
});
