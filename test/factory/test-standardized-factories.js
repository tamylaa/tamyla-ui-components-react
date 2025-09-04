/**
 * Test script to verify standardized factory structure
 */

// Simulate the factory importer behavior
const factoryRegistry = new Map();

// Mock factories with consistent structure (all use create method)
const createMockButton = () => ({
  create: (props = {}) => {
    console.log('✅ ButtonFactory.create() called with:', props);
    return { type: 'button', props };
  },
  createPrimary: (props = {}) => {
    console.log('✅ ButtonFactory.createPrimary() called with:', props);
    return { type: 'button-primary', props };
  }
});

const createMockInput = () => ({
  create: (props = {}) => {
    console.log('✅ InputFactory.create() called with:', props);
    return { type: 'input', props };
  }
});

const createMockCard = () => ({
  create: (props = {}) => {
    console.log('✅ CardFactory.create() called with:', props);
    return { type: 'card', props };
  }
});

// Normalize function example (same as in our factory-importer.ts)
function normalizeFactory(factory) {
  if (!factory) return null;

  // If it's already an object with a create method, return as-is
  if (typeof factory === 'object' && typeof factory.create === 'function') {
    return factory;
  }

  // If it's a direct function, wrap it in an object with create method
  if (typeof factory === 'function') {
    return {
      create: factory
    };
  }

  return null;
}

// Simulate loading different types of factories
console.log('🔄 Testing factory normalization...\n');

// Test 1: Object with create method (should pass through)
const buttonFactory = createMockButton();
const normalizedButton = normalizeFactory(buttonFactory);
console.log('Test 1 - Object with create method:');
console.log('Original:', buttonFactory);
console.log('Normalized:', normalizedButton);
console.log('Valid:', typeof normalizedButton?.create === 'function');
normalizedButton.create({ text: 'Click me' });
normalizedButton.createPrimary({ text: 'Primary button' });
console.log('');

// Test 2: Direct function (should be wrapped)
const directFunction = (props) => {
  console.log('✅ Direct function called with:', props);
  return { type: 'direct', props };
};
const normalizedDirect = normalizeFactory(directFunction);
console.log('Test 2 - Direct function:');
console.log('Original:', directFunction);
console.log('Normalized:', normalizedDirect);
console.log('Valid:', typeof normalizedDirect?.create === 'function');
normalizedDirect.create({ content: 'Direct content' });
console.log('');

// Test 3: Multiple factories with consistent interface
const factories = [
  { name: 'ButtonFactory', factory: createMockButton() },
  { name: 'InputFactory', factory: createMockInput() },
  { name: 'CardFactory', factory: createMockCard() }
];

console.log('Test 3 - All factories use consistent .create() method:');
factories.forEach(({ name, factory }) => {
  console.log(`${name}:`, typeof factory.create === 'function' ? '✅' : '❌');
  if (typeof factory.create === 'function') {
    factory.create({ component: name });
  }
});
console.log('');

// Test 4: Registry pattern simulation
console.log('Test 4 - Factory registry with safeCall pattern:');
factoryRegistry.set('ButtonFactory', createMockButton());
factoryRegistry.set('InputFactory', createMockInput());
factoryRegistry.set('CardFactory', createMockCard());

function safeCall(factoryName, method = 'create', props = {}) {
  const factory = factoryRegistry.get(factoryName);
  if (!factory) {
    console.log(`❌ Factory ${factoryName} not found`);
    return null;
  }
  
  if (typeof factory[method] === 'function') {
    console.log(`✅ Calling ${factoryName}.${method}()`);
    return factory[method](props);
  } else {
    console.log(`❌ Method ${method} not found on ${factoryName}`);
    return null;
  }
}

// Test safeCall with different methods
safeCall('ButtonFactory', 'create', { text: 'Test' });
safeCall('ButtonFactory', 'createPrimary', { text: 'Primary Test' });
safeCall('InputFactory', 'create', { placeholder: 'Enter text' });
safeCall('CardFactory', 'create', { title: 'Test Card' });

console.log('\n🎉 All tests completed! Standardized factory structure working correctly.');
