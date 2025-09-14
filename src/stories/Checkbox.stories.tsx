import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/molecules/FormAdvanced';

const meta: Meta<typeof Checkbox> = {
  title: 'Molecules/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox input component with Redux integration and analytics support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
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
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    checked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Required checkbox',
    error: 'This checkbox must be checked',
  },
};

export const WithAnalytics: Story = {
  args: {
    label: 'Track this checkbox',
    enableAnalytics: true,
    analyticsEvent: 'checkbox_interaction',
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <h3>Checkbox States</h3>

      <Checkbox label="Unchecked checkbox" />

      <Checkbox label="Checked checkbox" checked />

      <Checkbox label="Disabled unchecked" disabled />

      <Checkbox label="Disabled checked" checked disabled />

      <Checkbox label="With error" error="This field is required" />

      <Checkbox
        label="Analytics enabled"
        enableAnalytics
        analyticsEvent="demo_checkbox"
      />

      <div style={{ marginTop: '2rem' }}>
        <h3>Checkbox Group Example</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Checkbox label="Option 1" />
          <Checkbox label="Option 2" checked />
          <Checkbox label="Option 3" />
          <Checkbox label="Option 4" disabled />
        </div>
      </div>
    </div>
  ),
};
