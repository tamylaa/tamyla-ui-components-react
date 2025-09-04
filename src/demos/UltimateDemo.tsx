/**
 * Ultimate Component Library Demo
 * Showcasing the complete UI Platform capabilities
 * Hybrid shadcn/ui patterns + Redux integration + Analytics
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../store/slices/uiSlice';

// Import all available components
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/Card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/organisms/Dialog';
import { FormLabel } from '../components/molecules/Form';
import { Navigation, NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '../components/organisms/Navigation';
import { Select, Checkbox, RadioGroup, RadioGroupItem } from '../components/molecules/FormAdvanced';
import { Switch } from '../components/molecules/FormAdvanced';
import { Slider } from '../components/molecules/FormAdvanced';
import { Alert, AlertTitle, AlertDescription, Progress, Badge, Avatar } from '../components/molecules/Feedback';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/molecules/DataDisplay';
import { Calendar } from '../components/molecules/DataDisplay';
import { Skeleton } from '../components/molecules/Loading';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/molecules/Loading';
import { Popover, PopoverTrigger, PopoverContent } from '../components/molecules/Loading';

// Create a demo store
const demoStore = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

// Demo data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
];

const UltimateComponentDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [progress, setProgress] = useState(33);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ultimate UI Platform Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the complete hybrid approach: shadcn/ui design patterns + Redux state management + Analytics tracking
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Badge variant="success" size="lg">Enterprise Ready</Badge>
            <Badge variant="default" size="lg">Redux Integrated</Badge>
            <Badge variant="secondary" size="lg">Analytics Enabled</Badge>
            <Badge variant="warning" size="lg">TypeScript</Badge>
          </div>
        </div>

        {/* Navigation Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧭 Navigation System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Navigation enableAnalytics analyticsEvent="nav-demo">
              <NavigationMenu>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 min-w-[200px]">
                      <p className="text-sm font-medium mb-2">Welcome</p>
                      <p className="text-sm text-muted-foreground">Explore our platform</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 min-w-[200px]">
                      <p className="text-sm font-medium mb-2">Library</p>
                      <p className="text-sm text-muted-foreground">24+ components available</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 min-w-[200px]">
                      <p className="text-sm font-medium mb-2">Insights</p>
                      <p className="text-sm text-muted-foreground">Track user interactions</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            </Navigation>
          </CardContent>
        </Card>

        {/* Enhanced Button Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔘 Enhanced Button Component
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">shadcn/ui Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default" enableAnalytics analyticsEvent="button-default">Default</Button>
                <Button variant="destructive" enableAnalytics analyticsEvent="button-destructive">Destructive</Button>
                <Button variant="outline" enableAnalytics analyticsEvent="button-outline">Outline</Button>
                <Button variant="secondary" enableAnalytics analyticsEvent="button-secondary">Secondary</Button>
                <Button variant="ghost" enableAnalytics analyticsEvent="button-ghost">Ghost</Button>
                <Button variant="link" enableAnalytics analyticsEvent="button-link">Link</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sizes & States</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" enableAnalytics analyticsEvent="button-sm">Small</Button>
                <Button size="default" enableAnalytics analyticsEvent="button-default-size">Default</Button>
                <Button size="lg" enableAnalytics analyticsEvent="button-lg">Large</Button>
                <Button size="icon" enableAnalytics analyticsEvent="button-icon">🔍</Button>
                <Button isLoading loadingText="Loading..." enableAnalytics analyticsEvent="button-loading">Loading State</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Redux Features</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  enableAnalytics
                  analyticsEvent="button-analytics"
                  leftIcon={<span>📊</span>}
                  rightIcon={<span>→</span>}
                >
                  With Analytics
                </Button>
                <Button
                  useThemeVariant
                  enableAnalytics
                  analyticsEvent="button-theme-aware"
                >
                  Theme Aware
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Form Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📝 Advanced Form Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <FormLabel className="text-base font-medium">Select Component</FormLabel>
                  <Select
                    enableAnalytics
                    analyticsEvent="select-demo"
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' },
                      { value: 'option3', label: 'Option 3' }
                    ]}
                    placeholder="Choose an option"
                  />
                </div>

                <div className="space-y-3">
                  <FormLabel className="text-base font-medium">Radio Group</FormLabel>
                  <RadioGroup enableAnalytics analyticsEvent="radio-demo" value="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="r1" />
                      <FormLabel htmlFor="r1">Option 1</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="r2" />
                      <FormLabel htmlFor="r2">Option 2</FormLabel>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox enableAnalytics analyticsEvent="checkbox-demo" id="terms" />
                  <FormLabel htmlFor="terms">Accept terms and conditions</FormLabel>
                </div>

                <div className="space-y-2">
                  <FormLabel className="text-base font-medium">Switch Component</FormLabel>
                  <Switch enableAnalytics analyticsEvent="switch-demo" />
                </div>

                <div className="space-y-2">
                  <FormLabel className="text-base font-medium">Slider Control</FormLabel>
                  <Slider
                    enableAnalytics
                    analyticsEvent="slider-demo"
                    defaultValue={["50"]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Enhanced Input Component
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Input
                  placeholder="Default input with analytics"
                  enableAnalytics
                  analyticsEvent="input-default"
                />

                <Input
                  variant="filled"
                  placeholder="Filled variant"
                  enableAnalytics
                  analyticsEvent="input-filled"
                />

                <Input
                  startIcon={<span>🔍</span>}
                  placeholder="Search with icon"
                  enableAnalytics
                  analyticsEvent="input-search"
                />

                <Input
                  endIcon={<span>📧</span>}
                  type="email"
                  placeholder="Email input"
                  enableAnalytics
                  analyticsEvent="input-email"
                />

                <Input
                  error
                  errorMessage="This field is required"
                  placeholder="Input with error"
                  enableAnalytics
                  analyticsEvent="input-error"
                />

                <Input
                  helpText="This input has helpful guidance"
                  placeholder="Input with help text"
                  enableAnalytics
                  analyticsEvent="input-help"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback & Status Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💬 Feedback Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Alert enableAnalytics analyticsEvent="alert-success">
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive" enableAnalytics analyticsEvent="alert-error">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                </Alert>

                <Alert variant="warning" enableAnalytics analyticsEvent="alert-warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  enableAnalytics
                  analyticsEvent="progress-demo"
                  showValue
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setProgress(prev => Math.min(prev + 10, 100))}
                    enableAnalytics
                    analyticsEvent="progress-increase"
                  >
                    Increase
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(prev => Math.max(prev - 10, 0))}
                    enableAnalytics
                    analyticsEvent="progress-decrease"
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
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                👥 User Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Avatar Components</h3>
                <div className="flex items-center space-x-4">
                  <Avatar enableAnalytics analyticsEvent="avatar-demo" src="https://github.com/shadcn.png" alt="User" />
                  <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="JD" />
                  <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="JS" />
                  <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="BJ" />
                  <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="AB" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Loading States</h3>
                <div className="space-y-4">
                  <Button
                    onClick={simulateLoading}
                    disabled={isLoading}
                    enableAnalytics
                    analyticsEvent="loading-simulate"
                  >
                    {isLoading ? 'Loading...' : 'Simulate Loading'}
                  </Button>

                  {isLoading && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Display Components */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Data Display Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">User Management Table</h3>
                <Table enableAnalytics analyticsEvent="table-demo">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Active' ? 'success' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" enableAnalytics analyticsEvent="table-edit">Edit</Button>
                            <Button size="sm" variant="destructive" enableAnalytics analyticsEvent="table-delete">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Calendar Component</h3>
                <Calendar
                  selected={selectedDate}
                  onDateSelect={setSelectedDate}
                  enableAnalytics
                  analyticsEvent="calendar-demo"
                />
                {selectedDate && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Selected Date:</p>
                    <p className="text-lg">{selectedDate.toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Components Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Hover Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HoverCard enableAnalytics analyticsEvent="hovercard-demo">
                <HoverCardTrigger>
                  <Button variant="outline">Hover me for details</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Interactive Hover Card</h4>
                    <p className="text-sm">This hover card appears when you hover over the trigger button. It can contain rich content and is fully accessible.</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Component: HoverCard</span>
                      <span>Analytics: Enabled</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Popover
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Popover enableAnalytics analyticsEvent="popover-demo">
                <PopoverTrigger>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Popover Content</h4>
                    <p className="text-sm">This is a popover component with custom content. Popovers are great for contextual information and actions.</p>
                    <div className="flex gap-2">
                      <Button size="sm" enableAnalytics analyticsEvent="popover-action">Action</Button>
                      <Button size="sm" variant="outline" enableAnalytics analyticsEvent="popover-cancel">Cancel</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💬 Dialog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog enableAnalytics analyticsEvent="dialog-demo">
                <DialogTrigger>
                  <Button>Open Comprehensive Dialog</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Contact Form</DialogTitle>
                    <DialogDescription>
                      Fill out this form and we'll get back to you soon.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First name"
                        enableAnalytics
                        analyticsEvent="dialog-firstname"
                      />
                      <Input
                        placeholder="Last name"
                        enableAnalytics
                        analyticsEvent="dialog-lastname"
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email address"
                      enableAnalytics
                      analyticsEvent="dialog-email"
                    />
                    <textarea
                      className="w-full p-3 border rounded-md resize-none"
                      rows={4}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleFormChange('message')}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button variant="outline" enableAnalytics analyticsEvent="dialog-cancel">Cancel</Button>
                    </DialogClose>
                    <Button enableAnalytics analyticsEvent="dialog-submit">Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Card Variants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🃏 Enhanced Card Variants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="default" padding="default">
                <h3 className="font-semibold mb-2">Default Card</h3>
                <p className="text-sm text-muted-foreground">Clean and simple card design</p>
              </Card>

              <Card variant="outlined" padding="default">
                <h3 className="font-semibold mb-2">Outlined Card</h3>
                <p className="text-sm text-muted-foreground">Card with border emphasis</p>
              </Card>

              <Card variant="elevated" padding="default">
                <h3 className="font-semibold mb-2">Elevated Card</h3>
                <p className="text-sm text-muted-foreground">Card with shadow depth</p>
              </Card>

              <Card variant="filled" padding="default">
                <h3 className="font-semibold mb-2">Filled Card</h3>
                <p className="text-sm text-muted-foreground">Card with background fill</p>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Platform Statistics */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Platform Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Test Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Redux</div>
                <div className="text-sm text-muted-foreground">State Management</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">TypeScript</div>
                <div className="text-sm text-muted-foreground">Type Safe</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main demo component with Redux Provider
const UltimateComponentLibraryDemo: React.FC = () => {
  return (
    <Provider store={demoStore}>
      <UltimateComponentDemo />
    </Provider>
  );
};

export default UltimateComponentLibraryDemo;
