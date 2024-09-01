const globals = require('globals');
const reactRefresh = require('react-refresh');
import { default as jsonc, parseForESLint, configs } from "eslint-plugin-jsonc";


const parsers = {
  'jsonc-eslint-parser': {
    parseForESLint
  }
}

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      myCustomGlobal: "readonly"
    },
    jsonc: { ...jsonc, parsers },
    files: ["**/*.ts", "**/*.tsx"],
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
  plugins: {
    reactrefresh: reactRefresh
  },
  rules: {
    semi: ["warn", "always"]
  },

}