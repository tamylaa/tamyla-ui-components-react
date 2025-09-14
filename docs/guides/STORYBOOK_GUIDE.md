# Storybook Documentation - @tamyla/ui-components-react

## 🎨 Storybook Overview

Storybook is our interactive component development environment where you can explore, test, and document UI components in isolation.

## 🚀 Getting Started

### Running Storybook
```bash
# Start development server
npm run storybook

# Or use the docs alias
npm run docs:storybook
```

Storybook will open at `http://localhost:6006`

### Building for Production
```bash
# Build static Storybook site
npm run build-storybook
```

## 📚 Available Stories

### Atoms (Basic Components)
- **Button** - Versatile button with variants and sizes
- **Button Variants** - Comprehensive button examples with all variants, sizes, and states
- **Input** - Text input with validation and states
- **Card** - Content container with header/content structure

### Molecules (Component Combinations)
- **Alert** - Notification component with variants (default, destructive, success, warning)
- **Badge** - Small status indicator with multiple variants
- **Checkbox** - Form checkbox with Redux integration and analytics
- **Form** - Form components with validation, labels, and messages
- **Form Input** - Enhanced input component with Redux integration
- **Form Textarea** - Enhanced textarea component with Redux integration
- **Select** - Dropdown select component with Redux integration
- **Table** - Responsive table with header, body, and footer

### Organisms (Complex Components)
- **Dialog** - Modal dialogs with triggers and content
- **Navigation** - Navigation components with menus and dropdowns

**Total Coverage**: 13 interactive stories representing key components from the 84-component library.

## 🎛️ Interactive Features

### Controls Panel
Each story includes an interactive controls panel where you can:
- Modify component props in real-time
- See instant visual feedback
- Copy generated code snippets
- Test different variants and states

### Canvas View
- See components in isolation
- Test responsive behavior
- Verify accessibility features

### Docs View
- Auto-generated documentation from TypeScript
- Prop tables with types and descriptions
- Usage examples and code snippets

## 🛠️ Development Workflow

### Adding New Stories
1. Create `.stories.tsx` file in `src/stories/`
2. Follow the naming pattern: `ComponentName.stories.tsx`
3. Export default meta object with component configuration
4. Export named story objects for different variants

### Story Structure
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../components/path/to/component';

const meta: Meta<typeof YourComponent> = {
  title: 'Category/ComponentName',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Description here' } }
  },
  tags: ['autodocs'],
  argTypes: {
    // Configure controls for props
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  }
};
```

## 🎯 Best Practices

### Story Organization
- Group stories by atomic design level (Atoms, Molecules, Organisms)
- Use descriptive story names (Default, Variants, WithError, etc.)
- Include realistic use cases and edge cases

### Controls Configuration
- Use appropriate control types (select, boolean, text, etc.)
- Provide meaningful options for enum props
- Set sensible defaults

### Documentation
- Include component descriptions
- Document prop purposes and usage
- Show real-world examples

## 🔧 Configuration

### Main Configuration (`./storybook/main.ts`)
- Story file patterns
- Addon configuration
- TypeScript settings
- Framework options

### Preview Configuration (`./storybook/preview.tsx`)
- Global decorators
- Theme providers
- Custom parameters

## 📖 Integration with Development

### Component Development
- Use Storybook during component creation
- Test component variants and states
- Verify responsive behavior
- Check accessibility features

### Documentation
- Stories serve as living documentation
- Auto-generated prop tables
- Interactive examples for users

### Testing
- Visual regression testing with Chromatic
- Component behavior verification
- Cross-browser testing

## 🚀 Advanced Features

### Decorators
Wrap stories with providers or context:
```tsx
const meta: Meta<typeof Component> = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ]
};
```

### Parameters
Configure story behavior:
```tsx
const meta: Meta<typeof Component> = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' }
      ]
    }
  }
};
```

## 📚 Related Resources

- [Component Discovery Guide](../docs/guides/COMPONENT_DISCOVERY_GUIDE.md) - Find components to create stories for
- [API Reference](../docs/guides/API_REFERENCE.md) - Component prop documentation
- [Design Tokens Guide](../docs/guides/DESIGN_TOKENS_GUIDE.md) - Theme and styling information</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\docs\guides\STORYBOOK_GUIDE.md
