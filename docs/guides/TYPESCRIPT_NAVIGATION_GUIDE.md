# TypeScript Navigation Guide - @tamyla/ui-components-react

## 📘 TypeScript Definitions Overview

This guide helps developers navigate and understand the TypeScript definitions in the component library.

## 🏗️ TypeScript Architecture

### Strict TypeScript Configuration
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: React
- **Strict Mode**: Enabled (no `any` types)
- **Declaration Files**: Generated automatically

### Export Strategy
```typescript
// Main exports (optimized with React.memo)
export { Button, Input, Card } from './components';

// Type exports
export type { ButtonProps, InputProps, CardProps } from './components';
```

## 📊 Component Type Definitions

### Button Components
```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  enableAnalytics?: boolean;
  useThemeVariant?: boolean;
}

// Specialized button types
export interface ButtonPrimaryProps {
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}
```

### Input Components
```typescript
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}
```

### Card Components
```typescript
export interface CardProps {
  className?: string;
  children: React.ReactNode;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}
```

## 🎯 Type-Safe Usage Patterns

### Basic Component Usage
```typescript
import { Button, Input, Card } from '@tamyla/ui-components-react';
import type { ButtonProps } from '@tamyla/ui-components-react';

// Type-safe props
const handleClick = () => console.log('Clicked');

<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
>
  Click me
</Button>
```

### Generic Component Patterns
```typescript
// Form component with proper typing
interface FormFieldProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  error?: string;
}

function FormField({ value, onChange, error }: FormFieldProps) {
  return (
    <div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
}
```

### Theme Integration Types
```typescript
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

// Theme provider accepts standard React children
<TamylaThemeProvider>
  {children}
</TamylaThemeProvider>
```

## 🔍 Type Discovery

### IntelliSense Support
All components provide full IntelliSense support in VS Code and other editors:

1. **Prop autocompletion** - See available props as you type
2. **Type checking** - Catch errors at compile time
3. **Documentation on hover** - See prop descriptions
4. **Go to definition** - Jump to type definitions

### Finding Component Types
```typescript
// Import types alongside components
import { Button } from '@tamyla/ui-components-react';
import type { ButtonProps } from '@tamyla/ui-components-react';

// Or import all types
import type {
  ButtonProps,
  InputProps,
  CardProps,
  CardHeaderProps
} from '@tamyla/ui-components-react';
```

## 🛠️ Advanced TypeScript Patterns

### Utility Types
```typescript
// Extract prop types from components
type ButtonVariant = ButtonProps['variant'];
type InputType = InputProps['type'];

// Create constrained prop types
interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant: 'primary' | 'secondary'; // Constrain to specific variants
}
```

### Generic Components
```typescript
// Generic component with proper typing
interface DataListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function DataList<T>({ items, renderItem, keyExtractor }: DataListProps<T>) {
  return (
    <div>
      {items.map(item => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
```

### Redux Integration Types (Optional)
```typescript
import { useAppDispatch, useAppSelector } from '@tamyla/ui-components-react';
import type { RootState, AppDispatch } from './store';

// Typed hooks
const dispatch = useAppDispatch<AppDispatch>();
const user = useAppSelector((state: RootState) => state.user);
```

## 🚀 Performance & Bundle Optimization

### Tree Shaking
```typescript
// Only imports what you use (tree-shakable)
import { Button, Input } from '@tamyla/ui-components-react';

// Avoid importing everything
// import * as Components from '@tamyla/ui-components-react'; // ❌
```

### Lazy Loading Types
```typescript
// Components are automatically optimized with React.memo
import { Button } from '@tamyla/ui-components-react'; // Already memoized

// Complex components use lazy loading automatically
import { Dialog } from '@tamyla/ui-components-react'; // Lazy loaded
```

## 📚 Type Definition Files

### Generated Declaration Files
- `dist/index.d.ts` - Main type definitions
- `dist/components/*/index.d.ts` - Component-specific types
- `dist/types/*.d.ts` - Utility and common types

### Source Type Files
- `src/types/common.ts` - Common utility types
- `src/types/factory.ts` - Factory bridge types
- `src/types/globals.d.ts` - Global type declarations

## 🔧 Development Tips

### Type Checking
```bash
# Run TypeScript compiler
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/components/Button.tsx
```

### IDE Configuration
Ensure your IDE is configured for:
- **TypeScript 4.9+**
- **Strict mode enabled**
- **ES2020 target**
- **React JSX support**

### Common Type Issues
```typescript
// ❌ Wrong - missing required props
<Button /> // Error: children required

// ✅ Correct
<Button>Click me</Button>

// ❌ Wrong - invalid variant
<Button variant="invalid">Click me</Button> // TypeScript error

// ✅ Correct
<Button variant="primary">Click me</Button>
```

## 📖 Related Resources

- [API Reference](API_REFERENCE.md) - Component prop documentation
- [Component Discovery Guide](COMPONENT_DISCOVERY_GUIDE.md) - Finding components
- [Migration Guide](MIGRATION_GUIDE.md) - Type-safe migration patterns</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\docs\guides\TYPESCRIPT_NAVIGATION_GUIDE.md
