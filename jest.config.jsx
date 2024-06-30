module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(module_to_transform|another_module)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testMatch: [
    "**/__tests__/**/*.js",
    "**/__tests__/**/*.jsx",
    "**/?(*.)+(spec|test).js",
    "**/?(*.)+(spec|test).jsx",
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
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
