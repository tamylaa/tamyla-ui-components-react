import React, { useState } from 'react';
import { Button, Input, Card, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';

const OrganismsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const sidebarItems = [
    { label: 'Overview', icon: '🏠', active: activeTab === 'dashboard', notifications: 0 },
    { label: 'Analytics', icon: '📈', active: activeTab === 'analytics', notifications: 5 },
    { label: 'Users', icon: '👥', active: activeTab === 'users', notifications: 2 },
    { label: 'Content', icon: '📝', active: activeTab === 'content', notifications: 0 },
    { label: 'Settings', icon: '⚙️', active: activeTab === 'settings', notifications: 1 },
    { label: 'Reports', icon: '📋', active: false, notifications: 0 },
    { label: 'Help', icon: '❓', active: false, notifications: 0 }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: 'JD' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', role: 'Editor', status: 'active', avatar: 'SM' },
    { id: 3, name: 'Alex Brown', email: 'alex@example.com', role: 'User', status: 'inactive', avatar: 'AB' },
    { id: 4, name: 'Lisa Wong', email: 'lisa@example.com', role: 'Editor', status: 'active', avatar: 'LW' },
    { id: 5, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'pending', avatar: 'MJ' }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: '$299.00', status: 'completed', date: '2024-01-15' },
    { id: '#1235', customer: 'Sarah Miller', amount: '$149.00', status: 'processing', date: '2024-01-15' },
    { id: '#1236', customer: 'Alex Brown', amount: '$79.00', status: 'shipped', date: '2024-01-14' },
    { id: '#1237', customer: 'Lisa Wong', amount: '$399.00', status: 'pending', date: '2024-01-14' }
  ];

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(selectedItems.length === users.length ? [] : users.map(u => u.id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Shipped</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header with Navigation */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl">{sidebarOpen ? '◀️' : '▶️'}</span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  O
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Organisms Demo</h1>
                  <p className="text-sm text-gray-600">Complex Interface Layouts</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pr-10"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" className="relative">
                  🔔
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center bg-red-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-semibold">
                  AD
                </Avatar>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-4 border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 h-full">
            <div className="p-6">
              <nav className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                    item.active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.notifications > 0 && (
                      <Badge className="w-5 h-5 rounded-full text-xs flex items-center justify-center bg-red-500">
                        {item.notifications}
                      </Badge>
                    )}
                  </div>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    ➕ Add New
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    📤 Export Data
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    ⚙️ Settings
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Users', value: '12,847', change: '+12%', icon: '👥', color: 'bg-blue-600' },
                  { title: 'Revenue', value: '$45,678', change: '+8%', icon: '💰', color: 'bg-green-600' },
                  { title: 'Orders', value: '1,247', change: '+15%', icon: '📦', color: 'bg-purple-600' },
                  { title: 'Growth', value: '23.5%', change: '+3%', icon: '📈', color: 'bg-orange-600' }
                ].map((stat, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                        {stat.icon}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Activity Chart Area */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h3>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">📊</span>
                    <p className="text-gray-600">Interactive Chart Area</p>
                    <p className="text-sm text-gray-500">Chart component would be rendered here</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                  <p className="text-gray-600">Manage your platform users and their permissions</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline">Export</Button>
                  <Button>Add User</Button>
                </div>
              </div>

              {/* Filters and Actions */}
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button variant="outline">Filter</Button>
                  </div>

                  {selectedItems.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{selectedItems.length} selected</span>
                      <Button variant="outline" size="sm">Bulk Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Enhanced User Table */}
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 text-left">
                          <input
                            type="checkbox"
                            checked={selectedItems.length === users.length}
                            onChange={selectAllItems}
                            className="w-4 h-4"
                          />
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-900">User</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Role</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(user.id)}
                              onChange={() => toggleItemSelection(user.id)}
                              className="w-4 h-4"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-semibold">
                                {user.avatar}
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{user.role}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={user.status === 'active' ? 'default' : user.status === 'inactive' ? 'destructive' : 'secondary'}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing 1 to 5 of 5 results
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <p className="text-gray-600">Detailed insights and performance metrics</p>
              </div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                  <div className="space-y-3">
                    {[
                      { source: 'Direct', value: '45%', color: 'bg-blue-600' },
                      { source: 'Social Media', value: '30%', color: 'bg-green-600' },
                      { source: 'Email', value: '15%', color: 'bg-purple-600' },
                      { source: 'Others', value: '10%', color: 'bg-gray-600' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm text-gray-700">{item.source}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
                  <div className="space-y-4">
                    {[
                      { stage: 'Visitors', count: '10,247', percentage: '100%' },
                      { stage: 'Leads', count: '2,458', percentage: '24%' },
                      { stage: 'Customers', count: '847', percentage: '8.3%' },
                      { stage: 'Retained', count: '456', percentage: '4.5%' }
                    ].map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-700">{stage.stage}</span>
                          <span className="text-sm font-semibold">{stage.count} ({stage.percentage})</span>
                        </div>
                        <Progress value={parseInt(stage.percentage)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Recent Events</h3>
                  <div className="space-y-3">
                    {[
                      { event: 'User Registration', time: '2 min ago', type: 'success' },
                      { event: 'Payment Failed', time: '5 min ago', type: 'error' },
                      { event: 'New Order', time: '12 min ago', type: 'success' },
                      { event: 'System Update', time: '1 hour ago', type: 'info' }
                    ].map((event, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          event.type === 'success' ? 'bg-green-500' :
                          event.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{event.event}</p>
                          <p className="text-xs text-gray-600">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Content and Settings tabs would follow similar patterns */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
                <p className="text-gray-600">Manage your content, pages, and media</p>
              </div>
              <Card className="p-8 text-center">
                <span className="text-6xl mb-4 block">📝</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Editor</h3>
                <p className="text-gray-600">Advanced content management interface would be displayed here</p>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="text-gray-600">Configure your platform settings and preferences</p>
              </div>
              <Card className="p-8 text-center">
                <span className="text-6xl mb-4 block">⚙️</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600">Configuration panels and system settings would be shown here</p>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrganismsDemo;
