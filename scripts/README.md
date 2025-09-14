Scripts Organization
===================

This folder contains executable scripts used for validation, certification, deployment, and development tooling, organized into logical categories for better maintainability.

## Directory Structure

```
scripts/
├── build/          # Build and compilation scripts
├── dev/            # Development utilities and tools
├── test/           # Testing and validation scripts
├── deploy/         # Deployment and publishing scripts
├── README.md       # This documentation
└── [legacy files]  # Backward compatibility scripts
```

## Script Categories

### Build Scripts (`scripts/build/`)
- `split-registry.js` - Split/combine component registry for atomic design organization

### Development Scripts (`scripts/dev/`)
- `dev-utils.js` - Development utilities for component exploration and debugging

### Test Scripts (`scripts/test/`)
- Testing and validation tools for component coverage and quality assurance

### Deploy Scripts (`scripts/deploy/`)
- Deployment automation and publishing workflows

## Enhanced Scripts

### `check-bundle.js`
**Bundle Certification and Peer Dependency Validation Tool**
- Validates that peer dependencies (styled-components, react, react-dom) are properly externalized
- Prevents runtime errors like "z.div is not a function" caused by bundled dependencies
- Monitors bundle size and provides certification reports
- Automatically runs after build and before publish

**Usage:**
```bash
# Run bundle certification
npm run check:bundle

# Debug bundle imports
npm run debug:bundle

# Verify specific fixes
npm run verify:fix

# Automatically runs after build
npm run build
```

**Related:** See `README-bundle-analysis.md` for comprehensive bundle analysis documentation.

### `verify-bundle-fix.js`
**Bundle Fix Verification Tool**
- Comprehensive verification that "z.div is not a function" error is resolved
- Analyzes styled-components import patterns and variable naming
- Validates bundle externalization and size optimization

### `analyze-bundle-imports.js`
**Bundle Import Analysis Tool**
- Detailed analysis of dependency import patterns in built bundle
- Useful for debugging externalization issues and bundle structure
- Shows exact import statements and variable usage patterns

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

## NPM Script Integration

The scripts are integrated with npm scripts in `package.json`:

```json
{
  "scripts": {
    "registry:split": "node scripts/build/split-registry.js split",
    "registry:combine": "node scripts/build/split-registry.js combine",
    "dev:discover": "node scripts/dev/dev-utils.js discover"
  }
}
```

## Usage Examples

```bash
# Split component registry into atomic design parts
npm run registry:split

# Combine registry parts back into single file
npm run registry:combine

# Discover components by category
npm run dev:discover atom

# Direct script execution
node scripts/dev/dev-utils.js discover molecule
```

## Backward Compatibility

Legacy scripts remain in the root `scripts/` directory for backward compatibility, but new development should use the categorized subdirectories.
