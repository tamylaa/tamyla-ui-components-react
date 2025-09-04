/**
 * Redux Features Demo
 * Showcasing the unique Redux integration capabilities
 * Analytics, state management, and theme integration
 */

import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../store/slices/uiSlice';

// Import components
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/atoms/Card';
import { Badge } from '../components/molecules/Feedback';
import { Progress } from '../components/molecules/Feedback';

// Create a demo store with additional state
const demoStore = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    demo: (state: any = {
      counter: 0,
      theme: 'light',
      analytics: { events: [], totalClicks: 0 },
      loadingStates: { button1: false, button2: false, global: false }
    }, action: any) => {
      switch (action.type) {
        case 'INCREMENT':
          return { ...state, counter: state.counter + 1 };
        case 'DECREMENT':
          return { ...state, counter: state.counter - 1 };
        case 'RESET_COUNTER':
          return { ...state, counter: 0 };
        case 'TOGGLE_THEME':
          return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
        case 'ADD_ANALYTICS_EVENT':
          return {
            ...state,
            analytics: {
              events: [...state.analytics.events, action.payload],
              totalClicks: state.analytics.totalClicks + 1
            }
          };
        case 'SET_LOADING':
          return {
            ...state,
            loadingStates: { ...state.loadingStates, [action.component]: action.loading }
          };
        default:
          return state;
      }
    }
  },
});

// Action creators
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });
const resetCounter = () => ({ type: 'RESET_COUNTER' });
const toggleTheme = () => ({ type: 'TOGGLE_THEME' });
const addAnalyticsEvent = (event: any) => ({ type: 'ADD_ANALYTICS_EVENT', payload: event });
const setLoading = (component: string, loading: boolean) => ({
  type: 'SET_LOADING',
  component,
  loading
});

const ReduxFeaturesDemo: React.FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.demo.counter);
  const theme = useSelector((state: any) => state.demo.theme);
  const analytics = useSelector((state: any) => state.demo.analytics);
  const loadingStates = useSelector((state: any) => state.demo.loadingStates);
  const uiState = useSelector((state: any) => state.ui);

  const [inputValue, setInputValue] = useState('');

  const handleAnalyticsEvent = (eventName: string, data?: any) => {
    dispatch(addAnalyticsEvent({
      name: eventName,
      timestamp: new Date().toISOString(),
      data
    }));
  };

  const simulateAsyncAction = async (component: string) => {
    dispatch(setLoading(component, true));
    handleAnalyticsEvent(`${component}-start`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    dispatch(setLoading(component, false));
    handleAnalyticsEvent(`${component}-complete`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Redux Features Demo</h1>
          <p className="text-xl text-muted-foreground">
            Experience the power of Redux integration with analytics and state management
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Badge variant="default" size="lg">Redux Powered</Badge>
            <Badge variant="success" size="lg">Analytics Enabled</Badge>
            <Badge variant="secondary" size="lg">State Management</Badge>
          </div>
        </div>

        {/* Counter Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔢 Redux Counter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-4">{counter}</div>
              <p className="text-muted-foreground">Redux state value</p>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  dispatch(decrement());
                  handleAnalyticsEvent('counter-decrement', { value: counter - 1 });
                }}
                variant="outline"
                size="lg"
                enableAnalytics
                analyticsEvent="counter-decrement-button"
              >
                Decrement
              </Button>

              <Button
                onClick={() => {
                  dispatch(resetCounter());
                  handleAnalyticsEvent('counter-reset', { previousValue: counter });
                }}
                variant="secondary"
                size="lg"
                enableAnalytics
                analyticsEvent="counter-reset-button"
              >
                Reset
              </Button>

              <Button
                onClick={() => {
                  dispatch(increment());
                  handleAnalyticsEvent('counter-increment', { value: counter + 1 });
                }}
                size="lg"
                enableAnalytics
                analyticsEvent="counter-increment-button"
              >
                Increment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎨 Theme Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-2xl mb-4">Current Theme: <Badge variant="success" size="lg">{theme}</Badge></div>
              <p className="text-muted-foreground mb-6">Redux-managed theme state</p>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  dispatch(toggleTheme());
                  handleAnalyticsEvent('theme-toggle', { newTheme: theme === 'light' ? 'dark' : 'light' });
                }}
                variant="outline"
                size="lg"
                enableAnalytics
                analyticsEvent="theme-toggle-button"
              >
                Toggle Theme
              </Button>

              <Button
                useThemeVariant
                size="lg"
                enableAnalytics
                analyticsEvent="theme-aware-button"
              >
                Theme Aware Button
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading States */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⏳ Loading States
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  onClick={() => simulateAsyncAction('button1')}
                  isLoading={loadingStates.button1}
                  loadingText="Processing..."
                  size="lg"
                  enableAnalytics
                  analyticsEvent="async-button-1"
                >
                  Async Action 1
                </Button>

                <Button
                  onClick={() => simulateAsyncAction('button2')}
                  isLoading={loadingStates.button2}
                  loadingText="Working..."
                  variant="outline"
                  size="lg"
                  enableAnalytics
                  analyticsEvent="async-button-2"
                >
                  Async Action 2
                </Button>

                <Button
                  isLoading={uiState.loading?.global}
                  loadingText="Global Loading..."
                  variant="secondary"
                  size="lg"
                  enableAnalytics
                  analyticsEvent="global-loading-button"
                >
                  Global Loading State
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{analytics.totalClicks}</div>
                  <div className="text-sm text-muted-foreground">Total Events</div>
                </div>
                <div className="text-center p-4 bg-secondary/5 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{analytics.events.length}</div>
                  <div className="text-sm text-muted-foreground">Tracked Events</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Recent Events:</h4>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {analytics.events.slice(-5).reverse().map((event: any, index: number) => (
                    <div key={index} className="text-xs p-2 bg-muted rounded flex justify-between">
                      <span className="font-medium">{event.name}</span>
                      <span className="text-muted-foreground">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form with Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Smart Form with Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    handleAnalyticsEvent('input-change', {
                      value: e.target.value,
                      length: e.target.value.length
                    });
                  }}
                  enableAnalytics
                  analyticsEvent="smart-input"
                />

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleAnalyticsEvent('input-clear', { previousValue: inputValue });
                      setInputValue('');
                    }}
                    variant="outline"
                    enableAnalytics
                    analyticsEvent="clear-button"
                  >
                    Clear
                  </Button>

                  <Button
                    onClick={() => {
                      handleAnalyticsEvent('input-submit', {
                        value: inputValue,
                        length: inputValue.length
                      });
                      alert(`Submitted: ${inputValue}`);
                    }}
                    enableAnalytics
                    analyticsEvent="submit-button"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Input Statistics</h4>
                  <div className="space-y-1 text-sm">
                    <div>Length: <Badge variant="secondary">{inputValue.length}</Badge></div>
                    <div>Words: <Badge variant="secondary">{inputValue.trim() ? inputValue.trim().split(/\s+/).length : 0}</Badge></div>
                    <div>Has Content: <Badge variant={inputValue ? 'success' : 'secondary'}>{inputValue ? 'Yes' : 'No'}</Badge></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* State Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Redux State Inspector
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Demo State</h3>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify({
                    counter,
                    theme,
                    loadingStates
                  }, null, 2)}
                </pre>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">UI State</h3>
                <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(uiState, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚡ Performance & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Progress value={85} className="mb-2" />
                <div className="text-sm font-medium">State Updates</div>
                <div className="text-xs text-muted-foreground">85% Efficient</div>
              </div>
              <div className="text-center">
                <Progress value={92} className="mb-2" />
                <div className="text-sm font-medium">Analytics</div>
                <div className="text-xs text-muted-foreground">92% Coverage</div>
              </div>
              <div className="text-center">
                <Progress value={78} className="mb-2" />
                <div className="text-sm font-medium">Loading States</div>
                <div className="text-xs text-muted-foreground">78% Optimized</div>
              </div>
              <div className="text-center">
                <Progress value={96} className="mb-2" />
                <div className="text-sm font-medium">Type Safety</div>
                <div className="text-xs text-muted-foreground">96% Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main demo component with Redux Provider
const ReduxFeaturesLibraryDemo: React.FC = () => {
  return (
    <Provider store={demoStore}>
      <ReduxFeaturesDemo />
    </Provider>
  );
};

export default ReduxFeaturesLibraryDemo;
