# @tamyla/ui-components-react

React-based UI component library with Factory Bridge pattern - integrates seamlessly with @tamyla/ui-components.

## 🎯 Overview

This library provides React components built on top of the [@tamyla/ui-components](https://github.com/tamylaa/ui-components) system using a Factory Bridge pattern. It includes Redux Toolkit integration, styled-components theming, and TypeScript support.

## ✨ Features

- **🔧 Factory Bridge Pattern**: Seamless integration with vanilla JS ui-components
- **⚛️ React 18**: Built for modern React with hooks and concurrent features
- **📦 Redux Toolkit**: State management with RTK Query integration
- **🎨 Styled Components**: CSS-in-JS with theming support
- **📘 TypeScript**: Full type safety and IntelliSense
- **🧪 Comprehensive Testing**: Jest + Testing Library
- **📚 Storybook**: Interactive component documentation
- **🏗️ Atomic Design**: Organized component architecture

## 📦 Installation

```bash
npm install @tamyla/ui-components-react
# or
yarn add @tamyla/ui-components-react
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { FactoryBridge, Button, Card } from '@tamyla/ui-components-react';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <FactoryBridge>
        <Card>
          <Button variant="primary">
            Hello World
          </Button>
        </Card>
      </FactoryBridge>
    </Provider>
  );
}
```

## 🏗️ Architecture

### Factory Bridge Pattern

The Factory Bridge creates React components that wrap the vanilla JS components from @tamyla/ui-components:

```tsx
import { createFactoryComponent } from '@tamyla/ui-components-react';
import { Button } from '@tamyla/ui-components';

const ReactButton = createFactoryComponent(Button);
```

### Component Categories

- **Atoms**: Basic building blocks (Button, Input, Icon)
- **Molecules**: Simple combinations (SearchBox, FormField)
- **Organisms**: Complex UI sections (Header, Sidebar, DataTable)
- **Applications**: Full-page layouts and workflows

## 🎨 Theming

```tsx
import { ThemeProvider } from 'styled-components';
import { tradingTheme } from '@tamyla/ui-components-react';

function App() {
  return (
    <ThemeProvider theme={tradingTheme}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

## 🧪 Development

```bash
# Install dependencies
npm install

# Start development with hot reload
npm run dev

# Run tests
npm run test

# Launch Storybook
npm run storybook

# Build for production
npm run build

# Type checking
npm run type-check

# Comprehensive certification
npm run certify-comprehensive
```

## 📊 Certification System

This project includes a comprehensive certification system that validates:

- ✅ React component architecture
- ✅ TypeScript configuration
- ✅ Build system validation
- ✅ Factory Bridge integration
- ✅ Git repository status
- ✅ Package distribution
- ✅ Deployment readiness

Run certification:
```bash
npm run certify-comprehensive
```

## 🚀 Deployment

```bash
# Deploy to GitHub
npm run deploy

# Publish to NPM
npm run publish:latest
```

## 📁 Project Structure

```
src/
├── atoms/           # Basic React components
├── molecules/       # Composite components
├── organisms/       # Complex UI sections
├── applications/    # Full layouts
├── store/          # Redux store configuration
├── themes/         # Styled-components themes
├── bridges/        # Factory Bridge implementations
└── utils/          # Utility functions

scripts/
├── comprehensive-certify.js    # Full validation system
├── deploy-to-github.js        # GitHub deployment
└── repo-status.js             # Repository status
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

## 🏷️ Version

Current version: 1.0.0

Built with ❤️ by the Tamyla Team
