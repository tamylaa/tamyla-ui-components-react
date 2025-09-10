import React, { useState } from 'react';
import { Button, Input, Card, Badge, Progress, Alert, Avatar } from '@tamyla/ui-components-react';

const ApplicationsDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentWorkflow, setCurrentWorkflow] = useState('onboarding');
  const [formData, setFormData] = useState({
    // User onboarding data
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    experience: '',
    interests: [] as string[],

    // E-commerce data
    cartItems: [
      { id: 1, name: 'Wireless Headphones', price: 299, quantity: 1, image: '🎧' },
      { id: 2, name: 'Smart Watch', price: 399, quantity: 1, image: '⌚' }
    ],
    shippingAddress: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },

    // CMS data
    articles: [
      { id: 1, title: 'Getting Started Guide', status: 'published', author: 'John Doe', date: '2024-01-15', views: 1247 },
      { id: 2, title: 'Advanced Features', status: 'draft', author: 'Sarah Miller', date: '2024-01-14', views: 0 },
      { id: 3, title: 'API Documentation', status: 'review', author: 'Alex Brown', date: '2024-01-13', views: 892 }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const workflows = [
    { id: 'onboarding', title: '👋 User Onboarding', description: 'Multi-step user registration and setup process' },
    { id: 'ecommerce', title: '🛒 E-commerce Checkout', description: 'Complete shopping cart and checkout workflow' },
    { id: 'cms', title: '📝 Content Management', description: 'Article creation and management system' },
    { id: 'analytics', title: '📊 Analytics Dashboard', description: 'Data visualization and reporting interface' }
  ];

  const onboardingSteps = [
    { id: 1, title: 'Personal Info', description: 'Basic information', icon: '👤' },
    { id: 2, title: 'Professional', description: 'Work experience', icon: '💼' },
    { id: 3, title: 'Interests', description: 'Your preferences', icon: '❤️' },
    { id: 4, title: 'Review', description: 'Confirm details', icon: '✅' }
  ];

  const checkoutSteps = [
    { id: 1, title: 'Cart Review', description: 'Review your items', icon: '🛒' },
    { id: 2, title: 'Shipping', description: 'Delivery information', icon: '🚚' },
    { id: 3, title: 'Payment', description: 'Payment method', icon: '💳' },
    { id: 4, title: 'Confirmation', description: 'Order complete', icon: '✅' }
  ];

  const interests = [
    'Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'Operations',
    'Product Management', 'Engineering', 'Data Science', 'Customer Success'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    }));
  };

  const cartTotal = formData.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🚀 Applications - Complete Workflows</h1>
          <p className="text-xl text-gray-600 mb-8">
            Full-featured application interfaces demonstrating end-to-end user experiences and complex business workflows.
          </p>
        </div>

        {/* Workflow Selection */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  currentWorkflow === workflow.id
                    ? 'ring-2 ring-blue-600 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setCurrentWorkflow(workflow.id);
                  setCurrentStep(1);
                  setIsSubmitted(false);
                }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{workflow.title.split(' ')[0]}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{workflow.title.substring(2)}</h3>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Steps */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                {currentWorkflow === 'onboarding' && 'Onboarding Steps'}
                {currentWorkflow === 'ecommerce' && 'Checkout Steps'}
                {currentWorkflow === 'cms' && 'Content Actions'}
                {currentWorkflow === 'analytics' && 'Report Sections'}
              </h3>

              <div className="space-y-3">
                {currentWorkflow === 'onboarding' && onboardingSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : currentStep > step.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{step.icon}</span>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs opacity-80">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}

                {currentWorkflow === 'ecommerce' && checkoutSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : currentStep > step.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{step.icon}</span>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs opacity-80">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}

                {(currentWorkflow === 'cms' || currentWorkflow === 'analytics') && (
                  <>
                    <div className="p-3 bg-blue-100 text-blue-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">📊</span>
                        <div>
                          <div className="font-medium">Overview</div>
                          <div className="text-xs opacity-80">Main dashboard</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-100 text-gray-600 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">⚙️</span>
                        <div>
                          <div className="font-medium">Settings</div>
                          <div className="text-xs opacity-80">Configuration</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Progress Indicator */}
              {(currentWorkflow === 'onboarding' || currentWorkflow === 'ecommerce') && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round((currentStep / (currentWorkflow === 'onboarding' ? onboardingSteps.length : checkoutSteps.length)) * 100)}%</span>
                  </div>
                  <Progress value={(currentStep / (currentWorkflow === 'onboarding' ? onboardingSteps.length : checkoutSteps.length)) * 100} className="h-2" />
                </div>
              )}
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              {/* Onboarding Workflow */}
              {currentWorkflow === 'onboarding' && (
                <>
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">👤 Personal Information</h2>
                        <p className="text-gray-600">Let's start with some basic information about you.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <Input
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <Input
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={() => setCurrentStep(2)} disabled={!formData.firstName || !formData.lastName || !formData.email}>
                          Continue →
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">💼 Professional Information</h2>
                        <p className="text-gray-600">Tell us about your work experience and role.</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <Input
                            placeholder="Enter your company name"
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <Input
                            placeholder="Enter your job title"
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['Entry Level', 'Mid Level', 'Senior Level', 'Executive'].map(level => (
                              <button
                                key={level}
                                onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                                className={`p-3 rounded-lg border transition-colors ${
                                  formData.experience === level
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>
                          ← Back
                        </Button>
                        <Button onClick={() => setCurrentStep(3)} disabled={!formData.company || !formData.role || !formData.experience}>
                          Continue →
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">❤️ Interests & Preferences</h2>
                        <p className="text-gray-600">Select areas you're interested in to personalize your experience.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">Areas of Interest</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {interests.map(interest => (
                            <button
                              key={interest}
                              onClick={() => handleInterestToggle(interest)}
                              className={`p-3 rounded-lg border text-sm transition-colors ${
                                formData.interests.includes(interest)
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Selected: {formData.interests.length} interest{formData.interests.length !== 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(2)}>
                          ← Back
                        </Button>
                        <Button onClick={() => setCurrentStep(4)} disabled={formData.interests.length === 0}>
                          Continue →
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">✅ Review & Confirm</h2>
                        <p className="text-gray-600">Please review your information before completing the setup.</p>
                      </div>

                      <div className="space-y-6">
                        <Card className="p-6 bg-gray-50">
                          <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Name:</span>
                              <span className="ml-2 font-medium">{formData.firstName} {formData.lastName}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Email:</span>
                              <span className="ml-2 font-medium">{formData.email}</span>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-6 bg-gray-50">
                          <h3 className="font-semibold text-gray-900 mb-4">Professional Information</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Company:</span>
                              <span className="ml-2 font-medium">{formData.company}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Role:</span>
                              <span className="ml-2 font-medium">{formData.role}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-600">Experience:</span>
                              <span className="ml-2 font-medium">{formData.experience}</span>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-6 bg-gray-50">
                          <h3 className="font-semibold text-gray-900 mb-4">Interests</h3>
                          <div className="flex flex-wrap gap-2">
                            {formData.interests.map(interest => (
                              <Badge key={interest} variant="secondary">{interest}</Badge>
                            ))}
                          </div>
                        </Card>
                      </div>

                      {!isSubmitted ? (
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setCurrentStep(3)}>
                            ← Back
                          </Button>
                          <Button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Setting up your account...' : 'Complete Setup'}
                          </Button>
                        </div>
                      ) : (
                        <Alert className="border-green-500 bg-green-50">
                          <span className="text-lg">🎉</span>
                          <div>
                            <h4 className="font-medium text-green-800">Welcome aboard!</h4>
                            <p className="text-sm text-green-700">Your account has been successfully created and configured.</p>
                          </div>
                        </Alert>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* E-commerce Workflow */}
              {currentWorkflow === 'ecommerce' && (
                <>
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">🛒 Shopping Cart</h2>
                        <p className="text-gray-600">Review your items before proceeding to checkout.</p>
                      </div>

                      <div className="space-y-4">
                        {formData.cartItems.map(item => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                            <div className="text-4xl">{item.image}</div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-600">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <div className="font-medium text-gray-900">
                              ${item.price * item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total:</span>
                          <span>${cartTotal}</span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={() => setCurrentStep(2)} disabled={formData.cartItems.length === 0}>
                          Proceed to Shipping →
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">🚚 Shipping Information</h2>
                        <p className="text-gray-600">Where should we deliver your order?</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <Input
                            placeholder="Enter recipient's full name"
                            value={formData.shippingAddress.fullName}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.shippingAddress, fullName: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <Input
                            placeholder="Street address"
                            value={formData.shippingAddress.address}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.shippingAddress, address: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                          <Input
                            placeholder="City"
                            value={formData.shippingAddress.city}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.shippingAddress, city: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <Input
                            placeholder="State"
                            value={formData.shippingAddress.state}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.shippingAddress, state: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                          <Input
                            placeholder="ZIP Code"
                            value={formData.shippingAddress.zipCode}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.shippingAddress, zipCode: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                          <Input
                            value={formData.shippingAddress.country}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              shippingAddress: { ...prev.shippingAddress, country: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>
                          ← Back to Cart
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(3)}
                          disabled={!formData.shippingAddress.fullName || !formData.shippingAddress.address || !formData.shippingAddress.city}
                        >
                          Continue to Payment →
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">💳 Payment Information</h2>
                        <p className="text-gray-600">Choose your payment method and complete your order.</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { id: 'card', name: 'Credit Card', icon: '💳' },
                              { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                              { id: 'apple', name: 'Apple Pay', icon: '🍎' }
                            ].map(method => (
                              <div key={method.id} className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50">
                                <div className="text-center">
                                  <div className="text-2xl mb-2">{method.icon}</div>
                                  <div className="font-medium">{method.name}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                          <h4 className="font-medium text-gray-900 mb-4">Order Summary</h4>
                          <div className="space-y-3">
                            {formData.cartItems.map(item => (
                              <div key={item.id} className="flex justify-between">
                                <span>{item.name} x{item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                              </div>
                            ))}
                            <div className="border-t pt-3 flex justify-between font-medium">
                              <span>Shipping</span>
                              <span>Free</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                              <span>Total</span>
                              <span>${cartTotal}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCurrentStep(2)}>
                          ← Back to Shipping
                        </Button>
                        <Button onClick={() => setCurrentStep(4)} className="bg-green-600 hover:bg-green-700">
                          Complete Order →
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="text-center space-y-6">
                      <div className="text-6xl">🎉</div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                        <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Order #12345</h3>
                        <p className="text-sm text-gray-600">You'll receive a confirmation email shortly.</p>
                      </div>
                      <Button onClick={() => { setCurrentStep(1); setCurrentWorkflow('onboarding'); }}>
                        Start New Demo
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* CMS Workflow */}
              {currentWorkflow === 'cms' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Content Management System</h2>
                    <p className="text-gray-600">Manage your articles, pages, and media content.</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button>➕ New Article</Button>
                      <Button variant="outline">📁 Media Library</Button>
                      <Button variant="outline">🏷️ Categories</Button>
                    </div>
                    <Input placeholder="Search articles..." className="w-64" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="p-4 text-left text-sm font-semibold text-gray-900">Title</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-900">Author</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-900">Views</th>
                          <th className="p-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {formData.articles.map(article => (
                          <tr key={article.id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-900">{article.title}</td>
                            <td className="p-4 text-gray-600">{article.author}</td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  article.status === 'published' ? 'default' :
                                  article.status === 'draft' ? 'secondary' : 'destructive'
                                }
                              >
                                {article.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-600">{article.date}</td>
                            <td className="p-4 text-gray-600">{article.views.toLocaleString()}</td>
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
                </div>
              )}

              {/* Analytics Workflow */}
              {currentWorkflow === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Analytics Dashboard</h2>
                    <p className="text-gray-600">Monitor your website performance and user behavior.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: 'Page Views', value: '24,847', change: '+12%', icon: '👁️' },
                      { title: 'Unique Visitors', value: '8,492', change: '+8%', icon: '👥' },
                      { title: 'Bounce Rate', value: '34.2%', change: '-5%', icon: '⚡' },
                      { title: 'Avg. Session', value: '2m 34s', change: '+15%', icon: '⏱️' }
                    ].map((metric, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <p className="text-sm text-green-600">{metric.change}</p>
                          </div>
                          <div className="text-3xl">{metric.icon}</div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                      <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📈</div>
                          <p className="text-gray-600">Interactive Chart</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Top Pages</h3>
                      <div className="space-y-4">
                        {[
                          { page: '/home', views: '8,247', percentage: 33 },
                          { page: '/products', views: '5,891', percentage: 24 },
                          { page: '/about', views: '3,456', percentage: 14 },
                          { page: '/contact', views: '2,789', percentage: 11 }
                        ].map((page, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-900">{page.page}</span>
                              <span className="text-sm text-gray-600">{page.views} views</span>
                            </div>
                            <Progress value={page.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsDemo;
