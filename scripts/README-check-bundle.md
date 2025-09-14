# Bundle Certification Script

## Purpose

The `check-bundle.js` script validates that peer dependencies (especially `styled-components`) are properly externalized in the built bundle to prevent runtime errors like "z.div is not a function".

## What it checks

1. **Bundle size** - Warns if bundle exceeds 300KB (indicating dependencies might be bundled)
2. **Peer dependency externalization** - Validates that `styled-components`, `react`, and `react-dom` are imported rather than bundled
3. **Import patterns** - Analyzes the bundle to ensure external imports are working correctly

## Usage

```bash
# Run standalone
npm run check:bundle

# Automatically runs after build
npm run build

# Part of pre-publish validation
npm run prepublishOnly
```

## Why this matters

When `styled-components` gets bundled instead of externalized:
- The bundle size increases significantly (from ~220KB to 800KB+)
- Runtime errors occur: "z.div is not a function" 
- Multiple instances of styled-components cause conflicts

## Expected output

✅ **CERTIFICATION PASSED** means:
- styled-components is properly externalized
- Bundle size is reasonable
- Ready for production use

❌ **CERTIFICATION FAILED** means:
- Dependencies are being bundled instead of externalized
- Check `rollup.config.js` external configuration
- Verify peer dependencies in `package.json`

## Related files

- `rollup.config.js` - Configure external dependencies
- `package.json` - Define peer dependencies
- `dist/index.esm.js` - The bundle being validated
