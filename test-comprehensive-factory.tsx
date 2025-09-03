/**
 * Comprehensive Factory Bridge Test - All Component Types
 * Tests both class-based and function-based factories
 */

import React from 'react';
import { FactoryBridge } from './src/core/factory/factory-bridge-core';

function ComprehensiveFactoryTest() {
  const classBasedFactories = [
    { name: 'Button', config: { text: 'Class-Based Button', variant: 'primary' } },
    { name: 'Card', config: { title: 'Class-Based Card', content: 'Testing card factory' } },
    { name: 'Input', config: { type: 'text', placeholder: 'Class-Based Input', label: 'Test Input' } },
    { name: 'StatusIndicator', config: { status: 'success', text: 'Class-Based Status' } },
    { name: 'ActionCard', config: { title: 'Class-Based Action Card', action: 'Click me' } },
  ];

  const functionBasedFactories = [
    { name: 'SearchInterface', config: { placeholder: 'Function-Based Search' } },
    { name: 'ContentCard', config: { title: 'Function-Based Content Card' } },
    { name: 'FileList', config: { files: [], showEmpty: true } },
    { name: 'Notification', config: { message: 'Function-Based Notification', type: 'info' } },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧪 Comprehensive Factory Bridge Test</h1>
      
      <div style={{ marginBottom: '30px', padding: '15px', background: '#f0f8ff', borderRadius: '8px' }}>
        <h2>🔧 What We're Testing:</h2>
        <ul>
          <li><strong>Class-based factories</strong> - Need `new FactoryClass()` instantiation</li>
          <li><strong>Function-based factories</strong> - Direct function calls</li>
          <li><strong>Our safeCall fix</strong> - Should handle both patterns correctly</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2>🏗️ Class-Based Factories</h2>
          <p><em>These were broken before our fix</em></p>
          {classBasedFactories.map((factory, index) => (
            <div key={index} style={{ 
              margin: '10px 0', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              background: '#fff'
            }}>
              <h4>{factory.name}</h4>
              <FactoryBridge
                factory={factory.name}
                config={factory.config}
              />
            </div>
          ))}
        </div>

        <div>
          <h2>⚡ Function-Based Factories</h2>
          <p><em>These should work regardless</em></p>
          {functionBasedFactories.map((factory, index) => (
            <div key={index} style={{ 
              margin: '10px 0', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              background: '#fff'
            }}>
              <h4>{factory.name}</h4>
              <FactoryBridge
                factory={factory.name}
                config={factory.config}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#f0fff0', borderRadius: '8px' }}>
        <h2>✅ Expected Results:</h2>
        <ul>
          <li><strong>All components</strong> should render without DOM appendChild errors</li>
          <li><strong>Class-based factories</strong> now work because we fixed instantiation</li>
          <li><strong>Function-based factories</strong> continue to work as before</li>
          <li><strong>Fallback elements</strong> shown for any that still fail</li>
        </ul>
      </div>
    </div>
  );
}

export default ComprehensiveFactoryTest;
