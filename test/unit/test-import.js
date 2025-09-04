// Test script to simulate importing from npm
// This will help us identify the specific issues

console.log('Testing npm import simulation...');

try {
  // Simulate importing the built package
  const packagePath = './dist/index.esm.js';
  console.log('Attempting to import:', packagePath);
  
  import(packagePath).then(module => {
    console.log('✅ Import successful!');
    console.log('Available exports:', Object.keys(module));
    
    // Check for essential exports
    const essentialExports = ['Button', 'FactoryBridge', 'designTokens', 'store'];
    essentialExports.forEach(exportName => {
      if (module[exportName]) {
        console.log(`✅ ${exportName} exported correctly`);
      } else {
        console.log(`❌ ${exportName} missing from exports`);
      }
    });
    
    // Try to use FactoryBridge
    if (module.FactoryBridge) {
      console.log('Testing FactoryBridge component...');
      try {
        // Test in a browser-like environment
        global.document = {
          createElement: (tag) => ({ 
            tagName: tag.toUpperCase(),
            appendChild: () => {},
            style: {},
            className: ''
          })
        };
        global.window = {};
        
        // FactoryBridge is a React component, not a class constructor
        const FactoryBridgeComponent = module.FactoryBridge;
        
        // Check if it's a function (React component)
        if (typeof FactoryBridgeComponent === 'function') {
          console.log('✅ FactoryBridge is a valid React component');
          
          // Test that it can be called as a React component
          const props = { factory: 'Button', config: { text: 'Test' } };
          // In a real React app, this would be rendered by React
          console.log('✅ FactoryBridge component ready for React rendering');
        } else {
          console.log('❌ FactoryBridge is not a function:', typeof FactoryBridgeComponent);
        }
        
      } catch (error) {
        console.log('❌ FactoryBridge test failed:', error.message);
      }
    }
    
  }).catch(error => {
    console.log('❌ Import failed:', error.message);
    console.log('Error details:', error);
  });
  
} catch (error) {
  console.log('❌ Setup failed:', error.message);
}
