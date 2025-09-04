# Pre-Production Validation Workflow

A comprehensive, automated workflow system that orchestrates all testing, validation, and quality assurance steps required before committing changes to production.

## Overview

The Pre-Production Workflow ensures that all changes meet production standards by running through multiple validation layers, from code quality checks to integration testing and manual review processes.

## Features

- **Automated Pipeline**: Orchestrates all validation steps in the correct order
- **Release-Type Aware**: Different validation levels for patch, minor, and major releases
- **Comprehensive Reporting**: Detailed execution reports with timestamps and results
- **Manual Checkpoints**: Built-in review points for critical changes
- **Error Recovery**: Graceful handling of failures with rollback capabilities
- **CI/CD Integration**: JSON output for automated pipeline integration

## Quick Start

```bash
# For bug fixes and patches
npm run preprod:patch

# For new features
npm run preprod:minor

# For breaking changes
npm run preprod:major

# Custom validation workflow
npm run preprod:custom
```

## Workflow Steps

### 1. Setup (`setup`)
- Validates project structure
- Ensures dependencies are installed
- Creates temporary directories for reports

### 2. Code Quality (`code-quality`)
- TypeScript/ESLint validation
- Code linting and formatting checks
- Type compilation verification

### 3. Testing (`testing`)
- Unit tests execution
- Integration tests
- Component validation
- End-to-end tests (for major releases)

### 4. Validation (`validation`)
- Component coverage analysis
- Export validation
- Dependency checks

### 5. Build (`build`)
- Production build generation
- Artifact verification
- Bundle size validation

### 6. Integration (`integration`)
- ESM import testing
- Package export validation
- Cross-platform compatibility

### 7. Documentation (`documentation`)
- README validation
- API documentation checks
- Change log verification

### 8. Security (`security`)
- NPM audit scanning
- Lockfile security validation
- Vulnerability assessment

### 9. Performance (`performance`)
- Build size monitoring
- Import performance testing
- Bundle optimization checks

### 10. Manual Review (`manual-review`)
- Code review checklist
- Breaking change assessment
- Migration guide preparation

### 11. Final Check (`final-check`)
- Git status verification
- Production readiness assessment
- Summary report generation

## Release Types

### Patch Release
- **Purpose**: Bug fixes, security patches, documentation updates
- **Skipped Steps**: Performance tests, manual review
- **Required Tests**: Unit, integration
- **Build Required**: Yes
- **Docs Update**: No

### Minor Release
- **Purpose**: New features, enhancements
- **Skipped Steps**: Performance tests
- **Required Tests**: Unit, integration, validation
- **Build Required**: Yes
- **Docs Update**: Yes

### Major Release
- **Purpose**: Breaking changes, major rewrites
- **Skipped Steps**: None
- **Required Tests**: Unit, integration, validation, e2e
- **Build Required**: Yes
- **Docs Update**: Yes

## Command Line Options

```bash
# Dry run mode (shows what would be executed)
npm run preprod:patch -- --dry-run

# Verbose output
npm run preprod:minor -- --verbose

# Skip manual review steps
npm run preprod:major -- --skip-manual

# Combine options
npm run preprod:custom -- --dry-run --verbose --skip-manual
```

## Output and Reports

### Console Output
The workflow provides real-time feedback with:
- ✅ Success indicators
- ❌ Error messages
- ⚠️ Warnings
- 🔄 Step progress indicators

### Generated Files
- `temp/preprod-report-[type]-[timestamp].json`: Detailed execution report
- `temp/preprod-summary.json`: Production readiness summary
- `temp/validation-results.json`: Component validation results

### Report Structure
```json
{
  "timestamp": "2025-09-04T10:30:00.000Z",
  "releaseType": "minor",
  "steps": {
    "setup": {
      "executed": true,
      "success": true,
      "duration": 1250,
      "timestamp": "2025-09-04T10:30:01.000Z"
    }
  },
  "summary": {
    "total": 11,
    "passed": 10,
    "failed": 1,
    "skipped": 0
  },
  "duration": 45230
}
```

## Integration with Existing Tools

The workflow leverages all existing validation tools:

- **TypeScript/ESLint**: `scripts/fix-typescript-eslint.js`
- **Component Validation**: `scripts/react-component-validation.js`
- **Test Suites**: Jest test configurations
- **Build Process**: Rollup/npm build scripts

## Manual Review Checklist

When manual review is required, ensure:

- [ ] Code changes reviewed and approved
- [ ] Breaking changes documented
- [ ] Migration guide prepared (if needed)
- [ ] Performance impact assessed
- [ ] Security implications reviewed
- [ ] Documentation updated
- [ ] Tests added/updated

## Error Handling and Recovery

### Automatic Recovery
- Failed steps are logged with detailed error messages
- Non-critical failures can be configured to continue
- Temporary files are cleaned up on failure

### Manual Recovery
```bash
# Resume from specific step
npm run preprod:custom -- --resume-from=testing

# Force continue despite failures
npm run preprod:major -- --continue-on-error
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Pre-Production Validation
  run: npm run preprod:${{ github.event.inputs.releaseType }}

- name: Upload Reports
  uses: actions/upload-artifact@v3
  with:
    name: preprod-reports
    path: temp/
```

### Jenkins Pipeline Example
```groovy
stage('Pre-Production Validation') {
    steps {
        sh 'npm run preprod:minor'
    }
    post {
        always {
            archiveArtifacts artifacts: 'temp/*.json', allowEmptyArchive: true
        }
    }
}
```

## Customization

### Adding Custom Steps
Edit `scripts/preprod-workflow.js` to add new validation steps:

```javascript
async function executeCustomStep() {
  // Your custom validation logic
  return { success: true };
}
```

### Modifying Step Configuration
Update the `workflowConfig` object to customize step execution per release type.

## Troubleshooting

### Common Issues

**"Not in project root"**
- Ensure you're running from the package root directory
- Check that `package.json` exists

**"Build artifacts missing"**
- Verify build process completed successfully
- Check `dist/` directory contents

**"Tests failing"**
- Run tests individually: `npm test`
- Check test configuration in `jest.config.js`

### Debug Mode
```bash
# Enable verbose logging
npm run preprod:patch -- --verbose

# Dry run to see execution plan
npm run preprod:minor -- --dry-run
```

## Best Practices

1. **Run Early, Run Often**: Execute the workflow after each significant change
2. **Address Failures Immediately**: Don't accumulate failing steps
3. **Review Reports**: Always check generated reports for insights
4. **Use Appropriate Release Types**: Choose the right validation level
5. **Document Customizations**: Keep track of workflow modifications

## Contributing

When adding new validation steps:

1. Add the step to `WORKFLOW_STEPS` array
2. Implement the `execute[StepName]` function
3. Update the workflow configuration if needed
4. Add documentation to this guide
5. Test the workflow with all release types
