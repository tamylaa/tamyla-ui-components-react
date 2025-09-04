/**
 * Simple Components Demo
 * Clean showcase of basic UI components
 * Perfect for quick component overview
 */

import React, { useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/Card';
import { Alert, AlertTitle, AlertDescription, Progress, Badge, Avatar } from '../components/molecules/Feedback';

const SimpleComponentsDemo: React.FC = () => {
  const [progress, setProgress] = useState(33);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Simple Components Demo</h1>
          <p className="text-xl text-muted-foreground">
            Clean and simple showcase of our UI component library
          </p>
          <Badge variant="success" size="lg">Ready to Use</Badge>
        </div>

        {/* Basic Components */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>

        {/* Feedback Components */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Alert>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} showValue />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setProgress(prev => Math.min(prev + 10, 100))}
                >
                  Increase
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgress(prev => Math.max(prev - 10, 0))}
                >
                  Decrease
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Avatar Components */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar src="https://github.com/shadcn.png" alt="User" />
              <Avatar fallback="JD" />
              <Avatar fallback="JS" />
              <Avatar fallback="BJ" />
              <Avatar fallback="AB" />
            </div>
          </CardContent>
        </Card>

        {/* Card Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This card has an outlined border for subtle emphasis.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This card has elevation with shadow for depth.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Component Library Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">TypeScript</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">ESM</div>
                <div className="text-sm text-muted-foreground">Compatible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">CJS</div>
                <div className="text-sm text-muted-foreground">Compatible</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleComponentsDemo;
