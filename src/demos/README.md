# Component Library Demos

This directory contains comprehensive demos showcasing the UI Platform's capabilities.

## Available Demos

### 🎯 UltimateDemo.tsx
**Complete Component Showcase**
- **Purpose**: Comprehensive demonstration of all 24+ components
- **Features**:
  - Navigation system with analytics
  - Advanced form components (Select, Radio, Checkbox, Switch, Slider)
  - Feedback components (Alerts, Progress, Badges)
  - Data display (Table, Calendar)
  - Interactive components (HoverCard, Popover, Dialog)
  - Loading states and Avatars
  - Enhanced card variants
- **Use Case**: Full platform overview, client presentations
- **Complexity**: Advanced

### 🔄 ReduxFeaturesDemo.tsx
**Redux Integration Showcase**
- **Purpose**: Focused demonstration of Redux capabilities
- **Features**:
  - Redux counter with state management
  - Theme management with Redux
  - Loading states with Redux integration
  - Analytics tracking dashboard
  - Smart form with Redux state
  - Performance metrics visualization
- **Use Case**: Demonstrating Redux integration, analytics capabilities
- **Complexity**: Intermediate

### ✨ SimpleDemo.tsx
**Clean Component Overview**
- **Purpose**: Simple, clean showcase of basic components
- **Features**:
  - Basic button variants and input
  - Essential feedback components
  - Avatar components
  - Card variants
  - Component library statistics
- **Use Case**: Quick component overview, getting started
- **Complexity**: Beginner

## Usage

```typescript
import { UltimateDemo, ReduxFeaturesDemo, SimpleDemo } from './demos';

// Or import individually
import UltimateDemo from './demos/UltimateDemo';
import ReduxFeaturesDemo from './demos/ReduxFeaturesDemo';
import SimpleDemo from './demos/SimpleDemo';
```

## Demo Metadata

Each demo includes metadata for programmatic access:

```typescript
import { getDemoByName, demoMetadata } from './demos';

// Get demo by name
const demo = getDemoByName('ultimate');
// Returns: { component: UltimateDemo, title, description, features, complexity }

// Access metadata directly
console.log(demoMetadata.ultimate.title); // "Ultimate Component Demo"
```

## Architecture

The demos showcase the hybrid approach:
- **shadcn/ui patterns**: Design system foundation
- **Redux integration**: State management and analytics
- **TypeScript**: Full type safety
- **ESM/CJS compatibility**: Universal module support

## Component Categories

### Atoms (12 components)
- Button, Input, Card, StatusIndicator, InputGroup

### Molecules (6 components)
- ActionCard, SearchBar, ContentCard, FileList, Notification

### Organisms (3 components)
- Dashboard, SearchInterface, Reward

### Applications (3 components)
- EnhancedSearch, ContentManager, CampaignSelector

### Factories (5 components)
- useAtomFactory, useMoleculeFactory, useOrganismFactory, useApplicationFactory, useFactoryBridge

## Running the Demos

```bash
# From the ui-components-react package
npm run dev
# Then navigate to the appropriate demo route
```

## Contributing

When adding new demos:
1. Follow the existing naming convention
2. Include comprehensive component coverage
3. Add proper TypeScript types
4. Update this README
5. Test across different screen sizes</content>
<parameter name="filePath">c:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react\src\demos\README.md
