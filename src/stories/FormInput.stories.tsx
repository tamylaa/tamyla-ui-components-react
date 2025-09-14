import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from '../components/molecules/Form';

const meta: Meta<typeof FormInput> = {
  title: 'Molecules/Form Input',
  component: FormInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enhanced input component with Redux integration and analytics support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    placeholder: {
      control: 'text',
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
    placeholder: 'Enter text...',
    type: 'text',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Input with error',
    error: 'This field is required',
  },
};

export const WithAnalytics: Story = {
  args: {
    placeholder: 'Tracked input',
    enableAnalytics: true,
    analyticsEvent: 'input_change',
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <h3>Input Types</h3>

      <FormInput name="text" type="text" placeholder="Text input" />

      <FormInput name="email" type="email" placeholder="Email input" />

      <FormInput name="password" type="password" placeholder="Password input" />

      <FormInput name="number" type="number" placeholder="Number input" />

      <FormInput name="tel" type="tel" placeholder="Phone input" />

      <FormInput name="url" type="url" placeholder="URL input" />

      <div style={{ marginTop: '2rem' }}>
        <h3>States</h3>

        <FormInput name="normal" placeholder="Normal state" />

        <FormInput name="disabled" placeholder="Disabled state" disabled />

        <FormInput name="error" placeholder="Error state" error="Invalid input" />

        <FormInput
          name="analytics"
          placeholder="Analytics enabled"
          enableAnalytics
          analyticsEvent="demo_input"
        />
      </div>
    </div>
  ),
};
