/**
 * Tamyla UI Components - Theming Guide
 *
 * This guide demonstrates how to use the comprehensive theming system
 * with CSS custom properties, design tokens, and theme switching.
 */

import React from 'react';
import { TamylaThemeProvider, Button, Card, useTamylaTheme } from '../index';

// Example 1: Basic Theme Usage
const BasicThemeExample = () => {
  return (
    <TamylaThemeProvider>
      <div style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        minHeight: '100vh',
        padding: 'var(--space-4)'
      }}>
        <Card style={{
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-6)'
        }}>
          <h1 style={{
            color: 'var(--text-primary)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--space-4)'
          }}>
            Themed Component
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-4)'
          }}>
            This component uses design tokens for consistent theming.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-4)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Primary Button
            </Button>

            <Button style={{
              backgroundColor: 'var(--surface-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-4)'
            }}>
              Secondary Button
            </Button>
          </div>
        </Card>
      </div>
    </TamylaThemeProvider>
  );
};

// Example 2: Theme Hook Usage
const ThemeHookExample = () => {
  const theme = useTamylaTheme();

  return (
    <div>
      <h2>Current Theme Settings:</h2>
      <ul>
        <li>Mode: {theme.currentMode}</li>
        <li>Primary Color: {theme.primaryColor}</li>
        <li>Font Size: {theme.fontSize}</li>
        <li>Animations: {theme.animations ? 'Enabled' : 'Disabled'}</li>
      </ul>

      <h3>Available Design Tokens:</h3>
      <pre>{JSON.stringify(theme.tokens, null, 2)}</pre>
    </div>
  );
};

// Example 3: CSS-in-JS with Theme Variables
const StyledExample = () => {
  const styles = {
    container: {
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)'
    },
    header: {
      color: 'var(--primary)',
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 'var(--font-weight-bold)',
      marginBottom: 'var(--space-3)'
    },
    success: {
      color: 'var(--success)',
      backgroundColor: 'var(--success-50)',
      padding: 'var(--space-2)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--success-200)'
    },
    warning: {
      color: 'var(--warning)',
      backgroundColor: 'var(--warning-50)',
      padding: 'var(--space-2)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--warning-200)'
    },
    error: {
      color: 'var(--error)',
      backgroundColor: 'var(--error-50)',
      padding: 'var(--space-2)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--error-200)'
    }
  };

  return (
    <TamylaThemeProvider>
      <div style={styles.container}>
        <h1 style={styles.header}>🎨 Advanced Theming Example</h1>

        <div style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div style={styles.success}>
            <h3>✅ Success State</h3>
            <p>Uses semantic success colors from design tokens</p>
          </div>

          <div style={styles.warning}>
            <h3>⚠️ Warning State</h3>
            <p>Uses semantic warning colors from design tokens</p>
          </div>

          <div style={styles.error}>
            <h3>❌ Error State</h3>
            <p>Uses semantic error colors from design tokens</p>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            Spacing Scale Examples
          </h2>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {[1, 2, 3, 4, 6, 8].map(size => (
              <div
                key={size}
                style={{
                  width: `var(--space-${size * 4})`,
                  height: `var(--space-${size * 4})`,
                  backgroundColor: 'var(--primary-200)',
                  borderRadius: 'var(--radius-sm)'
                }}
                title={`Space ${size * 4}`}
              />
            ))}
          </div>
        </div>
      </div>
    </TamylaThemeProvider>
  );
};

// Example 4: Complete Application with Theme Switching
const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <button
      onClick={() => setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')}
      style={{
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
        border: 'none',
        padding: 'var(--space-2) var(--space-4)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer'
      }}
    >
      Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

const CompleteExample = () => {
  return (
    <TamylaThemeProvider>
      <div style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        minHeight: '100vh',
        padding: 'var(--space-6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h1 style={{ color: 'var(--text-primary)', fontSize: 'var(--font-size-3xl)' }}>
            🌟 Complete Theming Demo
          </h1>
          <ThemeSwitcher />
        </div>

        <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Card style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
              📊 Dashboard Card
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              This card automatically adapts to the current theme using CSS custom properties.
            </p>
            <Button style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-4)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer'
            }}>
              View Details
            </Button>
          </Card>

          <Card style={{
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)'
          }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
              🎨 Color Palette
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {['primary', 'success', 'warning', 'error'].map(color => (
                <div key={color} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 'var(--space-8)',
                    height: 'var(--space-8)',
                    backgroundColor: `var(--${color})`,
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--space-1)'
                  }} />
                  <small style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-xs)' }}>
                    {color}
                  </small>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </TamylaThemeProvider>
  );
};

export {
  BasicThemeExample,
  ThemeHookExample,
  StyledExample,
  CompleteExample,
  ThemeSwitcher
};
