/**
 * Redux Features Demo
 * Showcasing Redux integration capabilities
 */

import React, { useState } from 'react';
import { Button, Input, Card } from '@tamyla/ui-components-react';

const ReduxFeaturesDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Redux Features Demo</h1>
          <p className="text-xl text-muted-foreground">
            Showcasing Redux integration capabilities
          </p>
        </div>

        {/* Basic Components */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Components</h3>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Enter your text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReduxFeaturesDemo;
