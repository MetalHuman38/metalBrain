const { parse } = require('dotenv');
const globals = require('globals');

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    },
    parser: "@typescript-eslint/parser",
    files: ["**/*.ts", "**/*.tsx"],
  },
  ignores: [
    "node_modules/**",
    "build/**",
    "dist/**",
    "**/temp.js",
    "config/*"
  ],
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    semi: ["warn", "always"]
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
}