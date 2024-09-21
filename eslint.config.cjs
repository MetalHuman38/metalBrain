const globals = require('globals');
const reactRefresh = require('react-refresh');
const typescriptParser = require('@typescript-eslint/parser');
const pluginQuery = require('@tanstack/eslint-plugin-query');

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      "**/temp.js",
      "config/*"
    ],
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
          jsx: true,
          tsx: true,
        },
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      reactrefresh: reactRefresh,
      pluginQuery: pluginQuery,
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      semi: ["warn", "always"],
    },
    settings: {
      react: {
        version: "detect"
      }
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs", "**/*.tsx", "**/*.ts"],
    plugins: {
      reactrefresh: reactRefresh,
    },
    rules: {
      semi: ["warn", "always"],
    },
  },
];