import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/molecules/Feedback';

const meta: Meta<typeof Badge> = {
  title: 'Molecules/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status indicator component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge style={{ fontSize: '0.75rem', padding: '0.125rem 0.375rem' }}>Small</Badge>
      <Badge>Default</Badge>
      <Badge style={{ fontSize: '1.125rem', padding: '0.375rem 0.75rem' }}>Large</Badge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Badge variant="success">Online</Badge>
        <span>System is operational</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Badge variant="destructive">Offline</Badge>
        <span>System maintenance in progress</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Badge variant="outline">Pending</Badge>
        <span>Waiting for approval</span>
      </div>
    </div>
  ),
};
