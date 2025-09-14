# @tamyla/ui-components-react

React-based UI component library with Factory Bridge pattern - integrates seamlessly with @tamyla/ui-components. Enhanced AI agent discoverability with structured component registry and comprehensive guides.

[![Version](https://img.shields.io/badge/version-5.0.0-blue.svg)](https://github.com/tamylaa/ui-components-react/releases)
[![ESM Only](https://img.shields.io/badge/module-ESM-orange.svg)](https://nodejs.org/api/esm.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Enterprise Ready](https://img.shields.io/badge/enterprise-ready-green.svg)](https://github.com/tamylaa/ui-components-react/blob/main/CHANGELOG.md)
[![AI Agent Friendly](https://img.shields.io/badge/AI%20Agent-friendly-blue.svg)](https://github.com/tamylaa/ui-components-react/blob/main/docs/guides/COMPONENT_DISCOVERY_GUIDE.md)

> **📋 [View Changelog](CHANGELOG.md)** - Complete v5.0.0 enterprise architecture documentation

## 🎯 Overview

This library provides React components built on top of the [@tamyla/ui-components](https://github.com/tamylaa/ui-components) system using a Factory Bridge pattern. It includes Redux Toolkit integration, styled-com**Last Updated**: Phase 1 fixes completed - All critical issues resolved

Built with â¤ï¸ by the Tamyla Team

---

## 📋 **Enterprise Quick Reference**

### 🎯 **Key Architectural Decisions**

| Decision | Implementation | Benefit |
|----------|----------------|---------|
| **Factory Bridge** | Dynamic factory loading with SSR fallbacks | Seamless vanilla JS ↔ React integration |
| **Redux Optional** | `useUIOptional`, `useAppDispatchOptional` | Graceful degradation without Redux |
| **Tree-shaking** | Explicit `sideEffects` configuration | Preserves enterprise utilities |
| **Export Certification** | 142+ exports validated pre-publish | Prevents tree-shaking regressions |
| **ESM Only** | Modern module format | Better tree-shaking, smaller bundles |
| **Strict TypeScript** | `strict: true`, no `any` types | Maximum type safety |
| **Security First** | XSS prevention, CSP compliance | Enterprise security standards |
| **Performance** | Smart memoization, lazy loading | Optimal runtime performance |

### 🚀 **Integration Patterns**

#### **Basic Setup (Redux + Theme)**
```tsx
import { Provider } from 'react-redux';
import { TamylaThemeProvider } from '@tamyla/ui-components-react';
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

#### **Progressive Enhancement (No Redux)**
```tsx
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

function App() {
  return (
    <TamylaThemeProvider>
      <YourApp /> {/* Works without Redux */}
    </TamylaThemeProvider>
  );
}
```

#### **Enterprise Security**
```tsx
import { safeAsync, safeFetch, sanitizeHTML } from '@tamyla/ui-components-react';

// Secure async operations
const data = await safeAsync(async () => {
  const response = await safeFetch('/api/data', { timeout: 5000 });
  return sanitizeHTML(response.text());
});
```

### 📊 **Quality Metrics**

- **✅ Exports**: 142/142 validated
- **✅ Bundle Size**: 217KB optimized
- **✅ Type Coverage**: 100% strict TypeScript
- **✅ Security**: CSP compliant, XSS protected
- **✅ Performance**: Smart memoization, lazy loading
- **✅ Compatibility**: React 18+, ESM, modern bundlers

### 🔗 **Related Resources**

- **[Full Architecture Guide](https://github.com/tamylaa/ui-components-react/blob/main/README.md#enterprise-architecture-decisions-v500)**
- **[Changelog](https://github.com/tamylaa/ui-components-react/blob/main/CHANGELOG.md)**
- **[Migration Guide](https://github.com/tamylaa/ui-components-react/blob/main/CHANGELOG.md#migration-guide)**
- **[API Reference](https://github.com/tamylaa/ui-components-react/blob/main/README.md#api-reference)**

---

**🎯 Enterprise Ready**: This library is production-ready for enterprise applications with comprehensive security, performance optimizations, and developer experience features.ents theming, and TypeScript support.

## ✨ Features

- **🔧 Factory Bridge Pattern**: Seamless integration with vanilla JS ui-components
- **⚛️ React 18**: Built for modern React with hooks and concurrent features
- **📦 Redux Toolkit**: State management with RTK Query integration
- **🎨 Styled Components**: CSS-in-JS with theming support
- **📘 TypeScript**: Full type safety and IntelliSense
- **🧪 Comprehensive Testing**: Jest + Testing Library (205 tests passing)
- **📚 Storybook**: Interactive component documentation
- **🏗️ Atomic Design**: Organized component architecture
- **🎨 Design System**: Complete theming with CSS custom properties

## 🏆 Enterprise Features (v5.0.0)

- **🛡️ Security First**: XSS prevention, CSP compliance, DOM sanitization
- **🔄 Progressive Enhancement**: Works with/without Redux, SSR-safe
- **📊 Health Monitoring**: Runtime factory system monitoring
- **🚀 Performance Optimized**: Smart memoization, lazy loading, 217KB bundle
- **🔧 Quality Assurance**: Automated export certification, strict TypeScript
- **📈 Analytics Ready**: Optional usage tracking with privacy controls
- **🔒 Enterprise Security**: Async safety, error boundaries, secure imports

## 📦 Installation

```bash
npm install @tamyla/ui-components-react
# or
yarn add @tamyla/ui-components-react
```

### Peer Dependencies

This library requires the following peer dependencies:

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "styled-components": ">=6.0.0",
  "@reduxjs/toolkit": ">=2.0.0",
  "react-redux": ">=9.0.0"
}
```

## 🚀 Quick Start

### Basic Usage

```tsx
import React from 'react';
import { Button, Card, TamylaThemeProvider } from '@tamyla/ui-components-react';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <TamylaThemeProvider>
        <Card>
          <Button variant="primary">Hello World</Button>
        </Card>
      </TamylaThemeProvider>
    </Provider>
  );
}
```

### With CSS Custom Properties

```tsx
import React from 'react';
import { Button } from '@tamyla/ui-components-react';
import '@tamyla/ui-components-react/src/core/design-tokens.css';

function App() {
  return (
    <div>
      <Button variant="primary">Themed Button</Button>
    </div>
  );
}
```

## � Theming System

This library includes a comprehensive theming system with CSS custom properties, design tokens, and theme switching capabilities.

### Design Tokens

The library provides a complete set of design tokens for consistent theming:

```typescript
import { designTokens } from '@tamyla/ui-components-react';

console.log(designTokens.colors.primary[500]); // '#3b82f6'
console.log(designTokens.spacing[4]); // '1rem'
```

### CSS Custom Properties

Import the design tokens CSS file to access theme variables:

```tsx
import '@tamyla/ui-components-react/src/core/design-tokens.css';

function ThemedComponent() {
  return (
    <div style={{
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-md)'
    }}>
      <h1 style={{ color: 'var(--primary)' }}>Themed Heading</h1>
      <button style={{
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2) var(--space-4)'
      }}>
        Themed Button
      </button>
    </div>
  );
}
```

### Available CSS Variables

#### Colors
- `--primary`, `--primary-foreground` - Primary brand colors
- `--success`, `--warning`, `--error` - Semantic colors
- `--background`, `--foreground` - Base colors
- `--surface-primary`, `--surface-secondary` - Surface colors
- `--text-primary`, `--text-secondary`, `--text-tertiary` - Text colors
- `--border`, `--border-secondary` - Border colors

#### Spacing
- `--space-0` through `--space-24` - Spacing scale

#### Typography
- `--font-family` - Font family
- `--font-size-xs` through `--font-size-xl` - Font sizes
- `--font-weight-normal` through `--font-weight-bold` - Font weights

#### Layout
- `--radius`, `--radius-sm` through `--radius-xl` - Border radius
- `--shadow-sm` through `--shadow-xl` - Box shadows

### Theme Provider

Use the `TamylaThemeProvider` for advanced theming with Redux integration:

```tsx
import { TamylaThemeProvider, useTamylaTheme } from '@tamyla/ui-components-react';

function App() {
  return (
    <TamylaThemeProvider>
      <MyThemedApp />
    </TamylaThemeProvider>
  );
}

function MyThemedApp() {
  const theme = useTamylaTheme();

  return (
    <div>
      <p>Current theme mode: {theme.currentMode}</p>
      <p>Primary color: {theme.primaryColor}</p>
      <p>Font size: {theme.fontSize}</p>
    </div>
  );
}
```

### Theme Switching

The theme provider includes built-in support for light/dark mode switching:

```tsx
function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
}
```

### Dark Mode Support

The library includes automatic dark mode support through CSS classes:

```css
/* Light mode (default) */
:root {
  --background: #ffffff;
  --foreground: #111827;
}

/* Dark mode */
.dark {
  --background: #111827;
  --foreground: #f9fafb;
}
```

## �🏗️ Architecture

### Component Categories

The library follows atomic design principles with three main categories:

#### Atoms (8 components)
Basic building blocks that can't be broken down further:
- `Button` - Interactive button with variants
- `Input` - Text input field
- `Card` - Content container
- `StatusIndicator` - Status display component
- `ButtonPrimary`, `ButtonSecondary`, `ButtonGhost`, etc. - Specialized button variants

#### Molecules (6 components)
Simple combinations of atoms:
- `Form` - Form field combinations
- `SearchBar` - Search input with button
- `ActionCard` - Card with action buttons
- `ContentCard` - Card for content display
- `FileList` - File listing component
- `Notification` - Notification display

#### Organisms (5 components)
Complex components made of molecules and atoms:
- `Dialog` - Modal dialog system
- `Navigation` - Navigation menu
- `Dashboard` - Main dashboard layout
- `SearchInterface` - Advanced search interface
- `Modal` - Modal wrapper component

#### Applications (3 components)
Full application features:
- `CampaignSelector` - Campaign selection interface
- `ContentManager` - Content management system
- `EnhancedSearch` - Advanced search application

### Factory Bridge Pattern

The Factory Bridge creates React components that wrap the vanilla JS components from @tamyla/ui-components:

```tsx
import { createFactoryComponent } from '@tamyla/ui-components-react';
import { Button } from '@tamyla/ui-components';

const ReactButton = createFactoryComponent(Button);
```

**Note**: The above example shows the conceptual Factory Bridge Pattern. For production use, import the pre-built React components directly:

```tsx
import { ButtonPrimary, ButtonSecondary } from '@tamyla/ui-components-react';

// Use the pre-built components
<ButtonPrimary onClick={handleClick}>Primary Action</ButtonPrimary>
<ButtonSecondary onClick={handleSecondary}>Secondary Action</ButtonSecondary>
```

## 🏗️ **Enterprise Architecture Decisions (v5.0.0)**

This section documents the key architectural decisions and design choices that shape the library's enterprise-grade capabilities. Understanding these decisions will help downstream applications make informed choices about integration, optimization, and maintenance.

### 🎯 **Core Architectural Principles**

#### **1. Factory Bridge Pattern**
**Decision**: Seamless integration between vanilla JS and React ecosystems
- **Why**: Enables progressive migration and ecosystem interoperability
- **Implementation**: Dynamic factory loading with SSR-safe fallbacks
- **Benefits**: Zero breaking changes, backward compatibility, future-proofing

```typescript
// Factory Bridge enables this seamless integration
import { Button } from '@tamyla/ui-components'; // Vanilla JS
import { ButtonPrimary, ButtonSecondary } from '@tamyla/ui-components-react'; // React wrappers

// Both work identically in React applications
<ButtonPrimary onClick={handleClick}>Click me</ButtonPrimary>
<ButtonSecondary onClick={handleSecondary}>Secondary Action</ButtonSecondary>
```

#### **2. Redux Optional Pattern**
**Decision**: Graceful degradation when Redux is unavailable
- **Why**: Enterprise applications may not always have Redux configured
- **Implementation**: `useUIOptional`, `useAppDispatchOptional`, `useThemeOptional`
- **Benefits**: Prevents runtime errors, enables progressive enhancement

```typescript
// Safe Redux usage with automatic fallbacks
function MyComponent() {
  const uiState = useUIOptional(); // Falls back to default if no Redux
  const dispatch = useAppDispatchOptional(); // No-op if Redux unavailable
  const theme = useThemeOptional(); // Uses context fallback

  return <div>Component works with or without Redux</div>;
}
```

### 🔧 **Build System & Optimization**

#### **3. Tree-shaking Strategy**
**Decision**: Explicit sideEffects configuration for enterprise utilities
- **Why**: Prevent removal of critical enterprise features during bundling
- **Configuration**:
```json
{
  "sideEffects": [
    "**/*.css",
    "**/store/**",
    "**/index.ts",
    "**/utils/async-safety.ts",
    "**/utils/dom-safety.ts",
    "**/utils/factory-health-monitor.ts"
  ]
}
```
- **Benefits**: Preserves async safety, DOM security, factory health monitoring

#### **4. Export Preservation System**
**Decision**: Automated certification of all 142+ exports
- **Why**: Tree-shaking can unexpectedly remove exports despite source presence
- **Implementation**: Pre-publish export validation with pattern matching
- **Coverage**: Components (16), Forms (14), Redux (12), Hooks (10), Enterprise (10)

```bash
# Automated validation prevents regressions
npm run certify-exports  # Validates all exports before publish
```

#### **5. Bundle Optimization**
**Decision**: Rollup + esbuild for optimal performance
- **Why**: Balances build speed with optimal bundle size
- **Configuration**: ESM output, source maps, tree-shaking enabled
- **Results**: 217KB optimized bundle with full feature set

### 🛡️ **Enterprise Security & Reliability**

#### **6. Async Safety Utilities**
**Decision**: Comprehensive async operation protection
- **Features**: Timeout handling, cancellation, error recovery
- **Implementation**: `safeAsync`, `safeFetch`, `safeDynamicImport`
- **Benefits**: Prevents memory leaks, handles network failures

```typescript
// Enterprise-grade async operations
const safeFetchData = safeAsync(async () => {
  const response = await safeFetch('/api/data', {
    timeout: 5000,
    retries: 3
  });
  return response.json();
});
```

#### **7. DOM Safety Layer**
**Decision**: SSR-safe DOM operations with fallbacks
- **Why**: Enterprise applications run in diverse environments
- **Implementation**: Feature detection, progressive enhancement
- **Benefits**: Works in SSR, web workers, and limited DOM environments

#### **8. Factory Health Monitoring**
**Decision**: Runtime monitoring of factory system health
- **Features**: Connectivity checks, load time metrics, error tracking
- **Implementation**: `FactoryHealthMonitor` with configurable intervals
- **Benefits**: Proactive issue detection, performance monitoring

### 📊 **Quality Assurance Pipeline**

#### **9. Automated Certification**
**Decision**: Pre-publish validation prevents regressions
- **Checks**: Export completeness, TypeScript compilation, CJS patterns
- **Integration**: `prepublishOnly` hook ensures quality gates
- **Benefits**: Catches issues before they reach production

```json
{
  "scripts": {
    "prepublishOnly": "npm run certify-exports && npm run type-check && npm run check:cjs && npm run build"
  }
}
```

#### **10. TypeScript Strict Configuration**
**Decision**: Maximum type safety for enterprise reliability
- **Settings**: `strict: true`, no `any` types, exact optional properties
- **Benefits**: Compile-time error prevention, better IDE support
- **Trade-offs**: More explicit code required (worth the safety)

### 🔄 **State Management Strategy**

#### **11. Redux Toolkit Integration**
**Decision**: RTK for predictable, maintainable state
- **Why**: Enterprise applications need robust state management
- **Features**: RTK Query, immer, serializable state
- **Integration**: Seamless with React hooks and devtools

#### **12. Context Fallback System**
**Decision**: Multiple state access patterns
- **Priority**: Redux state → React Context → Default values
- **Benefits**: Progressive enhancement, graceful degradation
- **Usage**: Components work in any application architecture

### 🎨 **Theming Architecture**

#### **13. CSS Custom Properties + Design Tokens**
**Decision**: Runtime theme switching with static analysis benefits
- **Why**: Balances dynamic theming with build-time optimization
- **Implementation**: CSS variables + TypeScript design tokens
- **Benefits**: Theme switching, CSS-in-JS compatibility, tree-shaking

#### **14. Theme Provider Hierarchy**
**Decision**: Multi-level theme resolution
- **Order**: Redux state → Context → CSS custom properties → Defaults
- **Benefits**: Flexible theming, backward compatibility
- **Performance**: Minimal re-renders with memoization

### 🚀 **Performance Optimizations**

#### **15. Smart Memoization**
**Decision**: Intelligent component memoization
- **Strategy**: `smartMemo`, `autoMemo`, `heavyMemo` based on component complexity
- **Benefits**: Prevents unnecessary re-renders while maintaining reactivity
- **Configuration**: Lazy loading, batching, virtualization support

#### **16. Lazy Loading Architecture**
**Decision**: Code splitting for large applications
- **Implementation**: `createLazyComponent`, `batchLazy`
- **Benefits**: Faster initial load, reduced bundle size
- **Integration**: Automatic chunking with webpack/rollup

### 🔧 **Developer Experience**

#### **17. Comprehensive TypeScript Support**
**Decision**: Full type safety with IntelliSense
- **Features**: Generic components, discriminated unions, branded types
- **Benefits**: Better IDE support, fewer runtime errors
- **Documentation**: Inline JSDoc, TSDoc comments

#### **18. Storybook Integration**
**Decision**: Interactive component documentation
- **Features**: Controls, actions, docs, accessibility testing
- **Benefits**: Component usage examples, visual testing
- **CI/CD**: Automated visual regression testing

### 📦 **Distribution Strategy**

#### **19. ESM-Only Distribution**
**Decision**: Modern module format for better tree-shaking
- **Why**: Smaller bundles, better performance, future-proofing
- **Configuration**: `"type": "module"`, ESM exports only
- **Migration**: Clear upgrade guides for CommonJS consumers

#### **20. Semantic Versioning**
**Decision**: Strict semantic versioning for enterprise stability
- **Policy**: Breaking changes only in major versions
- **Communication**: Detailed changelogs, migration guides
- **Automation**: Semantic release with conventional commits

### 🔒 **Security Considerations**

#### **21. Content Security Policy (CSP)**
**Decision**: CSP-compatible implementations
- **Features**: Inline style avoidance, safe dynamic imports
- **Benefits**: Enterprise security compliance
- **Implementation**: `sanitizeHTML`, `safeCreateElementFromHTML`

#### **22. XSS Prevention**
**Decision**: Built-in sanitization for user-generated content
- **Implementation**: DOMPurify integration, safe HTML rendering
- **Benefits**: Prevents XSS attacks in enterprise applications

### 📈 **Monitoring & Observability**

#### **23. Built-in Analytics**
**Decision**: Component usage tracking with privacy controls
- **Features**: `useAnalyticsOptional`, configurable tracking
- **Benefits**: Usage insights, performance monitoring
- **Privacy**: Opt-in, GDPR compliant

#### **24. Error Boundaries**
**Decision**: Comprehensive error handling and recovery
- **Implementation**: `ErrorBoundary` with error reporting
- **Benefits**: Graceful failure, error tracking, user experience

### 🔄 **Migration & Compatibility**

#### **25. Progressive Enhancement**
**Decision**: Works in any environment configuration
- **Features**: Feature detection, graceful degradation
- **Benefits**: Easy integration, reduced migration friction
- **Support**: React 18+, various bundlers, different environments

---

## 📚 API Reference

### Core Components

#### Button Variants
```tsx
import { ButtonPrimary, ButtonSecondary, ButtonGhost, ButtonDanger } from '@tamyla/ui-components-react';

// Primary action button
<ButtonPrimary onClick={handleClick}>Save Changes</ButtonPrimary>

// Secondary action
<ButtonSecondary onClick={handleCancel}>Cancel</ButtonSecondary>

// Ghost button for subtle actions
<ButtonGhost onClick={handleEdit}>Edit</ButtonGhost>

// Danger button for destructive actions
<ButtonDanger onClick={handleDelete}>Delete</ButtonDanger>
```

#### Card Components
```tsx
import { ActionCard, ContentCard } from '@tamyla/ui-components-react';

// Card with action buttons
<ActionCard
  title="Project Status"
  actions={[{ label: 'Edit', onClick: handleEdit }]}
>
  <p>Project is on track</p>
</ActionCard>

// Content display card
<ContentCard title="User Profile">
  <div>Profile information here</div>
</ContentCard>
```

#### Form Components
```tsx
import { Form, Input } from '@tamyla/ui-components-react';

<Form onSubmit={handleSubmit}>
  <Input
    label="Email"
    type="email"
    value={email}
    onChange={setEmail}
  />
  <ButtonPrimary type="submit">Submit</ButtonPrimary>
</Form>
```

### Advanced Components

#### Dashboard
```tsx
import { Dashboard } from '@tamyla/ui-components-react';

<Dashboard
  title="Analytics Dashboard"
  widgets={[
    { id: '1', component: <Chart />, span: 2 },
    { id: '2', component: <Stats />, span: 1 }
  ]}
/>
```

#### Search Interface
```tsx
import { SearchInterface } from '@tamyla/ui-components-react';

<SearchInterface
  onSearch={handleSearch}
  filters={filterOptions}
  results={searchResults}
/>
```

## 🎨 Theming & Design System

This library includes a comprehensive theming system with CSS custom properties and design tokens.

### Design Tokens

Access the complete design token system:

```tsx
import { designTokens } from '@tamyla/ui-components-react';

console.log(designTokens.colors.primary[500]); // '#3b82f6'
console.log(designTokens.spacing[4]); // '1rem'
```

### CSS Custom Properties

Import the CSS file for automatic theme application:

```css
/* Import in your main CSS file */
@import '@tamyla/ui-components-react/src/core/design-tokens.css';

/* Or link directly */
<link rel="stylesheet" href="node_modules/@tamyla/ui-components-react/src/core/design-tokens.css">
```

### Theme Provider (React)

For React applications with dynamic theming:

```tsx
import React from 'react';
import { TamylaThemeProvider, useTamylaTheme } from '@tamyla/ui-components-react';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <TamylaThemeProvider>
        <YourComponents />
      </TamylaThemeProvider>
    </Provider>
  );
}

// Use theme in components
function MyComponent() {
  const theme = useTamylaTheme();

  return (
    <div style={{
      color: theme.tokens.colors.primary[500],
      padding: theme.tokens.spacing[4]
    }}>
      Themed content
    </div>
  );
}
```

### Available CSS Custom Properties

```css
/* Colors */
--primary: #3b82f6;
--primary-foreground: #ffffff;
--background: #ffffff;
--foreground: #111827;

/* Spacing */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-4: 1rem;
--space-8: 2rem;

/* Typography */
--font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;

/* Layout */
--radius: 0.25rem;
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
```

### Dark Theme Support

Add the `dark` class to enable dark theme:

```html
<body class="dark">
  <!-- Your app content -->
</body>
```

Or toggle programmatically:

```tsx
// Add dark class to document.body
document.body.classList.add('dark');

// Remove dark class
document.body.classList.remove('dark');
```

### Component Integration

Components automatically use the CSS custom properties:

```tsx
import { Button } from '@tamyla/ui-components-react';

// This button will automatically use --primary, --primary-foreground, etc.
<Button variant="primary">Themed Button</Button>
```

### Custom Theme Extension

Extend the theme for your specific needs:

```tsx
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

function CustomThemeProvider({ children }) {
  return (
    <TamylaThemeProvider>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --primary: #your-brand-color;
            --font-family: 'Your Font', sans-serif;
          }
        `
      }} />
      {children}
    </TamylaThemeProvider>
  );
}
```

## 🧪 Development

```bash
# Install dependencies
npm install

# Start development with hot reload
npm run dev

# Run tests (205 tests currently passing)
npm run test

# Run tests in watch mode
npm run test:watch

# Launch Storybook (localhost:6006)
npm run storybook

# Build for production
npm run build

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Comprehensive certification
npm run certify-comprehensive

# Generate workflow reports
npm run workflow-report

# Pre-production validation
npm run preprod-workflow
```

## 📊 Certification System

This project includes a comprehensive certification system that validates all aspects of the component library:

### Validation Areas

- ✅ **React Architecture**: Component structure, hooks usage, performance
- ✅ **TypeScript**: Type safety, interface definitions, generic usage
- ✅ **Build System**: Rollup configuration, ES modules, CommonJS support
- ✅ **Factory Bridge**: Integration with @tamyla/ui-components
- ✅ **Testing**: Jest coverage, test organization, mocking strategies
- ✅ **Documentation**: README accuracy, API documentation, examples
- ✅ **Git Status**: Repository cleanliness, commit standards
- ✅ **Package Distribution**: NPM readiness, dependency management
- ✅ **Storybook**: Component documentation, interactive examples
- ✅ **Design System**: Theme consistency, CSS custom properties

### Running Certification

```bash
# Full comprehensive certification
npm run certify-comprehensive

# Generate detailed certification report
npm run certify-comprehensive > certification-report.json

# Pre-production workflow validation
npm run preprod-workflow
```

### Certification Reports

The system generates detailed reports in multiple formats:
- JSON reports for programmatic analysis
- Markdown reports for documentation
- Console output for development feedback

### Current Status

- **Tests**: 205/205 passing ✅
- **Build**: Successful ✅
- **Storybook**: Running on localhost:6006 ✅
- **TypeScript**: No errors ✅
- **Linting**: Clean ✅

## 🚀 Deployment

### Automated Deployment

```bash
# Deploy to GitHub Pages
npm run deploy

# Publish to NPM
npm run publish:latest

# Pre-production validation before deployment
npm run preprod-workflow
```

### Manual Deployment Steps

1. **Build the library**:
   ```bash
   npm run build
   ```

2. **Run comprehensive certification**:
   ```bash
   npm run certify-comprehensive
   ```

3. **Test the build**:
   ```bash
   npm run test
   ```

4. **Publish to NPM**:
   ```bash
   npm publish
   ```

### Distribution Files

The build process generates:
- `dist/index.js` - ES modules bundle
- `dist/index.cjs.js` - CommonJS bundle
- `dist/index.d.ts` - TypeScript definitions
- `dist/design-tokens.css` - CSS custom properties

### Version Management

This project uses semantic-release for automated versioning:
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### CDN Usage

After publishing, you can use the library via CDN:

```html
<!-- ES Modules -->
<script type="module">
  import { Button } from 'https://unpkg.com/@tamyla/ui-components-react@latest/dist/index.js';
</script>

<!-- UMD Build -->
<script src="https://unpkg.com/@tamyla/ui-components-react@latest/dist/index.umd.js"></script>
```

## 📁 Project Structure

```
src/
├── index.ts                    # Main library exports
├── setupTests.ts              # Jest test setup
├── styled.d.ts                # Styled-components type definitions
├── components/
│   ├── index.ts               # Component exports
│   ├── atoms/                 # Basic components (Button, Input, etc.)
│   ├── molecules/             # Composite components (Form, SearchBar, etc.)
│   ├── organisms/             # Complex components (Dialog, Navigation, etc.)
│   └── applications/          # Full features (Dashboard, SearchInterface, etc.)
├── core/
│   ├── design-tokens.css      # CSS custom properties
│   ├── theme.ts               # Theme configuration
│   └── types.ts               # TypeScript definitions
├── store/                     # Redux Toolkit store
├── demos/                     # Component demonstrations
├── test-components/           # Test utilities
├── test-utils/                # Testing helpers
└── utils/                     # Utility functions

scripts/
├── comprehensive-certify.js   # Full validation system
├── deploy-to-github.js        # GitHub deployment
├── react-component-validation.js # Component validation
└── workflow-dashboard.js      # Development workflow

docs/
├── README.md                  # Documentation index
├── certification/             # Certification guides
├── deployment/                # Deployment documentation
└── workflow/                  # Development workflow docs

examples/
├── complete-showcase.html     # Full component showcase
├── interactive-testing.html  # Interactive test page
└── visual-component-test.html # Visual component tests

__tests__/                     # Jest test files
.mocks__/                      # Mock implementations
temp/                          # Temporary files
reports/                       # Generated reports
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run certification: `npm run certify-comprehensive`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [@tamyla/ui-components](https://github.com/tamylaa/ui-components) - Vanilla JS component system
- [Trading Portal](https://github.com/tamylaa/trading-portal) - Main application using these components

## 🏷️ Version & Status

**Current Version**: 1.0.0

**Build Status**: ✅ All systems operational
- Tests: 205/205 passing
- Build: Successful
- Storybook: Running
- TypeScript: No errors
- Linting: Clean

**Last Updated**: Phase 1 fixes completed - All critical issues resolved

Built with ❤️ by the Tamyla Team
 
 