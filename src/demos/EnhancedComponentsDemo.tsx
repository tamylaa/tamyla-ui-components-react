/**
 * Enhanced Components Demo - Showcasing shadcn/ui patterns with Redux integration
 * Demonstrates the hybrid approach across Button, Input, Card, and Dialog
 */

import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '../components/Dialog';
import { useAppSelector } from '../store/hooks';

const EnhancedComponentsDemo: React.FC = () => {
  const theme = useAppSelector((state: any) => state.theme);
  const uiState = useAppSelector((state: any) => state.ui);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Enhanced Components Demo</h1>
          <p className="text-xl text-muted-foreground">
            shadcn/ui patterns + Your unique Redux capabilities
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
              Theme: {theme.mode}
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full">
              Global Loading: {uiState.loading.global ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Button Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Enhanced Button Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="outlined" padding="default">
              <h3 className="font-semibold mb-4">shadcn/ui Variants</h3>
              <div className="space-y-3">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </Card>

            <Card variant="elevated" padding="default">
              <h3 className="font-semibold mb-4">Sizes</h3>
              <div className="space-y-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🔍</Button>
              </div>
            </Card>

            <Card variant="filled" padding="default">
              <h3 className="font-semibold mb-4">Your Redux Features</h3>
              <div className="space-y-3">
                <Button
                  enableAnalytics={true}
                  analyticsEvent="demo-button-click"
                  variant="default"
                >
                  With Analytics
                </Button>
                <Button
                  isLoading={uiState.loading.global}
                  loadingText="Loading..."
                  variant="outline"
                >
                  Global Loading State
                </Button>
              </div>
            </Card>

            <Card variant="default" padding="default">
              <h3 className="font-semibold mb-4">Combined Features</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  enableAnalytics={true}
                  leftIcon={<span>🚀</span>}
                  rightIcon={<span>→</span>}
                >
                  Launch Demo
                </Button>
                <Button
                  variant="secondary"
                  enableAnalytics={true}
                  leftIcon={<span>📊</span>}
                >
                  Analytics Ready
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Input Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Enhanced Input Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="outlined" padding="default">
              <h3 className="font-semibold mb-4">shadcn/ui Variants</h3>
              <div className="space-y-4">
                <Input
                  variant="default"
                  placeholder="Default input"
                  label="Default"
                />
                <Input
                  variant="filled"
                  placeholder="Filled input"
                  label="Filled"
                />
                <Input
                  variant="ghost"
                  placeholder="Ghost input"
                  label="Ghost"
                />
              </div>
            </Card>

            <Card variant="elevated" padding="default">
              <h3 className="font-semibold mb-4">Sizes</h3>
              <div className="space-y-4">
                <Input
                  size="sm"
                  placeholder="Small input"
                  label="Small"
                />
                <Input
                  size="default"
                  placeholder="Default input"
                  label="Default"
                />
                <Input
                  size="lg"
                  placeholder="Large input"
                  label="Large"
                />
              </div>
            </Card>

            <Card variant="filled" padding="default">
              <h3 className="font-semibold mb-4">Your Redux Features</h3>
              <div className="space-y-4">
                <Input
                  enableAnalytics={true}
                  analyticsEvent="demo-input-change"
                  placeholder="With analytics"
                  label="Analytics Enabled"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                />
                <Input
                  error={error}
                  errorMessage="This field is required"
                  placeholder="With validation"
                  label="With Error"
                  required
                />
                <Input
                  helpText="This input has helpful guidance"
                  placeholder="With help text"
                  label="With Help"
                />
              </div>
            </Card>
          </div>

          <Card variant="default" padding="default">
            <h3 className="font-semibold mb-4">Interactive Demo</h3>
            <div className="space-y-4">
              <Input
                startIcon={<span>🔍</span>}
                placeholder="Search with icon"
                label="Search Input"
                enableAnalytics={true}
                analyticsEvent="search-input-demo"
              />
              <Input
                endIcon={<span>📧</span>}
                type="email"
                placeholder="Enter your email"
                label="Email Input"
                helpText="We'll never share your email"
              />
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setError(!error)}
                >
                  Toggle Error
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setInputValue('')}
                >
                  Clear Input
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Card Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Enhanced Card Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default" padding="default">
              <Card variant="outlined" padding="default" className="mb-4">
                <h3 className="font-semibold mb-2">shadcn/ui Variants</h3>
                <p className="text-sm text-muted-foreground">Default card with clean styling</p>
              </Card>
            </Card>

            <Card variant="outlined" padding="default">
              <h3 className="font-semibold mb-2">Outlined</h3>
              <p className="text-sm text-muted-foreground">Card with border emphasis</p>
            </Card>

            <Card variant="elevated" padding="default">
              <h3 className="font-semibold mb-2">Elevated</h3>
              <p className="text-sm text-muted-foreground">Card with shadow depth</p>
            </Card>

            <Card variant="filled" padding="default">
              <h3 className="font-semibold mb-2">Filled</h3>
              <p className="text-sm text-muted-foreground">Card with background fill</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              variant="elevated"
              padding="default"
              enableAnalytics={true}
              analyticsEvent="interactive-card-demo"
              interactive={true}
              componentId="demo-card-1"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Interactive Card</h3>
                  <span className="text-xs text-muted-foreground">Click to expand</span>
                </div>
              }
            >
              <p className="text-sm text-muted-foreground mb-4">
                This card has Redux state tracking and analytics. Click to see the expand/collapse functionality.
              </p>
              <div className="text-xs text-muted-foreground">
                Component ID: demo-card-1
              </div>
            </Card>

            <Card
              variant="outlined"
              padding="default"
              header="Card with Footer"
              footer={
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Last updated: Just now</span>
                  <Button size="sm" variant="ghost">Action</Button>
                </div>
              }
            >
              <p className="text-sm text-muted-foreground">
                Cards can have headers and footers for structured content presentation.
              </p>
            </Card>
          </div>
        </section>

        {/* Dialog Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Enhanced Dialog Component</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="outlined" padding="default">
              <h3 className="font-semibold mb-4">Basic Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Basic Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Basic Dialog</DialogTitle>
                    <DialogDescription>
                      This is a basic dialog with shadcn/ui styling and Redux analytics.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Dialog content goes here. This dialog tracks interactions through Redux.
                    </p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>

            <Card variant="elevated" padding="default">
              <h3 className="font-semibold mb-4">Analytics Dialog</h3>
              <Dialog
                enableAnalytics={true}
                analyticsEvent="analytics-dialog-demo"
                componentId="demo-dialog-1"
              >
                <DialogTrigger asChild>
                  <Button variant="default">Open Analytics Dialog</Button>
                </DialogTrigger>
                <DialogContent size="lg">
                  <DialogHeader>
                    <DialogTitle>Analytics Enabled Dialog</DialogTitle>
                    <DialogDescription>
                      This dialog tracks all interactions through your Redux analytics system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <div className="space-y-4">
                      <Input
                        label="Name"
                        placeholder="Enter your name"
                        enableAnalytics={true}
                        analyticsEvent="dialog-input-demo"
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        enableAnalytics={true}
                        analyticsEvent="dialog-email-demo"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>

            <Card variant="filled" padding="default">
              <h3 className="font-semibold mb-4">Large Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Open Large Dialog</Button>
                </DialogTrigger>
                <DialogContent size="xl">
                  <DialogHeader>
                    <DialogTitle>Large Dialog Example</DialogTitle>
                    <DialogDescription>
                      This dialog demonstrates the xl size variant with more content.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="First Name" placeholder="John" />
                        <Input label="Last Name" placeholder="Doe" />
                      </div>
                      <Input
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        helpText="Maximum 500 characters"
                      />
                      <Card variant="outlined" padding="sm">
                        <h4 className="font-medium mb-2">Preferences</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Email notifications</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">SMS notifications</span>
                          </label>
                        </div>
                      </Card>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Save Profile</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
        </section>

        {/* Integration Status */}
        <section className="space-y-6">
          <Card variant="elevated" padding="lg">
            <h2 className="text-2xl font-semibold mb-4">Integration Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-medium">Button</div>
                <div className="text-sm text-muted-foreground">Enhanced</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-medium">Input</div>
                <div className="text-sm text-muted-foreground">Created</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-medium">Card</div>
                <div className="text-sm text-muted-foreground">Enhanced</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-medium">Dialog</div>
                <div className="text-sm text-muted-foreground">Created</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium mb-2">Next Steps</h3>
              <ul className="text-sm space-y-1">
                <li>• Create Redux wrappers for additional shadcn/ui components</li>
                <li>• Build Form, Navigation, and Feedback components</li>
                <li>• Add comprehensive integration tests</li>
                <li>• Create documentation for the hybrid approach</li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default EnhancedComponentsDemo;
