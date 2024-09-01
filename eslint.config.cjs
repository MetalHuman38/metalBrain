const globals = require('globals');
const prettierConfig = require('eslint-config-prettier');


module.exports = {
  prettierConfig,
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    }
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    semi: ["warn", "always"]
  },
  files: ["**/*.ts", "**/*.tsx"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
}