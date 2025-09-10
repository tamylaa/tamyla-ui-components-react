import React, { useState } from 'react';
import { Button, Input, Card, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';

const MoleculesDemo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const products = [
    { id: 1, name: 'Wireless Headphones', price: '$299', rating: 4.5, inStock: true },
    { id: 2, name: 'Smart Watch', price: '$399', rating: 4.8, inStock: true },
    { id: 3, name: 'Laptop Stand', price: '$89', rating: 4.2, inStock: false },
    { id: 4, name: 'USB-C Hub', price: '$79', rating: 4.0, inStock: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🧪 Molecules - Component Combinations</h1>
          <p className="text-xl text-gray-600">
            Groups of atoms working together as functional units
          </p>
        </div>

        {/* Form Fields Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Form Fields</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Login Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Search Field</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                  >
                    🔍
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Electronics</Badge>
                  <Badge variant="secondary">Accessories</Badge>
                  <Badge variant="secondary">Gadgets</Badge>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Product Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-lg font-bold text-blue-600">{product.price}</p>
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

                  <Button
                    className="w-full"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* User Profile Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
                  JD
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">Premium</Badge>
                    <Badge variant="outline">Verified</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Posts: 42</span>
                  <span>Followers: 1.2K</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 bg-green-500 text-white flex items-center justify-center font-semibold text-lg">
                  SM
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Sarah Miller</h3>
                  <p className="text-sm text-gray-600">Product Designer</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">Pro</Badge>
                    <Badge className="bg-purple-500">Artist</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Projects: 28</span>
                  <span>Following: 892</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 bg-purple-500 text-white flex items-center justify-center font-semibold text-lg">
                  AB
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Alex Brown</h3>
                  <p className="text-sm text-gray-600">Marketing Manager</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">Team Lead</Badge>
                    <Badge className="bg-orange-500">Analytics</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Campaigns: 15</span>
                  <span>Reach: 50K</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Status Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Status Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$45,678</p>
                </div>
                <div className="text-2xl">💰</div>
              </div>
              <div className="mt-4">
                <Progress value={78} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                </div>
                <div className="text-2xl">👥</div>
              </div>
              <div className="mt-4">
                <Progress value={92} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">+8% from last week</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">3.24%</p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
              <div className="mt-4">
                <Progress value={65} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">+2.1% from last month</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Server Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">99.9%</p>
                </div>
                <div className="text-2xl">⚡</div>
              </div>
              <div className="mt-4">
                <Progress value={99} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Excellent performance</p>
              </div>
            </Card>
          </div>
        </section>

        {/* Notification Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notification Cards</h2>
          <div className="space-y-4">
            <Alert>
              <span className="text-lg">📧</span>
              <div className="flex-1">
                <h4 className="font-medium">New Message</h4>
                <p className="text-sm">You have received a new message from John Doe.</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="ghost">Dismiss</Button>
                </div>
              </div>
            </Alert>

            <Alert className="border-green-500 bg-green-50">
              <span className="text-lg">✅</span>
              <div className="flex-1">
                <h4 className="font-medium text-green-800">Payment Successful</h4>
                <p className="text-sm text-green-700">Your payment of $29.99 has been processed successfully.</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">View Receipt</Button>
                  <Button size="sm" variant="ghost">Close</Button>
                </div>
              </div>
            </Alert>

            <Alert variant="destructive">
              <span className="text-lg">⚠️</span>
              <div className="flex-1">
                <h4 className="font-medium">Security Alert</h4>
                <p className="text-sm">Unusual login attempt detected from unknown device.</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Button size="sm" variant="destructive">Review</Button>
                  <Button size="sm" variant="outline">Ignore</Button>
                </div>
              </div>
            </Alert>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoleculesDemo;
