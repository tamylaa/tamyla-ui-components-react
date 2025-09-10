import React, { useState } from 'react';
import { Button, Input, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';

const AtomsDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(65);
  const [selectedCategory, setSelectedCategory] = useState('buttons');
  const [clickCount, setClickCount] = useState(0);

  const categories = [
    { id: 'buttons', title: '🔘 Buttons', description: 'Interactive action elements' },
    { id: 'inputs', title: '📝 Inputs', description: 'Form input controls' },
    { id: 'feedback', title: '📢 Feedback', description: 'Status and notification elements' },
    { id: 'display', title: '👁️ Display', description: 'Content presentation elements' },
    { id: 'navigation', title: '🧭 Navigation', description: 'Navigation and interaction elements' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <span className="text-3xl text-white">🧬</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Atoms - Basic UI Elements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The fundamental building blocks of your interface. These atomic components form the foundation
            of more complex UI patterns and ensure consistency across your application.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform -translate-y-1'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">{category.title.split(' ')[0]}</div>
                <div className="font-semibold mb-1">{category.title.substring(2)}</div>
                <div className="text-sm opacity-80">{category.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category Content */}
        <div className="space-y-8">
          {selectedCategory === 'buttons' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Variants</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Primary Styles</h3>
                    <div className="space-y-3">
                      <Button className="w-full">Default</Button>
                      <Button variant="outline" className="w-full">Outline</Button>
                      <Button variant="ghost" className="w-full">Ghost</Button>
                      <Button variant="link" className="w-full">Link</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Sizes</h3>
                    <div className="space-y-3">
                      <Button size="sm" className="w-full">Small</Button>
                      <Button size="default" className="w-full">Default</Button>
                      <Button size="lg" className="w-full">Large</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">States</h3>
                    <div className="space-y-3">
                      <Button disabled className="w-full">Disabled</Button>
                      <Button variant="destructive" className="w-full">Destructive</Button>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Gradient</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">With Icons</h3>
                    <div className="space-y-3">
                      <Button className="w-full">⭐ Favorite</Button>
                      <Button className="w-full">🚀 Launch</Button>
                      <Button className="w-full">💾 Save</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Button Demo */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Interactive Button Demo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Click Counter</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-4">{clickCount}</div>
                    <Button onClick={() => setClickCount(clickCount + 1)}>Click Me!</Button>
                  </div>

                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Loading State</h4>
                    <Button className="mb-4" disabled>
                      Loading...
                    </Button>
                    <p className="text-sm text-gray-600">Simulated loading state</p>
                  </div>

                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Success Action</h4>
                    <Button className="bg-green-600 hover:bg-green-700">
                      ✅ Complete
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">Success button variant</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'inputs' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Components</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Text Input</label>
                      <Input
                        placeholder="Enter some text..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">Current value: {inputValue || 'empty'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Input</label>
                      <Input type="email" placeholder="user@example.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Input</label>
                      <Input type="password" placeholder="Enter password..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Search Input</label>
                      <div className="relative">
                        <Input placeholder="Search..." className="pl-10" />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number Input</label>
                      <Input type="number" placeholder="Enter a number..." />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Input</label>
                      <Input type="date" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Disabled Input</label>
                      <Input disabled placeholder="This input is disabled" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Input with Icon</label>
                      <div className="relative">
                        <Input placeholder="Amount" className="pr-10" />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">💰</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Validation Demo */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Input States & Validation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valid Input</label>
                    <Input placeholder="Valid input..." className="border-green-500 focus:ring-green-500" />
                    <p className="text-sm text-green-600 mt-1">✅ Looks good!</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invalid Input</label>
                    <Input placeholder="Invalid input..." className="border-red-500 focus:ring-red-500" />
                    <p className="text-sm text-red-600 mt-1">❌ Please check this field</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warning Input</label>
                    <Input placeholder="Warning input..." className="border-yellow-500 focus:ring-yellow-500" />
                    <p className="text-sm text-yellow-600 mt-1">⚠️ Please verify this value</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'feedback' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Progress Indicators</h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-700">Dynamic Progress</h3>
                      <div className="space-x-2">
                        <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                        <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Upload Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Processing</span>
                          <span>In Progress</span>
                        </div>
                        <Progress value={undefined} className="h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Badges & Labels</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Status Badges</h4>
                    <div className="flex flex-wrap gap-3">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Error</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge className="bg-green-600">Success</Badge>
                      <Badge className="bg-yellow-600">Warning</Badge>
                      <Badge className="bg-purple-600">Premium</Badge>
                      <Badge className="bg-orange-600">Hot</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Counter Badges</h4>
                    <div className="flex flex-wrap gap-4">
                      <div className="relative">
                        <Button variant="outline">Messages</Button>
                        <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center">3</Badge>
                      </div>
                      <div className="relative">
                        <Button variant="outline">Notifications</Button>
                        <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center bg-red-500">12</Badge>
                      </div>
                      <div className="relative">
                        <Button variant="outline">Cart</Button>
                        <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center bg-green-500">5</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Alert Messages</h3>
                <div className="space-y-4">
                  <Alert>
                    <span className="text-lg">ℹ️</span>
                    <div>
                      <h4 className="font-medium">Information</h4>
                      <p className="text-sm">This is an informational alert with helpful details for the user.</p>
                    </div>
                  </Alert>

                  <Alert className="border-green-500 bg-green-50">
                    <span className="text-lg">✅</span>
                    <div>
                      <h4 className="font-medium text-green-800">Success</h4>
                      <p className="text-sm text-green-700">Your action was completed successfully! Everything looks good.</p>
                    </div>
                  </Alert>

                  <Alert className="border-yellow-500 bg-yellow-50">
                    <span className="text-lg">⚠️</span>
                    <div>
                      <h4 className="font-medium text-yellow-800">Warning</h4>
                      <p className="text-sm text-yellow-700">Please pay attention to this important information.</p>
                    </div>
                  </Alert>

                  <Alert variant="destructive">
                    <span className="text-lg">❌</span>
                    <div>
                      <h4 className="font-medium">Error</h4>
                      <p className="text-sm">Something went wrong. Please check your input and try again.</p>
                    </div>
                  </Alert>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'display' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Avatar Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Sizes</h3>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <Avatar className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-semibold text-xs mb-2">
                          S
                        </Avatar>
                        <p className="text-xs text-gray-600">Small</p>
                      </div>
                      <div className="text-center">
                        <Avatar className="w-12 h-12 bg-green-600 text-white flex items-center justify-center font-semibold mb-2">
                          M
                        </Avatar>
                        <p className="text-xs text-gray-600">Medium</p>
                      </div>
                      <div className="text-center">
                        <Avatar className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center font-semibold text-lg mb-2">
                          L
                        </Avatar>
                        <p className="text-xs text-gray-600">Large</p>
                      </div>
                      <div className="text-center">
                        <Avatar className="w-20 h-20 bg-orange-600 text-white flex items-center justify-center font-semibold text-xl mb-2">
                          XL
                        </Avatar>
                        <p className="text-xs text-gray-600">X-Large</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Styles</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-semibold">
                          JD
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-600">Administrator</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 text-white flex items-center justify-center font-semibold">
                          SM
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">Sarah Miller</p>
                          <p className="text-sm text-gray-600">Designer</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Status Indicators</h3>
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <Avatar className="w-12 h-12 bg-green-600 text-white flex items-center justify-center font-semibold">
                          AB
                        </Avatar>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>

                      <div className="relative inline-block">
                        <Avatar className="w-12 h-12 bg-gray-600 text-white flex items-center justify-center font-semibold">
                          LW
                        </Avatar>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Card Layout</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Simple Card</h4>
                    <p className="text-sm text-gray-600">Basic card layout with minimal styling for content organization.</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Branded Card</h4>
                    <p className="text-sm text-blue-700">Enhanced card with brand colors and gradient backgrounds.</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">Interactive Card</h4>
                    <p className="text-sm text-gray-600">Card with hover effects and interactive states for better user engagement.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'navigation' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Navigation Elements</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Button Groups</h3>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Button variant="outline">First</Button>
                        <Button>Second</Button>
                        <Button variant="outline">Third</Button>
                      </div>

                      <div className="flex">
                        <Button variant="outline" className="rounded-r-none border-r-0">Left</Button>
                        <Button variant="outline" className="rounded-none">Center</Button>
                        <Button variant="outline" className="rounded-l-none border-l-0">Right</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Action Buttons</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button className="w-full">➕ Add New</Button>
                      <Button variant="outline" className="w-full">✏️ Edit</Button>
                      <Button variant="destructive" className="w-full">🗑️ Delete</Button>
                      <Button variant="secondary" className="w-full">📁 Archive</Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Link Buttons</h3>
                    <div className="space-y-2">
                      <Button variant="link" className="p-0 h-auto">→ Learn more about our platform</Button>
                      <Button variant="link" className="p-0 h-auto">→ View documentation</Button>
                      <Button variant="link" className="p-0 h-auto">→ Contact support</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Interactive Demo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">Pagination Example</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button size="sm">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">Filter Actions</h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">🔍 Filter</Button>
                      <Button variant="outline" size="sm">📊 Sort</Button>
                      <Button variant="outline" size="sm">📤 Export</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtomsDemo;
