Scripts organization
---------------------

This folder contains executable scripts used for validation, certification, deployment, and development tooling.

## Enhanced Scripts

### `fix-typescript-eslint.js`
**TypeScript ESLint Configuration and Fix Tool**
- Comprehensive tool for managing TypeScript and ESLint configurations
- Automated ESLint 9 flat configuration setup
- React hooks dependency fixes and TypeScript optimizations
- Error recovery and rollback capabilities

**Usage:**
```bash
# Apply all fixes
node scripts/fix-typescript-eslint.js

# Preview changes without applying
node scripts/fix-typescript-eslint.js --dry-run

# Restore src folder from git
node scripts/fix-typescript-eslint.js --restore
```

### `react-component-validation.js`
**React Component Coverage Validation Tool**
- Validates all components are properly exported and accessible
- Checks component types and factory bridge functionality
- Provides detailed coverage reports and CI/CD integration
- Generates validation reports for documentation

**Usage:**
```bash
# Basic validation with console output
node scripts/react-component-validation.js

# JSON output for CI/CD pipelines
node scripts/react-component-validation.js --json

# Generate detailed validation report
node scripts/react-component-validation.js --report
```

## Script Categories

- `scripts/*.js` - original scripts. Most are ESM modules and should be invoked directly.
- `scripts/*.cjs` - CommonJS scripts (named `.cjs` to preserve CJS semantics in an ESM package).
- `scripts/esm/*` - convenience ESM wrapper files (re-export the top-level scripts).
- `scripts/cjs/*` - convenience CJS wrappers that require the `.cjs` files.

## Why this layout?
- Keeps the repository backward compatible while making intent explicit.
- CI and contributors can call the wrapper paths to ensure correct module semantics.

## Example usage:

 - ESM: `node scripts/esm/working-certify.js`
 - CJS: `node scripts/cjs/comprehensive-certify.cjs`
 - Enhanced: `node scripts/fix-typescript-eslint.js --dry-run`
 - Validation: `node scripts/react-component-validation.js --json`
