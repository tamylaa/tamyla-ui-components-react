import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/molecules/FormAdvanced';

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A select dropdown component with Redux integration and analytics support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
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

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: 'option2',
    placeholder: 'Select an option',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
    error: 'This field is required',
  },
};

export const WithAnalytics: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
    enableAnalytics: true,
    analyticsEvent: 'option_selected',
  },
};

export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
      <div>
        <h3>Basic Select</h3>
        <Select options={sampleOptions} placeholder="Choose an option" />
      </div>

      <div>
        <h3>With Pre-selected Value</h3>
        <Select options={sampleOptions} value="option2" />
      </div>

      <div>
        <h3>Disabled State</h3>
        <Select options={sampleOptions} placeholder="Disabled select" disabled />
      </div>

      <div>
        <h3>Error State</h3>
        <Select options={sampleOptions} placeholder="Select with error" error="Please select an option" />
      </div>

      <div>
        <h3>Analytics Enabled</h3>
        <Select
          options={sampleOptions}
          placeholder="Tracked select"
          enableAnalytics
          analyticsEvent="demo_select_change"
        />
      </div>
    </div>
  ),
};
