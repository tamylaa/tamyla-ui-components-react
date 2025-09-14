import type { Meta, StoryObj } from '@storybook/react';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../components/molecules/Form';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';

const meta: Meta<typeof FormItem> = {
  title: 'Molecules/Form',
  component: FormItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form components for building structured forms with validation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormDescription>
          We'll use this email to send you updates.
        </FormDescription>
      </FormItem>

      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <FormDescription>
          Must be at least 8 characters long.
        </FormDescription>
      </FormItem>

      <Button style={{ alignSelf: 'flex-start' }}>Submit</Button>
    </div>
  ),
};

export const FormWithError: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter username" />
        </FormControl>
        <FormMessage>This username is already taken.</FormMessage>
      </FormItem>

      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormDescription>
          We'll send a confirmation email to this address.
        </FormDescription>
      </FormItem>

      <Button variant="destructive" style={{ alignSelf: 'flex-start' }}>
        Try Again
      </Button>
    </div>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input placeholder="John" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Doe" />
          </FormControl>
        </FormItem>
      </div>

      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <textarea
            placeholder="Tell us about yourself..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              resize: 'vertical'
            }}
          />
        </FormControl>
        <FormDescription>
          Brief description for your profile.
        </FormDescription>
      </FormItem>

      <FormItem>
        <FormLabel>Newsletter</FormLabel>
        <FormControl>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter" style={{ fontSize: '0.875rem' }}>
              Subscribe to our newsletter
            </label>
          </div>
        </FormControl>
        <FormDescription>
          Get the latest updates and news.
        </FormDescription>
      </FormItem>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outline">Cancel</Button>
        <Button>Save Profile</Button>
      </div>
    </div>
  ),
};
