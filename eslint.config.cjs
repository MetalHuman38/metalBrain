const globals = require('globals');

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    }
  },
  ignores: [
    "node_modules/**",
    "build/**",
    "dist/**",
    "**/temp.js",
    "config/*"
  ],
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