const globals = require('globals');
const reactRefresh = require('react-refresh');
const typescriptParser = require('@typescript-eslint/parser')

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    },
    parser: typescriptParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: "true",
        tsx: "true",
        ts: "true",
        modules: "true",
      },
      ecmaVersion: "latest",
      sourceType: 'module',
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