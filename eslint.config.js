'use strict';

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const { defineConfig } = require('eslint/config');

const eslintConfig = defineConfig({
  languageOptions: {
    parserOptions: {
      project: true
    }
  },
  extends: [eslint.configs.all, ...tseslint.configs.strictTypeChecked],
  rules: {
    'camelcase': 'off',
    'curly': 'off',
    'consistent-return': 'off',
    'id-length': ['warn', { exceptions: ['q'] }],
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'no-empty': 'off',
    'no-empty-function': ['warn', { allow: ['arrowFunctions'] }],
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'object-shorthand': ['warn', 'never'],
    'one-var': 'off',
    'require-unicode-regexp': 'off',
    'sort-keys': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
});

module.exports = eslintConfig;
