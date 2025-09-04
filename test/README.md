# Test Organization - React Components

This directory contains all test files for the React components package, organized by category for better maintainability and clarity.

## Directory Structure

### `demos/`
Interactive demo and visual test files:
- `test-native-approach.html` - Native component approach demonstration

### `factory/`
Factory system and bridge-related tests:
- `test-comprehensive-factory.tsx` - Comprehensive factory testing
- `test-factory-bridge.tsx` - Factory bridge functionality tests
- `test-fixed-factory-bridge.tsx` - Fixed factory bridge tests
- `test-standardized-factories.js` - Standardized factory tests

### `integration/`
Integration test files that test component interactions:
- `test-vanilla-integration.js` - Vanilla component integration tests
- `test-peer-comprehensive.js` - Comprehensive peer dependency tests
- `test-peer-dependency.js` - Peer dependency validation tests

### `unit/`
Unit test files for individual component testing:
- `test-simple.js` - Simple component tests
- `test-final.js` - Final validation tests
- `test-import.js` - Import/export tests
- `test-native-components.tsx` - Native React component tests

### `validation/`
Validation and export-related tests:
- `test-final-validation.test.js` - Final validation test suite
- `test-export-isolation.js` - Export isolation tests
- `test-safe-exports.js` - Safe export validation tests
- `test-file-structure.js` - File structure validation tests

### `debug/`
Debug and troubleshooting test files:
- `test-modal-debug.js` - Modal component debugging tests
- `test-organized-bridge.js` - Bridge organization tests
- `test-organized-structure.js` - Structure organization tests

### `manual/`
Manual and CI-related test files:
- `test-ci-eslint.js` - CI ESLint validation tests
- `test-production-ready.js` - Production readiness tests

## Usage

### Running Factory Tests
Execute the files in the `factory/` directory to test the factory system and bridges:
```bash
node test/factory/test-comprehensive-factory.tsx
```

### Running Integration Tests
Use the files in the `integration/` directory for component interaction testing:
```bash
node test/integration/test-vanilla-integration.js
```

### Running Unit Tests
Execute the files in the `unit/` directory for isolated component testing:
```bash
node test/unit/test-simple.js
```

### Running Validation Tests
Use the files in the `validation/` directory for export and structure validation:
```bash
node test/validation/test-safe-exports.js
```

### Running Debug Tests
Execute the files in the `debug/` directory for troubleshooting:
```bash
node test/debug/test-modal-debug.js
```

### Running Manual Tests
Use the files in the `manual/` directory for CI and production validation:
```bash
node test/manual/test-production-ready.js
```

### Running Demo Tests
Open the HTML files in the `demos/` directory in a web browser for visual testing.

## Test Categories

### Factory Tests
- Focus on factory system functionality
- Bridge component testing
- Factory standardization validation

### Integration Tests
- Component interaction testing
- Peer dependency validation
- Cross-component functionality

### Unit Tests
- Individual component testing
- Import/export validation
- Basic functionality verification

### Validation Tests
- Export safety testing
- File structure validation
- Final validation suites

### Debug Tests
- Troubleshooting specific issues
- Bridge organization testing
- Modal debugging

### Manual Tests
- CI pipeline validation
- Production readiness checks
- ESLint compatibility testing

## Adding New Tests

When adding new test files, please follow this organization:

- **Factory tests** → `factory/` directory
- **Integration tests** → `integration/` directory
- **Unit tests** → `unit/` directory
- **Validation tests** → `validation/` directory
- **Debug tests** → `debug/` directory
- **Manual/CI tests** → `manual/` directory
- **Demo files** → `demos/` directory

## Jest Test Suite

The main Jest test suite is located in `src/__tests__/` and follows the standard Jest structure. These organized test files complement the Jest suite with additional validation and integration testing.

## File Naming Convention

- Use descriptive names that indicate the test purpose
- Include the component or system being tested
- Use appropriate file extensions (.js, .ts, .tsx, .html)
- Follow kebab-case naming convention

This organization ensures a clean, maintainable test suite that scales with the React components package development.
