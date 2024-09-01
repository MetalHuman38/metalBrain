const globals = require('globals');
const reactRefresh = require('react-refresh');

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
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
  },
  rules: {
    semi: ["warn", "always"]
  },


}