# Bundle Analysis Scripts

This directory contains scripts for analyzing and verifying the built bundle to prevent dependency-related runtime errors.

## Scripts Overview

### `check-bundle.js` 🔍
**Primary bundle certification script** - Runs automatically after build and before publish.

```bash
npm run check:bundle
```

**What it does:**
- Validates peer dependency externalization (styled-components, react, react-dom)
- Monitors bundle size (alerts if >300KB)
- Provides pass/fail certification for production readiness
- Prevents "z.div is not a function" errors

### `verify-bundle-fix.js` ✅
**Comprehensive verification script** - Confirms specific fixes are working.

```bash
npm run verify:fix
```

**What it analyzes:**
- Specific styled-components import patterns
- Searches for problematic `z.div` patterns
- Validates bundle size and externalization
- Provides detailed success/failure analysis

### `analyze-bundle-imports.js` 🔬
**Detailed import analysis script** - For deep debugging of bundle structure.

```bash
npm run debug:bundle
```

**What it shows:**
- First 500 characters of bundle (import statements)
- Exact styled-components import pattern
- Variable name analysis
- Usage pattern detection

## Common Issues & Solutions

### ❌ "z.div is not a function" Error

**Symptoms:**
- Runtime error when using styled components
- Bundle size >800KB
- Components fail to render

**Root Cause:**
styled-components bundled instead of externalized

**Solution:**
1. Check `rollup.config.js` external arrays include 'styled-components'
2. Verify `package.json` has styled-components as peerDependency
3. Run `npm run verify:fix` to confirm resolution

### ⚠️ Large Bundle Size

**Symptoms:**
- Bundle >300KB
- Slow load times
- Dependencies included in bundle

**Diagnosis:**
```bash
npm run debug:bundle  # Check import patterns
npm run verify:fix    # Comprehensive analysis
```

**Solution:**
Add missing dependencies to Rollup external configuration

### 🔍 Bundle Certification Failed

**When this happens:**
- Build process stops
- Pre-publish validation fails
- Bundle not ready for production

**Next steps:**
1. Check terminal output for specific failures
2. Run `npm run debug:bundle` for detailed analysis
3. Fix Rollup configuration as needed
4. Re-run `npm run build` to verify

## Integration

These scripts are integrated into the build pipeline:

```bash
npm run build        # Runs check:bundle automatically via postbuild
npm run prepublishOnly  # Includes check:bundle validation
```

## Automation

- **Continuous Integration**: check:bundle runs on every build
- **Pre-publish Safety**: Prevents publishing broken bundles
- **Developer Debugging**: Manual scripts available for troubleshooting

## Related Files

- `rollup.config.js` - Bundle configuration
- `package.json` - Dependency definitions
- `dist/index.esm.js` - Built bundle (analyzed by these scripts)
