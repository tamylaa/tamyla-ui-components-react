/**
 * Hybrid Component Library Demo - Showcasing shadcn/ui patterns with Redux integration
 */

import React, { useState } from 'react';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Card } from '../components/atoms/Card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/organisms/Dialog';
import { FormInput, FormTextarea, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../components/molecules/Form';
import { useAppSelector } from '../store/hooks';

const HybridDemo: React.FC = () => {
  const theme = useAppSelector(state => state.theme);
  const uiState = useAppSelector(state => state.ui);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Hybrid Component Library</h1>
          <p className="text-xl text-muted-foreground">
            shadcn/ui patterns + Your unique Redux capabilities
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
              Theme: {theme.mode}
            </span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full">
              Loading: {uiState.loading.global ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Enhanced Button Showcase */}
        <Card variant="elevated" header="Enhanced Button Component">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">shadcn/ui Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Your Redux Features</h3>
              <div className="flex flex-wrap gap-4">
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
            </div>
          </div>
        </Card>

        {/* Enhanced Input Showcase */}
        <Card variant="outlined" header="Enhanced Input Component">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">shadcn/ui Variants</h3>
              <div className="space-y-4">
                <Input
                  variant="default"
                  placeholder="Default input"
                  startIcon={<span>🔍</span>}
                />
                <Input
                  variant="filled"
                  placeholder="Filled input"
                  endIcon={<span>✓</span>}
                />
                <Input
                  variant="ghost"
                  placeholder="Ghost input"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Your Redux Features</h3>
              <Input
                enableAnalytics={true}
                analyticsEvent="demo-input-change"
                placeholder="Input with analytics tracking"
                helpText="This input tracks user interactions via Redux"
              />
            </div>
          </div>
        </Card>

        {/* Enhanced Card Showcase */}
        <Card
          variant="default"
          header="Enhanced Card Component"
          enableAnalytics={true}
          analyticsEvent="card-interaction"
          interactive={true}
          componentId="demo-card"
        >
          <p className="text-muted-foreground mb-4">
            This card has Redux state tracking and analytics. Click to expand/collapse.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Interactive with Redux state management
            </span>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </div>
        </Card>

        {/* Dialog Showcase */}
        <Card variant="elevated" header="Enhanced Dialog Component">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Click the button below to open a dialog with Redux analytics tracking.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  enableAnalytics={true}
                  analyticsEvent="dialog-open"
                >
                  Open Dialog
                </Button>
              </DialogTrigger>
              <DialogContent size="lg">
                <DialogHeader>
                  <DialogTitle>Hybrid Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog combines shadcn/ui patterns with your Redux analytics.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Dialog interactions are tracked via Redux for analytics and state management.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    enableAnalytics={true}
                    analyticsEvent="dialog-confirm"
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Form Showcase */}
        <Card variant="outlined" header="Enhanced Form Components">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={errors.name}
              isRequired={true}
              enableAnalytics={true}
              analyticsEvent="form-name-input"
              placeholder="Enter your full name"
              startIcon={<span>👤</span>}
            />

            <FormInput
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              isRequired={true}
              enableAnalytics={true}
              analyticsEvent="form-email-input"
              placeholder="Enter your email"
              startIcon={<span>📧</span>}
            />

            <FormTextarea
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleInputChange('message')}
              error={errors.message}
              isRequired={true}
              enableAnalytics={true}
              analyticsEvent="form-message-input"
              placeholder="Enter your message"
              description="Tell us what's on your mind"
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                enableAnalytics={true}
                analyticsEvent="form-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                enableAnalytics={true}
                analyticsEvent="form-submit"
              >
                Submit Form
              </Button>
            </div>
          </form>
        </Card>

        {/* Redux State Display */}
        <Card variant="filled" header="Redux State Monitor">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Redux State</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Theme State</h4>
                <pre className="text-sm">{JSON.stringify(theme, null, 2)}</pre>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">UI State</h4>
                <pre className="text-sm">{JSON.stringify(uiState, null, 2)}</pre>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HybridDemo;
