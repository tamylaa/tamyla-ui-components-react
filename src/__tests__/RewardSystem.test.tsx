/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Reward } from '../index.ts';

describe('Reward', () => {
  test('should be importable', () => {
    expect(Reward).toBeDefined();
  });

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
    expect(container.querySelector('.test-reward')).toBeInTheDocument();
  });
});
