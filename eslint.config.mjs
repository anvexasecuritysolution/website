import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/package-lock.json'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none', ignoreRestSiblings: true }] },
  },
  {
    files: ['client/src/**/*.{js,jsx}', 'client/shared/**/*.js'],
    languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { react, 'react-hooks': hooks },
    settings: { react: { version: '18.3' } },
    rules: { 'react/jsx-uses-vars': 'error', 'react/jsx-no-undef': 'error', ...hooks.configs.recommended.rules },
  },
  {
    files: ['google-apps-script/**/*.gs'],
    languageOptions: {
      ecmaVersion: 'latest', sourceType: 'script',
      globals: { ...globals.es2021, console: 'readonly', ContentService: 'readonly', CacheService: 'readonly', LockService: 'readonly', PropertiesService: 'readonly', Utilities: 'readonly', SpreadsheetApp: 'readonly', MailApp: 'readonly' },
    },
    rules: { ...js.configs.recommended.rules, 'no-unused-vars': ['error', { varsIgnorePattern: '^do(Get|Post)$', caughtErrors: 'none' }] },
  },
];
