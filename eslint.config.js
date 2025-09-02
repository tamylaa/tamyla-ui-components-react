import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Main configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        React: 'readonly',
        // DOM globals
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLFormElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        FocusEvent: 'readonly',
        FileList: 'readonly',
        Node: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        React: 'readonly',
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        // DOM globals
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLFormElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        FocusEvent: 'readonly',
        FileList: 'readonly',
        Node: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '**/*.d.ts'
    ]
  }
];
