/**
 * Theme Integration Test Component
 * Tests that components are properly using CSS custom properties from the theme system
 */

import React from 'react';
import { Button, Badge, Alert } from '@tamyla/ui-components-react';

const ThemeTest: React.FC = () => {
  return (
    <div style={{
      padding: 'var(--space-4)',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-6)',
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)'
      }}>
        🎨 Theme Integration Test
      </h1>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)'
        }}>
          Button Variants
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <Button variant="default">Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)'
        }}>
          Badge Variants
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)'
        }}>
          Alert Variants
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Alert variant="default">This is a default alert</Alert>
          <Alert variant="destructive">This is a destructive alert</Alert>
          <Alert variant="success">This is a success alert</Alert>
          <Alert variant="warning">This is a warning alert</Alert>
          <Alert variant="info">This is an info alert</Alert>
        </div>
      </div>

      <div style={{
        padding: 'var(--space-4)',
        backgroundColor: 'var(--surface-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)'
      }}>
        <h3 style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)',
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          Theme Variables Test
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-sm)',
          margin: 0
        }}>
          This card uses CSS custom properties for all styling. If theming is working correctly,
          all colors, spacing, and typography should match the design tokens.
        </p>
      </div>
    </div>
  );
};

export default ThemeTest;
