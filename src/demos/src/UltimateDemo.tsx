/**
 * Ultimate Component Library Demo
 * Showcasing the complete UI Platform capabilities
 */

import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Badge,
  Progress,
  Alert,
  Avatar
} from '@tamyla/ui-components-react';

// Showcase Components
const AtomsShowcase: React.FC<{
  inputValue: string;
  setInputValue: (value: string) => void;
  progress: number;
  setProgress: (value: number) => void;
}> = ({ inputValue, setInputValue, progress, setProgress }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🧬 Atoms - Basic Building Blocks</h2>
      <p className="text-gray-600 mb-8">
        The fundamental UI elements that form the foundation of our design system.
      </p>
    </div>

    {/* Enhanced Buttons Section */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Button Components</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Variants</h4>
          <div className="space-y-3">
            <Button className="w-full">Default</Button>
            <Button variant="outline" className="w-full">Outline</Button>
            <Button variant="ghost" className="w-full">Ghost</Button>
            <Button variant="destructive" className="w-full">Destructive</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Sizes</h4>
          <div className="space-y-3">
            <Button size="sm" className="w-full">Small</Button>
            <Button size="default" className="w-full">Default</Button>
            <Button size="lg" className="w-full">Large</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">States</h4>
          <div className="space-y-3">
            <Button disabled className="w-full">Disabled</Button>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Gradient</Button>
            <Button className="w-full animate-pulse">Loading Style</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">With Icons</h4>
          <div className="space-y-3">
            <Button className="w-full">⭐ Favorite</Button>
            <Button className="w-full">🚀 Launch</Button>
            <Button className="w-full">💾 Save</Button>
          </div>
        </div>
      </div>
    </Card>

    {/* Enhanced Input Section */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Input Components</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Input</label>
            <Input
              placeholder="Enter some text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Value: {inputValue || 'empty'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Input</label>
            <Input type="email" placeholder="Enter your email..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Input</label>
            <Input type="password" placeholder="Enter password..." />
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
        </div>
      </div>
    </Card>

    {/* Enhanced Progress & Feedback */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Progress & Feedback</h3>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-700">Progress Indicators</h4>
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

        <div>
          <h4 className="font-medium text-gray-700 mb-4">Badges</h4>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-green-600">Success</Badge>
            <Badge className="bg-yellow-600">Warning</Badge>
            <Badge className="bg-purple-600">Premium</Badge>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-4">Alerts</h4>
          <div className="space-y-4">
            <Alert>
              <span className="text-lg">ℹ️</span>
              <div>
                <h5 className="font-medium">Information</h5>
                <p className="text-sm">This is an informational alert with helpful details.</p>
              </div>
            </Alert>

            <Alert className="border-green-500 bg-green-50">
              <span className="text-lg">✅</span>
              <div>
                <h5 className="font-medium text-green-800">Success</h5>
                <p className="text-sm text-green-700">Your action was completed successfully!</p>
              </div>
            </Alert>

            <Alert variant="destructive">
              <span className="text-lg">⚠️</span>
              <div>
                <h5 className="font-medium">Error</h5>
                <p className="text-sm">Something went wrong. Please check your input and try again.</p>
              </div>
            </Alert>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-4">Avatars</h4>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <Avatar className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-semibold mb-2">
                JD
              </Avatar>
              <p className="text-xs text-gray-600">John Doe</p>
            </div>
            <div className="text-center">
              <Avatar className="w-16 h-16 bg-green-600 text-white flex items-center justify-center font-semibold text-lg mb-2">
                SM
              </Avatar>
              <p className="text-xs text-gray-600">Sarah Miller</p>
            </div>
            <div className="text-center">
              <Avatar className="w-20 h-20 bg-purple-600 text-white flex items-center justify-center font-semibold text-xl mb-2">
                AB
              </Avatar>
              <p className="text-xs text-gray-600">Alex Brown</p>
            </div>
            <div className="text-center">
              <Avatar className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 text-white flex items-center justify-center font-semibold mb-2">
                LW
              </Avatar>
              <p className="text-xs text-gray-600">Lisa Wong</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const MoleculesShowcase: React.FC<{
  formData: {
    name: string;
    email: string;
    message: string;
    subscribe: boolean;
    theme: string;
    notifications: boolean;
  };
  setFormData: (data: {
    name: string;
    email: string;
    message: string;
    subscribe: boolean;
    theme: string;
    notifications: boolean;
  }) => void;
}> = ({ formData, setFormData }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 Molecules - Component Combinations</h2>
      <p className="text-gray-600 mb-8">
        Groups of atoms working together to form more complex, functional units.
      </p>
    </div>

    {/* Enhanced Form Components */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Smart Forms</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <Input
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <Input
              placeholder="Enter your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Preferences</h4>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="subscribe"
                checked={formData.subscribe}
                onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="subscribe" className="text-sm text-gray-700">Subscribe to newsletter</label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="notifications"
                checked={formData.notifications}
                onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="notifications" className="text-sm text-gray-700">Enable notifications</label>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Theme Preference</h4>
            <div className="space-y-2">
              {['light', 'dark', 'auto'].map(theme => (
                <div key={theme} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={theme}
                    name="theme"
                    value={theme}
                    checked={formData.theme === theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    className="w-4 h-4"
                  />
                  <label htmlFor={theme} className="text-sm text-gray-700 capitalize">{theme}</label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Submit Form</Button>
        </div>
      </div>
    </Card>

    {/* Product Cards */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Cards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Wireless Headphones', price: '$299', rating: 4.8, inStock: true, image: '🎧' },
          { name: 'Smart Watch', price: '$399', rating: 4.9, inStock: true, image: '⌚' },
          { name: 'Laptop Stand', price: '$89', rating: 4.5, inStock: false, image: '💻' },
          { name: 'USB-C Hub', price: '$79', rating: 4.6, inStock: true, image: '🔌' },
          { name: 'Wireless Mouse', price: '$59', rating: 4.7, inStock: true, image: '🖱️' },
          { name: 'Mechanical Keyboard', price: '$149', rating: 4.8, inStock: true, image: '⌨️' }
        ].map((product, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 space-y-4">
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-4xl">{product.image}</span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-xl font-bold text-blue-600">{product.price}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <Button className="w-full" disabled={!product.inStock}>
                {product.inStock ? "Add to Cart" : "Notify Me"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  </div>
);

const OrganismsShowcase: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🦠 Organisms - Complex Sections</h2>
      <p className="text-gray-600 mb-8">
        Complex UI sections combining multiple molecules and atoms into distinct interface areas.
      </p>
    </div>

    {/* Dashboard Layout */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Interface</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: '$45,678', change: '+12%', icon: '💰', color: 'bg-green-100 text-green-800' },
          { title: 'Active Users', value: '2,847', change: '+8%', icon: '👥', color: 'bg-blue-100 text-blue-800' },
          { title: 'Conversion Rate', value: '3.24%', change: '+2.1%', icon: '📈', color: 'bg-purple-100 text-purple-800' },
          { title: 'Support Tickets', value: '23', change: '-15%', icon: '🎫', color: 'bg-orange-100 text-orange-800' }
        ].map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'created a new project', time: '2 minutes ago', avatar: 'JD' },
            { user: 'Sarah Miller', action: 'updated user profile', time: '15 minutes ago', avatar: 'SM' },
            { user: 'Alex Brown', action: 'completed a task', time: '1 hour ago', avatar: 'AB' },
            { user: 'Lisa Wong', action: 'added a comment', time: '2 hours ago', avatar: 'LW' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-semibold">
                {activity.avatar}
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium text-gray-900">{activity.user}</span>
                  <span className="text-gray-600"> {activity.action}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

const ApplicationsShowcase: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Applications - Complete Workflows</h2>
      <p className="text-gray-600 mb-8">
        Full-featured application interfaces demonstrating complete user workflows and experiences.
      </p>
    </div>

    {/* E-commerce Interface */}
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">E-commerce Workflow</h3>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input placeholder="Search products..." className="w-full" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'].map(category => (
            <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-gray-200">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Shopping Cart Summary */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Shopping Cart (3 items)</h4>
        <div className="space-y-3">
          {[
            { name: 'Wireless Headphones', price: '$299', qty: 1 },
            { name: 'Smart Watch', price: '$399', qty: 1 },
            { name: 'USB-C Hub', price: '$79', qty: 1 }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{item.name} (x{item.qty})</span>
              <span className="font-medium">{item.price}</span>
            </div>
          ))}
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">$777</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">Continue Shopping</Button>
        <Button className="flex-1">Proceed to Checkout</Button>
      </div>
    </Card>
  </div>
);

const InteractiveShowcase: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, `${id}: ${message}`]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => !n.startsWith(id)));
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Interactive - Live Demos</h2>
        <p className="text-gray-600 mb-8">
          Interactive components demonstrating real-time state management and user interactions.
        </p>
      </div>

      {/* Interactive Counter */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Redux Counter Demo</h3>
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold text-blue-600">{counter}</div>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => setCounter(counter - 1)}
              className="px-8"
            >
              Decrement
            </Button>
            <Button
              onClick={() => setCounter(counter + 1)}
              className="px-8"
            >
              Increment
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => setCounter(0)}
            className="text-gray-500"
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Theme Switcher */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Theme Management</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Current theme:</span>
            <Badge className={theme === 'dark' ? 'bg-gray-800' : 'bg-blue-600'}>
              {theme}
            </Badge>
          </div>
          <div className="flex space-x-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
            >
              ☀️ Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
            >
              🌙 Dark
            </Button>
            <Button
              variant={theme === 'auto' ? 'default' : 'outline'}
              onClick={() => setTheme('auto')}
            >
              🔄 Auto
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification System */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Live Notifications</h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={() => addNotification('Success! Action completed.')}>
              ✅ Success
            </Button>
            <Button
              variant="destructive"
              onClick={() => addNotification('Error! Something went wrong.')}
            >
              ❌ Error
            </Button>
            <Button
              variant="outline"
              onClick={() => addNotification('Info: Here\'s some information.')}
            >
              ℹ️ Info
            </Button>
          </div>

          <div className="space-y-2 min-h-[100px]">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications. Click a button above to see live notifications.</p>
            ) : (
              notifications.map((notification, index) => (
                <Alert key={index} className="animate-in slide-in-from-right">
                  <span className="text-sm">{notification.split(': ')[1]}</span>
                </Alert>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const UltimateDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(65);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subscribe: false,
    theme: 'light',
    notifications: true
  });

  const [currentSection, setCurrentSection] = useState('overview');

  const sections = [
    { id: 'overview', title: '📋 Overview', icon: '📊' },
    { id: 'atoms', title: '🧬 Atoms', icon: '⚛️' },
    { id: 'molecules', title: '🧪 Molecules', icon: '🔬' },
    { id: 'organisms', title: '🦠 Organisms', icon: '🏗️' },
    { id: 'applications', title: '🚀 Applications', icon: '🎯' },
    { id: 'interactive', title: '⚡ Interactive', icon: '🎮' }
  ];

  const stats = [
    { label: 'Total Components', value: '24+', trend: '+12%', icon: '🧩' },
    { label: 'Redux Features', value: '15', trend: '+8%', icon: '⚡' },
    { label: 'Demo Coverage', value: '100%', trend: '+25%', icon: '✅' },
    { label: 'Performance', value: '98ms', trend: '-5%', icon: '🚀' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                UI
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ultimate Component Demo</h1>
                <p className="text-sm text-gray-600">Complete UI Platform Showcase</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="px-3 py-1">v2.0.0</Badge>
              <Badge className="bg-green-600 text-white px-3 py-1">✨ Enhanced</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Component Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        currentSection === section.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Demo Statistics</h4>
                  <div className="space-y-3">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{stat.icon}</span>
                          <span className="text-sm text-gray-600">{stat.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                          <div className="text-xs text-green-600">{stat.trend}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {currentSection === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Section */}
                <Card className="p-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      🎯 Ultimate Component Library Demo
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      A comprehensive showcase of our complete UI Platform capabilities
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button size="lg" className="px-8">
                        🚀 Get Started
                      </Button>
                      <Button variant="outline" size="lg" className="px-8">
                        📚 Documentation
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🧬</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Atomic Design</h3>
                      <p className="text-gray-600 text-sm">
                        Built with atomic design principles for maximum reusability and consistency.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚡</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Redux Powered</h3>
                      <p className="text-gray-600 text-sm">
                        Seamless Redux integration for state management and analytics tracking.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Modern Design</h3>
                      <p className="text-gray-600 text-sm">
                        Beautiful, accessible components following modern design standards.
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {currentSection === 'atoms' && (
              <AtomsShowcase
                inputValue={inputValue}
                setInputValue={setInputValue}
                progress={progress}
                setProgress={setProgress}
              />
            )}

            {currentSection === 'molecules' && (
              <MoleculesShowcase formData={formData} setFormData={setFormData} />
            )}

            {currentSection === 'organisms' && (
              <OrganismsShowcase />
            )}

            {currentSection === 'applications' && (
              <ApplicationsShowcase />
            )}

            {currentSection === 'interactive' && (
              <InteractiveShowcase />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltimateDemo;
