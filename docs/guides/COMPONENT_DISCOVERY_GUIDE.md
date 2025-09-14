# Component Discovery Guide - @tamyla/ui-components-react

## 🔍 AI Agent Component Discovery

This guide helps AI agents and developers quickly discover and understand available components using the structured component registry.

## 📊 Component Registry Overview

The component library follows **Atomic Design** principles with 4 levels:

- **Atoms** (16 components): Basic building blocks like buttons, inputs, cards
- **Molecules** (42 components): Combinations of atoms like forms, navigation
- **Organisms** (22 components): Complex UI sections like headers, sidebars
- **Applications** (3 components): Full application features
- **Utility** (1 component): Helper components

## 🏗️ Component Categories

### Atoms (16 components)
Basic building blocks that can't be broken down further.

**Common Atoms:**
- `Button` - Base button with variants
- `Input` - Text input with validation
- `Card`, `CardHeader`, `CardTitle`, `CardContent` - Card components
- `StatusIndicator` - Status display
- `ErrorBoundary` - Error handling

### Molecules (42 components)
Simple combinations of atoms that form more complex UI elements.

**Common Molecules:**
- `ButtonPrimary`, `ButtonSecondary`, `ButtonGhost`, `ButtonDanger`, `ButtonSuccess` - Specialized buttons
- `ButtonWithIcon`, `ButtonIconOnly` - Icon-enhanced buttons
- `InputGroup` - Combined input components

### Organisms (22 components)
Complex components that combine multiple molecules and atoms.

### Applications (3 components)
Full application-level features.

### Utility (1 component)
Helper and utility components.

## 🔍 Quick Component Lookup

Use the development utilities to explore components:

```bash
# See all component categories
npm run dev:discover

# Discover components in a specific category
npm run dev:discover atom
npm run dev:discover molecule
npm run dev:discover organism
```

## 📋 Component API Quick Reference

### Button Family
```typescript
// Base Button - most flexible
<Button
  variant="default | destructive | outline | secondary | ghost | link"
  size="xs | sm | default | lg | icon"
  isLoading={boolean}
  leftIcon={ReactNode}
  rightIcon={ReactNode}
  enableAnalytics={boolean}
  useThemeVariant={boolean}
/>

// Specialized Buttons
<ButtonPrimary size="sm | md | lg" fullWidth={boolean} />
<ButtonSuccess size="sm | md | lg" />
<ButtonDanger size="sm | md | lg" />
<ButtonSecondary />
<ButtonGhost />
<ButtonWithIcon leftIcon={ReactNode} />
<ButtonIconOnly icon={ReactNode} />
```

### Input Components
```typescript
<Input
  type="text | email | password | number"
  placeholder="string"
  value="string"
  onChange={(e) => void}
  disabled={boolean}
  required={boolean}
  error={string}
/>
```

### Card Components
```typescript
<Card className="string">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content here
  </CardContent>
</Card>
```

## 🎨 Design Tokens Integration

Components automatically use design tokens. Override with CSS custom properties:

```css
/* Override primary color */
:root {
  --tamyla-color-primary-500: #your-color;
}

/* Override spacing */
:root {
  --tamyla-spacing-4: 1.5rem;
}
```

## 📚 Examples & Patterns

### Basic Button Usage
```tsx
import { Button } from '@tamyla/ui-components-react';

// Simple button
<Button>Click me</Button>

// Button with loading state
<Button isLoading={true}>Loading...</Button>

// Button with icon
<Button leftIcon={<Icon />}>With Icon</Button>
```

### Form Pattern
```tsx
import { Input, Button } from '@tamyla/ui-components-react';

function LoginForm() {
  return (
    <div>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button>Login</Button>
    </div>
  );
}
```

## 🔗 Integration Patterns

### With Redux (Optional)
```tsx
import { Provider } from 'react-redux';
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

<Provider store={store}>
  <TamylaThemeProvider>
    <App />
  </TamylaThemeProvider>
</Provider>
```

### Without Redux
```tsx
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

<TamylaThemeProvider>
  <App />
</TamylaThemeProvider>
```

## 🚀 Performance Notes

- Components use `React.memo` for optimal performance
- Lazy loading for complex components
- Tree-shaking friendly exports
- Bundle size: ~217KB (gzipped)

## 📖 Additional Resources

- [API Reference](API_REFERENCE.md) - Detailed component documentation
- [Migration Guide](MIGRATION_GUIDE.md) - Component migration patterns
- [Troubleshooting](TROUBLESHOOTING.md) - Common issues and solutions
- [Examples](../examples/) - Interactive HTML examples</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\docs\guides\COMPONENT_DISCOVERY_GUIDE.md
