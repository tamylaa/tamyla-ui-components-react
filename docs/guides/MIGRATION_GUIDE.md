# Migration Guide - @tamyla/ui-components-react

## 📋 Overview

This guide helps you migrate between different components and versions of the @tamyla/ui-components-react library. It provides step-by-step instructions for common migration scenarios.

## 🎯 Migration Scenarios

### From ButtonSuccess to Button

#### Why Migrate?
- **Consistency**: Unified component API across all buttons
- **Features**: Access to more variants, sizes, and features
- **Maintainability**: Single component to maintain instead of multiple variants
- **Future-proofing**: Better alignment with design system evolution

#### Before
```tsx
import { ButtonSuccess } from '@tamyla/ui-components-react';

function MyComponent() {
  return (
    <ButtonSuccess size="lg" fullWidth>
      Get Started
    </ButtonSuccess>
  );
}
```

#### After (Recommended)
```tsx
import { Button } from '@tamyla/ui-components-react';

function MyComponent() {
  return (
    <Button variant="default" size="lg" className="w-full">
      Get Started
    </Button>
  );
}
```

#### Alternative Approaches

**Option 1: Keep Success Styling (If needed)**
```tsx
// If you specifically need the success color scheme
<Button variant="default" size="lg" className="w-full bg-green-600 hover:bg-green-700">
  Get Started
</Button>
```

**Option 2: Use Custom CSS Class**
```tsx
// Define a CSS class for success styling
.success-button {
  background-color: #10b981 !important;
  border-color: #10b981 !important;
}

<Button variant="default" size="lg" className="w-full success-button">
  Get Started
</Button>
```

#### Breaking Changes
- `size` prop values change: `"sm" | "md" | "lg"` → `"xs" | "sm" | "default" | "lg"`
- No more `fullWidth` prop - use `className="w-full"` instead
- Color scheme may differ slightly

#### Migration Steps
1. Replace `ButtonSuccess` import with `Button`
2. Update `size` prop values:
   - `"sm"` → `"sm"`
   - `"md"` → `"default"`
   - `"lg"` → `"lg"`
3. Replace `fullWidth` prop with `className="w-full"`
4. Test visual appearance and adjust if needed

---

### From ButtonPrimary to Button

#### Why Migrate?
- **API Consistency**: Unified interface across all button components
- **Enhanced Features**: Access to loading states, icons, analytics
- **Better Theming**: Improved theme integration and customization
- **Future Compatibility**: Aligns with component evolution

#### Before
```tsx
import { ButtonPrimary } from '@tamyla/ui-components-react';

function MyComponent() {
  return (
    <ButtonPrimary size="lg" onClick={handleClick}>
      Primary Action
    </ButtonPrimary>
  );
}
```

#### After
```tsx
import { Button } from '@tamyla/ui-components-react';

function MyComponent() {
  return (
    <Button variant="default" size="lg" onClick={handleClick}>
      Primary Action
    </Button>
  );
}
```

#### Migration Steps
1. Replace `ButtonPrimary` with `Button`
2. Add `variant="default"` (maintains primary appearance)
3. Update size mapping if needed
4. Test functionality remains the same

---

### From ButtonSecondary to Button

#### Before
```tsx
import { ButtonSecondary } from '@tamyla/ui-components-react';

<ButtonSecondary onClick={handleSecondary}>
  Secondary Action
</ButtonSecondary>
```

#### After
```tsx
import { Button } from '@tamyla/ui-components-react';

<Button variant="secondary" onClick={handleSecondary}>
  Secondary Action
</Button>
```

---

### From ButtonGhost to Button

#### Before
```tsx
import { ButtonGhost } from '@tamyla/ui-components-react';

<ButtonGhost size="sm">
  Ghost Button
</ButtonGhost>
```

#### After
```tsx
import { Button } from '@tamyla/ui-components-react';

<Button variant="ghost" size="sm">
  Ghost Button
</Button>
```

---

### From ButtonDanger to Button

#### Before
```tsx
import { ButtonDanger } from '@tamyla/ui-components-react';

<ButtonDanger onClick={handleDelete}>
  Delete Item
</ButtonDanger>
```

#### After
```tsx
import { Button } from '@tamyla/ui-components-react';

<Button variant="destructive" onClick={handleDelete}>
  Delete Item
</Button>
```

---

## 🔧 Component API Changes

### Button Variants Mapping

| Old Component | New Button Variant | Notes |
|---------------|-------------------|--------|
| `ButtonSuccess` | `variant="default"` | Maintains success appearance |
| `ButtonPrimary` | `variant="default"` | Primary appearance |
| `ButtonSecondary` | `variant="secondary"` | Secondary appearance |
| `ButtonGhost` | `variant="ghost"` | Ghost appearance |
| `ButtonDanger` | `variant="destructive"` | Destructive appearance |

### Size Prop Changes

| Old Size | New Size | Notes |
|----------|----------|--------|
| `"sm"` | `"sm"` | Same |
| `"md"` | `"default"` | Changed for consistency |
| `"lg"` | `"lg"` | Same |

### Removed Props

| Component | Removed Prop | Replacement |
|-----------|-------------|-------------|
| `ButtonSuccess` | `fullWidth` | `className="w-full"` |
| `ButtonPrimary` | `fullWidth` | `className="w-full"` |
| `ButtonSecondary` | `fullWidth` | `className="w-full"` |
| `ButtonGhost` | `fullWidth` | `className="w-full"` |
| `ButtonDanger` | `fullWidth` | `className="w-full"` |

---

## 🎨 Styling Migration

### CSS Class Changes

#### Before (Component-specific classes)
```css
/* These classes may no longer apply */
.button-success {
  /* Custom styles */
}

.button-primary-full {
  /* Custom styles */
}
```

#### After (Standard classes)
```css
/* Use standard utility classes */
.my-button {
  @apply w-full; /* Instead of fullWidth prop */
}

.custom-button {
  border-radius: 0.5rem !important; /* Use design tokens */
}
```

### Design Token Usage

#### Before
```css
.my-button {
  border-radius: 4px;
  background-color: #007bff;
}
```

#### After (Using Design Tokens)
```css
.my-button {
  border-radius: var(--radius-md); /* 0.375rem */
  background-color: var(--primary); /* #3b82f6 */
}
```

---

## 🔄 Redux Integration Migration

### Optional Redux Pattern

If your app doesn't use Redux, the components now gracefully degrade:

#### Before (Required Redux)
```tsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <TamylaThemeProvider>
        <YourApp />
      </TamylaThemeProvider>
    </Provider>
  );
}
```

#### After (Redux Optional)
```tsx
// Works with or without Redux
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

function App() {
  return (
    <TamylaThemeProvider>
      <YourApp /> {/* Components work without Redux */}
    </TamylaThemeProvider>
  );
}
```

---

## 🧪 Testing Migration

### Component Import Changes

#### Before
```tsx
import { ButtonSuccess, ButtonPrimary } from '@tamyla/ui-components-react';
```

#### After
```tsx
import { Button } from '@tamyla/ui-components-react';
```

### Test Updates

#### Before
```tsx
// Testing ButtonSuccess
const { getByText } = render(<ButtonSuccess>Get Started</ButtonSuccess>);
expect(getByText('Get Started')).toBeInTheDocument();
```

#### After
```tsx
// Testing Button
const { getByText } = render(
  <Button variant="default" size="lg" className="w-full">
    Get Started
  </Button>
);
expect(getByText('Get Started')).toBeInTheDocument();
```

---

## 🚀 Performance Considerations

### Bundle Size Impact

- **Before**: Multiple button components loaded
- **After**: Single `Button` component with variants
- **Benefit**: Reduced bundle size and better tree-shaking

### Memoization Improvements

The new `Button` component includes enhanced memoization:

```tsx
// Automatic performance optimization
<Button variant="default" size="lg">
  Optimized Button
</Button>
```

---

## 🔍 Troubleshooting Migration

### Common Issues

#### Issue: Button appearance changed
**Solution**: Verify variant and size props
```tsx
// Check variant and size
<Button variant="default" size="lg">Button</Button>
```

#### Issue: Full width not working
**Solution**: Use Tailwind class instead of prop
```tsx
// Use className instead of fullWidth prop
<Button className="w-full">Full Width Button</Button>
```

#### Issue: Custom styles not applying
**Solution**: Update CSS selectors
```css
/* Before */
.button-success { ... }

/* After */
.my-button { ... }
```

---

## 📊 Migration Checklist

### Pre-Migration
- [ ] Review component usage in codebase
- [ ] Identify custom styling that may be affected
- [ ] Check test files that need updates
- [ ] Backup current working version

### Migration Steps
- [ ] Update imports
- [ ] Replace component names
- [ ] Update prop values
- [ ] Update CSS classes
- [ ] Update test files
- [ ] Test functionality

### Post-Migration
- [ ] Visual regression testing
- [ ] Cross-browser testing
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Update documentation

---

## 📞 Support

### Getting Help

1. **Check this guide** for your specific migration scenario
2. **Review API documentation** for component details
3. **Check troubleshooting section** for common issues
4. **Search existing issues** in the repository

### Resources

- **[API Reference](API_REFERENCE.md)**: Complete component documentation
- **[Component Registry](component-registry.json)**: Machine-readable component data
- **[Examples](../examples/)**: Working code examples
- **[Storybook](../storybook-static/)**: Interactive component explorer

---

## 🎯 Success Metrics

After migration, you should see:

- ✅ **Consistent API** across all button components
- ✅ **Better Performance** with optimized memoization
- ✅ **Enhanced Features** like loading states and icons
- ✅ **Improved Maintainability** with single component
- ✅ **Future-Proof Code** aligned with design system evolution

---

*This migration guide is automatically updated with component changes. Last updated: January 2025*</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\MIGRATION_GUIDE.md
