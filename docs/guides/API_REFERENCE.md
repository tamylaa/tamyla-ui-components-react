# Component API Reference - @tamyla/ui-components-react

## 📋 Overview

This document provides comprehensive API documentation for all components in the @tamyla/ui-components-react library, organized by atomic design principles.

## 🎯 Quick Reference

### Component Categories
- **Atoms** (8 components): Basic building blocks
- **Molecules** (6 components): Simple combinations of atoms
- **Organisms** (5 components): Complex components
- **Applications** (3 components): Full application features

### Key Features
- ✅ **TypeScript Support**: Full type safety with strict typing
- ✅ **Redux Optional**: Works with/without Redux Toolkit
- ✅ **Theme Integration**: Automatic theme adaptation
- ✅ **Performance Optimized**: Smart memoization and lazy loading
- ✅ **Enterprise Security**: XSS prevention and CSP compliance

---

## 🔘 Button Components

### Button (Base Component)

The foundational button component with full variant support and theme integration.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'icon'` | `'default'` | Size variant |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `leftIcon` | `ReactNode` | - | Icon on the left side |
| `rightIcon` | `ReactNode` | - | Icon on the right side |
| `enableAnalytics` | `boolean` | `false` | Enable click tracking |
| `useThemeVariant` | `boolean` | `false` | Auto-adjust based on theme |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |

**Usage Examples:**
```tsx
// Basic usage
<Button>Click me</Button>

// With variants and sizes
<Button variant="primary" size="lg">Large Primary</Button>
<Button variant="ghost" size="sm">Small Ghost</Button>

// With icons
<Button leftIcon={<Icon />} rightIcon={<ChevronRight />}>
  With Icons
</Button>

// Loading state
<Button isLoading>Processing...</Button>
```

### ButtonSuccess

Success-themed button component with simplified API.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `ReactNode` | - | Button content |

**Usage Examples:**
```tsx
<ButtonSuccess>Save Changes</ButtonSuccess>
<ButtonSuccess size="lg" fullWidth>Complete Setup</ButtonSuccess>
```

### ButtonPrimary

Primary action button with enhanced styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `ReactNode` | - | Button content |

### ButtonSecondary

Secondary action button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `ReactNode` | - | Button content |

### ButtonGhost

Subtle secondary button with transparent background.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `ReactNode` | - | Button content |

### ButtonDanger

Destructive action button for delete/cancel operations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `fullWidth` | `boolean` | `false` | Full width button |
| `className` | `string` | - | Additional CSS classes |
| `onClick` | `function` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `ReactNode` | - | Button content |

---

## 📝 Form Components

### Input

Text input component with validation and theme integration.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Uncontrolled default value |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `error` | `boolean` | `false` | Error state |
| `className` | `string` | - | Additional CSS classes |
| `onChange` | `function` | - | Change handler |
| `onBlur` | `function` | - | Blur handler |
| `onFocus` | `function` | - | Focus handler |

**Usage Examples:**
```tsx
// Basic input
<Input placeholder="Enter your name" />

// With validation
<Input
  required
  error={!isValid}
  placeholder="Email address"
/>

// Controlled input
<Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
/>
```

### Form Components

#### FormField
Form field wrapper with label, input, and error message.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Field name |
| `label` | `string` | - | Field label |
| `error` | `string` | - | Error message |
| `required` | `boolean` | `false` | Required field |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Form input component |

#### FormInput
Enhanced input component for forms.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `className` | `string` | - | Additional CSS classes |

#### FormTextarea
Multi-line text input for forms.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `rows` | `number` | `3` | Number of rows |
| `className` | `string` | - | Additional CSS classes |

**Usage Examples:**
```tsx
<FormField
  name="email"
  label="Email Address"
  required
  error={errors.email}
>
  <FormInput
    type="email"
    placeholder="Enter your email"
  />
</FormField>

<FormField
  name="message"
  label="Message"
>
  <FormTextarea
    placeholder="Enter your message"
    rows={5}
  />
</FormField>
```

---

## 📄 Card Components

### Card

Content container with shadow and border options.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Card style variant |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### CardHeader

Card header section.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Header content |

### CardTitle

Card title component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Title content |

### CardContent

Card content section.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Content |

**Usage Examples:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
    <Button>Action</Button>
  </CardContent>
</Card>
```

---

## 🔍 Search Components

### SearchBar

Search input with button and advanced features.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `value` | `string` | - | Search value |
| `onSearch` | `function` | - | Search handler |
| `onChange` | `function` | - | Value change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional CSS classes |

### SearchBarNew

Enhanced search bar with additional features.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Placeholder text |
| `value` | `string` | - | Search value |
| `onSearch` | `function` | - | Search handler |
| `onChange` | `function` | - | Value change handler |
| `showFilters` | `boolean` | `false` | Show filter options |
| `className` | `string` | - | Additional CSS classes |

**Usage Examples:**
```tsx
<SearchBar
  placeholder="Search products..."
  onSearch={(query) => console.log(query)}
/>

<SearchBarNew
  placeholder="Search with filters..."
  showFilters
  onSearch={(query, filters) => handleSearch(query, filters)}
/>
```

---

## 🔔 Feedback Components

### Alert

Informational alert component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Alert style |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Alert content |

### AlertTitle

Alert title component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Title content |

### AlertDescription

Alert description component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Description content |

**Usage Examples:**
```tsx
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>
```

---

## 🎨 Theming Components

### TamylaThemeProvider

Theme context provider with Redux integration.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `theme` | `object` | - | Custom theme object |
| `enablePersistence` | `boolean` | `true` | Persist theme choice |

### useTamylaTheme

Theme hook for accessing current theme.

**Returns:**
```typescript
{
  currentMode: 'light' | 'dark';
  primaryColor: string;
  fontSize: string;
  // ... other theme properties
}
```

**Usage Examples:**
```tsx
// App setup
function App() {
  return (
    <TamylaThemeProvider>
      <MyApp />
    </TamylaThemeProvider>
  );
}

// Using theme hook
function ThemedComponent() {
  const theme = useTamylaTheme();

  return (
    <div style={{ color: theme.primaryColor }}>
      Themed content
    </div>
  );
}
```

---

## 📊 Design Tokens

### Colors

The library provides comprehensive color tokens:

```typescript
// Primary colors (11-step scale)
designTokens.colors.primary[50]   // #eff6ff
designTokens.colors.primary[500]  // #3b82f6
designTokens.colors.primary[900]  // #1e3a8a

// Neutral colors (10-step scale)
designTokens.colors.neutral[50]   // #fafafa
designTokens.colors.neutral[500]  // #737373
designTokens.colors.neutral[900]  // #171717

// Semantic colors
designTokens.colors.success[500]  // #10b981
designTokens.colors.warning[500]  // #f59e0b
designTokens.colors.error[500]    // #ef4444
```

### Spacing

Standard spacing scale:

```typescript
designTokens.spacing[0]   // 0
designTokens.spacing[1]   // 0.25rem
designTokens.spacing[2]   // 0.5rem
designTokens.spacing[4]   // 1rem
designTokens.spacing[8]   // 2rem
designTokens.spacing[16]  // 4rem
```

### Border Radius

Border radius tokens:

```typescript
designTokens.borderRadius.none   // 0
designTokens.borderRadius.sm     // 0.125rem
designTokens.borderRadius.md     // 0.375rem
designTokens.borderRadius.lg     // 0.5rem
designTokens.borderRadius.xl     // 0.75rem
designTokens.borderRadius.full   // 9999px
```

---

## 🔧 Utility Functions

### Performance Optimization

```typescript
import { smartMemo, autoMemo, heavyMemo } from '@tamyla/ui-components-react';

// Smart memoization based on component complexity
const MyComponent = smartMemo((props) => <div>{props.children}</div>);
```

### Async Safety

```typescript
import { safeAsync, safeFetch } from '@tamyla/ui-components-react';

// Safe async operations
const data = await safeAsync(async () => {
  const response = await safeFetch('/api/data');
  return response.json();
});
```

### DOM Safety

```typescript
import { sanitizeHTML, safeSetInnerHTML } from '@tamyla/ui-components-react';

// Safe HTML rendering
const safeHTML = sanitizeHTML(userInput);
<div dangerouslySetInnerHTML={safeSetInnerHTML(safeHTML)} />
```

---

## 📚 Additional Resources

- **[Full README](README.md)**: Complete package documentation
- **[Storybook](https://storybook.your-domain.com)**: Interactive component examples
- **[Migration Guide](MIGRATION_GUIDE.md)**: Transition between component versions
- **[Troubleshooting](TROUBLESHOOTING.md)**: Common issues and solutions

---

*This API reference is automatically generated and kept in sync with the component implementations.*</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\API_REFERENCE.md
