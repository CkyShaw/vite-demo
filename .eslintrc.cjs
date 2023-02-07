/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['@qif/eslint-config', '@qif/eslint-config/vue', '@qif/eslint-config/typescript'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: {
      js: '@babel/eslint-parser',
      jsx: '@babel/eslint-parser',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser'
    }
  },
  rules: {
    '@typescript-eslint/prefer-optional-chain': 'off',
    'prettier/prettier': 'error'
  }
}
