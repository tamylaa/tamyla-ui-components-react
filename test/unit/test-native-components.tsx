/**
 * Test the new native React components approach
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Card } from './components';

// Simple test component
function TestApp() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Native React Components Test</h1>
      
      <Card 
        variant="outlined" 
        header={<h3>Button Examples</h3>}
        footer={<p>All styled with vanilla CSS classes</p>}
      >
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button isLoading>Loading...</Button>
        </div>
      </Card>
      
      <Card variant="elevated" style={{ marginTop: '20px' }}>
        <h4>Why This Approach is Better:</h4>
        <ul>
          <li>✅ <strong>Native React</strong> - No DOM manipulation issues</li>
          <li>✅ <strong>Type Safety</strong> - Full TypeScript support</li>
          <li>✅ <strong>Redux Ready</strong> - Easy state management integration</li>
          <li>✅ <strong>Same Styles</strong> - Uses vanilla CSS classes</li>
          <li>✅ <strong>Performance</strong> - React's virtual DOM handles rendering</li>
          <li>✅ <strong>Maintainable</strong> - Simple, clear architecture</li>
        </ul>
      </Card>
    </div>
  );
}

// Only run if we're in a browser environment
if (typeof window !== 'undefined' && document.getElementById('root')) {
  const root = createRoot(document.getElementById('root')!);
  root.render(<TestApp />);
}

export default TestApp;
