# React Components Library - Atomic Design Organization

This library follows the **Atomic Design Pattern** for organizing React components with Redux integration and shadcn/ui inspired patterns.

## 📁 Folder Structure

```
src/components/
├── atoms/           # Basic building blocks
├── molecules/       # Combinations of atoms
├── organisms/       # Complex components
├── applications/    # Full application features
└── index.ts         # Main exports
```

## 🧩 Component Categories

### Atoms (`atoms/`)
Basic, indivisible components that serve as the foundation:

- **Button** - Enhanced with Redux analytics and multiple variants
- **Input** - Form input with validation and Redux tracking
- **Card** - Flexible container with interactive features
- **StatusIndicator** - Status display component

### Molecules (`molecules/`)
Combinations of atoms that form more complex UI patterns:

- **Form Components** - FormItem, FormLabel, FormControl, FormMessage, FormTextarea
- **FormAdvanced** - Select, Checkbox, RadioGroup, Switch, Slider
- **Feedback** - Alert, Progress, Badge, Avatar
- **DataDisplay** - Table, Calendar
- **Loading** - Skeleton, HoverCard, Popover

### Organisms (`organisms/`)
Complex components made of molecules and atoms:

- **Dialog** - Modal dialogs with Redux state management
- **Navigation** - Multi-level navigation system
- **Dashboard** - Complex dashboard layouts
- **Modal** - Modal system components

### Applications (`applications/`)
Full application features and pages:

- **CampaignSelector** - Campaign management interface
- **ContentManager** - Content management system
- **EnhancedSearch** - Advanced search functionality

## 🚀 Usage

```tsx
import {
  Button,
  Input,
  Card,
  Alert,
  Dialog,
  Table
} from '@your-org/ui-components-react';

// Use components with Redux integration
<Button
  variant="primary"
  enableAnalytics
  analyticsEvent="button-click"
>
  Click me
</Button>
```

## ✨ Key Features

- **Redux Integration** - All components can dispatch analytics events
- **TypeScript Support** - Full type safety and IntelliSense
- **Accessibility** - ARIA attributes and keyboard navigation
- **Responsive Design** - Mobile-friendly components
- **shadcn/ui Patterns** - Modern design system patterns
- **Enterprise Ready** - Production-quality code

## 📊 Analytics Integration

Components automatically integrate with your Redux store for analytics:

```tsx
// Enable analytics on any component
<Alert
  enableAnalytics
  analyticsEvent="user-notification"
  variant="success"
>
  Operation completed!
</Alert>
```

## 🎨 Design System

- **Variants** - Multiple visual variants for each component
- **Sizes** - Consistent sizing across all components
- **States** - Loading, disabled, and interactive states
- **Themes** - Dark/light mode support
- **Tokens** - Design token system for consistency

## 🔧 Development

### Adding New Components

1. **Atoms** → `src/components/atoms/`
2. **Molecules** → `src/components/molecules/`
3. **Organisms** → `src/components/organisms/`
4. **Applications** → `src/components/applications/`

### Export Pattern

Add exports to `src/components/index.ts` following the organized structure.

## 📚 Examples

See the demo components in `src/demos/` for comprehensive usage examples:

- `ComponentDemo.tsx` - Full component showcase
- `SimpleDemo.tsx` - Basic usage examples
- `ButtonDemo.tsx` - Button component examples

## 🤝 Contributing

When adding new components:

1. Follow the atomic design pattern
2. Include Redux integration options
3. Add TypeScript types
4. Include accessibility features
5. Add to appropriate `index.ts` exports
6. Create demo examples</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\src\components\README.md
