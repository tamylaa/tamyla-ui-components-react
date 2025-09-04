/**
 * Comprehensive Component Demo
 * Showcasing the hybrid shadcn/ui + Redux approach
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../store/slices/uiSlice';

// Import all components
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/Card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/organisms/Dialog';
import { FormLabel } from '../components/molecules/Form';
import { Navigation, NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from '../components/organisms/Navigation';
import { Select, Checkbox, RadioGroup, RadioGroupItem } from '../components/molecules/FormAdvanced';
import { Switch } from '../components/molecules/FormAdvanced';
import { Slider } from '../components/molecules/FormAdvanced';
import { Alert, AlertTitle, AlertDescription } from '../components/molecules/Feedback';
import { Progress } from '../components/molecules/Feedback';
import { Badge } from '../components/molecules/Feedback';
import { Avatar } from '../components/molecules/Feedback';
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
];

const ComponentDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [progress, setProgress] = useState(33);
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">UI Platform Component Library</h1>
          <p className="text-xl text-muted-foreground">
            Hybrid shadcn/ui patterns with Redux integration
          </p>
          <Badge variant="success" size="lg">Enterprise Ready</Badge>
        </div>

        {/* Navigation Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation System</CardTitle>
          </CardHeader>
          <CardContent>
            <Navigation enableAnalytics analyticsEvent="nav-demo">
              <NavigationMenu>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4">
                      <p className="text-sm">Welcome to our platform</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4">
                      <p className="text-sm">Explore our component library</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Analytics</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4">
                      <p className="text-sm">View usage analytics</p>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            </Navigation>
          </CardContent>
        </Card>

        {/* Form Components Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Form Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select */}
              <div className="space-y-2">
                <FormLabel>Select Component</FormLabel>
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

              {/* Radio Group */}
              <div className="space-y-2">
                <FormLabel>Radio Group</FormLabel>
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

              {/* Checkbox */}
              <div className="space-y-2">
                <FormLabel>Checkbox</FormLabel>
                <div className="flex items-center space-x-2">
                  <Checkbox enableAnalytics analyticsEvent="checkbox-demo" id="terms" />
                  <FormLabel htmlFor="terms">Accept terms</FormLabel>
                </div>
              </div>

              {/* Switch */}
              <div className="space-y-2">
                <FormLabel>Switch</FormLabel>
                <Switch enableAnalytics analyticsEvent="switch-demo" />
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <FormLabel>Slider</FormLabel>
              <Slider
                enableAnalytics
                analyticsEvent="slider-demo"
                defaultValue={["50"]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Feedback Components Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Progress & Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Progress & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
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
                <Button
                  size="sm"
                  onClick={() => setProgress(prev => Math.min(prev + 10, 100))}
                >
                  Increase Progress
                </Button>
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
        </div>

        {/* Data Display Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Data Display Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">User Table</h3>
                <Table enableAnalytics analyticsEvent="table-demo">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Calendar */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Calendar</h3>
                <Calendar
                  selected={selectedDate}
                  onDateSelect={setSelectedDate}
                  enableAnalytics
                  analyticsEvent="calendar-demo"
                />
                {selectedDate && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {selectedDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Components Demo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HoverCard */}
          <Card>
            <CardHeader>
              <CardTitle>Hover Card</CardTitle>
            </CardHeader>
            <CardContent>
              <HoverCard enableAnalytics analyticsEvent="hovercard-demo">
                <HoverCardTrigger>
                  <Button variant="outline">Hover me</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Interactive Card</h4>
                    <p className="text-sm">This appears when you hover over the trigger.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>

          {/* Popover */}
          <Card>
            <CardHeader>
              <CardTitle>Popover</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover enableAnalytics analyticsEvent="popover-demo">
                <PopoverTrigger>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Popover Content</h4>
                    <p className="text-sm">This is a popover component with custom content.</p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog enableAnalytics analyticsEvent="dialog-demo">
                <DialogTrigger>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to proceed with this action?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={simulateLoading} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Simulate Loading'}
              </Button>

              {isLoading && (
                <div className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Avatar Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar enableAnalytics analyticsEvent="avatar-demo" src="https://github.com/shadcn.png" alt="User" />
              <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="JD" />
              <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="JS" />
              <Avatar enableAnalytics analyticsEvent="avatar-demo" fallback="BJ" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main demo component with Redux Provider
const ComponentLibraryDemo: React.FC = () => {
  return (
    <Provider store={demoStore}>
      <ComponentDemo />
    </Provider>
  );
};

export default ComponentLibraryDemo;
