const { useActionData } = require("react-router-dom");
const { parser } = require("typescript-eslint");

module.exports = {
  semi: true,
  singQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  useActionData: false,
  endOfLine: 'auto',
  bracketSpacing: true,
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  htmlWhitespaceSensitivity: 'css',
  filepath: 'none',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
        parser: 'json',
      },
    },
  ],
}