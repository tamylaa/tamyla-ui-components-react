import type { Meta, StoryObj } from '@storybook/react';
import { Navigation, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from '../components/organisms/Navigation';
import { Button } from '../components/atoms/Button';

const meta: Meta<typeof Navigation> = {
  title: 'Organisms/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation components for building site navigation and menus.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleNavigation: Story = {
  render: () => (
    <Navigation>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', height: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>MyApp</div>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>Home</a>
          <a href="#" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>About</a>
          <a href="#" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>Services</a>
          <a href="#" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>Contact</a>
        </nav>
        <Button>Sign In</Button>
      </div>
    </Navigation>
  ),
};

export const WithMenu: Story = {
  render: () => (
    <Navigation>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</div>

          <NavigationMenu>
            <NavigationMenuItem>
              <NavigationMenuTrigger style={{
                padding: '0.5rem 1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                Products ▼
              </NavigationMenuTrigger>
              <NavigationMenuContent style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                minWidth: '200px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ padding: '0.5rem', color: '#374151', cursor: 'pointer' }}>
                    Web App
                  </div>
                  <div style={{ padding: '0.5rem', color: '#374151', cursor: 'pointer' }}>
                    Mobile App
                  </div>
                  <div style={{ padding: '0.5rem', color: '#374151', cursor: 'pointer' }}>
                    API
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </Navigation>
  ),
};
