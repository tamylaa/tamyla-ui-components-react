#!/usr/bin/env node

/**
 * @fileoverview Simple license validation test
 * @description Tests license validation logic without full component imports
 */

// Mock localStorage for Node.js environment
global.localStorage = {
  getItem: (key) => process.env[key] || null,
  setItem: (key, value) => { process.env[key] = value; },
  removeItem: (key) => { delete process.env[key]; }
};

// Mock process.env for license key
process.env.TAMYLA_LICENSE_KEY = 'mock-license-key-12345';

console.log('🧪 Testing Tamyla UI Components License Validation (Standalone)\n');

// Test license validation logic directly
function validateLicense(licenseKey) {
  // Mock validation - replace with actual license server validation
  if (!licenseKey || licenseKey.length < 10) {
    return {
      valid: false,
      error: 'Invalid license key format'
    };
  }

  // Mock license data
  const mockLicense = {
    type: 'developer',
    expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    features: [
      'premium-components',
      'advanced-theming',
      'email-support',
      'basic-analytics'
    ],
    restrictions: {
      maxUsers: 5,
      whiteLabel: false
    },
    metadata: {
      issued: new Date(),
      licensee: 'Mock Licensee',
      licenseKey: licenseKey
    }
  };

  const warnings = [];
  if (mockLicense.expiry < new Date()) {
    return {
      valid: false,
      error: 'License has expired',
      license: mockLicense
    };
  }

  // Check if expiry is within 30 days
  const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  if (mockLicense.expiry < thirtyDaysFromNow) {
    warnings.push(`License expires on ${mockLicense.expiry.toDateString()}`);
  }

  return {
    valid: true,
    license: mockLicense,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

function checkFeatureAccess(feature, license) {
  if (!license) {
    // Free features that don't require a license
    const freeFeatures = [
      'button',
      'card',
      'input',
      'typography',
      'layout',
      'design-tokens'
    ];
    return freeFeatures.includes(feature.toLowerCase());
  }

  return license.features.includes(feature.toLowerCase());
}

function requireFeature(feature, license) {
  if (!checkFeatureAccess(feature, license)) {
    const upgradeUrl = 'https://tamyla.com/pricing';
    throw new Error(
      `Feature '${feature}' requires a commercial license. ` +
      `Please upgrade at ${upgradeUrl}`
    );
  }
}

function getLicenseStatus() {
  const license = getCurrentLicense();
  if (!license) {
    return {
      hasLicense: false,
      features: [
        'button',
        'card',
        'input',
        'typography',
        'layout',
        'design-tokens'
      ]
    };
  }

  const validation = validateLicense(license.metadata?.licenseKey || '');

  return {
    hasLicense: true,
    licenseType: license.type,
    expiryDate: license.expiry,
    features: license.features,
    warnings: validation.warnings
  };
}

function getCurrentLicense() {
  // Check environment variable
  const envLicense = process.env.TAMYLA_LICENSE_KEY;
  if (envLicense) {
    const validation = validateLicense(envLicense);
    return validation.valid ? validation.license : undefined;
  }

  return undefined;
}

try {
  console.log('✅ License validation functions defined\n');

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
  console.log('Free feature (button):', checkFeatureAccess('button'));
  console.log('Premium feature (advanced-dashboard):', checkFeatureAccess('advanced-dashboard', validation.license));
  console.log('');

  // Test 3: Require feature (should not throw)
  console.log('⚡ Test 3: Require Feature (Free)');
  try {
    requireFeature('button');
    console.log('✅ Free feature access granted');
  } catch (error) {
    console.log('❌ Free feature access denied:', error.message);
  }
  console.log('');

  // Test 4: Require premium feature (should throw)
  console.log('💎 Test 4: Require Premium Feature');
  try {
    requireFeature('advanced-dashboard');
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

  console.log('🎉 All license validation tests completed successfully!');

} catch (error) {
  console.error('❌ License validation test failed:', error.message);
  process.exit(1);
}
