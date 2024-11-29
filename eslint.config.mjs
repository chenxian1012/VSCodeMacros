import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.node,
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'array-callback-return': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['PascalCase'],
          modifiers: ['exported'],
        },
        {
          selector: ['variable', 'function'],
          format: ['PascalCase'],
          modifiers: ['global'],
          prefix: ['_'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'function',
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          format: ['PascalCase'],
          modifiers: ['exported'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        { // 未使用的参数必须使用下划线开头
          selector: 'parameter',
          format: ['camelCase'],
          modifiers: ['unused'],
          leadingUnderscore: 'require',
        },
        { // 禁止使用下划线开头，达到了使用了的参数必须camelCase
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
      ],
    },
  },
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
