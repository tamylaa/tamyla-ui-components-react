/**
 * Enhanced Button Demo - Comprehensive Button Component Showcase
 */

import React, { useState } from 'react';
import { Button } from '@tamyla/ui-components-react';

const ButtonDemo: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState('variants');

  const categories = [
    { id: 'variants', label: 'Variants', icon: '🎨' },
    { id: 'sizes', label: 'Sizes', icon: '📏' },
    { id: 'states', label: 'States', icon: '⚡' },
    { id: 'interactive', label: 'Interactive', icon: '🎮' },
    { id: 'advanced', label: 'Advanced', icon: '🚀' }
  ];

  const handleClick = (buttonId: string) => {
    setClickCounts(prev => ({ ...prev, [buttonId]: (prev[buttonId] || 0) + 1 }));
  };

  const handleLoadingDemo = (buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-lg">
            <span className="text-4xl text-white">🔘</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Button Component Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive showcase of button variants, states, and interactions. From basic buttons
            to advanced patterns with analytics and theming support.
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-md transform -translate-y-0.5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {selectedCategory === 'variants' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Variants</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Primary Variants</h3>
                    <div className="space-y-3">
                      <Button className="w-full" onClick={() => handleClick('default')}>
                        Default Button {clickCounts['default'] ? `(${clickCounts['default']})` : ''}
                      </Button>
                      <Button variant="destructive" className="w-full" onClick={() => handleClick('destructive')}>
                        Destructive {clickCounts['destructive'] ? `(${clickCounts['destructive']})` : ''}
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600" onClick={() => handleClick('gradient')}>
                        Gradient {clickCounts['gradient'] ? `(${clickCounts['gradient']})` : ''}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Secondary Variants</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full" onClick={() => handleClick('outline')}>
                        Outline {clickCounts['outline'] ? `(${clickCounts['outline']})` : ''}
                      </Button>
                      <Button variant="secondary" className="w-full" onClick={() => handleClick('secondary')}>
                        Secondary {clickCounts['secondary'] ? `(${clickCounts['secondary']})` : ''}
                      </Button>
                      <Button variant="ghost" className="w-full" onClick={() => handleClick('ghost')}>
                        Ghost {clickCounts['ghost'] ? `(${clickCounts['ghost']})` : ''}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Special Variants</h3>
                    <div className="space-y-3">
                      <Button variant="link" className="w-full" onClick={() => handleClick('link')}>
                        Link Button {clickCounts['link'] ? `(${clickCounts['link']})` : ''}
                      </Button>
                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleClick('success')}>
                        Success {clickCounts['success'] ? `(${clickCounts['success']})` : ''}
                      </Button>
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700" onClick={() => handleClick('warning')}>
                        Warning {clickCounts['warning'] ? `(${clickCounts['warning']})` : ''}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Icon Buttons</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <Button className="flex items-center justify-center space-x-2">
                    <span>⭐</span>
                    <span>Star</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center space-x-2">
                    <span>❤️</span>
                    <span>Love</span>
                  </Button>
                  <Button variant="secondary" className="flex items-center justify-center space-x-2">
                    <span>🚀</span>
                    <span>Launch</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center justify-center space-x-2">
                    <span>💾</span>
                    <span>Save</span>
                  </Button>
                  <Button variant="destructive" className="flex items-center justify-center space-x-2">
                    <span>🗑️</span>
                    <span>Delete</span>
                  </Button>
                  <Button className="flex items-center justify-center space-x-2">
                    <span>📤</span>
                    <span>Export</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'sizes' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Sizes</h2>
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="font-medium text-gray-700">Size Variations</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <h4 className="font-medium text-gray-700">Small Buttons</h4>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">Small Default</Button>
                      <Button size="sm" variant="outline" className="w-full">Small Outline</Button>
                      <Button size="sm" variant="secondary" className="w-full">Small Secondary</Button>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <h4 className="font-medium text-gray-700">Default Buttons</h4>
                    <div className="space-y-2">
                      <Button size="default" className="w-full">Default Size</Button>
                      <Button size="default" variant="outline" className="w-full">Default Outline</Button>
                      <Button size="default" variant="secondary" className="w-full">Default Secondary</Button>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <h4 className="font-medium text-gray-700">Large Buttons</h4>
                    <div className="space-y-2">
                      <Button size="lg" className="w-full">Large Default</Button>
                      <Button size="lg" variant="outline" className="w-full">Large Outline</Button>
                      <Button size="lg" variant="secondary" className="w-full">Large Secondary</Button>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <h4 className="font-medium text-gray-700">Full Width Examples</h4>
                  <div className="space-y-3 max-w-md mx-auto">
                    <Button size="sm" className="w-full">Small Full Width</Button>
                    <Button size="default" className="w-full">Default Full Width</Button>
                    <Button size="lg" className="w-full">Large Full Width</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'states' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Normal State</h3>
                    <div className="space-y-3">
                      <Button className="w-full">Normal</Button>
                      <Button variant="outline" className="w-full">Normal Outline</Button>
                      <Button variant="secondary" className="w-full">Normal Secondary</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Hover State</h3>
                    <div className="space-y-3">
                      <Button className="w-full hover:bg-blue-700">Hover Effect</Button>
                      <Button variant="outline" className="w-full hover:bg-gray-100">Hover Outline</Button>
                      <Button variant="secondary" className="w-full hover:bg-gray-200">Hover Secondary</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Focus State</h3>
                    <div className="space-y-3">
                      <Button className="w-full focus:ring-4 focus:ring-blue-200">Focus Ring</Button>
                      <Button variant="outline" className="w-full focus:ring-4 focus:ring-gray-200">Focus Outline</Button>
                      <Button variant="secondary" className="w-full focus:ring-4 focus:ring-gray-200">Focus Secondary</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Disabled State</h3>
                    <div className="space-y-3">
                      <Button disabled className="w-full">Disabled</Button>
                      <Button disabled variant="outline" className="w-full">Disabled Outline</Button>
                      <Button disabled variant="secondary" className="w-full">Disabled Secondary</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Loading States</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-4">
                    <Button
                      className="w-full"
                      disabled={loadingStates['loading1']}
                      onClick={() => handleLoadingDemo('loading1')}
                    >
                      {loadingStates['loading1'] ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <p className="text-sm text-gray-600">Basic loading state</p>
                  </div>

                  <div className="text-center space-y-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={loadingStates['loading2']}
                      onClick={() => handleLoadingDemo('loading2')}
                    >
                      {loadingStates['loading2'] ? '⏳ Processing...' : '📤 Submit'}
                    </Button>
                    <p className="text-sm text-gray-600">Loading with icon</p>
                  </div>

                  <div className="text-center space-y-4">
                    <Button
                      variant="secondary"
                      className="w-full"
                      disabled={loadingStates['loading3']}
                      onClick={() => handleLoadingDemo('loading3')}
                    >
                      {loadingStates['loading3'] ? 'Please wait...' : '🚀 Launch'}
                    </Button>
                    <p className="text-sm text-gray-600">Custom loading text</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'interactive' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Buttons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Click Counter</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-4">{clickCounts['counter'] || 0}</div>
                    <Button onClick={() => handleClick('counter')}>
                      Click Me! 👆
                    </Button>
                  </div>

                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Toggle Button</h4>
                    <div className="mb-4">
                      <span className="text-lg">
                        {(clickCounts['toggle'] || 0) % 2 === 0 ? '🌙' : '☀️'}
                      </span>
                    </div>
                    <Button variant="outline" onClick={() => handleClick('toggle')}>
                      {(clickCounts['toggle'] || 0) % 2 === 0 ? 'Dark Mode' : 'Light Mode'}
                    </Button>
                  </div>

                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Multi-Action</h4>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full" onClick={() => handleClick('action1')}>
                        Action 1 ({clickCounts['action1'] || 0})
                      </Button>
                      <Button size="sm" variant="outline" className="w-full" onClick={() => handleClick('action2')}>
                        Action 2 ({clickCounts['action2'] || 0})
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Button Groups</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Horizontal Button Group</h4>
                    <div className="flex space-x-2">
                      <Button variant="outline">First</Button>
                      <Button>Second</Button>
                      <Button variant="outline">Third</Button>
                      <Button variant="outline">Fourth</Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Connected Button Group</h4>
                    <div className="flex">
                      <Button variant="outline" className="rounded-r-none border-r-0">Left</Button>
                      <Button variant="outline" className="rounded-none">Center</Button>
                      <Button variant="outline" className="rounded-l-none border-l-0">Right</Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Action Group</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">📝 Edit</Button>
                      <Button size="sm" variant="outline">📋 Copy</Button>
                      <Button size="sm" variant="outline">📤 Share</Button>
                      <Button size="sm" variant="destructive">🗑️ Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'advanced' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Advanced Button Patterns</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Gradient Buttons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Purple to Blue
                      </Button>
                      <Button className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700">
                        Pink to Red
                      </Button>
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                        Green to Blue
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Animated Buttons</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Button className="transform transition-transform hover:scale-105 active:scale-95">
                        Scale Animation
                      </Button>
                      <Button className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        Lift Animation
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Complex Layouts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Product Item</h4>
                          <p className="text-sm text-gray-600">Premium quality product</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">User Profile</h4>
                          <p className="text-sm text-gray-600">Manage user settings</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">✏️</Button>
                          <Button size="sm" variant="ghost">⚙️</Button>
                          <Button size="sm" variant="destructive">🗑️</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Custom Styled Buttons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    🔥 Hot
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    ✨ New
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    ✅ Verified
                  </Button>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    💖 Popular
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Panel */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Button Analytics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(clickCounts).map(([buttonId, count]) => (
              <div key={buttonId} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{buttonId}</div>
              </div>
            ))}
          </div>
          {Object.keys(clickCounts).length === 0 && (
            <p className="text-center text-gray-500">Click buttons to see analytics data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
