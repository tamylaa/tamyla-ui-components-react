// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// ESLint 9 Flat Configuration
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

export default [js.configs.recommended, {
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      console: 'readonly',
      process: 'readonly',
      window: 'readonly',
      document: 'readonly',
      HTMLElement: 'readonly',
      HTMLDivElement: 'readonly',
      HTMLInputElement: 'readonly',
      HTMLTextAreaElement: 'readonly',
      HTMLButtonElement: 'readonly',
      HTMLHeadingElement: 'readonly',
      HTMLParagraphElement: 'readonly',
      KeyboardEvent: 'readonly',
      Event: 'readonly',
      File: 'readonly',
      FileList: 'readonly',
      DataTransfer: 'readonly',
      MouseEvent: 'readonly',
      fetch: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      alert: 'readonly',
      // Additional DOM API globals to fix no-undef errors
      MediaQueryListEvent: 'readonly',
      EventListener: 'readonly',
      AddEventListenerOptions: 'readonly',
      RequestInit: 'readonly',
      Response: 'readonly',
      AbortController: 'readonly',
      navigator: 'readonly',
      EventTarget: 'readonly',
      EventListenerOrEventListenerObject: 'readonly',
      FrameRequestCallback: 'readonly',
      requestAnimationFrame: 'readonly',
      cancelAnimationFrame: 'readonly',
      DocumentFragment: 'readonly',
      performance: 'readonly',
      Element: 'readonly',
      AbortSignal: 'readonly'
    }
  },
  plugins: {
    '@typescript-eslint': tseslint,
    'react-hooks': reactHooks
  },
  rules: {
    // Disable base rules that have TS equivalents
    'no-unused-vars': 'off',
    
    // TypeScript specific rules that were working
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/no-unsafe-function-type': 'warn',
    
    // Standard rules
    'no-console': 'warn',
    'no-trailing-spaces': 'error',
    
    // React hooks rules (these were causing the original issues)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}, {
  files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/__tests__/**/*.{ts,tsx}', 'src/test-utils/**/*.{ts,tsx}', 'src/setupTests.ts'],
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      console: 'readonly',
      process: 'readonly',
      window: 'readonly',
      document: 'readonly',
      HTMLElement: 'readonly',
      HTMLDivElement: 'readonly',
      HTMLInputElement: 'readonly',
      HTMLTextAreaElement: 'readonly',
      HTMLButtonElement: 'readonly',
      HTMLHeadingElement: 'readonly',
      HTMLParagraphElement: 'readonly',
      KeyboardEvent: 'readonly',
      Event: 'readonly',
      File: 'readonly',
      FileList: 'readonly',
      DataTransfer: 'readonly',
      MouseEvent: 'readonly',
      fetch: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      alert: 'readonly',
      MediaQueryListEvent: 'readonly',
      RequestInit: 'readonly',
      Response: 'readonly',
      AbortController: 'readonly',
      EventListener: 'readonly',
      AddEventListenerOptions: 'readonly',
      navigator: 'readonly',
      jest: 'readonly',
      describe: 'readonly',
      test: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      beforeAll: 'readonly',
      beforeEach: 'readonly',
      afterAll: 'readonly',
      afterEach: 'readonly'
    }
  },
  plugins: {
    '@typescript-eslint': tseslint,
    'react-hooks': reactHooks
  },
  rules: {
    // Disable base rules that have TS equivalents
    'no-unused-vars': 'off',
    
    // TypeScript specific rules that were working
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/no-unsafe-function-type': 'warn',
    
    // Standard rules
    'no-console': 'off',
    'no-trailing-spaces': 'error',
    
    // React hooks rules (these were causing the original issues)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}, {
  // Redux optional utilities - allow require for optional dependencies
  files: ['src/utils/redux-optional.ts'],
  rules: {
    'no-undef': 'off'
  }
}, {
  // Demo files - less strict rules
  files: ['src/demos/**/*.{ts,tsx,js,jsx}'],
  rules: {
    'no-trailing-spaces': 'warn'
  }
}, {
  // Ignore patterns
  ignores: [
    'dist/**',
    'node_modules/**',
    '**/*.d.ts',
    '_backup/**'
  ]
}, {
  // Storybook files
  files: ['**/*.stories.@(ts|tsx|js|jsx)'],
  rules: {
    // Storybook-specific rules can go here
  }
}];