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
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect"
      }
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      reactrefresh: reactRefresh,
    },
    rules: {
      semi: ["warn", "always"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];



// const globals = require('globals');
// const reactRefresh = require('react-refresh');
// const typescriptParser = require('@typescript-eslint/parser')
// const pluginQuery = require('@tanstack/eslint-plugin-query')

// module.exports = {
//   languageOptions: {
//     ecmaVersion: 2022,
//     sourceType: "module",
//     globals: {
//       ...globals.browser,
//       ...globals.node,
//       myCustomGlobal: "readonly"
//     },
//     parser: typescriptParser,
//     ...pluginQuery.configs['flat/recommended'],
//     parserOptions: {
//       ecmaFeatures: {
//         jsx: "true",
//         tsx: "true",
//         ts: "true",
//         modules: "true",
//       },
//       ecmaVersion: "latest",
//       sourceType: 'module',
//       tsconfigRootDir: __dirname, // ** This is the default value ** //
//     },
//   },
//   ignores: [
//     "node_modules/**",
//     "build/**",
//     "dist/**",
//     "**/temp.js",
//     "config/*"
//   ],
//   files: ["**/*.ts", "**/*.tsx"],
//   plugins: {
//     reactrefresh: reactRefresh,
//     '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
//   },
//   rules: {
//     semi: ["warn", "always"],
//     "react-hooks/rules-of-hooks": "error",
//     // Enforces naming convention for hooks
//     "react-hooks/exhaustive-deps": "warn"
//   },


// }