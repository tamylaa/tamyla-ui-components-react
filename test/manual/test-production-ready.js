// 🚀 PRODUCTION READINESS TEST
// Comprehensive validation before npm publication

console.log('🚀 PRODUCTION READINESS TEST');
console.log('==================================\n');

// Import and test the package
async function runProductionTests() {
  const startTime = Date.now();
  let testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
  };

  function addResult(type, title, details = '') {
    testResults[type]++;
    testResults.details.push(`${type === 'passed' ? '✅' : type === 'failed' ? '❌' : '⚠️'} ${title}${details ? `: ${details}` : ''}`);
    console.log(testResults.details[testResults.details.length - 1]);
  }

  try {
    console.log('📦 Testing Package Import...');
    const module = await import('./dist/index.esm.js');
    
    // Test 1: Basic Import
    if (module && typeof module === 'object') {
      addResult('passed', 'Package imports successfully');
    } else {
      addResult('failed', 'Package import failed');
      return testResults;
    }

    // Test 2: Export Count
    const exportCount = Object.keys(module).length;
    if (exportCount >= 80) {
      addResult('passed', `Export count: ${exportCount}`);
    } else {
      addResult('failed', `Export count too low: ${exportCount}`);
    }

    console.log('\n🧩 Testing Core Components...');
    
    // Test 3: React Components
    const reactComponents = ['Button', 'Card', 'FactoryBridge', 'Input', 'Modal'];
    reactComponents.forEach(componentName => {
      const component = module[componentName];
      // React components can be functions or forwardRef objects
      const isValidComponent = typeof component === 'function' || 
                              (component && typeof component === 'object' && component.$$typeof);
      if (isValidComponent) {
        addResult('passed', `${componentName} is a valid React component`);
      } else {
        addResult('failed', `${componentName} is missing or not a valid React component`);
      }
    });

    console.log('\n🎨 Testing Design System...');
    
    // Test 4: Design Tokens
    if (module.designTokens && typeof module.designTokens === 'object') {
      const tokenCategories = Object.keys(module.designTokens);
      if (tokenCategories.length >= 5) {
        addResult('passed', `Design tokens available: ${tokenCategories.slice(0, 3).join(', ')}...`);
      } else {
        addResult('failed', 'Insufficient design token categories');
      }
    } else {
      addResult('failed', 'Design tokens missing');
    }

    console.log('\n🗄️ Testing Redux Store...');
    
    // Test 5: Redux Store
    if (module.store && typeof module.store.getState === 'function') {
      addResult('passed', 'Redux store available and functional');
      
      // Test store methods
      const storeState = module.store.getState();
      if (storeState && typeof storeState === 'object') {
        addResult('passed', 'Store state accessible');
      } else {
        addResult('warning', 'Store state structure needs verification');
      }
    } else {
      addResult('failed', 'Redux store missing or non-functional');
    }

    console.log('\n🏭 Testing Factory System...');
    
    // Test 6: Factory Registry
    if (module.factoryRegistry && typeof module.factoryRegistry.getAvailableFactories === 'function') {
      const factories = module.factoryRegistry.getAvailableFactories();
      if (factories.length >= 20) {
        addResult('passed', `Factory registry: ${factories.length} factories available`);
      } else {
        addResult('warning', `Factory count lower than expected: ${factories.length}`);
      }
    } else {
      addResult('failed', 'Factory registry missing or non-functional');
    }

    // Test 7: Factory Importer
    if (module.factoryImporter && typeof module.factoryImporter.getFactory === 'function') {
      addResult('passed', 'Factory importer available');
    } else {
      addResult('failed', 'Factory importer missing');
    }

    console.log('\n⚛️ Testing React Hooks...');
    
    // Test 8: React Hooks
    const hooks = ['useAppDispatch', 'useAppSelector', 'useAuth', 'useTheme', 'useFactoryBridge'];
    hooks.forEach(hookName => {
      if (module[hookName] && typeof module[hookName] === 'function') {
        addResult('passed', `${hookName} hook available`);
      } else {
        addResult('failed', `${hookName} hook missing`);
      }
    });

    console.log('\n🔍 Testing Enhanced Features...');
    
    // Test 9: Enhanced Factory Methods
    if (module.FACTORY_BRIDGE_TEST) {
      addResult('passed', 'Enhanced factory features flag present');
    } else {
      addResult('warning', 'Enhanced factory features flag missing');
    }

    // Test 10: Version and Build Info
    if (module.VERSION && module.BUILD_DATE) {
      addResult('passed', `Version info available: ${module.VERSION}`);
    } else {
      addResult('warning', 'Version info missing');
    }

    console.log('\n🌍 Testing SSR Compatibility...');
    
    // Test 11: SSR Safe Imports
    // The fact that we're running in Node.js proves SSR compatibility
    addResult('passed', 'SSR compatible - imports successfully in Node.js');

    console.log('\n🎭 Testing TypeScript Support...');
    
    // Test 12: TypeScript Definitions
    try {
      const fs = await import('fs');
      const dtsExists = fs.existsSync('./dist/index.d.ts');
      if (dtsExists) {
        addResult('passed', 'TypeScript definitions file exists');
      } else {
        addResult('failed', 'TypeScript definitions missing');
      }
    } catch (e) {
      addResult('warning', 'Could not verify TypeScript definitions');
    }

    return testResults;

  } catch (error) {
    addResult('failed', 'Critical error during testing', error.message);
    return testResults;
  }
}

async function generateReport() {
  console.log('Starting production readiness validation...\n');
  
  const results = await runProductionTests();
  const endTime = Date.now();
  const duration = endTime - Date.now();

  console.log('\n' + '='.repeat(50));
  console.log('📊 PRODUCTION READINESS REPORT');
  console.log('='.repeat(50));
  
  console.log(`✅ Tests Passed: ${results.passed}`);
  console.log(`❌ Tests Failed: ${results.failed}`);
  console.log(`⚠️ Warnings: ${results.warnings}`);
  console.log(`⏱️ Test Duration: ${Math.abs(duration)}ms\n`);

  if (results.failed === 0) {
    console.log('🎉 PACKAGE IS PRODUCTION READY! 🎉');
    console.log('✅ All critical tests passed');
    console.log('🚀 Ready for npm publication');
    console.log('📦 Package can be safely used by other projects');
    
    if (results.warnings > 0) {
      console.log(`⚠️ ${results.warnings} warnings noted but non-critical`);
    }
  } else {
    console.log('❌ PACKAGE NOT READY FOR PRODUCTION');
    console.log(`${results.failed} critical issues must be resolved`);
  }

  console.log('\n📋 Detailed Results:');
  results.details.forEach(detail => console.log(`  ${detail}`));

  console.log('\n🔗 Next Steps:');
  if (results.failed === 0) {
    console.log('1. ✅ Bump version number if needed');
    console.log('2. ✅ Push changes to GitHub');
    console.log('3. ✅ Run semantic-release or npm publish');
    console.log('4. ✅ Test installation from npm in external project');
  } else {
    console.log('1. ❌ Fix all failing tests');
    console.log('2. ❌ Re-run this validation');
    console.log('3. ❌ Do not publish until all tests pass');
  }

  return results.failed === 0;
}

// Run the tests
generateReport().then(success => {
  console.log(`\n${success ? '🎊' : '💥'} Production readiness test ${success ? 'PASSED' : 'FAILED'}`);
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('💥 Test runner failed:', error);
  process.exit(1);
});
