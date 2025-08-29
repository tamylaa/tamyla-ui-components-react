// Simple ESLint configuration compatible with Node.js 16+
// Avoids structuredClone dependency issues in ESLint 9.x

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-trailing-spaces': 'warn',
      'eol-last': 'error',
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'brace-style': ['error', '1tbs'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-case-declarations': 'error',
      'no-unused-vars': 'warn'
    }
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '*.min.js',
      'coverage/**',
      '.git/**',
      'examples/**',
      '__mocks__/**',
      'src/campaign-content-selector.d.ts',
      'src/enhanced-content-manager.d.ts',
      'src/enhanced-search.d.ts'
    ]
  }
];
