// Test only safe exports that shouldn't require @tamyla/ui-components
console.log('Testing SSR-safe exports only...');

async function testSafeExports() {
  try {
    // Test importing just design tokens - this should never require DOM
    console.log('1. Testing design tokens...');
    const { designTokens } = await import('./dist/index.esm.js');
    console.log('✅ Design tokens loaded:', typeof designTokens);
    
    // Test direct string export
    console.log('2. Testing direct exports...');
    const { DIRECT_TEST_EXPORT } = await import('./dist/index.esm.js');
    console.log('✅ Direct export loaded:', DIRECT_TEST_EXPORT);
    
    console.log('\n🎉 SSR-safe exports work correctly!');
    
  } catch (error) {
    console.log('❌ Even safe exports fail:', error.message);
    
    // If even design tokens fail, the problem is module-level execution
    if (error.message.includes('document is not defined')) {
      console.log('\n🔍 DIAGNOSIS: Module-level DOM access detected');
      console.log('The package has code that runs immediately on import');
      console.log('This needs to be made lazy or conditional');
    }
  }
}

testSafeExports();
