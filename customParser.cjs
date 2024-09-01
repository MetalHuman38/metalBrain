const espree = require("espree");

// Logs the duration it takes to parse each file.
function parse(code, options) {
  const label = `Parsing file "${options.filePath}"`;
  const typescript = `@typescript-eslint/parser` === options.parser;
  console.log(`\n${label}`);
  console.log(`Typescript: ${typescript ? "Yes" : "No"}`);
  console.time(label);
  const ast = espree.parse(code, options);
  console.timeEnd(label);
  return ast; // Only the AST is returned.
};

module.exports = { parse };