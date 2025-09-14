/**
 * @fileoverview Example premium component with license validation
 * @description Demonstrates how to implement license-gated premium features
 */

import React, { useState, useEffect } from 'react';
import {
  checkFeatureAccess,
  requireFeature,
  getLicenseStatus,
  LicenseStatus,
  PREMIUM_FEATURES
} from '../../utils/license-validation';

interface PremiumDashboardProps {
  title?: string;
  children?: React.ReactNode;
}

/**
 * Premium Dashboard Component
 * Requires commercial license to use
 */
export const PremiumDashboard: React.FC<PremiumDashboardProps> = ({
  title = "Premium Dashboard",
  children
}) => {
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check license on component mount
    const checkLicense = () => {
      try {
        // This will throw an error if feature is not licensed
        requireFeature(PREMIUM_FEATURES.ADVANCED_DASHBOARD);

        const status = getLicenseStatus();
        setLicenseStatus(status);
        setHasAccess(true);
      } catch (error) {
        console.warn('Premium feature access denied:', error);
        setHasAccess(false);
        setLicenseStatus(getLicenseStatus());
      } finally {
        setLoading(false);
      }
    };

    checkLicense();
  }, []);

  if (loading) {
    return (
      <div className="premium-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Validating license...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="premium-dashboard-upgrade-prompt">
        <div className="upgrade-header">
          <h2>🚀 Unlock Premium Features</h2>
          <p>This advanced dashboard requires a commercial license.</p>
        </div>

        <div className="license-info">
          <h3>Your Current License</h3>
          <ul>
            <li>License Type: {licenseStatus?.licenseType || 'Free'}</li>
            <li>Features: {licenseStatus?.features?.join(', ') || 'Basic components only'}</li>
            {licenseStatus?.expiryDate && (
              <li>Expires: {licenseStatus.expiryDate.toDateString()}</li>
            )}
          </ul>
        </div>

        <div className="upgrade-options">
          <h3>Upgrade Options</h3>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h4>Developer License</h4>
              <div className="price">$49/month</div>
              <ul>
                <li>Premium Components</li>
                <li>Advanced Theming</li>
                <li>Email Support</li>
                <li>Basic Analytics</li>
              </ul>
              <button className="upgrade-btn">Upgrade Now</button>
            </div>

            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <h4>Team License</h4>
              <div className="price">$149/month</div>
              <ul>
                <li>Everything in Developer</li>
                <li>Team Collaboration</li>
                <li>Priority Support</li>
                <li>Advanced Analytics</li>
              </ul>
              <button className="upgrade-btn primary">Upgrade Now</button>
            </div>

            <div className="pricing-card">
              <h4>Enterprise License</h4>
              <div className="price">$499/month</div>
              <ul>
                <li>Everything in Team</li>
                <li>White-label Rights</li>
                <li>24/7 Support</li>
                <li>Custom Development</li>
              </ul>
              <button className="upgrade-btn">Contact Sales</button>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <p>Questions about licensing?</p>
          <p>
            Email: <a href="mailto:licensing@tamyla.com">licensing@tamyla.com</a> |
            Web: <a href="https://tamyla.com/pricing" target="_blank" rel="noopener noreferrer">tamyla.com/pricing</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-dashboard">
      <header className="dashboard-header">
        <h1>{title}</h1>
        <div className="license-badge">
          <span className="license-type">{licenseStatus?.licenseType}</span>
          {licenseStatus?.expiryDate && (
            <span className="expiry-date">
              Expires: {licenseStatus.expiryDate.toDateString()}
            </span>
          )}
        </div>
      </header>

      <div className="dashboard-content">
          {licenseStatus?.warnings && licenseStatus.warnings.length > 0 && (
            <div className="license-warnings">
              {licenseStatus.warnings.map((warning: string, index: number) => (
                <div key={index} className="warning-banner">
                  ⚠️ {warning}
                </div>
              ))}
            </div>
          )}

        <div className="dashboard-main">
          {children || (
            <div className="default-content">
              <h2>Welcome to Premium Dashboard</h2>
              <p>This is a premium feature with advanced analytics and reporting.</p>

              <div className="feature-grid">
                <div className="feature-card">
                  <h3>📊 Advanced Analytics</h3>
                  <p>Detailed usage metrics and performance insights</p>
                </div>

                <div className="feature-card">
                  <h3>🔒 Security Monitoring</h3>
                  <p>Real-time security alerts and compliance reporting</p>
                </div>

                <div className="feature-card">
                  <h3>🎨 Custom Themes</h3>
                  <p>Advanced theming with unlimited customization</p>
                </div>

                <div className="feature-card">
                  <h3>🚀 Performance Tools</h3>
                  <p>Optimization tools and performance monitoring</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Hook for checking premium feature access
 */
export const usePremiumFeature = (feature: string) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      try {
        const access = checkFeatureAccess(feature);
        setHasAccess(access);
      } catch (error) {
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [feature]);

  return { hasAccess, loading };
};

/**
 * Higher-order component for premium features
 */
export const withPremiumCheck = <P extends object>(
  Component: React.ComponentType<P>,
  feature: string
) => {
  return (props: P) => {
    const { hasAccess, loading } = usePremiumFeature(feature);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!hasAccess) {
      return (
        <div className="premium-required">
          <p>This feature requires a premium license.</p>
          <a href="https://tamyla.com/pricing">Upgrade Now</a>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

// Example usage:
/*
// Basic usage
import { PremiumDashboard } from '@tamyla/ui-components-react/premium';

function MyApp() {
  return (
    <PremiumDashboard title="My Analytics Dashboard">
      <MyAnalyticsContent />
    </PremiumDashboard>
  );
}

// Using the hook
import { usePremiumFeature } from '@tamyla/ui-components-react/premium';

function MyComponent() {
  const { hasAccess } = usePremiumFeature('advanced-dashboard');

  if (!hasAccess) {
    return <UpgradePrompt />;
  }

  return <AdvancedDashboard />;
}

// Using HOC
import { withPremiumCheck } from '@tamyla/ui-components-react/premium';

const PremiumAnalytics = withPremiumCheck(MyAnalyticsComponent, 'advanced-analytics');
*/
