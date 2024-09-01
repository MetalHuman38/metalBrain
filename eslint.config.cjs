const globals = require('globals');
const reactRefresh = require('react-refresh');
const { default: ts } = require('typescript');

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: "true",
        tsx: "true",
        ts: "true",
        modules: "true",
      },
      ecmaVersion: "latest",
      sourceType: 'module',
      project: ["./tsconfig.json, ./tsconfig.node.json, ./tsconfig.app.json"],
      tsconfigRootDir: __dirname, // ** This is the default value ** //
    },
  },
  ignores: [
    "node_modules/**",
    "build/**",
    "dist/**",
    "**/temp.js",
    "config/*"
  ],
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    reactrefresh: reactRefresh,
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  },
  rules: {
    semi: ["warn", "always"]
  },


}