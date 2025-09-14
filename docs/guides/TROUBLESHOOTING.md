# Troubleshooting Guide - @tamyla/ui-components-react

## 📋 Overview

This guide helps you resolve common issues and problems when using the @tamyla/ui-components-react library. Each section covers specific symptoms, causes, and solutions.

## 🔘 Button Issues

### Button has square edges

**Symptoms:**
- Button appears with sharp corners instead of rounded
- Doesn't match the expected design system appearance
- Inconsistent with other UI elements

**Causes:**
- Using specialized button components instead of base Button
- Missing CSS imports
- Custom CSS overriding border-radius

**Solutions:**

**Solution 1: Use base Button component (Recommended)**
```tsx
// ❌ Wrong - specialized buttons may have different styling
<ButtonSuccess>Rounded by default</ButtonSuccess>

// ✅ Correct - base Button has consistent rounded corners
<Button variant="default">Rounded by default</Button>
```

**Solution 2: Apply design token**
```css
/* Add to your CSS file */
.my-button {
  border-radius: var(--radius-md) !important; /* 0.375rem */
}

/* Or use direct value */
.my-button {
  border-radius: 0.5rem !important;
}
```

**Solution 3: Check CSS imports**
```tsx
// Ensure design tokens CSS is imported
import '@tamyla/ui-components-react/src/core/design-tokens.css';

// Or import in your main CSS file
@import '@tamyla/ui-components-react/src/core/design-tokens.css';
```

---

### Button text is too small

**Symptoms:**
- Button text appears smaller than expected
- Hard to read on mobile devices
- Inconsistent text size across components

**Causes:**
- Using default size instead of appropriate size
- Missing size prop
- CSS font-size overrides

**Solutions:**

**Solution 1: Use size prop (Recommended)**
```tsx
// ❌ Wrong - may be too small
<Button>Small text</Button>

// ✅ Correct - appropriate size
<Button size="lg">Large text</Button>

// Available sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

**Solution 2: Custom font size**
```css
/* Add to your CSS file */
.large-button {
  font-size: var(--font-size-lg) !important; /* 1.125rem */
}

/* Or use direct value */
.large-button {
  font-size: 1.25rem !important;
}
```

**Solution 3: Check for CSS conflicts**
```css
/* Reset button font size if needed */
.my-button {
  font-size: 1rem !important;
}
```

---

### Button not responding to clicks

**Symptoms:**
- Button appears but doesn't respond to clicks
- onClick handler not firing
- Button looks disabled but isn't supposed to be

**Causes:**
- Missing onClick handler
- Button is actually disabled
- Event propagation issues
- TypeScript errors preventing compilation

**Solutions:**

**Solution 1: Add onClick handler**
```tsx
// ❌ Wrong - no click handler
<Button>Click me</Button>

// ✅ Correct - with click handler
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>

// Or with named function
function handleClick() {
  console.log('Button clicked');
}

<Button onClick={handleClick}>Click me</Button>
```

**Solution 2: Check disabled state**
```tsx
// Ensure button is not disabled
<Button disabled={false} onClick={handleClick}>
  Enabled Button
</Button>

// Or conditionally disable
<Button disabled={isLoading} onClick={handleClick}>
  {isLoading ? 'Loading...' : 'Click me'}
</Button>
```

**Solution 3: Check for event issues**
```tsx
// Prevent event bubbling if needed
<Button onClick={(e) => {
  e.stopPropagation();
  handleClick();
}}>
  Click me
</Button>
```

---

### Button styling not applying

**Symptoms:**
- Button appears unstyled or with browser defaults
- Theme colors not applied
- Custom CSS not working

**Causes:**
- Missing theme provider
- CSS import order issues
- CSS specificity conflicts
- Missing design tokens import

**Solutions:**

**Solution 1: Ensure theme provider**
```tsx
// ❌ Wrong - missing theme provider
function App() {
  return <Button>Styled Button</Button>;
}

// ✅ Correct - wrap with theme provider
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

function App() {
  return (
    <TamylaThemeProvider>
      <Button>Styled Button</Button>
    </TamylaThemeProvider>
  );
}
```

**Solution 2: Check CSS imports**
```tsx
// Import design tokens CSS
import '@tamyla/ui-components-react/src/core/design-tokens.css';

// Or in your main CSS file
@import '@tamyla/ui-components-react/src/core/design-tokens.css';
```

**Solution 3: Increase CSS specificity**
```css
/* Use !important for overrides */
.my-button {
  background-color: #3b82f6 !important;
  color: white !important;
}

/* Or use more specific selectors */
.button-container .my-button {
  background-color: #3b82f6;
}
```

---

## 🎨 Theming Issues

### Theme not working

**Symptoms:**
- Components appear unstyled
- Colors don't match theme
- Dark mode not switching
- CSS variables not applied

**Causes:**
- Missing TamylaThemeProvider
- Incorrect provider placement
- CSS import issues
- Redux store not configured

**Solutions:**

**Solution 1: Ensure theme provider is at app root**
```tsx
// ❌ Wrong - theme provider not at root
function App() {
  return (
    <div>
      <TamylaThemeProvider>
        <Button>Themed Button</Button>
      </TamylaThemeProvider>
    </div>
  );
}

// ✅ Correct - theme provider at root
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

function App() {
  return (
    <TamylaThemeProvider>
      <Button>Themed Button</Button>
    </TamylaThemeProvider>
  );
}
```

**Solution 2: Check Redux integration**
```tsx
// If using Redux
import { Provider } from 'react-redux';
import { TamylaThemeProvider } from '@tamyla/ui-components-react';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <TamylaThemeProvider>
        <Button>Themed Button</Button>
      </TamylaThemeProvider>
    </Provider>
  );
}
```

**Solution 3: Verify CSS imports**
```tsx
// Import in your main component or CSS file
import '@tamyla/ui-components-react/src/core/design-tokens.css';

// Check if CSS variables are available
console.log(getComputedStyle(document.documentElement).getPropertyValue('--primary'));
```

---

### Dark mode not switching

**Symptoms:**
- Dark mode toggle doesn't change appearance
- Colors stay in light mode
- CSS classes not applying

**Causes:**
- Missing dark class on html element
- Incorrect CSS class application
- Theme provider not handling dark mode

**Solutions:**

**Solution 1: Apply dark class to html**
```tsx
// In your theme toggle component
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      Toggle {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
}
```

**Solution 2: Check CSS dark mode styles**
```css
/* Ensure your CSS has dark mode styles */
:root {
  --background: #ffffff;
  --foreground: #111827;
}

.dark {
  --background: #111827;
  --foreground: #f9fafb;
}
```

**Solution 3: Use theme hook**
```tsx
// Use the theme hook for programmatic control
import { useTamylaTheme } from '@tamyla/ui-components-react';

function ThemeToggle() {
  const theme = useTamylaTheme();

  return (
    <div>
      <p>Current mode: {theme.currentMode}</p>
      <p>Primary color: {theme.primaryColor}</p>
    </div>
  );
}
```

---

## 📝 Form Issues

### Input not accepting input

**Symptoms:**
- Can't type in input field
- Input appears disabled
- Value not updating

**Causes:**
- Missing value/onChange props
- Controlled vs uncontrolled confusion
- TypeScript prop issues

**Solutions:**

**Solution 1: Use controlled input**
```tsx
// ❌ Wrong - missing state
function MyForm() {
  return <Input placeholder="Type here" />;
}

// ✅ Correct - controlled input
function MyForm() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type here"
    />
  );
}
```

**Solution 2: Use uncontrolled input**
```tsx
// For simple cases
function MyForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const value = inputRef.current?.value;
    console.log(value);
  };

  return (
    <Input
      ref={inputRef}
      defaultValue="Default value"
      placeholder="Type here"
    />
  );
}
```

---

### Form validation not working

**Symptoms:**
- Validation errors not showing
- Form submitting with invalid data
- Error styles not applying

**Causes:**
- Missing error prop
- Incorrect validation logic
- CSS class conflicts

**Solutions:**

**Solution 1: Add error prop**
```tsx
// ❌ Wrong - no error indication
<Input placeholder="Email" />

// ✅ Correct - with error state
<Input
  placeholder="Email"
  error={!!errors.email}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Solution 2: Show validation messages**
```tsx
<FormField error={errors.email}>
  <FormInput
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {errors.email && (
    <FormMessage>{errors.email}</FormMessage>
  )}
</FormField>
```

---

## 🔍 Search Issues

### SearchBar not working

**Symptoms:**
- Search not triggering
- No results showing
- Search handler not called

**Causes:**
- Missing onSearch prop
- Incorrect handler signature
- Event handling issues

**Solutions:**

**Solution 1: Add search handler**
```tsx
// ❌ Wrong - no search handler
<SearchBar placeholder="Search..." />

// ✅ Correct - with search handler
<SearchBar
  placeholder="Search..."
  onSearch={(query) => {
    console.log('Searching for:', query);
    // Perform search logic
  }}
/>
```

**Solution 2: Handle search with filters**
```tsx
<SearchBarNew
  placeholder="Search with filters..."
  showFilters
  onSearch={(query, filters) => {
    console.log('Search:', query, 'Filters:', filters);
  }}
/>
```

---

## 📊 Performance Issues

### Components re-rendering too often

**Symptoms:**
- Slow performance
- High CPU usage
- Unnecessary re-renders

**Causes:**
- Missing memoization
- Inline functions in props
- Unnecessary prop changes

**Solutions:**

**Solution 1: Use memoization**
```tsx
// ❌ Wrong - component not memoized
function MyButton({ onClick, children }) {
  return <Button onClick={onClick}>{children}</Button>;
}

// ✅ Correct - memoized component
const MyButton = memo(function MyButton({ onClick, children }) {
  return <Button onClick={onClick}>{children}</Button>;
});
```

**Solution 2: Avoid inline functions**
```tsx
// ❌ Wrong - inline function causes re-renders
<Button onClick={() => handleClick(id)}>Click me</Button>

// ✅ Correct - stable function reference
const handleButtonClick = useCallback(() => {
  handleClick(id);
}, [id]);

<Button onClick={handleButtonClick}>Click me</Button>
```

**Solution 3: Use smart memo**
```tsx
// The library provides smart memoization
import { smartMemo } from '@tamyla/ui-components-react';

const MyComponent = smartMemo((props) => (
  <div>{props.children}</div>
));
```

---

## 🏗️ Build Issues

### TypeScript errors

**Symptoms:**
- TypeScript compilation errors
- IntelliSense not working
- Import errors

**Causes:**
- Missing type definitions
- Incorrect import paths
- Version mismatches

**Solutions:**

**Solution 1: Check imports**
```tsx
// ✅ Correct imports
import { Button, Input, Card } from '@tamyla/ui-components-react';
import type { ComponentProps } from '@tamyla/ui-components-react';

// ❌ Wrong - incorrect import path
import { Button } from '@tamyla/ui-components-react/dist/Button';
```

**Solution 2: Check TypeScript configuration**
```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

---

### Bundle size issues

**Symptoms:**
- Large bundle size
- Slow build times
- Unused code included

**Causes:**
- Importing entire library
- Missing tree-shaking
- Unused components

**Solutions:**

**Solution 1: Import specific components**
```tsx
// ❌ Wrong - imports everything
import * as Components from '@tamyla/ui-components-react';

// ✅ Correct - import only what you need
import { Button, Input, Card } from '@tamyla/ui-components-react';
```

**Solution 2: Use dynamic imports**
```tsx
// For large components
const Dashboard = lazy(() =>
  import('@tamyla/ui-components-react').then(module => ({
    default: module.Dashboard
  }))
);
```

---

## 🔧 Development Tools

### Storybook not loading

**Symptoms:**
- Storybook dev server not starting
- Stories not showing
- Build errors in Storybook

**Causes:**
- Missing dependencies
- Configuration issues
- Port conflicts

**Solutions:**

**Solution 1: Check dependencies**
```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook
```

**Solution 2: Check configuration**
```typescript
// .storybook/main.ts should have correct paths
stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)']
```

---

## 📞 Getting Help

### Debug Information

When reporting issues, include:

1. **Package version**
```bash
npm list @tamyla/ui-components-react
```

2. **Environment info**
```bash
npx envinfo --system --binaries --browsers
```

3. **Minimal reproduction**
```tsx
// Provide a minimal code example that reproduces the issue
import { Button } from '@tamyla/ui-components-react';

export default function Test() {
  return <Button>Test</Button>;
}
```

### Common Debug Steps

1. **Check console for errors**
```javascript
// Open browser dev tools and check console
console.log('Debug info');
```

2. **Verify component props**
```tsx
// Add debug logging
<Button
  onClick={() => console.log('Button clicked')}
  className="debug-button"
>
  Debug Button
</Button>
```

3. **Test with minimal setup**
```tsx
// Create a minimal test case
import { Button, TamylaThemeProvider } from '@tamyla/ui-components-react';

function Test() {
  return (
    <TamylaThemeProvider>
      <Button>Minimal Test</Button>
    </TamylaThemeProvider>
  );
}
```

---

## 📚 Additional Resources

- **[API Reference](API_REFERENCE.md)**: Complete component documentation
- **[Migration Guide](MIGRATION_GUIDE.md)**: Component migration help
- **[Component Registry](component-registry.json)**: Machine-readable component data
- **[Examples](../examples/)**: Working code examples
- **[Storybook](../storybook-static/)**: Interactive component explorer

---

*This troubleshooting guide is updated with each release. Last updated: January 2025*</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\TROUBLESHOOTING.md
