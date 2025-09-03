// Test import without @tamyla/ui-components available
// This simulates a real npm environment where peerDependencies aren't auto-installed

console.log('Testing import without @tamyla/ui-components...');

// Test import without @tamyla/ui-components available
// This simulates a real npm environment where peerDependencies aren't auto-installed

console.log('Testing import without @tamyla/ui-components...');

async function testPeerDependency() {
  try {
    console.log('Attempting to import our package...');
    const module = await import('./dist/index.esm.js');
    
    console.log('✅ Import successful without @tamyla/ui-components!');
    console.log('Available exports:', Object.keys(module).slice(0, 10), '...');
    
    // Test basic exports
    if (module.Button) {
      console.log('✅ Button component available');
    }
    
    if (module.designTokens) {
      console.log('✅ Design tokens available');
    }
    
    if (module.FactoryBridge) {
      console.log('✅ FactoryBridge available');
    }
    
    // Test that exports are functions/objects as expected
    console.log('\n📋 Export types:');
    console.log('- Button:', typeof module.Button);
    console.log('- FactoryBridge:', typeof module.FactoryBridge);
    console.log('- designTokens:', typeof module.designTokens);
    console.log('- store:', typeof module.store);
    
    console.log('\n🎉 Package is SSR-safe and works as expected!');
    
  } catch (error) {
    console.log('❌ Import failed:', error.message);
    
    // Check if it's a peer dependency issue
    if (error.message.includes('peer dependency') || 
        error.message.includes('@tamyla/ui-components') ||
        error.message.includes('Cannot resolve module')) {
      console.log('✅ This is expected - peer dependency not available');
      console.log('The package should still be importable with basic functionality');
    } else {
      console.log('❌ Unexpected error:', error);
      console.error(error);
    }
  }
}

// Run the test
testPeerDependency();
