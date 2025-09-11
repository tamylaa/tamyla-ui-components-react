// Test importing Redux exports from the built package
import { store, persistor, authActions, uiActions, themeActions, componentActions } from './dist/index.esm.js';

console.log('Testing Redux imports from built package...\n');

// Test that the exports are defined
const tests = [
  { name: 'store', value: store },
  { name: 'persistor', value: persistor },
  { name: 'authActions', value: authActions },
  { name: 'uiActions', value: uiActions },
  { name: 'themeActions', value: themeActions },
  { name: 'componentActions', value: componentActions }
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
  if (test.value !== undefined && test.value !== null) {
    console.log(`✓ ${test.name} is properly exported`);
    passed++;
  } else {
    console.log(`✗ ${test.name} is undefined or null`);
    failed++;
  }
});

console.log(`\nResults:`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed === 0) {
  console.log('\n🎉 SUCCESS: All Redux exports can be imported successfully!');
  process.exit(0);
} else {
  console.log('\n❌ FAILURE: Some Redux exports failed to import.');
  process.exit(1);
}
