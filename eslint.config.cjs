const globals = require('globals');
const reactRefresh = require('react-refresh');
const parse = require("./customParser.cjs");

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    },
    parser: parse,
    parserOptions: {
      ecmaFeatures: {
        jsx: "true",
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