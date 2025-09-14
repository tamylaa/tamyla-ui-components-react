/**
 * @fileoverview License validation utilities for Tamyla UI Components React
 * @description Handles license validation for premium features
 * @version 1.0.0
 */

export interface LicenseInfo {
  type: 'developer' | 'team' | 'enterprise' | 'custom';
  expiry: Date;
  features: string[];
  restrictions?: {
    maxUsers?: number;
    maxDeployments?: number;
    whiteLabel?: boolean;
  };
  metadata?: {
    issued: Date;
    licensee: string;
    licenseKey: string;
  };
}

export interface LicenseValidationResult {
  valid: boolean;
  license?: LicenseInfo;
  error?: string;
  warnings?: string[];
}

/**
 * License validation error class
 */
export class LicenseError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'LicenseError';
  }
}

/**
 * Mock license validation function
 * In production, this would validate against a license server
 */
export function validateLicense(licenseKey: string): LicenseValidationResult {
  // Mock validation - replace with actual license server validation
  if (!licenseKey || licenseKey.length < 10) {
    return {
      valid: false,
      error: 'Invalid license key format'
    };
  }

  // Mock license data - replace with actual license parsing
  const mockLicense: LicenseInfo = {
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

  const warnings: string[] = [];
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

/**
 * Check if a specific feature is available with current license
 */
export function checkFeatureAccess(feature: string, license?: LicenseInfo): boolean {
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

/**
 * Require a feature and throw error if not available
 */
export function requireFeature(feature: string, license?: LicenseInfo): void {
  if (!checkFeatureAccess(feature, license)) {
    const upgradeUrl = 'https://tamyla.com/pricing';
    throw new LicenseError(
      `Feature '${feature}' requires a commercial license. ` +
      `Please upgrade at ${upgradeUrl}`,
      'FEATURE_NOT_LICENSED'
    );
  }
}

/**
 * Get current license from storage/environment
 * In production, this would check localStorage, environment variables, etc.
 */
export function getCurrentLicense(): LicenseInfo | undefined {
  // Mock implementation - replace with actual license retrieval
  const storedLicense = typeof window !== 'undefined' ? localStorage.getItem('tamyla-license-key') : null;
  if (storedLicense) {
    const validation = validateLicense(storedLicense);
    return validation.valid ? validation.license : undefined;
  }

  // Check environment variable
  const envLicense = process.env.TAMYLA_LICENSE_KEY;
  if (envLicense) {
    const validation = validateLicense(envLicense);
    return validation.valid ? validation.license : undefined;
  }

  return undefined;
}

/**
 * License status for UI components
 */
export interface LicenseStatus {
  hasLicense: boolean;
  licenseType?: string;
  expiryDate?: Date;
  features: string[];
  warnings?: string[];
}

/**
 * Get license status for UI display
 */
export function getLicenseStatus(): LicenseStatus {
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

/**
 * Constants for license types and features
 */
export const LICENSE_TYPES = {
  DEVELOPER: 'developer',
  TEAM: 'team',
  ENTERPRISE: 'enterprise',
  CUSTOM: 'custom'
} as const;

export const PREMIUM_FEATURES = {
  ADVANCED_DASHBOARD: 'advanced-dashboard',
  PREMIUM_DATA_TABLE: 'premium-data-table',
  ENTERPRISE_FORM_BUILDER: 'enterprise-form-builder',
  SECURITY_MONITOR: 'security-monitor',
  WHITE_LABEL: 'white-label',
  PRIORITY_SUPPORT: 'priority-support',
  CUSTOM_DEVELOPMENT: 'custom-development'
} as const;

export const FREE_FEATURES = {
  BUTTON: 'button',
  CARD: 'card',
  INPUT: 'input',
  TYPOGRAPHY: 'typography',
  LAYOUT: 'layout',
  DESIGN_TOKENS: 'design-tokens'
} as const;
