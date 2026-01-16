/** @type {import('jest').Config} */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/test"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  moduleNameMapper: {
    "^falling-particles/(.*)$": "<rootDir>/src/$1",
    "^falling-particles$": "<rootDir>/src/index.ts",
  },
};
