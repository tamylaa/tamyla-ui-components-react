/**
 * Enhanced Button Demo - Showcasing shadcn/ui patterns with Redux integration
 */

import React from 'react';
import { Button } from '../components/Button';
import { useAppSelector } from '../store/hooks';

const ButtonDemo: React.FC = () => {
  const theme = useAppSelector(state => state.theme);
  const uiState = useAppSelector(state => state.ui);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Enhanced Button Component Demo</h1>
      <p className="text-gray-600">
        This demo showcases the hybrid approach: shadcn/ui patterns + your unique Redux features
      </p>

      {/* shadcn/ui inspired variants */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">shadcn/ui Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* shadcn/ui inspired sizes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">shadcn/ui Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔍</Button>
        </div>
      </div>

      {/* Your unique Redux features */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your Unique Redux Features</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            enableAnalytics={true}
            analyticsEvent="demo-button-click"
            variant="default"
          >
            With Analytics
          </Button>

          <Button
            useThemeVariant={true}
            variant="default"
          >
            Theme Aware ({theme.mode})
          </Button>

          <Button
            isLoading={uiState.loading.global}
            loadingText="Loading..."
            variant="outline"
          >
            Global Loading State
          </Button>
        </div>
      </div>

      {/* Combined features */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Combined Features</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="lg"
            enableAnalytics={true}
            analyticsEvent="combined-demo"
            leftIcon={<span>🚀</span>}
            rightIcon={<span>→</span>}
          >
            Launch Demo
          </Button>

          <Button
            variant="secondary"
            useThemeVariant={true}
            enableAnalytics={true}
            analyticsEvent="theme-aware-button"
          >
            Theme Aware Analytics
          </Button>
        </div>
      </div>

      {/* Current Redux State */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Current Redux State:</h3>
        <pre className="text-sm">
          {JSON.stringify({ theme: theme.mode, loading: uiState.loading.global }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ButtonDemo;
