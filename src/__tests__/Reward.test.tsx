/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';

// Mock the @tamyla/ui-components module
jest.mock('@tamyla/ui-components', () => ({
  RewardSystem: class {
    config: any;
    initialized: boolean;

    constructor(config = {}) {
      this.config = config;
      this.initialized = false;
    }

    initialize() {
      this.initialized = true;
      return Promise.resolve();
    }

    destroy() {
      this.initialized = false;
    }

    on(event: string, callback: Function) {
      return this;
    }
  }
}));

// Import the Reward component directly to avoid index.ts dependencies
import Reward from '../organisms/Reward';

describe('Reward', () => {
  test('should render without crashing', () => {
    const { container } = render(<Reward />);
    expect(container).toBeDefined();
  });

  test('should render with custom props', () => {
    const { container } = render(
      <Reward
        preset="beginner"
        enableAchievements={true}
        enableXP={true}
        className="test-reward"
      />
    );
    expect(container).toBeDefined();
  });
});
