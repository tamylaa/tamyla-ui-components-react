import { store, persistor, authActions, uiActions, themeActions, componentActions } from './dist/index.esm.js';

console.log('✅ Redux exports are now available!');
console.log('Store:', typeof store);
console.log('Persistor:', typeof persistor);
console.log('Auth Actions:', typeof authActions);
console.log('UI Actions:', typeof uiActions);
console.log('Theme Actions:', typeof themeActions);
console.log('Component Actions:', typeof componentActions);

// Test that we can access the exports
if (store && authActions && uiActions && themeActions && componentActions) {
  console.log('🎉 All Redux exports are working correctly!');
} else {
  console.log('❌ Some exports are missing');
}
