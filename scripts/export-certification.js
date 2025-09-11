#!/usr/bin/env node

/**
 * EXPORT VALIDATION CERTIFICATION SCRIPT
 * Validates that all expected exports are present in the built package
 * Prevents tree-shaking regressions and ensures enterprise features are preserved
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

class ExportCertification {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
    this.builtContent = '';
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type] || 'ℹ️';

    console.log(`${prefix} ${message}`);
  }

  /**
   * Load the built package content
   */
  loadBuiltPackage() {
    const builtFilePath = path.join(projectRoot, 'dist', 'index.esm.js');

    if (!fs.existsSync(builtFilePath)) {
      this.errors.push('Built package not found. Run "npm run build" first.');
      return false;
    }

    try {
      this.builtContent = fs.readFileSync(builtFilePath, 'utf8');
      this.successes.push('Built package loaded successfully');
      return true;
    } catch (error) {
      this.errors.push(`Failed to read built package: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if an export exists in the built content
   */
  checkExport(exportName) {
    // Check various export patterns
    const patterns = [
      `, ${exportName},`,
      `${exportName},`,
      `, ${exportName} `,
      `export {.*${exportName}.*}`,
      `export const ${exportName}`,
      `export function ${exportName}`,
      `export class ${exportName}`
    ];

    return patterns.some(pattern => {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      return regex.test(this.builtContent);
    });
  }

  /**
   * Validate all expected exports
   */
  validateExports() {
    const exportCategories = {
      // Core Components (16 expected)
      components: [
        'Button', 'Input', 'Card', 'CardHeader', 'CardTitle', 'CardContent',
        'StatusIndicator', 'ErrorBoundary', 'ButtonPrimary', 'ButtonSecondary',
        'ButtonGhost', 'ButtonDanger', 'ButtonSuccess', 'ButtonWithIcon',
        'ButtonIconOnly', 'InputGroup'
      ],

      // Form Components (14 expected)
      forms: [
        'FormItem', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage',
        'FormField', 'FormInput', 'FormTextarea', 'Select', 'Checkbox',
        'RadioGroup', 'RadioGroupItem', 'Switch', 'Slider'
      ],

      // Feedback Components (6 expected)
      feedback: [
        'Alert', 'AlertTitle', 'AlertDescription', 'Progress', 'Badge', 'Avatar'
      ],

      // Data Display (9 expected)
      dataDisplay: [
        'Table', 'TableHeader', 'TableBody', 'TableFooter', 'TableHead',
        'TableRow', 'TableCell', 'TableCaption', 'Calendar'
      ],

      // Loading/Interaction (7 expected)
      loading: [
        'Skeleton', 'HoverCard', 'HoverCardTrigger', 'HoverCardContent',
        'Popover', 'PopoverTrigger', 'PopoverContent'
      ],

      // Molecules (Factory) (6 expected)
      molecules: [
        'ActionCard', 'ContentCard', 'FileList', 'Notification',
        'SearchBar', 'SearchBarNew'
      ],

      // Organisms (13 expected)
      organisms: [
        'Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle',
        'DialogDescription', 'DialogFooter', 'DialogClose', 'Navigation',
        'NavigationMenu', 'NavigationMenuItem', 'NavigationMenuTrigger',
        'NavigationMenuContent'
      ],

      // Organisms (Factory) (9 expected)
      organismsFactory: [
        'Dashboard', 'DashboardSearch', 'DashboardContent', 'DashboardKnowledge',
        'DashboardMedia', 'SearchInterface', 'Reward', 'Modal', 'MobileSidebar'
      ],

      // Applications (3 expected)
      applications: [
        'CampaignSelector', 'ContentManager', 'EnhancedSearch'
      ],

      // Redux Store (12 expected)
      redux: [
        'store', 'persistor', 'authActions', 'uiActions', 'themeActions', 'componentActions',
        'reduxStore', 'reduxPersistor', 'reduxAuthActions', 'reduxUiActions',
        'reduxThemeActions', 'reduxComponentActions'
      ],

      // Hooks (10 expected)
      hooks: [
        'useAppDispatch', 'useAppSelector', 'useAuth', 'useUI', 'useTheme',
        'useComponent', 'useResponsive', 'useSearch', 'useLoading', 'useNotifications'
      ],

      // Redux Optional (8 expected)
      reduxOptional: [
        'useAppDispatchOptional', 'useAppSelectorOptional', 'useThemeOptional',
        'useUIOptional', 'useAnalyticsOptional', 'ThemeProvider', 'UIProvider', 'hasRedux'
      ],

      // Performance Utils (8 expected)
      performance: [
        'smartMemo', 'autoMemo', 'heavyMemo', 'createLazyComponent', 'batchLazy',
        'MEMOIZATION_CONFIG', 'LAZY_LOADING_CONFIG', 'MONITORING_CONFIG'
      ],

      // Loading Components (4 expected)
      loadingComponents: [
        'LoadingSpinner', 'LoadingDashboard', 'LoadingSearch', 'LoadingManager'
      ],

      // Infrastructure (7 expected)
      infrastructure: [
        'designTokens', 'TamylaThemeProvider', 'GlobalStyles', 'useTamylaTheme',
        'VERSION', 'BUILD_DATE', 'FEATURES'
      ],

      // ENTERPRISE-GRADE UTILITIES (6 expected)
      enterprise: [
        'safeAsync', 'safeFetch', 'safeDynamicImport', 'sanitizeHTML',
        'safeSetInnerHTML', 'safeCreateElementFromHTML', 'dynamicImportUIComponents',
        'FactoryHealthMonitor', 'Logger', 'LogLevel'
      ]
    };

    let totalExpected = 0;
    let totalFound = 0;

    Object.entries(exportCategories).forEach(([category, exports]) => {
      this.log(`\n🔍 Validating ${category.toUpperCase()} (${exports.length} expected)`, 'info');
      let foundInCategory = 0;

      exports.forEach(exportName => {
        totalExpected++;
        if (this.checkExport(exportName)) {
          foundInCategory++;
          totalFound++;
          this.log(`  ✓ ${exportName}`, 'success');
        } else {
          this.errors.push(`Missing export: ${exportName} (category: ${category})`);
          this.log(`  ✗ ${exportName}`, 'error');
        }
      });

      this.log(`  📊 ${category}: ${foundInCategory}/${exports.length} found`, 'info');
    });

    return { totalExpected, totalFound };
  }

  /**
   * Validate bundle size is reasonable
   */
  validateBundleSize() {
    const builtFilePath = path.join(projectRoot, 'dist', 'index.esm.js');
    const stats = fs.statSync(builtFilePath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    this.log(`\n📦 Bundle Size: ${sizeKB}KB`, 'info');

    // Expected size range (reasonable for enterprise library)
    const minSize = 200; // 200KB minimum (should have substantial content)
    const maxSize = 500; // 500KB maximum (shouldn't be bloated)

    if (stats.size < minSize * 1024) {
      this.warnings.push(`Bundle size (${sizeKB}KB) is suspiciously small. Expected > ${minSize}KB`);
    } else if (stats.size > maxSize * 1024) {
      this.warnings.push(`Bundle size (${sizeKB}KB) is very large. Consider optimization if > ${maxSize}KB`);
    } else {
      this.successes.push(`Bundle size (${sizeKB}KB) is within expected range`);
    }
  }

  /**
   * Run the complete certification
   */
  async run() {
    console.log('🚀 EXPORT CERTIFICATION STARTING');
    console.log('=====================================');
    console.log('📁 File Organization:');
    console.log('  • Test files: test/integration/');
    console.log('  • Documentation: docs/reports/');
    console.log('  • Configuration: config/');
    console.log('  • Logs: logs/');
    console.log('  • Scripts: scripts/');
    console.log('');

    // Load built package
    if (!this.loadBuiltPackage()) {
      this.log('\n❌ Certification failed: Cannot load built package', 'error');
      return false;
    }

    // Validate bundle size
    this.validateBundleSize();

    // Validate exports
    const { totalExpected, totalFound } = this.validateExports();

    // Summary
    console.log('\n📈 CERTIFICATION SUMMARY');
    console.log('========================');
    this.log(`Total exports found: ${totalFound}/${totalExpected}`, 'info');
    this.log(`Success rate: ${Math.round((totalFound/totalExpected) * 100)}%`, 'info');

    // Results
    if (this.errors.length === 0) {
      this.log('\n🎉 CERTIFICATION PASSED: All exports are present!', 'success');
      this.successes.forEach(success => this.log(`✓ ${success}`, 'success'));
    } else {
      this.log('\n❌ CERTIFICATION FAILED: Missing exports detected', 'error');
      this.errors.forEach(error => this.log(`✗ ${error}`, 'error'));
    }

    if (this.warnings.length > 0) {
      this.log('\n⚠️ WARNINGS:', 'warning');
      this.warnings.forEach(warning => this.log(`! ${warning}`, 'warning'));
    }

    return this.errors.length === 0;
  }
}

// Run certification if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const certification = new ExportCertification();
  certification.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('❌ Certification error:', error);
    process.exit(1);
  });
}

export default ExportCertification;
