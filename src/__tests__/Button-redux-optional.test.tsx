/**
 * Redux-Optional Button Tests
 * Tests Button component functionality with and without Redux
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../components/atoms/Button';
import { ThemeProvider, UIProvider, useAnalyticsOptional, useThemeOptional, useUIOptional, hasRedux } from '../utils/redux-optional';
import * as indexExports from '../index';

describe('Button Redux Optional', () => {
  describe('Basic functionality', () => {
    it('renders with Redux-optional utilities', () => {
      expect(() => {
        render(
          <ThemeProvider theme={{ mode: 'light' }}>
            <UIProvider uiState={{ loading: { global: false } }}>
              <Button>Test Button</Button>
            </UIProvider>
          </ThemeProvider>
        );
      }).not.toThrow();
    });

    it('exports Redux-optional utilities', () => {
      expect(ThemeProvider).toBeDefined();
      expect(UIProvider).toBeDefined();
      expect(useAnalyticsOptional).toBeDefined();
      expect(useThemeOptional).toBeDefined();
      expect(useUIOptional).toBeDefined();
      expect(hasRedux).toBeDefined();
      expect(typeof hasRedux).toBe('function');
    });

    it('Button component accepts Redux-optional props', () => {
      expect(() => {
        render(<Button enableAnalytics useThemeVariant>Test</Button>);
      }).not.toThrow();
    });
  });

  describe('Integration with main exports', () => {
    it('Redux-optional utilities are exported from main index', () => {
      expect(indexExports.ThemeProvider).toBeDefined();
      expect(indexExports.UIProvider).toBeDefined();
      expect(indexExports.useAnalyticsOptional).toBeDefined();
      expect(indexExports.useThemeOptional).toBeDefined();
      expect(indexExports.useUIOptional).toBeDefined();
      expect(indexExports.hasRedux).toBeDefined();
    });
  });
});
