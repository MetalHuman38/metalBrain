const { parser } = require("typescript-eslint");

module.exports = {
  semi: true,
  singQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
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