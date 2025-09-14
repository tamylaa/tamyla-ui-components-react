import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../components/molecules/Feedback';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A notification component for displaying important messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'success', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert style={{ maxWidth: '400px' }}>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a default alert message.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>Default alert for general information.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed successfully.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please review before proceeding.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert style={{ maxWidth: '400px' }}>
      <AlertTitle>Action Required</AlertTitle>
      <AlertDescription>
        Your session will expire in 5 minutes. Please save your work.
        <div style={{ marginTop: '0.5rem' }}>
          <button style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}>
            Save Now
          </button>
        </div>
      </AlertDescription>
    </Alert>
  ),
};
