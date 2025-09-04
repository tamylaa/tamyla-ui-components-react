/**
 * Demo Index
 * Central export for all component demos
 */

import UltimateDemo from './UltimateDemo';
import ReduxFeaturesDemo from './ReduxFeaturesDemo';
import SimpleDemo from './SimpleDemo';
import ComponentDemo from './ComponentDemo';
import ButtonDemo from './ButtonDemo';
import EnhancedComponentsDemo from './EnhancedComponentsDemo';
import HybridDemo from './HybridDemo';

// Re-export individual components for convenience
export { Button } from '../components/atoms/Button';
export { Input } from '../components/atoms/Input';
export { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/Card';
export { Alert, AlertTitle, AlertDescription, Progress, Badge, Avatar } from '../components/molecules/Feedback';

// Re-export demos
export {
  UltimateDemo,
  ReduxFeaturesDemo,
  SimpleDemo,
  ComponentDemo,
  ButtonDemo,
  EnhancedComponentsDemo,
  HybridDemo
};

// Demo metadata
export const demoMetadata = {
  ultimate: {
    title: 'Ultimate Component Demo',
    description: 'Complete showcase of all 24+ components with Redux integration',
    features: ['All Components', 'Redux State', 'Analytics', 'Interactive Examples'],
    complexity: 'Advanced'
  },
  redux: {
    title: 'Redux Features Demo',
    description: 'Focused showcase of Redux integration and analytics capabilities',
    features: ['State Management', 'Analytics Tracking', 'Theme Integration', 'Loading States'],
    complexity: 'Intermediate'
  },
  simple: {
    title: 'Simple Components Demo',
    description: 'Clean overview of basic components without complex features',
    features: ['Basic Components', 'Clean UI', 'Easy to Follow', 'Quick Start'],
    complexity: 'Beginner'
  },
  component: {
    title: 'Component Demo',
    description: 'Comprehensive showcase of hybrid shadcn/ui + Redux components',
    features: ['Hybrid Approach', 'Redux Integration', 'Form Components', 'Data Display'],
    complexity: 'Intermediate'
  },
  button: {
    title: 'Button Demo',
    description: 'Enhanced button component with shadcn/ui patterns and Redux features',
    features: ['Button Variants', 'Redux Analytics', 'Theme Integration', 'Interactive States'],
    complexity: 'Beginner'
  },
  enhanced: {
    title: 'Enhanced Components Demo',
    description: 'Showcasing enhanced components with Redux integration',
    features: ['Enhanced Components', 'Redux State', 'Theme Support', 'Advanced Features'],
    complexity: 'Intermediate'
  },
  hybrid: {
    title: 'Hybrid Demo',
    description: 'Demonstrates the hybrid shadcn/ui + Redux approach',
    features: ['Hybrid Architecture', 'Form Handling', 'Redux State', 'Validation'],
    complexity: 'Intermediate'
  }
};

// Demo navigation helper
export const getDemoByName = (name: string) => {
  switch (name) {
    case 'ultimate':
      return { component: UltimateDemo, ...demoMetadata.ultimate };
    case 'redux':
      return { component: ReduxFeaturesDemo, ...demoMetadata.redux };
    case 'simple':
      return { component: SimpleDemo, ...demoMetadata.simple };
    case 'component':
      return { component: ComponentDemo, ...demoMetadata.component };
    case 'button':
      return { component: ButtonDemo, ...demoMetadata.button };
    case 'enhanced':
      return { component: EnhancedComponentsDemo, ...demoMetadata.enhanced };
    case 'hybrid':
      return { component: HybridDemo, ...demoMetadata.hybrid };
    default:
      return { component: SimpleDemo, ...demoMetadata.simple };
  }
};
