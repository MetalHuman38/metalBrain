/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/client/$1",
  },
  moduleFileExtensions: ["ts", "js", "json", "cjs", "tsx", "jsx", "node"],
  transform: {
    "^.+\\.(ts|tsx|js)$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
