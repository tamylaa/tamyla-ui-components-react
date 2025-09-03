// Test specific exports to isolate the problematic import
console.log('Testing individual exports...');

const testExport = async (exportName, importPath) => {
  try {
    console.log(`Testing ${exportName}...`);
    const module = await import(importPath);
    const exportValue = module[exportName];
    
    if (exportValue !== undefined) {
      console.log(`✅ ${exportName} imported successfully`);
      console.log(`   Type: ${typeof exportValue}`);
      if (typeof exportValue === 'function') {
        console.log(`   Constructor: ${exportValue.name}`);
      }
      return true;
    } else {
      console.log(`❌ ${exportName} is undefined`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${exportName} failed:`, error.message);
    return false;
  }
};

async function runTests() {
  console.log('=== Testing Core Exports ===');
  await testExport('designTokens', './dist/index.esm.js');
  await testExport('Button', './dist/index.esm.js');
  await testExport('DIRECT_TEST_EXPORT', './dist/index.esm.js');
  
  console.log('\n=== Testing Factory Exports ===');
  await testExport('FactoryBridge', './dist/index.esm.js');
  await testExport('TEST_EXPORT', './dist/index.esm.js');
  
  console.log('\n=== Testing Store Exports ===');
  await testExport('store', './dist/index.esm.js');
  
  console.log('\n=== Testing Full Import ===');
  await testExport('*', './dist/index.esm.js');
}

runTests().catch(error => {
  console.log('Test execution failed:', error.message);
});
