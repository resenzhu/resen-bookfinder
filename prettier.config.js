'use strict';

/**
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  proseWrap: 'never',
  quoteProps: 'consistent',
  rangeStart: 0,
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false
};

module.exports = prettierConfig;
