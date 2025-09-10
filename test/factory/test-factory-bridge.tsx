/**
 * Simple factory bridge test - identify the real issue
 */

import React from 'react';
import { FactoryBridge } from './src/core/factory/factory-bridge-core';

// Test component that demonstrates the current issue
export function TestFactoryBridge() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Factory Bridge Test</h1>

      <h3>Test 1: Button Factory</h3>
      <FactoryBridge
        factory="Button"
        config={{ text: 'Test Button', variant: 'primary' }}
      />

      <h3>Test 2: Card Factory</h3>
      <FactoryBridge
        factory="Card"
        config={{ title: 'Test Card', content: 'This is a test card' }}
      />

      <h3>Expected Issues:</h3>
      <ul>
        <li>ButtonFactory needs to be instantiated with `new ButtonFactory()`</li>
        <li>Then called with `buttonFactory.create(config)`</li>
        <li>Our factory registry is probably calling it incorrectly</li>
      </ul>
    </div>
  );
}

export default TestFactoryBridge;
