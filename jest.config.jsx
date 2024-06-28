module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest", // Tilføjet for at understøtte .mjs filer
  },
  transformIgnorePatterns: [
    "node_modules/(?!(module_to_transform|another_module)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/__tests__/**/*.mjs", // Tilføjet for at inkludere .mjs filer
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/?(*.)+(spec|test).mjs", // Tilføjet for at inkludere .mjs filer
  ],
  moduleFileExtensions: [
    "js",
    "jsx",
    "mjs",
    "cjs",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
