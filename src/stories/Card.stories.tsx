import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/Card';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A content container with shadow and border options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: '300px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content. It can contain any React elements.</p>
      </CardContent>
    </Card>
  ),
};

export const WithShadow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card style={{ width: '200px', boxShadow: 'var(--shadow-sm)' }}>
        <CardContent style={{ padding: '1rem' }}>
          <p>Small shadow</p>
        </CardContent>
      </Card>
      <Card style={{ width: '200px', boxShadow: 'var(--shadow-md)' }}>
        <CardContent style={{ padding: '1rem' }}>
          <p>Medium shadow</p>
        </CardContent>
      </Card>
      <Card style={{ width: '200px', boxShadow: 'var(--shadow-lg)' }}>
        <CardContent style={{ padding: '1rem' }}>
          <p>Large shadow</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ComplexCard: Story = {
  render: () => (
    <Card style={{ width: '400px' }}>
      <CardHeader>
        <CardTitle>Project Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span>Progress:</span>
          <span>75%</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
          <div style={{ height: '100%', width: '75%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Team:</span>
          <span style={{ fontSize: '0.75rem' }}>Alice, Bob, Charlie</span>
        </div>
      </CardContent>
    </Card>
  ),
};
