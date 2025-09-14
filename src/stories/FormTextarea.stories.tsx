import type { Meta, StoryObj } from '@storybook/react';
import { FormTextarea } from '../components/molecules/Form';

const meta: Meta<typeof FormTextarea> = {
  title: 'Molecules/Form Textarea',
  component: FormTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enhanced textarea component with Redux integration and analytics support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    rows: {
      control: { type: 'number', min: 1, max: 10 },
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    enableAnalytics: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'message',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const Small: Story = {
  args: {
    name: 'comment',
    placeholder: 'Short comment...',
    rows: 2,
  },
};

export const Large: Story = {
  args: {
    name: 'description',
    placeholder: 'Detailed description...',
    rows: 8,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    placeholder: 'Disabled textarea',
    disabled: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    name: 'error',
    placeholder: 'Textarea with error',
    error: 'This field is required',
    rows: 4,
  },
};

export const WithAnalytics: Story = {
  args: {
    name: 'analytics',
    placeholder: 'Tracked textarea',
    enableAnalytics: true,
    analyticsEvent: 'textarea_change',
    rows: 4,
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <h3>Textarea Sizes</h3>

      <FormTextarea name="small" placeholder="Small textarea (2 rows)" rows={2} />

      <FormTextarea name="medium" placeholder="Medium textarea (4 rows)" rows={4} />

      <FormTextarea name="large" placeholder="Large textarea (6 rows)" rows={6} />

      <div style={{ marginTop: '2rem' }}>
        <h3>States</h3>

        <FormTextarea name="normal" placeholder="Normal state" rows={3} />

        <FormTextarea name="disabled" placeholder="Disabled state" disabled rows={3} />

        <FormTextarea name="error" placeholder="Error state" error="Please enter a message" rows={3} />

        <FormTextarea
          name="analytics"
          placeholder="Analytics enabled"
          enableAnalytics
          analyticsEvent="demo_textarea"
          rows={3}
        />
      </div>
    </div>
  ),
};
