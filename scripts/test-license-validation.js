#!/usr/bin/env node

/**
 * @fileoverview License validation test script
 * @description Tests the license validation system
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');

// Mock localStorage for Node.js environment
global.localStorage = {
  getItem: (key) => process.env[key] || null,
  setItem: (key, value) => { process.env[key] = value; },
  removeItem: (key) => { delete process.env[key]; }
};

// Mock process.env for license key
process.env.TAMYLA_LICENSE_KEY = 'mock-license-key-12345';

console.log('🧪 Testing Tamyla UI Components License Validation\n');

// Test license validation
try {
  const {
    validateLicense,
    checkFeatureAccess,
    requireFeature,
    getLicenseStatus,
    PREMIUM_FEATURES,
    FREE_FEATURES
  } = await import('../dist/index.esm.js');

  console.log('✅ License validation module loaded successfully\n');

  // Test 1: Validate license
  console.log('📋 Test 1: License Validation');
  const validation = validateLicense('mock-license-key-12345');
  console.log('License valid:', validation.valid);
  if (validation.license) {
    console.log('License type:', validation.license.type);
    console.log('Expiry date:', validation.license.expiry.toDateString());
    console.log('Features:', validation.license.features.join(', '));
  }
  if (validation.warnings) {
    console.log('Warnings:', validation.warnings);
  }
  console.log('');

  // Test 2: Check feature access
  console.log('🔍 Test 2: Feature Access Check');
  console.log('Free feature (button):', checkFeatureAccess(FREE_FEATURES.BUTTON));
  console.log('Premium feature (advanced-dashboard):', checkFeatureAccess(PREMIUM_FEATURES.ADVANCED_DASHBOARD, validation.license));
  console.log('');

  // Test 3: Require feature (should not throw)
  console.log('⚡ Test 3: Require Feature (Free)');
  try {
    requireFeature(FREE_FEATURES.BUTTON);
    console.log('✅ Free feature access granted');
  } catch (error) {
    console.log('❌ Free feature access denied:', error.message);
  }
  console.log('');

  // Test 4: Require premium feature (should throw)
  console.log('💎 Test 4: Require Premium Feature');
  try {
    requireFeature(PREMIUM_FEATURES.ADVANCED_DASHBOARD);
    console.log('✅ Premium feature access granted');
  } catch (error) {
    console.log('❌ Premium feature access denied:', error.message);
  }
  console.log('');

  // Test 5: Get license status
  console.log('📊 Test 5: License Status');
  const status = getLicenseStatus();
  console.log('Has license:', status.hasLicense);
  console.log('License type:', status.licenseType || 'None');
  console.log('Available features:', status.features.join(', '));
  if (status.warnings) {
    console.log('Warnings:', status.warnings);
  }
  console.log('');

  console.log('🎉 All license validation tests completed!');

} catch (error) {
  console.error('❌ License validation test failed:', error.message);
  process.exit(1);
}
