# Tamyla UI Components React - Commercial License Agreement

**Version:** 1.0.0
**Effective Date:** September 11, 2025
**License Type:** Commercial Use License

---

## 📋 License Overview

This Commercial License Agreement ("Agreement") governs the use of premium features and enterprise capabilities of the Tamyla UI Components React library ("Software") by Tamyla Inc. ("Licensor").

### 🎯 License Scope

#### ✅ Permitted Use
- ✅ Commercial use and distribution
- ✅ Modification and customization
- ✅ Integration into proprietary software
- ✅ White-label redistribution
- ✅ Enterprise deployment and scaling

#### ❌ Prohibited Use
- ❌ Reverse engineering or decompilation
- ❌ Removal of copyright notices
- ❌ Distribution of source code
- ❌ Creation of competing products
- ❌ Use without valid license

---

## 💰 License Types & Pricing

### 1. Developer License ($49/month)
```
✅ Premium Components (20+ advanced components)
✅ Advanced Theming System
✅ Email Support (48h response)
✅ Basic Analytics Dashboard
✅ Standard Security Features
❌ White-label Rights
❌ Priority Support
❌ Custom Development
```

### 2. Team License ($149/month)
```
✅ Everything in Developer License
✅ Team Collaboration Tools
✅ Priority Support (24h response)
✅ Design System Templates
✅ Advanced Analytics
✅ API Access (1000 requests/day)
❌ White-label Rights
❌ Phone Support
```

### 3. Enterprise License ($499/month)
```
✅ Everything in Team License
✅ White-label Rights
✅ 24/7 Phone Support
✅ Custom Component Development (20 hours/month)
✅ Dedicated Account Manager
✅ On-premise Deployment
✅ Enterprise SLA (99.9% uptime)
✅ Advanced Security Features
✅ Audit Logs & Compliance Reports
```

### 4. Custom Enterprise License (Contact Sales)
```
✅ Tailored feature set
✅ Unlimited usage
✅ Custom development hours
✅ On-site consulting
✅ Training programs
✅ Multi-year agreements
✅ Volume discounts
```

---

## 🔐 License Validation & Enforcement

### License Key System
```typescript
// Example license validation
interface LicenseInfo {
  type: 'developer' | 'team' | 'enterprise' | 'custom';
  expiry: Date;
  features: string[];
  restrictions: {
    maxUsers?: number;
    maxDeployments?: number;
    whiteLabel: boolean;
  };
}

// Validation function
function validateLicense(key: string): LicenseInfo {
  // Implementation handles license verification
  // Checks expiry, feature access, usage limits
}
```

### Usage Monitoring
- **Automated Reporting:** License usage tracked and reported
- **Compliance Alerts:** Notifications for license violations
- **Audit Trail:** Complete usage history maintained
- **Grace Period:** 30-day warning before license suspension

---

## 🛡️ Premium Features & Access Control

### Feature Tiers

#### Core Features (MIT License - Free)
```typescript
// Always available - no license required
import { Button, Card, Input } from '@tamyla/ui-components-react';
import { designTokens } from '@tamyla/ui-components-react';
```

#### Premium Features (Commercial License Required)
```typescript
// Requires valid commercial license
import {
  AdvancedDashboard,
  PremiumDataTable,
  EnterpriseFormBuilder,
  SecurityMonitor
} from '@tamyla/ui-components-react/premium';

// Feature flags automatically check license
const canUsePremium = checkLicenseStatus();
if (canUsePremium) {
  // Load premium components
} else {
  // Show upgrade prompt
}
```

### Access Control Implementation
```typescript
// Automatic license checking
const licenseManager = {
  checkFeature(feature: string): boolean {
    const license = getCurrentLicense();
    return license.features.includes(feature);
  },

  requireFeature(feature: string): void {
    if (!this.checkFeature(feature)) {
      throw new LicenseError(
        `Feature '${feature}' requires a commercial license. ` +
        `Please upgrade at https://tamyla.com/pricing`
      );
    }
  }
};
```

---

## 📜 Terms & Conditions

### 1. Grant of License
Subject to the terms and conditions of this Agreement, Licensor hereby grants Licensee a limited, non-exclusive, non-transferable license to use the Software for the purposes specified in the applicable License Type.

### 2. Intellectual Property Rights
- **Licensor retains** all intellectual property rights
- **Licensee receives** usage rights only
- **No ownership transfer** of any kind
- **Trademark protection** applies to all branding

### 3. Confidentiality
Licensee agrees to maintain the confidentiality of:
- Premium feature implementations
- Security protocols and methods
- Proprietary algorithms and processes
- License validation mechanisms

### 4. Support & Maintenance
- **Priority Support:** Based on license tier
- **Security Updates:** Included for active licenses
- **Bug Fixes:** Priority based on severity
- **Feature Requests:** Considered for roadmap

### 5. Warranty & Liability
```plaintext
WARRANTY: Software provided "AS IS" without warranty of any kind
LIABILITY: Licensor's total liability limited to license fees paid
INDEMNIFICATION: Licensee indemnifies Licensor for third-party claims
```

### 6. Termination
- **Automatic termination** upon license expiry
- **Immediate termination** for license violations
- **Data retention** for 30 days post-termination
- **No refunds** for early termination

---

## 💳 Payment & Billing

### Payment Terms
- **Billing Cycle:** Monthly or Annual (15% discount)
- **Payment Method:** Credit card, ACH, wire transfer
- **Currency:** USD (other currencies available)
- **Taxes:** Licensee responsible for applicable taxes

### Late Payment
- **Grace Period:** 15 days
- **Late Fee:** 1.5% per month
- **Service Suspension:** After 30 days
- **Account Termination:** After 60 days

### Refunds
- **Money-back guarantee:** 30 days for new licenses
- **Pro-rated refunds:** For license downgrades
- **No refunds:** For license violations or terminations

---

## 🔄 License Management

### Self-Service Portal
- **License Activation:** Automatic upon purchase
- **Usage Monitoring:** Real-time dashboard
- **Billing Management:** Update payment methods
- **License Upgrades:** Seamless tier changes

### Enterprise Features
- **Bulk Licensing:** Volume discounts available
- **Custom Terms:** Negotiated for large deployments
- **On-premise Options:** Available for Enterprise tier
- **White-label Support:** Custom branding assistance

---

## 📞 Support & Contact

### Support Channels
```
├── Email: support@tamyla.com
├── Phone: 1-800-TAMYLA (Enterprise only)
├── Chat: In-app support portal
├── Portal: https://portal.tamyla.com
└── Documentation: https://docs.tamyla.com
```

### Response Times
```
├── Developer Tier: 48 hours
├── Team Tier: 24 hours
├── Enterprise Tier: 4 hours (business days)
└── Critical Issues: 1 hour (24/7)
```

---

## 📋 Compliance & Legal

### Data Protection
- **GDPR Compliant:** EU data protection standards
- **CCPA Compliant:** California privacy laws
- **SOC 2 Certified:** Security & availability standards
- **ISO 27001:** Information security management

### Export Controls
- **ECCN Classification:** 5A991 (Software)
- **Country Restrictions:** None (global availability)
- **Encryption Compliance:** FIPS 140-2 compliant

### Audit Rights
- **Annual Audits:** Licensor may audit usage annually
- **Notice Required:** 30 days advance notice
- **Cooperation Required:** Licensee must provide access
- **Audit Costs:** Split between parties

---

## 🔄 Updates & Modifications

### License Updates
- **Automatic Updates:** Terms may be updated with 30-day notice
- **Material Changes:** Require explicit consent
- **Version Control:** All changes tracked and documented
- **Legacy Support:** Previous versions remain accessible

### Software Updates
- **Automatic Updates:** Security patches and bug fixes
- **Major Versions:** May require license upgrades
- **Deprecation Notices:** 6 months for breaking changes
- **Extended Support:** Available for Enterprise customers

---

## 📞 Contact Information

**Tamyla Inc.**
**Commercial Licensing Department**
Email: licensing@tamyla.com
Phone: 1-800-TAMYLA
Web: https://tamyla.com/licensing

**Legal Department**
Email: legal@tamyla.com

**Sales Department**
Email: sales@tamyla.com
Phone: 1-800-TAMYLA-SALES

---

## ✅ Acceptance

By purchasing and/or using a commercial license for Tamyla UI Components React, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this Commercial License Agreement.

**Last Updated:** September 11, 2025
**Version:** 1.0.0

---

*This commercial license agreement is legally binding. Please consult with legal counsel before proceeding with commercial use.*
