# React UI Components Reuse Guide

## Quick Start

### NPM Installation
```bash
npm install @tamyla/ui-components-react
```

### Basic Usage
```tsx
import React from 'react';
import { TamylaThemeProvider, Button, StatusIndicator } from '@tamyla/ui-components-react';
import { Provider } from 'react-redux';
import { store } from '@tamyla/ui-components-react';

function App() {
  return (
    <Provider store={store}>
      <TamylaThemeProvider>
        <Button variant="primary" icon="search">
          Search
        </Button>
        <StatusIndicator status="active" />
      </TamylaThemeProvider>
    </Provider>
  );
}
```

### Factory Bridge Integration
```tsx
import { FactoryBridge, createFactoryComponent } from '@tamyla/ui-components-react';

// Use ui-components through React wrapper
const EnhancedSearch = createFactoryComponent('enhanced-search');

function SearchPage() {
  return (
    <FactoryBridge>
      <EnhancedSearch />
    </FactoryBridge>
  );
}
```

## Component Categories

- **Atoms**: Button, Input, StatusIndicator
- **Molecules**: ActionCard, SearchBar, ContentCard  
- **Organisms**: Dashboard, SearchInterface, Modal
- **Applications**: ContentManager, EnhancedSearch

## State Management

Built-in Redux store with:
- Authentication state
- UI preferences
- Theme settings
- Component configurations

## TypeScript Support

Full TypeScript definitions included for:
- All component props
- Redux state types
- Theme configuration
- Factory bridge patterns

## Next Steps

1. **Development**: `npm run dev`
2. **Storybook**: `npm run storybook`
3. **Testing**: `npm run test`
4. **Build**: `npm run build`
