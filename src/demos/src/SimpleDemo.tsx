/**
 * Simple Components Demo
 * Clean showcase of basic UI components
 * Perfect for quick component overview
 */

import React, { useState } from 'react';
import { Button, Input, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';

const SimpleComponentsDemo: React.FC = () => {
  const [progress, setProgress] = useState(65);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'components', label: 'Components', icon: '🧩' },
    { id: 'interactive', label: 'Interactive', icon: '⚡' },
    { id: 'playground', label: 'Playground', icon: '🎮' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-lg">
            <span className="text-4xl text-white">🎨</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple Components Demo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            A clean and simple showcase of our UI component library. Perfect for quick component
            overviews and testing various states and interactions.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-600 text-white px-4 py-2">✅ Ready to Use</Badge>
            <Badge variant="outline" className="px-4 py-2">🚀 Latest Version</Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">⭐ Popular</Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md transform -translate-y-0.5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-3xl mb-2">🧩</div>
                  <div className="text-2xl font-bold text-blue-600">24+</div>
                  <div className="text-sm text-gray-600">Components</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Variants</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-2xl font-bold text-purple-600">Fast</div>
                  <div className="text-sm text-gray-600">Performance</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Responsive</div>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Feature Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Easy to Use</h3>
                    <p className="text-sm text-gray-600">Simple and intuitive API design for rapid development</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Highly Customizable</h3>
                    <p className="text-sm text-gray-600">Extensive customization options with Tailwind CSS</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">♿</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Accessible</h3>
                    <p className="text-sm text-gray-600">Built with accessibility best practices in mind</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-8">
              {/* Buttons Showcase */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Button Components</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Primary Buttons</h3>
                    <div className="space-y-3">
                      <Button className="w-full">Default Button</Button>
                      <Button variant="destructive" className="w-full">Destructive</Button>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Gradient</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Secondary Buttons</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">Outline</Button>
                      <Button variant="secondary" className="w-full">Secondary</Button>
                      <Button variant="ghost" className="w-full">Ghost</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Special Buttons</h3>
                    <div className="space-y-3">
                      <Button variant="link" className="w-full">Link Button</Button>
                      <Button disabled className="w-full">Disabled</Button>
                      <Button size="sm" className="w-full">Small Size</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inputs and Forms */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Input Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Text Input</label>
                      <Input
                        placeholder="Enter your text..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Input</label>
                      <Input type="email" placeholder="user@example.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Input</label>
                      <Input type="password" placeholder="Enter password..." />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number Input</label>
                      <Input type="number" placeholder="123" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Input</label>
                      <Input type="date" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Disabled Input</label>
                      <Input disabled placeholder="This is disabled" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges and Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Badges</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Error</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-green-600">Success</Badge>
                      <Badge className="bg-yellow-600">Warning</Badge>
                      <Badge className="bg-purple-600">Premium</Badge>
                      <Badge className="bg-pink-600">Hot</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Progress</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Upload Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Processing</span>
                        <span>Loading...</span>
                      </div>
                      <Progress value={undefined} className="h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interactive' && (
            <div className="space-y-8">
              {/* Interactive Controls */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Progress Control</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-4">{progress}%</div>
                    <div className="space-x-2">
                      <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                      <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Notifications</h4>
                    <div className="relative inline-block mb-4">
                      <Button variant="outline">🔔 Notifications</Button>
                      <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center bg-red-500">
                        {notifications}
                      </Badge>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" onClick={() => setNotifications(Math.max(0, notifications - 1))}>-1</Button>
                      <Button size="sm" onClick={() => setNotifications(notifications + 1)}>+1</Button>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">User Avatar</h4>
                    <div className="mb-4">
                      <Avatar className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-lg mx-auto">
                        JD
                      </Avatar>
                    </div>
                    <Button size="sm" variant="outline">Change Avatar</Button>
                  </div>
                </div>
              </div>

              {/* Alert Examples */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Alert Messages</h3>
                <div className="space-y-4">
                  <Alert>
                    <span className="text-lg">ℹ️</span>
                    <div>
                      <h4 className="font-medium">Information</h4>
                      <p className="text-sm">This is an informational alert with helpful details.</p>
                    </div>
                  </Alert>

                  <Alert className="border-green-500 bg-green-50">
                    <span className="text-lg">✅</span>
                    <div>
                      <h4 className="font-medium text-green-800">Success</h4>
                      <p className="text-sm text-green-700">Your action was completed successfully!</p>
                    </div>
                  </Alert>

                  <Alert variant="destructive">
                    <span className="text-lg">❌</span>
                    <div>
                      <h4 className="font-medium">Error</h4>
                      <p className="text-sm">Something went wrong. Please try again.</p>
                    </div>
                  </Alert>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'playground' && (
            <div className="space-y-8">
              {/* Component Playground */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Component Playground</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-700">Form Example</h3>
                    <div className="space-y-4">
                      <Input placeholder="Full Name" />
                      <Input type="email" placeholder="Email Address" />
                      <Input type="password" placeholder="Password" />
                      <div className="flex items-center space-x-4">
                        <Button className="flex-1">Sign Up</Button>
                        <Button variant="outline" className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-700">User Profile</h3>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-semibold">
                        JS
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">John Smith</div>
                        <div className="text-sm text-gray-600">Product Manager</div>
                      </div>
                      <Badge className="bg-green-600">Online</Badge>
                    </div>

                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">Edit Profile</Button>
                      <Button variant="outline" className="w-full">Settings</Button>
                      <Button variant="destructive" className="w-full">Sign Out</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mixed Layout Example */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <Button size="sm" className="w-full">📝 Create New</Button>
                    <Button size="sm" variant="outline" className="w-full">📁 Browse Files</Button>
                    <Button size="sm" variant="ghost" className="w-full">⚙️ Settings</Button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Storage</span>
                      <Badge variant="outline">75%</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Memory</span>
                      <Badge className="bg-orange-600">85%</Badge>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8 bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                        A
                      </Avatar>
                      <div className="text-sm text-gray-600">File uploaded</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-semibold text-xs">
                        B
                      </Avatar>
                      <div className="text-sm text-gray-600">User invited</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center font-semibold text-xs">
                        C
                      </Avatar>
                      <div className="text-sm text-gray-600">Settings updated</div>
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

export default SimpleComponentsDemo;
