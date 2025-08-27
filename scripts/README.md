Scripts organization
---------------------

This folder contains executable scripts used for validation, certification, and deployment.

Structure:

- `scripts/*.js` - original scripts. Most are ESM modules and should be invoked directly.
- `scripts/*.cjs` - CommonJS scripts (named `.cjs` to preserve CJS semantics in an ESM package).
- `scripts/esm/*` - convenience ESM wrapper files (re-export the top-level scripts).
- `scripts/cjs/*` - convenience CJS wrappers that require the `.cjs` files.

Why this layout?
- Keeps the repository backward compatible while making intent explicit.
- CI and contributors can call the wrapper paths to ensure correct module semantics.

Example usage:

 - ESM: `node scripts/esm/working-certify.js`
 - CJS: `node scripts/cjs/comprehensive-certify.cjs`
